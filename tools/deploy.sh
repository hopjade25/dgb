#!/bin/bash
# dgb 배포: 캐시 버전(sw.js)과 앱 내 빌드 표시(js/version.js)를 같은 서울 시각 값으로 기록 → 커밋(hopjade25) → 푸시
# 사용: tools/deploy.sh "커밋 메시지"   (/workspace/dgb-site 에서 실행)
set -e
cd "$(dirname "$0")/.."
V=dgb-$(TZ=Asia/Seoul date +%Y%m%d%H%M)
sed -i -E "s/dgb-[0-9]{12}[a-z]?/$V/" sw.js
printf "// 배포 시 tools/deploy.sh가 자동 기록(sw.js 캐시 버전과 같은 값). 직접 고치지 말 것\nconst BUILD='%s';\n" "$V" > js/version.js
git add -A
git -c user.name=hopjade25 -c user.email=hopjade25@users.noreply.github.com commit -qm "${1:-deploy} [$V]"
git push -q
echo "$V"
