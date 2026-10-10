# dgb 데이터 계약 (음악/채보 ↔ 앱)

GitHub Pages는 정적 호스팅이라 서버 코드는 없습니다. "백엔드" = 아래 정적 데이터 계층(매니페스트 + 파일)입니다.

## 위치
| 경로 | 내용 | 로딩 시점 |
|---|---|---|
| `data/songs.json` | 곡 목록 매니페스트 | 앱 시작 시 1회 |
| `charts/<ID>-<DIFF>.dgb` | 차트(텍스트, docs/chart-format.md 형식), DIFF ∈ BASIC/MEDIUM/HARD/SPECIAL | 그 곡·난이도를 시작할 때 |
| `data/music/<ID>.json` | 합성용 음악 데이터 | 그 곡을 처음 시작할 때(이후 SW 캐시) |

## songs.json 스키마
```json
[{"id":"A","title":"A","artist":"MIDI","bpm":"168","folder":"ORIGINAL",
  "mid":"A",                       // MIDI 계열이면 합성 키(차트 #MUSIC MIDI:A 와 같아야 함)
  "art":1,                         // ARTM 전용 합성기를 쓰면 1 (mid 대신)
  "music":"data/music/A.json",
  "charts":{"BASIC":"charts/A-BASIC.dgb","MEDIUM":"...","HARD":"...","SPECIAL":"..."}}]
```
- 레벨 표시는 현재 내장곡 모두 Lv10(앱의 `songLevels`). 차트의 `#LEVEL`은 파일 안에서도 10으로 둡니다.
- `charts`에 없는 난이도는 선택 불가로 표시됩니다.

## 음악 데이터 형식
- **MIDI 계열** `{"ppq":96,"b64":"..."}` — b64를 풀면 노트당 7바이트 리틀엔디언: `Δtick u16, 길이tick u16, 음높이 u8, 세기 u8, 음색 u8`. Δtick이 65535를 넘으면 음색 255인 빈 레코드로 이어 붙입니다. 음색: 0 drum(미사용), 1 bass, 2 lead, 3 piano, 4 pluck, 5 pad, 10–14 드럼 역할(킥·스네어·하이햇·크래시·탐). tick→초 변환은 **차트의 템포 맵**(#BPM, BP 채널)으로 합니다. 따라서 차트의 템포 맵이 MIDI와 같아야 합니다. 생성기: `/workspace/bounce-rhythm/charts/MIDI-make.py`.
- **ARTM** `[{b:박, ld:[[음들,길이박]], bs:[...], pad:[음들,길이박], k,s,h,o,c:드럼 플래그}]`, 박 0 = 차트 4박 지점.

## 곡 추가 방법
1. 차트 4개를 `charts/<ID>-<DIFF>.dgb`로 저장합니다. 헤더는 `#MUSIC MIDI:<ID>`(또는 `ARTM`)입니다. 파서 경고가 0이어야 합니다.
2. 음악 데이터를 `data/music/<ID>.json`로 저장합니다.
3. `data/songs.json`에 항목을 추가합니다.
4. `node tools/playcheck.js charts/<ID>-*.dgb`가 위반 0이어야 합니다.
5. 새 파일을 서비스 워커가 바로 반영하게 하려면 `sw.js`의 `V`(캐시 버전)를 올립니다. 셸 파일은 네트워크 우선이라 새로고침하면 반영되고, 차트·음악 파일은 캐시 우선입니다.
6. 사용자 차트는 앱의 파일 불러오기(곡 선택 화면)로 계속 열 수 있습니다(`#MUSIC` 없이 드럼 합성).
