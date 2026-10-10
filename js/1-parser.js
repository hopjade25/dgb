'use strict';
// ============ 차트 파서 (dgb chart format v2) ============
const CH_TARGET={R1:{type:'R',k:0},R2:{type:'R',k:1},R3:{type:'R',k:2},R4:{type:'R',k:3},R5:{type:'R',k:4},R6:{type:'R',k:5},
 GL:{type:'G',side:'L'},GM:{type:'G',side:'M'},GR:{type:'G',side:'R'}};
// 토큰: 1 통상 / 2·4 통상(v1 블랙, 별칭) / C·D 체인 / L 롱시작 / K 체인끝 롱 / E 롱끝 / F 플릭(빨강 전용)
const TOK={'1':{},'2':{},'4':{},'C':{chain:1},'D':{chain:1},'L':{long:1},'K':{chain:1,long:1},'E':{end:1},'F':{flick:1}};
function parseChart(text){
 const meta={PATH:null,TITLE:'untitled',ARTIST:'',DIFF:'',LEVEL:'',BPM:120,LEAD:2,FALL:1.7,SEED:1},bpmDef={},spdDef={},ev=[],warn=[];let bbAlt=0;
 // 마디 길이(ML 채널, BMS 02 채널과 같음: 4/4 대비 배율. 5/4=1.25, 7/8=0.875, 15/16=0.9375)
 const mlen={};text.split(/\r?\n/).forEach(raw=>{const q=raw.replace(/;.*$/,'').trim().match(/^#(\d{3}):ML:([\d.\/]+)$/i);if(q){const v=q[2].includes('/')?q[2].split('/').reduce((a,b)=>a/b):+q[2];mlen[+q[1]]=v;}});
 const mStart=[0];for(let i=1;i<=1000;i++)mStart[i]=mStart[i-1]+4*(mlen[i-1]||1);const mBeats=i=>4*(mlen[i]||1);
 text.split(/\r?\n/).forEach((raw,li)=>{const line=raw.replace(/;.*$/,'').trim();if(!line||line[0]!=='#')return;
  if(/^#\d{3}:ML:/i.test(line))return;
  let m=line.match(/^#(\d{3}):([A-Z0-9]{2}):([0-9A-Za-z]+)$/);
  if(m){const mea=+m[1];let ch=m[2];const d=m[3];
   if(ch==='BP'||ch==='SP'){const n=Math.floor(d.length/2);for(let i=0;i<n;i++){const id=d.substr(i*2,2);if(id!=='00')ev.push({beat:mStart[mea]+mBeats(mea)*i/n,ch,id,li});}return;}
   const legacyBB=ch==='BB';
   if(legacyBB)warn.push(`${li+1}행: BB(빅뱅)는 悠久のリフレシア 기능 — 기준판(VOLZZA 2) 외라 빨강 통상으로 변환`);
   else if(!CH_TARGET[ch]){warn.push(`${li+1}행: 알 수 없는 채널 ${ch}`);return;}
   for(let i=0;i<d.length;i++){let c=d[i].toUpperCase();if(c==='0')continue;if(!TOK[c]&&c!=='V'&&c!=='W'){warn.push(`${li+1}행: 알 수 없는 토큰 ${c}`);continue;}
    let cch=ch;if(legacyBB){cch=(bbAlt++%2)?'R4':'R3';c='1';}
    if(c==='V'||c==='W'){warn.push(`${li+1}행: 버티컬 오브젝트(${c})는 폐지 — 통상으로 변환`);c='1';}
    if(cch[0]==='G'&&(c==='L'||c==='K'||c==='E'||c==='V'||c==='W'||c==='F')){ // 초록 = 통상만
     if(c==='E')continue;warn.push(`${li+1}행: 초록(${cch})에 특수 토큰 ${c} — 통상으로 변환`);c=c==='K'?'C':'1';}
    ev.push({beat:mStart[mea]+mBeats(mea)*i/d.length,ch:cch,tok:c,li});}return;}
  m=line.match(/^#(BPM|SPD)([0-9A-Z]{2})\s+([\d.]+)$/i);if(m){(m[1].toUpperCase()==='BPM'?bpmDef:spdDef)[m[2].toUpperCase()]=+m[3];return;}
  m=line.match(/^#([A-Z]+)\s+(.*)$/i);if(m){const k=m[1].toUpperCase();meta[k]=['BPM','LEAD','FALL','SEED'].includes(k)?+m[2]:m[2].trim();if(k==='SEED')meta._seedGiven=true;return;}
  warn.push(`${li+1}행: 해석 불가`);});
 ev.sort((a,b)=>a.beat-b.beat);
 const bpmCh=[{beat:0,bpm:meta.BPM}],spdCh=[{beat:0,m:1}];
 for(const e of ev){if(e.ch==='BP'){if(bpmDef[e.id])bpmCh.push({beat:e.beat,bpm:bpmDef[e.id]});else warn.push(`BPM${e.id} 정의 없음`);}
  if(e.ch==='SP'){if(spdDef[e.id])spdCh.push({beat:e.beat,m:spdDef[e.id]});else warn.push(`SPD${e.id} 정의 없음`);}}
 const LEAD=Math.max(3,meta.LEAD);meta.LEAD=LEAD; // 3-2-1 카운트다운 확보
 function beatToTime(b){let t=LEAD,prev=bpmCh[0];for(let i=1;i<bpmCh.length&&bpmCh[i].beat<b;i++){t+=(bpmCh[i].beat-prev.beat)*60/prev.bpm;prev=bpmCh[i];}return t+(b-prev.beat)*60/prev.bpm;}
 function bpmAt(b){let v=meta.BPM;for(const c of bpmCh)if(c.beat<=b+1e-9)v=c.bpm;return v;}
 function spdAt(b){let m=1;for(const s of spdCh)if(s.beat<=b+1e-9)m=s.m;return m;}
 const fixed=String(meta.PATH||'').toUpperCase()==='FIXED'||(meta.PATH==null&&meta._seedGiven);seed=fixed?((meta.SEED>>>0)||1):((Math.random()*4294967296)>>>0);meta.pathMode=fixed?'FIXED':'RANDOM';
 const notes=[],lastIn={},openLong={};
 // 빨강 레인 점유: 레인마다 [시작,끝] 구간 목록. 노트는 착지 시각 ±LW, 롱은 누르는 동안 전체(+LW). 롱 끝은 미리 짝지어 알아둠
 {const op={};for(const e of ev){if(!e.tok||CH_TARGET[e.ch].type!=='R')continue;const tk=TOK[e.tok];if(tk.end){if(op[e.ch]){op[e.ch].endT=beatToTime(e.beat);delete op[e.ch];}}else if(tk.long)op[e.ch]=e;}}
 const occ=[[],[],[],[],[],[]],lw=b=>Math.max(.1,Math.min(.18,30/bpmAt(b))); // 창 = 현재 BPM의 8분음표 길이, 100~180ms로 제한
 const busy=(k,a,b,skip,ch)=>occ[k].some(o=>o.a<=b&&o.b>=a&&!skip.has(o.n)&&!(ch&&o.n.ch===ch)); // ch: 같은 채널의 자기 연타/트릴 귀환은 충돌 아님
 let lastR=null;const chLast={};
 for(const e of ev){if(!e.tok)continue;const tk=TOK[e.tok],g=CH_TARGET[e.ch],time=beatToTime(e.beat);
  if(tk.end){const L=openLong[e.ch];if(L){L.end=time;L.endTol=15/bpmAt(e.beat);delete openLong[e.ch];}else warn.push(`${e.li+1}행: 대응하는 L 없는 E`);continue;}
  let fall=meta.FALL*spdAt(e.beat),u0;const prev=lastIn[e.ch];
  if(tk.chain&&prev&&prev.long)warn.push(`${e.li+1}행: 롱 뒤에는 체인을 이을 수 없음(롱은 체인 끝에만)`);
  if(tk.chain&&prev&&!prev.long&&!prev.flick){u0=prev.u0;fall=prev.fall;}else u0=undefined;
  if(u0===undefined&&g.type==='G')fall=fall*(BTN_Y-SPAWN_Y)/(LINE_Y-SPAWN_Y); // 초록 세로 속도 = 빨강(어지럼 분석 #3)
  // 빨강 착지 레인 = 매 플레이 무작위(차트 레인 무시, 사용자 규칙). 체인 이음은 앞 노트와 같은 레인, 같은 시각 노트끼리는 서로 다른 레인
  let gg=g,occE=null;if(g.type==='R'){const W_=lw(e.beat),a=time-W_,b=(e.endT||time)+W_,skip=new Set();let k=null;
   const chainP=tk.chain&&prev&&!prev.long&&!prev.flick&&prev.lane!=null?prev:null;if(chainP)skip.add(chainP);
   // 트릴: 직전 빨강이 다른 채널이고, 이 채널이 1박 안에 쓰였으면 → 그 노트의 레인으로 돌아감(A-B-A-B 교대 고정)
   const spb=60/bpmAt(e.beat),cl=chLast[e.ch],trillP=!chainP&&cl&&lastR&&lastR.ch!==e.ch&&time-cl.n.time<=spb+1e-6&&cl.n.lane!==lastR.n.lane?cl.n:null;if(trillP)skip.add(trillP);
   const pref=chainP||trillP;if(pref&&!busy(pref.lane,a,b,skip,e.ch))k=pref.lane;
   if(k===null){const avoid=lastR&&lastR.ch!==e.ch&&time-lastR.n.time<=spb+1e-6?lastR.n.lane:-1; // 교대 상대와 같은 레인 금지(트릴 붕괴 방지)
    let free=[0,1,2,3,4,5].filter(q=>q!==avoid&&!busy(q,a,b,skip));if(!free.length)free=[0,1,2,3,4,5].filter(q=>!busy(q,a,b,skip));
    if(free.length)k=free[Math.floor(rnd()*free.length)];
    else{k=[0,1,2,3,4,5].sort((x,y)=>Math.max(0,...occ[x].map(o=>o.b))-Math.max(0,...occ[y].map(o=>o.b)))[0];warn.push(`레인 부족 ${time.toFixed(2)}s`);}
    if(chainP&&k!==chainP.lane){u0=undefined;fall=meta.FALL*spdAt(e.beat);}}
   occE={a,b};gg=Object.assign({},g,{k});}
  const n=makeNote(time,gg,u0,fall,tk,Math.floor(e.beat/8));if(g.type==='R'){n.lane=gg.k;n.ch=e.ch;n.lw=occE.b-(e.endT||time);occE.n=n;occ[gg.k].push(occE);lastR={ch:e.ch,n};chLast[e.ch]={n};}
  if(tk.chain&&prev&&!prev.long&&!prev.flick&&(n.type!=='R'||n.lane===prev.lane))prev.next=n; // 레인이 갈리면 체인 끊음
  lastIn[e.ch]=n;if(tk.long)openLong[e.ch]=n;}
 // 트릴: 시간차로 교대하는 빨강 체인 2개 → 서로 교차하지 않는 경로(왼쪽 레인 체인은 왼쪽에서, 오른쪽은 오른쪽에서, 반사 없음)
 //  근거: atwiki 용어집 'トリル'(時間差で来る2本のチェイン), Tips '2本のチェイン(トリル)が判定ライン直前でクロスしなくなった'
 {const isNext=new Set(notes.map(n=>n.next).filter(Boolean)),heads=notes.filter(n=>n.next&&!isNext.has(n)&&n.type==='R');
  const mem=h=>{const a=[];for(let q=h;q;q=q.next)a.push(q);return a;},done=new Set();
  for(const A of heads){if(done.has(A))continue;const ma=mem(A),t0=ma[0].time,t1=ma[ma.length-1].time;
   const B=heads.find(H=>H!==A&&!done.has(H)&&H.xh!==A.xh&&H.time>t0&&H.time<t1);if(!B)continue;
   const mb=mem(B);if(!mb.some(q=>q.time>t0&&q.time<t1))continue;
   done.add(A);done.add(B);const [Lc,Rc]=A.xh<B.xh?[ma,mb]:[mb,ma],sp=Math.max(20,Math.abs(A.xh-B.xh)/2);
   const uL=Math.max(XMIN,Lc[0].xh-sp*rnd()),uR=Math.min(XMAX,Rc[0].xh+sp*rnd());
   for(const q of Lc){q.u0=uL;q.vx=(q.xh-uL)/q.fall;q.trill=1;}for(const q of Rc){q.u0=uR;q.vx=(q.xh-uR)/q.fall;q.trill=1;}}}
 // 동시치기(빨강만/초록만): 평행 이동 — 같은 속도 벡터(같은 방향·속도), 반사 없음. 체인은 체인 전체가 같은 경로를 유지
 {const by=new Map();for(const n of notes){const k=n.time.toFixed(4);if(!by.has(k))by.set(k,[]);by.get(k).push(n);}
  const prev=new Map();for(const n of notes)if(n.next)prev.set(n.next,n);
  const chainOf=n=>{let h=n;while(prev.has(h))h=prev.get(h);const a=[];for(let q=h;q;q=q.next)a.push(q);return a;};
  // 체인이 여러 동시치기에 걸치면 모두 한 덩어리(union)로 묶어 같은 속도를 공유 — 덮어쓰기로 어긋나는 것 방지
  const par=new Map(),fd=n=>{while(par.get(n)!==n){par.set(n,par.get(par.get(n)));n=par.get(n);}return n;},un=(a,b)=>{a=fd(a);b=fd(b);if(a!==b)par.set(a,b);};
  for(const n of notes)par.set(n,n);let any=false;
  for(const g of by.values()){if(g.length<2)continue;const ty=g[0].type;if(g.some(n=>n.type!==ty))continue; // 빨강만·초록만(섞인 건 예외)
   any=true;for(const n of g){for(const q of chainOf(n))un(q,g[0]);n.chordPar=1;}}
  if(any){const comp=new Map();for(const n of notes){if(!n.chordPar)continue;const r=fd(n);if(!comp.has(r))comp.set(r,new Set());}
   for(const n of notes){const r=fd(n);if(comp.has(r))comp.get(r).add(n);}
   let runVx=null,runT=-1e9; // 연속 동시치기(0.6초 이내)는 같은 방향 유지 — 매번 무작위 방향이면 쌍끼리 지그재그로 엇갈려 보임
   const comps=[...comp.values()].map(s=>[...s]).sort((a,b)=>Math.min(...a.map(n=>n.time))-Math.min(...b.map(n=>n.time)));
   for(const g of comps){const ty=g[0].type,gt=Math.min(...g.map(n=>n.time));if(g.some(n=>n.type!==ty))continue;const X0=ty==='R'?XMIN:0,X1=ty==='R'?XMAX:W; // 빨강 동시치기는 반사 없음(반사 시점이 달라지면 평행이 깨짐) // 초록은 벽 통과 → 출발 x 0..W
    let lo=-1e9,hi=1e9;for(const n of g){lo=Math.max(lo,(n.xh-X1)/n.fall);hi=Math.min(hi,(n.xh-X0)/n.fall);}if(lo>hi)continue;
    let vx;
    if(ty==='R'){ // 빨강 평행: 평균(→수직)이 아니라 MUSE 출발 후보에서 공유 속도를 고름 — 모든 멤버가 반사 ≤1회로 정확히 자기 목표에 도착
     const ok=v=>g.every(n=>{const u=n.xh-v*n.fall;return u>=XMIN-1e-6&&u<=XMAX+1e-6;});
     const h=g[0],C=museCands().map(c=>(h.xh-c.u)/h.fall).filter(ok),sl=C.filter(v=>Math.abs(v)*h.fall>SPAN/16);
     const P=sl.length?sl:C,cont=ty==='R'&&runVx!==null&&gt-runT<.6;
     if(cont)vx=Math.max(lo,Math.min(hi,runVx)); // 연속 동시치기: 직전 방향을 허용 범위로 클램프 → 쌍마다 좌우로 뒤집히는 지그재그 방지
         else if(P.length)vx=P[Math.floor(rnd()*P.length)];else vx=(rnd()<.5?lo:hi)*.85+(lo+hi)/2*.15;}  // 후보 없으면 허용 범위 끝쪽(기울게)
    else{vx=g.reduce((s,n)=>s+n.vx,0)/g.length;vx=Math.max(lo,Math.min(hi,vx));}
    for(const q of g){q.vx=vx;q.u0=q.xh-vx*q.fall;q.par=1;}if(ty==='R'){runVx=vx;runT=Math.max(...g.map(n=>n.time));}}}}
 for(const k in openLong){openLong[k].long=false;warn.push(`${k}: 닫히지 않은 롱`);}
 function makeNote(time,g,u0,fall,tk,phrase){
  const green=g.type==='G',xh=green?BTNS[g.side].tx:RED_XS[g.k],ty=green?BTN_Y:LINE_Y;
  if(u0===null)u0=xh; else if(u0===undefined)u0=randU0(green?g.side:null,xh,fall,phrase);
  const n={time,xh,u0,fall,vx:(xh-u0)/fall,ty,vy:(ty-SPAWN_Y)/fall,type:green?'G':'R',side:green?g.side:null,
   long:!!tk.long,flick:!!tk.flick&&!green,end:0,endTol:0,state:0,lastK:null,chord:null,next:null,r:R};
  notes.push(n);return n;}
 notes.sort((a,b)=>a.time-b.time);
 // 동시치기(같은 시각 2개 이상) — 1ms 이내만. 즈레(수십 ms 차)는 테두리 없음 = 원작과 같은 "微ズレ" 구분 [G]
 for(let i=0;i<notes.length;){let j=i;while(j+1<notes.length&&Math.abs(notes[j+1].time-notes[i].time)<1e-3)j++;
  if(j>i){const grp=notes.slice(i,j+1),c=grp.some(n=>n.type==='G')?'G':'R';grp.forEach(n=>n.chord=c);}i=j+1;}
 const last=notes.reduce((m,n)=>Math.max(m,n.time,n.end||0),LEAD);
 const music=[];const lastBeat=ev.length?Math.ceil(ev[ev.length-1].beat/4)*4+4:16;
 if(String(meta.MUSIC).startsWith('MIDI:')&&window.MIDI_SONGS){const M=MIDI_SONGS[meta.MUSIC.slice(5)];if(M){ // 압축 MIDI: [dt u16, dur u16, pitch, vel, voice] × n (base64)
   const raw=atob(M.b64),n=raw.length/7|0;let tick=0;for(let i=0;i<n;i++){const o=i*7,dt=raw.charCodeAt(o)|raw.charCodeAt(o+1)<<8,du=raw.charCodeAt(o+2)|raw.charCodeAt(o+3)<<8,c=raw.charCodeAt(o+6);tick+=dt;if(c===255)continue;
    const b=tick/M.ppq,t=beatToTime(b);music.push({t,b,m:[raw.charCodeAt(o+4),raw.charCodeAt(o+5),c,beatToTime(b+du/M.ppq)-t]});}}}
 else if(meta.MUSIC==='ARTM'&&window.ARTM_ARR){for(const e of ARTM_ARR){const b=e.b+4;music.push({t:beatToTime(b),b,a:e,spb:60/bpmAt(b)});}}
 else for(let h=0;h<lastBeat*2;h++){const b=h/2;music.push({t:beatToTime(b),b});}
 const mEnd=music.length?music[music.length-1].t+1.5:0;
 return {meta,notes,warn,endTime:Math.max(last+1.5,mEnd),music,beatToTime,bpmCh,spdCh};
}
// 경로 규칙 — REFLET MUSE 0.10.3 실행 파일(CObjPositionCalculator) 분석 기반 (docs/reflec-analysis.md §25):
//  MUSE 필드: 벽 x=19..699(폭 680), 판정선 y=165(상대)/1050(자기). 라인 오브젝트 x = 19+(p+1)·680/8 (p=0..6, 7칸 격자),
//  오브젝트는 상대 판정선(화면 위)에서 출발해 자기 판정선의 자기 칸으로 직진(옆벽 반사 가능).
//  dgb 적용: 출발점 = 위쪽 7칸 격자(XMIN+SPAN·(k+1)/8) 중 무작위 — 목표와 무관(각도 상한·±1레인 규칙 없음).
//  반사: 출발점을 가까운 벽 기준으로 거울상(펼친 좌표) → 정확히 1회 반사. 확률 MUSE_BOUNCE(미복원 값, dgb 추정).
// 모든 초록(L/M/R): 중앙 한 점(x=W/2, y=SPAWN_Y)에서 출발해 버튼 중심까지 직선(사용자 규칙)
const GREEN_SPAWN={L:W/2,M:W/2,R:W/2},VX_MAX=1e9,MUSE_BOUNCE=.8; // 사용자 지정 80%
const MUSE_XS=[2,3,4].map(k=>XMIN+SPAN*(k+1)/8); // 사용자 지정: 7칸 중 가운데 3칸만
// 출발점 후보(펼친 좌표 u0): 직진 7개 + 왼벽 거울 7개 + 오른벽 거울 7개 — 모두 반사 ≤1회
function museCands(){const c=[];for(const x of MUSE_XS){c.push({u:x,b:0});c.push({u:2*XMIN-x,b:1});c.push({u:2*XMAX-x,b:1});}return c;}
function randU0(side,xh,fall,phrase){
 if(side)return GREEN_SPAWN[side];
 const x=MUSE_XS[Math.floor(rnd()*MUSE_XS.length)];
 if(rnd()<MUSE_BOUNCE)return rnd()<.5?2*XMIN-x:2*XMAX-x; // 반사 벽 = 왼/오 50:50 (펼친 좌표 → 어느 레인이든 정확히 1회 반사)
 return x;}

// ============ 랜덤 차트 생성기 → 텍스트(파서로 읽음) ============
// 패턴 어휘(용어집): 체인(縦連/연타) · 트릴 · 계단 · 데님(TOP체인+레인체인 교대) · 즈레 · 롱잡(軸) · 동시치기 · 소프란 · 플릭

