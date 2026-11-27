'use strict';
const {test}=require('node:test'), assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const {runInNewContext}=require('node:vm');
const at=file=>readFileSync(join(__dirname,'..',file),'utf8');
const js=at('report-view.js'), html=at('full-2026.html');
const start=js.indexOf('  function competitionTopShare('), end=js.indexOf('  async function choose(',start);
const node=(tag,value)=>({tag,textContent:value??'',children:[],attrs:{},append(...v){this.children.push(...v);},replaceChildren(...v){this.children=v;},setAttribute(k,v){this.attrs[k]=v;}});
const nodes={history:node('details'),exams:node('tbody')};
const {renderExamHistory}=runInNewContext(js.slice(start,end)+'\n;({ renderExamHistory })',{$:k=>nodes[k],el:node});
const base=['2026.01.01','가상 시험','영어','50','75.0','16명','반영'];
test('history renders stored values unchanged and formats validated evidence exactly',()=>{
  const rows=[base,[...base,{above:0,count:16}],[...base,{above:15,count:16}],[...base,{above:3,count:16}], [...base.slice(0,5),'1,600명',base[6],{above:0,count:1600}]];
  renderExamHistory(rows);
  assert.equal(nodes.history.hidden,false);
  const cells=nodes.exams.children.map(r=>r.children.map(x=>x.textContent));
  assert.deepEqual(cells.map(r=>r[7]),['—','6.3%','100.0%','25.0%','0.1%']);
  assert.deepEqual(cells.map(r=>r.slice(0,7)),rows.map(r=>r.slice(0,7)));
});
test('legacy, inconsistent or malformed evidence never gives a numeric top percentage',()=>{
  const bad=[undefined,null,{}, {above:0,count:15}, {above:-1,count:16},{above:16,count:16},{above:1.5,count:16},{above:'3',count:16},{above:3,count:'16'}];
  renderExamHistory(bad.map(e=>[...base,e]));
  for(const r of nodes.exams.children){assert.equal(r.children[7].textContent,'—');assert.equal(r.children[7].attrs['aria-label'],'공동석차 자료 없음');}
  renderExamHistory([]);
  assert.equal(nodes.history.hidden,true);
  assert.equal(nodes.exams.children.length,0);
});
test('the actual report calls the renderer with separate summary and accessible labels',()=>{
  assert.match(js,/textContent,\$\('math'\)\.textContent\]=data\.metrics/);
  assert.match(js,/renderExamHistory\(data\.history\)/);
  const details=html.match(/<details id="history">([\s\S]*?)<\/details>/)[1];
  assert.match(details,/<table aria-describedby="historyRankNote">/);
  assert.deepEqual([...details.matchAll(/<th scope="col">(.*?)<\/th>/g)].map(m=>m[1]),['시행일','시험','과목','원점수','시험별 백분위','응시자','반영','공동석차 기준 상위 %']);
});
