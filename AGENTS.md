# AGENTS.md

> Universal agent instructions for this project. Read by Claude Code, Gemini CLI, Codex, and other AI agents.
> Platform-specific config files (CLAUDE.md, GEMINI.md) defer to this file.

## Project At A Glance

- This repository is a Jekyll 4 static site for `criptomo.com`.
- Spanish (`es`) is the default locale at `/`. Other localized pages live under `en`, `de`, `fr`, and `pt`.
- Primary source directories are `_pages/`, `_posts/`, `_includes/`, `_layouts/`, `_data/`, `_sass/`, `css/`, `js/`, `tests/`, and `bin/`.
- Generated or disposable output lives in `_site/`, `coverage/`, and `artifacts/`. Do not hand-edit those directories.
- Treat `js/public/**` and `~partytown/**` as vendored/generated assets unless the task is explicitly about those runtime files.

## Commands

### Development
```bash
npm run dev          # Start Jekyll dev server with incremental builds (http://127.0.0.1:4000/)
bundle install       # Install Ruby gem dependencies (first-time setup)
npm install          # Install Node dependencies (first-time setup)
```

Use `npm run dev` or `npm start` for local development. These call `bin/jekyll-local.rb`, which patches Jekyll for Windows file-locking issues. Prefer this over running `bundle exec jekyll serve` directly. Changes to `_config.yml` require a dev-server restart.

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

## Validation Rules

- When touching any JavaScript, keep the unit test suite passing. Run `npm test` after JavaScript changes.
- Run `npm run eslint` after meaningful JavaScript changes.
- If you change page assembly, script tags, third-party includes, or rendered HTML behavior, rebuild the site and run `npm run test:page-console`.
- If you change external market-data integrations or the scripts that consume them, run `npm run test:api-contracts`.

## Content And Localization

- Keep `lang` and shared `ref` values aligned across translated pages and posts. The language picker and related cross-language links depend on them.
- Preserve important front matter fields such as `layout`, `permalink`, `lang`, `ref`, `css`, and `jquery`.
- Spanish pages usually live in `_pages/es/` and publish at root permalinks. Other locales publish under language-prefixed permalinks.
- Posts are not organized one single way: some are flat in `_posts/`, others are grouped by year/month and sometimes by language subdirectory. Follow the nearby pattern instead of trying to normalize the tree.
- **No cross-language internal links.** Each translation must only link to posts in the same language. If a same-language version of the target post does not exist, use plain text instead of a link. Never link a German post to a Spanish slug, etc.
- Navigation and locale metadata live in `_data/navigation*.yml`, `_data/languages.yml`, and `_data/translations.yml`.
- Older content includes non-ASCII prose. Make narrow edits and avoid unnecessary file rewrites that could damage encoding or punctuation.

## Architecture

### Stack
Jekyll 4.3.4 static site. Content in Liquid templates, styles in SCSS (libsass via `jekyll-sass-converter ~> 2.0` — **pinned intentionally**, Dart Sass would break IE hacks in `_jquery.dataTables.min.scss`). JavaScript uses jQuery 3.7.1. Deployed to Netlify on `master` push.

### Key Directories
- `_posts/` — Blog posts organized by date subdirectories
- `_pages/` — Static pages by language
- `_includes/` — Liquid partials (templates, affiliate banners, schema JSON-LD)
- `_layouts/` — Base templates (`compress.html` minifies output, `default.html` is the root)
- `_sass/` — 30+ SCSS modules loaded via main stylesheet
- `_data/` — YAML/JSON data files (coins, translations, navigation, affiliate links)
- `js/` — JavaScript modules; `js/public/` holds generated/compiled output (not linted)
- `bin/` — Build scripts and test runners
- `tests/` — Jest unit tests

### Styles, Templates, And Data

- `css/main.scss`, `css/post.scss`, and `css/calculator.scss` are Sass entrypoints. Shared partials live in `_sass/`.
- Pages select styles through front matter `css: ...`; keep that in sync when adding or renaming a stylesheet.
- Do not change the Sass toolchain. The current Jekyll Sass setup is intentional, and `_sass/_jquery.dataTables.min.scss` contains legacy hacks that are not a safe drop-in for toolchain changes.
- `_layouts/default.html` assembles the common CSS and script loading. `page.jquery: true` opts a page into `js/jquery.js`.
- Site-wide configuration, affiliate settings, analytics toggles, and language base URLs live in `_config.yml`.

### JavaScript

- Browser JavaScript in `js/*.js` is plain script code, not bundled modules. Many files expose `module.exports` only for Jest; preserve that testing pattern.
- Runtime globals injected by Jekyll templates and declared as ESLint globals: `$`, `coins`, `Data`, `mobileAndTabletcheck`, `handleError`, `isLocalStorageAvailable`, `iconsBaseUrl`, `marketcapsCoinsLimit`, `recommendArticles`, `tableDataLang`, `toShortFormat`. Check `.eslintrc.json` before introducing new globals.
- Some pages rely on strict script ordering. DataTables CDN scripts must remain ahead of `invest.js` and `marketcaps.js` in the page source.
- When adding or updating JS tests, prefer reusing helpers in `tests/helpers/` instead of duplicating DOM setup.

## External Integrations

- **Kraken affiliate**: config in `_config.yml` under `kraken.affiliate_link` / `kraken.affiliate_code`; banner template at `_includes/calculator_affiliate_banner.html`
- **Google Tag Manager**: GTM-TV5P5BH
- **Disqus comments**: shortname `criptomo`
- **Market data**: CryptoCompare (via the Netlify Function proxy at `/api/market/*` — never call `min-api.cryptocompare.com` from page JS) and LiveCoinWatch. **Read `docs/market-data-apis.md` before touching anything that fetches prices** — it documents the proxy, API keys and quotas, caching, provider failure modes, and the validation checklist.

## Monetization

When creating new content, always suggest ways of monetizing it. If a new blog post is created, make sure the mentioned items have affiliate codes and prompt the user to add them if they do not exist within the project. Affiliate links/codes go in `_config.yml`.

## Marketing & SEO Context

Full marketing strategy, target audience, competitive landscape, SEO goals, content strategy, and monetization details are documented in `docs/product-marketing.md`. Read it before working on any content, SEO, or marketing tasks.
