import directory,{campuses,pendingNames} from './unit-names.js?v=20261125-units';
import {excludedKonkukUnit} from './quotas/counseling-seats.js?v=20261125-history';

const indices=new Map();
export const countsForSchool=row=>!row[12]?.length&&!row[14]&&
  !(row[9]?.year===2027&&row[9].seats==null)&&['도전','적정','안정'].includes(row[4]);

export function schoolCutoffDistance(rows){
  const margins=[];
  for(const row of rows){
    if(!countsForSchool(row))continue;
    const points=row[8];
    if(!points?.length||!points.every(p=>Number.isFinite(p.value)&&Number.isFinite(p.low)))continue;
    // A separate-subject verdict reaches the cutoff only when both subjects reach it.
    margins.push(Math.min(...points.map(p=>p.value-p.low)));
  }
  if(!margins.length)return null;
  margins.sort((a,b)=>a-b);
  return Math.max(0,-Number(margins[Math.floor((margins.length-1)/2)].toFixed(10)));
}

for(const [school,tracks] of Object.entries(directory)){
  const index=new Map();
  for(const [track,units] of Object.entries(tracks))for(const unit of units){
    for(const source of unit.sources){
      const key=track+'|'+source;
      if(!index.has(key))index.set(key,[]);
      index.get(key).push(unit);
    }
  }
  indices.set(school,index);
}

// Preserve each entire evidence row. Never mix a source's band with another source's chart.
export function reconcileSchool(school){
  const index=indices.get(school.school);
  if(school.catalogYear)return false;
  for(const row of school.rows){
    if(!row[2])row[11]=campuses[school.school]?.[row[3]+'|'+row[0]];
    row[12]=pendingNames[school.school]?.[row[3]+'|'+row[0]];
    if(school.school==='건국대학교'&&['일반','학사'].includes(row[3])&&
        (row[2]==='서울'||(row[11]?.length===1&&row[11][0]==='서울'))&&excludedKonkukUnit(row[0]))row[14]=true;
  }
  const pending=school.rows.some(r=>r[12]?.length);
  if(!index)return pending;
  const entries=new Map();
  let changed=false;
  school.rows.forEach((row,i)=>{
    const [name,,campus,track]=row;
    const targets=index.get(track+'|'+name)?.filter(u=>!campus||u.campus===campus);
    if(!targets?.length){
      entries.set(row,{row,reason:school.reasons?.[i]});
      return;
    }
    changed=true;
    for(const unit of targets){
      const key=JSON.stringify([unit.campus,track,unit.name]);
      const candidate={row,reason:school.reasons?.[i],unit};
      const previous=entries.get(key);
      // A measured result takes priority, then the canonical source order from the registry.
      const rank=r=> (r[4]==='판정 자료 없음'?10000:0)+(r[0]===unit.name?-1:unit.sources.indexOf(r[0]));
      if(!previous||rank(row)<rank(previous.row))entries.set(key,candidate);
    }
  });
  if(!changed)return pending;
  school.rows=[];school.reasons=[];
  for(let {row,reason,unit} of entries.values()){
    if(unit){
      const old=row[0];
      row=row.slice();
      row[9]={...unit,recordCampus:unit.sources.includes(unit.name)?row[2]:unit.campus||row[2]};
      row[0]=unit.name;row[1]=unit.field||row[1];row[2]=unit.campus||row[2];
      if(row[10]?.length){
        row[6]='개편 전 성적 통합';
        reason='과거 '+row[10].join('·')+'로 선발한 연도의 합격 성적을 합쳐 판정했습니다. '+(reason||'');
      }else if(old!==unit.name){
        row[6]=row[6]||'개편 전 학과 기준';
        reason=unit.year+'학년도 명칭으로 표시합니다. 판정에 참고한 과거 모집단위는 '+old+'입니다.'+(reason?' '+reason:'');
      }
      if(unit.sources.some(source=>(index.get(row[3]+'|'+source)?.length||0)>1))
        reason+=' 개편 전 자료는 여러 현행 전공이 함께 참고하는 기록입니다.';
    }
    school.rows.push(row);school.reasons.push(reason);
  }
  return true;
}
