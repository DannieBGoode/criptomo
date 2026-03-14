# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start Jekyll dev server with incremental builds (http://127.0.0.1:4000/)
bundle install       # Install Ruby gem dependencies (first-time setup)
npm install          # Install Node dependencies (first-time setup)
```

Config changes require a server restart; other file changes live-reload.

### Testing
```bash
npm test                    # Run Jest unit tests with coverage
npm run test:watch          # Jest watch mode
npm run test:api-contracts  # Validate external API contracts (CryptoCompare, LiveCoinWatch)
npm run test:page-console   # Headless browser smoke tests on built _site/ (requires prior build)
```

Jest coverage thresholds: 69% branches, 89% functions, 90% lines, 88% statements.

### Linting
```bash
npm run eslint       # Lint js/**/*.js (excludes js/jquery.js and js/public/)
```

## Architecture

### Stack
Jekyll 4.3.4 static site. Content in Liquid templates, styles in SCSS (libsass via `jekyll-sass-converter ~> 2.0` — **pinned intentionally**, Dart Sass would break IE hacks in `_jquery.dataTables.min.scss`). JavaScript uses jQuery 3.7.1. Deployed to Netlify on `master` push.

### Multi-language
Five languages: `es` (default/root), `en`, `de`, `fr`, `pt`. Language-specific pages live in `_pages/{lang}/`. The `{% case page.lang %}` pattern is used in includes for language-switching. Base URLs are configured in `_config.yml`.

### Key directories
- `_posts/` — Blog posts organized by date subdirectories
- `_pages/` — Static pages by language
- `_includes/` — Liquid partials (templates, affiliate banners, schema JSON-LD)
- `_layouts/` — Base templates (`compress.html` minifies output, `default.html` is the root)
- `_sass/` — 30+ SCSS modules loaded via main stylesheet
- `_data/` — YAML/JSON data files (coins, translations, navigation, affiliate links)
- `js/` — JavaScript modules; `js/public/` holds generated/compiled output (not linted)
- `bin/` — Build scripts and test runners
- `tests/` — Jest unit tests

### JavaScript globals
Several variables are injected by Jekyll templates at runtime and declared as ESLint globals: `$`, `coins`, `Data`, `icos`, `mobileAndTabletcheck`, `handleError`, `isLocalStorageAvailable`, `iconsBaseUrl`, `marketcapsCoinsLimit`, `recommendArticles`, `tableDataLang`, `toShortFormat`.

### Windows build quirk
`bin/jekyll-local.rb` patches Jekyll's `require_all()` for Windows file-locking compatibility. `npm run dev` uses this script; prefer it over running `bundle exec jekyll serve` directly on Windows.

### External integrations
- **Kraken affiliate**: config in `_config.yml` under `kraken.affiliate_link` / `kraken.affiliate_code`; banner template at `_includes/calculator_affiliate_banner.html`
- **Google Tag Manager**: GTM-TV5P5BH
- **Disqus comments**: shortname `criptomo`
- **Market data**: CryptoCompare and LiveCoinWatch APIs (API contracts tested via `npm run test:api-contracts`)
