# geooptimised.com — Project Brain

> Canonical project memory. Repositioned 2026-07-10 from a GEO agency to an independent evidence base.
> Read `site-identity.md` (what this site is), `docs/research-dossier.md` (why), and
> `docs/growth-plan.md` (what happens next) before changing anything.

## What this site is

**An independent evidence base for AI search visibility that grades every published claim by whether it
traces to a primary source and reproduces, and that publishes exactly what each tool it reviews pays it.**

It is not an agency, not a tool vendor, not ad-funded. Monetisation is affiliate commission, fully
disclosed, plus a future digital product. That model was chosen after a research gate; see below.

## Why the agency site was killed (2026-07-10)

The `/site-build` gate returned **NO-GO on the agency positioning**, on evidence, not taste:

1. **It did not work.** 0 clicks / 15 impressions in six months (GSC), positions 88 to 99. The ROOT
   pillar was unknown to Google, never crawled. No external backlink discovered.
2. **It cannibalised Sunny.** `sunnypatel.co.uk` already runs `/services/ai-search-optimisation`, a GEO
   case study and seven GEO/AEO posts. `agenticai.associates` already sells AI consultancy on retainers.
   And `sunnypatel.co.uk/blog/best-aeo-agencies/` earned **1,418 impressions, 0 clicks**, at position
   38.6. Commercial intent in this niche does not convert for us.
3. **The category is consolidating.** Lorelight, a GEO tracker, shut down after ~7 months. Founder
   Benjamin Houy: *"GEO makes more sense as a feature within existing SEO platforms, not as a standalone
   category."* Sitecore bought Scrunch; Adobe is buying Semrush.
4. **It was not hands-off.** Every CTA funnelled to `/contact/`, selling Sunny's time.

The gate passed on a **pivot**: rigour is the one moat that does not require capital, and three of the
niche's most-quoted statistics have no traceable source.

## The rules that cannot be broken

1. **No number without a source, a sample size and a date.** Every statistic in prose must first exist in
   `src/data/claims.json` with a grade.
2. **The grade describes the claim as it circulates, never the finding that settles it.** A true study
   that demolishes a popular claim makes that claim `REFUTED`, not `VERIFIED`. (We got this wrong once;
   it is logged in `corrections.json`.)
3. **A commission never reorders a table.** Ahrefs, Screaming Frog and Clearscope pay nothing and are
   named. Nightwatch pays the most (30% lifetime, 365-day cookie) and sits at the top of the disclosure,
   not buried.
4. **Corrections are permanent and dated.** Never silently edit a published claim.
5. **No display advertising. No sponsored placements. No GEO services page.** Commercial GEO intent
   belongs to sunnypatel.co.uk. Duplicating it is what failed the gate.
6. **No em dashes, no en dashes, no emojis. British English.** "to" not "through" for date ranges.
7. **Never call Gemini or Bing *grounding* to collect citations.** Google's Grounding with Google Search
   terms (effective 2026-03-23) forbid "using Links to build an index" and separately forbid caching or
   analysing Grounded Results. Microsoft's Grounding with Bing Search terms, Section 4(b)(o) (updated
   2025-11), forbid "Copy, store, cache, archive, or create a database of Output". `scripts/citation-run.mjs`
   has a runtime guard that throws on `gemini`, `bing`, `copilot` and `azure`. Do not remove it. Verbatim
   quotes and primary sources are on `/the-grounding-clause/`.
   Note the boundary: `scripts/volatility-run.mjs` calls Gemini's plain `generateContent` with no search
   tool attached, so it returns the model's own output rather than Grounded Results. That is lawful, and
   it must stay that way. The moment a `tools` block is added to that call, the clause bites.
8. **Brand names and cited source domains are different quantities. Never conflate them.**
   `volatility-run.mjs` measures which brands a model utters from its weights, with no retrieval.
   `citation-run.mjs` measures which source domains an engine cites when it does retrieve. Four claims in
   `claims.json` are about citations, so only `citation-run.mjs` can reproduce them. Citation output is
   stochastic, so every figure it emits carries a 95% interval and a run count, plus a per-engine Jaccard
   stability score. A citation figure without an interval does not get published.
7. **The volatility harness measures model APIs, not chatgpt.com.** Label it "cross-model API
   disagreement". Never "ChatGPT volatility".

## Architecture

**Stack:** Astro 5 + Tailwind 4 (`@tailwindcss/vite`), static, `@astrojs/sitemap`. Deploy: Cloudflare
Pages via GitHub push (`sunnyp81/geooptimised`, branch `master`). Build `npm run build`, output `dist`,
NODE_VERSION=22. The `cfut_143…` CF token in master-builds is **dead**; rely on the git-push auto-build.

**Data is the product.** Three JSON files drive the site; the pages are views over them:
- `src/data/claims.json` — 13 graded claims. Six grades: VERIFIED, REFUTED, MISLEADING, DIRECTIONAL,
  UNREPRODUCED, UNTRACEABLE. Plus a `VENDOR-INTERESTED` flag.
- `src/data/tools.json` — 16 tools, verified pricing, verified affiliate terms, `provenance` per fact,
  and `ourEnrolment`. **11 pay a commission, 5 pay nothing** (Ahrefs, Screaming Frog, Clearscope,
  Peec AI, Profound). The footer and `/who-pays-us/` render enrolment straight from here, so the
  disclosure cannot drift from the truth. Never hardcode these counts in prose; derive them.
  (The commit message for `3bea505` says "six that can pay us nothing". It is five. Left uncorrected
  in history, corrected here.)
- `src/data/corrections.json` — permanent log. Two entries, both our own pre-launch errors.

**Signature component:** `src/components/ClaimCard.astro` — a stamped record (grade, claim, verdict,
source, sample, reproduction note), independently linkable at `/evidence/#<id>`, emitted as `ClaimReview`
JSON-LD on `/evidence/`.

**Design:** the original dark system, kept by Sunny's explicit call ("content is better, design was
better before"). Navy `--bg: #0A0F1E`, cyan `--accent: #00E5CC`, Space Grotesk display, Inter body,
JetBrains Mono for every number. Hero glow (`.hero-fade`), background grid (`.bg-grid`), glass nav,
`.card` / `.btn-primary`. A paper-and-serif "scientific register" variant was built and rejected; do not
reintroduce it.

**Pages style themselves through CSS variables**, so a skin swap is a token change in `global.css`, not
a markup rewrite. Note `--font-serif` is deliberately mapped to Space Grotesk so existing `font-serif`
headings resolve to the display face. Evidence grades are retuned for the dark ground and are **never
colour-alone**: every badge carries its text label.

## Live routes (11 + 404)

`/`, `/evidence/`, `/generative-engine-optimisation/`, `/tools/`, `/who-pays-us/`, `/methodology/`,
`/corrections/`, `/the-40-percent-claim/`, `/is-geo-a-scam/`, `/about/`, `/contact/`, plus `404.astro`.

Twelve old pages are in `_retired/` with 301s in `public/_redirects`. Seven were commercial; five were
informational but carried unverified claims. **They get rewritten to the evidence standard, never
restored as-is.**

## Defects found and fixed on 2026-07-10

- **Site-wide soft-404.** Every unknown URL returned HTTP 200 serving the homepage. Fixed by shipping
  `src/pages/404.astro` (emits `dist/404.html`). Mitigating factor at the time: those responses
  self-canonicalised to `/`. **Verify after every deploy that `/does-not-exist/` returns 404.**
- **Two invisible broken links.** `/geo-checklist/` and `/geo-best-practices/` were linked from content
  but had no source file; the soft-404 made them look fine. Now 301'd.
- **`llms.txt` described an agency.** Rewritten to state the entity, the grading scale, and the findings.

## The original-data engine: geooptimised owns measurement

**Decided by Sunny, 2026-07-10.** This section supersedes the earlier "SUPERSEDED, DO NOT RUN, pending
Sunny" note, which proposed that `sourcedbyai.com` produce the primary distributions instead. Sunny's
instruction was to do the work here and leave `sourcedbyai` alone. That repo stays parked and untouched:
it has no GitHub remote, its domain still points at a Spaceship parking page, and nothing in it runs.
Two sites cannot both own measurement, and only one of them is going to be live.

**Two harnesses. Two different quantities. Never conflate them (rule 8).**

| Script | Measures | Retrieval | Reproduces |
|---|---|---|---|
| `scripts/volatility-run.mjs` | brand names the model utters | none, plain `generateContent` | the brand-volatility claims |
| `scripts/citation-run.mjs` | cited source domains | yes, web search tools | the four citation claims in `claims.json` |

Both are dry-run by default, both enforce a hard `MAX_CALLS` ceiling before any request, neither exposes a
public endpoint, and neither invents a number when keys are absent. `citation-run.mjs` additionally refuses
to call Gemini or Bing grounding (rule 7) and reports every domain as a share across repeated runs with a
95% interval, a run count, and a per-engine Jaccard stability score.

Nothing spends money until keys exist. About $2.75 per run at the current prompt set and 20 repeats.

**One correction carried over from the superseded note, which was right:** `sourcedbyai`'s research dossier
argues for publishing its panel here on the grounds that geooptimised "sells a £750-6,000/mo GEO retainer".
That stopped being true at commit `3bea505`, which killed the agency positioning. The dossier is stale on
that point. It does not change the decision above, and `sourcedbyai` is not being edited to fix it.

**Duplicate-content hazard:** `sourcedbyai` contains a near-identical article to `/the-grounding-clause/`.
It is not deployed, so nothing is duplicated today. Both sites must never publish it. If `sourcedbyai` is
ever launched, that article comes down there first.

## Blocked on Sunny

1. API keys for the volatility harness (above).
2. `[MANUAL]` LinkedIn URL for `Person` schema `sameAs`. Do not invent one.
3. `[MANUAL]` Decide whether `sunnypatel.co.uk` becomes a `sameAs`. Commit `d860537` deliberately removed
   a commercial cross-link to reduce footprint. **Default: off.**
4. `[MANUAL]` Confirm `hello@geooptimised.com` receives mail. It is published on `/contact/` but was
   inherited from the old schema and never verified.
5. Affiliate enrolment decisions, once a page ranks. Nightwatch first.

## Commands

```bash
npm run dev        # dev server
npm run build      # static build -> dist/
npm run preview    # preview production build
node scripts/volatility-run.mjs --dry-run   # plan + cost estimate, no API calls
```

## Honest expectations

Central case: **~£100/mo at month 6, ~£320/mo at month 12**, compounding afterwards via lifetime-recurring
commissions. This site does **not** reach £2,000/mo within 12 months, and "GEO" as a search term peaked in
August 2025 and sits ~45% below peak. If wave 2 lands and traffic still does not move, re-point the same
grading machinery at "AI SEO" or "AI visibility". The ledger, components and disclosure all transfer.
