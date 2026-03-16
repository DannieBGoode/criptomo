# HowTo Schema — Design Spec

**Date:** 2026-03-16
**Status:** Approved

## Overview

Add `HowTo` JSON-LD schema to step-by-step guide posts on criptomo.com, following the same front-matter-driven pattern already used for `FAQPage` schema. This is the only schema type identified as missing from the codebase audit.

## Pattern

Mirrors `_includes/schema_faq.html` exactly:

- A new `_includes/schema_howto.html` include fires when `page.how_to` is present
- Included in `_layouts/default.html` alongside `schema_faq.html`
- Authors add a `how_to` array to post front matter — no changes to post body required

## Front Matter Format

```yaml
how_to:
  - name: "Crea una cuenta en Kraken"
    text: "Ve a kraken.com, haz clic en Registrarse e introduce tu email y contraseña."
  - name: "Verifica tu identidad"
    text: "Sube una foto de tu DNI o pasaporte para cumplir con los requisitos KYC."
```

Each step has two fields only: `name` (short label) and `text` (description). No `url` or `image` — keeps it consistent with the FAQ pattern and eliminates anchor-link maintenance burden.

## Generated JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "<page.title>",
  "description": "<page.description>",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Crea una cuenta en Kraken",
      "text": "Ve a kraken.com, haz clic en Registrarse e introduce tu email y contraseña."
    }
  ]
}
```

## Files Changed

| File | Change |
|---|---|
| `_includes/schema_howto.html` | New — generates HowTo JSON-LD when `page.how_to` present |
| `_layouts/default.html` | Add `{% if page.how_to %}{% include schema_howto.html %}{% endif %}` alongside `schema_faq.html` |
| `_posts/201712/2017-12-03-como-comprar-criptomonedas.md` | Add `how_to` front matter |
| `_posts/201711/2017-11-23-como-guardar-criptomonedas.md` | Add `how_to` front matter |
| `_posts/201712/2017-12-13-como-comprar-altcoins.md` | Add `how_to` front matter |

Additional posts to check and add if step-by-step: any other `como-*` posts.

## Out of Scope

- `totalTime`, `estimatedCost`, per-step `image` or `url` fields
- Auto-extraction of steps from post headings
- Translating `how_to` steps (front matter is language-specific per post file)
