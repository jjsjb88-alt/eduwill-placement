const unit=name=>name.trim().replace(/[*★Ⓜ❖]+$/u,'');
// Confirmed in Gachon's department notice and the university's 2025 reorganization tables.
const successors=new Map([
  ['경영학전공','경영학과'],['물리학과','반도체물리학과'],
  ['설비·소방공학과','설비·소방공학전공'],['전자공학전공','전자공학과']
]);
export const currentName=name=>successors.get(name)||name;
export function seatText(pair,year,col){
  const row=pair[year];
  if(row)return row[col]??'미기재';
  return year==='before'&&unit(pair.after[0])==='회계세무학과'?'미선발':'대조 필요';
}
export const change=(before,after)=>{
  if(before==null||after==null)return '—';
  const diff=after-before;
  return diff>0?'+'+diff:diff<0?String(diff):'동일';
};

let pending;
let kauPending;
export function kauQuotas(){
  if(!kauPending)kauPending=fetch(new URL('./kau-2027.json',import.meta.url)).then(response=>{
    if(!response.ok)throw Error('항공대 모집표를 열 수 없습니다.');
    return response.json();
  }).catch(error=>{kauPending=null;throw error;});
  return kauPending;
}
export function gachonTrend(){
  if(!pending)pending=Promise.all([2026,2027].map(async year=>{
    const url=new URL('./gachon-'+year+'.json',import.meta.url);
    const response=await fetch(url);
    if(!response.ok)throw Error('모집인원 비교표를 열 수 없습니다.');
    return response.json();
  })).then(([before,after])=>{
    const names=new Map();
    for(const row of after.rows)names.set(unit(row[0]),{after:row});
    for(const row of before.rows){
      const oldName=unit(row[0]),name=currentName(oldName),pair=names.get(name)||{};
      if(pair.before)throw Error('모집단위 연결이 중복됩니다.');
      if(oldName!==name)pair.oldName=oldName;
      pair.reorganized=oldName==='경영학전공';
      pair.before=row;names.set(name,pair);
    }
    return {names,before,after};
  }).catch(err=>{pending=null;throw err;});
  return pending;
}
