'use strict';
(() => {
  const $=id=>document.getElementById(id), dialog=$('applicationDialog');
  let student, epoch=0, store, user, stop, ready=false, busy=false, records=new Set(), target, desired, notice='';
  const key=r=>[r.school,r.campus,r.department,r.field,r.track].join('|');
  function refresh(){
    for(const line of $('rows').children){
      const mark=line.querySelector('.confirmed');
      if(mark)mark.hidden=!ready || !records.has(line.dataset.choice);
    }
    $('recordAccount').textContent=ready?'연결된 상담 계정':'지원 기록 연결';
    $('recordStatus').textContent=notice;
    if(!dialog.open)return;
    $('recordMessage').textContent=notice || (ready && user?user.email:'');
    $('recordGoogle').hidden=!store || !!user;
    $('recordLogout').hidden=!user;
    $('recordGoogle').disabled=$('recordLogout').disabled=busy;
    $('recordSave').hidden=!target || !ready;
    $('recordSave').disabled=busy;
    $('recordSave').textContent=desired?'지원 확정':'확정 취소';
    $('recordClose').disabled=busy && ready;
  }
  function detached(){
    ++epoch;
    if(stop)stop();
    stop=null;ready=false;busy=false;records=new Set();notice='';
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
      if(!allowed){busy=false;notice='상담자로 등록된 Google 계정을 선택해 주세요.';refresh();return;}
      sessionStorage.setItem('placement-record-session','1');
      stop=store.subscribe(student,confirmed=>{
        if(token!==epoch)return;
        const wasReady=ready;
        records=confirmed;ready=true;
        if(!wasReady){busy=false;notice='';if(target)desired=!records.has(key(target));}
        refresh();
      },err=>{
        if(token===epoch){ready=false;busy=false;records.clear();notice=message(err);refresh();}
      });
    }catch(err){if(token===epoch){busy=false;notice=message(err);refresh();}}
  }
  function show(row){
    target=row;desired=row?!records.has(key(row)):null;
    $('recordTitle').textContent=row?row.school+' · '+row.department:'상담 계정';
    $('recordMeta').textContent=row?[$('student').textContent,row.campus,row.field,row.track,row.verdict].filter(Boolean).join(' · '):'';
    dialog.showModal();refresh();
    if(!ready)void attach();
  }
  $('recordGoogle').onclick=()=>attach(true);
  $('recordLogout').onclick=async()=>{
    detached();const token=epoch;busy=true;refresh();
    try{await store.logout();sessionStorage.removeItem('placement-record-session');if(token===epoch){user=null;notice='업무 계정 연결을 해제했습니다.';}}
    catch(err){if(token===epoch)notice=message(err);}
    finally{if(token===epoch){busy=false;refresh();}}
  };
  $('recordSave').onclick=async()=>{
    if(!ready||busy||!target)return;
    const token=epoch,row=target,confirmed=desired;
    busy=true;notice='저장 중입니다.';refresh();
    try{
      await store.save(student,row,confirmed);
      if(token!==epoch)return;
      notice=confirmed?'지원을 확정했습니다.':'지원 확정을 취소했습니다.';
      dialog.close();
    }catch(err){if(token===epoch)notice=message(err);}
    finally{if(token===epoch){busy=false;refresh();}}
  };
  $('recordClose').onclick=()=>dialog.close();
  dialog.oncancel=e=>{if(busy && ready)e.preventDefault();};
  dialog.onclose=()=>{target=null;};
  $('recordAccount').onclick=()=>show(null);
  window.applicationRecords={
    select(id){
      detached();student=id;target=null;if(dialog.open)dialog.close();refresh();
      if(id && sessionStorage.getItem('placement-record-session'))void attach();
    },
    bind(line,row,box){
      if(!student)return;
      line.dataset.choice=key(row);line.tabIndex=0;line.setAttribute('role','button');
      line.title='더블클릭 또는 Enter로 지원 기록 열기';
      line.ondblclick=()=>show(row);
      line.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(row);}};
      const mark=document.createElement('small');mark.className='confirmed';mark.textContent='지원 확정 ✓';
      mark.hidden=!ready||!records.has(key(row));box.append(mark);
    }
  };
})();
