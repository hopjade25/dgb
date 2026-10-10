'use strict';
// ============ 메뉴 (VOLZZA 2 흐름: TITLE → MUSIC SELECT ⇄ OPTION → PLAY → RESULT → MUSIC SELECT) ============
// 메뉴 좌표는 640 설계 기준 (MOFF로 세로 중앙)
// 화면 전환: 좌우 슬라이드(ease-out 320ms). dir=1 → 새 화면이 오른쪽에서 들어옴
let trans=null,pressFx=null,menuDrag=null,menuGuard=0;
function go(to,dir){if(scene===to)return;trans={from:scene,dir:dir||1,t:performance.now()};scene=to;menuDrag=null;}
const SEG_H=48;
// 곡 목록: 세로 스크롤 카드(드래그·관성). 탭(이동 8px 미만) = 선택+미리듣기, 시작은 START만
const LIST_Y=56,LIST_H=362,CARD_H=64,CARD_G=8,CARD_P=CARD_H+CARD_G;let listOff=0,listVel=0,listDrag=null,listT=0;
function listMax(){return Math.max(0,folderSongs().length*CARD_P-CARD_G-LIST_H);}
function listShow(i){const y=i*CARD_P;if(y<listOff)listOff=y;else if(y+CARD_H>listOff+LIST_H)listOff=y+CARD_H-LIST_H;listVel=0;}
function listTick(){const t=performance.now(),dt=Math.min(50,t-(listT||t));listT=t;if(listDrag)return;const M=listMax();
 if(Math.abs(listVel)>.005){listOff+=listVel*dt;listVel*=Math.pow(.994,dt);}else listVel=0;
 if(listOff<0){listOff+=(0-listOff)*Math.min(1,dt*.02);listVel=listOff<-1?listVel*.5:0;if(listOff>-.5)listOff=0;}
 if(listOff>M){listOff+=(M-listOff)*Math.min(1,dt*.02);listVel=listOff>M+1?listVel*.5:0;if(listOff<M+.5)listOff=M;}}
function selSong(i){const L=folderSongs(),s=L[i];if(!s)return;opt.sel=i;if(!playableDiff(s,opt.diff))opt.diff=songLevels(s).findIndex(v=>v!=null);}
function segRow(r,y,items,cur,set,x0,w0){x0=x0||20;w0=w0||320;const n=items.length,gw=w0/n;items.forEach((lab,i)=>r.push({x:x0+i*gw+2,y,w:gw-4,h:SEG_H,lab,on:cur===i,act:()=>set(i)}));}
function slider(r,y,v,set,fmt,end,w=320){const L=36,S=w-32,f=x=>set(Math.max(0,Math.min(1,(x-L)/S)));r.push({x:20,y,w,h:SEG_H,slider:{v,fmt},act:f,drag:f,end});}
function rects(){const r=[];
 if(scene==='title')r.push({x:30,y:470,w:300,h:64,act:()=>{go('select');}});
 if(scene==='select'){
  opt.folder=0;opt.sort=0; // 상단 폴더 탭(전체/불러온 곡)·정렬 버튼 제거 → 항상 전체·기본순
  r.push({x:8,y:LIST_Y,w:344,h:LIST_H,list:1,act:(x,y)=>{pressFx=null;listVel=0;const t=performance.now();listDrag={y0:y,off0:listOff,moved:false,ly:y,lt:t,v:0};}});
  DIFFS.forEach((d,i)=>r.push({x:8+i*87,y:428,w:83,h:56,act:()=>{const s=curSong();if(s&&playableDiff(s,i))opt.diff=i;}}));
  r.push({x:8,y:496,w:168,h:52,act:()=>{go('option');}});
  r.push({x:184,y:496,w:168,h:52,act:()=>start(),main:1});
  r.push({x:8,y:560,w:344,h:44,act:()=>{go('title',-1);}});}
 if(scene==='option'){
  r.push({head:'타격음',sub:'탭하면 미리듣기 · 성공 판정마다 재생',y:62});
  const setHit=i=>{opt.hit=i;saveOpt();initAudio();const p=HITS[i][0]==='MUSE'?museLoad():null;if(p)p.then(()=>hitSound('just'));else hitSound('just');};
  segRow(r,78,HITS.slice(0,4).map(h=>h[0]),opt.hit,setHit);
  segRow(r,130,HITS.slice(4).map(h=>h[0]),opt.hit-4,i=>setHit(i+4),20,320);
  r.push({head:'타격음 볼륨',sub:'',y:196});
  let lastP=0;slider(r,206,opt.hv,v=>{setHitVol(v);initAudio();const t=performance.now();if(t-lastP>140){lastP=t;hitSound('just');}},v=>Math.round(v*100)+'%',()=>{saveOpt();hitSound('just');});
  r.push({head:'노트 크기',sub:'',y:272});
  {const i=ND_STEPS.indexOf(opt.nd),n=ND_STEPS.length-1;slider(r,288,(i<0?n:i)/n,v=>{opt.nd=ND_STEPS[Math.round(v*n)];},()=>(ND_STEPS.indexOf(opt.nd)+1)+' / 5 단계',()=>saveOpt(),208);r[r.length-1].slider.steps=n;r.push({sample:1,y:288});} // 오른쪽 = 실제 크기 샘플 노트(빨강·초록)
  r.push({head:'자동 플레이',sub:'',y:354});
  segRow(r,364,['OFF','ON'],opt.auto?1:0,i=>{opt.auto=!!i;});
  r.push({x:20,y:556,w:320,h:52,act:()=>{go('select',-1);},main:1});}
 if(scene==='result')r.push({x:30,y:560,w:300,h:52,act:()=>{go('select');},main:1});
 return r;}
function menuTap(x,y){if(trans||performance.now()<menuGuard)return;if(scene==='title'){go('select');return;}
 for(const b of rects()){if(b.act&&x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h){pressFx={x:b.x,y:b.y,w:b.w,h:b.h,t:performance.now()};b.act(x,y);if(b.drag)menuDrag=b;return;}}}
function menuMove(x,y){if(listDrag&&scene==='select'&&y!=null){const d=listDrag,t=performance.now();if(Math.abs(y-d.y0)>8)d.moved=true;
  if(d.moved){let o=d.off0-(y-d.y0);const M=listMax();if(o<0)o*=.4;else if(o>M)o=M+(o-M)*.4;listOff=o;const dt=t-d.lt;if(dt>0){d.v=.6*d.v+.4*(-(y-d.ly)/dt);d.ly=y;d.lt=t;}}return;}
 if(menuDrag&&scene==='option')menuDrag.drag(x);}
function menuUp(){if(listDrag){const d=listDrag;listDrag=null;
  if(!d.moved){const i=Math.floor((d.y0-LIST_Y+listOff)/CARD_P),yy=d.y0-LIST_Y+listOff-i*CARD_P;if(yy<=CARD_H&&i>=0&&i<folderSongs().length){selSong(i);pressFx={x:8,y:LIST_Y+i*CARD_P-listOff,w:344,h:CARD_H,t:performance.now()};}}
  else listVel=performance.now()-d.lt<80?Math.max(-4,Math.min(4,d.v)):0;listT=performance.now();}
 if(menuDrag){const d=menuDrag;menuDrag=null;if(d.end)d.end();}}
function menuKey(k){if(scene==='title'){if(k==='ok')go('select');return;}
 if(scene==='result'){if(k==='ok'||k==='back')go('select');return;}
 if(scene==='option'){if(k==='back'||k==='ok')go('select',-1);return;}
 if(scene==='select'){const L=folderSongs();
  if(k==='up'){selSong((opt.sel+L.length-1)%L.length);listShow(opt.sel);}if(k==='down'){selSong((opt.sel+1)%L.length);listShow(opt.sel);}
  if(k==='left'||k==='right'){const s=curSong();for(let i=1;i<=4;i++){const d=(opt.diff+(k==='right'?i:4-i))%4;if(s&&playableDiff(s,d)){opt.diff=d;break;}}}
  if(k==='back')go('title',-1);}} // Enter로 시작하지 않음(START 버튼만)

