'use strict';
const {test}=require('node:test'), assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const {runInNewContext}=require('node:vm');
const at=file=>readFileSync(join(__dirname,'..',file),'utf8');
const js=at('report-view.js'), html=at('full-2026.html');
const start=js.indexOf('  function renderExamHistory('), end=js.indexOf('  async function choose(',start);
const node=(tag,value)=>({tag,textContent:value??'',children:[],append(...v){this.children.push(...v);},replaceChildren(...v){this.children=v;}});
const nodes={history:node('details'),exams:node('tbody')};
const {renderExamHistory}=runInNewContext(js.slice(start,end)+'\n;({ renderExamHistory })',{$:k=>nodes[k],el:node});
const base=['2026.09.01','가상 시험','영어','50','75.0','16명','반영'];
test('history preserves all seven stored values without adding a second rank or placeholders',()=>{
  const rows=[base,[...base,{above:0,count:16}],[...base,{above:-1,count:4}]];
  renderExamHistory(rows);
  assert.equal(nodes.history.hidden,false);
  assert.deepEqual(nodes.exams.children.map(r=>r.children.map(x=>x.textContent)),rows.map(r=>r.slice(0,7)));
});
test('new lookup closes prior history and empty history remains hidden',()=>{
  nodes.history.open=true;
  renderExamHistory([]);
  assert.equal(nodes.history.open,false);
  assert.equal(nodes.history.hidden,true);
  assert.equal(nodes.exams.children.length,0);
});
test('the real page keeps the existing report and uses one comparison metric with a single short note',()=>{
  assert.match(js,/textContent,\$\('math'\)\.textContent\]=data\.metrics/);
  assert.match(js,/renderExamHistory\(data\.history\)/);
  const details=html.slice(html.indexOf('<details id="history">'),html.indexOf('<footer'));
  assert.match(details,/<table aria-describedby="historyRankNote">/);
  assert.deepEqual([...details.matchAll(/<th scope="col">(.*?)<\/th>/g)].map(m=>m[1]),['시행일','시험','과목','원점수','시험 백분위','응시자','반영']);
  assert.match(details,/<p id="historyRankNote">백분위는 같은 시험 응시자 기준입니다\.<\/p>/);
  assert.doesNotMatch(details,/공동석차|상위 %|historyRankHelp/);
  assert.equal([...details.matchAll(/<summary>/g)].length,1);
});
