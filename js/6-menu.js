'use strict';
// ============ 메뉴 (VOLZZA 2 흐름: TITLE → MUSIC SELECT ⇄ OPTION → PLAY → RESULT → MUSIC SELECT) ============
// 메뉴 좌표는 640 설계 기준 (MOFF로 세로 중앙)
// 화면 전환: 좌우 슬라이드(ease-out 320ms). dir=1 → 새 화면이 오른쪽에서 들어옴
let trans=null,pressFx=null,menuDrag=null,menuGuard=0;
function go(to,dir){if(scene===to)return;trans={from:scene,dir:dir||1,t:performance.now()};scene=to;menuDrag=null;}
const SEG_H=48;
function segRow(r,y,items,cur,set,x0,w0){x0=x0||20;w0=w0||320;const n=items.length,gw=w0/n;items.forEach((lab,i)=>r.push({x:x0+i*gw+2,y,w:gw-4,h:SEG_H,lab,on:cur===i,act:()=>set(i)}));}
function slider(r,y,v,set,fmt,end,w=320){const L=36,S=w-32,f=x=>set(Math.max(0,Math.min(1,(x-L)/S)));r.push({x:20,y,w,h:SEG_H,slider:{v,fmt},act:f,drag:f,end});}
function rects(){const r=[];
 if(scene==='title')r.push({x:30,y:470,w:300,h:64,act:()=>{go('select');}});
 if(scene==='select'){
  FOLDERS.forEach((f,i)=>r.push({x:8+i*116,y:54,w:112,h:44,act:()=>{opt.folder=i;opt.sel=0;}}));
  r.push({x:240,y:54,w:112,h:44,act:()=>{opt.sort=(opt.sort+1)%3;}});
  {const V=visList();V.L.forEach((s,j)=>{const i=V.off+j;r.push({x:8,y:106+j*62,w:344,h:56,act:()=>{opt.sel=i;if(!playableDiff(s,opt.diff))opt.diff=songLevels(s).findIndex(v=>v!=null);}});});} // 곡 탭 = 선택만(시작은 START 버튼으로만)
  DIFFS.forEach((d,i)=>r.push({x:8+i*87,y:428,w:83,h:56,act:()=>{const s=curSong();if(s&&playableDiff(s,i))opt.diff=i;}}));
  r.push({x:8,y:496,w:108,h:52,act:()=>{go('option');}});
  r.push({x:124,y:496,w:108,h:52,act:()=>{try{fileIn.click();}catch(e){}}});
  r.push({x:240,y:496,w:112,h:52,act:()=>start(),main:1});
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
  r.push({head:'중앙 표시',sub:'',y:354});
  segRow(r,364,['SCORE','COMBO'],opt.disp==='SCORE'?0:1,i=>{opt.disp=i?'COMBO':'SCORE';},20,156);
  r.push({head:'자동 플레이',sub:'',y:354,x:184});
  segRow(r,364,['OFF','ON'],opt.auto?1:0,i=>{opt.auto=!!i;},184,156);
  r.push({head:'판정 오프셋',sub:'',y:430});
  slider(r,440,(opt.offset+50)/100,v=>{opt.offset=Math.round(v*20)*5-50;},v=>(opt.offset>0?'+':'')+opt.offset+'ms');
  r.push({x:20,y:500,w:320,h:44,lab:'차트 파일 불러오기…',act:()=>{try{fileIn.click();}catch(e){}}});
  r.push({x:20,y:556,w:320,h:52,act:()=>{go('select',-1);},main:1});}
 if(scene==='result')r.push({x:30,y:560,w:300,h:52,act:()=>{go('select');},main:1});
 return r;}
function menuTap(x,y){if(trans||performance.now()<menuGuard)return;if(scene==='title'){go('select');return;}
 for(const b of rects()){if(b.act&&x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h){pressFx={x:b.x,y:b.y,w:b.w,h:b.h,t:performance.now()};b.act(x,y);if(b.drag)menuDrag=b;return;}}}
function menuMove(x){if(menuDrag&&scene==='option')menuDrag.drag(x);}
function menuUp(){if(menuDrag){const d=menuDrag;menuDrag=null;if(d.end)d.end();}}
function menuKey(k){if(scene==='title'){if(k==='ok')go('select');return;}
 if(scene==='result'){if(k==='ok'||k==='back')go('select');return;}
 if(scene==='option'){if(k==='back'||k==='ok')go('select',-1);return;}
 if(scene==='select'){const L=folderSongs();
  if(k==='up')opt.sel=(opt.sel+L.length-1)%L.length;if(k==='down')opt.sel=(opt.sel+1)%L.length;
  if(k==='left'||k==='right'){const s=curSong();for(let i=1;i<=4;i++){const d=(opt.diff+(k==='right'?i:4-i))%4;if(s&&playableDiff(s,d)){opt.diff=d;break;}}}
  if(k==='back')go('title',-1);}} // Enter로 시작하지 않음(START 버튼만)

