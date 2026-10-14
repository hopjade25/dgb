'use strict';
// ============ 오디오 (WebAudio 합성, 실패 시 무음) ============
let ac=null,master,noiseBuf,t0=0,hitG=null,bus=null; // bus: 지금 합성하는 소리의 출력(null=master). 타격음=hitG(볼륨 별도), 미리듣기=pv.g
const OUT=()=>bus||master;
function initAudio(){if(paused&&scene==='play')return;try{
 if(!ac){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ac=new AC();master=ac.createGain();master.gain.value=.7;master.connect(ac.destination);hitG=ac.createGain();hitG.gain.value=.7*opt.hv;hitG.connect(ac.destination);
  const len=Math.floor(ac.sampleRate*.2),buf=ac.createBuffer(1,len,ac.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;noiseBuf=buf;
  const s=ac.createBufferSource();s.buffer=ac.createBuffer(1,1,22050);s.connect(ac.destination);s.start(0);}
 if(ac.state!=='running'){const r=ac.resume();if(r&&r.catch)r.catch(()=>{});}
 if(typeof HITS!=='undefined'&&HITS[opt.hit][0]==='MUSE')museLoad();if(typeof HITS!=='undefined'&&HITS[opt.hit][0]==='RbPlus')rbLoad();}catch(e){console.warn('audio disabled',e);ac=null;}}
function audioRunning(){return ac&&ac.state==='running';}
function osc(t,type,f0,f1,v,dur){const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(f1,t+dur*.4);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g);g.connect(OUT());o.start(t);o.stop(t+dur+.02);}
function hat(t,v){const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=noiseBuf;f.type='highpass';f.frequency.value=7000;
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.06);s.connect(f);f.connect(g);g.connect(OUT());s.start(t);s.stop(t+.08);}
function sfx(f){if(!audioRunning())return;try{osc(ac.currentTime,'square',f,0,.06,.06);}catch(e){}}
const mf=m=>440*Math.pow(2,(m-69)/12);
function nz(t,v,dur,type,fr){const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=noiseBuf;f.type=type;f.frequency.value=fr;
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(f);f.connect(g);g.connect(OUT());s.start(t);s.stop(t+dur+.02);}
// MIDI 재생: 트랙 이름으로 정한 음색(0 drum,1 bass,2 lead,3 piano,4 pluck,5 pad / 10-14 드럼 역할 k s h c t). 폰 부하 제한: 20ms당 최대 10발음(드럼 제외)
let mWin=-1,mCnt=0;
function mPlay(t,m){const [p,v,c,du]=m,g=v/127;
 if(c>=10){const r=c-10;if(r===0)osc(t,'sine',150,40,.9*g,.25);else if(r===1){nz(t,.45*g,.13,'bandpass',1800);osc(t,'triangle',200,0,.2*g,.08);}else if(r===2)hat(t,.12*g);else if(r===3)nz(t,.3*g,.9,'highpass',4000);else osc(t,'sine',110+p*3,60+p*2,.4*g,.15);return;}
 const w=Math.floor(t*50);if(w!==mWin){mWin=w;mCnt=0;}if(++mCnt>10)return;
 const f=mf(p),d=Math.max(.05,Math.min(c===5?3:c===3?1.5:c===4?.3:2,du*.95));
 if(c===1)osc(t,'sawtooth',f,0,.10*g,d);else if(c===2)osc(t,'square',f,0,.045*g,d);else if(c===3){osc(t,'triangle',f,0,.09*g,d);osc(t,'sine',f*2,0,.02*g,d*.5);}
 else if(c===4)osc(t,'square',f,0,.035*g,d);else osc(t,'triangle',f,0,.03*g,d);}
function aPlay(t,e,spb){ // ARTM: 악보 전사 기반 합성 (선율=사각파+삼각파, 베이스=톱니, 화성 패드=삼각파, 드럼=리듬 보강)
 if(e.k)osc(t,'sine',150,40,.8,.25);if(e.s){nz(t,.35,.14,'bandpass',1800);}if(e.h)hat(t,.07);if(e.o)nz(t,.12,.15,'highpass',6000);if(e.c)nz(t,.25,1.0,'highpass',4000);
 if(e.ld)for(const [ns,d] of e.ld){const du=Math.max(.06,Math.min(3,d*spb*.95));for(const m of ns){osc(t,'square',mf(m),0,.045/Math.sqrt(ns.length),du);osc(t,'triangle',mf(m),0,.06/Math.sqrt(ns.length),du);}}
 if(e.bs)for(const [ns,d] of e.bs){const du=Math.max(.08,Math.min(3,d*spb*.95));for(const m of ns)osc(t,m<48?'sawtooth':'triangle',mf(m),0,m<48?.08:.05,du);}
 if(e.pad){const [ns,d]=e.pad;for(const m of ns)osc(t,'triangle',mf(m),0,.025,Math.min(4,d*spb));}}
let schedI=0;
function scheduleAudio(){if(!audioRunning()||!song)return;const gt=now(),hz=gt+.2,roots=[55,55,65.4,49];
 while(schedI<song.music.length){const ev=song.music[schedI];if(ev.t>hz)break;schedI++;if(ev.t<gt-.05)continue;const t=ac.currentTime+Math.max(0,ev.t-gt),b=ev.b;
  try{if(ev.m){mPlay(t,ev.m);continue;}if(ev.a){aPlay(t,ev.a,ev.spb);continue;}if(b%1===0){osc(t,'sine',150,40,1,.35);if(b>=4)osc(t,'triangle',roots[Math.floor(b/4)%4],0,.22,.22);}hat(t,b%1?.25:.12);}catch(e){}}}
// 시계: 오디오 시계가 흐를 때만 사용, 멈추면 performance.now()
let perf0=0,audioOK=false,lastAcT=-1,acOff=0,lastAdv=0;
// 일시정지: paused={t:멈춘 게임시각, cd:카운트다운 시작(perf ms)|0}. 멈춘 동안 now()는 고정 → 노트·판정·타이머 모두 정지
let paused=null;
function pauseBtn(){return {x:24,y:SAFE_T+24,r:15};}
function pauseGame(){if(scene!=='play'||paused)return;paused={t:now(),cd:0};ptrs.clear();
 for(const f of pendF.values())f.n.flickPending=false;pendF.clear();
 // 일시정지 무음: 예약된 음악·재생 중 소리를 30ms 페이드아웃 후 끊고(뚝 소리 방지) 오디오 정지. 일시정지 자체의 효과음은 없음
 try{if(ac){const t=ac.currentTime;for(const g of [master,hitG]){if(!g)continue;try{g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+.03);}catch(_){}}
  const oldM=master,oldH=hitG;master=ac.createGain();master.gain.value=.7;master.connect(ac.destination);hitG=ac.createGain();hitG.gain.value=.7*opt.hv;hitG.connect(ac.destination);
  setTimeout(()=>{try{oldM.disconnect();}catch(_){}try{oldH&&oldH.disconnect();}catch(_){}if(paused&&ac.suspend)ac.suspend().catch(()=>{});},60);}}catch(e){}}
function resumeGame(){if(!paused||paused.cd)return;paused.cd=performance.now();}
function unfreeze(){const f=paused.t;paused=null;initAudio(); // 시계 재기준: 멈춘 시각 f에서 이어서
 perf0=performance.now()/1000-(f-AT);t0=ac?ac.currentTime-(f-AT):0;audioOK=false;lastAcT=-1;acOff=0;
 schedI=0;while(schedI<song.music.length&&song.music[schedI].t<f-.01)schedI++;}
// 메뉴로: 같은 터치가 pointerdown·touchstart로 두 번 들어오는데, 장면이 바뀌면 디바운스 키(zone)가 달라져 두 번째가 선곡 화면 탭으로 새어 곡 선택/재시작이 됐음
// → 메뉴 탭 가드 + 슬라이드 전환(전환 중엔 메뉴 탭 무시), 눌린 포인터 정리
function quitPause(toMenu){paused=null;ptrs.clear();pendF.clear();menuGuard=performance.now()+450;initAudio();if(toMenu)go('select',-1);else start();}
function pauseRects(){const y0=H/2-70;return [{y:y0,s:'계속하기',a:resumeGame},{y:y0+60,s:'다시하기',a:()=>quitPause(false)},{y:y0+120,s:'메뉴로',a:()=>quitPause(true)}].map(o=>({...o,x:W/2-110,w:220,h:46}));}
function pauseTap(x,y){if(paused){if(paused.cd)return true;for(const r of pauseRects())if(x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h){r.a();break;}return true;}
 const b=pauseBtn();if(Math.hypot(x-b.x,y-b.y)<=26){pauseGame();return true;}return false;}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseGame();});
window.addEventListener('pagehide',()=>pauseGame());
function now(){if(paused)return paused.t;const pt=performance.now()/1000-perf0;
 if(audioRunning()){const at=ac.currentTime;if(at>lastAcT){lastAcT=at;lastAdv=pt;if(!audioOK){acOff=pt-(at-t0);audioOK=true;}}else if(pt-lastAdv>.25)audioOK=false;
  if(audioOK)return at-t0+acOff+AT;}else audioOK=false;return pt+AT;}

// ===== 녹음 음원(songs.json "audio","audioOffset"): audioOffset = 차트 0박 시점의 음원 시각(초). 게임 시각 g의 음원 위치 = g − LEAD + audioOffset =====
const AUD={};let bgm=null;
function audLoad(s){if(!s.audio||AUD[s.id]||!ac)return Promise.resolve();return fetch(s.audio).then(r=>{if(!r.ok)throw new Error(r.status);return r.arrayBuffer();})
 .then(b=>new Promise((ok,no)=>{const r=ac.decodeAudioData(b,ok,no);if(r&&r.then)r.then(ok,no);})).then(buf=>{AUD[s.id]=buf;});}
function bgmStop(){if(!bgm)return;try{bgm.stop();}catch(_){}try{bgm.disconnect();}catch(_){}bgm=null;}
function bgmTick(){const s=song&&song.src;if(scene!=='play'||paused||!s||!s.audio){bgmStop();return;}
 if(bgm||!audioRunning())return;if(!AUD[s.id]){if(!s._al){s._al=1;audLoad(s).catch(e=>console.warn('audio',e)).finally(()=>{s._al=0;});}return;}const g=now(),pos=g-song.meta.LEAD+(s.audioOffset||0),buf=AUD[s.id];if(pos>=buf.duration)return;
 const src=ac.createBufferSource();src.buffer=buf;src.connect(master);if(pos<0)src.start(ac.currentTime-pos,0);else src.start(ac.currentTime,pos);bgm=src;}
