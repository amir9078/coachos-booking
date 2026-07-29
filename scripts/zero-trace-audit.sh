#!/bin/sh
# Verifies the CoachOS rebrand hasn't left behind Cal.com traces, dead
# secrets, or known-fragile config. Read-only: never edits or deletes
# anything. Run from the repo root: ./scripts/zero-trace-audit.sh
set -u

cd "$(dirname "$0")/.." || exit 1

WARNINGS=0
FAIL=0

pass() { printf '  \033[32mPASS\033[0m %s\n' "$1"; }
warn() { printf '  \033[33mWARN\033[0m %s\n' "$1"; WARNINGS=$((WARNINGS + 1)); }
fail() { printf '  \033[31mFAIL\033[0m %s\n' "$1"; FAIL=$((FAIL + 1)); }

# Grep across tracked source, excluding dependency/build/vcs dirs and this script itself.
scan() {
  grep -rlniE "$1" \
    --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --include="*.json" --include="*.yml" --include="*.yaml" --include="*.md" --include="*.mdx" \
    . 2>/dev/null \
    | grep -v -e node_modules -e '/\.git/' -e '/\.next/' -e '/\.yarn/' -e '/dist/' -e '/build/' \
    | grep -v 'scripts/zero-trace-audit.sh'
}

echo "== 1. Legacy encryption key name =="
r=$(scan 'CALENDSO_ENCRYPTION_KEY')
if [ -z "$r" ]; then pass "no CALENDSO_ENCRYPTION_KEY references remain"; else fail "CALENDSO_ENCRYPTION_KEY still referenced in:"; echo "$r" | sed 's/^/       /'; fi

echo "== 2. @calcom/* package references =="
r=$(scan '@calcom/')
if [ -z "$r" ]; then pass "no @calcom/ package references remain"; else fail "@calcom/ still referenced in:"; echo "$r" | sed 's/^/       /'; fi

echo "== 3. Scarf.sh tracking proxy =="
r=$(scan 'scarf\.sh')
if [ -z "$r" ]; then pass "no scarf.sh references remain"; else fail "scarf.sh still referenced in:"; echo "$r" | sed 's/^/       /'; fi

echo "== 4. Stale calNewLocale / calIsDesktopApp globals =="
r=$(scan 'calNewLocale|calIsDesktopApp')
if [ -z "$r" ]; then pass "no calNewLocale/calIsDesktopApp references remain"; else fail "old locale globals still referenced in:"; echo "$r" | sed 's/^/       /'; fi

echo "== 5. Hardcoded amir9078.github.io / cal.com domains in source =="
r=$(scan 'amir9078\.github\.io|(^|[^@.])cal\.com')
if [ -z "$r" ]; then pass "no hardcoded old-domain references in source"; else warn "old-domain string found (review — may be a legitimate upstream/attribution reference) in:"; echo "$r" | sed 's/^/       /'; fi

echo "== 6. Hardcoded live secret patterns =="
r=$(grep -rliE "sk_live_[a-zA-Z0-9]|AKIA[0-9A-Z]{16}|-----BEGIN (RSA|EC|OPENSSH|PGP) PRIVATE KEY-----" \
    --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json" --include="*.env*" --include="*.yml" --include="*.md" . 2>/dev/null \
    | grep -v -e node_modules -e '/\.git/' -e '/\.next/' -e '/\.yarn/')
if [ -z "$r" ]; then pass "no hardcoded live-looking secret patterns found"; else fail "possible hardcoded secret in:"; echo "$r" | sed 's/^/       /'; fi

echo "== 7. .env files are gitignored (never actually committed) =="
r=$(git log --all --full-history --oneline -- '.env' '.env.local' '.env.production' 2>/dev/null)
if [ -z "$r" ]; then pass "no .env file ever committed to git history"; else fail ".env file(s) found in git history:"; echo "$r" | sed 's/^/       /'; fi
if grep -qE '^\.env(\*|$)' .gitignore 2>/dev/null; then pass ".gitignore covers .env*"; else warn ".gitignore does not clearly cover .env*"; fi

echo "== 8. No stray LICENSE/NOTICE files conflicting with COPYRIGHT/LEGAL =="
r=$(find . -maxdepth 1 \( -iname "LICENSE" -o -iname "LICENSE.md" -o -iname "NOTICE" \) 2>/dev/null)
if [ -z "$r" ]; then pass "no LICENSE/LICENSE.md/NOTICE at repo root"; else warn "found unexpected license file(s):"; echo "$r" | sed 's/^/       /'; fi
[ -f COPYRIGHT ] && pass "COPYRIGHT present" || warn "COPYRIGHT missing"
[ -f LEGAL ] && pass "LEGAL present" || warn "LEGAL missing"

echo "== 9. Docker image runs as non-root =="
if grep -q '^USER ' Dockerfile 2>/dev/null; then pass "Dockerfile declares a non-root USER"; else fail "Dockerfile has no USER directive (runs as root)"; fi

echo "== 10. Protected live Prisma schema identifiers untouched =="
for ident in "IdentityProvider" "CalAiPhoneNumber" "CalVideoSettings" "canSendCalVideoTranscriptionEmails" "calVideoLogo"; do
  if grep -q "$ident" packages/prisma/schema.prisma 2>/dev/null; then
    pass "$ident still present in schema.prisma"
  else
    fail "$ident MISSING from schema.prisma — check for an accidental rename"
  fi
done

echo "== 11. render.yaml / turbo.json / docs use the renamed encryption key =="
for f in render.yaml turbo.json apps/docs/content/troubleshooting.mdx; do
  if [ -f "$f" ]; then
    if grep -q "COACHOS_ENCRYPTION_KEY" "$f"; then pass "$f references COACHOS_ENCRYPTION_KEY"; fi
    if grep -q "CALENDSO_ENCRYPTION_KEY" "$f"; then fail "$f still references CALENDSO_ENCRYPTION_KEY"; fi
  fi
done

echo
echo "================================================================"
if [ "$FAIL" -gt 0 ]; then
  echo "RESULT: $FAIL failing check(s), $WARNINGS warning(s)."
  exit 1
elif [ "$WARNINGS" -gt 0 ]; then
  echo "RESULT: 0 failing checks, $WARNINGS warning(s) to review."
  exit 0
else
  echo "RESULT: all checks passed cleanly."
  exit 0
fi
