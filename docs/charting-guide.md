# dgb 채보 가이드 (charting-guide) — 사람이 칠 수 있는 채보

## 1. 일반 원칙 (다른 리듬게임 채보 기준에서)
| 원칙 | 내용 | 출처 |
|---|---|---|
| 동시치기 상한 | 하위 난이도는 2개 넘는 동시치기 금지. 롱노트를 누르고 있는 손과 **반대 손**으로 치는 2동시는 허용 | osu!mania Ranking Criteria — https://osu.ppy.sh/wiki/en/Ranking_criteria/osu%21mania |
| 스트림 속 동시치기 | 연속 1/4(16분) 패턴 한가운데의 화음은 피하고, 시작/끝에만. 코드스트림에서 화음은 1/1박 이상 간격 | 위와 같음 |
| 잭(같은 칸 연타) | 1/4 잭·미니잭은 신체 부담이 커서 앞뒤로 충분한 휴식 필요. 기준 BPM은 180, BPM에 따라 해석 | 같은 문서 + 포럼 https://osu.ppy.sh/community/forums/topics/2149808 , 잭 정의 https://github.com/ppy/osu-wiki/blob/master/wiki/Beatmap/Pattern/osu!mania/Jack/en.md |
| 1/8 스트림 길이 | 1/8 스트림은 4박 넘게 끌지 말 것(곡이 요구할 때만) | osu!mania RC 초안 https://osu.ppy.sh/community/forums/topics/839986 |
| 휴식 구간 | 연속 패턴 사이에 짧은 쉼(최상위 난이도에서도 16~20박마다 1/1박) | osu!taiko RC https://osu.ppy.sh/wiki/en/Ranking_criteria/osu%21taiko |
| 예측 가능한 리듬 | 음악과 무관한 리듬은 금지. 같은 소리 = 같은 패턴(일관성) | osu!taiko RC, osu! 공통 RC https://osu.ppy.sh/wiki/en/Ranking_criteria |
| 정확한 타이밍 | 모든 노트는 음악의 실제 소리에 정확히(±2ms) 스냅 | osu! 공통 RC |
| 손 배치 | 터치 리듬게임은 대부분 **동시 입력 2개(양 엄지)** 로 칠 수 있게 설계. 3개 이상은 예외 | Arcaea Wiki Gameplay https://arcaea.fandom.com/wiki/Gameplay |
| 크로스핸드 | 손을 교차해 반대편을 치는 패턴은 가능하지만 어려운 요소로 취급(고난도 전용) | r/arcaea 토론 https://www.reddit.com/r/arcaea/comments/veji85/ |
| 엄지 속도 한계 | 한 손가락 연타는 보통 4~7회/초, 숙련자 7~8회/초. 두 손가락 교대면 10~16회/초 | ReflexLab https://roguewavelabs.dev/reflexlab/tap-speed-test/ , clicktests https://clicktests.net/multi-touch-test |
| 엄지 이동 시간 | Fitts 법칙: 엄지 MT ≈ 176 + 64·log2(A/W+1) ms(검지보다 느림) | Silfverberg 외 「Predicting text entry speed on mobile phones」(CHI 2000) |
| Reflec 고유 | 트릴=시간차 2체인, 롱잡(롱+탭) 등 용어·사례 | docs/reflec-analysis.md, namu.wiki/w/리듬 게임_용어 |

## 2. dgb 손 모델 (세로 폰, 양 엄지)
- 왼손 홈: 왼쪽 초록 버튼(GL) + 빨강 레인 1–2. 오른손 홈: GR + 레인 5–6. **공용**: 레인 3–4, 중앙 초록 버튼(GM).
- 사이드 버튼(GL/GR)은 화면 가장자리라 기본은 같은 쪽 손이지만 **교차도 허용**(별도 추가 시간 없음, 사용자 결정). 대신 사이드 버튼이 들어간 패턴은 밀도를 제한.
- 중앙 버튼은 양손이 자유롭게 공유 → 중앙 버튼↔밴드 사이 32분급 양손 트릴도 가능.

## 3. 검사 임계값 (charts/playability.py)
| 규칙 | 값 | 근거 |
|---|---|---|
| 동시 최대 | 2개, 서로 다른 손 | Arcaea 2입력·osu!mania 2동시 |
| 같은 손 같은 목표(잭) | ≥125ms | 숙련자 엄지 8회/초 |
| 같은 손, ≤1레인 이동 | ≥125ms | 위와 같음 |
| 같은 손, 2레인 이상 / 중앙버튼↔밴드 | ≥160ms | 이동 거리 증가 |
| 같은 손, 밴드↔사이드 버튼(수직, 필드 높이 ~20%) | ≥200ms | 엄지 Fitts(≈176ms+), 200BPM 16분×2.7 |
| 사이드 버튼 노트 앞뒤 (양손 포함) 간격 | ≥100ms | 사이드 버튼 32분 트릴/연타 금지(200BPM 16분=75ms, 32분=37ms → 16분보다 조금 느린 수준 상한) |
| 같은 사이드 버튼 연타 | ≥150ms | |
| 1초 창 사이드 버튼 노트 | ≤4 | 사이드 사용 '적당히' |
| 플릭 | 직전 같은 손 ≥150ms, 직후 ≥200ms | 스와이프 동작·복귀 |
| 롱 | 끝날 때까지 그 손 점유, 종료 후 100ms | osu!mania '롱+반대손 2동시만' |
| 전체 밀도 | 1초 창 ≤13노트 (Lv10 폰) | 양손 교대 10~16회/초의 하단 |
| 트릴 | 두 체인을 양손에 배분 → 손당 간격 2배 | Reflec 트릴 정의 |
| 빨강:초록 | ≈7:3(허용 60–80%) | 사용자 규칙: 빨강이 주 요소 |
| 노트 수 | 차트당 400–650 (곡 길이×≈4.6 ± 난이도 컨셉) | 사용자 규칙 |
- 휴식 구간·일관성은 생성기에서 음악 이벤트만 사용하는 방식으로 보장(검사기는 경고 대상 아님).

## 4. 파이프라인
`charts/make-all.sh`: ARTM-make.py / MIDI-pick.sh(MIDI-make.py) 생성 → `playability.py balance`(손 모델 위반 노트 제거, 빨강≈70%로 조정) → `playability.py thin`(밀집 구간부터 단일 탭 제거해 400–650) → `playability.py check`(위반 0 확인). 노트를 지울 뿐 옮기지 않으므로 모든 노트는 여전히 실제 음악 이벤트 위(빨강↔초록 변환은 같은 시각).
