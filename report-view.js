'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const utf8 = s => new TextEncoder().encode(s);
  const from64 = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
  const normalize = s => s.normalize('NFKC').replace(/\s/g,'').toLowerCase();
  const bands=['전체','적정','안정','도전'];
  let access, master, report, selected, band, serial=0;
  const el=(tag,text,cls)=>{
    const node=document.createElement(tag);
    if(text!=null)node.textContent=text;
    if(cls)node.className=cls;
    return node;
  };
  const badge=b=>el('span',b,'band '+b);
  async function decrypt(key, bytes, label){
    const raw=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes);
    return crypto.subtle.decrypt({name:'AES-GCM',iv:raw.subarray(0,12),additionalData:utf8(label)},key,raw.subarray(12));
  }
  const aes=bytes=>crypto.subtle.importKey('raw',bytes,'AES-GCM',false,['decrypt']);
  const sign=text=>crypto.subtle.sign('HMAC',master,utf8(text));
  const hex=bytes=>Array.from(new Uint8Array(bytes),v=>v.toString(16).padStart(2,'0')).join('');
  async function loadAccess(){
    const response=await fetch('report-access.json',{cache:'no-store'});
    if(!response.ok)throw Error('상담 자료를 불러오지 못했습니다. 잠시 후 다시 시도하세요.');
    const a=await response.json();
    if(!/^[a-f0-9]{16}$/.test(a.version)||a.iterations!==600000||!Array.isArray(a.slots))throw Error('상담 자료 버전을 확인해주세요.');
    return a;
  }
  $('showPw').onclick=()=>{
    const reveal=$('password').type==='password';
    $('password').type=reveal?'text':'password';
    $('showPw').textContent=reveal?'숨기기':'보기';
    $('showPw').setAttribute('aria-pressed',String(reveal));
    $('showPw').setAttribute('aria-label',reveal?'암호 숨기기':'암호 표시');
  };
  $('login').onsubmit=async e=>{
    e.preventDefault();
    const btn=$('login').querySelector('button[type=submit]');
    if(btn.disabled)return;
    btn.disabled=true;$('loginStatus').textContent='상담실을 여는 중입니다…';
    try{
      if(!window.crypto?.subtle||!window.DecompressionStream)throw Error('최신 Chrome, Edge 또는 Safari에서 열어주세요.');
      const a=await loadAccess();
      const base=await crypto.subtle.importKey('raw',utf8($('password').value.trim()),'PBKDF2',false,['deriveKey']);
      const wk=await crypto.subtle.deriveKey({name:'PBKDF2',iterations:a.iterations,salt:from64(a.salt),hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['decrypt']);
      let bytes;
      for(const wrap of a.slots){
        try{bytes=await decrypt(wk,from64(wrap),'placement-key:'+a.version);break;}
        catch(error){if(error.name!=='OperationError')throw error;}
      }
      if(!bytes)throw Error('암호를 확인해주세요. 모의고사 상담용 암호를 입력하세요.');
      master=await crypto.subtle.importKey('raw',bytes,{name:'HMAC',hash:'SHA-256'},false,['sign']);
      new Uint8Array(bytes).fill(0);access=a;
      $('password').value='';$('loginStatus').textContent='';
      $('gate').hidden=true;$('app').hidden=false;$('lock').hidden=false;$('name').focus();
    }catch(err){$('loginStatus').textContent=err.message;$('password').focus();}
    finally{btn.disabled=false;}
  };
  $('lock').onclick=()=>location.reload();
  window.addEventListener('pageshow',e=>{if(e.persisted)location.reload();});
  async function loadFile(id,key,missingOK=false){
    if(!/^[a-f0-9]{64}$/.test(id))throw Error('자료 번호를 확인할 수 없습니다.');
    const response=await fetch('reports/'+access.version+'/'+id+'.bin',{cache:'no-store'});
    if(missingOK&&response.status===404){
      if((await loadAccess()).version!==access.version)throw Error('상담 자료가 갱신됐습니다. 새로고침 후 다시 열어주세요.');
      return null;
    }
    if(!response.ok)throw Error('자료를 불러오지 못했습니다. 다시 조회해주세요.');
    const clear=await decrypt(await aes(key),await response.arrayBuffer(),id);
    return new Response(new Blob([clear]).stream().pipeThrough(new DecompressionStream('gzip'))).json();
  }
  function resetReport(){
    window.applicationRecords.select(null);
    report=null;selected=null;$('report').hidden=true;
    for(const id of ['student','branch','english','math','school','schoolBand','count','bands','rows','schools','exams','choices','status'])$(id).replaceChildren();
    $('department').value='';$('history').open=false;
  }
  async function choose(match,token){
    const data=await loadFile(match.id,from64(match.key));
    if(token!==serial)return;
    report=data;$('choices').replaceChildren();$('status').textContent='';
    $('student').textContent=data.name;$('branch').textContent=data.branch+' · '+data.asof.replaceAll('-','.')+' 기준';
    [$('english').textContent,$('math').textContent]=data.metrics;
    $('field').value=$('track').value=band='전체';
    $('history').hidden=!data.history.length;
    $('exams').replaceChildren(...data.history.map(r=>{const tr=el('tr');tr.append(...r.map(v=>el('td',v)));return tr;}));
    const studentId=match.studentId || (access.version==='6653734d48f11192'?match.id:null);
    window.applicationRecords.select(studentId);
    $('report').hidden=false;renderSchools();
  }
  function fail(token){if(token===serial)$('status').textContent='결과를 열지 못했습니다. 새로고침 후 다시 조회해주세요.';}
  $('name').oninput=()=>{++serial;resetReport();};
  $('search').onsubmit=async e=>{
    e.preventDefault();
    const name=normalize($('name').value), token=++serial;
    resetReport();if(!name)return;
    $('status').textContent='조회 중입니다…';
    try{
      const id=hex(await sign('path:'+name));
      const matches=await loadFile(id,await sign('name-key:'+name),true);
      if(token!==serial)return;
      if(!matches){$('status').textContent='일치하는 학생이 없습니다. 이름 전체를 확인해주세요.';return;}
      if(matches.length===1){await choose(matches[0],token);return;}
      $('status').textContent='같은 이름의 학생이 있습니다. 분원과 끝번호를 확인해주세요.';
      $('choices').replaceChildren(...matches.map(m=>{
        const b=el('button',m.branch+(m.tail?' · 끝 '+m.tail:''));
        b.onclick=()=>{const t=++serial;choose(m,t).catch(()=>fail(t));};
        return b;
      }));
    }catch(err){if(token===serial)$('status').textContent=err.message.includes('갱신')?err.message:'조회하지 못했습니다. 잠시 후 다시 시도해주세요.';}
  };
  function renderRows(){
    const school=selected==null?null:report.schools[selected];
    $('school').textContent=school?.school||'학과별 결과';
    const q=normalize($('department').value), field=$('field').value, track=$('track').value;
    const matching=(school?.rows||[]).filter(([name,,,t])=>(track==='전체'||t.replace(/\s/g,'').startsWith(track))&&normalize(name).includes(q));
    const rows=matching.filter(([,f])=>field==='전체'||field===f);
    $('quotaSchool').hidden=!school;
    if(school)$('quotaSchool').href='quotas/?school='+encodeURIComponent(school.school);
    const compare=school?.school==='가천대학교';
    $('quotaSchool').textContent=compare?'2026·2027 모집인원 비교 ↗':'2027 모집인원 ↗';
    const quotaLines=[];
    $('fieldBasis').hidden=!school||field==='전체';
    $('allFields').hidden=matching.length===rows.length;
    $('allFields').textContent='계열 전체로 보기 ('+matching.length+'건)';
    $('rows').replaceChildren(...rows.map(([name,f,c,t,b,overlap])=>{
      const line=el('div',null,'dept'), title=el('div');
      title.append(el('b',name),el('small',[f,c,t].filter(Boolean).join(' · ')));
      if(compare)quotaLines.push({name,track:t,meta:title.lastChild});
      const verdict=el('div',null,'verdict');
      verdict.append(badge(b));
      if(b==='도전' && overlap===true)verdict.append(el('small','최근 성적은 합격권에 닿음','overlap'));
      window.applicationRecords.bind(line,{school:school.school,campus:c,department:name,field:f,track:t,verdict:b},verdict);
      line.append(title,verdict);return line;
    }));
    if(!rows.length)$('rows').textContent='표시할 학과가 없습니다.';
    if(compare){
      const linkText=el('span',$('quotaSchool').textContent);
      $('quotaSchool').replaceChildren(linkText);
      showQuotaNumbers(quotaLines,linkText,track);
    }
    $('rows').scrollTop=0;
  }
  async function showQuotaNumbers(lines,linkText,selectedTrack){
    try{
      const {gachonTrend,change}=await import('./quotas/trend.js');
      const {names,before,after}=await gachonTrend();
      if(!linkText.isConnected)return;
      const tracks=selectedTrack==='전체'?['일반','학사']:[selectedTrack];
      const counts=tracks.map(t=>{
        const i=after.headers.indexOf(t);
        return t+' '+before.totals[i]+' → '+after.totals[i]+'명';
      });
      linkText.textContent='학교 모집인원 (2026 → 2027) · '+counts.join(' · ')+' ↗';
      for(const {name,track,meta} of lines){
        const label=track.replace(/\s/g,'').replace(/편입(?:학)?$/,'');
        const index=after.headers.indexOf(label);
        if(index===-1)continue;
        const pair=names.get(name.trim());
        if(!pair){meta.append(' · 모집요강 학과명 대조 필요');continue;}
        const col=index+1,a=pair.before?.[col],b=pair.after?.[col];
        const prev=a!=null?a+'명':pair.before?'미기재':'명칭 없음';
        const next=b!=null?b+'명':pair.after?'미기재':'명칭 없음';
        const delta=change(a,b);
        meta.append(' · 모집 2026 '+prev+' → 2027 '+next+(delta==='—'?'':' ('+delta+(a===b?'':'명')+')'));
      }
    }catch{ /* The school link still opens the original quotas. */ }
  }
  function renderSchools(){
    const view=report.views[$('field').value+'|'+$('track').value];
    const visible=view.filter(([,b])=>band==='전체'||b===band);
    if(!visible.some(([i])=>i===selected))selected=visible[0]?.[0]??null;
    $('count').textContent=visible.length+'개교';
    $('bands').replaceChildren(...bands.map(b=>{
      const btn=el('button',b);btn.setAttribute('aria-pressed',String(b===band));
      btn.onclick=()=>{band=b;$('department').value='';renderSchools();};return btn;
    }));
    $('schoolBand').replaceChildren();
    $('schools').replaceChildren(...visible.map(([i,b])=>{
      const btn=el('button');btn.append(el('span',report.schools[i].school),badge(b));
      btn.setAttribute('aria-current',String(i===selected));
      if(i===selected)$('schoolBand').append(badge(b));
      btn.onclick=()=>{selected=i;$('department').value='';renderSchools();};return btn;
    }));
    if(!visible.length)$('schools').textContent='판정할 수 있는 학교가 없습니다.';
    renderRows();
  }
  $('track').onchange=$('field').onchange=()=>{band='전체';$('department').value='';renderSchools();};
  $('department').oninput=renderRows;
  $('allFields').onclick=()=>{
    $('field').value='전체';
    const newBand=report.views['전체|'+$('track').value].find(([i])=>i===selected)?.[1];
    if(band!==newBand)band='전체';
    renderSchools();
  };
})();
