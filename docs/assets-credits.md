# 에셋 출처와 라이선스

## 현재 dgb에 포함된 외부 에셋
| 파일 | 원본 | 변환 | 용도 |
|---|---|---|---|
| data/sfx/muse-just.wav | RefletMuse_0.10.3.zip `sound/just.wav` | 모노 22.05kHz 16bit WAV(3.0KB) | 타격음 옵션 「MUSE」 JUST |
| data/sfx/muse-great.wav | `sound/great.wav` | 같음(4.9KB) | GREAT |
| data/sfx/muse-good.wav | `sound/good.wav` | 같음(11.7KB) | GOOD |
- **사용자(승우 이)가 아래 사이트 약관(재배포 금지)을 알고도 이 효과음을 쓰기로 결정했습니다(2026-10-10).** 이미지는 사용하지 않습니다.
- WAV로 둔 이유: MP3는 인코더 지연(앞쪽 무음 약 26ms) 때문에 타격음이 늦게 들립니다. 세 파일을 합쳐도 20KB입니다.
- 로딩: 「MUSE」를 선택했을 때만 fetch → decodeAudioData로 버퍼를 만들고, 판정할 때 BufferSource로 즉시 재생합니다. 서비스 워커가 캐시합니다.
- 그 밖의 그래픽은 모두 캔버스로 그리고, 소리는 WebAudio로 합성합니다. 아이콘은 자체 제작입니다.

## REFLET MUSE (GuitarFreaks Sequence Reproduction) 검토 결과 — 에셋은 사용하지 않음
- 출처: http://gdlife.sakura.ne.jp/srp/RefletMuse.html (원 사이트는 박스 네트워크에서 응답이 없어 web.archive.org 사본으로 읽었습니다). 패키지는 RefletMuse_0.10.3.zip(2016-07-07 아카이브, 0.10.5는 아카이브 없음)입니다.
- 패키지 내용: RefletMuse.exe / RefletMuseLauncher.exe(실행하지 않음), reflet.atx(6.5MB, 자체 포맷 이미지 아카이브로 추정), sound/just·great·good(.wav, Rival 버전 포함), selectEffect.mp3, selectbgm.ogg, 샘플 곡 data/karenaihana(魔王魂 「枯れない花」 BMS + mp3 + jpg).
- 패키지 안에 readme나 라이선스 파일은 없습니다. 약관은 사이트 「REFLET MUSE使用方法」 개요의 **禁止事項**입니다(http://gdlife.sakura.ne.jp/srp/RefletMuse/manual/index.php):
  - 「再配布禁止」 재배포 금지
  - 「許可なくソフト内の画像の使用禁止」 허가 없이 소프트웨어 안의 이미지 사용 금지
  - 「本家禁止」
- Starter Package 약관(…/StarterPackage/index.html): 수록 곡·차트는 REFLET MUSE 안에서만 사용할 수 있고 재배포는 금지입니다(제작자가 허가한 경우만 예외, 현재 0곡).
- (초기 판단) dgb는 GitHub Pages에 공개 배포됩니다. 이미지(노트 스프라이트 등)는 명시적으로 허가 없이 사용할 수 없고, 효과음 wav·bgm을 저장소에 올리는 것은 재배포에 해당합니다. 그래서 **에셋은 하나도 넣지 않았습니다.** 대신 개념만 빌렸습니다(판정별 효과음 → 옵션 「판정별」, 소리는 자체 합성).
- 사용하려면 작자(reflet@gdlife.sakura.ne.jp, 사이트 Q&A 기재)의 허가가 필요합니다. 허가를 받으면 sound/*.wav → ogg로 변환해 `assets/`에 넣고, 이 문서에 허가 내용을 기록하면 됩니다.
