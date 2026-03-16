# Design: SEO Codebase Audit — Step 2.5 for seo-report skill

**Date:** 2026-03-16
**Status:** Under Review

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
Step 2.5 — Codebase audit         → { implemented[], missing[], unchecked[] }
Step 3  — Post GitHub comment     → only missing[] items shown
```

Step 3's API call is unchanged; only the comment body construction changes.

## Step 2.5 Detail

### 2.5a — Dispatch Explore subagent

Dispatch an Explore subagent with:
- The full CI markdown text from Step 2
- The full structured checklist (inlined verbatim — see section 2.5b)
- The codebase root path
- Explicit exclusion list: `_site/`, `node_modules/`, `.git/`, `vendor/`
- Output format: JSON with three arrays (see below)

Each item across all arrays has:
```json
{
  "name": "FAQPage schema",
  "evaluated": true,
  "evidence": "_includes/schema_faq.html:5"
}
```

The JSON structure uses **three distinct arrays**:
- `implemented[]` — found in codebase; `evidence` is a file path (and line if applicable)
- `missing[]` — searched and not found; `evidence` is `null`; `evaluated` is `true`
- `unchecked[]` — subagent could not evaluate (e.g. ambiguous pattern, timeout); `evaluated` is `false`

### 2.5b — Error handling

If the subagent returns malformed JSON, empty output, or an error:
- Log a warning: `⚠️ Codebase audit failed: <reason>`
- Fall back to posting the full CI comment unfiltered
- Prepend a visible notice to the comment:
  > ⚠️ Codebase audit could not run this week — recommendations may include items already implemented.

This ensures the comment is never silently wrong.

### 2.5c — Structured checklist (inlined verbatim in subagent prompt)

The subagent audits every item below. For each item, the detection guidance tells it where to look. Exclude `_site/`, `node_modules/`, `.git/`, `vendor/` from all searches.

**Schema Markup**
- `Article` JSON-LD — search `_includes/` for `"@type": "Article"`
- `Person` JSON-LD — search `_includes/` for `"@type": "Person"`
- `FAQPage` JSON-LD — search `_includes/` for `"@type": "FAQPage"`
- `Organization` JSON-LD — search `_includes/schema_home.html` for `"@type": "Organization"` (primary file; ignore other occurrences)
- `WebSite` JSON-LD — search `_includes/schema_home.html` for `"@type": "WebSite"`
- `BreadcrumbList` JSON-LD — search `_includes/` for `"@type": "BreadcrumbList"`
- `HowTo` JSON-LD — search `_includes/` for `"@type": "HowTo"`
- `Review` JSON-LD — search `_includes/` for `"@type": "Review"` (distinct from AggregateRating)
- `AggregateRating` JSON-LD — search `_includes/` for `"@type": "AggregateRating"` (distinct from Review)
- `inLanguage` on Article — search `_includes/schema_post.html` specifically for `inLanguage` (not other schema files)

**Head / Meta**
- Meta description — search `_includes/` for `meta name="description"`
- Open Graph tags — search `_includes/` for `og:title`
- Twitter Card tags — search `_includes/` for `twitter:card`
- Canonical URL — search `_includes/` for `rel="canonical"`
- hreflang alternate links — search `_includes/` for `hreflang` AND `rel="alternate"` in the same file

**Multilingual**
- `lang` attribute on `<html>` driven by page variable — search `_layouts/default.html` for `page.lang` assigned to the `<html>` tag (not just the presence of `lang=`)
- Per-language page variants — check if `_posts/` or `_pages/` contains subdirectories named `en`, `de`, `fr`, `pt`, or similar language codes
- Language-aware layouts — search `_layouts/` and `_includes/` for `page.lang` usage

**Technical**
- sitemap.xml — look for `sitemap.xml` in root or a Jekyll sitemap plugin entry in `_config.yml` (e.g. `jekyll-sitemap`)
- robots.txt — look for `robots.txt` in root or `_pages/`
- Asset preload hints — search `_layouts/default.html` for `<link rel="preload"`

**Content**
- Author byline rendered in post template — search `_layouts/post.html` for `author` variable being rendered (e.g. `page.author`, `author_name`)
- Author bio/page — look for an `author` layout in `_layouts/` or author pages in `_pages/`

**Notes on checklist items intentionally excluded:**
- "Image alt attributes" — `alt=` is always present on templated images; whether alt values are meaningful cannot be determined by static file search. Excluded to avoid systematic false positives.
- "Internal linking" — implementation varies too much across Jekyll sites to define a reliable static detection pattern. Excluded.

### 2.5d — CI cross-reference

The subagent also scans the CI markdown text for any freeform recommendations not on the checklist. For each:
- **Content recommendations** (e.g. "publish a MiCA post"): perform a best-effort keyword match against front matter `title` and `tags` fields in `_posts/`. If a clear match is found, add to `implemented[]` with the matching file as evidence. If ambiguous or no match, add to `missing[]`.
- **Technical recommendations**: attempt to find evidence in the codebase using the same search approach as the checklist.

"Best-effort" means: if the subagent cannot confidently determine the status, it should add the item to `unchecked[]` rather than guessing.

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

Items already implemented are **silently omitted**. Items in `unchecked[]` are included in the relevant section with a note: `(could not verify — check manually)`.

If the audit failed entirely, the full unfiltered CI comment is posted with the warning notice prepended.

## Explore Subagent Prompt Template

The skill instructs Claude to dispatch an Explore subagent with this prompt (the checklist from section 2.5c is inlined verbatim where indicated):

```
You are auditing a Jekyll codebase for technical SEO implementation.

CODEBASE ROOT: <path>
EXCLUDE from all searches: _site/, node_modules/, .git/, vendor/

COMPETITIVE INTELLIGENCE TEXT (from this week's web searches):
<ci_text>

CHECKLIST (audit every item regardless of whether CI mentioned it):
<full text of section 2.5c checklist inlined here>

Instructions:
1. For each checklist item, search the codebase using the detection guidance provided.
   Use the primary file specified where given (e.g. schema_home.html for Organization).
2. For each freeform CI recommendation not on the checklist, attempt to determine
   if it is already implemented. If you cannot determine this with confidence,
   mark it as unchecked.
3. Return ONLY a valid JSON object — no prose, no markdown, no explanation:

{
  "implemented": [
    { "name": "FAQPage schema", "evaluated": true, "evidence": "_includes/schema_faq.html:5" }
  ],
  "missing": [
    { "name": "HowTo schema", "evaluated": true, "evidence": null }
  ],
  "unchecked": [
    { "name": "MiCA regulation post", "evaluated": false, "evidence": null }
  ]
}
```

## Success Criteria

- The weekly comment never recommends something already in the codebase
- All checklist items are audited every week regardless of what CI web searches returned
- Comment is shorter and more actionable than before
- If the audit fails, the comment is posted unfiltered with a visible warning (never silently wrong)
- Works for standard Jekyll sites with `_includes/`, `_layouts/`, `_posts/`, `_pages/` structure

## Out of Scope

- Fixing missing items automatically (the skill only reports, not implements)
- Auditing JS/CSS quality or bundle size
- Checking runtime behaviour (only static file analysis)
- Checking image alt text quality (excluded due to false positive risk)
