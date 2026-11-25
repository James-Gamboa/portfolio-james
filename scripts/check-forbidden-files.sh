#!/usr/bin/env bash
# Fails if any shipped path contains files that must never reach the server/CDN.
# Usage: scripts/check-forbidden-files.sh <dir> [<dir>...]
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "usage: $0 <dir> [<dir>...]" >&2
  exit 2
fi

FORBIDDEN='(^|/)(CLAUDE(\.local)?\.md|AGENTS\.md|\.env(\..*)?|id_rsa.*|.*\.pem|.*\.key|.*\.map)$|(^|/)(\.claude|\.cursor|\.agents|\.git)(/|$)'
status=0

for dir in "$@"; do
  if [ ! -d "$dir" ]; then
    echo "error: '$dir' is not a directory" >&2
    exit 2
  fi
  # .env.example is documentation, .next/cache is a build cache that is never deployed.
  hits=$(cd "$dir" && find . -path ./cache -prune -o -path ./.next/cache -prune -o -print \
    | sed 's|^\./||' | { grep -Ev '(^|/)\.env\.example$' || true; } | { grep -E "$FORBIDDEN" || true; })
  if [ -n "$hits" ]; then
    echo "Forbidden files found in '$dir':" >&2
    echo "$hits" >&2
    status=1
  else
    echo "OK: no forbidden files in '$dir'"
  fi
done

exit "$status"
