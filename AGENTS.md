# Agent Instructions

## Project At A Glance

- This repository is a Jekyll 4 static site for `criptomo.com`.
- Spanish (`es`) is the default locale at `/`. Other localized pages live under `en`, `de`, `fr`, and `pt`.
- Primary source directories are `_pages/`, `_posts/`, `_includes/`, `_layouts/`, `_data/`, `_sass/`, `css/`, `js/`, `tests/`, and `bin/`.
- Generated or disposable output lives in `_site/`, `coverage/`, and `artifacts/`. Do not hand-edit those directories.
- Treat `js/public/**` and `~partytown/**` as vendored/generated assets unless the task is explicitly about those runtime files.

## Development Workflow

- Use `npm run dev` or `npm start` for local development. These call `bin/jekyll-local.rb`, which patches Jekyll for Windows file-locking issues. Prefer this over running `bundle exec jekyll serve` directly.
- Changes to `_config.yml` require a dev-server restart.
- First-time setup uses `bundle install` and `npm install`.

## Content And Localization

- Keep `lang` and shared `ref` values aligned across translated pages and posts. The language picker and related cross-language links depend on them.
- Preserve important front matter fields such as `layout`, `permalink`, `lang`, `ref`, `css`, and `jquery`.
- Spanish pages usually live in `_pages/es/` and publish at root permalinks. Other locales publish under language-prefixed permalinks.
- Posts are not organized one single way: some are flat in `_posts/`, others are grouped by year/month and sometimes by language subdirectory. Follow the nearby pattern instead of trying to normalize the tree.
- Navigation and locale metadata live in `_data/navigation*.yml`, `_data/languages.yml`, and `_data/translations.yml`.
- Older content includes non-ASCII prose. Make narrow edits and avoid unnecessary file rewrites that could damage encoding or punctuation.

## Styles, Templates, And Data

- `css/main.scss`, `css/post.scss`, and `css/calculator.scss` are Sass entrypoints. Shared partials live in `_sass/`.
- Pages select styles through front matter `css: ...`; keep that in sync when adding or renaming a stylesheet.
- Do not casually change the Sass toolchain. The current Jekyll Sass setup is intentional, and `_sass/_jquery.dataTables.min.scss` contains legacy hacks that are not a safe drop-in for toolchain changes.
- `_layouts/default.html` assembles the common CSS and script loading. `page.jquery: true` opts a page into `js/jquery.js`.
- Site-wide configuration, affiliate settings, analytics toggles, and language base URLs live in `_config.yml`.

## JavaScript Expectations

- Browser JavaScript in `js/*.js` is plain script code, not bundled modules. Many files expose `module.exports` only for Jest; preserve that testing pattern.
- Runtime globals are injected by templates and data files. Check `.eslintrc.json` before introducing new globals.
- Some pages rely on strict script ordering. In particular, the DataTables CDN scripts must remain ahead of `invest.js`, `icos.js`, and `marketcaps.js` in the page source.
- When adding or updating JS tests, prefer reusing helpers in `tests/helpers/` instead of duplicating DOM setup.

## Validation

- When touching any JavaScript in this repository, keep the unit test suite passing. Run `npm test` after JavaScript changes and do not leave the repo with failing JavaScript tests.
- Run `npm run eslint` after meaningful JavaScript changes.
- If you change page assembly, script tags, third-party includes, or rendered HTML behavior, rebuild the site and run `npm run test:page-console`.
- If you change external market-data integrations or the scripts that consume them, run `npm run test:api-contracts`.
