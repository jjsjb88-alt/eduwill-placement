/* Decrypt the application locally. Neither the password nor a password hash is shipped. */
(() => {
'use strict';
const $=id=>document.getElementById(id), SESSION='placement-unlock-v1';
const rememberKey=document.body.dataset.rememberKey!=='false';
const bytes=text=>Uint8Array.from(atob(text),c=>c.charCodeAt(0));
const base64=array=>btoa(String.fromCharCode(...array));
let envelopePromise, busy=false;
async function envelope(file=document.body.dataset.encrypted){
  if(!envelopePromise) envelopePromise=(async()=>{
    const embedded=$('sealedPayload');
    const value=embedded?JSON.parse(embedded.textContent):await fetch(file,{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('자료를 불러오지 못했습니다. 잠시 후 다시 시도하세요.');return r.json();});
    if(value.version!==1||value.compression!=='gzip'||value.iterations<100000||value.iterations>1000000)throw Error('자료 버전을 확인할 수 없습니다.');
    return value;
  })().catch(e=>{envelopePromise=null;throw e;});
  return envelopePromise;
}
async function derive(password,payload,length=256){
  const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(window.keyboardPassword(password)),'PBKDF2',false,['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:bytes(payload.salt),iterations:payload.iterations,hash:'SHA-256'},material,length));
}
async function decrypt(keyBytes,payload){
  const key=await crypto.subtle.importKey('raw',keyBytes,{name:'AES-GCM'},false,['decrypt']);
  const compressed=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(payload.iv)},key,bytes(payload.ciphertext));
  const stream=new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
}
function status(message,error=false){$('gateStatus').textContent=message;$('gateStatus').classList.toggle('error',error);}
function enter(html,key,payload){
  if(!/^<!doctype html>/i.test(html.trimStart()))throw Error('자료 형식을 확인할 수 없습니다.');
  if(rememberKey){try{sessionStorage.setItem(SESSION,JSON.stringify({salt:payload.salt,key:base64(key)}));}catch{}}
  $('sharedPassword').value='';
  // Reference envelopes bundle older assets. Use the current viewer assets
  // without changing the encrypted data or session key.
  if(document.body.dataset.encrypted==='reference.enc.json'&&!$('sealedPayload')){
    html=html.replace(/<style>[\s\S]*?<\/style>/,'')
      .replace('</head>','<link rel="stylesheet" href="reference-2026.css?v=audit-20261110"></head>')
      .replace(/<script>\/\* School\/department reference viewer\.[\s\S]*?<\/script>/,'<script src="reference-2026.js?v=audit-20261110"></script>');
  }
  document.open();document.write(html);document.close();
}
function supported(){return Boolean(window.crypto?.subtle&&window.DecompressionStream);}
async function cached(){
  if(!supported()){status('최신 Chrome, Edge 또는 Safari에서 열어주세요.',true);return;}
  let stored;try{stored=JSON.parse(sessionStorage.getItem(SESSION)||'null');}catch{}
  if(!stored) return;
  busy=true;$('unlockButton').disabled=true;status('상담자료를 여는 중입니다…');
  try{const payload=await envelope();if(stored.salt!==payload.salt)throw Error('changed');const key=bytes(stored.key);enter(await decrypt(key,payload),key,payload);}
  catch{try{sessionStorage.removeItem(SESSION);}catch{}busy=false;$('unlockButton').disabled=false;status('');}
}
$('togglePassword').onclick=()=>{const visible=$('sharedPassword').type==='password';$('sharedPassword').type=visible?'text':'password';$('togglePassword').textContent=visible?'숨기기':'보기';$('togglePassword').setAttribute('aria-pressed',String(visible));$('togglePassword').setAttribute('aria-label',visible?'비밀번호 숨기기':'비밀번호 표시');};
$('passwordForm').onsubmit=async event=>{
  event.preventDefault();if(busy)return;
  if(!supported()){status('최신 Chrome, Edge 또는 Safari에서 열어주세요.',true);return;}
  busy=true;$('unlockButton').disabled=true;status('상담자료를 여는 중입니다…');
  try{
    const pw=$('sharedPassword').value;
    let payload,key;
    if(document.body.dataset.versions){
      const response=await fetch(document.body.dataset.versions,{cache:'no-store'});
      if(!response.ok)throw Error('상담 자료를 불러올 수 없습니다.');
      const index=await response.json();
      if(index.iterations!==600000)throw Error('상담 자료 버전을 확인해주세요.');
      const bits=await derive(pw,index,512),file=index.routes[base64(bits.subarray(32))];
      key=bits.slice(0,32);bits.fill(0);
      if(!file)throw Error('비밀번호가 맞지 않습니다. 다시 입력해주세요.');
      envelopePromise=null;payload=await envelope(file);
    }else{payload=await envelope();key=await derive(pw,payload);}
    let html;try{html=await decrypt(key,payload);}catch(error){if(error.name==='OperationError')throw Error('비밀번호가 맞지 않습니다. 다시 입력해주세요.');throw error;}
    enter(html,key,payload);
  }catch(error){busy=false;$('unlockButton').disabled=false;status(error.message||'자료를 열지 못했습니다. 다시 시도해주세요.',true);$('sharedPassword').focus();$('sharedPassword').select();}
};
if(rememberKey) cached();
else if(!supported()) status('최신 Chrome, Edge 또는 Safari에서 열어주세요.',true);
})();
