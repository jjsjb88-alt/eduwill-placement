'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const utf8 = s => new TextEncoder().encode(s);
  const from64 = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
  const normalize = s => s.normalize('NFKC').replace(/\s/g,'').toLowerCase();
  const bands=['전체','적정','안정','도전'];
  const kauName='한국항공대학교', airBusiness='항공·경영대학';
  const currentSeatSchools=new Map([['숙명여자대학교','sookmyung'],['건국대학교','konkuk'],['경기대학교','kyonggi'],['국민대학교','kookmin']]);
  const knownKonkukGlocal=/^(ICT융합공학부|국제비즈니스학부|바이오융합과학부)\//;
  const isAirBusiness=(school,name)=>school===kauName&&name===airBusiness;
  const loadCounselingSeats=school=>import('./quotas/counseling-seats.js?v=20261126-kookmin').then(({counselingSeats})=>counselingSeats(school));
  const matchesTrack=(track,row)=>track==='전체'||row[3].replace(/\s/g,'').startsWith(track);
  function matchesField(field,school,[name,actual]){
    if(isAirBusiness(school,name))actual='인문';
    return field==='전체'||field===actual||actual==='이학·사회';
  }
  let access, master, report, selected, band, serial=0;
  let kyonggiSeats, kyonggiSeatsPending;
  const supplementIndexes=new Map();
  const el=(tag,text,cls)=>{
    const node=document.createElement(tag);
    if(text!=null)node.textContent=text;
    if(cls)node.className=cls;
    return node;
  };
  const badge=b=>el('span',b,'band '+b);
  const challengeGaps=new WeakMap();
  function gapText(distance){
    if(distance==null)return '차이 미산출';
    if(distance>0&&distance<.01)return '적정까지 0.01점 미만';
    return '적정까지 '+distance.toLocaleString('ko-KR',{minimumFractionDigits:1,maximumFractionDigits:2})+'점';
  }
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
  async function loadSupplement(match,file){
    try{
      if(!supplementIndexes.has(file))supplementIndexes.set(file,
        fetch('reports/'+access.version+'/'+file+'.json',{cache:'no-cache'}).then(response=>{
          if(!response.ok)throw Error('기출 자료를 열 수 없습니다.');
          return response.json();
        }).catch(error=>{supplementIndexes.delete(file);throw error;}));
      const encrypted=(await supplementIndexes.get(file))[match.id];
      if(!encrypted)return;
      const clear=await decrypt(await aes(from64(match.key)),from64(encrypted),file+':'+match.id);
      return JSON.parse(new TextDecoder().decode(clear));
    }catch{ /* Existing counseling reports are still available. */ }
  }
  function resetReport(){
    window.applicationRecords.select(null);
    report=null;selected=null;$('report').hidden=true;
    for(const id of ['student','branch','english','math','school','schoolBand','count','bands','rows','schools','exams','choices','status'])$(id).replaceChildren();
    $('department').value='';$('history').open=false;
    $('percentileBasis').open=false;$('basisRows').replaceChildren();$('basisNote').textContent='';
    $('pastScores').open=false;$('pastScores').hidden=true;$('pastScoreRows').replaceChildren();
    $('schoolPastScores').hidden=true;$('schoolPastScores').textContent='';
    $('archive').open=false;$('archive').hidden=true;$('archiveRows').replaceChildren();
    $('archiveQuery').value='';$('archiveSource').value='raw';$('archiveTrack').value='전체';
  }
  let historical, historicalLoad;
  const schoolBase=s=>s.split('(')[0].trim();
  function archiveRows(){
    if(!report||!historical||!$('archive').open)return;
    const {registry,links}=historical, school=$('archiveSchool').value, track=$('archiveTrack').value;
    const linked=$('archiveSource').value==='links', q=normalize($('archiveQuery').value);
    const frag=document.createDocumentFragment();
    let count=0;
    for(const [i,r] of (linked?links:registry).entries()){
      const [s,c,t,name,data]=linked?r:[r[0],'',r[1],r[2],r[3]];
      if(schoolBase(s)!==school||(track!=='전체'&&track!==t))continue;
      const names=linked?Object.values(data).flatMap(d=>d[1].map(id=>registry[id][2])):[];
      if(![name,...names].some(n=>normalize(n).includes(q)))continue;
      const block=el('details'), title=el('summary');
      title.textContent=[name,c||s.match(/\((.*)\)$/)?.[1],t+'편입'].filter(Boolean).join(' · ');
      block.append(title);
      if(linked&&!Object.keys(data).length){
        const source=registry.filter(([raw,type,n])=>schoolBase(raw)===school&&type===t&&normalize(n)===normalize(name.replace(/[*★Ⓜ❖]+$/u,'')));
        const counts=['영어','수학'].map(sub=>sub+' '+source.reduce((sum,r)=>sum+(r[3][sub]?.n||0),0)+'건');
        block.append(el('p','원장에서 같은 대학·전형·학과명으로 찾은 기록은 '+counts.join(', ')+'입니다. 이 모집단위와 연결할 표본 또는 캠퍼스 근거가 부족해 과목별 구간을 산출하지 않았습니다.'));
      }
      for(const [subject,d] of Object.entries(data)){
        const sourceRows=linked?d[1].map(id=>registry[id]):[r];
        const n=sourceRows.reduce((total,src)=>total+src[3][subject].n,0);
        const bounds=linked?d.slice(2):Number.isFinite(d.q1)?[d.q1,d.q3]:null;
        const years=sourceRows.flatMap(src=>Object.keys(src[3][subject].years)).sort();
        const verdict={'0':'도전','1':'적정','2':'안정'}[report.archiveBands[subject][(linked?registry.length:0)+i]];
        const metric=report.metrics[subject==='영어'?0:1];
        const line=el('p');
        line.append(el('b',subject+' · '+(verdict?'과목 기준 '+verdict:'합격 기록')),document.createTextNode('　'+
          [n+'건',years[0]+(years[0]===years.at(-1)?'':'~'+years.at(-1))+'학년도',
           bounds?'합격자 구간 '+bounds.join('~'):'표본 3건 미만',metric==='—'?'학생 성적 미입력':'학생 '+metric].join(' · ')));
        block.append(line);
        if(linked){
          block.append(el('p',d[0]+' · '+sourceRows.map(src=>src[2]+' '+src[3][subject].n+'건').join(', ')));
          if(d[0].endsWith('계열 추정')||d[0].endsWith('유사 전공 추정'))block.append(el('p','비교 학과마다 합격자 중간 50% 구간을 구한 뒤 하한과 상한의 중앙값을 각각 사용했습니다.'));
        }
        else block.append(el('p',Object.entries(d.years).map(([year,n])=>year+'년 '+n+'건').join(' · ')));
      }
      frag.append(block);count++;
    }
    $('archiveCount').textContent=count+'개 학과·전형'+(linked?' · 2026학년도 명칭 기준':' · 원장 표기 기준');
    $('archiveRows').replaceChildren(frag);
  }
  $('archive').ontoggle=async()=>{
    if(!$('archive').open||!report)return;
    const active=report;
    try{
      historicalLoad??=Promise.all([sign('historical:path'),sign('historical:key')]).then(([id,key])=>loadFile(hex(id),key));
      historical=await historicalLoad;
      if(report!==active||!$('archive').open)return;
      const schools=[...new Set(historical.registry.map(r=>schoolBase(r[0])))].sort((a,b)=>a.localeCompare(b,'ko'));
      const initial=report.schools[selected]?.school;
      $('archiveSchool').replaceChildren(...schools.map(s=>new Option(s,s)));
      if(schools.includes(initial))$('archiveSchool').value=initial;
      archiveRows();
    }catch{historicalLoad=null;$('archiveCount').textContent='자료를 불러오지 못했습니다. 닫았다 다시 열어주세요.';}
  };
  for(const id of ['archiveSchool','archiveSource','archiveTrack'])$(id).onchange=archiveRows;
  $('archiveQuery').oninput=archiveRows;
  let quotaBasis;
  function loadQuotaBasis(){
    if(!quotaBasis){
      quotaBasis=Promise.all([sign('quota-basis:path'),sign('quota-basis:key')])
        .then(([id,key])=>loadFile(hex(id),key)).catch(error=>{quotaBasis=null;throw error;});
    }
    return quotaBasis;
  }
  function renderCriteria(root,row){
    const charts=row[8];
    if(!charts?.length){
      if(row[4]==='판정 자료 없음'){
        const section=el('section',null,'criteria');
        section.append(el('h3','판정 기준'),el('p','최근 백분위　영어 '+(report.metrics?.[0]||'—')+' · 수학 '+(report.metrics?.[1]||'—')),
          el('p','학생의 성적과 학과 비교 구간이 함께 확보된 과목으로 판정합니다. 이 모집단위는 판정에 필요한 자료가 부족합니다.','criteriaNote'));
        root.append(section);
      }
      return;
    }
    const combined=charts[0], legacyWeights=/^영어 (\d+)% · 수학 (\d+)%$/.exec(combined.subject);
    const share=Number.isFinite(row[15])?row[15]:legacyWeights?Number(legacyWeights[1]):null;
    const mixed=share!==null&&share>0&&share<100;
    const separate=charts.some(p=>p.subject==='영어')&&charts.some(p=>p.subject==='수학');
    const only=combined.subject;
    const section=el('section',null,'criteria'),table=el('table');
    section.append(el('h3','판정 기준'));
    let rule;
    if(mixed)rule='영어 '+share+'%와 수학 '+(100-share)+'%를 학생 성적과 비교 구간에 적용합니다. 반올림 전 과목값으로 계산한 최근 가중 백분위는 '+combined.value.toFixed(1)+'입니다.';
    else if(separate)rule='과목별 기준을 적용하는 학과입니다. 영어와 수학을 각각 비교한 뒤 두 판정 중 낮은 쪽을 적용합니다.';
    else if(row[6]?.includes('만 비교'))rule='두 과목 중 비교 자료가 갖춰진 '+only+' 백분위로 추정한 결과입니다.';
    else if(share===null&&row[1]==='자연'&&only==='영어')
      rule='수학 성적과 학과의 수학 비교 구간이 모두 있어야 수학을 반영합니다. 이번 판정은 영어 백분위를 사용합니다.';
    else rule='이 학과는 '+only+' 백분위를 비교 구간에 대조해 판정했습니다.';
    section.append(el('p',rule));
    table.setAttribute('aria-label','과목별 백분위와 기본 판정 반영 기준');
    const head=table.createTHead().insertRow(),body=table.createTBody();
    for(const label of ['과목','최근 백분위','상위 3회 평균','기본 판정 반영']){
      const th=el('th',label);th.scope='col';head.append(th);
    }
    for(const [i,subject] of ['영어','수학'].entries()){
      const tr=body.insertRow(),th=el('th',subject);th.scope='row';tr.append(th);
      const recent=report.metrics?.[i],peak=report.subjectPeaks?.[subject];
      tr.insertCell().textContent=recent!=null&&recent!==''&&Number.isFinite(Number(recent))?recent:'자료 없음';
      tr.insertCell().textContent=Number.isFinite(peak)?peak.toFixed(1):report.subjectPeaks?'3회 미만':'자료 없음';
      const chart=charts.find(p=>p.subject===subject);
      let applied='미반영';
      if(share!==null){
        const weight=i===0?share:100-share;
        if(weight>0)applied=weight+'%';
      }else if(chart){
        applied=separate?(chart.value<chart.low?'도전':chart.value>chart.high?'안정':'적정'):'반영';
      }
      tr.insertCell().textContent=applied;
    }
    section.append(table);
    section.append(el('p',(mixed?'가중':'최근')+' 백분위가 구간 하한보다 낮으면 도전, 구간 안이면 적정, 상한보다 높으면 안정입니다.','criteriaNote'));
    const peakNote=mixed&&Number.isFinite(combined.reference)?
      '참고 그래프에는 영어 상위 3회 평균과 수학 최근 백분위를 반영합니다.':
      '상위 3회 평균은 잘 본 회차의 성적을 살펴보는 참고값입니다.';
    section.append(el('p',peakNote,'criteriaNote'));
    root.append(section);
  }
  function renderComparison(root,row){
    renderCriteria(root,row);
    const formatBound=n=>String(Number(n.toFixed(4)));
    for(const {subject,low,high,value,reference} of row[8]||[]){
      const hasRef=Number.isFinite(reference), weighted=subject.includes('%');
      const points=[low,high,value,...(hasRef?[reference]:[])];
      if(!points.every(n=>Number.isFinite(n)&&n>=-1e-9&&n<=100+1e-9)||high<low)continue;
      const section=el('section',null,'comparison');
      const title=el('div',null,'comparisonTitle');
      const legend=row[6]?'추정 비교 구간':weighted?'가중 비교 구간':'과거 합격자 기준 구간';
      title.append(el('h3',subject+' 백분위'),el('span',legend+'　'+formatBound(low)+'–'+formatBound(high),'rangeLegend'));
      const chart=el('div',null,'rangeChart');
      const labels=el('div',null,'rangeLabels'), plot=el('div',null,'rangePlot');
      const min=Math.min(...points),max=Math.max(...points),pad=Math.max(3,(max-min)*.4);
      const step=max-min>38?10:max-min<8?2:5;
      const start=Math.max(0,Math.floor((min-pad)/step)*step),end=Math.min(100,Math.ceil((max+pad)/step)*step);
      const at=n=>100*(n-start)/(end-start)+'%';
      const zone=el('div',null,'rangeZone');
      zone.style.left=at(low);zone.style.width=(high-low)*100/(end-start)+'%';plot.append(zone);
      if((high-low)/(end-start)>.2){
        for(const limit of [low,high]){
          const bound=el('span',formatBound(limit),'rangeBound');bound.style.left=at(limit);
          bound.setAttribute('aria-hidden','true');plot.append(bound);
        }
      }
      function addPoint(label,sub,n,ref){
        const caption=el('div',ref?'참고':'기본 판정');
        if(ref && weighted)caption.append(el('small',sub));
        labels.append(caption);
        const rail=el('div',null,'rangeRail');
        const mark=el('span',null,'rangeMark'+(ref?' reference':''));
        if(!ref&&n<low-1e-9)mark.classList.add('belowRange');
        mark.style.left=at(n);
        mark.title=ref?(weighted?'영어 상위 3회 평균과 최근 수학 성적에 이 학과의 반영 비율을 적용한 참고값입니다.':'영어 백분위가 가장 높았던 세 시험의 평균입니다.'):
          '최근 응시한 최대 세 달의 월별 대표 성적으로 계산한 기본 판정 백분위입니다.';
        const pointText=el('span',null,'pointText');
        if(n>(start+end)/2 || (!ref && n<low && (n-start)/(end-start)>.2))pointText.classList.add('leftValue');
        pointText.append(el('b',n.toFixed(1)),el('small',label));
        mark.append(pointText);rail.append(mark);plot.append(rail);
      }
      addPoint('최근 성적','기본 판정에 반영',value,false);
      if(hasRef)addPoint(weighted?'영어 상위 3회 반영':'상위 3회 평균',weighted?'수학은 최근 성적':'참고 성적',reference,true);
      const axis=el('div',null,'rangeAxis');
      for(let i=start;i<=end;i+=step){const tick=el('span',String(i));tick.style.left=at(i);axis.append(tick);}
      plot.append(axis);chart.append(labels,plot);
      const explain=(label,n)=>{
        const delta=n-low, dist=Math.abs(delta);
        if(n>high+1e-9)return label+'은 구간 상한보다 '+formatBound(Number((n-high).toFixed(2)))+' 높습니다.';
        if(dist<1e-9)return label+'은 구간 하한에 닿았습니다.';
        const diff=dist<.05?'0.1 미만':dist.toFixed(1);
        return label+'은 구간 하한보다 '+diff+(delta<0?' 낮습니다.':' 높아 구간 안에 있습니다.');
      };
      section.append(title,chart,el('p',[explain('최근 성적',value),...(hasRef?[explain(weighted?'영어 상위 3회 반영값':'상위 3회 평균',reference)]:[])].join(' '),'rangeNote'));
      root.append(section);
    }
  }
  async function showDepartmentTrend(currentLine,school,department,track){
    if(school!=='가천대학교')return;
    try{
      const {gachonTrend,currentName,seatText}=await import('./quotas/trend.js');
      const {names,after}=await gachonTrend();
      const current=currentName(department.trim()),pair=names.get(current);
      const col=after.headers.indexOf(track.replace(/\s/g,'').replace(/편입(?:학)?$/,''))+1;
      if(!pair||!col||!currentLine.isConnected)return;
      const cells=['before','after'].map((year,i)=>{
        const n=pair[year]?.[col],text=n!=null?n+'명':seatText(pair,year,col);
        const cell=el('span',null,'seatCell');
        cell.append(el('small',(2026+i)+'학년도'),el(i?'strong':'span',text));
        if(pair.oldName)cell.append(el('small',i?current:pair.oldName));
        return cell;
      });
      currentLine.className='seatTrend';
      currentLine.replaceChildren(cells[0],el('span','→','seatArrow'),cells[1]);
      const prev=pair.before?.[col],next=pair.after?.[col];
      if(pair.reorganized)currentLine.append(el('small','모집단위 개편','seatChange'));
      else if(Number.isFinite(prev)&&Number.isFinite(next)){
        const delta=next-prev;
        currentLine.append(el('small',delta===0?'전년과 동일':Math.abs(delta)+'명 '+(delta>0?'증가':'감소'),'seatChange'));
      }
    }catch{ /* The current count and the guide link remain available. */ }
  }
  async function renderQuotaBasis(root,school,row){
    const [department,,,track]=row;
    const unit=row[9];
    const current=unit?.year===2027?unit.seats:school.seats?.[track+'|'+department];
    const currentLine=el('p','2027학년도 '+(school.majors?.[department]?'공동 모집인원 ':'모집인원 '));
    if(current!=null)currentLine.append(el('strong',current+'명'));
    else currentLine.append(unit?.year===2027?'미선발':'· 모집요강에서 확인');
    const heading=el('div',null,'seatHeading'), source=el('a','모집요강 보기 ↗');
    source.href='quotas/?school='+encodeURIComponent(school.school);source.target='_blank';source.rel='noopener';
    heading.append(el('h3','모집인원'),source);
    root.replaceChildren(heading,currentLine);
    if(row[14])currentLine.textContent='2027학년도 서울캠퍼스 해당 전형 미선발';
    else if(!school.catalogYear && unit?.year!==2027){
      const label=unit?unit.year+'학년도에 확인한 모집단위':'과거 합격 자료의 모집단위';
      currentLine.textContent=label+'입니다. 2027학년도 지원 전에는 올해 모집요강에서 명칭과 인원을 확인해 주세요.';
    }
    if(row[12]?.length)root.append(el('p','이름이 유사한 '+row[12].join('·')+'와 같은 모집단위인지 확인 중입니다. 아래 성적은 '+department+' 명칭으로 기록된 자료입니다.'));
    void showDepartmentTrend(currentLine,school.school,department,track);
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
      if(row[10]?.length){
        const totals=[...(mask&1?['영어 '+entries.reduce((n,r)=>n+(r[3]||0),0)+'건']:[]),...(mask&2?['수학 '+entries.reduce((n,r)=>n+(r[4]||0),0)+'건']:[])];
        historic.prepend(el('p','개편 전 합격 기록 · '+row[10].join(' + ')+' · '+totals.join(' / ')));
      }
      if(cohorts.length>1)detail.append(el('p','개편 전 명칭별 이력입니다. 기록 수는 과목별이며 모집인원은 요강에서 확인한 수치입니다.'));
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
      const other=(unit?.sources||[]).filter(n=>!cohorts.some(c=>c.name===n));
      const related=units.filter(([k])=>other.some(n=>k===[school.school,track,n].join('|')));
      if(related.length){
        detail.append(el('p','함께 연결된 과거 모집단위입니다. 다음 성적은 위 판정 표본에 합산하지 않았습니다.'));
        for(const [k,rs] of related){
          const source=el('details');
          source.append(el('summary',k.split('|')[2]+' · '+[...new Set(rs.map(r=>r[0]))].sort().join('·')+'학년도'));
          for(const [y,c,seats,en,ma,url] of rs){
            const line=el('p',y+'학년도 '+c+' · '+(seats==null?'모집인원 미확인':'모집 '+seats+'명')+' · 영어 '+(en||0)+'건 / 수학 '+(ma||0)+'건');
            if(url){const a=el('a',' 모집 근거 ↗');a.href=url;a.target='_blank';a.rel='noopener';line.append(a);}
            source.append(line);
          }
          detail.append(source);
        }
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
  const scoreText=(score,max)=>score.toLocaleString('ko-KR',{maximumFractionDigits:4})+'점'+
    (max==null?' (만점 미확인)':' / '+max.toLocaleString('ko-KR',{maximumFractionDigits:4})+'점');
  function renderPastScores(rows){
    $('pastScores').open=false;
    $('pastScores').hidden=!rows.length;
    $('pastScoreSummary').textContent='기출 OMR 성적 '+rows.length+'건';
    $('pastScoreRows').replaceChildren(...rows.map(([year,school,subject,score,max])=>{
      const tr=el('tr');
      tr.append(...[year+'학년도',school,subject,scoreText(score,max)].map(value=>el('td',value)));
      return tr;
    }));
  }
  async function choose(match,token){
    const [data,{reconcileSchool,countsForSchool,schoolCutoffDistance},examFit,pastScores]=await Promise.all([
      loadFile(match.id,from64(match.key)),import('./report-units.js?v=20261125-gap'),
      access.examFit&&loadSupplement(match,'exam-fit'),access.pastScores&&loadSupplement(match,'past-scores')
    ]);
    if(token!==serial)return;
    data.examFit??=examFit||undefined;
    data.pastScores=Array.isArray(pastScores)?pastScores:[];
    const changed=new Set();
    data.schools.forEach((s,i)=>{
      if(reconcileSchool(s))changed.add(i);
      for(const row of s.rows)if(row[4]==='도전'&&countsForSchool(row))
        challengeGaps.set(row,schoolCutoffDistance([row]));
    });
    const order=['도전','적정','안정'];
    const display=['적정','안정','도전','판정 자료 없음'];
    for(const [key,view] of Object.entries(data.views)){
      const [field,track]=key.split('|'), revised=new Map(view);
      const distances=new Map();
      data.schools.forEach((s,i)=>{
        const updateBand=changed.has(i)||(field==='자연'&&s.school===kauName&&revised.has(i));
        if(!updateBand&&revised.get(i)!=='도전')return;
        const rows=s.rows.filter(r=>matchesField(field,s.school,r)&&matchesTrack(track,r));
        if(!rows.length){revised.delete(i);return;}
        if(updateBand){
          const grades=rows.filter(countsForSchool).map(r=>order.indexOf(r[4])).sort((a,b)=>a-b);
          revised.set(i,order[grades[Math.floor((grades.length-1)/2)]]||'판정 자료 없음');
        }
        if(revised.get(i)==='도전')distances.set(i,schoolCutoffDistance(rows));
      });
      data.views[key]=[...revised].map(([i,b])=>[i,b,distances.get(i)??null]).sort((a,b)=>
        display.indexOf(a[1])-display.indexOf(b[1])||(a[1]==='도전'?
          (a[2]??Infinity)-(b[2]??Infinity)||data.schools[a[0]].school.localeCompare(data.schools[b[0]].school,'ko'):0));
    }
    report=data;$('choices').replaceChildren();$('status').textContent='';
    $('student').textContent=data.name;$('branch').textContent=data.branch+' · '+data.asof.replaceAll('-','.')+' 기준';
    [$('english').textContent,$('math').textContent]=data.metrics;
    renderBasis(data);
    renderPastScores(data.pastScores);
    $('archive').hidden=!(access.historical&&data.archiveBands);
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
  function sortChallengeDepartments(list){
    const gaps=new Map();
    for(const label of list.querySelectorAll('.deptGap')){
      const line=label.closest('.dept');
      if(line.dataset.notOffered==='1'){
        label.remove();line.removeAttribute('aria-description');continue;
      }
      const gap=Number(label.dataset.gap);
      gaps.set(line,gap);
      const group=line.parentElement;
      if(group.classList.contains('unitGroup'))gaps.set(group,Math.min(gaps.get(group)??Infinity,gap));
    }
    // Keep other verdicts, group headings and quota details in their original slots.
    function sortSlots(parent){
      const children=[...parent.children], ranked=children.filter(node=>gaps.has(node));
      const ordered=ranked.slice().sort((a,b)=>gaps.get(a)-gaps.get(b));
      if(ordered.every((node,i)=>node===ranked[i]))return;
      let i=0;
      parent.replaceChildren(...children.map(node=>gaps.has(node)?ordered[i++]:node));
    }
    const groups=list.querySelectorAll(':scope > .unitGroup');
    for(const group of groups)sortSlots(group);
    sortSlots(list);
    $('deptGapNote').hidden=!gaps.size;
    $('deptGapNote').textContent=[...groups].some(group=>group.querySelectorAll('.deptGap').length>1)
      ?'도전 학과는 적정 하한에 가까운 순입니다. 여러 전형·전공이 묶이면 가장 가까운 항목을 기준으로 정렬합니다.'
      :'도전 학과는 적정 하한까지 남은 백분위 점수가 작은 순입니다.';
  }
  function renderRows(){
    window.applicationRecords.clearPreview();
    const school=selected==null?null:report.schools[selected];
    $('school').textContent=school?.school||'학과별 결과';
    const schoolScores=(report?.pastScores||[]).filter(([,name])=>name===school?.school);
    $('schoolPastScores').hidden=!schoolScores.length;
    $('schoolPastScores').textContent=schoolScores.length?'기출 OMR · '+schoolScores.map(([year,,subject,score,max])=>
      year+' '+subject+' '+scoreText(score,max)).join(' · '):'';
    const q=normalize($('department').value), field=$('field').value, track=$('track').value;
    const seatSchool=currentSeatSchools.get(school?.school);
    const placements=new Map();
    if(seatSchool==='kyonggi'){
      if(kyonggiSeats){
        for(const row of school.rows){
          const detail=kyonggiSeats.describe(row[0],row[3],row[2]||(row[11]||[]).join('·'));
          if(detail)placements.set(row,detail);
        }
      }else if(!kyonggiSeatsPending){
        kyonggiSeatsPending=loadCounselingSeats(seatSchool).then(lookup=>{
          kyonggiSeats=lookup;
          if(report?.schools[selected]?.school===school.school)renderRows();
        }).catch(()=>{}).finally(()=>{kyonggiSeatsPending=null;});
      }
    }
    const matching=(school?.rows||[]).filter(row=>{
      const [name]=row;
      const placement=placements.get(row);
      return matchesTrack(track,row)&&(normalize(name).includes(q)||school.majors?.[name]?.some(m=>normalize(m).includes(q))||row[9]?.sources.some(m=>normalize(m).includes(q))
        ||[placement?.name,placement?.faculty].some(unit=>unit&&normalize(unit).includes(q)));
    });
    const rows=matching.filter(row=>matchesField(field,school.school,row));
    const grouped=track==='전체';
    const sections=new Map(), currentSections=new Map(), visibleLines=[];
    const reviewSections=new Map(),reviewLines=[];
    if(school?.unitOrder)rows.sort((a,b)=>school.unitOrder.indexOf(a[0])-school.unitOrder.indexOf(b[0])||a[3].localeCompare(b[3],'ko'));
    const reasons=new Map((school?.rows||[]).map((row,i)=>[row,school.reasons?.[i]]));
    $('quotaSchool').hidden=!school;
    if(school)$('quotaSchool').href='quotas/?school='+encodeURIComponent(school.school);
    const isKau=school?.school===kauName;
    const compactKau=grouped&&isKau&&rows.filter(([name])=>name===airBusiness).length===2;
    const compare=school?.school==='가천대학교'||isKau;
    const hasSchedule=seatSchool||school?.school==='수원대학교';
    $('quotaSchool').textContent=hasSchedule?'2027 모집인원·전형일정 ↗':compare?'2026·2027 모집인원 비교 ↗':'2027 모집인원 ↗';
    const quotaLines=[];
    $('fieldBasis').hidden=!school||(!school.catalogYear && field==='전체');
    $('fieldBasis').textContent=school?.catalogYear?'2027 모집요강의 일반·학사 선발 모집단위입니다. 인문·자연은 상담용 분류입니다.':'원자료에 계열이 없으면 과거 합격자의 수학 모의고사 응시 비율로 추정합니다.';
    $('allFields').hidden=matching.length===rows.length;
    $('allFields').textContent='계열 전체로 보기 ('+matching.length+'건)';
    for(const row of rows){
      const [name,f,c,t,b,marker,estimate]=row;
      const placement=placements.get(row);
      const campuses=row[11]||[];
      const campus=c||campuses.join('·')+(campuses.length>1?' 원장 통합':'');
      const compact=compactKau&&name===airBusiness;
      const fieldLabel=isAirBusiness(school.school,name)?'영어고사':f;
      const estimateLabel=estimate==='midpoint'?'중위권(예상)':estimate;
      const line=el('div',null,'dept'), title=el('div');
      const heading=placement?.faculty?t+'편입 · '+placement.name:grouped||placement?t+'편입':name;
      const formerName=placement&&normalize(placement.name)!==normalize(name)?'과거 '+name:'';
      title.append(el('b',heading),el('small',compact?'':[fieldLabel,campus,grouped||placement?'':t,formerName].filter(Boolean).join(' · ')));
      if(challengeGaps.has(row)){
        const gap=challengeGaps.get(row),label=el('span',gapText(gap),'deptGap');
        label.dataset.gap=String(gap??Infinity);
        title.firstChild.after(label);
        line.setAttribute('aria-description',label.textContent);
      }
      const otherKonkukCampus=seatSchool==='konkuk'&&((campus&&campus!=='서울')||knownKonkukGlocal.test(name));
      if(compare||(seatSchool&&!otherKonkukCampus&&!placement&&(seatSchool!=='kyonggi'||kyonggiSeats)))
        quotaLines.push({name,track:t,campus,compact,meta:title.lastChild});
      if(!grouped&&school.majors?.[name])title.append(el('small',school.majors[name].join(' · ')));
      const verdict=el('div',null,'verdict');
      const verdictBadge=badge(b);
      if(b==='판정 자료 없음')verdictBadge.textContent=estimateLabel?'성적 확인 필요':'판정 미산출';
      verdict.append(verdictBadge);
      if(estimateLabel)verdict.append(el('small',estimateLabel));
      if(b==='도전' && marker==='peak3'){
        line.classList.add('peakReach');
        const note=el('small','가능성 있음','peakNote');
        note.title='영어 상위 3회 성적을 반영하면 적정선에 닿습니다.';
        verdict.append(note);
      }
      if(row[14]||(row[9]?.year===2027&&row[9].seats==null))line.dataset.notOffered='1';
      let reason=b==='판정 자료 없음'&&!estimateLabel?'':reasons.get(row);
      if(reason&&estimateLabel&&school.school==='가천대학교')reason+=' 과거 원장에는 가천대 캠퍼스가 따로 표기되어 있지 않습니다.';
      window.applicationRecords.bind(line,{school:school.school,campus:row[9]?.recordCampus??c,department:name,field:f,track:t,verdict:b},verdict,reason,estimateLabel,
        (root,chart)=>{renderComparison(chart,row);void renderQuotaBasis(root,school,row);},campus);
      line.append(title,verdict);
      if(placement){
        const unit=placement.faculty||placement.name;
        const key=JSON.stringify([placement.campus,unit]);
        if(!currentSections.has(key)){
          const group=el('section',null,'unitGroup');
          group.append(el('h3',unit));
          const quotas=el('small',placement.campus);
          group.append(quotas);
          currentSections.set(key,{group,quotas,seen:new Set()});
          visibleLines.push(group);
        }
        const {group,quotas,seen}=currentSections.get(key);
        for(const {unit:quotaUnit,label,seats,shared} of placement.entries){
          const quotaKey=JSON.stringify([t,quotaUnit||placement.name]);
          if(seen.has(quotaKey))continue;
          seen.add(quotaKey);
          const detail=el('span',' · 2027 '+t+' ','currentSeats');
          detail.style.display='inline-block';
          if(shared)detail.append('공동 모집 ');
          else if(quotaUnit&&unit!==quotaUnit)detail.append(quotaUnit+' ');
          if(seats==null)detail.append(label);
          else detail.append(el('strong',seats+'명'));
          quotas.append(detail);
        }
        if(placement.entries.length&&placement.entries.every(item=>item.seats==null))line.dataset.notOffered='1';
        group.append(line);
        line.setAttribute('aria-label',[placement.name,t,verdictBadge.textContent,estimateLabel,formerName].filter(Boolean).join(' · '));
        continue;
      }
      const targetSections=row[12]?.length?reviewSections:sections;
      if(grouped){
        const unitKey=JSON.stringify([campus,name]);
        if(!targetSections.has(unitKey)){
          const group=el('section',null,compact?'unitGroup compactUnit':'unitGroup');
          group.append(el('h3',name));
          if(school.majors?.[name])group.append(el('small',school.majors[name].join(' · ')));
          if(compact)group.append(el('small',[fieldLabel,c,school.catalogYear+' 공동 모집'].filter(Boolean).join(' · ')));
          targetSections.set(unitKey,group);
          if(targetSections===sections)visibleLines.push(group);
        }
        targetSections.get(unitKey).append(line);
        line.setAttribute('aria-label',[name,t,verdictBadge.textContent,estimateLabel].filter(Boolean).join(' · '));
      }
      if(row[12]?.length)reviewLines.push(line);
      else if(!grouped)visibleLines.push(line);
    }
    $('rows').replaceChildren(...visibleLines);
    if(reviewLines.length){
      const review=el('details'), summary=el('summary','현재 명칭 확인 중인 과거 자료 ('+reviewLines.length+'건)');
      review.open=!!q;
      review.append(summary,...(grouped?reviewSections.values():reviewLines));
      $('rows').append(review);
    }
    sortChallengeDepartments($('rows'));
    if(!rows.length)$('rows').textContent='표시할 학과가 없습니다.';
    if(compare){
      const linkText=el('span',$('quotaSchool').textContent);
      $('quotaSchool').replaceChildren(linkText);
      showQuotaNumbers(quotaLines,linkText,track,isKau);
    }
    if(seatSchool&&quotaLines.length)showCurrentSeats(quotaLines,seatSchool);
    $('rows').scrollTop=0;
  }
  async function showCurrentSeats(lines,school){
    try{
      const lookup=await loadCounselingSeats(school);
      let changed=false;
      for(const {name,track,campus,meta} of lines){
        if(!meta.isConnected)continue;
        const seats=lookup(name,track,campus);
        if(!seats)continue;
        if(seats.every(item=>item.label.includes('미선발')||item.label.includes('재직자만'))){
          const line=meta.closest('.dept');
          line.dataset.notOffered='1';
          if(line.querySelector('.deptGap'))changed=true;
        }
        const detail=el('span',null,'currentSeats');
        const guideCampus=school==='konkuk'?'서울':seats[0].campus;
        detail.append(' · 2027 '+(guideCampus&&!campus.includes(guideCampus)?guideCampus+' ':''));
        seats.forEach(({label,seats},i)=>{
          if(i)detail.append(' / ');
          if(label)detail.append(label+(seats==null?'':' '));
          if(seats!=null)detail.append(el('strong',seats+'명'));
        });
        meta.append(detail);
      }
      if(changed)sortChallengeDepartments($('rows'));
    }catch{ /* The school link still opens the published recruitment guide. */ }
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
    const view=report.views[field+'|'+track];
    const visible=view.filter(([,b])=>band==='전체'||b===band);
    const fitting=new Set(report.examFit?.fields?.[field]);
    const fits=([i,b])=>b!=='판정 자료 없음'&&fitting.has(report.schools[i].school);
    $('fitNote').hidden=!visible.some(fits);
    $('fitNote').textContent=report.examFit?'영어 기출 OMR '+report.examFit.attempts+'회와 대학별 출제 경향을 비교했습니다.':'';
    if(!visible.some(([i])=>i===selected))selected=visible[0]?.[0]??null;
    $('count').textContent=visible.length+'개교';
    $('bands').replaceChildren(...bands.map(b=>{
      const btn=el('button',b);btn.setAttribute('aria-pressed',String(b===band));
      btn.onclick=()=>{band=b;$('department').value='';renderSchools();};return btn;
    }));
    $('schoolBand').replaceChildren();
    $('schools').dataset.filter=band;
    $('gapNote').hidden=!visible.some(([,b])=>b==='도전');
    $('schools').replaceChildren(...visible.map(entry=>{
      const [i,b,distance]=entry;
      const school=report.schools[i], grades=school.rows.filter(r=>r[4]!=='판정 자료 없음' &&
        matchesField(field,school.school,r) && matchesTrack(track,r));
      const estimated=grades.length>0 && grades.every(r=>r[6]);
      const schoolBadge=badge(b);
      if(estimated)schoolBadge.append(' (예상)');
      const btn=el('button'), name=el('span',school.school,'schoolName');
      btn.append(name);
      if(fits(entry))btn.append(el('small','기출 궁합 좋음','schoolFit'));
      if(b==='도전')btn.append(el('small',gapText(distance),'schoolGap'));
      btn.append(schoolBadge);
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
