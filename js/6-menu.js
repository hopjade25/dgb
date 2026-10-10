'use strict';
// ============ 메뉴 (VOLZZA 2 흐름: TITLE → MUSIC SELECT ⇄ OPTION → PLAY → RESULT → MUSIC SELECT) ============
// 메뉴 좌표는 640 설계 기준 (MOFF로 세로 중앙)
function rects(){const r=[];
 if(scene==='title')r.push({x:30,y:470,w:300,h:64,act:()=>{scene='select';}});
 if(scene==='select'){
  FOLDERS.forEach((f,i)=>r.push({x:8+i*344/FOLDERS.length,y:58,w:344/FOLDERS.length-4,h:30,act:()=>{opt.folder=i;opt.sel=0;}}));
  r.push({x:250,y:96,w:102,h:24,act:()=>{opt.sort=(opt.sort+1)%3;}});
  {const V=visList();V.L.forEach((s,j)=>{const i=V.off+j;r.push({x:8,y:128+j*62,w:344,h:56,act:()=>{if(opt.sel===i&&playableDiff(s,opt.diff))start();else{opt.sel=i;if(!playableDiff(s,opt.diff))opt.diff=songLevels(s).findIndex(v=>v!=null);}}});});}
  DIFFS.forEach((d,i)=>r.push({x:8+i*87,y:440,w:83,h:56,act:()=>{const s=curSong();if(s&&playableDiff(s,i))opt.diff=i;}}));
  r.push({x:8,y:512,w:108,h:44,act:()=>{scene='option';}});
  r.push({x:124,y:512,w:108,h:44,act:()=>{try{fileIn.click();}catch(e){}}});
  r.push({x:240,y:512,w:112,h:44,act:()=>start(),main:1});
  r.push({x:8,y:572,w:344,h:40,act:()=>{scene='title';}});}
 if(scene==='option'){OPTS.forEach((o,i)=>r.push({x:20,y:70+i*68,w:320,h:58,act:o.act}));r.push({x:20,y:500,w:320,h:52,act:()=>{scene='select';},main:1});}
 if(scene==='result')r.push({x:30,y:560,w:300,h:52,act:()=>{scene='select';},main:1});
 return r;}
const OPTS=[
 {label:()=>`타격음  ${HITS[opt.hit][0]}`,sub:()=>'탭할 때마다 변경 · 미리듣기 · 성공 판정마다 재생',act:()=>{opt.hit=(opt.hit+1)%HITS.length;saveOpt();initAudio();hitSound(true);}},
 {label:()=>`오브젝트 크기  ${['기본','스몰','원작 비율'][opt.size]} (${SIZES[opt.size]}px)`,sub:()=>'노트 지름=밴드 두께 유지 · 판정 영역은 56 고정',act:()=>{opt.size=(opt.size+1)%SIZES.length;}},
 {label:()=>`중앙 표시  ${opt.disp}`,sub:()=>'SCORE / COMBO 전환 (VOLZZA 2)',act:()=>{opt.disp=opt.disp==='SCORE'?'COMBO':'SCORE';}},
 {label:()=>`판정 오프셋  ${opt.offset>0?'+':''}${opt.offset}ms`,sub:()=>'🛠 dgb 자체 (원작엔 없음) · 탭할수록 +10, +50 다음 −50',act:()=>{opt.offset=opt.offset>=50?-50:opt.offset+10;}},
 {label:()=>`자동 플레이  ${opt.auto?'ON':'OFF'}`,sub:()=>'데모 확인용',act:()=>{opt.auto=!opt.auto;}},
 {label:()=>'차트 파일 불러오기…',sub:()=>loadMsg||'.txt / .dgb (docs/chart-format.md)',act:()=>{try{fileIn.click();}catch(e){}}}];
function menuTap(x,y){if(scene==='title'){scene='select';return;}
 for(const b of rects()){if(x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h){b.act();return;}}}
function menuKey(k){if(scene==='title'){if(k==='ok')scene='select';return;}
 if(scene==='result'){if(k==='ok'||k==='back')scene='select';return;}
 if(scene==='option'){if(k==='back'||k==='ok')scene='select';return;}
 if(scene==='select'){const L=folderSongs();
  if(k==='up')opt.sel=(opt.sel+L.length-1)%L.length;if(k==='down')opt.sel=(opt.sel+1)%L.length;
  if(k==='left'||k==='right'){const s=curSong();for(let i=1;i<=4;i++){const d=(opt.diff+(k==='right'?i:4-i))%4;if(s&&playableDiff(s,d)){opt.diff=d;break;}}}
  if(k==='ok')start();if(k==='back')scene='title';}}

