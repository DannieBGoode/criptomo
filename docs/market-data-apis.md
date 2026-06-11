# Market Data APIs

> Operational guide to every external market-data dependency: how each API is used, its
> limits, known failure modes, and the Netlify proxy that keeps the API key out of page
> source. Read this before touching anything that fetches prices.
> Last verified: June 2026 (PRs #94, #95, #96; current prices flipped to
> LiveCoinWatch after the CryptoCompare key's real 100-calls/month limit surfaced).

## Architecture in one paragraph

This is a static Jekyll site, so page JavaScript cannot hold secrets. **LiveCoinWatch
is the primary provider for everything; CryptoCompare is fallback-only.** Current
prices come from the keyless LiveCoinWatch list via `fetchCurrentPriceData` in
`js/calculator-common.js` (top-200 by rank, cached per fiat per page load, `MIOTA`
mapped to LiveCoinWatch's `IOTA` code). Historical prices come from the **official
LiveCoinWatch API** via `fetchLiveCoinWatchHistory` (same file), which calls the
Netlify proxy route `/api/market/lcw/history` in epoch-aligned 100-day chunks.
CryptoCompare's metered endpoints (same proxy, `CRYPTOCOMPARE_API_KEY` appended
server-side) only serve fallbacks: coins LiveCoinWatch doesn't carry, or LCW
outages. CDN cache headers on the proxy keep repeat lookups from spending quota.

## Who calls what

| File | Current price | History | Used for |
| --- | --- | --- | --- |
| `js/calculator.js` | LCW list via `fetchCurrentPriceData` (CC `/data/price` fallback) | LCW via `fetchLiveCoinWatchHistory` (CC `/data/pricehistorical` fallback) | "What would it be worth" calculator (`/calculadora/` + locales) |
| `js/invest.js` | LCW list via `fetchCurrentPriceData` (CC `/data/price` fallback) | LCW via `fetchLiveCoinWatchHistory` (CC `/data/v2/histoday` fallback) | DCA calculator (`/inversion/` + locales) |
| `js/simulator.js` | LCW list via `fetchCurrentPriceData` (CC `/data/price` fallback) | — | Price simulator (`/simulador/` + locales) |
| `js/marketcaps.js` | `https://http-api.livecoinwatch.com/coins` (direct) | — | Market-cap table |

Preset coins: BTC, ETH, LTC, MIOTA, XMR, ADA, XRP, plus a free-text custom ticker.
All presets sit inside LiveCoinWatch's top 200 (IOTA ranked ~116 in June 2026 — the
`liveCoinWatchPriceListLimit` of 200 leaves headroom; a daily contract check fails if
that stops being true). Fiat comes from each page's `#invest-fiat` select (USD
everywhere, EUR on some pages).

## CryptoCompare (CoinDesk Data)

- **History:** CoinDesk Data (CryptoCompare's owner) retired keyless access on
  **2026-05-21** — every `min-api.cryptocompare.com` call returns HTTP 401 without a key.
  That outage broke all four features above and the nightly contract job (fixed in #94).
- **Key quota (measured June 2026, not what the dashboard implies):** the free key is
  enforced at **100 calls/month** on legacy `min-api` endpoints (live `RateLimit`
  response: `max_calls {second:1, minute:10, hour:100, day:100, month:100}`). The
  larger advertised free quota presumably applies only to the new
  `data-api.coindesk.com` API (unverified). Over-limit responses are inconsistent and
  arrive as **HTTP 200**: sometimes `Response:"Error"` with empty `Data`, sometimes
  real data plus `HasWarning:true` ("soft serve") — and `/data/price` is (currently)
  not enforced at all. Page JS is **data-first** about this: parsers extract usable
  data before classifying errors, so a soft-served response renders normally instead
  of tripping the `rate limit` keyword in `isProviderApiError` (which only fires when
  no usable data came back). Budget math after the June 2026 LiveCoinWatch flip: only history lookups
  (calculator + DCA, 1 call per use on CDN cache miss) and rare current-price
  fallbacks spend quota. CDN caching (below) multiplies effective capacity because
  only cache misses hit the upstream.
- **Keys live in exactly two places each** (same name in both): the **Netlify
  environment variables** `CRYPTOCOMPARE_API_KEY` and `LIVECOINWATCH_API_KEY`
  (production and deploy previews) and the matching **GitHub Actions secrets**.
  Never commit them; never put them in page JS. To rotate: regenerate on the
  provider's settings page, update the Netlify env var, run
  `gh secret set <NAME>`.
- **`histoday` hard limit:** max 2000 days per request
  (`cryptoCompareMaxHistodayLimit` in `js/invest.js`, which also clamps the date picker).

## The Netlify proxy (`netlify/functions/market-data.js`)

- Allowlists exactly three CryptoCompare upstream paths: `/data/price`,
  `/data/pricehistorical`, `/data/v2/histoday`. Anything else → 404 without an upstream
  call. **Adding an endpoint means adding it to `ALLOWED_ENDPOINTS` with a cache
  profile.**
- Additionally serves `GET /api/market/lcw/history?code=BTC&currency=USD&start=<ms>&end=<ms>`,
  translated server-side into the official LiveCoinWatch API's
  `POST /coins/single/history` with the `LIVECOINWATCH_API_KEY` header (free tier:
  10k credits/day, 1 credit per call). Ranges ending on a closed past day get the
  immutable 1-year cache; ranges touching today get the short window.
- **LiveCoinWatch history facts (measured June 2026):** the upstream caps every
  response at ~101 points and adapts resolution to the range — a 100-day window
  returns daily points, a 2-day window returns hourly. That is why
  `fetchLiveCoinWatchHistory` fetches **100-day chunks aligned to a fixed epoch
  grid**: identical chunk URLs across visitors maximize CDN cache hits, and a
  worst-case 2000-day DCA query costs 20 chunks (≈20 credits uncached, ~0 cached).
  Daily BTC data verified back to at least **Nov 2014**; IOTA/XMR and EUR all work.
  Occasional missing days appear as 48h gaps — `buildInvestmentRows` already
  tolerates them. Cold upstream fetches for old ranges can take several seconds;
  in production the immutable CDN cache makes that a one-time cost per chunk.
- **Burst rate limit:** firing all ~21 chunks of a 2000-day query in parallel can
  draw HTTP 429s from the official API (observed June 2026; every visitor shares
  one key through the proxy, so bursts aggregate). `fetchLiveCoinWatchHistory`
  therefore caps chunk fetches at **4 in flight** and retries a 429'd chunk once
  after 750ms before falling back to CryptoCompare. Keep that throttle if you
  touch the helper. On any chunk failure the whole LiveCoinWatch attempt is
  discarded (never partially rendered) and the page falls back to one
  CryptoCompare call, then to the error message. Error classification is
  evidence-based: when LiveCoinWatch answers successfully with **zero points**
  (coin didn't exist on that date), the rejection carries
  `liveCoinWatchNoData: true`, and if CryptoCompare can't answer either the
  page shows a **date** error (red date input + suggested date) instead of a
  misleading API error.
- **Chunk skipping:** the DCA page passes the exact dates its calculation reads
  (`buildInvestNeededTimes`), and chunks containing none of them are skipped —
  a single-purchase calculation costs 1 request, yearly DCA ~6, while
  daily/weekly/monthly genuinely need the full range.
- Strips any client-supplied `api_key` before appending the server-side one.
- Cache headers by data type:
  - Current prices (`price`): `max-age=60`, CDN `s-maxage=300, durable`.
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
  There is no single-coin or code-filter access (probed June 2026: `search`, `code`,
  `codes`, `codes[]` params are all ignored; `/coins/<CODE>` and `/search` are
  auth-walled) — fetching a ranked slice is the only keyless read.
- Since June 2026 it serves **all current prices** for the calculator, DCA, and
  simulator pages through `fetchCurrentPriceData` in `js/calculator-common.js`:
  one top-200 fetch per (page load, fiat), answered from an in-page cache afterwards.
  Coins outside the list fall back to the CryptoCompare `/data/price` proxy.
  **LiveCoinWatch lists IOTA as `IOTA`, not `MIOTA`** — the alias map in
  `calculator-common.js` translates; add new aliases there if presets change.
- It could disappear without notice, like CoinDesk's free tier did. The daily
  contract job watches both the marketcaps shape (`limit=1`) and the calculators'
  price list (`limit=200`, depth ≥150, IOTA present). If LiveCoinWatch dies, the
  calculators silently degrade to CryptoCompare fallback — which the 100/month quota
  cannot sustain, so treat a red LiveCoinWatch contract check as urgent. The official
  LiveCoinWatch API (`api.livecoinwatch.com`) requires a key (free tier: 10k
  credits/day) and is POST-based — it would need a proxy like the CryptoCompare one.

## Monitoring

- `.github/workflows/live-api-contracts.yml` runs `npm run test:api-contracts` daily at
  06:17 UTC and on manual dispatch. It checks the real provider responses against the
  shapes the site depends on. A red run = provider drift — investigate before users
  notice. Scheduled runs check **LiveCoinWatch only**: the legacy market list,
  the top-200 price list, and the keyed official-history check (the last only
  where `LIVECOINWATCH_API_KEY` is set). The three CryptoCompare fallback checks
  are **off by default** — scheduled runs would spend the fallback's
  100-calls/month quota on watching the fallback. Run them on demand via the
  workflow-dispatch checkbox ("Also check the CryptoCompare fallback endpoints")
  or locally with `API_CONTRACT_INCLUDE_CRYPTOCOMPARE=1`.
- A red **LiveCoinWatch** check is urgent: it is the primary provider, and the
  CryptoCompare fallback's 100-calls/month quota cannot carry production traffic.
- Reports are uploaded as a **public artifact**, which is why
  `bin/check-api-contracts.js` redacts `api_key` from every endpoint/error it prints.
  Keep that property if you modify the script.
- Run locally with `CRYPTOCOMPARE_API_KEY=<key> npm run test:api-contracts`.

## Local development gotchas

- `npm run dev` serves plain Jekyll: **`/api/market/*` does not exist locally**, so the
  market features 404 in the dev server. Use `netlify dev` if you need the proxy
  locally; otherwise rely on Jest (`npm test`) and the page smoke test.
- `npm run test:page-console` intercepts `min-api.cryptocompare.com`, same-origin
  `/api/market/*`, and `http-api.livecoinwatch.com` URLs with stubs
  (`getStubbedPayload` in `bin/check-page-console-errors.js`); the LiveCoinWatch stub
  serves BTC/ETH/IOTA. **If you change a fetch URL in page JS, update that matcher**
  or the smoke test will report network failures.
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
