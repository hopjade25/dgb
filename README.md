# dgb
REFLEC BEAT 오마주 세로형 리듬게임(웹, 정적 호스팅). 플레이: https://hopjade25.github.io/dgb/
- `index.html` + `css/` + `js/0-core … 8-render.js`(defer 클래식 스크립트, 전역 엔진 상태 공유) + `sw.js`(오프라인) + `manifest.webmanifest`
- 데이터: `data/songs.json`, `charts/*.dgb`, `data/music/*.json` — docs/data-contract.md
- 도구: `node tools/playcheck.js charts/*.dgb` — docs/tools.md
