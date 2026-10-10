'use strict';
'use strict';
// =====================================================================
// dgb — REFLEC BEAT 오마주 (기준판: REFLEC BEAT VOLZZA 2 / 悠久のリフレシア 미사용)
// 논리 폭 360 고정, 높이 H는 기기 화면비에 맞춰 가변(레터박스 없음). 밴드는 하단 고정.
// TOP_RATIO: VOLZZA 공식/플레이 이미지 실측 (판정라인-TOP행)/필드높이 ≈ 0.20 (docs §10.3)
// =====================================================================
const W=360,R=28,BAND=56,BR=BAND/2,BTN_HIT=75,SIDE_HIT=75,BAND_HIT=37.5,TOP_RATIO=0.20,MIN_H=600;
let H=640,LINE_Y=602,SPAWN_Y=70,BTN_Y=475,SAFE_T=0,SAFE_B=0;
// 레이아웃(사용자 레퍼런스 스크린샷 실측, 필드 내부 비율): 빨강 판정선 85.7% 높이, 초록 버튼 66.0% 높이, 좌우 버튼 중심은 벽에서 12.8% 안쪽
const LINE_RATIO=0.857,BTN_RATIO=0.660,SIDE_X=0; // 좌우 버튼 = 벽 위 반원(중심 x=0/W, 반만 보임). 높이 66%는 레퍼런스 유지
const BTNS={L:{x:SIDE_X,tx:SIDE_X},M:{x:W/2,tx:W/2},R:{x:W-SIDE_X,tx:W-SIDE_X}};
const RED_XS=[0,1,2,3,4,5].map(k=>W*(k+.5)/6);
const XMIN=R,XMAX=W-R,SPAN=XMAX-XMIN;
const WIN={just:.05,great:.10,good:.15};            // 🛠 dgb 자체 값(원작 수치 미공개)
const PTS={just:3,great:2,good:1,miss:-3};           // 원작(초대~VOLZZA 2): JUST3 GREAT2 GOOD1 MISS-3
const FLICK_MIN=22,FLICK_MS=280;                     // 🛠 플릭: 터치다운 후 280ms 안에 22px(논리) 이상 이동
const DIFFS=['BASIC','MEDIUM','HARD','SPECIAL'];     // VOLZZA 2 명칭
const DCOL=['#4c4','#fc3','#f44','#c6f'];             // 緑·黄·赤·虹(용어집 [G]) — SPECIAL은 보라로 대체
const cv=document.getElementById('c'),ctx=cv.getContext('2d');let scale=1,dpr=1;
function safeInsets(){try{const c=getComputedStyle(document.getElementById('sa'));return [parseFloat(c.paddingTop)||0,parseFloat(c.paddingBottom)||0];}catch(_){return [0,0];}}
function resize(){dpr=window.devicePixelRatio||1;const iw=innerWidth||360,ih=innerHeight||640;cv.style.touchAction='none';
 scale=iw/W;let h=ih/scale;if(h<MIN_H){h=MIN_H;scale=ih/MIN_H;}
 let inPlay=false;try{inPlay=scene==='play';}catch(_){}
 if(!inPlay){H=h;const [st,sb]=safeInsets();SAFE_T=st/scale;SAFE_B=sb/scale;
  SPAWN_Y=SAFE_T+70;const fieldH=H-SAFE_T-SAFE_B;LINE_Y=SAFE_T+LINE_RATIO*fieldH;BTN_Y=SAFE_T+BTN_RATIO*fieldH;}
 cv.style.width=W*scale+'px';cv.style.height=H*scale+'px';cv.width=Math.round(W*scale*dpr);cv.height=Math.round(H*scale*dpr);}
addEventListener('resize',resize);resize();
const params=new URLSearchParams(location.search),DEMO=params.has('demo'),AT=+(params.get('at')||0);
let seed=1;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function fold(u){let p=u-XMIN,k=Math.floor(p/SPAN),m=p-k*SPAN;if(m<0)m+=SPAN;return {x:(k&1)?XMAX-m:XMIN+m,k};}

