'use strict';
// ============ 게임 상태 ============
let DS=56;let scene='title',song=null,notes=[],fx=[],me,judgeText=[],lineFlash=0,result=null,autoplay=false;
function newSide(){return {score:0,combo:0,maxCombo:0,flick:0,flickN:0,cnt:{just:0,great:0,good:0,miss:0}};}
function start(noAudio){stopPreview();pvHold=true;if(!noAudio)initAudio();const s=curSong();if(!s)return;
 if(!playableDiff(s,opt.diff)){opt.diff=songLevels(s).findIndex(v=>v!=null);}
 if(!s.text&&!CHARTS[s.id+'-'+DIFFS[opt.diff]]){loadMsg='불러오는 중…';loadSong(s,opt.diff).then(()=>{loadMsg='';start(true);},e=>{loadMsg='불러오기 실패: '+e.message;});return;}
 start2();}
function start2(){const s=curSong();if(!s)return;
 if(!playableDiff(s,opt.diff)){opt.diff=songLevels(s).findIndex(v=>v!=null);}
 try{song=parseChart(chartTextFor(s,opt.diff));}catch(e){console.error(e);loadMsg='차트 오류: '+e.message;return;}
 if(!song.notes.length){loadMsg='노트가 없는 차트';return;}
 song.src=s;notes=song.notes;DS=SIZES[opt.size];for(const n of notes){n.r=DS/2;if(n.type==='G'&&n.side!=='M'){n.xh=n.side==='L'?0:W;n.vx=(n.xh-n.u0)/n.fall;}}fx=[];me=newSide();me.flickN=notes.filter(n=>n.flick).length;judgeText=[];pendF.clear();autoplay=DEMO||opt.auto;
 perf0=performance.now()/1000;audioOK=false;lastAcT=-1;acOff=0;t0=ac?ac.currentTime:0;schedI=0;scene='play';}
const JUD={just:['JUST','#7ff'],great:['GREAT','#7f7'],good:['GOOD','#fd6'],miss:['MISS','#f55']};
function kindOf(off){const d=Math.abs(off);return d<=WIN.just?'just':d<=WIN.great?'great':'good';}
function finalize(n,kind,pts){n.state=1;if(kind==='miss')n.missed=true;const s=me;s.cnt[kind]++;
 s.score+=pts??PTS[kind];
 if(kind==='miss'){s.combo=0;}
 else{s.combo++;s.maxCombo=Math.max(s.maxCombo,s.combo);if(n.flick)s.flick++;
  const x=n.type==='G'?BTNS[n.side].x:n.xh;fx.push({type:'ring',x,y:n.ty,t:performance.now(),c:JUD[kind][1],r:n.r});
  if(n.flick){for(let i=0;i<10;i++)fx.push({type:'spark',x,y:n.ty,a:-Math.PI/2+(i-4.5)*.22,t:performance.now()});}
  lineFlash=.5;}
 {const g=n.type==='G',jx=g?(n.side==='L'?36:n.side==='R'?W-36:W/2):Math.max(30,Math.min(W-30,n.xh)),jy=g?BTN_Y-BR-10:LINE_Y-BAND/2-10;  // 판정 표시: 노트/버튼 위치
  judgeText=judgeText.filter(j=>Math.abs(j.x-jx)>1||j.y!==jy);judgeText.push({s:JUD[kind][0],c:JUD[kind][1],t:performance.now(),x:jx,y:jy});}}
function judgeHit(n,t){const off=t-n.time,kind=kindOf(off);n.off=off;if(kind!=='miss')hitSound(kind);
 if(n.long){n.holding=true;n.headKind=kind;n.lastHeld=t;n.hz=n.type==='G'?n.side:'C';fx.push({type:'ring',x:n.type==='G'?BTNS[n.side].x:n.xh,y:n.ty,t:performance.now(),c:JUD[kind][1],r:n.r});return;}
 finalize(n,kind);}
function zoneAt(x,y){if(x==null)return 'C';
 if(Math.abs(y-LINE_Y)<=BAND_HIT)return 'C';                     // 빨강 밴드 터치: LINE_Y±37.5 (높이 75) — 겹치면 밴드 우선
 if(y<LINE_Y-BAND_HIT){if(Math.hypot(x-W/2,y-BTN_Y)<=BTN_HIT)return 'M';if(Math.hypot(x,y-BTN_Y)<=BTN_HIT)return 'L';if(Math.hypot(x-W,y-BTN_Y)<=BTN_HIT)return 'R';} // 초록 3버튼 반경 75
 return null;}
const press={L:0,M:0,R:0,C:0};
const pendF=new Map(); // pid -> {n,tDown,x0,y0,w}
// 터치다운: 가장 타이밍이 가까운 후보를 고름. 후보가 플릭이면 "플릭 대기"(이동해야 판정, 탭만으로는 안 맞음)
function onPlayTap(px,py,zone,pid,flickNow){press[zone]=performance.now();if(autoplay)return;
 const t=now()-opt.offset/1000;let best=null,bs=1e9;
 for(const n of notes){if(n.state||n.holding||n.flickPending)continue;const d=Math.abs(n.time-t);if(d>WIN.good)continue;
  if(zone==='C'?n.type!=='R':(n.type!=='G'||n.side!==zone))continue;
  const p=notePos(n,t),dx=px==null||zone!=='C'?0:Math.abs(p.x-px),s=d+(dx>110?1:dx/2000);if(s<bs){bs=s;best=n;}}
 if(!best){if(zone==='C')fx.push({type:'tap',x:px??W/2,y:LINE_Y,t:performance.now()});return;}
 if(best.flick&&!flickNow){if(pid!=null){best.flickPending=true;pendF.set(pid,{n:best,tDown:t,x0:px,y0:py,w:performance.now()});}return;}
 judgeHit(best,t);}
function notePos(n,t,dtOverride){const dt=dtOverride??(n.time-t),y=n.ty-n.vy*dt;
 if(n.type==='G')return {x:n.xh-n.vx*dt,y,k:0}; // 초록: 항상 직선(반사 없음), 놓치면 같은 방향으로 화면 밖
 const f=fold(n.xh-n.vx*dt);return {x:f.x,y,k:f.k};}

