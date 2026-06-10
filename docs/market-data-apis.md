# Market Data APIs

> Operational guide to every external market-data dependency: how each API is used, its
> limits, known failure modes, and the Netlify proxy that keeps the API key out of page
> source. Read this before touching anything that fetches prices.
> Last verified: June 2026 (PRs #94, #95, #96).

## Architecture in one paragraph

This is a static Jekyll site, so page JavaScript cannot hold secrets. All CryptoCompare
calls go through a Netlify Function proxy at `/api/market/*`
(`netlify/functions/market-data.js`, routed by `netlify.toml`), which appends the
`CRYPTOCOMPARE_API_KEY` environment variable server-side and sets CDN cache headers so
repeat lookups do not spend API quota. The LiveCoinWatch market list is still called
directly from the browser because it needs no key.

## Who calls what

| File | Endpoint (via `/api/market` unless noted) | Used for |
| --- | --- | --- |
| `js/calculator.js` | `/data/price`, `/data/pricehistorical` | "What would it be worth" calculator (`/calculadora/` + locales) |
| `js/invest.js` | `/data/v2/histoday`, `/data/price` | DCA calculator (`/inversion/` + locales) |
| `js/simulator.js` | `/data/price` | Price simulator (`/simulador/` + locales) |
| `js/icos.js` | `/data/pricemulti` | ICO table (`/icos/`) |
| `js/marketcaps.js` | `https://http-api.livecoinwatch.com/coins` (direct, no proxy) | Market-cap table |

Preset coins: BTC, ETH, LTC, MIOTA, XMR, ADA, XRP, plus a free-text custom ticker.
Fiat comes from each page's `#invest-fiat` select (USD everywhere, EUR on some pages);
the proxy forwards whatever `tsyms` it receives.

## CryptoCompare (CoinDesk Data)

- **History:** CoinDesk Data (CryptoCompare's owner) retired keyless access on
  **2026-05-21** — every `min-api.cryptocompare.com` call returns HTTP 401 without a key.
  That outage broke all four features above and the nightly contract job (fixed in #94).
- **Key:** free tier is **11,000 calls/month** (as of June 2026; new accounts still get
  this from <https://developers.coindesk.com/settings/api-keys>). Paid plans have no
  public pricing — sales-gated. Budget math: 11k/month ≈ 366/day; calculator and DCA
  cost 2 upstream calls per use, simulator/icos 1; the nightly CI job spends ~3/day.
  CDN caching (below) multiplies effective capacity because only cache misses hit the
  upstream.
- **Key lives in exactly two places** (same name in both): the **Netlify environment
  variable** `CRYPTOCOMPARE_API_KEY` (applies to production and deploy previews) and the
  **GitHub Actions secret** `CRYPTOCOMPARE_API_KEY` (used by the nightly contract job).
  Never commit it; never put it in page JS. To rotate: regenerate on the CoinDesk
  settings page, update the Netlify env var, run
  `gh secret set CRYPTOCOMPARE_API_KEY`.
- **`histoday` hard limit:** max 2000 days per request
  (`cryptoCompareMaxHistodayLimit` in `js/invest.js`, which also clamps the date picker).

## The Netlify proxy (`netlify/functions/market-data.js`)

- Allowlists exactly four upstream paths: `/data/price`, `/data/pricemulti`,
  `/data/pricehistorical`, `/data/v2/histoday`. Anything else → 404 without an upstream
  call. **Adding an endpoint means adding it to `ALLOWED_ENDPOINTS` with a cache
  profile.**
- Strips any client-supplied `api_key` before appending the server-side one.
- Cache headers by data type:
  - Current prices (`price`, `pricemulti`): `max-age=60`, CDN `s-maxage=300, durable`.
  - Historical (`pricehistorical`, `histoday`): if the `ts`/`toTs` query param is
    **before the start of the current UTC day**, the data is immutable →
    `s-maxage=31536000, immutable, durable` (1 year). Same-day, missing, or invalid
    timestamps get the short window because today's candle is still moving.
  - Upstream errors and 404s: `no-store` (never cache failures).
- **Netlify cache facts** (verified empirically on deploy preview, June 2026):
  - Function responses are cache-keyed **including the full query string by default** —
    no `Netlify-Vary` needed. (A Codex bot review on PR #94 claimed otherwise; it was
    wrong. Evidence in that PR's review thread.)
  - The durable cache works on **all plans including free legacy**, at no extra cost.
  - **Every deploy purges the entire CDN/durable cache**, so the 1-year TTL really
    means "until the next master push". This is why long TTLs are safe.
- `netlify.toml` intentionally has **no `[build]` section** — build settings live in the
  Netlify UI. Don't add one without checking the UI config first.

## LiveCoinWatch (legacy API)

- `https://http-api.livecoinwatch.com/coins?offset=0&limit=N&sort=rank&...&currency=X`
  is an **undocumented internal API** — keyless, CORS-open, supports at least USD and
  EUR. It returns current price/cap/rank/deltas plus normalized 40-point sparkline
  arrays, but **no dated history** (its `/coins/history` endpoint is auth-walled).
- It could disappear without notice, like CoinDesk's free tier did. Do not build new
  features on it. The official LiveCoinWatch API (`api.livecoinwatch.com`) requires a
  key (free tier: 10k credits/day) and is POST-based — it would need a proxy like the
  CryptoCompare one.

## Monitoring

- `.github/workflows/live-api-contracts.yml` runs `npm run test:api-contracts` daily at
  06:17 UTC and on manual dispatch. It checks the real provider responses against the
  shapes the site depends on. A red run = provider drift — investigate before users
  notice.
- Reports are uploaded as a **public artifact**, which is why
  `bin/check-api-contracts.js` redacts `api_key` from every endpoint/error it prints.
  Keep that property if you modify the script.
- Run locally with `CRYPTOCOMPARE_API_KEY=<key> npm run test:api-contracts`.

## Local development gotchas

- `npm run dev` serves plain Jekyll: **`/api/market/*` does not exist locally**, so the
  market features 404 in the dev server. Use `netlify dev` if you need the proxy
  locally; otherwise rely on Jest (`npm test`) and the page smoke test.
- `npm run test:page-console` intercepts both `min-api.cryptocompare.com` and
  same-origin `/api/market/*` URLs with stubs (`getStubbedPayload` in
  `bin/check-page-console-errors.js`). **If you change a fetch URL in page JS, update
  that matcher** or the smoke test will report network failures.
- Deploy previews get the Netlify env var, so `/api/market/*` works on
  `deploy-preview-N--criptomo-com.netlify.app` — useful for end-to-end verification
  before merge.

## If CryptoCompare goes away (researched June 2026)

Keyless, CORS-open alternatives evaluated when the 401s hit:

| Provider | Pros | Cons |
| --- | --- | --- |
| **CoinGecko** (free, keyless) | All 7 preset coins incl. XMR/MIOTA, USD+EUR, per-client-IP rate limits (ideal for static sites) | Historical data limited to **last 365 days** (401 beyond); uses ids (`bitcoin`) not tickers — needs a symbol map + `/search` for custom tickers |
| **Binance klines** | Full daily OHLC back to 2017, generous limits | **No XMR** (delisted 2024); geo-blocked in the US |
| **Kraken public** | Has XMR | OHLC capped at ~720 daily candles (~2 years) |
| LiveCoinWatch official | Already a vendor | Keyed POST API; needs proxy; free tier limits |

Recommended combo at the time: CoinGecko for current prices + recent history, Binance
for deep history, accepting the XMR gap — only worth building if CoinDesk pricing or
limits become untenable.

## Checklist for changing market-data code

1. New/changed upstream endpoint → update `ALLOWED_ENDPOINTS` + cache profile in
   `netlify/functions/market-data.js` and its Jest suite
   (`tests/market-data-function.test.js`).
2. Changed fetch URL in page JS → update the stub matcher in
   `bin/check-page-console-errors.js` and any URL assertions in `tests/`.
3. New provider or response shape → add a contract check in
   `bin/check-api-contracts.js` (keep key redaction).
4. Validate: `npm test`, `npm run eslint`,
   `CRYPTOCOMPARE_API_KEY=<key> npm run test:api-contracts`, then build +
   `npm run test:page-console` on the affected pages.
