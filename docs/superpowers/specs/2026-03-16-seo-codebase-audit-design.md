# Design: SEO Codebase Audit — Step 2.5 for seo-report skill

**Date:** 2026-03-16
**Status:** Approved

## Problem

The `/seo` skill's competitive intelligence comment (Step 2) recommends technical SEO improvements derived from generic web searches. It has no awareness of the codebase, so it regularly recommends things already implemented (e.g. "add FAQPage schema" when `_includes/schema_faq.html` already exists). This creates noise and erodes trust in the report.

## Goal

Insert a **Step 2.5** between the competitive intelligence web searches (Step 2) and the GitHub comment (Step 3) that:

1. Runs a **full technical SEO audit** of the codebase against a fixed checklist every week
2. **Cross-references** competitive intelligence recommendations against those findings
3. Filters the comment so **only pending/missing items appear** — nothing already implemented is shown

## Architecture

```
Step 2  — 5 parallel web searches → CI markdown text
Step 2.5 — Codebase audit         → implemented[] / missing[] JSON
Step 3  — Post GitHub comment     → only missing[] items shown
```

Step 3's API call is unchanged; only the comment body construction changes.

## Step 2.5 Detail

### 2.5a — Dispatch Explore subagent

Dispatch an Explore subagent with:
- The full CI markdown text from Step 2
- The structured checklist (see below)
- The codebase root path
- Output format: JSON `{ "implemented": [...], "missing": [...] }`

Each item in both arrays has:
```json
{ "name": "FAQPage schema", "evidence": "_includes/schema_faq.html:5" }
```
`evidence` is `null` for missing items.

### 2.5b — Structured checklist

The subagent audits every item in this checklist, regardless of whether CI mentioned it:

**Schema Markup**
- Article JSON-LD — look for `"@type": "Article"` in `_includes/`
- Person JSON-LD — look for `"@type": "Person"` in `_includes/`
- FAQPage JSON-LD — look for `"@type": "FAQPage"` in `_includes/`
- Organization JSON-LD — look for `"@type": "Organization"` in `_includes/`
- WebSite JSON-LD — look for `"@type": "WebSite"` in `_includes/`
- BreadcrumbList JSON-LD — look for `"@type": "BreadcrumbList"` in `_includes/`
- HowTo JSON-LD — look for `"@type": "HowTo"` in `_includes/`
- Review/AggregateRating JSON-LD — look for `"@type": "Review"` in `_includes/`
- `inLanguage` on Article — look for `inLanguage` in schema includes

**Head / Meta**
- Meta description — look for `meta name="description"` in `_includes/`
- Open Graph tags — look for `og:title`, `og:description` in `_includes/`
- Twitter Card tags — look for `twitter:card` in `_includes/`
- Canonical URL — look for `rel="canonical"` in `_includes/`
- hreflang alternate links — look for `rel="alternate"` and `hreflang` in `_includes/`

**Multilingual**
- `lang` attribute on `<html>` — look in `_layouts/default.html`
- Per-language page variants — look for language subdirectories in `_pages/` or `_posts/`
- Language-aware layouts — look for `page.lang` usage in layouts/includes

**Technical**
- sitemap.xml — look for `sitemap.xml` or sitemap plugin in `_config.yml`
- robots.txt — look for `robots.txt` in root or `_pages/`
- Image alt attributes — look for `alt=` usage in post/page layouts
- Asset preload hints — look for `<link rel="preload"` in `_layouts/`

**Content**
- Author byline in post template — look for author name rendering in `_layouts/post.html`
- Author bio/page — look for author layout or author pages in `_layouts/` or `_pages/`
- Internal linking — look for related posts or link includes in `_includes/`

### 2.5c — CI cross-reference

The subagent also scans the CI markdown text for any freeform recommendations not on the checklist (e.g. "publish a MiCA post", "add DeFi content pillar") and evaluates each:
- Content recommendations: check if a matching post/page already exists in `_posts/` or `_pages/`
- Technical recommendations: attempt to find evidence in the codebase

Any freeform recommendation found to be already implemented is added to `implemented[]`.

## Modified Comment Structure (Step 3)

```markdown
## 🕵️ Competitive Intelligence — [Month Year]

### Technical SEO Gaps
[only missing[] items from the full checklist audit]
- ❌ HowTo schema — not found in _includes/
- ❌ Author byline in post template — not found in _layouts/post.html

### Trending Topics & Content Gaps
[from web searches — only topics not already covered by existing posts]

### Competitor Keyword Gaps
[only keywords not already targeted]

### Long-Tail Opportunities
...

### Algorithm Update Notes
...

## 🎯 Top Priorities
[only actionable pending items, prioritised]
```

Items already implemented are **silently omitted**. No "already implemented" section — the comment stays fully focused on what needs doing.

## Explore Subagent Prompt Template

```
You are auditing a Jekyll codebase for technical SEO implementation.

CODEBASE ROOT: <path>

COMPETITIVE INTELLIGENCE TEXT (from this week's web searches):
<ci_text>

CHECKLIST:
<5-category checklist>

Instructions:
1. For each checklist item, search the codebase and determine: implemented or missing
2. For each CI recommendation not on the checklist, check if it's already done (content exists, feature implemented)
3. Return ONLY valid JSON:
{
  "implemented": [
    { "name": "FAQPage schema", "evidence": "_includes/schema_faq.html:5" }
  ],
  "missing": [
    { "name": "HowTo schema", "evidence": null },
    { "name": "MiCA regulation post", "evidence": null }
  ]
}
Do not include any text outside the JSON object.
```

## Success Criteria

- The weekly comment never recommends something already in the codebase
- All checklist items are audited every week regardless of what CI web searches returned
- Comment is shorter and more actionable than before
- No new external dependencies or API calls required
- Works for any Jekyll site, not just criptomo

## Out of Scope

- Fixing missing items automatically (the skill only reports, not implements)
- Auditing JS/CSS quality or bundle size
- Checking runtime behaviour (only static file analysis)
