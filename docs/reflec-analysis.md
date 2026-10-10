# REFLEC BEAT 시리즈 조사 보고서 (dgb용) — v2

> **기준판(BASELINE): REFLEC BEAT VOLZZA 2 (2016-03).** 시스템·비주얼·메뉴·판정·점수·AR/랭크는 VOLZZA 2 사양을 기준으로 한다. 초대~VOLZZA는 역사/맥락으로만 참조. **悠久のリフレシア는 일절 사용하지 않음** (KEEP 판정, 점수 2배, S 랭크, WHITE HARD 명칭 등 제외 → VOLZZA 2의 SPECIAL 난이도 등으로 대체).

> dgb는 KONAMI 『REFLEC BEAT』 시리즈 **시스템**의 오마주. 에셋·곡·비주얼은 쓰지 않음.
> 표기: ✅ 출처 확인 · ⚠️ 출처 간 불일치/커뮤니티 추정 · ❓ 미확인 · 🛠 dgb 자체 값
> v3: 조사 확장(namu.wiki 13문서, VOLZZA 2 다이렉트 피드 영상 프레임, 공식 HOW TO PLAY 이미지, atwiki 용어집 전문) + 구현 반영. §9 계획은 대부분 구현됨(§16).

## 0. 조사 통계 (실제로 읽은 것 / 실패한 것)
**본문을 실제로 읽은 페이지: 66**
- REFLEC BEAT @wiki(atwiki) **곡 페이지 55개**(6장 표): 각 페이지의 Level/Objects/BPM/Version 표와 [HARD]/[SPECIAL] 공략 코멘트를 추출
- atwiki 시스템/목록 페이지 8개: 用語集(40), ゲーム概要(limelight)(189), plus 개요(209), ゲーム概要(VOLZZA)(1731), groovin'!! 개요(1116), 理論値・JR回収・RDI(558), 収録楽曲(VOLZZA)(1686), 収録楽曲(レベル別)(1711)
- RemyWiki 2개(What_is_REFLEC_BEAT, REFLEC_BEAT), 일본어 위키백과 1개(REFLEC_BEAT)
- 받았지만 본문 검토가 키워드 수준에 그친 atwiki 페이지 7개(448·369·255·147·1644·1724·121) — 근거로 쓰지 않음
- 검색 결과 발췌로만 본 것 3개(VOLZZA 로케테스트 리포트, ゲームカタログ@Wiki VOLZZA, アニヲタWiki ソフラン) — 원문 전체를 읽지 않았으므로 보조 근거로만 표시

**곡 커버리지:** 55곡 (초대 14 · limelight 8 · colette 12 · groovin'!!/Upper 12 · VOLZZA 10 · 悠久のリフレシア 0). 그중 패턴 코멘트가 있는 곡 45, 수치만 있는 곡 10.

**실패한 소스**
| 소스 | 시도 | 결과 |
|---|---|---|
| namu.wiki (REFLEC BEAT, /오브젝트, colette, 수록곡) | WebFetch / curl / 실제 Chrome 헤드리스 / archive.org Wayback API / CDX 검색 | 시간 초과 → Cloudflare 챌린지 → “Sorry, you have been blocked” → 스냅샷 없음(`archived_snapshots: {}`) → CDX 응답 없음(중단). **0페이지** |
| BEMANIWiki (bemaniwiki.com) | curl | 내비게이션만 반환(본문 없음) |
| wikiwiki.jp/bemani | curl | 3.9KB 리다이렉트/차단 페이지 |
| YouTube 보면 영상 설명 | 미시도(시간 우선순위) | — |
| 悠久のリフレシア 곡별 페이지 | atwiki가 VOLZZA 2 시점에 폐쇄(“このwikiは閉鎖済み”) | 리플레시아 곡별 보면 정보 **없음** |
| Google 캐시 | 서비스 종료 | — |

### 0.1 v3 추가 조사 통계
- **namu.wiki 13문서** (별도 캡처, docs/namu/): 리플렉 비트 시리즈 · 리플렉 비트 · 라임라이트 · 콜레트 · 그루빈 · VOLZZA · VOLZZA 2 · VOLZZA_수록곡 · 시리즈_난이도 표기 문제 · 롱잡 · 리듬 게임/용어 (+ 유구의 리플레시아 2문서는 용어/역사 참고만, 시스템 미이식)
- **atwiki 용어集(pages/40) 전문 재독**: 오브젝트·복합형·패턴·테크닉·결과 용어 60여 항목 (§13)
- **atwiki Tips(pages/121)**: 판정·롱·오인식 규칙
- **ゲームカタログ@Wiki** VOLZZA(6719)·VOLZZA 2(7093) 전문
- **KONAMI 공식 VOLZZA HOW TO PLAY** 페이지 4개(index/new/class/custom) + 이미지 11장 (docs/ref/)
- **YouTube 영상 4편 다운로드**(docs/ref/video/): EYac1MFP6JU "[REFLEC BEAT VOLZZA 2] RECORDING TEST" (720×1280 **다이렉트 피드**, 9분 18초 — 크레딧 투입~모드 선택~선곡~3곡 플레이~결과 전체), K0Ae39QX-qE "First entry"(첫 등록 흐름, 캐비닛 촬영), BF2yHHhemgs "プレイ動画"(13분, 손 촬영), G3qDYd7Na_Y "Rebellio HARD". 프레임 18장 추출(docs/ref/frames/, §11)
- 웹 검색 결과 발췌: DJMAX PATTERN LIBRARY(djmaxptn.net/guide), saredo-otogame.com 音ゲー用語, Phigros/DanceRail/maimai/ノスタルジア 위키 용어 항목(즈레·微ズレ·餡蜜 정의 교차 확인)
- 실패: YouTube 고해상도는 JS 런타임(deno) 설치 후에야 받음. VOLZZA 2 전용 공식 how-to 페이지(p.eagate…/volzza2/…)는 404. DC인사이드 리플렉 갤러리 본문은 검색 발췌만.

## 1. 시리즈 연표 ✅[WP][RW]
| 타이틀 | 가동 | 주요 변화 |
|---|---|---|
| REFLEC BEAT | 2010-11-04 | 터치패널·세로 화면·에어하키형 대전. Lv1–10. BASIC엔 TOP 판정점 없음, MEDIUM/HARD는 2TOP. JR 게이지 3칸. **FC 보너스 +100**[RW]. 승리 또는 AR70%(SAVED)로 진행 |
| limelight | 2011-11 | Lv10+. **HARD 3TOP**(중앙 추가), **TOP 롱** 추가[RW]. FC +50 / 1미스 +25 / 2미스 +10. 진행 조건이 **AR 70%**로(승패 무관)[RW] |
| colette (Winter→Spring→Summer→Autumn→All Seasons) | 2012-11~2014-06 | JR 게이지 5칸, **뒤로(아래) 플릭 JR**: 자기 벽에 튕겨 더 빠름[RW]. HARD 게이지 사용 시 게이지 0이면 실패[RW] |
| groovin'!! | 2014-06 | **버티컬 오브젝트**, SPECIAL 난이도, 리플렉 도장, 클리어 게이지 커스텀(페이스/하자드/스텔스)[atwiki 1116] |
| groovin'!! Upper | 2014-11 | **동시치기 표시가 금색 오라 → 금색/초록 테두리**: 통상/버티컬+TOP 혼합이면 초록, 아니면 금색[RW]. Upper 게이지 보너스 |
| VOLZZA | 2015-10 | Lv1–12, **슬라이드 오브젝트**, RENEWAL 보면, 플레이 리포트 그래프, 보너스는 FC/1/2미스로 복귀[atwiki 1731] |
| VOLZZA 2 | 2016-03 | TOP 오브젝트 어시스트, 미스카운트/그루브 보너스 선택, 신곡 전부 SPECIAL |
| 悠久のリフレシア (🚫 dgb 미사용, 기록용) | 2016-12 | **빅뱅**(여러 칸 폭의 가로로 긴 오브젝트), **스위치 롱**(ON 노랑 유지/OFF 보라 회피 반복, WHITE HARD 한정), **KEEP 판정 +1**, 판정점 2배(JUST 6/GREAT 4/GOOD 2), 랭크 **S(98%+)** 추가, BASIC도 좌우 TOP 판정점 표시(오브젝트는 없음)[RW] |
| REFLEC BEAT plus (iOS) | 2011-11 | CPU 10단계, iPad 2인. **아래 JR 미구현**, “JR 외 좌우 쳐내기 불가”, **오브젝트 추월이 AC보다 잦음**, 일부 반사 각도 이상(버그)[atwiki 209] |

## 2. 오브젝트 (원작 사양)
| 종류 | 원작 동작 | 확인 |
|---|---|---|
| 통상(BLACK) | 빨강/파랑에 검은 테두리. **모든 통상 오브젝트는 상대 쪽에서 랜덤 경로로 직진(옆벽 반사 가능)**. 치면 사라짐 | ✅[RW][G] |
| 골드 | 통상과 같고 테두리(외원·내원 사이)가 금색. 치면 상대에게 튕겨감(상대 색 노트가 추가 생성). **JR 가능한 유일한 오브젝트** | ✅[RW][G] |
| TOP | 초록 + 화살표(▼). 판정선 위 판정점(2개, limelight HARD부터 3개)으로 **직진**. 상대에게 튕기지 않음. **위치 고정**(랜덤 아님) — 숨은 커맨드 5-7-3으로 RANDOM/S-RANDOM/S-RAN+ | ✅[RW][G] |
| TOP 롱 | limelight~. TOP+롱 | ✅[RW] |
| 롱 | 꼬리. **시작 타이밍만 판정**, 끝까지 유지, 끝난 뒤 계속 눌러도 무벌점. 도중 이탈은 MISS+감점 | ✅[RW][G] |
| 체인 | 선으로 연결. **통상끼리 또는 TOP끼리만(혼합 불가)**. 같은 지점·같은 시간 간격, 첫 오브젝트와 같은 궤적 보장. 마지막만 롱 가능 | ✅[RW][G] |
| 버티컬 | groovin'!!~. 옆벽 반사 없이 직진. 블랙/골드, 통상·롱·체인 가능 | ✅[RW][G] |
| 슬라이드 | VOLZZA. 지그재그 롱, 판정선 위를 따라 문지름. 연결 오브젝트마다+종점 카운트(판정 JUST 고정?) — 다음 작에서 제거 | ✅[RW] ⚠️판정[atwiki 1731] |
| 빅뱅 🚫(기준판 외, dgb 제거 예정) | 리플레시아. 여러 오브젝트 폭의 가로로 긴 오브젝트, 어디를 쳐도 됨 | ✅[RW] |
| 스위치 롱 🚫(기준판 외) | 리플레시아 WHITE HARD. ON(노랑)은 누르고 OFF(보라)는 닿지 말 것, 반복 | ✅[RW] |
| 동시치기 | 최대 기록 7개 동시(INSOMNIA). groovin'!! Upper부터 테두리: 통상/버티컬+TOP 혼합=초록, 그 외=금색. 롱은 시작점만 표시 | ✅[RW] |

## 3. 판정·점수·AR·클리어
| 항목 | 값 | 출처 |
|---|---|---|
| 판정 | JUST / GREAT / GOOD / MISS. **빈 곳을 쳐도 벌점(POOR) 없음** | ✅[RW][atwiki 189] |
| 점수 | JUST +3, GREAT +2, GOOD +1, MISS −3 (리플레시아 6/4/2·KEEP은 🚫 미사용) | ✅[RW] |
| 롱 감점 | limelight 문서: 놓침·도중 이탈 모두 −3, 이중 카운트 없음 / VOLZZA 문서: 놓침 −6, 도중 이탈은 누른 시간에 따라 −1~−3(롱을 3등분) | ⚠️ 버전 차이 [atwiki 189][atwiki 1731] |
| JR | +10, 상대 JR 미스 −10(합계 −13; LO는 −11~−16). 체인은 첫 오브젝트만 JR 상태 | ✅[RW][atwiki 1731] |
| JR 게이지 증가 | JUST=1 기준, GREAT/GOOD 비율이 **총 노트 수에 따라 다름**: 1–200: 3/5, 1/5 · 201–400: 1/2, 1/4 · 401+: 2/3, 1/3 (MISS 값은 ⚠️ 미검증) | ⚠️커뮤니티 측정[atwiki 558] |
| 이론치 | 노트×3 + 최대JR×10 + 50 | ✅[atwiki 558] |
| AR | **(3J + 2G + g) / (3N)**, 소수 1자리 (= JUST + GREAT×2/3 + GOOD×1/3) | ✅[RW][atwiki 189/1731] |
| 랭크 | S 98%(리플레시아) · AAA+ 95 · AAA 90 · AA 80 · A 70 · B 60 · C | ✅[RW] |
| 보너스 | 초대 FC +100 / limelight~ FC +50·1미스 +25·2미스 +10 / Upper는 게이지 보너스 / VOLZZA 복귀 | ✅[RW][atwiki 1731] |
| 클리어 | 초대: 승리 또는 A(SAVED) · limelight~: AR 70% · HARD 게이지 시 0% 되면 실패 | ✅[RW] |
| 판정 시간창(ms) | **공개 수치 없음** | ❓ |

## 4. 낙하·궤적 메커니즘 (곡 코멘트로 확인된 것)
1. **경로 랜덤**: 통상/골드는 매 플레이 출발점·경로가 랜덤, 벽 반사 가능. TOP·버티컬은 위치 고정 → “당첨/꽝 보면”[G]. 트릴 배치가 “날마다 다름”[透明なエモーション].
2. **체인 = 경로 고정**: 첫 오브젝트와 같은 궤적·같은 간격 보장[RW][G]. 두 체인 트릴에선 **선두가 골드인 체인이 먼저 옴**[KOROBUSHKA].
3. **오브젝트별 속도 차**: 같은 구간인데 오브젝트마다 속도가 달라 뒤섞임[Infinity], 동시치기인데 서로 다른 속도로 내려옴[THE FALLEN], 3연 트릴 체인이 앞 오브젝트를 **추월**[Turii], plus는 추월이 더 잦음[atwiki 209]. → 동시 도착을 유지한 채 **낙하시간이 노트별로 다를 수 있음**.
4. **보면 단위 속도**: BPM과 무관(STULTI는 같은 BPM대보다 훨씬 빠름, 灼熱Beach Side Bunny는 느림)[G][곡 코멘트].
5. **소프란/BPM 변화**: 급변(桜 13–320, London EVOLVED 43–340, STULTI 90–182, JOMANDA 90–195, Proluvies 81–162), **미세 변화**(quaver♪ 182→186, Miseria 의혹), **점진 가속 1박마다 +1**(ΔMAX 100–573), 리타르단도(桜), 체감 2배속 구간(DEADLOCK 184/374), 저속 이후 고밀도(Rebellio).
6. **사이드별 보면/속도 차**: 빨강/파랑 보면이 다를 수 있고 한쪽만 노트가 있는 구간도 있음(총 노트 수는 같음)[RW][GLITTER][perditus]. 한 사이드 트릴이 더 느림[イミテーション].
7. **JR 궤적**: 위(옆벽 2회) / 아래(아래 반사 후 옆벽, 더 빠름) / 수직(반사 없음). TOP은 JR 시 1회 반사(S-RANDOM 시)[G][RW].

## 5. 패턴 어휘 (용어집 + 곡 코멘트)
트릴(체인 2개 교대) · 한쪽 트릴 · 덴im(동시 라인 체인↔동시 TOP 체인, ZZ/STULTI) · 혼합 프레이즈(TOP=베이스·라인=멜로디: STELLAR WIND, TOP 이동 격렬: ARACHNE, 버티컬 축: Cattleya) · 계단(3TOP / 버티컬 32분 계단: V₂, 버티컬 고속 계단: Cattleya) · 종연/쿠시당고(짧은 체인 16분: VALLIS-NERIA, Elemental Creation, Second Heaven) · 축(軸, LO/체인을 누른 채 다른 노트) · LO 구속(十界 3마디, MAD BLAST SP) · 다중 동시 롱(4개: イミテーション, 5개: DEADLOCK/ARACHNE, 2개 연속: OVER THE LIMIT!) · 케이마/삼각/역삼각/사다리꼴/W押し(JOMANDA 3TOP+2) · 상하 트릴(버티컬이 TOP 바로 아래: Miseria, Viden) · 라인↔TOP 16분 교대는 TOP이 먼저(Valanga) · 2TOP “4개 치고 반대편”(STELLAR WIND) · 2TOP 섞인 16분 3연 “통상→TOP→통상”(Sakura Reflection) · 메론 공장(TOP 비율↑) · 버티컬 동시에 TOP이 숨어 옴(V₂) · TOP 롱으로 끝(quaver♪).

## 6. 곡별 표 (55곡, 레벨은 atwiki 표기: BASIC MEDIUM HARD [SPECIAL], VOLZZA 시점 재평가 포함)
| 곡 | 버전 | 레벨 | 오브젝트 수 | BPM | 보면 동작 메모 | 출처 |
|---|---|---|---|---|---|---|
| Infinity | 初代 | 4 6 9 | 171 234 466 | 147 | HARD: 사비 전 LO→단타→동시→TOP2 연결. 16분 3연의 앞 2개가 체인. 초반 16분 12연 긴 체인 직후 2TOP 동시. **같은 구간 오브젝트끼리 속도가 달라 뒤섞여 내려옴**(개별 속도차) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/36.html) |
| JUMPER | 初代 | 2 5 8 | 88 183 315 | 130 | HARD: 통상 3개마다 2TOP이 오는 8분. 녹색 동시 2회. (용어집: 저난도에서 한쪽 사이드는 앞박·다른 쪽은 뒷박 분담) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/42.html) |
| Sakura Reflection | 初代 | 4 8 10 | 200 351 396 | 181 | MEDIUM: 롱 0개·16분 없음·동시 1곳. 2TOP 섞인 16분 3연은 항상 “통상→2TOP→통상” | [atwiki](https://w.atwiki.jp/reflec_beat/pages/76.html) |
| Silence | 初代 | 3 5 8 | 118 186 282 | 175 | 리듬 난. 2TOP 트릴(용어집 예). plus/limelight에서 중반이 3TOP으로 변경 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/81.html) |
| 透明なエモーション | 初代 | 3 6 8 | 183 276 365 | 155 | MEDIUM: ◎▽◎▽ 4분(라인/TOP 교대), 2TOP 다수. HARD: 2TOP 감소, 끝에 체인 3연 트릴 러시. 초반 LO 러시 속도 불안정. 트릴 배치는 운(경로 랜덤) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/99.html) |
| イミテーション語ル死ス | 初代 | 3 6 8 10 | 183 290 419 621 | 206 | HARD: 긴 트릴, 4개 동시, **4개 동시 롱**. BASIC도 동시 다수. 파란 사이드 쪽 트릴 오브젝트가 더 느림(사이드별 속도차). limelight에서 3TOP 추가·“하이스피” 폐지 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/113.html) |
| KOROBUSHKA (Ryu☆Remix) | 初代 | 3 7 10 | 205 401 551 | 175 | HARD: 초반 트릴 연속 — **2개 체인 중 선두가 골드인 쪽이 먼저 옴**. 롱 구간 “롱→3TOP→통상 / 롱→통상→3TOP”. MEDIUM과 HARD의 마지막 2TOP 타이밍이 다름 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/114.html) |
| THE FALLEN | 初代 | 5 7 10 10+ | 265 347 605 746 | 167 | 12분(가바), LO 누른 채 고밀도, 후반 동시 러시. 대인전에서 **동시치기 오브젝트들이 서로 다른 속도로** 내려옴. 오브젝트 크기 −2 옵션 권장 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/116.html) |
| Broken | 初代 | 5 8 11 | 234 371 603 | 148 | 발광부 = 3연/7연 반복 + 가사에 맞춘 롱. 롱을 버려도 AAA 가능. (용어집: 동시치기 섞인 트릴 예) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/118.html) |
| FLOWER | 初代 | 5 7 11 11 | 304 373 713 845 | 173 | BASIC부터 LO 누르며 4분 연속, 체인 트릴 5연, 3개 동시. 후반 발광(용어집) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/134.html) |
| Bad Maniacs | 初代 Lincle LINK第1弾 | 5 8 11 12 | 338 442 748 1009 | 195 | “트릴 특화” 보면. BPM195. SPECIAL 1009 오브젝트 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/175.html) |
| Turii ～Panta rhei～ | 初代 Lincle LINK第1弾 | 3 6 9 | 213 292 522 | 148 | 체인·LO 빈발. HARD 8분 지대의 3연 트릴 체인이 **앞 오브젝트를 전부 추월해 옴**(추월 연출) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/176.html) |
| Second Heaven | 初代 Lincle LINK第1弾 | 4 7 9 | 274 392 514 | 149 | HARD 메인 프레이즈 ●○●●|○●●●… 체인 때문에 16분 3연처럼 보이나 실은 4연. 종연(縦連) 전부 체인으로 연결. 16분 3연의 끝과 다음 세트 처음이 체인으로 이어짐 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/178.html) |
| DEADLOCK | 初代(Ver1.5) | 5 7 10+ | 282 382 676 | 187 | “소프란처럼 노트 속도가 일정하지 않음”. LO 지대는 184, 체감 메인 374(8분 폭포). LO 스위치·트릴 스위치. 개정: 12분 3연 체인 러시에 3TOP 추가, 4개 동시 롱→5개 동시 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/188.html) |
| OVER THE LIMIT! | limelight | 3 6 8 | 164 205 301 | 104-150 | BPM 104-150. 종반 **2개 동시 롱 연속**. 인트로 마지막 LO 판정이 김 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/246.html) |
| quaver♪ | limelight | 5 8 10+ | 370 494 733 | 182-186 | BPM 182→186 미세 소프란. 전반 동시+체인 연속, 중반 롱 2개 동시 폭풍, 186 구간에서 체인 소멸. **마지막은 3TOP 롱** | [atwiki](https://w.atwiki.jp/reflec_beat/pages/298.html) |
| STELLAR WIND | limelight | 4 8 10+ 10 | 195 419 671 671 | 160 | 혼합 프레이즈: **TOP=베이스(4분), 라인=멜로디**. 2TOP “4개 치고 반대편으로 이동”→2번째 사비에서 “8개 치고 이동”. SPECIAL은 TOP 대신 버티컬 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/322.html) |
| VALLIS-NERIA | limelight | 5 8 10+ | 196 420 753 | 185 | LO·3TOP 고밀도+리듬 난, BPM185 **16분 종연 지대**(짧은 체인=“쿠시당고”) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/359.html) |
| 黒髪乱れし修羅となりて | limelight | 3 7 9 | 176 326 563 | 150 | 트릴 위주. 6연 트릴→3TOP 지대 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/362.html) |
| 灼熱Beach Side Bunny | limelight Lincle LINK第5弾 | 5 8 11 | 302 458 843 | 153 | “메론 공장”(TOP 비율 높음). IIDX 스크래치 리듬이 전부 트릴로. **낙하 속도가 꽤 느림**. 개막 LO+TOP 혼합 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/367.html) |
| 天空の夜明け | limelight Lincle LINK第5弾 | 5 8 10+ | 302 485 821 | 150 | 통상과 3TOP을 거의 동시에 치게 하는 배치 다수. “흩뿌림(ばら撒き)”은 속도가 없어 순서 파악 쉬움. 종반 4개 동시 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/368.html) |
| HAERETICUS | limelight Lincle LINK第5弾(FINAL) | 5 8 12 | 304 448 809 | 208 | BPM208, 809 오브젝트. LO·3TOP 대량, 3연 트릴, 멜로디가 없어 3TOP 타이밍 파악 난 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/372.html) |
| GLITTER | colette -Winter- | 5 8 10+ 10 | 237 445 722 722 | 184 | **빨강/파랑 사이드 보면이 다름**(브레이크 전: 빨강 난타, 파랑 롱). FLOWER풍 리듬+16분. SPECIAL: 같은 리듬에서 TOP 대신 버티컬 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/398.html) |
| London EVOLVED | colette -Winter- | 4 8 10 | 180 331 540 | 43-340 | BPM 43-340, 소프란 타이밍/속도 전 난이도 공통. LO 누른 채 트릴, 트릴 끝이 LO와 동시 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/510.html) |
| Valanga | colette -Winter- | 5 8 12 | 261 454 771 | 186 | 브레이크의 2개 LO 중 하나만 김(누르기 전 판별 불가). 12분 2곳. **라인과 TOP의 16분 교대 트릴은 거의 항상 TOP이 먼저**. LO와 동시처럼 보이는 트릴은 실은 LO보다 늦음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/581.html) |
| Sakura Luminance | colette -Spring- | 3 7 10 | 178 324 560 | 170 | 중반 LO 지대 무반응/오인식 주의. 좌TOP LO와 아래 LO가 중앙TOP 바로 아래로 오는 배치(파랑 사이드) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/613.html) |
| ARACHNE | colette -Spring- | 4 8 11 | 140 424 640 | 179 | **TOP 이동이 격렬한 혼합 프레이즈**. 초반·중반 LO 지대, 5개 동시 LO 중 2개가 다음 4개 동시까지 길게 유지 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/640.html) |
| ZZ | colette -Spring- (RUNRUNマラソン) | 4 8 10+ | 184 476 813 | 154 | 트릴 시작점에 동시 섞임, 3열 체인, 동시치기 **상하 트릴**(덴im 예) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/657.html) |
| 桜 | colette -Spring- | 4 7 10 | 84 316 584 | 13-320 | BPM 13-320, 고속/저속 뚜렷한 소프란, 저속 셔플, 빨강/파랑 교대, 리타르단도 2회, BPM300/320 지대 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/677.html) |
| Elemental Creation | colette -Spring- 私立BEMANI学園(FINAL) | 5 8 12 | 217 447 942 | 212 | 942 오브젝트. 최고속 긴 종연, LO 구속 중 트릴, 1분음표 끝 LO+4분 끝 LO, LO+3TOP 섞인 트릴 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/679.html) |
| STULTI | colette -Spring- 私立BEMANI学園(Rb) | 5 8 12 | 215 396 728 | 90-182 | BPM 90-182, **같은 BPM 곡보다 오브젝트가 훨씬 빠름**, 중반 저속 지대 트릴 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/684.html) |
| perditus†paradisus | colette -Summer- | 5 8 12 | 246 479 888 | 172 | 초반 복잡한 LO 지대, **양 사이드가 서로 다른 보면을 계속 주고받음**, 16분처럼 보이는 12분 난타 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/783.html) |
| Zirkfied | colette -Summer- 宇宙戦争(FINAL) | 5 8 12 | 333 490 942 | 210 | 942 오브젝트, BPM210 (코멘트 추출 없음) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/820.html) |
| JOMANDA | colette -Autumn- (RUNRUNマラソン) | 5 8 10+ | 225 497 747 | 90-195 | BPM 90-195, 가속 지대(체감 BPM300)에서 TOP 8분/16분, **5개 동시** 2회, “3TOP 전부+라인 2개” 동시(W押し) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/892.html) |
| Cattleya | groovin'!! | 5 8 10+ | 229 496 810 | 184 | **버티컬 4분 축(軸) 혼합 프레이즈**, VALLIS-NERIA식 3연 체인, 버티컬 고속 계단 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1099.html) |
| Chirality | groovin'!! | 5 8 10+ | 212 424 688 | 201 | 트릴·동시·난타, TOP 타이밍 비틀림, 동시에 케이마(桂馬) 섞임 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1161.html) |
| Proluvies | groovin'!! (MYSTICAL STRIKE) | 5 8 10+ | 165 321 599 | 81-162 | BPM 81-162, **곡 대부분 저속**, 중반 잠깐 가속 후 다시 저속 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1294.html) |
| MAD BLAST | groovin'!! Upper | 5 8 10 12 | 173 296 766 918 | 180 | HARD 766/95초 고밀도, SPECIAL은 전 보면 중 최고 밀도·LO 구속 다수, 트릴 도중 LO 시작 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1488.html) |
| Miseria | groovin'!! Upper | 5 8 12 | 221 407 763 | 184 | STULTI급 빠른 오브젝트, 8분 2개 러시(버티컬+체인/트릴, TOP 2개), **버티컬이 TOP 바로 아래 오는 상하 트릴**, LO 2개 중 하나 짧음, 미세 소프란 의혹 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1499.html) |
| 十界 | groovin'!! Upper | 5 8 10+ | 241 452 749 | 184 | 변박 후 3박자, **3마디 LO 구속** 중 8분 2개 동시·트릴·TOP, 사비 4분 동시 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1570.html) |
| Eclipse Zero | groovin'!! Upper (裏MYSTICAL STRIKE) | 5 8 12 | 326 556 954 | 199 | 954 오브젝트, BPM199 (패턴 코멘트 없음) | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1623.html) |
| HELL SCAPER(kors k Remix) | groovin'!! Upper | 5 8 10+ | 192 380 895 | 190 | 4분 3개 동시 대량, **버티컬 난타**, TOP·축 혼합 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1625.html) |
| V | groovin'!! Upper | 5 8 10 10+ | 300 423 709 1014 | 150 | SPECIAL 1014. (V₂ 코멘트상) “2개끼리/2개+1개” 교대 연타가 대부분 버티컬 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1633.html) |
| V₂ | groovin'!! Upper | 5 8 10+ 10+ | 316 477 1000 1100 | 150 | SPECIAL: HARD의 LO 자리가 **버티컬 32분 계단**으로. 버티컬 비율↓ → 낙하 위치 비고정 증가. **버티컬 동시치기에 TOP이 숨어서** 옴 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1634.html) |
| ΔMAX | groovin'!! Upper | 5 8 10+ | 133 285 533 | 100-573 | BPM 100-573, **1박마다 BPM +1** (점진 가속), 초반 저속은 판정 내기 어려움, 종반은 빠른 대신 보기 쉬움 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1635.html) |
| ∞=Inftrumental= | VOLZZA | 5 8 11 | 244 355 690 | 190 | (VOLZZA) 690 오브젝트, 코멘트 없음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1693.html) |
| JUST AFTER DARK -零- | VOLZZA | 4 6 9 | 150 283 441 | 199 | (VOLZZA) 코멘트 없음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1702.html) |
| Erosion Mark | VOLZZA | 5 7 11 | 200 329 628 | - | (VOLZZA) 기본 구성, 마지막 한손 트릴 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1707.html) |
| Viden | VOLZZA | 5 8 11 | 275 437 806 | - | (VOLZZA) **트릴 + 상하 흔들기**(TOP↔라인) 다수 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1708.html) |
| CODE:1 | VOLZZA | 5 8 11 | 218 314 434 | 145 | (VOLZZA) 코멘트 없음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1709.html) |
| 斬刀鬼 | VOLZZA | 4 7 10 | 117 256 470 | - | (VOLZZA) 코멘트 없음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1713.html) |
| NIRVANA | VOLZZA | 4 7 10 | 172 305 484 | - | (VOLZZA) 코멘트 없음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1715.html) |
| THE LYCANTHROPE | VOLZZA | 4 8 11 | 138 369 670 | - | (VOLZZA) 코멘트 없음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1717.html) |
| XiNΧ | VOLZZA | 5 8 11 | 204 367 738 | - | (VOLZZA) 코멘트 없음 | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1726.html) |
| Rebellio | VOLZZA | 7 10 13 | 337 689 1073 | 234 | 최초 Lv13, BPM234. 저속 구간 전엔 8분 위주, **저속 이후 16분 급증** | [atwiki](https://w.atwiki.jp/reflec_beat/pages/1757.html) |

## 7. 여전히 모르는 것 ❓
- 판정 시간창(ms), 오브젝트 낙하 시간/속도의 실제 값, 반사 각도 산식(“터치한 방향에 따라 반사 방향 변화”만 확인)
- 원작에서 비-체인 노트의 착지 위치가 연속값인지 이산 칸인지(“랜덤 경로”만 확인)
- JR 게이지 MISS 증가량, 1칸 당 필요량
- 슬라이드 오브젝트 판정 상세(“JUST 고정?” 추정)
- (리프레시아는 기준판 제외로 조사 대상에서 뺌)
- 요청서의 “볼차(vortex) 오브젝트”: 어떤 소스에서도 확인 불가(VOLZZA 신규는 슬라이드)
- 곡선(커브) 경로: 확인 불가 — 모든 소스가 “직진 + 옆벽 반사”로 기술
- (namu.wiki: 별도 캡처로 13문서 확보 → §14)
- 판정 시간창(ms) — namu/atwiki/영상 어디에도 수치 없음 (여전히 미상)
- HS 값의 정확한 의미: 선곡 화면에 "254~302"처럼 보면 속도 범위가 표시되고 +50/+100을 더하는 방식[namu VOLZZA 2]. 속도 단위↔낙하시간 환산식은 미상
- TOP 어시스트 마커의 정확한 모양(영상에서 식별 못함)

## 8. 사용자 설계와 원작의 차이 (의도된 것)
- TOP 판정점 → dgb는 좌/우 벽 반원 + 중앙 원(y=462). 원작도 TOP은 **직진**, 위치 고정 → dgb 초록 노트의 “벽 반사 최대 1회”는 원작과 다름(제안: 초록은 직진으로 바꿀지 결정 필요).
- 원작에는 TOP 롱·TOP 체인이 있으나, 사용자 규칙상 **초록은 일반 노트만**(초록 체인/동시는 허용).
- 동시치기 테두리: 원작 Upper(혼합=초록, 그 외=금색) ↔ dgb(전부 빨강=#7a0010, 초록 포함=초록 계열) — 구조는 일치, 색만 다름.
- 착지점: dgb는 6개 고정점(사용자 설계), 원작은 랜덤.

## 9. 구현 계획 (v2 제안 — v3에서 §16대로 구현)
1. **플릭 노트(빨강 전용)**: 토큰 `F`. 빨강 레인에만 허용, 초록/BB 채널에서는 경고 후 일반 노트로 변환. 외형: 빨강 + 흰 쉐브론(▲ 또는 ≫). 판정 = 터치 시작 타이밍(JUST/GREAT/GOOD 창 동일) + 터치 후 250ms 내 24px 이상 이동하면 확정, 이동 없으면 MISS 처리(또는 GOOD 강등 — 결정 필요). 탭만으로는 안 됨. 결과 화면에 “FLICK n/m”.
2. **JR 게이지·금색 오브 제거**: 골드/블랙 구분과 `C/D`의 골드성은 의미가 없어지므로 정리(`1`=일반, `2`는 `1`의 별칭으로 남겨 호환).
3. **초록 = 일반 노트만**: 파서에서 초록 채널의 `V/W/L/K/F/E`는 경고 후 일반 노트로 변환(롱은 머리만 남김), 생성기·데모에서 제거, 체인(`C`)과 동시는 유지.
4. **AR 산식 원작화**: (3J+2G+g)/(3N). 랭크에 S(98%) 추가 여부 선택.
5. **노트별 낙하시간**(원작의 속도 차·추월 재현): 채널 토큰 뒤 속도 접미사 또는 `#SPD` 채널 확장 → 같은 시각 동시치기여도 다른 속도 가능. 체인 경로 고정은 유지.
6. **점진 BPM/속도 변화**: `BP`/`SP`를 박마다 찍는 대신 `#RAMP` 같은 구간 보간 지시자(ΔMAX/桜 리타르단도용).
7. **사이드 개념 없음**(싱글) → 사이드별 차이는 미이식.
8. **롱 감점**: VOLZZA 기준(놓침 −6, 이탈 −1~−3 3등분) 유지 — 현재 구현과 동일.
9. 결정 필요: 초록 노트 경로를 원작처럼 “직진(반사 없음)”으로 바꿀지, 현재(최대 1회 반사) 유지할지.


## 10. 화면 구성·비주얼 실측 (VOLZZA 공식 HOW TO PLAY 이미지) ✅[OF]
출처: https://p.eagate.573.jp/game/reflec/volzza/p/howto/index.html (이미지 howtoplay_play_00/01.png, 사본 docs/ref/). VOLZZA 화면 = VOLZZA 2와 동일 레이아웃(VOLZZA 2 공식 사이트는 신곡 목록만 제공).
측정(필드 내부 폭=100% 기준, 저해상도 이미지라 ±1–2%p ⚠️):
| 요소 | 원작 실측 | dgb 현재 | 비고 |
|---|---|---|---|
| 필드 | 세로형 화면, 좌우 하늘색(시안) 네온 벽 | 360×640 | 일치 |
| 자기 판정 라인 | 분홍 2중선 띠, 필드 높이의 ~89% 지점, 띠 두께 ≈ 폭의 9% | y=602(94%), 두께 56(15.5%) | dgb가 더 아래·더 두꺼움 |
| 상대 라인 | 파랑, 높이 ~11% 지점 | 제거(싱글) | 사용자 결정 |
| 일반 오브젝트 | 원형, 지름 ≈ 폭의 10% (≈36px@360) | 지름 56(15.5%) | **원작은 더 작음** — 사용자 지시(지름=밴드 두께)는 원작과도 "오브젝트≈띠 두께"라는 점에서 일치 |
| 오브젝트 색 | 자기에게 오는 것=분홍/마젠타 테두리, 상대 쪽=파랑. VOLZZA 슬라이드 오브젝트는 원 안에 ▶/◀ 화살표 | 빨강/초록 단색 | 의도된 차이 |
| 롱 오브젝트 | 오브젝트 지름 폭의 노랑~황금색 반투명 띠가 궤적을 따라 이어짐 | (계획) | 시각 참고 |
| 2TOP | 좌우 벽 안쪽(벽에서 폭의 ~15% 떨어짐), 높이 ~69%(라인 위 ~20%) 원형 마커, 아래 반쪽=자기색(분홍) | 좌우 반원 벽 부착 y=462(72%) | 높이 거의 일치. 원작은 벽에 붙지 않은 완전한 원 |
| 3TOP(중앙) | 중앙 상부 | 중앙 원 y=462 | dgb는 같은 높이 |
| 점수 | 화면 중앙에 크게(상대=파랑 위, 자기=분홍 아래), 노트 뒤에 그려짐 | 좌상단 | 개선 후보 |
| CLEAR GAUGE | TOP 아래·라인 위 가로 막대: 보라색 바+노란 "CLEAR ZONE!!" 구간, 우측 AR % (예 80.4%), 아래 MISS/GOOD/GREAT/JUST 카운트 | 없음(결과만) | **구현 후보 1순위** |
| JUST REFLEC GAUGE | 점수 우측 작은 막대+숫자 | 제거됨 | — |
| 클리어 조건 | "70%를 넘으면 스테이지 클리어" (공식 문구) | AR≥70 | 일치 |
| 배경 | 어두운 회색 + 사선 "REFLEC BEAT VOLZZA" 로고 텍스처 | 단색 | 선택 |
| 상하단 프레임 | 상단: 곡명+난이도(BASIC 녹색) / 하단: 플레이어 이름·아이콘 | 없음 | 메뉴 참고 |
공식 커스터마이즈 항목(VOLZZA): 플레이어 아이콘, 칭호(通り名), 오브젝트 샷 음(DEFAULT1–3, groovin', CLAP, TAMBOURINE, TENNIS, HOCKEY, JAPAN, SWORD, STEEL, LIGHT, FIREWORKS 등), 볼륨, 선곡 BGM, 스테이지 프레임, 폭발 이펙트. 선곡 화면 하단 버튼: OPTION / SELECT / カスタマイズ / マッチング待ち一覧 / 楽曲スコア.
VOLZZA 2 추가 [gcmatome 7093]: 상대 오브젝트 표시 ON/OFF(plus 기능 역수입), **하이스피드 옵션**, 클래스 체크(검정) 모드, 마이코스 모드.


### 10.3 TOP 행 ↔ 판정 라인 거리 실측 (dgb 버튼 높이 근거)
| 이미지 | 판본 | 측정 | (라인−TOP)/필드높이 | (라인−TOP)/필드폭 |
|---|---|---|---|---|
| 공식 HOW TO PLAY howtoplay_play_01.png (docs/ref/crop.png, 3배 확대) | VOLZZA(=V2 레이아웃) | 필드 y85–855(770), 폭 495, TOP y≈620, 라인 y≈773 | **0.199** | 0.31 |
| YouTube dQzCy1OXrlc 썸네일 (Spica MEDIUM) docs/ref/yt_spica_v2.jpg | **VOLZZA 2** | 화면 일부만 촬영(원근 있음): 폭 ≈610, TOP y≈340, 라인 y≈515 | 측정 불가(필드 상단이 잘림) | ≈0.29 |
| YouTube eW1A5Xj3DVY 썸네일 (Rebellio) docs/ref/yt_rebellio_volzza.jpg | VOLZZA | 폭 ≈545, TOP y≈303, 라인 y≈483 | 측정 불가 | ≈0.33 |
결론: 전체 필드가 보이는 이미지는 공식 이미지 1장뿐 → 높이 대비 **≈0.20**. 폭 대비 비율(0.29–0.33)은 3장 모두 일관되어 교차 확인됨 ⚠️(사진은 원근 왜곡). dgb는 `BTN_Y = LINE_Y − 0.20 × 필드높이` 적용 (필드높이 = 화면높이 − 세이프영역).

### 10.1 판정 체감 규칙 (atwiki 공략/FAQ, 커뮤니티) ⚠️
- 터치 위치: 오브젝트가 라인에 닿는 **그 위치**를 터치(라인 아무데나가 아님). 판정 영역은 관대해서 오브젝트 반 개 정도 어긋나도 반응. 
- 롱: 끝 약간 전(≈1/4박)에 떼도 성공으로 취급된다는 보고. 
- 골드(JR 가능) 오브젝트: JUST 후 슬라이드(플릭) 방향으로 반사.
- ズレ(즈레): 곡마다 미세한 타이밍 어긋남 체감(빠름/느림) 용어; 시스템적 오프셋 옵션은 확인 못함 ❓.

### 10.2 dgb 반영 제안 (미구현)
1. HUD에 VOLZZA식 CLEAR GAUGE(실시간 AR%, 70% 클리어 존, 판정 카운트) — TOP 버튼 아래·밴드 위에 배치.
2. 점수를 화면 중앙 큰 반투명 숫자로(노트 뒤).
3. 노트 지름 축소 옵션(원작 ≈36px) — 기본은 사용자 결정(56) 유지.
4. 하이스피드 옵션(VOLZZA 2 기준 기능).
5. 롱은 황금색 반투명 띠 표현.
6. 기준판 정리: 엔진/포맷의 `BB`(빅뱅) 토큰은 리플레시아 기능이므로 제거(파서는 경고 후 일반 노트로 변환) — 코드 변경 보류 중.

## 출처 약어
- [OF] KONAMI 공식 VOLZZA HOW TO PLAY: https://p.eagate.573.jp/game/reflec/volzza/p/howto/index.html , custom.html
- [gcmatome] https://w.atwiki.jp/gcmatome/pages/7093.html (VOLZZA 2), 6719.html
[WP] https://ja.wikipedia.org/wiki/REFLEC_BEAT · [RW] https://remywiki.com/What_is_REFLEC_BEAT · [G] 用語集 https://w.atwiki.jp/reflec_beat/pages/40.html · [atwiki N] https://w.atwiki.jp/reflec_beat/pages/N.html · ソフラン https://w.atwiki.jp/aniwotawiki/pages/32872.html · VOLZZA 로케테스트 https://ariesu.com/locationtest/reflecbeat_volzza.htm · ゲームカタログ https://w.atwiki.jp/gcmatome/pages/6719.html


## 11. 영상 프레임 실측 (VOLZZA 2 다이렉트 피드) ✅[V]
출처 [V] = https://www.youtube.com/watch?v=EYac1MFP6JU (720×1280 세로, 화면 직접 녹화). 프레임: docs/ref/frames/EY_*.jpg (파일명 = 초).
| 프레임 | 화면 | 관찰 |
|---|---|---|
| EY_002 | PIN 입력 | 숫자 키패드, 파란 확인 버튼 |
| EY_013 | CAUTION | 주의 화면(주황/흑 VOLZZA 2 테마) |
| EY_024 | **MODE SELECT** | 세 개의 사선 배너: NORMAL MODE / CLASS CHECK MODE / MY COURSE MODE(4ROUND). 하단 INFORMATION 배너, 우상단 남은 시간(23) |
| EY_120 | **플레이 HUD** (CODE:1 HARD) | 아래 표 참조 |
| EY_175 | 플레이 (노란 슬라이드 오브젝트 3줄) | 슬라이드=노란 반투명 띠 + ▶ 화살표 오브젝트 |
| EY_194 | RESULT 전환 | 사선 "RESULT" 와이프 |
| EY_200 | **RESULT** | 상단: 자켓·ROUND 1ST·MUSIC·ARTIST·DIFFICULTY HARD·레벨 11·[마이리스트 등록]·[GO TO NEXT]. 중단: "CLEAR!!" 띠, SKILL POINTS(MUSIC/TOTAL), YOU 점수 1366 · NEW RECORD! 96.0% · AAA+, RIVAL(CPU) 1352. 하단: 인포메이션(파스텔군 코멘트), RESULT OPTION 버튼(상세 스코어/점포 랭킹/타겟 프렌드) |
| EY_220 | **MUSIC SELECT** | 아래 표 참조 |
| EY_230 | LET'S PLAY!! 와이프 | |
| EY_418 | ARE YOU READY? | 원형 배지 |
| EY_470 | 플레이 (Broken HARD, 자기=파랑 사이드) | 롱/골드 관찰 |
| EY_530/545 | CLEAR!! → 결과 | |

### 11.1 플레이 화면 실측 (EY_120/EY_470, 표시 576×1024 기준, 필드 내부 폭 550·높이 855)
| 요소 | 측정 | 비율 | dgb |
|---|---|---|---|
| 자기 판정선 | y=825 (필드 상단에서 765) | 높이의 **89.5%** | 하단 고정(밴드 하단−38px) |
| 판정 밴드(분홍 2중선) | 803–847 → 두께 44 | 폭의 **8.0%** | 56 (15.5%) |
| 통상 오브젝트 지름 | ≈48–50 | 폭의 **8.7–9.1%** | 56 (기본) / OPTION에서 44·34 선택 |
| 오브젝트 ≈ 밴드 두께 | 50 vs 44 | ≈1.1 | **사용자 규칙(지름=밴드)과 일치** |
| 3TOP 판정점 | y=655, x=95/288/478, 지름≈54 | 라인 위 170 = 필드높이의 **0.199**, 좌우는 벽에서 폭의 15% 안쪽 | 0.20 적용, 좌우는 벽 반원(사용자 설계) |
| 상대 판정선(대칭 추정) | ≈ 필드 상단에서 10% | 출현 지점 | SPAWN_Y = 안전영역+70 (≈11%) |
| 점수 | 화면 중앙, RIVAL(위)·YOUR(아래) 반투명 큰 숫자, 노트 뒤 | | 중앙 반투명 YOUR SCORE |
| CLEAR GAUGE | TOP 행 오른쪽 위 작은 박스 "CLEAR GAUGE 96.4%" 보라 바 | | TOP 행과 밴드 사이 가로 바 + % |
| 판정 카운트 | TOP 행 아래 JR 게이지 박스 안 "MISS 0004 GOOD 0001 GREAT 0005 JUST 0182" | | 같은 위치에 카운트(JR 게이지는 제거) |
| 콤보 | 판정선 위 오른쪽, 판정 글자("JUST", 노랑 테두리) + 숫자 + COMBO | | 밴드 위 중앙 |
| GROOVE BONUS 게이지 | 좌측 2개(상대/자기) | | 미이식 |
| 상단 바 | ROUND(1ST/2ND/FINAL) · 곡명 · DIFFICULTY | | 곡명·난이도·레벨 좌상단 |
| 하단 바 | 플레이어 카드(아이콘·점포·이름) | | 없음 |
| 오브젝트 모양 | 원+금속 테두리, 중앙에 "Rb" 로고 / 슬라이드는 ▶◀ / 골드는 노란 외곽 링 | | 단색 원(사용자 규칙) |
| 롱 오브젝트 | **반으로 자른 오브젝트를 길게 늘인 캡슐, 자기 사이드 색 반투명**(EY_470 파랑). namu VOLZZA: "롱 오브젝트가 콜레트까지의 형태로 돌아왔다" | | 빨강 반투명 캡슐(지름 폭)으로 수정 |
| 슬라이드 오브젝트 | 노란 반투명 굵은 띠(EY_120, 175) | | 미이식(VOLZZA 전용, 다음 작 폐지) |
| 히트 이펙트 | 판정선 위 링 + 삼각 마커, 커스텀 "폭발 이펙트"(장미/꽃 파티클) | | 링 확산 + 플릭 시 위쪽 스파크 |
| 벽 | 금색(VOLZZA 2 프레임) 세로선 | | 연한 시안 세로선 |

### 11.2 MUSIC SELECT 실측 (EY_220)
- 상단 정보 패널: 자켓(좌) · ROUND "2ND" · MUSIC · ARTIST · DIFFICULTY(HARD) · BPM 145 · **스킬 레이트 3칸(16/40/71 = B/M/H, 선택 난이도 원)** · [레벨 표시로 변경] · 큰 [이 곡으로 플레이!!] 버튼. 우상단 남은 시간(60).
- 좌측: **HIGH SPEED OPTION**(+100, "254~302" = 보면 속도 범위) · MUSIC SCORE(VOLZZA2 / VOLZZA 이전 비교).
- 정렬 바: "스킬 레이트 순 정렬 변경" + 90자리/80/…/10자리/1자릿수 점프 버튼.
- 폴더 경로: 폴더 리스트 ▸ 버전 ▸ groovin'!! (계층형 폴더). 공식 HOW TO PLAY: 폴더 = おすすめ/レベル/バージョン/ジャンル/シェアボックス/マイリスト [OF new].
- 곡 카드 3열 그리드: 자켓, MUSIC, ARTIST, SCORE/MISS/AR, 랭크(AAA), DIFFICULTY·레벨 숫자, 세로 리본(CLEARED / FULL COMBO / 1MISS / HARD CLEARED).
- 하단: 커스터마이즈 / 매칭 대기 리스트 / 곡 스코어.
- 선곡 재탭 = 결정 (카드를 다시 누르면 플레이).
→ dgb: 세로 1열 카드(곡명·아티스트·BPM 또는 베스트 AR/랭크/CLEARED·FULL COMBO), 난이도 4색 칩, 폴더 탭(전체/생성곡/데모/불러온 곡), 정렬(기본/레벨/이름), 하단 OPTION/불러오기/START, 선택 카드 재탭=시작. HS 상태는 헤더 오른쪽.

### 11.3 기타 화면
- MODE SELECT(EY_024, K0Ae39QX-qE): NORMAL / CLASS CHECK / MY COURSE. dgb는 1모드(타이틀→선곡).
- 첫 등록(K0Ae39QX-qE): 카드/PIN → CAUTION → 아이콘·이름 → 모드 선택 → 선곡(폴더 격자) → 옵션 패널(여러 줄의 토글: 오브젝트 샷 음, 볼륨, 게이지 등) → 매칭 대기 미니게임 REFTIS → LET'S PLAY!!
- 결과 후 흐름: RESULT → (GO TO NEXT) → 다음 ROUND 선곡 (3곡: 1ST/2ND/FINAL).

## 12. VOLZZA 2 옵션·시스템 (namu VOLZZA 2 / gcmatome 7093) ✅
| 기능 | 내용 | dgb |
|---|---|---|
| 하이스피드 | 0/+50/+100. BPM 곱이 아니라 "게임 화면을 늘여 일정 스크롤을 더해주는 방식". 노멀 모드만 | OPTION: 낙하시간 ×1/(1+HS/100) (🛠 해석) |
| TOP 어시스트 | 전작에서 삭제된 탑노트 예고 마커 부활, ON/OFF | 상시: 목표 지점 수축 링(모든 노트) |
| 보너스 선택 | 미스카운트 보너스 / 그루브 보너스(총점 동일) | 미스카운트 보너스만 |
| 스코어&콤보 표시 | 스탠다드 / 콤보 메인 | OPTION 중앙 표시 SCORE/COMBO |
| 라이벌 오브젝트 표시 | ON/OFF (시리즈 최초) | 상대 없음(싱글) |
| 스킬 레이트(1–90)·스킬 포인트 | (점수/이론치)×스킬레벨×100 | 미이식 |
| 콤보 색 | 미스 0이면 노랑, 미스 후 흰색 | 미이식(후보) |
| 역대 점수 비교 | 자켓 왼쪽에 V2/이전작 점수 | 베스트 기록(localStorage) 카드 표시 |
| 오브젝트 크기 | limelight: 기본/스몰/스몰+/스몰++/라지 커맨드, 판정 불변 → colette부터 커스터마이즈 [namu 라임라이트/콜레트] | OPTION 기본56/스몰44/원작비34 (시각만) |
| AR 게이지 종류 | 노멀/페이스(현재까지)/하자드/스텔스 [namu 그루빈]; VOLZZA 하드/슈퍼하드 게이지 + 결과 그래프 [namu VOLZZA] | 노멀(누적 AR) |
| 타이밍 지원 기능 | limelight: 터치 타이밍 표시가 오브젝트와 함께 내려옴 [namu 라임라이트] | 목표 수축 링 |
| 그레이드 | VOLZZA 2까지 그레이드별 선곡 제한 | 없음 |

## 13. 용어집 (한국어 · 日本語) — 리플렉 맥락
출처: [G]=atwiki 用語集 https://w.atwiki.jp/reflec_beat/pages/40.html · [T]=atwiki Tips pages/121 · [NT]=namu.wiki/w/리듬 게임/용어 · [NL]=namu.wiki/w/롱잡 · [DP]=djmaxptn.net/guide · [SO]=saredo-otogame.com/basic/otogame-word · [PH]=wikiwiki.jp/phigros 用語解説 · [MM]=gamerch maimai 用語集
| 한국어 | 日本語 | 뜻 (리플렉에서) | 출처 | dgb |
|---|---|---|---|---|
| 오브젝트/노트 | オブジェクト(オブジェ) | 노트. 에어하키의 퍽 | [G] | 노트 |
| 통상/검정 오브젝트 | 通常オブジェクト(黒オブジェ) | 판정선에서 터치하면 사라짐 | [G] | 빨강 통상 |
| 금 오브젝트 | ゴールドオブジェクト(金オブジェ) | 외원·내원 사이가 금색. 치면 상대에게 반사, JR 가능 | [G] | 폐지(JR 제거) |
| 탑 / 투탑·쓰리탑 | TOPオブジェクト / 2TOP・3TOP | 녹색 + ▼, 판정선 약간 위 판정점(2~3개)에 직진, 위치 고정. "메론"(緑で丸い) | [G] | 초록 버튼 노트 |
| 롱 | ロングオブジェクト(LO) | 시작점 도달~끝점까지 누름. 끝 근처(약 1/4박 전)면 떼도 됨. 도중 이탈 MISS+추가 감점 | [G][T] | 구현 |
| 버티컬 | バーティカル(VO) | groovin'!!~. 벽 반사 없이 수직, 위치 고정, 원 안에 v | [G][namu 그루빈] | `V` |
| 체인 | チェイン | 선으로 연결, 첫 오브젝트와 같은 궤적·같은 곳. 롱은 체인 끝에만 | [G] | 체인/연결선 |
| 동치(동시치기) | 同時押し | 금색 빛(Upper~ 테두리)으로 표시. 표시 없는데 겹쳐 보이면 微ズレ | [G][NT] | 동시치기 테두리 |
| 즈레 / 미세즈레 | ズレ / 微ズレ | ① 일반: 정박에서 약간 어긋난 배치(24·32분이 섞임), 동시처럼 보이나 미세하게 시차 [NT][DP][SO][PH]. ② 리플렉 커뮤니티에선 곡의 판정 타이밍 자체가 어긋난 것도 "遅ズレ" 등으로 부름(예: スパンコール 遅ズレ 수정) [T] | 생성기 패턴·포맷 표기법 |
| 어긋나게 치기/앙미츠 | ズレ押し・餡蜜(あんみつ) | 미세하게 다른 타이밍을 일부러 동시에 처리. 반대 = 逆餡蜜 | [G][MM] | — |
| 롱잡 | LO絡み(ロング絡み)・軸押し | 롱을 누른 채 다른 노트 처리. 리플렉은 "LO絡み" | [NL][G 軸] | 생성기 롱잡 패턴 |
| 축 | 軸(押し) | 체인/롱을 축으로 단타가 섞이는 배치 | [G] | 롱잡 패턴 |
| 연타/세로연타 | 縦連打(縦連) | 같은 위치 연속. 리플렉에선 보통 1개의 체인. 짧은 간격 체인은 "串団子·芋虫" | [G] | 체인 |
| 트릴 | トリル | 시차로 오는 2개 체인을 교대로. 片トリル, 2TOP 트릴 등 | [G][NT] | 생성기·데모 |
| 데님 | デニム | 트릴 파생: 동시 통상 체인과 동시 TOP 체인을 교대 연타 (ZZ·STULTI HARD). 어원 beatmania DENIM | [G][DP] | 생성기 데님(1:1 교대) |
| 계단 | 階段 | 오브젝트가 계단 모양으로 이어짐. groovin'!! 버티컬로 고도화 | [G][namu 계단] | 생성기·데모 |
| 혼프레 | 混合フレーズ(混フレ) | 두 리듬이 동시에(TOP/라인 별도 프레이즈) | [G] | — |
| 계마/삼각/역삼각/사다리꼴 | 桂馬・三角・逆三角・台形押し | 통상1+TOP1 / 통상2+TOP1 / 통상1+TOP2 / 통상2+TOP2 동시 | [G] | 동시치기로 표현 가능 |
| 발광 | 発狂 | 밀도가 급격히 오르는 구간 | [G] | — |
| 소프란 | ソフラン | 곡 중 속도 급변 | [G] | `SP`/`BP` |
| 당첨/꽝 보면 | 当たり/はずれ | 랜덤 경로라 배치 운 | [G] | PATH RANDOM |
| 난타 | 乱打 | 흩어져 내려오는 배치 | [NT] | — |
| 까기 | (한국 커뮤 속어) | 롱/노트를 "깐다"= 처리한다. 한국 리겜에서 동사로 쓰임 ⚠️ 정확한 리플렉 전용 정의 출처 없음 | ❓ | — |
| 오폭/오인식 | 誤爆・誤反応(暴発) | 적외선 패널 XY 교차점이 눌린 것으로 인식(TOP+LO 등) — AC 고유 | [G][T] | 해당 없음(정전식) |
| 스카루/빠짐 | スカる/抜ける | 쳤는데 MISS / 롱이 도중에 끊김 판정 | [G] | — |
| 크로스 | クロス打ち | 좌TOP을 오른손 등 팔 교차 | [G] | — |
| 북두신권 | 北斗神拳 | 검지만으로 연타 | [G] | — |
| 그레·구도 | グレる・グドる | GREAT/GOOD이 나다 | [G] | — |
| 새 | 鳥(AAA), 鳥+(AAA+) | 랭크 속칭 | [G] | 랭크 |
| 엑셀 | エクセ | 전부 JUST, AR 100% | [G] | — |
| 1끊 | 1切り | MISS 1개 | [G] | 1미스 보너스 |
| 노클노미 | ノークリアノーミス | 풀콤인데 AR<70% FAILED | [G] | 가능(규칙 동일) |
| 보더/역보더 | ボーダー/逆ボーダー | 70.0% 턱걸이 / 69.9% | [G][NT] | — |
| 회수 | ゲージ回収 | JR 쏘기(점수) | [G] | 폐지 |
| 이론치 | 理論値 | 엑셀+JR 전부회수(+보너스) | [G] | 3N+50 |

## 14. namu.wiki 통합 요약 (cite: namu.wiki/w/<제목>)
- **리플렉 비트 시리즈**: 21인치 적외선 터치(최대 5점, 그루빈부터 7점), 고스트 터치 보정 없음 → 3TOP·롱에서 오인식. **"채보에 지정된 속도가 없으며 오브젝트마다 속도가 다르게 내려온다. 정해진 패턴이나 키음도 없다."** 초대작은 판정이 짜고 라임라이트에서 완화·클리어 기준 표시. VOLZZA 2에서 시리즈 최초 상대 오브젝트 숨김.
- **리플렉 비트(초대)**: 통상(검정)/금색/롱/체인/2TOP(녹색 ○ 안 △, MEDIUM부터, 판정선 앞쪽 두 곳)/JR. 판정 JUST+3 GREAT+2 GOOD+1 MISS−3, JR +10(맞으면 −10 −3). 초대 롱은 끝에서 한 번 판정, 조금만 일찍 떼도 MISS ⚠️(이후 작품에서 완화: atwiki Tips "1/4박 전이면 OK").
- **라임라이트**: AAA+(95%), 10+ 추가, **타이밍 지원 기능**(BASIC Lv4까지 전 오브젝트), 오브젝트 사이즈 커맨드(기본/스몰/스몰+/스몰++/라지, 판정 불변), 2TOP 랜덤 커맨드 5-7-3, 게이지 스타일 스탠다드/클래식.
- **콜레트**: JR 상/하 슬라이드, 게이지 5칸, **클리어 게이지 TYPE-B**(실시간 평균 AR), 결과 화면에 최대 콤보·최대 JR 표시, 정렬 드롭다운.
- **그루빈**: 버티컬(원 안 V, 위치 고정), 롱 모양을 "오브젝트+꼬리"로 바꿨다가 구분 어려움 불만, 6점 롱·6/7점 동시, AR 게이지 노멀/페이스/하자드/스텔스, 정렬 순서 레벨→랭크→미스카운트→장르→곡명→아티스트, SPECIAL 신설.
- **VOLZZA**: 그루브 게이지 클리어를 로케테스트 후 철회(AR 70% 유지), 슬라이드 오브젝트, 하드/슈퍼하드 게이지, 결과 게이지 그래프, **롱이 콜레트 형태(반 자른 오브젝트를 늘인 모양)로 복귀**, 폴더 제, 튜토리얼 축소.
- **VOLZZA 2**: §12 표.
- **난이도 표기 문제**: 레벨 10+ → 11/12 분할(VOLZZA), Rebellio 13 등 인플레(dgb 생성기는 최대 12).
- **롱잡**: 리플렉 = "LO絡み". **리듬 게임/용어**: 동치=同時押し, 즈레=정박에서 약간 어긋난 패턴(24·32분 혼입), 난타, 쉴드(롱 앞뒤 단노트), 알약 등.
- 리플레시아 2문서: 빅뱅·스위치 롱·KEEP 등 확인했으나 **미이식**.

## 15. 여전히 모르는 것 (v3) ❓
- 판정 시간창(ms) — 모든 출처에 수치 없음 → dgb ±50/100/150 🛠
- HS "254~302" 속도 단위와 낙하시간의 환산
- 플릭 판정: 원작 JR 슬라이드의 최소 이동거리/시간 수치 없음 → dgb 22px/280ms 🛠
- TOP 어시스트 마커의 모양(영상 해상도로 식별 불가)
- "까기"의 리플렉 전용 의미(한국 커뮤 출처 미확보)
- 오브젝트별 속도 차의 실제 분포(“오브젝트마다 속도가 다르다”만 확인) → dgb는 `SP` 채널로 보면 단위만
- 콤보 색 노랑/흰(V2) 외의 콤보 연출 상세

## 16. v3 구현 내역 (dgb/index.html · dgb.html)
1. **JR 완전 제거**: 게이지·금색 오브·플릭 JR·자동 JR 옵션·결과 JR 수 삭제. 골드/블랙 구분 폐지(토큰 `1/2/4` 모두 통상).
2. **플릭 오브젝트(빨강 전용)** `F`: 빨강 + 흰 이중 쉐브론(︽). 밴드 터치다운 후 280ms 안에 22px 이상 이동 → 터치다운 시각으로 판정. 탭만으로는 안 맞음(놓치면 MISS). 키보드 Shift+Space. 결과에 FLICK n/N.
3. **초록 = 통상만**: 파서가 `L/K/E/V/W/F`를 경고 후 변환, `BB`(빅뱅)는 빨강 통상으로. 생성기·데모에서 제거.
4. **AR** = floor((3J+2G+Gd)/(3N)×1000)/10, 랭크 AAA+/AAA/AA/A/B/C, 클리어 70%, 미스카운트 보너스 50/25/10.
5. **롱**: 끝 1/4박 전부터 떼도 성공, 빨강 반투명 캡슐(영상 실측).
6. **메뉴 (VOLZZA 2 흐름을 세로 1열로)**: TITLE(TAP TO START) → MUSIC SELECT(폴더 탭·정렬·곡 카드·4난이도 칩/레벨·베스트 기록·OPTION·불러오기·START, 카드 재탭=시작) ⇄ OPTION(하이스피드 OFF/+50/+100, 오브젝트 크기 56/44/34, 중앙 표시 SCORE/COMBO, 판정 오프셋, 자동 플레이, 차트 불러오기) → PLAY → RESULT(CLEAR!!/FAILED 띠, FULL COMBO, NEW RECORD, AR·RANK·게이지, 판정 4종, MAX COMBO, FLICK, SCORE+미스카운트 보너스=TOTAL) → MUSIC SELECT.
7. **HUD**: 중앙 반투명 YOUR SCORE(또는 COMBO), TOP 행과 밴드 사이 CLEAR GAUGE(누적 AR, 70% 클리어 존)+판정 카운트, 좌상단 곡명·난이도 색·레벨, 우상단 점수·남은 시간·HS.
8. **곡 목록**: 생성곡 3개(BPM 120/150/174, 4난이도 Lv 3–12, 시드 고정 → 레벨 안정, 경로는 매번 랜덤) + 데모(MEDIUM 6) + 불러온 곡.
9. **생성기 패턴**: 체인·트릴·계단(버티컬/비버티컬)·데님·**즈레(1/32)**·**롱잡**·플릭 연속·동시치기·소프란.
10. **비율 적용 판단**: 원작 오브젝트 ≈ 폭의 9%, 밴드 ≈ 8% → "지름 = 밴드 두께"라는 사용자 규칙과 **비율상 일치**. 다만 절대 크기(56px = 15.5%)는 원작보다 1.7배 큼 → **충돌**: 사용자 고정값 56을 기본으로 유지하고, 원작 비율(34px)은 OPTION으로만 제공(밴드도 같이 축소, 터치 영역은 56 고정). TOP 높이 0.20은 영상으로 재확인(0.199).


## 17. v3.1 — 초록(TOP) 무반사 직선 (사용자 결정)
원작 TOP은 직진·위치 고정[G][RW] → dgb 초록 노트도 벽 반사 0회. 출발 x는 좌=왼쪽 절반, 우=오른쪽 절반, 중앙=가운데 160px. 초록 스트림은 한 경로 공유, 놓친 초록은 같은 직선 방향으로 화면 밖. 빨강은 기존(최대 1회 반사). §8·§9의 '결정 필요' 항목 해소.
검증: 데모+생성 차트 20개, 노트 2990개(초록 765) — 초록 경로가 필드 밖/반사 0, 목표 불일치 0, 초록 체인 145개 경로 일치.

## 18. v3.2 — 초록 노트 벽 통과
- 사이드 목표를 반원 중심(x=0 / x=W)으로 변경(기존 x=R / W-R). 초록은 어느 시점에도 벽 반사·클램프가 없으며, 미스 시 같은 직선으로 화면 밖으로 나간다. 판정 링 이펙트는 버튼 중심.
- 검증: 21개 채보 2990노트(초록 765) — 목표 이탈 0, 반사 0, 스트림 경로 불일치 0.

## 19. 트릴(トリル) 조사 — v3.3 (기준판 VOLZZA 2, 이전작 참고)
**정의**
- atwiki 용어집: 「時間差で来る2本のチェインオブジェクトを交互に叩かせるような譜面」. 1개 체인 + 체인 아닌 통상 2개 이상을 교대로 치게 하는 것은 「片トリル」. 「短いものから長いもの、2TOPから同時押しまで多種多様」 — 예: 짧은 것 透明なエモーション, 긴 것 イミテーション語ル死ス, 2TOP Silence, 동시치기 포함 Broken, 片トリル 天空の夜明け, 종합 STULTI. [https://w.atwiki.jp/reflec_beat/pages/40.html]
- 같은 문서 체인 항목: 체인으로 이어진 오브젝트는 **매 플레이 첫 오브젝트와 같은 궤적**이 보장되며, 「2つのチェインオブジェクトが時間差で飛んできて、いわゆる交互押し(トリル)になる譜面も存在する」. 「3TOP同士ももちろんの事、通常と3TOPを交互に押させる譜面も存在する」.
- ja.wikipedia: 체인 오브젝트 설명에 「2本以上のチェインを違うタイミングでタッチさせる『トリル』」(동시치기와 달리 다른 타이밍). [https://ja.wikipedia.org/wiki/REFLEC_BEAT]
- atwiki Tips(limelight 가동 초기 2011): 「2本のチェインオブジェクト（トリル）が、判定ライン直前ではクロスしなくなった？同じ場所（近接した場所？）に来なくなった？」 → 이후 판에서 **트릴의 두 체인이 판정선 직전에 교차하지 않고, 같은/인접 위치로 오지 않게** 조정된 것으로 보임(커뮤니티 관찰, ⚠ 미확정). [https://w.atwiki.jp/reflec_beat/pages/121.html]
- yuisin.com「DEADLOCKなどに出る変則トリル（渡りトリル？）」: 보통 트릴은 **4+4 또는 2+2의 쌍**(각 체인 오브젝트 수), 변칙형은 2+3+3+3+3+2처럼 체인이 겹쳐 이어짐(DEADLOCK HARD: 12분 12연 = 2+3+3+3+1, 16분 16연 = 2+3+3+3+3+2 ×2). 홀수번째 체인은 정박, 짝수번째는 엇박 담당. 체인이 좌·우 교대로 오면 교대로 치고, 3열이면 손을 교차하는 등. [https://yuisin.com/reflec/trill_watari.html]
- namu.wiki(docs/namu/난이도 표기 문제 등): 「12비트/16비트/24비트 트릴」(박 격자), 「체인 트릴」「체인 풀린 트릴」(체인 없이 교대 — dgb에서는 片트릴/통상 교대), 「데님 트릴」, 「3단 트릴」, 「탑노트 트릴」, 「1-2 트릴」, 「따닥 트릴」 등 용어 사용 → 트릴은 보통 체인으로 묶이지만, 체인이 풀린(통상) 교대도 있음.

**영상 확인 한계**: 기존 프레임(docs/ref/frames/)에는 트릴 구간의 확실한 프레임이 없고, 이번 패스에서 추가 영상 프레임 분석은 하지 못함(⚠). 경로의 출발 x·각도의 정량값은 미확인.

**dgb 구현(v3.3)**
- 문법: 서로 다른 빨강 레인의 두 체인(`1` + `C`…)을 교대로 배치. 별도 토큰 없음(원작도 '체인 2개'로 구성).
- 파서 후처리: 시간 범위가 겹치며 교대하는 체인 쌍 → `trill` 표시, **왼쪽 레인 체인은 그 레인보다 왼쪽 x에서, 오른쪽은 오른쪽에서 출발(반사 없음)** → 두 경로가 교차하지 않음(limelight 이후 관찰 반영). 각 체인 내부는 같은 경로 공유 + 연결선(기존 체인 렌더).
- 채보 사용: ARTM HARD(반주 8분·셋잇단을 4+4 트릴로), 데모 m016.
- 버티컬 오브젝트는 사용자 결정으로 **폐지**(토큰 V/W → 통상 변환 + 경고, 생성기·데모에서 제거).

## 20. v3.4 옵션 변경
- 하이스피드 옵션 **삭제**(사용자 결정): 낙하시간은 차트(#FALL, SP 채널)만으로 결정. VOLZZA 2의 +50/+100 HS는 미이식.
- 타격음(터치 사운드) 선택 추가: 클랩 / 틱 / 우드 / 림샷 / 끄기 — WebAudio 합성, 판정 성공 시 터치 즉시 재생, 선택 시 미리듣기, localStorage 'dgb.hit'에 저장. (원작의 ショット音 선택에 대응하는 dgb 자체 구현)

## 21. v3.5 곡 목록 정리
- 내장 곡은 **And Revive The Melody** 하나만 남김. 튜토리얼 데모 차트, X(차트·합성), 랜덤 생성기(GEN 3곡, genChartText)는 게임에서 삭제. charts/의 X-*.dgb·ARTM-*.dgb 파일은 그대로.
- 폴더 탭: 전체 / 불러온 곡 (차트 파일 불러오기 유지). URL `?demo` 자동 플레이는 `&song=artm&diff=N`(기본 artm).

## 22. v3.6 MIDI 내장곡 A–F
- 사용자 제공 MIDI 6곡(BPM 오름차순 A–F)을 내장. 합성용 데이터는 노트당 7바이트([Δtick u16, 길이 u16, 음높이, 세기, 음색])를 base64로 압축(`window.MIDI_SONGS`), 파싱 시 차트의 템포 맵(beatToTime)으로 초 단위 변환해 스케줄. 폰 부하 제한: 20ms당 최대 10발음(드럼 제외).
- 음색 매핑(트랙 이름 기준): Drum→드럼(역할 자동 분류: 강박 최다=킥, 2·4박 최다=스네어, 엇박 위주=하이햇, 마디 첫 박 위주 소수=크래시, 기타=탐) / Bass·Acid→톱니 / Lead·Melody·Beep·Filter·Sample→사각 / Piano→삼각+사인 / Arp·Guitar·MusicBox→짧은 사각(플럭) / Pad·String·Rev·Effect→약한 삼각. ⚠ 드럼 킷이 GM 표준 번호가 아니라 역할은 통계적 추정.
- 채보: charts/MIDI-make.py (1박=96슬롯=MIDI ppq, 모든 노트가 실제 MIDI 노트/드럼 이벤트 틱에 정확히 위치). 컨셉 BASIC MELODY LANES / MEDIUM TOP DENIM / HARD TRILL & HOLD / SPECIAL FLICK & CHORD, 600개 미만이면 실제 이벤트 중 밀도 낮은 구간부터 컨셉 규칙으로 보충(680까지).

## 23. REFLET MUSE(팬메이드 시뮬레이터) 조사와 차용 (v4.0)
출처: http://gdlife.sakura.ne.jp/srp/RefletMuse.html , 譜面作成方法 …/MakeSequence/{basic,object,music,2p}.php , 使用方法 …/manual/{index,prepare,game,qa}.php (web.archive.org 2025 사본), 패키지 RefletMuse_0.10.3.zip(아카이브 2016-07-07)
- 플랫폼: Windows, 세로 720×1280(9:16), 정전식 10점 터치 모니터 권장(2점 터치 패널은 교대 치기 반응이 나쁨).
- 차트 = **BMS(Double Play)**. 흰 건반 레인 SC,1,3,5,7(1P/2P) = 일반 오브젝트(동시 수만큼 레인 사용). 검은 건반 2·4·6 = **TOP 왼쪽·가운데·오른쪽(3위치 고정)**. 롱 = IIDX 차지노트처럼 시작/끝 2점. 금 오브젝트는 자동 결정. 0.10.0부터 Vertical·RMS 형식(RmsCreator).
- **체인 자동 생성**: 같은 레인에 등간격으로 놓으면 체인. 다른 레인 노트가 끼어 있어도 등간격이면 체인. 같은 레인 두 노트 사이에 다른 레인 노트가 3개 이상이면 체인 안 됨. SC 레인은 체인 없음. `#SCORETYPE 2/3`으로 방식 전환.
- `#SPEED n`: 상대 판정선에서 생성→자기 판정선 도달 시간을 **8분음표 n개**로 지정(기본 10). 그래서 실제 속도는 BPM에도 의존합니다. `#DIFFICULTY 2/3/4` = BASIC/MEDIUM/HARD, `#OBJCREATOR`, 1P/2P 별도 차트(`#BLUEDATAFILE`/`#BLUEFLAG`, 오브젝트 수 같아야 함).
- 판정음: just/great/good 별도 wav(라이벌용 포함). 0.5.0: **롱 누르는 중 0.1초 이내 순간 뗌은 미스 아님**(터치 패널이 순간 끊기는 현상 대응). 판정 창 수치는 공개 문서에 없음.
- dgb에 반영: ① 롱 순간 떼기 허용 0.08→**0.10초** ② 타격음 옵션 「판정별」(JUST/GREAT/GOOD 다른 음, 자체 합성) ③ 초록(TOP) **고정 출발점**(3위치 고정 사상과 일치) ④ 체인 = 같은 목표 등간격(기존 C 토큰 방식과 같은 개념이라 문법은 유지).
- 반영 안 함: SPEED의 BPM 의존 낙하(사용자 규칙: 낙하 시간은 차트 #FALL), 대전·JR·SC 레인(1인용 규칙), 이미지·소리 에셋(약관상 재배포·이미지 사용 금지 → docs/assets-credits.md).

## 24. 어지럼 대책 (v4.0, /workspace/analysis-dizzy.md)
- 초록: 출발 x 고정(L 40 / M 180 / R 320), 낙하 시간 = FALL·(BTN_Y−SPAWN_Y)/(LINE_Y−SPAWN_Y) → 세로 속도를 빨강과 같게.
- 빨강: 출발 = 목표 ±1레인(60px), 가로 속도 ≤170px/s(≈19°). 2마디 프레이즈마다 방향 하나(왼쪽·직하·오른쪽)를 공유. 반사는 확률 13%(체인 공유 포함 실측 18–27%), 상단 절반에서만, 판정 0.5초 전까지만.
- 이펙트: 판정선 플래시 50%, 링 300ms·확장 18px, 벽 플래시 알파 0.3, 등장 200ms 페이드인.

## 25. 노트 경로 = REFLET MUSE 0.10.3 기준 (2026-10-10)
실행 파일(RefletMuse.exe, 32bit C++/DxLib, 소스 없음)을 capstone으로 역어셈블해 확인한 것:
- `CObjPositionCalculator`: 필드 벽 x=19 / 699(폭 680), 판정선 y=165(상대)·1050(자기). 라인 오브젝트 x = 19+(p+1)·680/8, p=0..6(BMS 레인 1..7 → 7칸 격자, 1P/2P 좌우 반전). TOP(2·4·6 레인) x=118/359/600, y=383(상대)·832(자기) → 판정선에서 선 간격의 24.6% 위.
- 반사 이펙트 표: 양쪽 벽(x=19/699)에 y=249..966 9칸.
- 출발: 상대 판정선(화면 위)에서 생성 → 자기 칸으로 직진, 옆벽 반사 가능(빨강/파랑 두 채보의 오브젝트 수가 같아야 함 = 상대 쪽 위치에서 넘어옴).
- 미복원: `CObjProductor`(派生/derivation)의 출발 칸·반사 선택 규칙(정수 테이블 기반, 해독 못 함). → dgb는 출발 칸 균등 무작위, 반사 확률 35%(추정).
dgb 구현: 출발점 = 위쪽 7칸 격자(XMIN+SPAN·(k+1)/8) 무작위, 목표 무관(각도 상한·±1레인 제거). 반사 = 출발점의 가까운 벽 거울상 → 정확히 1회. 빨강만 동시치기 = 반사 없는 MUSE 후보 중 기울어진 공유 속도(평균→수직 아님). 초록 = 중앙 한 점·무반사(사용자 규칙). 트릴·체인 규칙 유지.
