'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const utf8 = s => new TextEncoder().encode(s);
  const from64 = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
  const normalize = s => s.normalize('NFKC').replace(/\s/g,'').toLowerCase();
  const bands=['전체','적정','안정','도전'];
  const kauName='한국항공대학교', airBusiness='항공·경영대학';
  const isAirBusiness=(school,name)=>school===kauName&&name===airBusiness;
  const matchesTrack=(track,row)=>track==='전체'||row[3].replace(/\s/g,'').startsWith(track);
  function matchesField(field,school,[name,actual]){
    if(isAirBusiness(school,name))actual='인문';
    return field==='전체'||field===actual||actual==='이학·사회';
  }
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
    $('percentileBasis').open=false;$('basisRows').replaceChildren();$('basisNote').textContent='';
  }
  let quotaBasis;
  function loadQuotaBasis(){
    if(!quotaBasis){
      quotaBasis=Promise.all([sign('quota-basis:path'),sign('quota-basis:key')])
        .then(([id,key])=>loadFile(hex(id),key)).catch(error=>{quotaBasis=null;throw error;});
    }
    return quotaBasis;
  }
  async function renderQuotaBasis(root,school,row){
    const [department,,,track]=row;
    const current=school.seats?.[track+'|'+department];
    const currentLine=el('p','2027학년도 '+(school.majors?.[department]?'공동 모집인원 ':'모집인원 '));
    if(current!=null)currentLine.append(el('strong',current+'명'));
    else{
      const guide=el('a','모집요강에서 확인 ↗');
      guide.href='quotas/?school='+encodeURIComponent(school.school);
      guide.target='_blank';guide.rel='noopener';currentLine.append(guide);
    }
    root.replaceChildren(el('h3',row[7]?'비교 구간과 모집인원':'모집인원'),currentLine);
    if(!row[7])return;
    const historic=el('div','과거 모집인원을 불러오는 중입니다…');
    root.append(historic);
    try{
      const units=await loadQuotaBasis();
      if(!historic.isConnected)return;
      const [indices,mask]=row[7];
      const cohorts=indices.map(i=>{
        const [key,entries]=units[i];
        const [,type,name]=key.split('|');
        return {name,type,entries:entries.filter(([, , ,e,m])=>((mask&1)&&e)||((mask&2)&&m))};
      });
      const entries=cohorts.flatMap(c=>c.entries);
      const counts=entries.map(r=>r[2]).filter(n=>n!=null);
      const low=Math.min(...counts),high=Math.max(...counts);
      const range=low===high?String(low):low+'~'+high;
      const overview=counts.length?'과거 모집인원 '+range+'명 · '+entries.length+'건 중 '+counts.length+'건 확인':'과거 모집인원 확인 필요';
      const detail=el('details');detail.append(el('summary','연도별 모집인원과 합격자 기록'));
      historic.replaceChildren(el('p',overview),detail);
      if(cohorts.length>1)detail.append(el('p','개편 전 비교에 쓰인 모집단위별 인원입니다.'));
      for(const {name,type,entries} of cohorts){
        const table=el('table'), header=el('tr'), tbody=el('tbody');
        table.append(el('caption',name+' · '+type+'편입'));
        const headings=['학년도','모집인원',...(mask&1?['영어 기록']:[]),...(mask&2?['수학 기록']:[])];
        header.append(...headings.map(h=>{const th=el('th',h);th.scope='col';return th;}));
        const thead=el('thead');thead.append(header);table.append(thead,tbody);
        for(const [year,campus,seats,english,math,source] of entries){
          const tr=el('tr'), count=el('td');
          if(source){const a=el('a',seats+'명');a.href=source;a.target='_blank';a.rel='noopener';count.append(a);}
          else count.textContent=seats!=null?seats+'명':'확인 필요';
          tr.append(el('td',year+(/\([^)]+\)$/.exec(campus)?.[0]||'')),count);
          if(mask&1)tr.append(el('td',english+'건'));
          if(mask&2)tr.append(el('td',math+'건'));
          tbody.append(tr);
        }
        detail.append(table);
      }
      detail.append(el('p','합격자 기록은 비교 구간에 쓰인 과목별 모의고사 기록 수입니다. 모집인원은 상담 시 참고할 수 있으며 판정 구간은 성적 자료로 계산합니다.'));
    }catch{
      if(historic.isConnected)historic.textContent='과거 모집인원을 불러오지 못했습니다. 학과를 다시 열어주세요.';
    }
  }
  function renderBasis(data){
    $('percentileBasis').hidden=!data.basis;
    if(!data.basis)return;
    $('basisNote').textContent=data.basis.note+' 백분위는 소수 첫째 자리까지 표시합니다.';
    $('basisRows').replaceChildren(...['영어','수학'].map((subject,i)=>{
      const group=el('section'), months=data.basis[subject];
      group.append(el('h3',subject+' 백분위 '+data.metrics[i]));
      if(!months.length){group.append(el('p','반영 조건을 충족한 시험이 없습니다.'));return group;}
      const list=el('ul');
      for(const m of months){
        const exams=m.exams.map(([d,kind,p])=>Number(d.slice(2,4))+'/'+Number(d.slice(4))+' '+kind+' '+p.toFixed(1)).join(' · ');
        list.append(el('li','20'+m.month.slice(0,2)+'년 '+Number(m.month.slice(2))+'월 대표값 '+m.value.toFixed(1)+' ('+exams+')'));
      }
      const method=['이 달의 대표값','두 달 대표값의 평균','세 달 대표값 중 가운데 값'][months.length-1];
      group.append(list,el('p',method+'을 적용한 상담 백분위는 '+data.metrics[i]+'입니다.'));
      return group;
    }));
  }
  async function choose(match,token){
    const data=await loadFile(match.id,from64(match.key));
    if(token!==serial)return;
    report=data;$('choices').replaceChildren();$('status').textContent='';
    $('student').textContent=data.name;$('branch').textContent=data.branch+' · '+data.asof.replaceAll('-','.')+' 기준';
    [$('english').textContent,$('math').textContent]=data.metrics;
    renderBasis(data);
    $('field').value=$('track').value=band='전체';
    $('history').hidden=!data.history.length;
    $('exams').replaceChildren(...data.history.map(r=>{const tr=el('tr');tr.append(...r.map(v=>el('td',v)));return tr;}));
    const studentId=match.studentId || (access.version==='6653734d48f11192'?match.id:null);
    window.applicationRecords.select(studentId,data.schools);
    $('report').hidden=false;renderSchools();
  }
  function fail(token){if(token===serial)$('status').textContent='결과를 열지 못했습니다. 새로고침 후 다시 조회해주세요.';}
  const input=$('name'), suggestions=$('suggestions');
  let pendingTimer, suggestionToken=0, lastLetter, lastBucket, composing=false;
  function closeSuggestions(){
    clearTimeout(pendingTimer);++suggestionToken;
    suggestions.hidden=true;suggestions.replaceChildren();
  }
  async function fetchNames(letter){
    return loadFile(hex(await sign('suggest-path:'+letter)),await sign('suggest-key:'+letter),true);
  }
  async function matchingNames(query){
    const [letter]=query;
    if(letter!==lastLetter){
      lastLetter=letter;
      lastBucket=fetchNames(letter);
    }
    let rows;
    try{rows=await lastBucket;}catch(err){if(lastLetter===letter)lastLetter=null;throw err;}
    return (rows||[]).filter(([name])=>normalize(name).includes(query)).sort(([a,,c],[b,,d])=>
      Number(!normalize(a).startsWith(query))-Number(!normalize(b).startsWith(query))||a.localeCompare(b,'ko')||c.localeCompare(d,'ko'));
  }
  function showSuggestions(options){
    suggestions.replaceChildren(...options.map(([name,index,branch,tail])=>{
      const button=el('button');button.type='button';
      button.append(el('b',name),el('small',[branch,tail&&'끝 '+tail].filter(Boolean).join(' · ')));
      button.onclick=()=>{input.value=name;input.focus();lookup(index);};
      return button;
    }));
    suggestions.hidden=!options.length;
  }
  input.oninput=()=>{
    ++serial;resetReport();closeSuggestions();
    const query=normalize(input.value),token=suggestionToken;
    if(!access?.suggestions||!query)return;
    pendingTimer=setTimeout(async()=>{
      try{
        const options=await matchingNames(query);
        if(token===suggestionToken)showSuggestions(options);
      }catch{if(token===suggestionToken)$('status').textContent='이름 추천을 불러오지 못했습니다. 이름 전체로 조회할 수 있습니다.';}
    },100);
  };
  document.addEventListener('focusin',e=>{if(!$('search').contains(e.target))closeSuggestions();});
  document.addEventListener('pointerdown',e=>{if(!$('search').contains(e.target))closeSuggestions();});
  input.oncompositionstart=()=>{composing=true;};
  input.oncompositionend=()=>{composing=false;};
  $('search').onkeydown=e=>{
    if(e.isComposing||e.keyCode===229)return;
    if(e.key==='Escape'){closeSuggestions();input.focus();return;}
    if(suggestions.hidden)return;
    const option=e.target.closest('#suggestions button');
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      e.preventDefault();
      (e.key==='ArrowDown'?(option?option.nextElementSibling||option:suggestions.firstElementChild):(option?.previousElementSibling||input)).focus();
    }
  };
  $('search').onsubmit=e=>{e.preventDefault();if(!composing)lookup();};
  async function lookup(index){
    closeSuggestions();
    const name=normalize(input.value), token=++serial, menuToken=suggestionToken;
    resetReport();if(!name)return;
    $('status').textContent='조회 중입니다…';
    try{
      const id=hex(await sign('path:'+name));
      const matches=await loadFile(id,await sign('name-key:'+name),true);
      if(token!==serial)return;
      if(!matches){
        const options=access.suggestions?await matchingNames(name):[];
        if(token!==serial)return;
        if(options.length===1){input.value=options[0][0];return lookup(options[0][1]);}
        $('status').textContent=options.length?'학생을 선택해 주세요.':'일치하는 학생이 없습니다. 이름을 확인해주세요.';
        if(menuToken===suggestionToken)showSuggestions(options);return;
      }
      if(Number.isInteger(index)){await choose(matches[index],token);return;}
      if(matches.length===1){await choose(matches[0],token);return;}
      $('status').textContent='같은 이름의 학생이 있습니다. 분원과 끝번호를 확인해주세요.';
      $('choices').replaceChildren(...matches.map(m=>{
        const b=el('button',m.branch+(m.tail?' · 끝 '+m.tail:''));
        b.onclick=()=>{const t=++serial;choose(m,t).catch(()=>fail(t));};
        return b;
      }));
    }catch(err){if(token===serial)$('status').textContent=err.message.includes('갱신')?err.message:'조회하지 못했습니다. 잠시 후 다시 시도해주세요.';}
  }
  function renderRows(){
    const school=selected==null?null:report.schools[selected];
    $('school').textContent=school?.school||'학과별 결과';
    const q=normalize($('department').value), field=$('field').value, track=$('track').value;
    const matching=(school?.rows||[]).filter(row=>{
      const [name]=row;
      return matchesTrack(track,row)&&(normalize(name).includes(q)||school.majors?.[name]?.some(m=>normalize(m).includes(q)));
    });
    const rows=matching.filter(row=>matchesField(field,school.school,row));
    const grouped=!!school?.catalogYear && track==='전체';
    const sections=new Map();
    if(school?.unitOrder)rows.sort((a,b)=>school.unitOrder.indexOf(a[0])-school.unitOrder.indexOf(b[0])||a[3].localeCompare(b[3],'ko'));
    const reasons=new Map((school?.rows||[]).map((row,i)=>[row,school.reasons?.[i]]));
    $('quotaSchool').hidden=!school;
    if(school)$('quotaSchool').href='quotas/?school='+encodeURIComponent(school.school);
    const isKau=school?.school===kauName;
    const compactKau=grouped&&isKau&&rows.filter(([name])=>name===airBusiness).length===2;
    const compare=school?.school==='가천대학교'||isKau;
    $('quotaSchool').textContent=school?.school==='수원대학교'?'2027 모집인원·전형일정 ↗':compare?'2026·2027 모집인원 비교 ↗':'2027 모집인원 ↗';
    const quotaLines=[];
    $('fieldBasis').hidden=!school||(!school.catalogYear && field==='전체');
    $('fieldBasis').textContent=school?.catalogYear?'2027 모집요강의 일반·학사 선발 모집단위입니다. 인문·자연은 상담용 분류입니다.':'원자료에 계열이 없으면 과거 합격자의 수학 모의고사 응시 비율로 추정합니다.';
    $('allFields').hidden=matching.length===rows.length;
    $('allFields').textContent='계열 전체로 보기 ('+matching.length+'건)';
    const lines=rows.map(row=>{
      const [name,f,c,t,b,marker,estimate]=row;
      const compact=compactKau&&name===airBusiness;
      const fieldLabel=isAirBusiness(school.school,name)?'영어고사':f;
      const estimateLabel=estimate==='midpoint'?'중위권(예상)':estimate;
      const line=el('div',null,'dept'), title=el('div');
      title.append(el('b',grouped?t+'편입':name),el('small',compact?'':[fieldLabel,c,grouped?'':t].filter(Boolean).join(' · ')));
      if(compare)quotaLines.push({name,track:t,compact,meta:title.lastChild});
      if(!grouped&&school.majors?.[name])title.append(el('small',school.majors[name].join(' · ')));
      const verdict=el('div',null,'verdict');
      const verdictBadge=badge(b);
      if(b==='판정 자료 없음')verdictBadge.textContent=estimateLabel?'성적 확인 필요':'판정 미산출';
      verdict.append(verdictBadge);
      if(estimateLabel)verdict.append(el('small',estimateLabel));
      if(b==='도전' && marker==='peak3'){
        line.classList.add('peakReach');
        verdict.append(el('small','영어 상위 3회 기준 적정선 도달','peakNote'));
      }
      const reason=b==='판정 자료 없음'&&!estimateLabel?'':reasons.get(row);
      window.applicationRecords.bind(line,{school:school.school,campus:c,department:name,field:f,track:t,verdict:b},verdict,reason,!!estimateLabel,
        access.quotaBasis?root=>void renderQuotaBasis(root,school,row):undefined);
      line.append(title,verdict);
      if(grouped){
        if(!sections.has(name)){
          const group=el('section',null,compact?'unitGroup compactUnit':'unitGroup');
          group.append(el('h3',name));
          if(school.majors?.[name])group.append(el('small',school.majors[name].join(' · ')));
          if(compact)group.append(el('small',[fieldLabel,c,school.catalogYear+' 공동 모집'].filter(Boolean).join(' · ')));
          sections.set(name,group);
        }
        sections.get(name).append(line);
        line.setAttribute('aria-label',[name,t,verdictBadge.textContent,estimateLabel].filter(Boolean).join(' · '));
      }
      return line;
    });
    $('rows').replaceChildren(...(grouped?sections.values():lines));
    if(!rows.length)$('rows').textContent='표시할 학과가 없습니다.';
    if(compare){
      const linkText=el('span',$('quotaSchool').textContent);
      $('quotaSchool').replaceChildren(linkText);
      showQuotaNumbers(quotaLines,linkText,track,isKau);
    }
    $('rows').scrollTop=0;
  }
  async function showQuotaNumbers(lines,linkText,selectedTrack,isKau){
    try{
      const {gachonTrend,kauQuotas,change,currentName,seatText}=await import('./quotas/trend.js');
      const guide=isKau?await kauQuotas():null;
      const {names,before,after}=guide?{before:{totals:guide.previousTotals},after:guide}:await gachonTrend();
      if(!linkText.isConnected)return;
      const tracks=selectedTrack==='전체'?['일반','학사']:[selectedTrack];
      linkText.replaceChildren('학교 모집인원 (2026 → 2027) · ');
      tracks.forEach((t,n)=>{
        const i=after.headers.indexOf(t);
        if(n)linkText.append(' · ');
        linkText.append(t+' '+before.totals[i]+' → ',el('strong',after.totals[i]+'명'));
      });
      linkText.append(' ↗');
      if(isKau){
        for(const {name,track,meta,compact} of lines){
          const group=Object.entries(guide.majors).find(([,majors])=>majors.includes(name))?.[0];
          const unit=guide.rows.find(row=>row[0]===(group||name));
          const col=guide.headers.indexOf(track.replace(/편입(?:학)?$/,''));
          if(unit && col>=0 && unit[col+1]!=null){
            if(!compact)meta.append(' · 2027 '+unit[0]+(guide.majors[unit[0]]?' 공동 모집 ':' '));
            meta.append(el('strong',unit[col+1]+'명'));
          }
        }
        return;
      }
      for(const {name,track,meta} of lines){
        const label=track.replace(/\s/g,'').replace(/편입(?:학)?$/,'');
        const index=after.headers.indexOf(label);
        if(index===-1)continue;
        const canonical=currentName(name.trim()),pair=names.get(canonical);
        if(!pair){meta.append(' · 모집요강 학과명 대조 필요');continue;}
        const col=index+1,a=pair.before?.[col],b=pair.after?.[col];
        const prev=a!=null?a+'명':seatText(pair,'before',col);
        const next=b!=null?b+'명':seatText(pair,'after',col);
        const delta=pair.reorganized?'—':change(a,b);
        meta.append(' · 모집 2026 '+(pair.oldName?pair.oldName+' ':'')+prev+' → 2027 '+(pair.oldName?canonical+' ':''),
          b!=null?el('strong',next):next,delta==='—'?'':' ('+delta+(a===b?'':'명')+')');
      }
    }catch{ /* The school link still opens the original quotas. */ }
  }
  function renderSchools(){
    const field=$('field').value, track=$('track').value;
    let view=report.views[field+'|'+track];
    if(field==='자연'){
      // Older saved views include 항공·경영대학 in the school's natural-science verdict.
      const kau=view.findIndex(([i])=>report.schools[i].school===kauName);
      if(kau>=0){
        const [id,previous]=view[kau];
        const rows=report.schools[id].rows.filter(row=>matchesField(field,kauName,row)&&matchesTrack(track,row));
        const order=['도전','적정','안정','판정 자료 없음'];
        const graded=rows.map(row=>row[4]).filter(b=>b!==order[3]).sort((a,b)=>order.indexOf(a)-order.indexOf(b));
        const verdict=graded[Math.floor((graded.length-1)/2)]||order[3];
        if(!rows.length||verdict!==previous){
          view=view.slice();
          view.splice(kau,1,...(rows.length?[[id,verdict]]:[]));
          view.sort((a,b)=>order.indexOf(a[1])-order.indexOf(b[1]));
        }
      }
    }
    const visible=view.filter(([,b])=>band==='전체'||b===band);
    if(!visible.some(([i])=>i===selected))selected=visible[0]?.[0]??null;
    $('count').textContent=visible.length+'개교';
    $('bands').replaceChildren(...bands.map(b=>{
      const btn=el('button',b);btn.setAttribute('aria-pressed',String(b===band));
      btn.onclick=()=>{band=b;$('department').value='';renderSchools();};return btn;
    }));
    $('schoolBand').replaceChildren();
    $('schools').replaceChildren(...visible.map(([i,b])=>{
      const school=report.schools[i], grades=school.rows.filter(r=>r[4]!=='판정 자료 없음' &&
        matchesField(field,school.school,r) && matchesTrack(track,r));
      const estimated=grades.length>0 && grades.every(r=>r[6]);
      const schoolBadge=badge(b);
      if(estimated)schoolBadge.append(' (예상)');
      const btn=el('button');btn.append(el('span',school.school),schoolBadge);
      btn.setAttribute('aria-current',String(i===selected));
      if(i===selected)$('schoolBand').append(schoolBadge.cloneNode(true));
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
