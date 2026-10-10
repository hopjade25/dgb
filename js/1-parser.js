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
 for(const e of ev){if(!e.tok)continue;const tk=TOK[e.tok],g=CH_TARGET[e.ch],time=beatToTime(e.beat);
  if(tk.end){const L=openLong[e.ch];if(L){L.end=time;L.endTol=15/bpmAt(e.beat);delete openLong[e.ch];}else warn.push(`${e.li+1}행: 대응하는 L 없는 E`);continue;}
  let fall=meta.FALL*spdAt(e.beat),u0;const prev=lastIn[e.ch];
  if(tk.chain&&prev&&prev.long)warn.push(`${e.li+1}행: 롱 뒤에는 체인을 이을 수 없음(롱은 체인 끝에만)`);
  if(tk.chain&&prev&&!prev.long&&!prev.flick){u0=prev.u0;fall=prev.fall;}else u0=undefined;
  if(u0===undefined&&g.type==='G')fall=fall*(BTN_Y-SPAWN_Y)/(LINE_Y-SPAWN_Y); // 초록 세로 속도 = 빨강(어지럼 분석 #3)
  const n=makeNote(time,g,u0,fall,tk,Math.floor(e.beat/8));
  if(tk.chain&&prev&&!prev.long&&!prev.flick)prev.next=n;
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
// 경로 규칙(어지럼 분석 반영, docs/reflec-analysis.md §23):
//  초록 = 고정 출발점(원작 TOP처럼) / 빨강 = 목표 ±1레인 안에서 출발, 가로 속도 ≤170px/s(≈19°),
//  2마디 프레이즈마다 방향(왼쪽·직하·오른쪽) 하나를 공유, 반사는 13%(체인 공유 포함 실측 ~15–20%) · 상단 절반에서만 · 판정 0.5초 전까지
const GREEN_SPAWN={L:W/2,M:W/2,R:W/2} // 모든 초록: 중앙 한 점(x=W/2, y=SPAWN_Y)에서 출발,VX_MAX=170,BOUNCE_P=.13;
const phraseDir=p=>{let h=Math.imul(p+7,2654435761)>>>0;h^=h>>>13;return (h%3)-1;};
function randU0(side,xh,fall,phrase){
 if(side)return GREEN_SPAWN[side];
 const cap=Math.min(60,VX_MAX*fall),d=phraseDir(phrase||0);
 if(rnd()<BOUNCE_P){const wallL=xh<W/2,dist=wallL?xh-XMIN:XMAX-xh;   // 가까운 벽으로 1회 반사
  const room=Math.min(dist,VX_MAX*fall-dist,(fall-.5)/fall*(dist+60)); // 상단 절반 접힘·마지막 0.5초 반사 금지·속도 상한
  if(room>8){const dd=8+rnd()*(room-8),s=dd/(dist+dd);if(s<.5&&(1-s)*fall>=.5)return wallL?XMIN-dd:XMAX+dd;}}
 let xs=xh-d*(cap*.5+rnd()*cap*.5);if(d===0)xs=xh+(rnd()*2-1)*cap*.25;
 return Math.max(XMIN,Math.min(XMAX,xs));}

// ============ 랜덤 차트 생성기 → 텍스트(파서로 읽음) ============
// 패턴 어휘(용어집): 체인(縦連/연타) · 트릴 · 계단 · 데님(TOP체인+레인체인 교대) · 즈레 · 롱잡(軸) · 동시치기 · 소프란 · 플릭

