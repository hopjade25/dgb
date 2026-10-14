'use strict';
// ============ 곡 목록 / 옵션 ============
let SONGS=[]; // data/songs.json 에서 채움(정적 데이터 계층)
const CHARTS={};window.MIDI_SONGS=window.MIDI_SONGS||{};
function songLevels(s){if(s.art||s.mid)return [10,10,10,10];return DIFFS.map(d=>d===s.diffName?s.level:null);}
const FOLDERS=[['ALL','전체'],['USER','불러온 곡']];
const SIZES=[56,44,34]; // 오브젝트 크기(시각만, 판정 영역 불변 — limelight~ '오브젝트 사이즈' 커스터마이즈 [namu 라임라이트/그루빈]). 34≈원작 실측 9%W
const ND_STEPS=[34,39.5,45,50.5,56]; // 노트 지름 5단계(논리 px). 최대 56 = 기존 기본값
const opt={hv:1,nd:56,size:0,hit:0,disp:'SCORE',auto:false,folder:0,sort:0,sel:0,diff:1};
// 타격음(터치 사운드): 합성, 터치 즉시 ac.currentTime에 바로 재생(저지연). localStorage 'dgb.hit'
const HITS=[['클랩',t=>{nz(t,.5,.09,'bandpass',1400);nz(t+.012,.35,.07,'bandpass',1200);}],['틱',t=>osc(t,'square',2200,0,.12,.03)],
 ['우드',t=>{osc(t,'sine',900,600,.45,.07);}],['림샷',t=>{osc(t,'triangle',520,0,.35,.05);nz(t,.35,.05,'highpass',3000);}],
 ['판정별',(t,k)=>{const f={just:1760,great:1320,good:880}[k||'just'];osc(t,'sine',f,0,.25,.06);osc(t,'triangle',f/2,0,.12,.05);}], // REFLET MUSE의 판정별 효과음(just/great/good) 개념 — 소리는 자체 합성
 ['끄기',null],
 ['MUSE',(t,k)=>museHit(t,k)],
 ['RbPlus',(t,k)=>rbHit(t,k)]]; // REFLET MUSE 0.10.3 판정음(just/great/good.wav, 사용자 결정으로 사용 — docs/assets-credits.md)
// MUSE 판정음: 선택 시(또는 저장된 선택으로 오디오 시작 시) 지연 로딩 → WebAudio 버퍼로 디코드(저지연)
const MUSE={};let museP=null;
function museLoad(){if(museP||!ac)return museP;museP=Promise.all(['just','great','good'].map(k=>fetch('data/sfx/muse-'+k+'.wav').then(r=>r.arrayBuffer())
 .then(b=>new Promise((ok,no)=>{const r=ac.decodeAudioData(b,ok,no);if(r&&r.then)r.then(ok,no);})).then(buf=>{MUSE[k]=buf;}))).catch(e=>{console.warn('MUSE sfx',e);museP=null;});return museP;}
function museHit(t,k){const buf=MUSE[k||'just']||MUSE.just;if(!buf){museLoad();return;}const s=ac.createBufferSource();s.buffer=buf;s.connect(hitG||master);s.start(t);}
// RbPlus(REFLEC BEAT plus) 터치음 33세트 전부(IPA Sounds/00_Share/SHOT, just/great/good) — 옵션에서 ◀ ▶로 세트 선택, 선택 세트만 지연 로딩
const RB_SETS=['DEFAULT1','DEFAULT2','DEFAULT3','CLAP','HIT','LIGHT','STEEL','SOTA','QRISPY','96','ELECTRO1','ELECTRO2','ELECTRO3','ELECTRO4','ELECTRO5','ELECTRO6','PERCUSSION','PERCUSSION2','TAMBOURINE','LATIN','JAPAN','JAPAN2','PAWAPURO','FIGHT','SWORD','BOMB','FIREWORKS','JINGLEBELL','BASEBALL','HOCKEY','TENNIS','TABLETENNIS','VOLLEYBALL'];
if(opt.rb==null)opt.rb=0;
const RBB={};const rbP={};
function rbLoad(i){if(i==null)i=opt.rb;if(!ac)return null;if(rbP[i])return rbP[i];const n=RB_SETS[i].toLowerCase();RBB[i]=RBB[i]||{};
 rbP[i]=Promise.all(['just','great','good'].map(k=>fetch('data/sfx/rb/'+n+'_'+k+'.wav').then(r=>r.arrayBuffer())
 .then(b=>new Promise((ok,no)=>{const r=ac.decodeAudioData(b,ok,no);if(r&&r.then)r.then(ok,no);})).then(buf=>{RBB[i][k]=buf;}))).catch(e=>{console.warn('RB sfx',e);rbP[i]=null;});return rbP[i];}
function rbHit(t,k){const B=RBB[opt.rb]||{},buf=B[k||'just']||B.just;if(!buf){rbLoad();return;}const s=ac.createBufferSource();s.buffer=buf;s.connect(hitG||master);s.start(t);}
try{const rv=+localStorage.getItem('dgb.rb');if(localStorage.getItem('dgb.rb')!=null&&rv>=0&&rv<RB_SETS.length)opt.rb=rv;}catch(_){}
try{const v=+localStorage.getItem('dgb.hit');if(v>=0&&v<HITS.length)opt.hit=v;const h=localStorage.getItem('dgb.hv');if(h!=null&&+h>=0&&+h<=1)opt.hv=+h;const r=localStorage.getItem('dgb.nd');if(r!=null&&ND_STEPS.includes(+r))opt.nd=+r;}catch(_){}
function saveOpt(){try{localStorage.setItem('dgb.hit',opt.hit);localStorage.setItem('dgb.hv',opt.hv);localStorage.setItem('dgb.nd',opt.nd);localStorage.setItem('dgb.rb',opt.rb);}catch(_){}}
function setHitVol(v){opt.hv=Math.max(0,Math.min(1,Math.round(v*20)/20));if(hitG)hitG.gain.value=.7*opt.hv;}
function hitSound(k){const f=HITS[opt.hit][1];if(!f||!audioRunning())return;bus=hitG;try{f(ac.currentTime,k);}catch(e){}bus=null;}
// ===== 곡 미리듣기: 선택 후 0.4초 → songs.json preview{beat,len}(차트 박 기준) 구간을 페이드 인/아웃으로 반복. 화면 이탈·시작 시 정지 =====
let pv=null,pvWant=null,pvAt=0,pvLoading=false,pvHold=false;
function stopPreview(){pvWant=null;if(!pv)return;const g=pv.g;pv=null;try{const t=ac.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+.25);}catch(e){}setTimeout(()=>{try{g.disconnect();}catch(e){}},400);}
function pvFade(n){const g=pv.g.gain,L=pv.st+n*pv.dur,v=.7,fi=Math.min(.8,pv.dur/4);g.setValueAtTime(0,L);g.linearRampToValueAtTime(v,L+fi);g.setValueAtTime(v,L+pv.dur-fi);g.linearRampToValueAtTime(0,L+pv.dur-.03);}
function pvPump(){const hz=ac.currentTime+.3;let guard=0;
 while(pv&&pv.ev.length&&guard++<400){if(pv.i>=pv.ev.length){pv.i=0;pv.n++;pvFade(pv.n);}const e=pv.ev[pv.i],t=pv.st+pv.n*pv.dur+e.t;if(t>hz)break;pv.i++;if(t<ac.currentTime-.02)continue;
  bus=pv.g;try{if(e.m)mPlay(t,e.m);else if(e.a)aPlay(t,e.a,e.spb);}catch(_){}bus=null;}}
function previewTick(){
 if(pvHold){if(scene==='play'||loadMsg!=='불러오는 중…')pvHold=false;else return;}
 if(scene!=='select'||!audioRunning()||(typeof trans!=='undefined'&&trans)){stopPreview();return;}
 const s=curSong();if(!s||!s.preview||!s.music){stopPreview();return;}
 if(pvWant!==s.id){stopPreview();pvWant=s.id;pvAt=performance.now()+400;return;}
 if(pv){pvPump();return;}if(performance.now()<pvAt||pvLoading)return;
 const key=s.id,d=playableDiff(s,opt.diff)?opt.diff:0;pvLoading=true;
 loadSong(s,d).then(()=>{pvLoading=false;if(pvWant!==key||scene!=='select'||!audioRunning())return;
  const c=parseChart(chartTextFor(s,d)),b0=s.preview.beat,b1=b0+s.preview.len,T0=c.beatToTime(b0),T1=c.beatToTime(b1);
  const g=ac.createGain();g.gain.value=0;g.connect(ac.destination);
  pv={key,g,ev:c.music.filter(e=>e.b>=b0&&e.b<b1).map(e=>Object.assign({},e,{t:e.t-T0})),dur:T1-T0,st:ac.currentTime+.08,i:0,n:0};pvFade(0);pvPump();},()=>{pvLoading=false;});}
let loadMsg='';
function folderSongs(){const f=FOLDERS[opt.folder][0];let L=SONGS.filter(s=>f==='ALL'||s.folder===f);
 if(opt.sort===1)L=L.slice().sort((a,b)=>(songLevels(b)[opt.diff]||0)-(songLevels(a)[opt.diff]||0));
 else if(opt.sort===2)L=L.slice().sort((a,b)=>a.title.localeCompare(b.title));return L;}
function curSong(){const L=folderSongs();if(!L.length)return null;opt.sel=Math.min(opt.sel,L.length-1);return L[opt.sel];}
function visList(){const L=folderSongs(),off=Math.max(0,Math.min(opt.sel-2,L.length-5));return {L:L.slice(off,off+5),off};}
function playableDiff(s,d){return songLevels(s)[d]!=null;}
function chartTextFor(s,d){if(s.text)return s.text;return CHARTS[s.id+'-'+DIFFS[d]];}
// 지연 로딩: 곡 선택 후 시작할 때 차트(.dgb)와 음악 데이터(JSON)를 fetch (서비스 워커가 캐시)
const loading=new Map();
function loadSong(s,d){if(s.text)return Promise.resolve();const key=s.id+'-'+DIFFS[d];
 if(!loading.has(key)){const jobs=[fetch(s.charts[DIFFS[d]]).then(r=>{if(!r.ok)throw new Error(r.status);return r.text();}).then(t=>{CHARTS[key]=t;})];
  if(s.music&&!loading.has('m:'+s.id)){const mp=fetch(s.music).then(r=>r.json()).then(j=>{if(s.mid)MIDI_SONGS[s.mid]=j;else window.ARTM_ARR=j;});loading.set('m:'+s.id,mp);}
  if(s.music)jobs.push(loading.get('m:'+s.id));loading.set(key,Promise.all(jobs).catch(e=>{loading.delete(key);loading.delete('m:'+s.id);throw e;}));}
 return loading.get(key);}

