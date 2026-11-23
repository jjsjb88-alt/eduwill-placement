const unit=name=>name.trim().replace(/[*★Ⓜ❖]+$/u,'');
export const change=(before,after)=>{
  if(before==null||after==null)return '—';
  const diff=after-before;
  return diff>0?'+'+diff:diff<0?String(diff):'동일';
};

let pending;
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
      const name=unit(row[0]),pair=names.get(name)||{};
      pair.before=row;names.set(name,pair);
    }
    return {names,before,after};
  }).catch(err=>{pending=null;throw err;});
  return pending;
}
