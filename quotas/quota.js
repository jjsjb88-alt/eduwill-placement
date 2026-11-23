import {account,login,logout,quotaAdmin,quotaGuide,quotaExcerpt,publishQuota} from '../application-store.js';

const $=id=>document.getElementById(id);
const gachon='가천대학교', swu='서울여자대학교';
const gachonSource='https://admission.gachon.ac.kr/upload/BBS0021/20261123093522349J3D.PDF';
const gachonHash='47830bd8d1b0f40e152ea6d6e8df00daa13e319d36817f2fb4a802d6194be434';
const swuSource='https://admission.swu.ac.kr/bbs/board.php?bo_table=flashpaper&sca=%ED%8E%B8%EC%9E%85%ED%95%99&sub_ck=1';
const schoolName=s=>({가천대:gachon,서울여대:swu}[s] || s);
function schoolValue(raw){
  const value=schoolName(raw.normalize('NFKC').trim().replace(/\s+/g,''));
  if(typeof value!=='string'||!value||value.length>80||/[\/\x00-\x1f]/.test(value)||/^\.\.?$/.test(value))throw Error('학교 이름을 확인해 주세요.');
  return value;
}
function officialUrl(raw){
  let url;
  try{url=new URL(raw);}catch{}
  if(url?.protocol!=='https:'||url.username||url.password)throw Error('입학처의 https 원문 주소를 입력해 주세요.');
  return url.href;
}
async function hash(bytes){
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
}
let lookupId=0, publicUrl='', previewUrl='', fileUrl='', editId=0, draft=null;
function clearPublic(){
  $('result').hidden=$('original').hidden=$('publishedPdf').hidden=$('excerptLink').hidden=$('textTable').hidden=true;
  $('publishedPdf').removeAttribute('src');$('textTable').open=false;$('feedback').replaceChildren();
  if(publicUrl)URL.revokeObjectURL(publicUrl);
  publicUrl='';
}
function showSource(school,pages,url){
  $('result').hidden=false;$('schoolTitle').textContent=school;
  $('pageLabel').textContent='2027학년도 모집요강 · PDF '+pages.join(', ')+'쪽';
  $('official').href=officialUrl(url);
}
function tableRow(cells,heading=false){
  const tr=document.createElement('tr');
  cells.forEach((value,i)=>{
    const cell=document.createElement(heading||i===0?'th':'td');
    if(heading||i===0)cell.scope=heading?'col':'row';
    cell.textContent=value??'';tr.append(cell);
  });
  return tr;
}
async function showGachon(id){
  const res=await fetch('gachon-2027.json');
  if(!res.ok)throw Error('검증한 모집표를 열 수 없습니다.');
  const data=await res.json();
  if(id!==lookupId)return;
  showSource(gachon,[4],gachonSource+'#page=4');
  $('labels').replaceChildren(tableRow(['모집단위',...data.headers],true));
  $('seats').replaceChildren(...data.rows.map(row=>tableRow(row)));
  $('totals').replaceChildren(tableRow(['합계',...data.totals]));
  $('original').hidden=$('textTable').hidden=$('excerptLink').hidden=false;
  $('excerptLink').href='gachon-2027-p4.png';
  $('feedback').textContent='2026년 11월 23일 입학처 원문 대조본';
}
function noGuide(school,failed){
  $('feedback').textContent=failed?'등록 자료를 조회할 수 없습니다.':'이 학교의 2027학년도 모집표가 아직 등록되지 않았습니다.';
  if(school===swu){
    const a=document.createElement('a');a.href=swuSource;a.textContent='서울여대 입학처 모집요강 ↗';
    a.target='_blank';a.rel='noopener noreferrer';$('feedback').append(' ',a);
  }
}
async function lookup(raw){
  const id=++lookupId;
  clearPublic();
  let school;
  try{school=schoolValue(raw);}catch(e){$('feedback').textContent=e.message;return;}
  $('query').value=school;
  const url=new URL(location.href);url.searchParams.set('school',school);history.replaceState(null,'',url);
  $('feedback').textContent='모집표 조회 중…';
  try{
    if(school===gachon)await showGachon(id);
    if(id!==lookupId)return;
    const guide=await quotaGuide(school);
    if(id!==lookupId)return;
    if(!guide){if(school!==gachon)noGuide(school,false);return;}
    if(school===gachon&&guide.sourceHash===gachonHash&&guide.pages.join(',')==='4')return;
    clearPublic();
    const pdf=await quotaExcerpt(school,guide);
    if(await hash(await pdf.arrayBuffer())!==guide.excerptHash)throw Error('모집표 파일을 대조하지 못했습니다.');
    if(id!==lookupId)return;
    showSource(school,guide.pages,guide.source);
    publicUrl=URL.createObjectURL(pdf);$('publishedPdf').src=publicUrl+'#view=FitH';
    $('excerptLink').href=publicUrl;$('publishedPdf').hidden=$('excerptLink').hidden=false;
  }catch{
    if(id===lookupId && $('result').hidden)noGuide(school,true);
  }
}
$('lookup').onsubmit=e=>{e.preventDefault();lookup($('query').value);};
const initial=new URLSearchParams(location.search).get('school');
if(initial)lookup(initial);

function invalidate(){
  ++editId;draft=null;$('approved').checked=false;$('publish').disabled=true;$('review').hidden=true;
  $('reviewPdf').removeAttribute('src');if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl='';
}
function pageNumbers(text,count){
  const pages=new Set();
  for(const token of text.split(',')){
    const match=token.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    const from=Number(match?.[1]),to=Number(match?.[2]??from);
    if(!match||from<1||to<from||to>count)throw Error('원본의 1~'+count+'쪽 안에서 쪽 번호를 입력해 주세요.');
    for(let n=from;n<=to;n++)pages.add(n);
  }
  return [...pages].sort((a,b)=>a-b);
}
function adminError(e){
  if(e.code==='permission-denied')return '관리자 등록과 모집표 게시 규칙을 확인해 주세요.';
  if(e.code==='auth/popup-closed-by-user')return '계정 선택을 취소했습니다.';
  return e.message||'처리하지 못했습니다. 다시 시도해 주세요.';
}
let connected=false,sessionCheck;
async function showAccount(user){
  invalidate();$('editor').hidden=true;
  connected=!!user;$('adminLogin').textContent=user?'계정 연결 해제':'관리자 계정 연결';
  if(!user){$('adminState').textContent='';return;}
  const admin=await quotaAdmin(user);
  $('editor').hidden=!admin;$('adminState').textContent=admin?'모집표를 게시할 수 있습니다.':'모집표 게시 권한이 없는 계정입니다.';
}
$('management').ontoggle=()=>{
  if($('management').open && !sessionCheck)sessionCheck=account().then(showAccount).catch(e=>$('adminState').textContent=adminError(e));
};
$('adminLogin').onclick=async()=>{
  $('adminLogin').disabled=true;
  try{await sessionCheck;if(connected){await logout();await showAccount(null);}else await showAccount(await login());}
  catch(e){$('adminState').textContent=adminError(e);}
  finally{$('adminLogin').disabled=false;}
};
$('editor').oninput=()=>{invalidate();$('adminState').textContent='';};
$('file').onchange=async()=>{
  invalidate();const file=$('file').files[0];
  if(fileUrl)URL.revokeObjectURL(fileUrl);
  fileUrl=file?URL.createObjectURL(file):'';$('fileLink').href=fileUrl;$('fileLink').hidden=!file;
  $('fileInfo').textContent='';
  if(!file)return;
  const id=editId;
  if(await hash(await file.arrayBuffer())===gachonHash&&id===editId){
    $('college').value=gachon;$('source').value=gachonSource;$('pages').value='4';
    $('fileInfo').textContent='입학처에서 확인한 가천대학교 원본과 일치합니다.';
  }
};
$('editor').onsubmit=async e=>{
  e.preventDefault();invalidate();const id=editId;
  try{
    const school=schoolValue($('college').value),source=officialUrl($('source').value);
    const raw=$('pages').value, bytes=await $('file').files[0].arrayBuffer();
    await import('./pdf-lib.min.js');
    const {PDFDocument}=globalThis.PDFLib;
    let original;
    try{original=await PDFDocument.load(bytes);}catch{throw Error('PDF를 읽을 수 없습니다. 암호가 걸려 있다면 입학처 원본을 확인해 주세요.');}
    const pages=pageNumbers(raw,original.getPageCount());
    const out=await PDFDocument.create();
    for(const page of await out.copyPages(original,pages.map(n=>n-1)))out.addPage(page);
    const pdf=await out.save();
    const [sourceHash,excerptHash,current]=await Promise.all([hash(bytes),hash(pdf),quotaGuide(school)]);
    if(id!==editId)return;
    if(sourceHash===gachonHash && school!==gachon)throw Error('이 PDF는 가천대학교 모집요강입니다. 대학 이름을 확인해 주세요.');
    draft={guide:{school,source,sourceHash,excerptHash,pages},pdf,expected:current?.version||null};
    previewUrl=URL.createObjectURL(new Blob([pdf],{type:'application/pdf'}));
    $('reviewPdf').src=previewUrl;$('reviewLink').href=previewUrl;
    $('reviewTitle').textContent=school+' · 원본 '+pages.join(', ')+'쪽';
    $('review').hidden=false;$('adminState').textContent='';
  }catch(e){if(id===editId)$('adminState').textContent=adminError(e);}
};
$('approved').onchange=()=>{$('publish').disabled=!draft||!$('approved').checked;};
$('publish').onclick=async()=>{
  if(!draft||!$('approved').checked)return;
  const {guide,pdf,expected}=draft;
  const controls=[...$('editor').elements,$('approved'),$('publish'),$('adminLogin')];
  controls.forEach(node=>node.disabled=true);
  try{
    await publishQuota(guide,pdf,expected);
    invalidate();$('adminState').textContent=guide.school+' 모집표를 게시했습니다.';
    await lookup(guide.school);
  }catch(e){invalidate();$('adminState').textContent=adminError(e);}
  finally{controls.forEach(node=>node.disabled=false);$('publish').disabled=true;}
};
