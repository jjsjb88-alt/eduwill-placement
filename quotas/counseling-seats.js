const normalizeUnit=name=>name.normalize('NFKC').replace(/[\s·ㆍ・-]/gu,'').toLowerCase();

// Sookmyung's advanced-department assignment notice, article 216487.
const sookmyungUnits=new Map([
  ['컴퓨터과학부',['컴퓨터과학전공','데이터사이언스전공']],
  ['소프트웨어융합전공',['데이터사이언스전공']],
  ['응용물리전공',['신소재물리전공']],
  ['전자공학전공',['지능형전자시스템전공']],
  ['IT공학전공',['인공지능공학부']]
].map(([old,names])=>[normalizeUnit(old),names]));
// Konkuk's 2018 and 2026 reorganization notices and 2027 transfer guide.
const konkukUnits=new Map([
  ['건축학부',['건축학전공','건축공학전공']],
  ['건축학과',['건축학전공','건축공학전공']],
  ['컴퓨터공학부',['인공지능컴퓨터공학부 컴퓨터공학과']],
  ['컴퓨터공학과',['인공지능컴퓨터공학부 컴퓨터공학과']],
  ['소프트웨어학과',['인공지능컴퓨터공학부 컴퓨터공학과']],
  ['스마트ICT융합공학과',['기계·로봇·자동차공학부','인공지능컴퓨터공학부 컴퓨터공학과']],
  ['기계공학과',['기계·로봇·자동차공학부']],
  ['기계공학부',['기계·로봇·자동차공학부']],
  ['기계항공공학부',['기계·로봇·자동차공학부','항공우주·모빌리티공학과']],
  ['스마트운행체공학과',['항공우주·모빌리티공학과','기계·로봇·자동차공학부']],
  ['항공우주정보시스템공학과',['항공우주·모빌리티공학과']],
  ['화학공학부',['화공·생명·에너지공학부','재료공학과']],
  ['유기나노시스템공학과',['화공·생명·에너지공학부','재료공학과']],
  ['융합신소재공학과',['화공·생명·에너지공학부','재료공학과']],
  ['인프라시스템공학과',['사회환경공학부']],
  ['미래에너지공학과',['화공·생명·에너지공학부','재료공학과']],
  ['화장품공학과',['생물공학과']],
  ['줄기세포재생공학과',['첨단바이오공학부']],
  ['의생명공학과',['첨단바이오공학부']],
  ['동물자원·식품과학·유통학부 동물자원전공',['동물자원과학과']],
  ['동물자원·식품과학·유통학부 식품과학전공',['식품공학전공']],
  ['동물자원·식품과학·유통학부 식품유통전공',['식품유통경제전공']],
  ['축산식품생명공학과',['식품공학전공']],
  ['식품유통공학과',['식품유통경제전공']],
  ['생명과학특성학과',['생명과학과']],
  ['시스템생명공학과',['시스템생명공학전공']],
  ['융합생명공학과',['융합생명공학전공']],
  ['특성화학부/시스템생명공학전공,융합생명공학전공',['시스템생명공학전공','융합생명공학전공']],
  ['산림조경학과',['산림조경전공']],
  ['환경보건과학과',['환경보건전공']],
  ['환경보건·산림조경학부 산림조경전공',['산림조경전공']],
  ['환경보건·산림조경학부 환경보건전공',['환경보건전공']]
].map(([old,names])=>[normalizeUnit(old),names]));
const konkukNotOffered=new Set(['교육공학과','수학교육과','일어교육과','글로벌비즈니스학과','융합인재학과',
  '융합인재학부/과학인재전공','영화·애니메이션학과'].map(normalizeUnit));
const pending=new Map();
export const excludedKonkukUnit=name=>konkukNotOffered.has(normalizeUnit(name));

const kyonggiNames=new Map([
  ['독어독문학과','독어독문전공'],['프랑스어문학과','프랑스어문전공'],
  ['일어일문학과','일어일문전공'],['중어중문학과','중어중문전공'],['러시아어문학과','러시아어문전공'],
  ['경찰행정학과','경찰행정학전공'],['사회복지학과','사회복지학전공'],['사회복지전공','사회복지학전공'],
  ['청소년학과','청소년학전공'],['청소년전공','청소년학전공'],['행정학과','행정학전공'],
  ['경제학과','경제학전공'],['경제전공','경제학전공'],['응용통계학과','응용통계학전공'],['응용통계전공','응용통계학전공'],
  ['응용정보통계학과','응용통계학전공'],['산업디자인학과','산업디자인전공'],
  ['지식재산학과','지식재산학전공'],['경영학과','경영학전공'],['회계세무학과','회계세무학전공'],['회계세무전공','회계세무학전공'],
  ['산업경영정보공학과','산업경영공학과'],['생명과학과','생명과학전공'],['식품생물공학과','식품생물공학전공'],
  ['건축학과','건축학과(5년제)'],['건축공학과','건축공학전공'],['신소재공학과','신소재공학전공'],
  ['화학공학과','화학공학전공'],['도시교통공학과','도시·교통공학전공'],
  ['호텔경영학과','호텔경영전공'],['외식·조리학과','외식·조리전공'],
  ['컴퓨터공학부','AI컴퓨터공학부'],['전자공학과','전자공학부'],['미디어미디어영상학과','미디어영상학과']
].map(([past,current])=>[normalizeUnit(past),current]));
const kyonggiArtUnits=new Map([
  ['서양화,미술경영학과',['서양화전공','미술경영전공']],
  ['한국화,서예학과',['한국화전공','서예전공']]
].map(([past,majors])=>[normalizeUnit(past),majors]));

function kyonggiSeatLookup(guide){
  const units=new Map(guide.rows.map(row=>[normalizeUnit(row[0]),row]));
  const groups=new Map(), kyonggiNamesForGroup=new Map();
  for(const [group,majors] of Object.entries(guide.majors)){
    for(const major of majors){
      groups.set(normalizeUnit(major),group);
      kyonggiNamesForGroup.set(normalizeUnit(group+major),major);
    }
  }
  function eligible(row,campus){
    return row&&(!campus||campus.includes(row[1]));
  }
  return (name,track,campus)=>{
    const label=track.replace(/\s/g,'').replace(/편입(?:학)?$/,'');
    const column=label==='일반'?3:label==='학사'?4:0;
    if(!column)return null;
    const shortName=name.slice(name.lastIndexOf('/')+1), key=normalizeUnit(shortName);
    const art=kyonggiArtUnits.get(key);
    if(art){
      const rows=art.map(major=>units.get(normalizeUnit(major))).filter(row=>eligible(row,campus)&&row[column]!=null);
      if(rows.length)return rows.map(row=>({label:row[0],seats:row[column],campus:row[1]}));
    }
    const n=kyonggiNames.get(key)||kyonggiNamesForGroup.get(key)||shortName;
    const unit=units.get(normalizeUnit(n)), group=groups.get(normalizeUnit(n));
    const parent=group&&units.get(normalizeUnit(group));
    const found=eligible(unit,campus)||eligible(parent,campus);
    if(!found)return [{label:'모집단위 확인 필요'}];
    if(eligible(unit,campus)&&unit[column]!=null){
      const title=guide.majors[unit[0]]?unit[0]+' 공동':unit[0];
      return [{label:normalizeUnit(name)===normalizeUnit(unit[0])&&!guide.majors[unit[0]]?'':title,seats:unit[column],campus:unit[1]}];
    }
    if(eligible(parent,campus)&&parent[column]!=null)
      return [{label:parent[0]+' 공동',seats:parent[column],campus:parent[1]}];
    const split=(guide.majors[unit?.[0]]||[]).map(major=>units.get(normalizeUnit(major))).filter(row=>eligible(row,campus)&&row[column]!=null);
    if(split.length)return split.map(row=>({label:row[0],seats:row[column],campus:row[1]}));
    return [{label:'미선발',campus:(unit||parent)[1]}];
  };
}

export function seatLookup(guide,school){
  if(school==='kyonggi')return kyonggiSeatLookup(guide);
  const units=new Map(guide.rows.map(row=>[normalizeUnit(row[0]),row]));
  const sookmyung=school==='sookmyung', aliases=sookmyung?sookmyungUnits:konkukUnits;
  const general=guide.headers.indexOf(sookmyung?'일반(정원 내)':'일반')+1;
  const bachelor=guide.headers.indexOf('학사')+1;
  const employee=guide.headers.indexOf('특성화고졸 재직자')+1;
  return (name,track)=>{
    const label=track.replace(/\s/g,'').replace(/편입(?:학)?$/,'');
    const col=label==='일반'?general:label==='학사'?bachelor:0;
    if(!col)return null;
    const unit=sookmyung?name.slice(name.lastIndexOf('/')+1):name;
    const key=normalizeUnit(unit), alternatives=aliases.get(key);
    if(!sookmyung&&konkukNotOffered.has(key))return [{label:'미선발'}];
    const rows=(alternatives||[unit]).map(unit=>units.get(normalizeUnit(unit)));
    if(rows.some(row=>!row))return [{label:'모집단위 확인 필요'}];
    return rows.map(row=>{
      if(!sookmyung&&row[0]==='산업경영융합학부'&&label==='일반')
        return {label:'특성화고졸 재직자만',seats:row[employee]};
      const currentName=row[0]==='인공지능컴퓨터공학부 컴퓨터공학과'?'컴퓨터공학과':row[0];
      const unitLabel=alternatives?currentName+' ':'';
      const noSeats=sookmyung&&label==='일반'?'정원 내 미선발':'미선발';
      return {unit:row[0],field:row[1],label:row[col]==null?unitLabel+noSeats:unitLabel.trimEnd(),seats:row[col]};
    });
  };
}

export function counselingSeats(school){
  if(!pending.has(school))pending.set(school,fetch(new URL('./'+school+'-2027.json',import.meta.url)).then(async response=>{
    if(!response.ok)throw Error('2027 모집표를 열 수 없습니다.');
    return seatLookup(await response.json(),school);
  }).catch(error=>{pending.delete(school);throw error;}));
  return pending.get(school);
}
