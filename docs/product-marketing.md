# Product Marketing Guide

> This file provides marketing, SEO, and content context for AI agents working on this project.
> Update it whenever strategy, audience, or positioning changes.

## Product Overview

Criptomo (criptomo.com) is an independent, multilingual cryptocurrency and Bitcoin education blog. It covers the fundamentals of crypto, blockchain theory, investment strategy, security, and altcoins — written in plain language with a "learning by teaching" philosophy. The author, Daniel Calatayud (a frontend engineer based in Madrid), writes from personal experience and combines empirical data with his own opinions.

Unlike exchange-backed education portals (Bit2Me Academy, Binance Academy), Criptomo has no conflict of interest. It also offers interactive tools: a compound investment calculator, a FIRE calculator, a live market cap tracker, a crypto price explorer, and a glossary — features absent from most Spanish-language competitors.

The site publishes in 5 languages: Spanish (default/root), English (`/en`), German (`/de`), French (`/fr`), and Portuguese (`/pt`).

## Target Audience

- **Primary:** Spanish-speaking retail investors and crypto beginners in Spain and Latin America (Mexico, Argentina, Colombia, etc.) who want to understand before they invest.
- **Secondary:** English, German, French, and Portuguese speakers in Europe and the Americas at a similar beginner-to-intermediate knowledge level.
- **Key pain points:**
  - Overwhelmed by jargon and conflicting information online
  - Unsure where to buy crypto safely and which exchange to use
  - Afraid of making costly beginner mistakes (security, scams, poor strategy)
  - Want to understand the technology, not just speculate
  - Looking for independent advice not tied to a platform trying to sell them something
- **Where they hang out:** Google Search (informational queries), Reddit (r/Bitcoin, r/CryptoMoonShots, local LATAM subs), Twitter/X, YouTube, Telegram groups

## Competitive Landscape

| Competitor | URL | Strengths | Weaknesses | Our Differentiator |
|---|---|---|---|---|
| Bit2Me Academy | academy.bit2me.com | Largest ES education portal (450+ guides), structured courses, strong SEO | Exchange-owned (bias risk), no independent voice, no interactive tools | Independent + free tools |
| CriptoNoticias | criptonoticias.com | #1 LATAM crypto traffic (~1.35M/mo), broad geographic reach | News-first, education is secondary, no calculators or tools | Education-first depth |
| Cointelegraph ES | es.cointelegraph.com | Global brand, deep backlink profile, broad ES coverage | Primarily news, content translated from EN (not native), ad-heavy | Native editorial voice |
| Binance Academy | academy.binance.com | 31 languages, 680+ articles, Learn & Earn rewards program | Exchange-owned (heavy bias), ES content thinner than EN, no live data | Independence + tools |
| CoinMarketCap Learn | coinmarketcap.com/academy | Attached to #1 price tracker, massive audience, high velocity | EN-centric, variable quality, no courses or structured learning paths | Structured, deep ES content |
| 99Bitcoins | 99bitcoins.com | ~1M monthly visits, DA 75, beginner-friendly, strong YouTube | English-only, no tools, thin on investment strategy and DeFi | Multilingual + tools |
| Investopedia (crypto) | investopedia.com | 80M monthly visits, highest DA, mainstream trust | Crypto is a subsection, short shallow articles, no Spanish | Crypto-specialist depth |

## Unique Value Proposition

Criptomo is the independent, education-first crypto resource for Spanish-speaking and European audiences — combining in-depth guides, honest editorial opinion, and interactive tools, with no exchange affiliation or conflict of interest.

## Brand Voice & Tone

- **Voice:** Knowledgeable but approachable — the author explains things the way a smart friend with engineering background would, not a textbook or a salesperson.
- **Tone:** Educational, clear, balanced. Presents pros and cons. Uses bolded key terms. Comfortable with opinion, especially on investment strategy.
- **Avoid:** Hype, price predictions, "to the moon" language, FUD, excessive technical jargon without explanation, anything that sounds like sponsored content.
- **Example phrases:**
  - ✅ "Una de las características clave de Uniswap es que es una plataforma descentralizada..."
  - ✅ "El blog se creó siguiendo la filosofía de que si realmente quieres aprender algo deberías explicárselo al resto de la gente."
  - ❌ "¡Bitcoin va a subir un 1000%! No te lo pierdas."

## Marketing Goals

1. **Grow organic search traffic** (primary) — especially long-tail informational and transactional queries in Spanish and English
2. **Grow affiliate revenue** via organic traffic growth (Kraken affiliate is the primary monetization lever)
3. **Build topical authority** in the Spanish-language crypto education space to compete with Bit2Me Academy and CriptoNoticias
4. **Grow email list** (Mailchimp) as a traffic retention and re-engagement channel

## Marketing Channels

- **Active:** Organic SEO (primary), Twitter/X (@danniebgoode), Mailchimp email newsletter
- **Planned:** Potential reintroduction of display ads (Google Ads — currently disabled for pagespeed; worth revisiting with lazy-loading or Partytown)
- **Not pursuing:** Paid search, YouTube, social media content creation, influencer marketing

## SEO Strategy

### Primary Keywords / Topic Clusters

| Keyword / Topic Cluster | Intent | Priority | Notes |
|---|---|---|---|
| qué es bitcoin / what is bitcoin | Informational | High | Core pillar; foundational content already exists |
| comprar bitcoin / buy bitcoin | Transactional | High | Conversion opportunity — Kraken affiliate |
| criptomonedas para principiantes | Informational | High | Top-of-funnel; drives volume |
| invertir en criptomonedas / invest in crypto | Informational + Transactional | High | Connects education to affiliate conversion |
| mejor exchange de criptomonedas / best crypto exchange | Transactional | High | Direct Kraken affiliate opportunity; currently under-served |
| DeFi / qué es DeFi | Informational | Medium | Growing topic; existing content (Uniswap, Metamask) |
| estrategia de inversión cripto | Informational | Medium | Differentiator vs. news sites; existing content |
| calculadora de interés compuesto crypto | Informational + Tool | Medium | Unique tool differentiator — worth promoting |

### Target Markets

- **Languages:** Spanish (primary), English, German, French, Portuguese
- **Geographies:** Spain, Mexico, Argentina, Colombia, United States (Hispanic), Germany, France, Brazil, Portugal, United Kingdom

### Technical SEO Notes

- `jekyll-sitemap` plugin generates sitemap automatically
- Google Search Console: verified (`JN4EGGyUz-6deV8bY40-FqwE_4xwc4k7I4oCaUr7HhU`)
- Google Tag Manager: GTM-TV5P5BH (GA4 tracked through GTM)
- Canonical: Jekyll handles per-page permalinks; hreflang implementation should be audited for multilingual pages (`ref:` front matter used for cross-language linking)
- Meta descriptions: set per-page in front matter (`description:` field)
- Images: using `.webp` format in recent posts — good
- Pagespeed: Google Ads disabled intentionally; Partytown available but currently off (`partytown: false`)
- Internal linking: `ref:` front matter links language variants; posts use manual internal links

## Content Strategy

### Content Types

| Type | Purpose | Status |
|---|---|---|
| Explainer guides ("qué es X") | Top-of-funnel traffic, topical authority | 184 posts published |
| Investment strategy posts | Mid-funnel, builds trust | Some existing; needs expansion |
| Exchange comparisons / reviews | High transactional intent, affiliate conversion | **Gap — largely missing** |
| Interactive tools (calculator, FIRE, marketcaps) | Engagement, differentiation, long-tail traffic | Live; could be promoted more |
| Glossary | SEO for definitional queries, internal linking hub | Live |
| Altcoin explainers | Informational traffic for token queries | Many published; can continue |
| "Best of" / comparison posts | Transactional intent, affiliate opportunities | **Gap — largely missing** |

### Content Pillars / Topic Clusters

1. **Bitcoin fundamentals** — what it is, how it works, how to buy, how to store
2. **Cryptocurrency investing** — strategy, risk, DCA, portfolio management, FIRE
3. **Blockchain & technology** — consensus mechanisms, smart contracts, DeFi, Web3
4. **Security** — wallets, seed phrases, password managers, protecting assets
5. **Exchange & product guides** — where to buy, exchange comparisons, crypto debit cards *(affiliate lever)*
6. **Altcoins** — per-coin explainers (Ethereum, Solana, Cardano, etc.)

### Content Guidelines

- Target 800–1500 words for standard explainers; 1500–2500 for pillar/comparison content
- Always include: at least 2–3 internal links, a clear conclusion, relevant affiliate CTA where natural
- Multilingual posts: use `ref:` front matter to link language variants; publish ES first, then EN
- Affiliate disclosure: add a short disclaimer when recommending exchanges or products
- Images: use `.webp`, include descriptive `alt` text for SEO
- Internal linking strategy: hub pages (`/guias/`, `/calculator/`, `/cryptocurrencies/`) should be linked from relevant posts

## Monetization

- **Kraken affiliate** *(primary)*: Link `https://invite.kraken.com/JDNW/668obv32`, code `3ryh835p`. Banner template at `_includes/calculator_affiliate_banner.html`. Config at `_config.yml` under `kraken.affiliate_link` / `kraken.affiliate_code`. Currently shown on calculator page. **Opportunity: add to exchange comparison posts and "how to buy" guides.**
- **Ledger affiliate** *(inactive)*: Mentioned by owner as never gaining traction. No link/code currently in `_config.yml`. **Opportunity: apply for Ledger affiliate program and add to wallet/security content.**
- **Crypto donations**: BTC (`bc1qgjqj7du7h5mtvt4wq7q68uneyhyu0730f79g35`), BCH, ETH. Displayed on About page.
- **Google Display Ads** *(disabled)*: Turned off to improve Core Web Vitals / pagespeed. `ads.google: false` in `_config.yml`. **Opportunity: re-evaluate with Partytown (`partytown: true`) or lazy-loading approach to recover revenue without sacrificing pagespeed score.**
- **Email list**: Mailchimp. URL in `_config.yml` under `mailchimp.url` (legacy `mailchimp_url_es` still exists). The site submits locale through Mailchimp's language dropdown field configured in `_config.yml`.

## Key Pages

| Page | URL | SEO / Marketing Purpose |
|---|---|---|
| Homepage | / | Brand entry, SEO hub for top-level queries |
| Guides / Start Here | /guias/ | Top-of-funnel onboarding, internal linking hub |
| Calculator | /calculadora/ | Tool-based SEO + Kraken affiliate conversion |
| FIRE Calculator | /calculadora-fire/ | Niche audience (FIRE movement + crypto) |
| Live Marketcaps | /criptomonedas/ | High-frequency return visits, price-related SEO |
| Glossary | /glosario/ | Definitional SEO, internal linking source |
| Start Here (EN) | /en/start-here/ | EN onboarding hub — needs content audit |
| Invest | /invertir/ | Transactional intent — affiliate opportunity |

## Analytics & Tracking

- **Google Analytics 4:** Set up via Google Tag Manager (GTM-TV5P5BH)
- **Google Search Console:** Verified (`google_site_verification` key set in `_config.yml`)
- **Disqus comments:** Shortname `criptomo` (comment engagement data)
- **Email:** Mailchimp (per-locale signup language is submitted by the site)

## Action Items

- [ ] Audit hreflang implementation across multilingual pages — ensure all language variants are correctly cross-referenced
- [ ] Create exchange comparison / "best crypto exchange" content to capture high-intent transactional traffic and grow Kraken affiliate conversions
- [ ] Investigate Partytown (`partytown: true`) or lazy-loading Google Ads to re-enable display revenue without hurting pagespeed
- [ ] Apply for Ledger affiliate program and add affiliate links to wallet and security posts
- [ ] Audit existing "how to buy bitcoin/crypto" posts for Kraken affiliate CTA placement
- [ ] Research and target top 10 informational keywords not yet covered in Spanish
- [ ] Keep `_config.yml` Mailchimp language values aligned with the hosted Mailchimp form if dropdown options change
