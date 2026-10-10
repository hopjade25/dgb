'use strict';
// ============ 곡 목록 / 옵션 ============
let SONGS=[]; // data/songs.json 에서 채움(정적 데이터 계층)
const CHARTS={};window.MIDI_SONGS=window.MIDI_SONGS||{};
function songLevels(s){if(s.art||s.mid)return [10,10,10,10];return DIFFS.map(d=>d===s.diffName?s.level:null);}
const FOLDERS=[['ALL','전체'],['USER','불러온 곡']];
const SIZES=[56,44,34]; // 오브젝트 크기(시각만, 판정 영역 불변 — limelight~ '오브젝트 사이즈' 커스터마이즈 [namu 라임라이트/그루빈]). 34≈원작 실측 9%W
const opt={size:0,hit:0,disp:'SCORE',offset:0,auto:false,folder:0,sort:0,sel:0,diff:1};
// 타격음(터치 사운드): 합성, 터치 즉시 ac.currentTime에 바로 재생(저지연). localStorage 'dgb.hit'
const HITS=[['클랩',t=>{nz(t,.5,.09,'bandpass',1400);nz(t+.012,.35,.07,'bandpass',1200);}],['틱',t=>osc(t,'square',2200,0,.12,.03)],
 ['우드',t=>{osc(t,'sine',900,600,.45,.07);}],['림샷',t=>{osc(t,'triangle',520,0,.35,.05);nz(t,.35,.05,'highpass',3000);}],
 ['판정별',(t,k)=>{const f={just:1760,great:1320,good:880}[k||'just'];osc(t,'sine',f,0,.25,.06);osc(t,'triangle',f/2,0,.12,.05);}], // REFLET MUSE의 판정별 효과음(just/great/good) 개념 — 소리는 자체 합성
 ['끄기',null],
 ['MUSE',(t,k)=>museHit(t,k)]]; // REFLET MUSE 0.10.3 판정음(just/great/good.wav, 사용자 결정으로 사용 — docs/assets-credits.md)
// MUSE 판정음: 선택 시(또는 저장된 선택으로 오디오 시작 시) 지연 로딩 → WebAudio 버퍼로 디코드(저지연)
const MUSE={};let museP=null;
function museLoad(){if(museP||!ac)return museP;museP=Promise.all(['just','great','good'].map(k=>fetch('data/sfx/muse-'+k+'.wav').then(r=>r.arrayBuffer())
 .then(b=>new Promise((ok,no)=>{const r=ac.decodeAudioData(b,ok,no);if(r&&r.then)r.then(ok,no);})).then(buf=>{MUSE[k]=buf;}))).catch(e=>{console.warn('MUSE sfx',e);museP=null;});return museP;}
function museHit(t,k){const buf=MUSE[k||'just']||MUSE.just;if(!buf){museLoad();return;}const s=ac.createBufferSource();s.buffer=buf;s.connect(master);s.start(t);}
try{const v=+localStorage.getItem('dgb.hit');if(v>=0&&v<HITS.length)opt.hit=v;}catch(_){}
function saveOpt(){try{localStorage.setItem('dgb.hit',opt.hit);}catch(_){}}
function hitSound(k){const f=HITS[opt.hit][1];if(!f||!audioRunning())return;try{f(ac.currentTime,k);}catch(e){}}
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

