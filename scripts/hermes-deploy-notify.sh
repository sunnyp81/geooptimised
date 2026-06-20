#!/bin/bash
set -e
source /root/.hermes/cron-env

REPO=/root/repos/geooptimised
cd "$REPO"
git pull --ff-only --quiet

npm run build --silent 2>/dev/null

node scripts/indexnow-ping.mjs 2>&1

PAGES=$(grep -o "<loc>" dist/sitemap-0.xml | wc -l)

LAST_SHA_FILE="/root/.hermes/state/geooptimised-last-sha.txt"
CURRENT_SHA=$(git rev-parse HEAD)
NEW_PAGES=""
if [ -f "$LAST_SHA_FILE" ]; then
  LAST_SHA=$(cat "$LAST_SHA_FILE")
  NEW_PAGES=$(git diff --name-only "$LAST_SHA" "$CURRENT_SHA" -- src/pages/ 2>/dev/null | grep "\.astro$" | sed 's|src/pages/||;s|\.astro$||;s|index||' | while read f; do echo "/$f/"; done)
fi
echo "$CURRENT_SHA" > "$LAST_SHA_FILE"

TMPJSON=$(mktemp)
if [ -n "$NEW_PAGES" ]; then
  NCOUNT=$(echo "$NEW_PAGES" | wc -l | tr -d ' ')
  echo "$NEW_PAGES" > /tmp/geo-newpages.txt
  python3 << 'PYEOF'
import json
pages = open("/tmp/geo-newpages.txt").read().strip().split("\n")
import os
n = os.environ.get("PAGES","?")
chat = os.environ.get("TELEGRAM_HOME_CHANNEL","")
plist = "\n".join(f"• {p}" for p in pages)
msg = f"geooptimised.com deployed\n{n} pages live | {len(pages)} new | IndexNow pinged\n\nNew pages:\n{plist}"
print(json.dumps({"chat_id": chat, "text": msg}))
PYEOF
else
  python3 << 'PYEOF'
import json, os
n = os.environ.get("PAGES","?")
chat = os.environ.get("TELEGRAM_HOME_CHANNEL","")
msg = f"geooptimised.com deployed\n{n} pages live | IndexNow pinged\nNo new pages in this push."
print(json.dumps({"chat_id": chat, "text": msg}))
PYEOF
fi > "$TMPJSON"

export PAGES
curl -s --max-time 10 -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d @"$TMPJSON" > /dev/null 2>&1 && echo "Telegram sent" || echo "Telegram failed"

rm -f "$TMPJSON" /tmp/geo-newpages.txt
echo "Done: ${PAGES} pages"
