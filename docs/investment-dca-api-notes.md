# DCA Calculator API Notes

## Goal

Support the investment calculator (`/inversion/` and localized variants) with the same preset coin options as the simple calculator:

- BTC
- ETH
- LTC
- MIOTA
- XMR
- ADA
- XRP
- Custom ticker via the editable input

## Chosen implementation

The DCA calculator now uses CryptoCompare for both:

- Current price: `/data/price`
- Daily history: `/data/v2/histoday`

This matches the rest of the repo's calculator stack and allows a single client-side integration for multi-coin support.

## Why CryptoCompare

- Multi-asset coverage: supports BTC plus the calculator's other preset tickers.
- Daily historical data: `histoday` is enough for the calculator's recurring-buy timeline.
- Existing dependency: the simple calculator already uses CryptoCompare endpoints, so this keeps provider sprawl down.
- Public access: the current site is static, so a browser-callable endpoint is the lowest-friction option.

## Alternatives reviewed

### CoinDesk historical days endpoint

- Strength: simple daily OHLC response.
- Limitation: the repo used the BTC-only `XBX-USD` instrument, so it could not power ETH, LTC, ADA, or custom tickers.
- Result: not suitable for issue #82.

### LiveCoinWatch

- Strength: already used elsewhere in the repo for market-cap data.
- Limitation: not the right fit for this page's client-side historical DCA flow.
- Requirement: if used for this calculator, it would be better behind a server-side proxy instead of direct browser calls.

## Cost and operational notes

### CryptoCompare

- **Update 2026-06:** CoinDesk Data (CryptoCompare's owner) retired keyless access on 2026-05-21; every `min-api` call now requires an API key. The current free allowance is 11,000 calls/month.
- Browser code therefore calls the Netlify Function proxy at `/api/market/*` (`netlify/functions/market-data.js`), which appends the key server-side from the `CRYPTOCOMPARE_API_KEY` Netlify environment variable and sets CDN cache headers (5 minutes for current prices, 1 day for historical data) so repeat lookups do not spend quota.
- The same key is stored as a GitHub Actions secret for the scheduled contract checks; `bin/check-api-contracts.js` redacts it from reports.

### CoinDesk

- No extra paid work was needed for the old BTC-only implementation.
- It no longer satisfies the product requirement because it does not cover the non-BTC assets needed here.

## Main challenge

This repository is a static Jekyll site. Any API key placed directly in page JavaScript would be public. Since CryptoCompare ended keyless access, the project uses the proxy layer described above: pages call same-origin `/api/market/*` routes and the Netlify Function holds the key.
