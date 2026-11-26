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
  ['컴퓨터공학부','AI컴퓨터공학부'],['전자공학과','전자공학부'],['미디어미디어영상학과','미디어영상학과'],
  // 경기대 학칙(2023.2.15) 및 2023·2024 모집요강의 모집단위 개편표.
  ['문예창작학과','국어국문학과'],['국제통상학과','무역학과'],
  ['국제관계학과','정치외교학전공'],['국제학전공','정치외교학전공'],
  ['국제산업정보학과','경영학전공'],['국제산업정보전공','경영학전공'],
  ['경영정보학과','산업경영공학과'],['경영정보전공','산업경영공학과'],
  ['교정보호학과','범죄교정심리학전공'],['교정보호전공','범죄교정심리학전공'],['범죄교정학전공','범죄교정심리학전공'],
  ['관광개발학과','관광개발경영학과'],['관광개발전공','관광개발경영학과'],
  ['관광경영학과','관광개발경영학과'],['관광경영전공','관광개발경영학과'],
  ['관광이벤트학과','관광문화콘텐츠학과'],['관광이벤트전공','관광문화콘텐츠학과'],
  ['건설시스템공학전공','사회에너지시스템공학과'],['토목공학과','사회에너지시스템공학과'],
  ['환경에너지공학과','사회에너지시스템공학과'],['환경에너지공학전공','사회에너지시스템공학과'],
  ['플랜트건축공학과','건축공학전공'],
  ['컴퓨터과학과','AI컴퓨터공학부'],['스포츠산업경영전공','스포츠레저산업전공'],
  ['스포츠경영학과','스포츠레저산업전공'],['레저스포츠학과','스포츠레저산업전공'],['레저스포츠전공','스포츠레저산업전공']
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
  function describe(name,track,campus){
    const label=track.replace(/\s/g,'').replace(/편입(?:학)?$/,'');
    const column=label==='일반'?3:label==='학사'?4:0;
    const shortName=name.slice(name.lastIndexOf('/')+1), key=normalizeUnit(shortName);
    const entry=(row,display=row[0],shared=false)=>({unit:row[0],label:display,seats:row[column],campus:row[1],shared});
    if(key==='전자물리학과'&&(!campus||campus.includes('수원')))
      return {name:'전자물리학과',campus:'수원',entries:column?[{label:'미선발',campus:'수원'}]:[]};
    const art=kyonggiArtUnits.get(key);
    if(art){
      const rows=art.map(major=>units.get(normalizeUnit(major))).filter(row=>eligible(row,campus));
      if(!rows.length)return column?undefined:null;
      const officialCampus=rows[0][1];
      const entries=column?rows.filter(row=>row[column]!=null).map(row=>entry(row)):[];
      if(column&&!entries.length)entries.push({label:'미선발',campus:officialCampus});
      return {name:rows.map(row=>row[0]).join(' · '),campus:officialCampus,entries};
    }
    const n=kyonggiNames.get(key)||kyonggiNamesForGroup.get(key)||shortName;
    const unit=units.get(normalizeUnit(n)), group=groups.get(normalizeUnit(n));
    const parent=group&&units.get(normalizeUnit(group));
    const found=eligible(unit,campus)?unit:eligible(parent,campus)?parent:null;
    if(!found)return column?undefined:null;
    const faculty=eligible(parent,campus)&&(parent[3]!=null||parent[4]!=null)?parent[0]:undefined;
    const result={name:unit?.[0]||n,faculty,campus:found[1]};
    if(!column)return {...result,entries:[]};
    if(eligible(unit,campus)&&unit[column]!=null){
      const shared=!!guide.majors[unit[0]];
      const title=shared?unit[0]+' 공동':normalizeUnit(name)===normalizeUnit(unit[0])?'':unit[0];
      return {...result,entries:[entry(unit,title,shared)]};
    }
    if(eligible(parent,campus)&&parent[column]!=null)
      return {...result,entries:[entry(parent,parent[0]+' 공동',true)]};
    const split=(guide.majors[unit?.[0]]||[]).map(major=>units.get(normalizeUnit(major))).filter(row=>eligible(row,campus)&&row[column]!=null);
    const entries=split.length?split.map(row=>entry(row)):[{label:'미선발',campus:found[1]}];
    return {...result,entries};
  }
  function lookup(name,track,campus){
    const result=describe(name,track,campus);
    if(result===null||result?.entries.length===0)return null;
    return result?result.entries.map(({label,seats,campus})=>seats==null?{label,campus}:{label,seats,campus}):[{label:'모집단위 확인 필요'}];
  }
  lookup.describe=describe;
  return lookup;
}

const kookminNames=new Map([
  // 국민대 학적변경 안내(2026·2027) 및 해당 학부의 전공 안내.
  ['경영정보전공','비즈니스IT전공'],['정보시스템전공','비즈니스IT전공'],
  ['빅데이터경영통계전공','AI빅데이터융합경영학과'],
  ['재무금융전공','경영학전공'],['회계학전공','경영학전공'],
  ['파이낸스보험경영학전공','경영학전공'],
  ['행정학전공','행정학과'],['정책학전공','행정학과'],['수학과','정보보안암호수학과'],
  ['중국어문전공','중어중문학과'],['중국정경전공','중국학전공'],['일본학과','일본학전공'],
  ['유라시아학과','러시아·유라시아학과'],['국제통상학과','국제통상금융학과'],
  ['기계금속재료전공','에너지·모빌리티재료전공'],['건축시스템전공','건축학전공'],
  ['기계시스템공학전공','기계공학전공'],['융합기계공학전공','기계공학전공'],['에너지기계공학전공','기계공학전공'],
  ['전자시스템공학전공','지능형ICT융합전공'],['지능전자공학전공','모빌리티전력전자융합전공'],
  ['에너지전자융합전공','모빌리티전력전자융합전공'],
  ['융합전자공학전공','지능형반도체융합전자전공'],
  ['산림환경시스템학과','산림기후환경학과'],['임산생명공학과','바이오소재융합공학과'],
  ['바이오발효융합학과','융합바이오공학과'],['바이오의약전공','바이오의과학과'],
  ['나노전자물리학과','양자융합공학과'],['나노소재전공','에너지반도체화학공학과'],
  ['응용화학과','에너지반도체화학공학과|바이오의과학과'],['생명나노화학과','에너지반도체화학공학과|바이오의과학과'],
  ['KIBS','International Business전공'],['KMU International Business School','International Business전공']
].map(([past,current])=>[normalizeUnit(past),current.split('|').map(normalizeUnit)]));

function kookminSeatLookup(guide){
  const units=new Map();
  for(const row of guide.rows){
    const unit=row[0].replace(/\(\d년제\)$/u,'');
    const major=unit.replace(/^\S+학부(?:\(야\))?\s+/u,'');
    for(const key of [row[0],unit,major])units.set(normalizeUnit(key),row);
  }
  const general=guide.headers.indexOf('일반')+1,bachelor=guide.headers.indexOf('학사')+1;
  return (name,track)=>{
    const label=track.replace(/\s/g,'').replace(/편입(?:학)?$/,'');
    const column=label==='일반'?general:label==='학사'?bachelor:0;
    if(!column)return null;
    const historical=name.replace(/\(\d년제\)$/u,'');
    const key=normalizeUnit(historical.slice(historical.lastIndexOf('/')+1));
    const alias=kookminNames.get(key);
    const rows=(alias||[key]).map(unit=>units.get(unit)).filter(Boolean);
    if(!rows.length)return [{label:'모집단위 확인 필요'}];
    return rows.map(row=>{
      const changedParent=historical.includes('/')&&normalizeUnit(historical.replaceAll('/',' '))!==normalizeUnit(row[0].replace(/\(\d년제\)$/u,''));
      const display=alias||changedParent?row[0]+' ':'';
      const seats=row[column];
      return {label:seats==null?display+'미선발':display.trim(),seats};
    });
  };
}

// 이화여대 공과대학·인공지능대학 연혁과 2027 편입 모집요강.
const ewhaNames=new Map([
  ['문헌정보학전공','문헌정보학과'],['국어국문학전공','국어국문학과'],
  ['독어독문학전공','독어독문학과'],['사학전공','사학과'],['사회학전공','사회학과'],
  ['수학전공','수학과'],['심리학전공','심리학과'],['영어영문학전공','영어영문학부'],
  ['중어중문학전공','중어중문학과'],['철학전공','철학과'],
  ['경영학전공','경영학부'],['커뮤니케이션미디어학전공','커뮤니케이션·미디어학부'],
  ['건축학전공','건축학과(5년제)'],['건축도시시스템공학전공','건축도시시스템공학과'],
  ['기후에너지시스템공학전공','기후에너지시스템공학과'],['환경공학전공','환경공학과'],
  ['휴먼기계바이오공학부','휴먼기계바이오공학과'],['식품공학전공','식품생명공학과'],
  ['식품생명공학전공','식품생명공학과'],['화학신소재공학전공','화공신소재공학과'],
  ['화공신소재공학전공','화공신소재공학과'],['화학나노과학전공','화학·나노과학과'],
  ['전자공학과','융합전자반도체공학부 전자전기공학전공'],
  ['컴퓨터공학전공','컴퓨터공학과'],['사이버보안전공','사이버보안학과'],['생명과학전공','생명과학과']
].map(([past,current])=>[normalizeUnit(past),current]));

function ewhaSeatLookup(guide){
  const units=new Map();
  for(const row of guide.rows){
    const full=row[0], short=full.split(' ').at(-1);
    units.set(normalizeUnit(full),row);
    units.set(normalizeUnit(short.replace(/\(5년제\)$/u,'')),row);
  }
  const general=guide.headers.indexOf('일반')+1, bachelor=guide.headers.indexOf('학사 최대')+1;
  return (name,track)=>{
    const label=track.replace(/\s/g,'').replace(/편입(?:학)?$/,'');
    const column=label==='일반'?general:label==='학사'?bachelor:0;
    if(!column)return null;
    const reported=normalizeUnit(name.replaceAll('/',' '));
    const key=normalizeUnit(name.split(/[/\s]+/u).at(-1).replace(/\(5년제\)$/u,''));
    const alias=ewhaNames.get(key);
    const row=units.get(reported)||units.get(alias?normalizeUnit(alias):key);
    if(!row)return [{label:'모집단위 확인 필요'}];
    const unit=normalizeUnit(row[0])===reported?'':row[0]+' ';
    const seats=row[column];
    return [{label:(unit+(seats==null?'미선발':label==='학사'?'학사 최대':'')).trim(),seats}];
  };
}

export function seatLookup(guide,school){
  if(school==='ewha')return ewhaSeatLookup(guide);
  if(school==='kyonggi')return kyonggiSeatLookup(guide);
  if(school==='kookmin')return kookminSeatLookup(guide);
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
