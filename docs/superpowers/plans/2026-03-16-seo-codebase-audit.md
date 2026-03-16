# SEO Codebase Audit (Step 2.5) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Step 2.5 to the seo-report skill so it audits the codebase before posting the competitive intelligence comment, filtering out any recommendations already implemented.

**Architecture:** A single markdown file (`SKILL.md`) is modified to insert Step 2.5 between Step 2 (web searches) and Step 3 (GitHub comment). Step 2.5 dispatches an Explore subagent with a structured checklist and the CI text; the subagent returns `implemented[]`, `missing[]`, `unchecked[]` JSON. Step 3 is updated to build the comment body from only `missing[]` and `unchecked[]` items.

**Tech Stack:** Markdown (skill instruction file), no code dependencies. The skill is consumed by Claude Code as plain text instructions.

**Spec:** `docs/superpowers/specs/2026-03-16-seo-codebase-audit-design.md`

---

## Chunk 1: Add Step 2.5 and update Step 3 in SKILL.md

**Files:**
- Modify: `C:\Users\dkcf\.claude\skills\seo-report\SKILL.md`

---

- [ ] **Step 1: Read and confirm the insertion landmarks**

Read `C:\Users\dkcf\.claude\skills\seo-report\SKILL.md` and verify these two landmarks exist:

Landmark A (end of Step 2, lines ~99–101):
```
5. `[website_niche] schema markup SEO [year]` — structured data best practices

---

## STEP 3 — Post competitive research as a comment
```

Landmark B (Step 3 curl block, lines ~108–112):
```
curl -s -X POST "https://api.github.com/repos/{github_repo}/issues/{number}/comments" \
```

Expected: both landmarks present. If either is missing, stop and report.

---

- [ ] **Step 2: Insert Step 2.5 using the unique anchor string**

In `C:\Users\dkcf\.claude\skills\seo-report\SKILL.md`, find the following **exact** string (use this full multi-line anchor to avoid matching other `---` separators in the file):

```
5. `[website_niche] schema markup SEO [year]` — structured data best practices

---

## STEP 3 — Post competitive research as a comment
```

Replace it with the text shown in **Section A** below.

**Section A — replacement text for Step 2:**

> Note for implementer: the subagent prompt below is presented as a blockquote to avoid nested code fence issues in this plan document. When writing to SKILL.md, the subagent prompt block should be a standard triple-backtick code fence (` ``` `) containing the prompt text.

---

5. `[website_niche] schema markup SEO [year]` — structured data best practices

---

## STEP 2.5 — Codebase audit

Dispatch an **Explore subagent** to audit the codebase for already-implemented SEO features and cross-reference them against the competitive intelligence findings from Step 2. This prevents recommending things already done.

Use the current working directory as `<codebase_root>`. Substitute `<ci_text>` with the full markdown text produced in Step 2.

Dispatch the Explore subagent with this exact prompt:

> You are auditing a Jekyll codebase for technical SEO implementation.
>
> CODEBASE ROOT: `<codebase_root>`
> EXCLUDE from all searches: `_site/`, `node_modules/`, `.git/`, `vendor/`
>
> COMPETITIVE INTELLIGENCE TEXT (from this week's web searches):
> `<ci_text>`
>
> CHECKLIST — audit every item below regardless of whether CI mentioned it:
>
> **Schema Markup**
> - `Article` JSON-LD — search `_includes/` for `"@type": "Article"`
> - `Person` JSON-LD — search `_includes/` for `"@type": "Person"` (presence in any file is sufficient; this type may appear as a nested object in multiple schema includes)
> - `FAQPage` JSON-LD — search `_includes/` for `"@type": "FAQPage"`
> - `Organization` JSON-LD — search `_includes/schema_home.html` for `"@type": "Organization"` (primary file; ignore other occurrences)
> - `WebSite` JSON-LD — search `_includes/schema_home.html` for `"@type": "WebSite"`
> - `BreadcrumbList` JSON-LD — search `_includes/` for `"@type": "BreadcrumbList"`
> - `HowTo` JSON-LD — search `_includes/` for `"@type": "HowTo"`
> - `Review` JSON-LD — search `_includes/` for `"@type": "Review"` (distinct from AggregateRating)
> - `AggregateRating` JSON-LD — search `_includes/` for `"@type": "AggregateRating"` (distinct from Review)
> - `inLanguage` on Article — search `_includes/schema_post.html` specifically for `inLanguage` (not other schema files)
>
> **Head / Meta**
> - Meta description — search `_includes/` for `meta name="description"`
> - Open Graph tags — search `_includes/` for `og:title`
> - Twitter Card tags — search `_includes/` for `twitter:card`
> - Canonical URL — search `_includes/` for `rel="canonical"`
> - hreflang alternate links — search `_includes/` for `hreflang` AND `rel="alternate"` in the same file
>
> **Multilingual**
> - `lang` attribute on `<html>` driven by page variable — search `_layouts/default.html` for `page.lang` assigned to the `<html>` tag (not merely the presence of `lang=`)
> - Per-language page variants — check if `_posts/` or `_pages/` contains subdirectories named `en`, `de`, `fr`, `pt`, or similar language codes
> - Language-aware layouts — search `_layouts/` and `_includes/` for `page.lang` usage
>
> **Technical**
> - sitemap.xml — look for a `jekyll-sitemap` plugin entry in `_config.yml` first (preferred evidence); if not found, look for `sitemap.xml` in root
> - robots.txt — look for `robots.txt` in root or `_pages/`
> - Asset preload hints — search `_layouts/default.html` for `<link rel="preload"`
>
> **Content**
> - Author byline rendered in post template — search `_layouts/post.html` for `author` variable being rendered (e.g. `page.author`, `author_name`)
> - Author bio/page — look for an `author` layout in `_layouts/`, author pages in `_pages/`, or files matching `author-*.md` in `_posts/` root
>
> **CI cross-reference (freeform recommendations)**
> For each recommendation in the CI text NOT covered by the checklist above:
> - Content recommendations (e.g. "publish a MiCA post"): keyword-match against front matter `title` and `tags` in `_posts/`. A match is clear if a post's title contains at least one significant keyword from the recommendation, or a tags value is an exact or stemmed match. Clear match → `implemented[]`. Ambiguous → `unchecked[]`. No match → `missing[]`.
> - Technical recommendations: search codebase for evidence using the same approach as the checklist.
>
> If you cannot confidently evaluate an item, place it in `unchecked[]` — never guess.
>
> Return ONLY a valid JSON object. No prose, no markdown, no explanation outside the JSON:
>
> ```json
> {
>   "implemented": [
>     { "name": "FAQPage schema", "evaluated": true, "evidence": "_includes/schema_faq.html:5" }
>   ],
>   "missing": [
>     { "name": "HowTo schema", "evaluated": true, "evidence": null }
>   ],
>   "unchecked": [
>     { "name": "MiCA regulation post", "evaluated": false, "evidence": null }
>   ]
> }
> ```

**After the subagent returns:**

- Parse the JSON response. If parsing fails (malformed JSON, empty output, error), set `audit_failed = true`.
- Store `implemented[]`, `missing[]`, `unchecked[]` for use in Step 3.

**Error handling:** If `audit_failed = true`:
- Log: `⚠️ Codebase audit failed: <reason> — posting unfiltered CI comment`
- In Step 3, prepend this notice to the comment body before the CI text:
  > ⚠️ Codebase audit could not run this week — recommendations below may include items already implemented.
- Post the full unfiltered CI text from Step 2.

---

## STEP 3 — Post competitive research as a comment

---

- [ ] **Step 3: Replace the Step 3 instructions (keep the curl command unchanged)**

In `C:\Users\dkcf\.claude\skills\seo-report\SKILL.md`, find the following **exact** string (this is the opening of the current Step 3 section):

```
## STEP 3 — Post competitive research as a comment

Using the issue number from STEP 1, post the competitive research as a **comment** on the GitHub issue:
```

Replace it with the text shown in **Section B** below.

**Section B — replacement text for Step 3:**

---

## STEP 3 — Post competitive research as a comment

Using the issue number from STEP 1 and the audit results from STEP 2.5, build and post the competitive intelligence comment.

**Building the comment body:**

If `audit_failed = true` (from Step 2.5): use the full unfiltered CI text from Step 2, prepended with the audit failure warning notice.

Otherwise, construct the comment as follows. For all sections, items that appear in `implemented[]` are **silently omitted**. Items in `unchecked[]` are included with the note `(could not verify — check manually)`.

1. **Technical SEO Gaps** — include checklist items from `missing[]` and `unchecked[]`:
   - `❌ [name] — not found` for each `missing[]` item from the structured checklist
   - `⚠️ [name] (could not verify — check manually)` for each `unchecked[]` checklist item
   - Omit all `implemented[]` checklist items silently

2. **Trending Topics & Content Gaps** — from Step 2 web search results, include only topics/content recommendations that are in `missing[]` or `unchecked[]`. For `unchecked[]` items, append `(could not verify — check manually)`. Omit items in `implemented[]`.

3. **Competitor Keyword Gaps**, **Long-Tail Opportunities**, **Algorithm Update Notes** — synthesise from Step 2 web search results. For any specific recommendations in these sections that appear in `implemented[]`, omit them. For `unchecked[]` items, append `(could not verify — check manually)`.

4. **Top Priorities** — list only actionable pending items from `missing[]` and `unchecked[]`, prioritised by impact. For `unchecked[]` items, append `(could not verify — check manually)`.

The comment should follow this structure:

    ## 🕵️ Competitive Intelligence — [Month Year]

    ### Technical SEO Gaps
    - ❌ HowTo schema — not found
    - ⚠️ [unchecked checklist item] (could not verify — check manually)

    ### Trending Topics & Content Gaps
    [only topics not already covered; unchecked items marked]

    ### Competitor Keyword Gaps
    [only gaps not already targeted; unchecked items marked]

    ### Long-Tail Opportunities
    [opportunities; unchecked items marked]

    ### Algorithm Update Notes
    [notes]

    ## 🎯 Top Priorities
    [only actionable pending items; unchecked items marked]

Post the comment using the GitHub API:

---

> Note for implementer: the curl block below is the **original, unchanged** curl command from the existing SKILL.md. Do not modify it — only the instructions above it change.

---

---

- [ ] **Step 4: Verify the final SKILL.md structure**

Read `C:\Users\dkcf\.claude\skills\seo-report\SKILL.md` and confirm:

1. Steps appear in order: STEP 0 → STEP 1 → STEP 2 → STEP 2.5 → STEP 3
2. STEP 2.5 contains the Explore subagent dispatch with the full 5-category checklist
3. The subagent prompt instructs the subagent to return JSON with three arrays: `implemented[]`, `missing[]`, `unchecked[]`
4. STEP 2.5 contains the `audit_failed` fallback
5. STEP 3 opens with "Using the issue number from STEP 1 and the audit results from STEP 2.5"
6. STEP 3 instructions reference `implemented[]`, `missing[]`, `unchecked[]`
7. STEP 3 specifies `(could not verify — check manually)` note for `unchecked[]` items in **all** sections (Technical SEO Gaps, Trending Topics, Top Priorities)
8. The curl command in STEP 3 is unchanged from the original
9. The Error handling section at the bottom of the file is still present

---

- [ ] **Step 5: Commit**

Check if `~/.claude` is a git repository:

```bash
git -C "C:/Users/dkcf/.claude" status
```

If it is a git repo:

```bash
git -C "C:/Users/dkcf/.claude" add skills/seo-report/SKILL.md
git -C "C:/Users/dkcf/.claude" commit -m "feat: add Step 2.5 codebase audit to seo-report skill"
```

If not a git repo, skip the commit — the file edit alone is sufficient.

---

## Chunk 2: Manual verification

No automated tests exist for skill markdown files. Verify by running `/seo` and inspecting the GitHub comment.

- [ ] **Step 6: Run `/seo` in the criptomo project**

Trigger a fresh `/seo` run from `e:/Development/criptomo/criptomo`. This exercises Step 2.5 for the first time.

Expected outcome:
- Step 2.5 runs and the Explore subagent returns valid JSON
- The GitHub comment does **not** recommend any of these (all already implemented in criptomo):
  - FAQPage schema, Article schema, Person schema
  - Organization schema, WebSite schema
  - hreflang, meta description, Open Graph, Twitter Card, canonical URL
  - lang attribute, language variants, sitemap, robots.txt, preload hints
- The comment **does** include HowTo schema and AggregateRating (if not found in codebase) under Technical SEO Gaps
- Content gaps (MiCA post, DeFi pillar, etc.) appear under Trending Topics
- The Top Priorities section contains only actionable items

- [ ] **Step 7: Spot-check that implemented items are absent from comment**

In the posted comment, verify none of the following appear as recommendations:
- "Add FAQPage schema"
- "Add Article schema" / "Implement Article JSON-LD"
- "Add Person schema for authors"
- "Add Organization/WebSite schema"
- "Add hreflang"

If any appear, the `implemented[]` filtering is not working. Re-read STEP 3 in the updated SKILL.md and check that the comment-building instructions correctly reference `implemented[]`.
