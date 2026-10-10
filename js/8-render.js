'use strict';
// ============ 렌더 ============
function txt(s,x,y,font,col,al){ctx.font=font;ctx.fillStyle=col;ctx.textAlign=al||'center';ctx.fillText(s,x,y);}
function box(x,y,w,h,fill,stroke,lw){ctx.fillStyle=fill;ctx.fillRect(x,y,w,h);if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw||1.5;ctx.strokeRect(x+.5,y+.5,w-1,h-1);}}
function chevron(x,y,s,up){ctx.beginPath();ctx.moveTo(x-s,y+(up?s*.5:-s*.5));ctx.lineTo(x,y+(up?-s*.5:s*.5));ctx.lineTo(x+s,y+(up?s*.5:-s*.5));ctx.stroke();}
// 노트 스프라이트: 사용자가 보낸 REFLEC BEAT 스크린샷에서 잘라낸 이미지(data/img/notes, docs/assets-credits.md)
const NOTE_IMG={};for(const k of ['red','gold','green']){const im=new Image();im.decoding='async';im.src='data/img/notes/'+k+'.png';NOTE_IMG[k]=im;}
const GREEN_ARROW0=102*Math.PI/180; // green.png 안의 화살표가 가리키는 각도(이미지 좌표, 실측)
function drawNoteBody(n,x,y,alpha){ctx.globalAlpha=alpha;const r=n.r,im=NOTE_IMG[n.type==='G'?'green':((n.gold||n.flick)?'gold':'red')];
 if(im&&im.complete&&im.naturalWidth){const sz=r*2;
  if(n.type==='G'){ // 화살표는 항상 자기 버튼 쪽(지나친 뒤엔 마지막 방향 유지 = 진행 방향)
   let a=n.time-now()>=0?Math.atan2(n.ty-y,n.xh-x):Math.atan2(n.vy,n.vx);if(!isFinite(a))a=Math.PI/2;
   ctx.save();ctx.translate(x,y);ctx.rotate(a-GREEN_ARROW0);ctx.drawImage(im,-r,-r,sz,sz);ctx.restore();}
  else ctx.drawImage(im,x-r,y-r,sz,sz);}
 else{ctx.fillStyle=n.type==='G'?'#2c4':'#e23';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();}
 if(n.chord){ctx.strokeStyle=n.chord==='R'?'#7a0010':'#3f6'; /* 초록 포함 동시치기 = 모든 멤버 같은 초록 링(색·굵기·반지름 동일, 스프라이트 종류 무관) */ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,r+1.5,0,7);ctx.stroke();} // 동시치기: 스프라이트 바깥 얇은 색 링(광채 없음)
 ctx.lineCap='round';ctx.lineJoin='round';
 // 플릭: 금색 JR 스프라이트로 구분(겉모양만 변경, 화살표 덧그림 없음)
 ctx.globalAlpha=1;}
function draw(){const T=performance.now();ctx.setTransform(scale*dpr,0,0,scale*dpr,0,0);ctx.textBaseline='middle';
 ctx.fillStyle=scene==='play'?'#05050a':'#0b0718';ctx.fillRect(0,0,W,H);
 if(scene!=='play'){drawMenuT(T);return;}
 const t=now(),GY=(BTN_Y+BR+LINE_Y-BAND/2)/2;
 // 배경: 중앙 큰 반투명 점수/콤보 (VOLZZA: 점수가 화면 중앙, 노트 뒤)
 const big=opt.disp==='SCORE'?me.score:me.combo;
 txt(String(big),W/2,H*.40,'bold 72px sans-serif','rgba(255,90,170,.09)');txt(opt.disp==='SCORE'?'YOUR SCORE':'COMBO',W/2,H*.40-48,'bold 11px sans-serif','rgba(255,90,170,.22)');
 ctx.fillStyle='rgba(120,220,255,.55)';ctx.fillRect(0,0,2,H);ctx.fillRect(W-2,0,2,H);
 const pc=Math.max(0,1-(T-press.C)/150);
 const BD=BR;ctx.fillStyle=`rgba(255,60,80,${.07+.22*pc})`;ctx.fillRect(0,LINE_Y-BD,W,BAND); // 밴드·버튼은 오브젝트 크기 옵션과 무관(고정 56)
 ctx.strokeStyle='rgba(255,150,180,.95)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,LINE_Y-BD);ctx.lineTo(W,LINE_Y-BD);ctx.moveTo(0,LINE_Y+BD);ctx.lineTo(W,LINE_Y+BD);ctx.stroke();
 ctx.strokeStyle=`rgba(255,${120+120*lineFlash},${200+55*lineFlash},.9)`;ctx.lineWidth=2+1.5*lineFlash;ctx.beginPath();ctx.moveTo(0,LINE_Y);ctx.lineTo(W,LINE_Y);ctx.stroke();lineFlash*=.85;
 for(const side of ['L','M','R']){const cx=BTNS[side].x,a0=0,a1=Math.PI*2;const pb=Math.max(0,1-(T-press[side])/150);
  ctx.fillStyle=pb>0?`rgba(80,255,130,${.25+.6*pb})`:'#0c2414';ctx.beginPath();ctx.arc(cx,BTN_Y,BD*(1+.08*pb),a0,a1);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#5f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,BTN_Y,BD-1.5,a0,a1);ctx.stroke();
  const mx=side==='L'?BR*.45:side==='R'?W-BR*.45:cx;ctx.fillStyle='rgba(120,255,160,.7)';ctx.beginPath();ctx.moveTo(mx-6,BTN_Y-4);ctx.lineTo(mx+6,BTN_Y-4);ctx.lineTo(mx,BTN_Y+5);ctx.closePath();ctx.fill();}  // TOP ▼ 마크(원작 TOP 표식)
 // CLEAR GAUGE (VOLZZA): 누적 AR, 70% 클리어 존, 판정 카운트
 const N=notes.length||1,cur=points(me)/(3*N+2*(me.flickN||0)),gx=40,gw=W-80;
 box(gx,GY-3,gw,5,'rgba(40,30,60,.6)');ctx.fillStyle='rgba(230,220,90,.25)';ctx.fillRect(gx+gw*.7,GY-3,gw*.3,5);
 ctx.fillStyle=cur>=.7?'rgba(238,238,85,.8)':'rgba(170,102,255,.8)';ctx.fillRect(gx,GY-3,gw*Math.min(1,cur),5);
 txt(`${(Math.floor(cur*1000)/10).toFixed(1)}%`,gx+gw+4,GY,'bold 10px sans-serif',cur>=.7?'#ee5':'#aab','left');txt('CLEAR',gx-4,GY,'bold 8px sans-serif','#778','right');
 ctx.lineCap='round';
 for(const n of notes){if(!n.next||n.state||t<n.time-n.fall)continue;const m=n.next;if(t<m.time-m.fall)continue;
  const a=notePos(n,t),c=notePos(m,t);ctx.strokeStyle=n.type==='G'?'rgba(60,220,100,.45)':'rgba(255,90,100,.45)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(c.x,c.y);ctx.stroke();}
 for(const n of notes){if(!n.long||n.state||t<n.time-n.fall)continue;const d0=Math.max(0,n.time-t),d1=Math.min(n.fall,n.end-t);if(d1<=d0)continue;
  ctx.strokeStyle='rgba(255,170,185,.45)';ctx.lineWidth=n.r*2;ctx.beginPath();for(let i=0;i<=16;i++){const p=notePos(n,t,d0+(d1-d0)*i/16);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();ctx.strokeStyle='rgba(120,10,25,.35)';ctx.lineWidth=n.r*2-5;ctx.beginPath();   // 롱: 오브젝트를 반으로 잘라 늘인 캡슐, 자기 색 반투명 (VOLZZA 영상 EY_470; 노란 띠는 슬라이드 오브젝트였음)
  for(let i=0;i<=16;i++){const p=notePos(n,t,d0+(d1-d0)*i/16);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();}
 for(const n of notes){if(t<n.time-n.fall||n.gone)continue;const fly=n.state&&n.missed&&n.type==='G';if(n.state&&!fly)continue;
  let p=notePos(n,t);if(n.holding)p={x:n.xh,y:n.ty};
  if(fly){if(p.x<-R||p.x>W+R||p.y>H+R){n.gone=true;continue;}drawNoteBody(n,p.x,p.y,.3);continue;}
  const a=Math.min(1,(t-(n.time-n.fall))/.2); // 200ms 페이드인
  
  drawNoteBody(n,p.x,p.y,a);}
 fx=fx.filter(f=>{const e=(T-f.t)/(f.type==='ring'?300:f.type==='spark'?380:300);if(e>1)return false;ctx.globalAlpha=1-e;
  if(f.type==='ring'){ctx.strokeStyle=f.c;ctx.lineWidth=2.5*(1-e)+1;ctx.beginPath();ctx.arc(f.x,f.y,(f.r||R)+18*e,0,7);ctx.stroke();}
  else if(f.type==='wall'){ctx.globalAlpha*=.3;ctx.fillStyle='#fff';ctx.fillRect(f.x<1?0:W-4,f.y-24,4,48);}
  else if(f.type==='spark'){const d=20+110*e;ctx.fillStyle='#fff';ctx.fillRect(f.x+Math.cos(f.a)*d-3,f.y+Math.sin(f.a)*d-3,6,6);}
  else{ctx.globalAlpha*=.5;ctx.strokeStyle='#888';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(f.x,f.y,10+20*e,0,7);ctx.stroke();}ctx.globalAlpha=1;return true;});
 if(t<song.meta.LEAD&&song.meta.LEAD-t<=3){const k=Math.ceil(song.meta.LEAD-t),e=k-(song.meta.LEAD-t);ctx.globalAlpha=1-e*.6;txt(String(k),W/2,H*.45,`bold ${Math.round(72-20*e)}px sans-serif`,'#fff');ctx.globalAlpha=1;} // 3-2-1 카운트다운
 if(opt.disp==='SCORE'&&me.combo>1){txt(me.combo+' COMBO',W-10,LINE_Y-BAND/2-12,'bold 13px sans-serif',me.cnt.miss?'rgba(255,255,255,.8)':'rgba(255,221,90,.9)','right');} // 콤보: 미스 0이면 노랑(VOLZZA 2)
 judgeText=judgeText.filter(j=>T-j.t<450);for(const j of judgeText){const e=(T-j.t)/450,sz=e<.15?12+e/.15*4:16;ctx.globalAlpha=e<.6?1:1-(e-.6)/.4;ctx.lineWidth=3;ctx.strokeStyle='rgba(0,0,0,.8)';ctx.font=`bold ${sz.toFixed(1)}px sans-serif`;ctx.textAlign='center';ctx.strokeText(j.s,j.x,j.y-6*e);txt(j.s,j.x,j.y-6*e,ctx.font,j.c);ctx.globalAlpha=1;}
 // 상단 HUD: 곡명·난이도 / 남은 시간 / 점수
 const top=SAFE_T+16;txt(song.meta.TITLE,46,top,'bold 12px sans-serif','#dde','left');
 txt(`${song.meta.DIFF} ${song.meta.LEVEL}`,46,top+16,'bold 10px sans-serif',DCOL[Math.max(0,DIFFS.indexOf(String(song.meta.DIFF).toUpperCase()))],'left');
 txt(`${me.score}`,W-10,top,'bold 16px sans-serif','#fff','right');txt(`J ${me.cnt.just}  GR ${me.cnt.great}  GD ${me.cnt.good}  M ${me.cnt.miss}`,W/2,top+16,'9px sans-serif','#778');txt(`${Math.max(0,Math.ceil(song.endTime-t))}s${autoplay?'  AUTO':''}`,W-10,top+16,'10px sans-serif','#889','right');
 {const b=pauseBtn();ctx.fillStyle='rgba(255,255,255,.12)';ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff';ctx.fillRect(b.x-5,b.y-6,3.5,12);ctx.fillRect(b.x+1.5,b.y-6,3.5,12);}
 if(paused){ctx.fillStyle='rgba(0,0,0,.72)';ctx.fillRect(0,0,W,H);
  if(paused.cd){const k=3-Math.floor((performance.now()-paused.cd)/1000);txt(String(Math.max(1,k)),W/2,H*.45,'bold 64px sans-serif','#fff');}
  else{txt('PAUSE',W/2,H/2-110,'bold 26px sans-serif','#fff');for(const r of pauseRects()){ctx.fillStyle='rgba(255,255,255,.1)';ctx.strokeStyle='#aab';ctx.lineWidth=1.5;ctx.fillRect(r.x,r.y,r.w,r.h);ctx.strokeRect(r.x,r.y,r.w,r.h);txt(r.s,W/2,r.y+r.h/2,'bold 16px sans-serif','#fff');}}}}
// 메뉴 그리기 + 슬라이드 전환 + 눌림 피드백
function drawMenuT(T){const base=ctx.getTransform();
 if(trans){const e0=Math.min(1,(T-trans.t)/320),e=1-Math.pow(1-e0,3),d=trans.dir;
  if(e0>=1)trans=null;else{const cur=scene;ctx.fillStyle='#07060f';ctx.fillRect(0,0,W,H);
   ctx.translate(-d*W*e,MOFF());scene=trans.from;try{if(scene!=='play')drawMenu(T);}finally{scene=cur;}
   ctx.setTransform(base);ctx.translate(d*W*(1-e),MOFF());ctx.fillStyle='#07060f';ctx.fillRect(0,-MOFF(),W,H);drawMenu(T);ctx.setTransform(base);return;}}
 ctx.translate(0,MOFF());drawMenu(T);
 if(pressFx){const k=1-(T-pressFx.t)/220;if(k<=0)pressFx=null;else{ctx.fillStyle=`rgba(255,255,255,${.28*k})`;const p=pressFx,s=1-.03*k;ctx.fillRect(p.x+p.w*(1-s)/2,p.y+p.h*(1-s)/2,p.w*s,p.h*s);}}
 ctx.setTransform(base);}
function drawMenu(T){
 const rs=rects();
 if(scene==='title'){
  ctx.strokeStyle='rgba(120,220,255,.25)';ctx.lineWidth=2;for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(W/2,250,40+i*26+6*Math.sin(T/600+i),0,7);ctx.stroke();}
  txt('dgb',W/2,250,'bold 64px sans-serif','#fff');txt('Reflec Beat 오마주 · 1인용 리듬 게임',W/2,340,'14px sans-serif','#aab');
  const b=rs[0];box(b.x,b.y,b.w,b.h,'#1d6b7a','#7ff',2);ctx.globalAlpha=.7+.3*Math.sin(T/300);txt('TAP TO START',W/2,b.y+b.h/2,'bold 24px sans-serif','#fff');ctx.globalAlpha=1;
  txt('기준판: REFLEC BEAT VOLZZA 2 시스템',W/2,600,'11px sans-serif','#667');txt(buildLabel(),W/2,620,'10px sans-serif','#556');return;}
 if(scene==='select'){
  box(0,8,W,40,'#14102a');txt('MUSIC SELECT',12,28,'bold 18px sans-serif','#7ff','left');
  txt(`${HITS[opt.hit][0]} · ${opt.disp}${opt.auto?' · AUTO':''}`,W-12,28,'11px sans-serif','#ccd','right');
  listTick();const L=folderSongs(),o=rs.findIndex(b=>b.list)+1;if(!L.length)txt('곡 없음 — 아래 [불러오기]',W/2,220,'13px sans-serif','#889');
  ctx.save();ctx.beginPath();ctx.rect(0,LIST_Y,W,LIST_H);ctx.clip();
  L.forEach((s,i)=>{const b={x:8,y:LIST_Y+i*CARD_P-listOff,w:344,h:CARD_H};if(b.y+b.h<LIST_Y||b.y>LIST_Y+LIST_H)return;const on=i===opt.sel,lv=songLevels(s); // 카드형 버튼
   box(b.x,b.y,b.w,b.h,on?'#2c2456':'rgba(255,255,255,.07)',on?'#fd6':'rgba(255,255,255,.18)',on?2.5:1);if(on){ctx.fillStyle='#fd6';ctx.fillRect(b.x+3,b.y+8,4,b.h-16);}
   txt(s.title,b.x+16,b.y+22,'bold 16px sans-serif','#fff','left');const bst=getBest(s,opt.diff);txt(bst?`${bst.a.toFixed(1)}% ${bst.rank} · ${bst.fc?'FULL COMBO':bst.clear?'CLEARED':'FAILED'}`:`${s.artist} · BPM ${s.bpm}`,b.x+16,b.y+45,'11px sans-serif',bst?(bst.fc?'#fd6':bst.clear?'#7f7':'#f99'):'#99a','left');
   lv.forEach((v,d)=>{const x=b.x+b.w-112+d*26;ctx.fillStyle=v==null?'rgba(255,255,255,.06)':DCOL[d];ctx.fillRect(x,b.y+19,22,26);txt(v==null?'-':String(v),x+11,b.y+32,'bold 12px sans-serif',v==null?'#556':'#111');});});
  ctx.restore();{const M=listMax();if(M>0){const th=Math.max(30,LIST_H*LIST_H/(M+LIST_H)),ty=LIST_Y+(LIST_H-th)*Math.max(0,Math.min(1,listOff/M));ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(W-5,ty,3,th);}} // 스크롤 표시
  const s=curSong(),lv=s?songLevels(s):[];
  DIFFS.forEach((d,i)=>{const b=rs[o+i],ok=lv[i]!=null,on=opt.diff===i&&ok;box(b.x,b.y,b.w,b.h,on?DCOL[i]:'rgba(255,255,255,.06)',ok?DCOL[i]:'#333',on?3:1.5);
   txt(d,b.x+b.w/2,b.y+17,'bold 11px sans-serif',on?'#111':ok?DCOL[i]:'#555');txt(ok?'Lv '+lv[i]:'—',b.x+b.w/2,b.y+38,'bold 16px sans-serif',on?'#111':ok?'#eee':'#555');});
  const [bo,bs,bb]=[rs[o+4],rs[o+5],rs[o+6]];
  box(bo.x,bo.y,bo.w,bo.h,'rgba(255,255,255,.08)','#99a');txt('OPTION',bo.x+bo.w/2,bo.y+bo.h/2,'bold 14px sans-serif','#dde');
  box(bs.x,bs.y,bs.w,bs.h,'#1d6b7a','#7ff',2);txt('▶ START',bs.x+bs.w/2,bs.y+bs.h/2,'bold 17px sans-serif','#fff');
  txt('◀ 타이틀',bb.x+bb.w/2,bb.y+bb.h/2,'12px sans-serif','#778');
  if(loadMsg)txt(loadMsg,W/2,624,'11px sans-serif','#fd6');return;}
 if(scene==='option'){box(0,8,W,40,'#14102a');txt(buildLabel(),W/2,532,'11px sans-serif','#778');txt('OPTION',12,28,'bold 18px sans-serif','#7ff','left');
  for(const b of rs){
   if(b.head){txt(b.head,(b.x||20)+2,b.y,'bold 13px sans-serif','#dde','left');if(b.sub)txt(b.sub,340,b.y,'10px sans-serif','#889','right');continue;}
   if(b.sample){const r=opt.nd/2,cy=b.y+SEG_H/2; // 실제 플레이 크기 샘플(빨강·초록 스프라이트)
    for(const [k,cx] of [['red',266],['green',314]]){const im=NOTE_IMG[k];if(im&&im.complete&&im.naturalWidth)ctx.drawImage(im,cx-r,cy-r,2*r,2*r);else{ctx.fillStyle=k==='red'?'#f36':'#3f6';ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();}}continue;}
   if(b.slider){const v=b.slider.v,x0=b.x+16,x1=b.x+b.w-16-56,cy=b.y+b.h/2,tx=b.x+16+(b.w-32)*0; // 트랙 = x 36..324
    const L=36,R2=b.x+b.w-16,px=L+(R2-L)*v;box(b.x,b.y,b.w,b.h,'rgba(255,255,255,.05)','rgba(255,255,255,.15)');
    ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(L,cy-3,R2-L,6);ctx.fillStyle='#4cd';ctx.fillRect(L,cy-3,px-L,6);
    if(b.slider.steps){ctx.fillStyle='rgba(255,255,255,.35)';for(let k=0;k<=b.slider.steps;k++){ctx.beginPath();ctx.arc(L+(R2-L)*k/b.slider.steps,cy,3,0,7);ctx.fill();}}
    {ctx.fillStyle=menuDrag&&menuDrag.y===b.y?'#fff':'#bff';ctx.beginPath();ctx.arc(px,cy,menuDrag&&menuDrag.y===b.y?13:11,0,7);ctx.fill();}
    txt(b.slider.fmt(v),340,b.y-10,'bold 13px sans-serif','#7ff','right');continue;}
   if(b.main){box(b.x,b.y,b.w,b.h,'#1d6b7a','#7ff',2);txt('◀ MUSIC SELECT',W/2,b.y+b.h/2,'bold 16px sans-serif','#fff');continue;}
   box(b.x,b.y,b.w,b.h,b.on?'#2a5a8a':'rgba(255,255,255,.07)',b.on?'#7ff':'rgba(255,255,255,.18)',b.on?2:1);
   txt(b.lab,b.x+b.w/2,b.y+b.h/2,(b.on?'bold ':'')+(b.lab.length>6?'12':'14')+'px sans-serif',b.on?'#fff':'#bbc');}
  return;}
 if(scene==='result'){const r=result,m=song.meta,di=Math.max(0,DIFFS.indexOf(String(m.DIFF).toUpperCase()));
  box(0,8,W,40,'#14102a');txt('RESULT',12,28,'bold 18px sans-serif','#7ff','left');txt(`${m.DIFF} Lv${m.LEVEL}`,W-12,28,'bold 12px sans-serif',DCOL[di],'right');
  txt(m.TITLE,W/2,72,'bold 16px sans-serif','#fff');
  ctx.save();ctx.translate(W/2,122);ctx.rotate(-.06);box(-150,-26,300,52,r.clear?'rgba(80,220,120,.18)':'rgba(255,80,80,.15)',r.clear?'#7f7':'#f77',2);
  txt(r.clear?'CLEAR!!':'FAILED…',0,0,'bold 38px sans-serif',r.clear?'#7f7':'#f77');ctx.restore();
  if(r.fc)txt('FULL COMBO',W/2,166,'bold 14px sans-serif','#fd6');
  if(r.newRec)txt('NEW RECORD!',W/2,184,'bold 11px sans-serif','#f6c');
  txt('ACHIEVEMENT RATE',30,196,'11px sans-serif','#99a','left');txt(`${r.a.toFixed(1)}%`,30,222,'bold 30px sans-serif','#fff','left');
  txt('RANK',W-30,196,'11px sans-serif','#99a','right');txt(r.rank,W-30,224,'bold 34px sans-serif','#ff6','right');
  const gw=W-60;box(30,246,gw,8,'rgba(40,30,60,.9)');ctx.fillStyle='rgba(230,220,90,.35)';ctx.fillRect(30+gw*.7,246,gw*.3,8);ctx.fillStyle=r.clear?'#ee5':'#a6f';ctx.fillRect(30,246,gw*Math.min(1,r.a/100),8);
  [['JUST','just'],['GREAT','great'],['GOOD','good'],['MISS','miss']].forEach(([l,k],i)=>{txt(l,60,290+i*28,'bold 16px sans-serif',JUD[k][1],'left');txt(String(me.cnt[k]),W-60,290+i*28,'bold 16px sans-serif','#fff','right');});
  txt('MAX COMBO',60,410,'13px sans-serif','#ccd','left');txt(String(me.maxCombo),W-60,410,'bold 14px sans-serif','#fff','right');
  txt(`FLICK`,60,434,'13px sans-serif','#ccd','left');txt(`${me.flick} / ${me.flickN}`,W-60,434,'bold 14px sans-serif','#fff','right');
  txt('SCORE',60,466,'13px sans-serif','#ccd','left');txt(String(me.score),W-60,466,'bold 16px sans-serif','#fff','right');
  txt(`MISS COUNT BONUS (${me.cnt.miss} miss)`,60,490,'12px sans-serif','#ccd','left');txt('+'+r.b,W-60,490,'bold 14px sans-serif','#fd6','right');
  txt('TOTAL',60,522,'bold 15px sans-serif','#7ff','left');txt(String(r.total),W-60,522,'bold 22px sans-serif','#7ff','right');
  const b=rs[0];box(b.x,b.y,b.w,b.h,'#1d6b7a','#7ff',2);txt('MUSIC SELECT ▶',W/2,b.y+b.h/2,'bold 16px sans-serif','#fff');}}
function loop(){try{update();draw();}catch(e){console.error(e);}requestAnimationFrame(loop);}
loop();
const ready=fetch('data/songs.json').then(r=>r.json()).then(L=>{SONGS=L;}).catch(e=>{console.error(e);loadMsg='곡 목록 불러오기 실패';});
if(DEMO)ready.then(()=>{const q=params.get('song');opt.folder=0;opt.sel=Math.max(0,SONGS.findIndex(s=>s.id===(q||'artm')));
 opt.diff=params.get('diff')!=null?+params.get('diff'):opt.diff;start(true);});
window.dgb={CHARTS,loadSong,get SONGS(){return SONGS},ready,get paused(){return paused;},get ac(){return ac;},pauseGame,resumeGame,pauseRects,notePos,zoneAt,get press(){return press},get geom(){return {W,H,LINE_Y,BTN_Y,SPAWN_Y,SAFE_T,SAFE_B,scale}},parseChart,get song(){return song},get me(){return me},get scene(){return scene},get result(){return result},now,opt,rects:()=>rects().map(r=>({x:r.x,y:r.y+MOFF(),w:r.w,h:r.h}))};
