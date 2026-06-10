#!/usr/bin/env bash
set -u

export PATH="/opt/homebrew/opt/ruby/bin:/usr/local/opt/ruby/bin:$PATH"
export BUNDLE_FROZEN=true

workspace_path="${CONDUCTOR_WORKSPACE_PATH:-$PWD}"
cd "$workspace_path" || exit 1

git_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ "$git_root" != "$PWD" ]; then
  echo "Refusing to archive-clean from outside the workspace root: $PWD" >&2
  exit 1
fi

if [ ! -f Gemfile ] || [ ! -f package.json ]; then
  echo "Refusing to archive-clean: expected Gemfile and package.json in $PWD" >&2
  exit 1
fi

bundle exec jekyll clean || true

rm -rf \
  .bundle \
  .cache \
  .context \
  .jekyll-cache \
  .jekyll-metadata \
  .sass-cache \
  artifacts \
  coverage \
  node_modules \
  vendor/bundle \
  _site
