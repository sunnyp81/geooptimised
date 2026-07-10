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
  and `ourEnrolment`. The footer and `/who-pays-us/` render enrolment straight from here, so the
  disclosure cannot drift from the truth.
- `src/data/corrections.json` — permanent log. Two entries, both our own pre-launch errors.

**Signature component:** `src/components/ClaimCard.astro` — a stamped record (grade, claim, verdict,
source, sample, reproduction note), independently linkable at `/evidence/#<id>`, emitted as `ClaimReview`
JSON-LD on `/evidence/`.

**Design:** "the scientific register". Paper-light default (`--bg: #FBFAF7`), ink, Source Serif 4
headings, Source Sans 3 body, IBM Plex Mono for every number. Colour is reserved for evidence grades and
is never the only signal. Restrained dark variant via `prefers-color-scheme`. Deliberately unlike the
dark-navy-and-cyan look of every AI SaaS site, including this site's own previous theme.

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

## The original-data engine

`scripts/volatility-run.mjs` + `data/prompts.json` (pre-registered before any run). 360 calls, ~$0.54 per
full run, ~$2.20/month weekly. `MAX_CALLS=400`, `MAX_EST_USD=1.0`, dry-run by default, no public endpoint.
**Blocked on Sunny supplying `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GEMINI_API_KEY`.** Do not ship a
`/volatility/` page until four weekly runs exist.

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
