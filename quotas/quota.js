import {account,login,logout,quotaAdmin,quotaGuide,quotaExcerpt,publishQuota} from '../application-store.js';
import {gachonTrend,change,seatText} from './trend.js';

const $=id=>document.getElementById(id);
const gachon='가천대학교', kau='한국항공대학교', swu='서울여자대학교', sookmyung='숙명여자대학교', konkuk='건국대학교', kyonggi='경기대학교';
const gachonSource='https://admission.gachon.ac.kr/upload/BBS0021/20261123093522349J3D.PDF';
const gachonHash='47830bd8d1b0f40e152ea6d6e8df00daa13e319d36817f2fb4a802d6194be434';
const verified={
  [gachon]:{file:'gachon-2027',page:4,hash:gachonHash,source:gachonSource},
  [kau]:{file:'kau-2027',page:6,hash:'6b0b37bccec87047e6b3a388a9c60da95024a841023634d10bbbc4219b3a496a',source:'https://ibhak.kau.ac.kr/upload/GUIDES/20261123145318001.pdf'},
  [sookmyung]:{file:'sookmyung-2027',pages:[3],hash:'b70486bc5b9b25ef81d1249347caa643d626cf9bac539fd845852e01ca635bf0',
    source:'https://admission.sookmyung.ac.kr/upload/BBS0021/20261124144821PWSYKA.PDF',
    notice:'https://admission.sookmyung.ac.kr/admission/html/transfer/noticeView.asp?p_board_idx=54732'},
  [konkuk]:{file:'konkuk-2027',pages:[3,4],hash:'0482e639501a521f59fb5be31561d9074e4600b5a37cf66a452b53731b3a45e5',
    source:'https://admission.konkuk.ac.kr/bbs/admission/6282/1231335/download.do',
    notice:'https://admission.konkuk.ac.kr/bbs/admission/6282/1212887/artclView.do'},
  [kyonggi]:{file:'kyonggi-2027',pages:[5,6],hash:'d29d9e9fcaae247a6a0123a061b9730699dfb78e1e737b8f0e1305ae50e30bfe',
    source:'https://enter.kyonggi.ac.kr/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=4058&BOARD_SEQ=3&CONTENTS_NO=3&MENU_ID=280&SITE_NO=2',
    notice:'https://enter.kyonggi.ac.kr/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=4387&BOARD_SEQ=1&CONTENTS_NO=3&MENU_ID=210&SITE_NO=2'}
};
const schedules={
  수원대학교:{source:'https://ipsi.suwon.ac.kr/board/notice/read/6342?nPage=1&st=%EC%84%A0%ED%96%89',rows:[
    ['원서접수','2026. 12. 1.(화) 10:00 ~ 12. 4.(금) 18:00'],
    ['고사장·시간 공지','고사 일주일 전 입학처에서 안내 예정'],
    ['영어 필기·실기고사','2027. 1. 3.(일) · 세부 일정 추후 공지'],
    ['서류제출 마감','2027. 1. 8.(금) · 우편 도착 기준'],
    ['최초합격자 발표','2027. 2. 5.(금) 17:00 이전'],
    ['최초합격자 등록','2027. 2. 5.(금) ~ 2. 11.(목) 10:00'],
    ['충원합격자 발표·등록','2027. 2. 11.(목) ~ 2. 18.(목)'],
    ['충원합격자 통보 마감','2027. 2. 18.(목) 18:00'],
    ['최종 등록 마감','2027. 2. 19.(금)']
  ]}
};
const notes=document.querySelector('#textTable p'), gachonNotes=notes.textContent;
const swuSource='https://admission.swu.ac.kr/bbs/board.php?bo_table=flashpaper&sca=%ED%8E%B8%EC%9E%85%ED%95%99&sub_ck=1';
const schoolName=s=>({가천대:gachon,서울여대:swu,항공대:kau,한국항공대:kau,수원대:'수원대학교',
  숙대:sookmyung,숙명대:sookmyung,숙명여대:sookmyung,건국대:konkuk,'건국대(서울)':konkuk,'건국대학교(서울)':konkuk,
  경기대:kyonggi,'경기대(수원)':kyonggi,'경기대(서울)':kyonggi}[s] || s);
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
  $('trendPanel').hidden=true;
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
function showSchedule(school,source,rows){
  $('scheduleTitle').textContent=school+' 2027학년도 전형일정';
  $('scheduleSource').href=officialUrl(source);
  $('scheduleRows').replaceChildren(...rows.map(row=>tableRow(row)));
  $('schedule').hidden=false;
}
async function showVerified(id,school,guide){
  const res=await fetch(guide.file+'.json');
  if(!res.ok)throw Error('검증한 모집표를 열 수 없습니다.');
  const data=await res.json();
  if(id!==lookupId)return;
  const pages=guide.pages??[guide.page];
  showSource(school,pages,guide.source+'#page='+pages[0]);
  $('labels').replaceChildren(tableRow(['모집단위',...data.headers],true));
  $('seats').replaceChildren(...data.rows.map(row=>{
    const tr=tableRow(row), majors=data.majors?.[row[0]];
    if(majors){
      const small=document.createElement('small');small.textContent=majors.join(' · ');tr.firstChild.append(small);
    }
    return tr;
  }));
  $('totals').replaceChildren(tableRow(['합계',...data.totals]));
  $('feedback').textContent='입학처 모집요강 원문 대조본';
  if(data.schedule){
    showSchedule(school,guide.notice,data.schedule);
    notes.textContent=data.notes;
    $('publishedPdf').after($('textTable'));
    $('textTable').hidden=false;
    $('textTable').open=true;
    return;
  }
  $('original').hidden=$('textTable').hidden=$('excerptLink').hidden=false;
  $('original').src=$('excerptLink').href=guide.file+'-p'+guide.page+'.png';
  $('original').alt='2027학년도 '+school+' 모집요강 PDF '+guide.page+'쪽 모집인원표';
  $('gachonComparison').hidden=school!==gachon;
  $('kauComparison').hidden=school!==kau;
  notes.textContent=school===gachon?gachonNotes:'단과대학 인원은 해당 세부전공 전체의 공동 모집인원입니다. 빈칸은 원문 미기재입니다. 전공 선택 범위와 항공운항학과 등 제외 조건은 아래 원문에서 확인할 수 있습니다.';
  if(school===kau){
    $('original').before($('textTable'));$('textTable').open=true;
    showTotals(data.headers.slice(0,-1),data.previousTotals,data.totals.slice(0,-1));
    $('trendPanel').hidden=false;return;
  }
  $('publishedPdf').after($('textTable'));
  gachonTrend().then(data=>{
    if(id===lookupId&&!$('original').hidden)showTrend(data);
  }).catch(()=>{
    if(id===lookupId&&!$('original').hidden)$('feedback').textContent+=' · 연도 비교표를 불러오지 못했습니다.';
  });
}
function showTotals(headers,before,after){
  $('trackTrend').replaceChildren(...headers.map((label,i)=>tableRow([label,before[i],after[i],change(before[i],after[i])])));
  const total=values=>values.reduce((sum,n)=>sum+n,0);
  $('trendTotal').replaceChildren(tableRow(['합계',total(before),total(after),change(total(before),total(after))]));
}
function showTrend({before,after,names}){
  const {headers}=after;
  showTotals(headers,before.totals,after.totals);
  $('trendTrack').replaceChildren(...headers.map(label=>new Option(label,label)));
  $('trendQuery').value='';
  function filter(){
    const col=headers.indexOf($('trendTrack').value)+1,query=$('trendQuery').value.trim();
    const rows=[];
    for(const [name,pair] of names){
      const a=pair.before?.[col],b=pair.after?.[col];
      const label=name+(pair.oldName?' (2026 '+pair.oldName+')':'');
      if(!label.includes(query)||(a==null&&b==null))continue;
      rows.push(tableRow([label,seatText(pair,'before',col),seatText(pair,'after',col),pair.reorganized?'조직 개편':change(a,b)]));
    }
    if(!rows.length){
      const empty=tableRow(['해당하는 모집단위가 없습니다.']);
      empty.firstChild.colSpan=4;rows.push(empty);
    }
    $('unitTrend').replaceChildren(...rows);
    $('unitTrend').closest('.trendScroll').scrollTop=0;
  }
  $('trendTrack').onchange=$('trendQuery').oninput=filter;
  filter();$('trendPanel').hidden=false;
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
  $('schedule').hidden=true;
  let school;
  try{school=schoolValue(raw);}catch(e){$('feedback').textContent=e.message;return;}
  $('query').value=school;
  const url=new URL(location.href);url.searchParams.set('school',school);history.replaceState(null,'',url);
  if(Object.hasOwn(schedules,school)){
    const {source,rows}=schedules[school];
    showSchedule(school,source,rows);
  }
  $('feedback').textContent='모집표 조회 중…';
  try{
    const builtIn=Object.hasOwn(verified,school)?verified[school]:null;
    if(builtIn)await showVerified(id,school,builtIn);
    if(id!==lookupId)return;
    const guide=await quotaGuide(school);
    if(id!==lookupId)return;
    if(!guide){if(!builtIn)noGuide(school,false);return;}
    if(builtIn&&guide.sourceHash===builtIn.hash&&guide.pages.join(',')===(builtIn.pages??[builtIn.page]).join(','))return;
    const pdf=await quotaExcerpt(school,guide);
    if(await hash(await pdf.arrayBuffer())!==guide.excerptHash)throw Error('모집표 파일을 대조하지 못했습니다.');
    if(id!==lookupId)return;
    clearPublic();
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
  const digest=await hash(await file.arrayBuffer());
  const known=Object.entries(verified).find(([,g])=>g.hash===digest);
  if(known&&id===editId){
    const [school,g]=known;
    $('college').value=school;$('source').value=g.source;$('pages').value=g.page;
    $('fileInfo').textContent='입학처에서 확인한 '+school+' 원본과 일치합니다.';
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
    const known=Object.entries(verified).find(([,g])=>g.hash===sourceHash);
    if(known && known[0]!==school)throw Error('이 PDF는 '+known[0]+' 모집요강입니다. 대학 이름을 확인해 주세요.');
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
