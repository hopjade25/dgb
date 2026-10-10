'use strict';
// ============ 입력 ============
const ptrs=new Map();let lastIn=0,lastZone={},shiftDown=false;
function toLogical(cx,cy){try{const r=cv.getBoundingClientRect();return [(cx-r.left)/r.width*W,(cy-r.top)/r.height*H];}catch(_){return [null,null];}}
function held(z){if(autoplay)return true;for(const p of ptrs.values())if(p.zone===z)return true;return false;}
const MOFF=()=>(H-640)/2; // 메뉴는 640 설계 좌표를 세로 중앙 정렬
function input(e,cx,cy,compat,pid){const tn=performance.now();if(e.cancelable)e.preventDefault();initAudio();
 const [x,y]=toLogical(cx,cy);const zone=scene==='play'?zoneAt(x,y):'any';
 if(pid!=null&&scene==='play')ptrs.set(pid,{zone,x0:x,y0:y,t0:tn});
 if(compat){if(tn-lastIn<600)return;}else if(tn-(lastZone[zone]||0)<40)return;
 lastIn=tn;lastZone[zone]=tn;
 try{if(scene==='play'){if(pauseTap(x,y))return;if(zone)onPlayTap(x,y,zone,pid,false);}else menuTap(x,y-MOFF());}
 catch(err){console.error(err);}}
function moveP(pid,cx,cy){const p=ptrs.get(pid);const [x,y]=toLogical(cx,cy);
 if(p)p.zone=zoneAt(x,y)||(p.zone==='C'&&Math.abs(y-LINE_Y)<BAND?'C':null);
 const f=pendF.get(pid);if(!f)return;
 if(performance.now()-f.w>FLICK_MS||f.n.state){f.n.flickPending=false;pendF.delete(pid);return;}
 if(Math.hypot(x-f.x0,y-f.y0)>=FLICK_MIN){pendF.delete(pid);f.n.flickPending=false;f.n.flickDir=Math.atan2(y-f.y0,x-f.x0);judgeHit(f.n,f.tDown);}}
function upP(pid){ptrs.delete(pid);const f=pendF.get(pid);if(f){f.n.flickPending=false;pendF.delete(pid);}}
const evo={passive:false};
if(window.PointerEvent){document.addEventListener('pointerdown',e=>input(e,e.clientX,e.clientY,0,'p'+e.pointerId),evo);
 document.addEventListener('pointermove',e=>moveP('p'+e.pointerId,e.clientX,e.clientY),evo);
 ['pointerup','pointercancel'].forEach(n=>document.addEventListener(n,e=>upP('p'+e.pointerId),evo));}
document.addEventListener('touchstart',e=>{for(const t of e.changedTouches)input(e,t.clientX,t.clientY,0,window.PointerEvent?null:'t'+t.identifier);},evo);
document.addEventListener('touchmove',e=>{if(e.cancelable)e.preventDefault();if(!window.PointerEvent)for(const t of e.changedTouches)moveP('t'+t.identifier,t.clientX,t.clientY);},evo);
if(!window.PointerEvent)['touchend','touchcancel'].forEach(n=>document.addEventListener(n,e=>{for(const t of e.changedTouches)upP('t'+t.identifier);},evo));
document.addEventListener('touchend',()=>initAudio(),evo);
document.addEventListener('mousedown',e=>input(e,e.clientX,e.clientY,1));
document.addEventListener('click',e=>input(e,e.clientX,e.clientY,1));
// 키보드: F/← 왼쪽 · G/↓ 가운데 · J/→ 오른쪽 · Space 빨강(가장 가까운 레인) · Shift+Space 플릭
const KEYS={Space:'C',KeyF:'L',ArrowLeft:'L',KeyJ:'R',ArrowRight:'R',KeyG:'M',ArrowDown:'M'};
addEventListener('keydown',e=>{if(e.key==='Shift')shiftDown=true;if(scene==='play'&&(e.key==='Escape'||e.key==='p'||e.key==='P')){if(paused)resumeGame();else pauseGame();e.preventDefault();return;}if(paused&&scene==='play'){if(e.key==='Enter')resumeGame();return;}
 if(scene!=='play'){const k={Enter:'ok',Space:'ok',ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Escape:'back',Backspace:'back'}[e.code];if(k){e.preventDefault();if(!e.repeat){initAudio();menuKey(k);}}return;}
 const z=KEYS[e.code];if(!z)return;e.preventDefault();if(e.repeat)return;initAudio();
 try{ptrs.set('k'+e.code,{zone:z});onPlayTap(z==='C'?null:BTNS[z].x,null,z,'k'+e.code,shiftDown);}catch(err){console.error(err);}});
addEventListener('keyup',e=>{if(e.key==='Shift')shiftDown=false;ptrs.delete('k'+e.code);});
const fileIn=document.getElementById('f');
fileIn.addEventListener('change',()=>{const f=fileIn.files&&fileIn.files[0];if(!f)return;const rd=new FileReader();
 rd.onload=()=>{try{const text=String(rd.result),s=parseChart(text);if(!s.notes.length)throw new Error('노트 없음');
  const di=Math.max(0,DIFFS.indexOf(String(s.meta.DIFF).toUpperCase()));
  SONGS.push({id:'u'+SONGS.length,title:s.meta.TITLE,artist:s.meta.ARTIST||'user',bpm:s.meta.BPM,custom:1,text,diffName:DIFFS[di],level:+s.meta.LEVEL||'?',folder:'USER'});
  opt.folder=3;opt.sel=folderSongs().length-1;opt.diff=di;
  loadMsg=`불러옴: ${s.meta.TITLE} (${s.notes.length}개${s.warn.length?', 경고 '+s.warn.length:''})`;}catch(e){loadMsg='불러오기 실패: '+e.message;}};rd.readAsText(f);fileIn.value='';});

