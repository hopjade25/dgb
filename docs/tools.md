# dgb 도구

## tools/playcheck.js — 두 엄지 플레이 가능성 검사기
```
node tools/playcheck.js charts/*.dgb            # 차트별 요약(노트 수, 1초 최대 NPS, 빨강 %, 위반 수)
node tools/playcheck.js --verbose charts/A-HARD.dgb   # 위반마다 시각(ms)·원본 행·채널·사유
node tools/playcheck.js --json charts/*.dgb > report.json
```
- 위반이 하나라도 있으면 종료 코드 1(CI·생성기 루프에 그대로 쓸 수 있음). 의존성 없음(Node 18+).
- `require('./tools/playcheck.js')` → `{parse(text), check(notes), T}`. `T`가 임계값 표입니다(근거: docs/charting-guide.md §3).
- 손 모델: 왼손 홈 GL·R1·R2, 오른손 홈 GR·R5·R6, 공용 R3·R4·GM. 교차는 허용(점수만 불리하게 매겨 우선순위 낮춤). 동시 최대 2개, 서로 다른 손.
- 검사 항목: 같은 손 간격(잭 125 / 인접 125 / 2레인↑·중앙버튼↔밴드 160 / 밴드↔사이드 버튼 200ms), 플릭 전 150·후 200ms, 롱 유지 중 같은 손 금지(종료 후 100ms), 사이드 버튼 앞뒤 100ms·같은 사이드 연타 150ms·1초 4개, 1초 창 13노트.
- 빨강 비율과 노트 수(400–650)는 보고만 하고 위반으로 세지 않습니다(음악 쪽 정책).
- 참고: 이전 Python 구현 `charts/playability.py`(check/fix/balance/thin)는 `/workspace/bounce-rhythm/charts/`에 남아 있습니다. 판정 결과는 같습니다.

## 개발 서버 / 테스트
- `python3 -m http.server 8765` (fetch·서비스 워커 때문에 file://로는 열리지 않음)
- `?demo&song=A&diff=2` 자동 플레이, `&at=초` 시작 위치
