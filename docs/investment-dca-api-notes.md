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

- Public endpoints work without a key for the current site behavior.
- Rate limiting is still a risk. The repo already documents `CRYPTOCOMPARE_API_KEY` for server-side contract checks.
- For production hardening, the next step would be a Netlify/server proxy that keeps any paid key out of browser source.

### CoinDesk

- No extra paid work was needed for the old BTC-only implementation.
- It no longer satisfies the product requirement because it does not cover the non-BTC assets needed here.

## Main challenge

This repository is a static Jekyll site. Any paid API key placed directly in page JavaScript would be public. That makes browser-safe public endpoints the practical default unless the project adds a proxy layer.
