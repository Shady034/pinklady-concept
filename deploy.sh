#!/usr/bin/env bash
# Verify against a local-root build, then rebuild for the GitHub Pages subpath
# and publish site/ to the gh-pages branch.
set -euo pipefail
OWNER=ShadyArc
REPO=pinklady-concept
cd "$(dirname "$0")"

# Audit the local-root build: the 404 page's absolute links only resolve
# on-disk when the site root is "/".
node build/build.mjs >/dev/null
node build/audit.mjs | tail -2
node build/audit.mjs >/dev/null || { echo "AUDIT FAILED — not deploying"; exit 1; }

# Rebuild with the repo prefix baked into the 404 links and sitemap.
SITE_ROOT="$REPO" node build/build.mjs

git add site src build
git diff --cached --quiet || git commit -q -m "Rebuild site"
git push -q origin main
git subtree push --prefix site origin gh-pages

echo
echo "deployed -> https://$(echo "$OWNER" | tr '[:upper:]' '[:lower:]').github.io/$REPO/"
