/* School/department reference viewer. Imported data stays in this tab's memory. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = value => String(value ?? '').replace(/\s+/g,'').toLocaleLowerCase('ko');
const fmt = value => Number(value).toLocaleString('ko-KR',{maximumFractionDigits:2});
const PAGE_SIZE = 10;
let data = null, schoolId = '', page = 0, favorites = new Set(), compared = new Set(), lastFocus = null, toastTimer;
let schoolMap = new Map(), recordMap = new Map(), filtered = [];
const hasScore = row => row.metrics.some(m => typeof m.value === 'number' && Number.isFinite(m.value));
const safeSource = value => {
  try { const u=new URL(value); return u.protocol==='https:' && u.hostname==='docs.google.com' && u.pathname.startsWith('/spreadsheets/') ? u.href : ''; } catch { return ''; }
};
function notify(message) {
  $('toast').textContent=message; $('toast').hidden=false;
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('toast').hidden=true,3200);
}
function validate(input) {
  if (!input || !Array.isArray(input.schools) || !Array.isArray(input.records) || !/^2026-\d\d-\d\d$/.test(input.version)) throw Error('2026 상담자료 JSON 파일을 선택하세요.');
  if (!input.schools.length || input.schools.length>100 || input.records.length>20000) throw Error('자료 크기와 구성을 확인하세요.');
  const ids=new Set(input.schools.map(s=>s.id)), rowIds=new Set();
  for(const s of input.schools) if(typeof s.name!=='string'||typeof s.note!=='string') throw Error('학교 정보가 올바르지 않습니다.');
  for(const r of input.records) {
    if(rowIds.has(r.id)||!ids.has(r.school)||!['id','department','type','group','category','campus','quota','quotaKind','status','source','sourceUrl'].every(k=>typeof r[k]==='string')||!Array.isArray(r.metrics)||!Array.isArray(r.fields)||!Array.isArray(r.flags)||!Array.isArray(r.history)) throw Error('학과 자료의 형식이 올바르지 않습니다.');
    if(!r.metrics.every(m=>typeof m.label==='string'&&typeof m.raw==='string'&&(m.value===null||typeof m.value==='number'&&Number.isFinite(m.value)))||!r.fields.every(f=>typeof f.label==='string'&&typeof f.value==='string')||!r.flags.every(f=>typeof f==='string')||!r.history.every(h=>Number.isInteger(h.year)&&typeof h.score==='string'&&typeof h.cell==='string')) throw Error('성적 또는 원문 항목을 확인하세요.');
    rowIds.add(r.id);
  }
  return input;
}
function setOptions(id, values, first) {
  $(id).innerHTML=`<option value="">${esc(first)}</option>`+[...new Set(values.filter(Boolean))].map(v=>`<option>${esc(v)}</option>`).join('');
}
function activeRows() {
  const year=Number($('year').value);
  return year && year!==2026 ? (data.annualRecords||[]).filter(r=>r.year===year) : data.records;
}
function campusName(row) {
  const raw=String(row.campus||'').replace(/\s+/g,'');
  if(!raw) return '';
  if(row.school===2) {
    if(raw.includes('인문')&&raw.includes('사회')) return '인문사회과학캠퍼스';
    if(raw.includes('자연')&&raw.includes('과학')) return '자연과학캠퍼스';
  }
  if(raw==='미배정') return '캠퍼스 확인 필요';
  const name=({'서울C':'서울','국제C':'국제'})[raw]||raw;
  return name.endsWith('캠퍼스')?name:name+'캠퍼스';
}
function campusValue(row) { return row.school+':'+(campusName(row)||'원문 미기재'); }
function updateCampusOptions() {
  const previous=$('campus').value, rows=activeRows().filter(r=>!schoolId||r.school===Number(schoolId));
  const options=new Map();
  for(const row of rows) {
    const name=campusName(row)||'캠퍼스 원문 미기재';
    options.set(campusValue(row),(schoolId?'':schoolMap.get(row.school).name+' · ')+name);
  }
  $('campus').innerHTML='<option value="">전체 캠퍼스</option>'+[...options].map(([value,label])=>`<option value="${esc(value)}">${esc(label)}</option>`).join('');
  $('campus').value=options.has(previous)?previous:'';
}
function renderYearImages() {
  const selected=Number($('year').value), images=(data.imageRecords||[]).filter(x=>x.school===Number(schoolId)&&(!selected||x.year===selected));
  $('yearImages').hidden=!images.length;
  $('yearImages').innerHTML=images.length?'<h2>학년도별 원문 도표</h2><p class="muted">계열별·공동모집 지표는 학과별 점수로 나누지 않고 원문 그대로 표시합니다.</p>'+images.map(x=>`<details ${selected?'open':''}><summary>${esc(x.year+' · '+x.caption)}</summary><figure><img src="${esc(x.dataUrl)}" alt="${esc(x.year+' '+x.caption)}" loading="lazy"><figcaption>${esc(x.source)}</figcaption></figure></details>`).join(''):'';
}
function annualRows(row) {
  return (row.annualIds||[row.id]).map(id=>recordMap.get(id)).filter(Boolean).sort((a,b)=>(a.year||2026)-(b.year||2026));
}
function overviewYears() {
  const years=data.availableYears||[2026],recent=years.slice(-5),selected=Number($('year').value);
  return selected&&selected<recent[0]?years.slice(0,5):recent;
}
function notRecruited(row) {
  return !hasScore(row)&&(row.quota==='-'||row.quota==='0'||row.quotaKind==='미모집');
}
function annualHTML(row,full=false) {
  const entries=annualRows(row), years=full?(data.availableYears||[2026]):overviewYears();
  return `<div class="year-strip ${full?'year-strip-full':''}">${years.map(year=>{
    const matches=entries.filter(r=>(r.year||2026)===year);
    return `<section class="year-cell ${year===2026?'year-latest':''} ${matches.length&&matches.every(notRecruited)?'year-not-recruited':''}" data-year="${year}"><b class="year-heading">${year}</b>${matches.length?matches.map((entry,index)=>`<div class="year-entry ${notRecruited(entry)?'entry-not-recruited':''}">${matches.length>1?`<small class="year-context">원문 표 ${index+1} / ${matches.length}</small>`:''}${notRecruited(entry)?'<span class="no-selection-mark" aria-hidden="true">—</span><span class="no-selection-label">미선발</span>':full?scoreHTML(entry,true):overviewScoreHTML(entry,row.id)}${entry.quota==='-'&&hasScore(entry)?'<small class="year-conflict">모집·성적 상충 확인</small>':''}${entry.yearTitle&&entry.yearTitle!==String(year)?`<small class="year-context">${esc(entry.yearTitle)}</small>`:''}${full?`<div class="year-quota">${quotaHTML(entry)}</div><small class="year-context">${esc(entry.department)}${campusName(entry)?' · '+esc(campusName(entry)):''}</small>${sourceLink(entry)}`:''}</div>`).join(''):'<small class="year-missing">연결된 자료 없음</small>'}</section>`;
  }).join('')}</div>`;
}
function load(input, filename='검수 자료', automatic=false) {
  const next=validate(input);
  data=next; if(data.annualRecords) validate({...data,records:data.annualRecords}); schoolMap=new Map(data.schools.map(s=>[s.id,s])); recordMap=new Map([...data.records,...(data.annualRecords||[])].map(r=>[r.id,r]));
  schoolId=''; compared.clear(); favorites.clear(); page=0;
  try { favorites=new Set(JSON.parse(localStorage.getItem('placement-reference-stars-'+data.workbookSha256)||'[]').filter(id=>recordMap.has(id))); } catch {}
  ['query','schoolSearch','track','group','campus','status','year'].forEach(id=>$(id).value='');
  $('sort').value='original'; $('favoriteOnly').checked=false;
  setOptions('year',(data.availableYears||[2026]).map(String),'현재 학과 · 모든 연도');
  setOptions('track',[...data.records,...(data.annualRecords||[])].map(r=>r.type),'전체 전형');
  setOptions('group',data.records.map(r=>r.category),'전체 계열');
  updateCampusOptions();
  $('welcome').hidden=true; $('workspace').hidden=false;
  $('snapshot').textContent=`${data.version.replaceAll('-','.')} 검수본 기준`;
  $('statSchools').textContent=fmt(data.schools.length); $('schoolCount').textContent=data.schools.length;
  $('statRows').textContent=fmt(data.records.length); $('statScores').textContent=fmt(data.records.filter(hasScore).length);
  $('statFlags').textContent=fmt(data.records.filter(r=>r.flags.length).length);
  const url=safeSource(data.sourceUrl); $('masterLink').href=url||'#'; $('masterLink').hidden=!url;
  $('loadStatus').classList.remove('error'); $('loadStatus').textContent=automatic?`${data.version.replaceAll('-','.')} 검수 자료 · ${fmt(data.records.length)}개 항목을 불러왔습니다.`:`${filename} · 불러오기 완료 · 자료는 이 탭에서 조회하며 새로고침하면 다시 불러와야 합니다.`;
  renderSchools(); render(); renderTray();
}
async function readFile(file) {
  if(!file) return;
  $('loadStatus').classList.remove('error'); $('loadStatus').textContent='자료를 불러오는 중입니다…';
  try {
    if(file.size>25*1024*1024) throw Error('25MB 이하의 상담자료 JSON 파일을 선택하세요.');
    load(JSON.parse((await file.text()).replace(/^\uFEFF/,'')),file.name);
  } catch(error) {
    $('loadStatus').classList.add('error'); $('loadStatus').textContent=`불러오지 못했습니다. ${error instanceof SyntaxError?'JSON 파일 형식을 확인하세요.':error.message} 기존 자료는 유지됩니다.`;
  }
}
function renderSchools() {
  if(!data) return;
  const search=norm($('schoolSearch').value), active=activeRows();
  const button=(id,name,count)=>`<button class="school-button" data-school="${id}" aria-pressed="${String(schoolId)===String(id)}">${esc(name)}<span>${fmt(count)}</span></button>`;
  $('schoolList').innerHTML=button('','전체 학교',active.length)+data.schools.filter(s=>norm(s.name).includes(search)).map(s=>button(s.id,s.name,active.filter(r=>r.school===s.id).length)).join('');
}
function schoolName(row) {
  if(row.school===8&&row.campus==='미배정') return '외대 · 캠퍼스 미확인';
  return schoolMap.get(row.school)?.name||'';
}
function scoreHTML(row, full=false) {
  if(!row.metrics.length) {
    const competition=row.fields.find(f=>f.label==='경쟁률');
    return competition&&competition.value!=='-'?`<span class="score-value">${esc(competition.value)}<small style="font-size:11px"> : 1</small></span><small class="score-metric">경쟁률 · 성적 자료 미확보</small>`:'<span class="score-value missing">점수 미확보</span><small class="score-metric">모집·전형 자료만 제공</small>';
  }
  const metric=row.metrics[0];
  let html=`<span class="score-value ${metric.value===null?'missing':''}">${esc(metric.value===null?(metric.raw==='-'||!metric.raw?'미확보':metric.raw):fmt(metric.value))}</span><small class="score-metric">${esc(metric.label)}</small>`;
  if(row.metrics.length>1) html+=row.metrics.slice(1).map(m=>`<div class="score-secondary">${esc(m.label)} ${esc(m.value===null?(m.raw==='-'?'미확보':m.raw||'미확보'):fmt(m.value))}</div>`).join('');
  if(full && row.school===20) html+='<div class="score-secondary">수학 0은 미응시 등을 포함한 원문 값 · 합산하지 않음</div>';
  return html;
}
function quotaHTML(row) {
  const isNum=/^\d+(?:\.\d+)?$/.test(row.quota);
  const value=isNum?`${fmt(row.quota)}명`:row.quota==='-'?'미모집':row.quota==='?'?'확인 필요':row.quota||'원문 공란';
  return `<span class="quota-kind ${/공동|최대/.test(row.quotaKind)?'shared':''}">${esc(row.quotaKind)}</span><div class="quota-value">${esc(value)}</div>`;
}
function overviewScoreHTML(row,detailId) {
  const metric=row.metrics[0];
  if(!metric)return scoreHTML(row);
  const value=metric.value===null?(metric.raw==='-'||!metric.raw?'미확보':metric.raw):fmt(metric.value);
  return `<span class="score-value ${metric.value===null?'missing':''}">${esc(value)}</span><small class="score-metric">${esc(metric.label)}</small>${row.metrics.length>1?`<button class="metric-more" data-detail="${esc(detailId)}">전체 ${row.metrics.length}개 지표 보기 ↗</button>`:''}`;
}
function statusHTML(row) {
  return `<span class="badge ${row.flags.length?'warn':hasScore(row)?'available':''}">${esc(row.status)}</span>`;
}
function setupQuickFilters() {
  document.querySelector('.page-heading h1').textContent='학교·학과 성적 조회';
  document.querySelector('.page-heading p').textContent='5개년 성적을 나란히 비교하세요. 미선발 연도는 회색으로 구분합니다.';
  const advanced=document.createElement('details');
  advanced.className='advanced-filters';
  advanced.innerHTML='<summary>상세 필터 <span>학년도 · 캠퍼스 · 자료 상태</span></summary>';
  document.querySelector('.filters').append(advanced);
  advanced.append(document.querySelector('.filter-row'));
  const bar=document.createElement('div');
  bar.className='quick-filters';
  bar.innerHTML=[['group','계열',['','인문','자연']],['track','전형',['','일반','학사']]].map(([id,label,values])=>`<div class="quick-filter-group" role="group" aria-label="${label} 빠른 선택"><b>${label}</b><div>${values.map(value=>`<button type="button" data-filter="${id}" data-value="${value}" aria-pressed="${!value}">${value||'전체'}</button>`).join('')}</div></div>`).join('');
  bar.onclick=e=>{
    const button=e.target.closest('[data-filter]');if(!button)return;
    $(button.dataset.filter).value=button.dataset.value;
    $(button.dataset.filter).dispatchEvent(new Event('change'));
    $('results').scrollIntoView({block:'start'});
  };
  $('results').prepend(bar);
  const legend=document.createElement('div');
  legend.className='history-legend';
  legend.innerHTML='<b id="historyRange"></b><span><i aria-hidden="true"></i>미선발</span><span>미확보: 성적 자료 없음</span>';
  document.querySelector('.table-wrap').before(legend);
}
function matchesTrack(row) {
  const selected=$('track').value;
  return !selected||(['일반','학사'].includes(selected)?row.type.startsWith(selected):row.type===selected);
}
function render() {
  if(!data) return;
  document.querySelectorAll('.quick-filters [data-filter]').forEach(button=>button.setAttribute('aria-pressed',String($(button.dataset.filter).value===button.dataset.value)));
  const selectedFilters=['year','track','group','campus','status'].filter(id=>$(id).value);
  document.querySelector('.advanced-filters summary span').textContent=selectedFilters.length?selectedFilters.map(id=>$(id).selectedOptions[0].textContent).join(' · '):'학년도 · 캠퍼스 · 자료 상태';
  renderYearImages();
  $('quotaHeader').textContent=($('year').value||'2026')+' 인원';
  const years=overviewYears();
  $('historyRange').textContent=years[0]+'–'+years[years.length-1]+' · 5개년 성적';
  document.querySelector('.dept-table thead th:nth-child(5)').textContent='5개년 성적 · 지표';
  const words=$('query').value.trim().split(/\s+/).filter(Boolean).map(norm);
  filtered=activeRows().filter(r=>(!schoolId||r.school===Number(schoolId))&&matchesTrack(r)&&(!$('group').value||r.category===$('group').value)&&(!$('campus').value||campusValue(r)===$('campus').value)&&(!$('status').value||r.status===$('status').value)&&(!$('favoriteOnly').checked||favorites.has(r.id))&&words.every(w=>norm(schoolName(r)+' '+r.department+' '+r.type+' '+r.group+' '+campusName(r)).includes(w)));
  if($('sort').value==='name') filtered.sort((a,b)=>a.department.localeCompare(b.department,'ko'));
  const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE)); page=Math.min(page,pages-1);
  const school=schoolMap.get(Number(schoolId));
  $('resultTitle').textContent=(school?school.name+' 학과 자료':'전체 학교·학과')+($('year').value?' · '+$('year').value+'학년도':'');
  $('resultCount').textContent=`${fmt(filtered.length)}개 모집단위·전형`;
  $('schoolNote').hidden=!school;
  if(school) $('schoolNote').innerHTML=`<details><summary>이 학교의 성적·모집 기준 확인</summary><p>${esc(school.note||'2026 검수본의 1차 합격자 평균점수와 모집인원입니다. 원문에서 전형·시험 기준을 함께 확인하세요.')}</p><a href="${esc(safeSource(school.url))}" target="_blank" rel="noopener">해당 학교 정본 열기 ↗</a></details>`;
  $('rows').innerHTML=filtered.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE).map(r=>`<tr data-row="${esc(r.id)}"><td><div class="controls-cell"><button class="star-button" data-star="${esc(r.id)}" aria-label="${esc(r.department)} 관심 학과" aria-pressed="${favorites.has(r.id)}">${favorites.has(r.id)?'★':'☆'}</button><input class="compare-check" type="checkbox" data-compare="${esc(r.id)}" aria-label="${esc(schoolName(r)+' '+r.type+' '+r.department)} 비교 선택" ${compared.has(r.id)?'checked':''}></div></td><td><div class="school-label">${esc(schoolName(r))}${campusName(r)?' · '+esc(campusName(r)):''}</div><button class="dept-name" data-detail="${esc(r.id)}">${esc(r.department)}</button></td><td><span class="type-label">${esc(r.type)}</span><span class="sub-label">${esc(r.group||'원문 계열 미구분')}</span></td><td>${quotaHTML(r)}</td><td>${annualHTML(r)}</td><td>${statusHTML(r)}</td><td><button class="detail-button" data-detail="${esc(r.id)}" aria-label="${esc(r.department)} 상세 보기">연도별 ↗</button></td></tr>`).join('');
  $('empty').hidden=filtered.length>0||!$('yearImages').hidden;
  $('pageInfo').textContent=filtered.length?`${fmt(page*PAGE_SIZE+1)}–${fmt(Math.min((page+1)*PAGE_SIZE,filtered.length))} / ${fmt(filtered.length)} · ${page+1} / ${pages}페이지`:'조회 결과 0개';
  $('prevPage').disabled=page===0; $('nextPage').disabled=page>=pages-1;
}
function reset() {
  schoolId=''; page=0;
  ['query','schoolSearch','track','group','campus','status','year'].forEach(id=>$(id).value='');
  $('favoriteOnly').checked=false; $('sort').value='original'; updateCampusOptions(); renderSchools(); render();
}
function sourceLink(row) {
  const url=safeSource(row.sourceUrl);
  return url?`<a class="source-link" href="${esc(url)}" target="_blank" rel="noopener">정본 원문 ${esc(row.source)} 열기 ↗</a>`:'';
}
function showDialog(id) { lastFocus=document.activeElement; $(id).showModal(); }
function closeDialog(id) { $(id).close(); lastFocus?.focus(); }
function detail(id) {
  const row=recordMap.get(id); if(!row) return;
  const school=schoolMap.get(row.school);
  $('dialogTitle').textContent=row.department; $('dialogEyebrow').textContent=schoolName(row)+(campusName(row)?' · '+campusName(row):'');
  $('detailBody').innerHTML=(row.flags.length?`<div class="detail-warning"><b>확인 필요</b><br>${row.flags.map(esc).join('<br>')}</div>`:'')+`<div class="detail-card"><div class="detail-grid"><div><small>전형</small><b>${esc(row.type)}</b></div><div><small>계열 · 원문</small><b>${esc(row.group||'미구분')}</b></div><div><small>모집인원 · ${esc(row.quotaKind)}</small><b>${quotaHTML(row)}</b></div></div></div><div class="detail-card"><h3>연도별 성적 · 모든 지표</h3>${annualHTML(row,true)}<p class="muted">평균은 최저 합격선이 아닙니다. 지표와 시험을 함께 확인하세요.</p></div>`+
  `<div class="detail-card"><h3>학교별 안내 · 검수본 기준</h3><p>${esc(school.note||'2026 검수본의 1차 합격자 평균 및 모집요강을 참고하세요.')}</p>${sourceLink(row)}</div><details class="detail-card"><summary>상세 원문 항목 모두 보기</summary><table class="raw-table"><tbody>${row.fields.map(f=>`<tr><th scope="row">${esc(f.label)}</th><td>${esc(f.value||'원문 공란')}</td></tr>`).join('')}</tbody></table></details><button id="detailCompare" class="primary">${compared.has(id)?'비교에서 빼기':'이 학과 비교에 담기'}</button>`;
  $('detailCompare').onclick=()=>{toggleCompare(id); $('detailCompare').textContent=compared.has(id)?'비교에서 빼기':'이 학과 비교에 담기';};
  showDialog('detailDialog');
}
function toggleCompare(id) {
  if(compared.has(id)) compared.delete(id);
  else if(compared.size>=4) { notify('한 번에 4개 학과까지 비교할 수 있습니다.'); render(); return; }
  else compared.add(id);
  renderTray(); render();
}
function renderTray() {
  $('compareTray').hidden=!compared.size;
  $('compareCount').textContent=`비교할 학과 ${compared.size} / 4`;
  $('compareNames').textContent=[...compared].map(id=>recordMap.get(id)?.department).join(' · ');
  $('openCompare').disabled=compared.size<2;
}
function openComparison() {
  const rows=[...compared].map(id=>recordMap.get(id)); if(rows.length<2) return;
  $('compareBody').innerHTML=rows.map(r=>`<article class="detail-card"><small class="muted">${esc(schoolName(r))}${campusName(r)?' · '+esc(campusName(r)):''}</small><h3>${esc(r.department)}</h3><div class="compare-field"><small>전형 · 계열</small>${esc(r.type)} · ${esc(r.group)}</div><div class="compare-field"><small>모집인원</small>${quotaHTML(r)}</div><div class="compare-field"><small>연도별 성적 · 같은 지표인지 확인</small>${annualHTML(r,true)}</div><div class="compare-field">${statusHTML(r)}${r.flags.length?`<p class="muted">${r.flags.map(esc).join('<br>')}</p>`:''}</div><div class="compare-field">${sourceLink(r)}</div></article>`).join('');
  showDialog('compareDialog');
}
$('loadButton').onclick=()=>$('dataFile').click();
$('dataFile').onchange=e=>{readFile(e.target.files[0]);e.target.value='';};
$('schoolSearch').oninput=renderSchools;
$('schoolList').onclick=e=>{const b=e.target.closest('[data-school]');if(!b) return;schoolId=b.dataset.school;page=0;updateCampusOptions();renderSchools();render();};
$('year').onchange=()=>{page=0;updateCampusOptions();renderSchools();render();};
$('query').oninput=()=>{page=0;render();};
['track','group','campus','status','sort','favoriteOnly'].forEach(id=>$(id).onchange=()=>{page=0;render();});
$('resetFilters').onclick=reset; $('emptyReset').onclick=reset;
$('prevPage').onclick=()=>{page--;render();$('results').scrollIntoView({block:'start'});};
$('nextPage').onclick=()=>{page++;render();$('results').scrollIntoView({block:'start'});};
$('rows').onclick=e=>{
  const star=e.target.closest('[data-star]');
  if(star) { const id=star.dataset.star; favorites.has(id)?favorites.delete(id):favorites.add(id);try{localStorage.setItem('placement-reference-stars-'+data.workbookSha256,JSON.stringify([...favorites]));}catch{} render();return; }
  const button=e.target.closest('[data-detail]');if(button) detail(button.dataset.detail);
};
$('rows').onchange=e=>{const c=e.target.closest('[data-compare]');if(c) toggleCompare(c.dataset.compare);};
$('clearCompare').onclick=()=>{compared.clear();renderTray();render();};
$('openCompare').onclick=openComparison;
$('closeDetail').onclick=()=>closeDialog('detailDialog'); $('closeCompare').onclick=()=>closeDialog('compareDialog');
['detailDialog','compareDialog'].forEach(id=>$(id).addEventListener('click',e=>{if(e.target===$(id)){const r=$(id).getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(id);}}));
// The reference payload is supplied inside the authenticated encrypted page.
setupQuickFilters();
const bundled=document.getElementById('localReferenceData');
if(bundled) { try{load(JSON.parse(bundled.textContent),'2026 검수본',true);}catch(e){$('loadStatus').textContent=e.message;$('loadStatus').classList.add('error');} }
})();
