'use strict';
(() => {
  const $=id=>document.getElementById(id), dialog=$('applicationDialog'), retry=$('recordRetry');
  let student, epoch=0, store, user, stop, ready=false, busy=false, records=new Set(), target, desired, notice='';
  const key=r=>[r.school,r.campus,r.department,r.field,r.track].join('|');
  let currentUnits=new Map(), waitingRegistration=false;
  let panelRow, panelLine, panelMessage='';
  function refresh(){
    for(const line of $('rows').querySelectorAll('.dept')){
      const mark=line.querySelector('.confirmed');
      if(mark)mark.hidden=!ready || !records.has(line.dataset.choice);
    }
    $('recordAccount').textContent=ready?'연결된 상담 계정':waitingRegistration?'상담자 등록 확인':'지원 기록 연결';
    $('recordStatus').textContent=notice;
    if(panelRow){
      const confirmed=ready && records.has(key(panelRow));
      $('panelSave').textContent=confirmed?'확정 취소':'지원 확정';
      const unavailable=panelLine?.dataset.notOffered==='1'&&!confirmed;
      $('panelSave').disabled=busy||unavailable;
      $('panelStatus').textContent=panelMessage || (confirmed?'지원 확정됨':unavailable?'2027학년도 해당 전형 미선발 · 과거 성적 참고용':'');
    }
    const previous=$('previousChoices');
    previous.replaceChildren();
    if(ready)for(const id of records){
      const [school,campus,department,field,track]=id.split('|');
      if(!currentUnits.has(school)||currentUnits.get(school).has(id))continue;
      const button=document.createElement('button');button.type='button';button.className='quiet';
      button.textContent=[school,campus,department,field,track].filter(Boolean).join(' · ');
      button.onclick=()=>showAccount({school,campus,department,field,track,verdict:'이전 지원 기록'});
      previous.append(button);
    }
    $('previousApplications').hidden=!previous.childElementCount;
    if(!dialog.open)return;
    $('recordMessage').textContent=waitingRegistration?
      user.email+' · 관리자에게 이 이메일의 상담자 등록을 요청해 주세요. 등록 후 아래 버튼을 누르면 바로 확인할 수 있습니다.':
      notice || (ready && user?user.email:'');
    $('recordGoogle').hidden=!store || !!user;
    if(retry)retry.hidden=!user || ready || busy;
    $('recordLogout').hidden=!user;
    $('recordGoogle').disabled=$('recordLogout').disabled=busy;
    $('recordSave').hidden=!target || !ready || (desired && target.verdict==='이전 지원 기록');
    $('recordSave').disabled=busy;
    $('recordSave').textContent=desired?'지원 확정':'확정 취소';
    $('recordClose').disabled=busy && ready;
  }
  function detached(){
    ++epoch;
    if(stop)stop();
    stop=null;ready=false;busy=false;waitingRegistration=false;records=new Set();notice='';
  }
  function message(err){
    switch(err?.code){
      case 'permission-denied':return '기록 권한이 없습니다. 상담 계정 등록과 저장소 규칙을 확인해 주세요.';
      case 'auth/popup-closed-by-user':return 'Google 로그인을 취소했습니다.';
      case 'auth/popup-blocked':return '브라우저에서 Google 로그인 팝업을 허용해 주세요.';
      case 'auth/unauthorized-domain':return 'Firebase에 현재 사이트 도메인을 등록해 주세요.';
      case 'auth/operation-not-allowed':return 'Firebase Authentication에서 Google 로그인 제공업체를 사용 설정하고 저장해 주세요.';
      default:return '지원 기록에 연결하지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요.';
    }
  }
  async function attach(login=false){
    detached();
    const token=epoch;busy=true;notice='지원 기록을 확인하고 있습니다.';refresh();
    try{
      // Call login in the original button gesture once the SDK is available.
      if(!store)store=await import('./application-store.js');
      const account=login?await store.login():await store.account();
      if(token!==epoch)return;
      user=account;
      if(!user){busy=false;notice='등록된 업무용 Google 계정으로 연결해 주세요.';refresh();return;}
      const allowed=await store.authorized(user);
      if(token!==epoch)return;
      if(!allowed){busy=false;waitingRegistration=true;notice='상담자 등록이 필요합니다.';refresh();return;}
      sessionStorage.setItem('placement-record-session','1');
      stop=store.subscribe(student,confirmed=>{
        if(token!==epoch)return;
        const wasReady=ready;
        if(panelRow && records.has(key(panelRow))!==confirmed.has(key(panelRow)))panelMessage='';
        records=confirmed;ready=true;
        if(!wasReady){busy=false;notice='';if(target)desired=!records.has(key(target));}
        refresh();
      },err=>{
        if(token===epoch){ready=false;busy=false;records.clear();notice=message(err);refresh();}
      });
    }catch(err){if(token===epoch){busy=false;notice=message(err);refresh();}}
  }
  function clearPreview(){
    panelLine?.removeAttribute('aria-current');panelLine=null;panelRow=null;panelMessage='';
    $('panelContent').hidden=true;$('panelEmpty').hidden=false;
    $('recordComparison').replaceChildren();$('recordQuotaBasis').replaceChildren();
    for(const id of ['recordSchool','recordMeta','recordTitle','recordReason','panelStatus'])$(id).textContent='';
  }
  function preview(line,row,reason,estimated,showQuota,displayCampus){
    if(panelLine===line)return;
    panelLine?.removeAttribute('aria-current');panelLine=line;panelRow=row;panelMessage='';
    line.setAttribute('aria-current','true');
    $('panelEmpty').hidden=true;$('panelContent').hidden=false;
    $('recordTitle').textContent=row.department;
    $('recordSchool').textContent=[row.school,row.track && row.track.replace(/편입(?:학)?$/,'')+'편입'].filter(Boolean).join(' / ');
    $('recordMeta').textContent=[$('student').textContent,displayCampus,row.field,estimated].filter(Boolean).join(' · ');
    const grade=$('recordGrade');
    grade.querySelector('b').textContent=row.verdict==='판정 자료 없음'?'판정 미산출':row.verdict;
    grade.dataset.band=row.verdict;
    const chart=$('recordComparison');chart.replaceChildren();
    $('recordJustification').hidden=!reason;
    $('recordReason').textContent=estimated||row?.verdict==='판정 자료 없음'?reason:
      reason?'판정 근거 · '+reason+' 비교 구간은 같은 학교·학과·전형의 과거 합격 자료를 바탕으로 정합니다. 구간 아래는 도전, 구간 안은 적정, 상한을 넘으면 안정입니다.':'';
    const quota=$('recordQuotaBasis');
    if(quota){quota.replaceChildren();quota.hidden=!showQuota;if(showQuota)showQuota(quota,chart);}
    $('recordJustification').open=!!reason && !chart.childElementCount;
    refresh();
  }
  function showAccount(row){
    target=row;desired=row?!records.has(key(row)):null;
    $('accountTitle').textContent=row?.verdict==='이전 지원 기록'?'이전 지원 기록':'상담 계정';
    $('accountTarget').textContent=row?[$('student').textContent,row.school,row.department,row.track].filter(Boolean).join(' · '):'';
    dialog.showModal();refresh();
    if(!ready&&!busy)void attach();
  }
  $('recordGoogle').onclick=()=>attach(true);
  if(retry)retry.onclick=()=>attach();
  $('recordLogout').onclick=async()=>{
    detached();const token=epoch;busy=true;refresh();
    try{await store.logout();sessionStorage.removeItem('placement-record-session');if(token===epoch){user=null;notice='업무 계정 연결을 해제했습니다.';}}
    catch(err){if(token===epoch)notice=message(err);}
    finally{if(token===epoch){busy=false;refresh();}}
  };
  async function save(row,confirmed){
    if(!row||!ready||busy)return;
    const token=epoch, beforeWrite=records;
    busy=true;notice='저장 중입니다.';refresh();
    try{
      await store.save(student,row,confirmed);
      if(token!==epoch)return;
      if(records===beforeWrite){
        if(confirmed)records.add(key(row));else records.delete(key(row));
      }
      const result=confirmed?'지원을 확정했습니다.':'지원 확정을 취소했습니다.';
      notice=[row.school,row.department,row.track].filter(Boolean).join(' · ')+' — '+result;
      if(panelRow && key(panelRow)===key(row))panelMessage=result;
      if(dialog.open && target===row)dialog.close();
    }catch(err){if(token===epoch){notice=message(err);if(panelRow && key(panelRow)===key(row))panelMessage=notice;}}
    finally{if(token===epoch){busy=false;refresh();}}
  }
  function toggle(row){
    if(!row)return;
    if(!ready){showAccount(row);return;}
    void save(row,!records.has(key(row)));
  }
  $('panelSave').onclick=()=>toggle(panelRow);
  $('panelClose').onclick=()=>{
    panelLine?.focus({preventScroll:true});
    clearPreview();
  };
  $('recordSave').onclick=()=>save(target,desired);
  $('recordClose').onclick=()=>dialog.close();
  dialog.oncancel=e=>{if(busy && ready)e.preventDefault();};
  dialog.onclose=()=>{target=null;};
  $('recordAccount').onclick=()=>showAccount(null);
  window.applicationRecords={
    clearPreview,
    select(id,schools=[]){
      currentUnits=new Map(schools.map(s=>[s.school,new Set(s.rows.map(r=>[s.school,r[9]?.recordCampus??r[2],r[0],r[1],r[3]].join('|')))]));
      clearPreview();$('previousApplications').open=false;
      detached();student=id;target=null;if(dialog.open)dialog.close();refresh();
      if(id && sessionStorage.getItem('placement-record-session'))void attach();
    },
    bind(line,row,box,reason,estimated=false,showQuota,displayCampus=row.campus){
      if(!student)return;
      line.dataset.choice=key(row);line.tabIndex=0;line.setAttribute('role','button');
      line.title='클릭하면 판정 근거 보기 · 더블클릭하면 지원 확정 또는 취소';
      line.setAttribute('aria-controls','departmentPanel');
      const open=()=>preview(line,row,reason,estimated,showQuota,displayCampus);
      line.onclick=open;
      line.ondblclick=()=>{
        if(line.dataset.notOffered==='1'&&!records.has(key(row))){open();refresh();return;}
        toggle(row);
      };
      line.onkeydown=e=>{
        if(e.key==='Enter'||e.key===' '){
          e.preventDefault();if(e.repeat)return;
          open();$('recordTitle').focus();
        }
      };
      const mark=document.createElement('small');mark.className='confirmed';mark.textContent='지원 확정 ✓';
      mark.hidden=!ready||!records.has(key(row));box.append(mark);
    }
  };
})();
