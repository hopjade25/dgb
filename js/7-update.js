'use strict';
// ============ 업데이트 ============
function update(){previewTick();if(scene!=='play')return;if(paused){if(paused.cd&&performance.now()-paused.cd>=3000)unfreeze();return;}scheduleAudio();const t=now();
 {const pn=performance.now();for(const [pid,f] of [...pendF])if(pn-f.w>FLICK_MS)resolveFlick(pid,false);} // 튕기지 않고 누르고만 있으면 FLICK_MS 뒤 탭 판정
 for(const n of notes){
  if(n.state)continue;
  if(n.holding){ if(held(n.hz))n.lastHeld=t;
   if(t>=n.end){finalize(n,n.headKind);continue;}
   if(t-n.lastHeld>.10){ // 0.1초 이내 순간 떼기 허용(REFLET MUSE 0.5.0 사양) · 끝 1/4박 전부터는 떼도 성공 [atwiki Tips]
    if(n.end-t<=n.endTol){finalize(n,n.headKind);continue;}
    const r=(n.end-t)/(n.end-n.time);n.holding=false;finalize(n,'miss',-Math.max(1,Math.ceil(3*r)));continue;}
   continue;}
  if(autoplay&&t>=n.time){if(n.flick)n.flicked=true;press[n.type==='G'?n.side:'C']=performance.now();judgeHit(n,n.time);continue;}
  if(n.flickPending)continue; // 플릭 대기 중이면 대기 해소(≤FLICK_MS)까지 미스 보류
  if(t>n.time+WIN.good){finalize(n,'miss',n.long?-6:PTS.miss);continue;}
  if(t>n.time-n.fall){const p=notePos(n,t);if(n.lastK!==null&&p.k!==n.lastK)fx.push({type:'wall',x:p.x<W/2?0:W,y:p.y,t:performance.now(),c:n.type==='G'?'#6f6':'#f55'});n.lastK=p.k;}}
 if(t>song.endTime)finish();}
function bonus(s){const m=s.cnt.miss;return m===0?50:m===1?25:m===2?10:0;}   // 미스카운트 보너스(limelight~, VOLZZA 2 선택식 중 하나)
function points(s){return 3*s.cnt.just+2*s.cnt.great+s.cnt.good;} // 달성률(AR)용 — 점수와 별개. 플릭 5점 보너스는 점수에만
function ar(s){const N=notes.length||1;return Math.round(points(s)/(3*N)*1000)/10;}  // AR = (3J+2G+g)/(3N)×100%, 소수 1자리 반올림 — RemyWiki 'What is REFLEC BEAT' Achievement Rate, docs/reflec-analysis.md §AR  // AR = (3J+2G+Gd)/(3N), 0.1% 단위
function rank(a){return a>=95?'AAA+':a>=90?'AAA':a>=80?'AA':a>=70?'A':a>=60?'B':'C';}
function bestKey(s,d){return 'dgb:best:'+s.id+':'+d;}
function getBest(s,d){try{return JSON.parse(localStorage.getItem(bestKey(s,d))||'null');}catch(_){return null;}}
function finish(){const a=ar(me),b=bonus(me);result={a,b,total:me.score+b,clear:a>=70,rank:rank(a),fc:me.cnt.miss===0,miss:me.cnt.miss};
 const di=opt.diff,old=song.src?getBest(song.src,di):null;result.newRec=!autoplay&&(!old||result.total>old.total);
 if(result.newRec&&song.src)try{localStorage.setItem(bestKey(song.src,di),JSON.stringify({total:result.total,a,rank:result.rank,fc:result.fc,clear:result.clear,miss:result.miss}));}catch(_){}
 scene='result';}

