# Kraken Step-by-Step Guide — Design Spec

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan.

**Goal:** Publish a "How to use Kraken" step-by-step guide in 5 languages (ES, EN, DE, FR, PT) targeting registration + first purchase queries, with Kraken affiliate conversion.

**Date:** 2026-03-15

---

## Content

### Structure (~800 words each)
1. Intro — why Kraken (brief, link to Binance alternatives article)
2. Affiliate disclosure line (italicised, matches existing repo pattern)
3. `<!--more-->` tag after intro (defines excerpt break for post listing)
4. Step 1: Create account
5. Step 2: KYC verification — documents needed, expected time
6. Step 3: Deposit via SEPA — free, how to initiate
7. Step 4: Buy Bitcoin — place a market order
8. Conclusion + CTA → Kraken affiliate link
9. FAQ (4 questions)

### Country framing
- ES/DE/FR/PT: mention SEPA and MiCA regulation by name, country-specific intro sentence
- EN: international framing, mention wire transfer as alternative to SEPA

### Affiliate links
- Kraken: `https://invite.kraken.com/JDNW/668obv32` — `rel="nofollow sponsored"`

### Internal links
- Each post links to the Binance alternatives article (same `ref: binance-alternatives-2026`)
- ES post links to `/calculadora/`, FR to `/fr/calculateur/`, PT to `/pt/calculadora/`, DE to `/de/rechner/`, EN to `/calculator/`

---

## Files

### New posts
| Lang | File | URL |
|------|------|-----|
| ES | `_posts/202603/2026-03-15-como-usar-kraken-espana-2026.md` | `/como-usar-kraken-espana-2026/` |
| EN | `_posts/202603/en/2026-03-15-how-to-use-kraken-2026.md` | `/how-to-use-kraken-2026/` |
| DE | `_posts/202603/de/2026-03-15-kraken-anleitung-deutschland-2026.md` | `/kraken-anleitung-deutschland-2026/` |
| FR | `_posts/202603/fr/2026-03-15-comment-utiliser-kraken-2026.md` | `/comment-utiliser-kraken-2026/` |
| PT | `_posts/202603/pt/2026-03-15-como-usar-kraken-portugal-2026.md` | `/como-usar-kraken-portugal-2026/` |

### Banner image
- Source: user-provided image
- Save to: `images/posts/202603/kraken-guide.webp`
- Shared across all 5 posts via `banner_image: 202603/kraken-guide.webp`

---

## Front Matter (ES example)

```yaml
---
title: "Cómo usar Kraken desde España: guía paso a paso 2026"
tags:
- exchanges
- bitcoin
- kraken
layout: post
description: "Guía completa para registrarse en Kraken desde España, verificar tu identidad, depositar euros por SEPA y comprar Bitcoin en 2026."
banner_image: 202603/kraken-guide.webp
banner_image_alt: "Guía paso a paso para usar Kraken desde España"
lang: es
ref: kraken-guide-2026
popular: true
faq:
  - question: "¿Es Kraken legal en España?"
    answer: "Sí. Kraken está completamente regulado bajo MiCA en la Unión Europea, lo que lo hace completamente legal y seguro para usuarios españoles."
  - question: "¿Cuánto tarda la verificación KYC en Kraken?"
    answer: "Normalmente entre 1 y 3 días hábiles, aunque puede ser inmediata si los documentos son claros."
  - question: "¿Puedo depositar euros en Kraken desde España?"
    answer: "Sí. Kraken acepta transferencias SEPA gratuitas desde cualquier banco español."
  - question: "¿Cuál es la cantidad mínima para comprar Bitcoin en Kraken?"
    answer: "El mínimo de compra en Kraken es de aproximadamente 10€ para Bitcoin."
---
```

---

## Patterns to follow
- Same structure as `_posts/202603/2026-03-15-alternativas-binance-espana-2026.md`
- `ref:` links all 5 language variants for hreflang
- `popular: true` to surface in sidebar
- No `redirect_from` needed
