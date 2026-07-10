# geooptimised.com — standing growth plan

Written 2026-07-10 at the close of `/site-build`. A build is not complete until the site has a loop
that runs without anyone remembering to run it.

## The honest baseline

- Before this rebuild: **0 clicks, 15 impressions** in six months (GSC, Jan-Jul 2026), positions 88 to 99.
- The homepage was indexed. The ROOT pillar was **unknown to Google**, never crawled.
- Google had discovered **no external backlink**: the only referring URLs were the site's own sitemap.
- Sunny's own `sunnypatel.co.uk/blog/best-aeo-agencies/` earned **1,418 impressions and 0 clicks** in the
  same window, at average position 38.6. Commercial intent in this niche does not convert for us.

Anything this plan claims must be measured against those numbers, not against ambition.

## Revenue arithmetic we are committing to

From `docs/research-dossier.md` §6, central case, deliberately haircut below the research agent's model:

| | Month 6 | Month 12 |
|---|---|---|
| Sessions/mo (central) | ~2,000 | ~5,000 |
| Affiliate | ~£40 | ~£188 |
| Digital product | ~£60 | ~£130 |
| **Total (central)** | **~£100/mo** | **~£320/mo** |

Conservative case stalls near £40/mo at month 12. Optimistic needs 12,000 sessions/mo, which no
evidence supports. **This site does not reach £2,000/mo inside 12 months.** It is a compounding asset
with lifetime-recurring affiliate economics, not a fast one.

## Wave 2 content schedule (2 pages/week)

Each page must clear `/semantic-audit` >= 85 and `/winner-audit` >= 8, and every statistic must enter
`src/data/claims.json` with a grade before it appears in prose. No exceptions: the standard is the
product.

| Week of | Page | Why it exists |
|---|---|---|
| 2026-07-14 | `/answer-engine-optimisation/` | Rewrite of a retired page. Owns the other acronym. Sunny's own data shows AEO pulls 24x the impressions of GEO for agency-intent queries. |
| 2026-07-14 | `/measuring-ai-visibility/` | The niche's #1 pain, and the page the trackers cannot write honestly. |
| 2026-07-21 | `/geo-vs-seo/` | Rewrite of a retired page. Saturated topic, but we have an angle nobody else has: the top-10 citation share collapse. |
| 2026-07-21 | `/llms-txt/` | Two graded claims already exist. This is the page that says "no study shows it helps" and means it. |
| 2026-07-28 | `/schema-and-ai-citations/` | Conditional evidence, currently sold as certainty. |
| 2026-07-28 | `/citation-lag/` | Everybody quotes a different lag with no methodology. Grade all of them. |
| 2026-08-04 | `/who-cites-what/` | Platform-by-platform tactic matrix. The fragments exist; nobody has assembled them. |
| 2026-08-04 | `/small-brand-entity-playbook/` | Entity advice assumes Wikipedia notability. Most brands never clear it. |

Retired pages sit in `_retired/` with 301s in `public/_redirects`. They are rewritten, never restored.

## The original-data engine — SUPERSEDED, DO NOT RUN, PENDING SUNNY'S DECISION

🔴 **Discovered after this harness was written:** a parallel session on the same day built
`sourcedbyai.com` (repo `C:\Users\sunny\repos\sourcedbyai`), whose entire USP is *"every figure is a
distribution from repeated runs, variance published"*. It already has a measurement harness, built and
dry-run verified, and it is **blocked on the same API keys**. Its own dossier recommended publishing the
measurement panel on geooptimised.com instead, and it permanently scope-cut its tool reviews to avoid
cannibalising this site.

Running both is duplicate spend and portfolio cannibalisation, which is gate criterion 6. Nothing spends
money until Sunny adds keys, so there is no urgency, but **do not enable `scripts/volatility-run.mjs`
until the split is decided.** The recommended split:

- **sourcedbyai.com** owns *primary measurement*: it produces the distributions. No vendor reviews, no
  affiliate.
- **geooptimised.com** owns *grading and disclosure*: it grades published claims, including sourcedbyai's,
  reviews tools, and publishes what each pays us.

Note also that sourcedbyai's mandatory footer disclosure says "the author runs a GEO agency", and its
dossier assumes geooptimised sells a £750-6,000/mo retainer. **Both are now false.** That site's
differentiation FAIL was reasoned partly from geooptimised's old `/geo-tools/` page, which is now 301'd.
Its dossier needs revisiting in light of this pivot.

### The harness itself, if the split lands here

`scripts/volatility-run.mjs` runs a pre-registered prompt set (`data/prompts.json`, committed before
any run so prompts cannot be selected after seeing results) against three model APIs, and writes
`src/data/volatility.json`.

- **Cost:** 360 calls per full run, roughly **$0.54**. Weekly cadence is about **$2.20/month**.
- **Guards:** `MAX_CALLS=400` and `MAX_EST_USD=1.0` are checked before any request. Default is `--dry-run`.
- **No public endpoint.** Pre-computed only. There is nothing for anyone to abuse.
- **The honesty constraint, which is not optional:** this measures *model APIs*, not chatgpt.com. An
  API call has different retrieval, a different system prompt and different sampling defaults from the
  consumer product. Every figure must be labelled **cross-model API disagreement**. Publishing it as
  "ChatGPT volatility" would be precisely the failure this site exists to catch.
- **Blocked on Sunny:** `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`. Until then the script
  dry-runs cleanly and no `/volatility/` page ships. A page with no data would be a thin page.

Once four weekly runs exist, publish `/volatility/` and add each finding to the ledger as `VERIFIED`
(we ran it) with the API caveat printed on the card.

## Monetisation activation milestones

1. **Now, at zero traffic:** nothing earns. Say so. `/who-pays-us/` renders "enrolled in no affiliate
   programme" straight from `src/data/tools.json`, so the claim cannot drift from the truth.
2. **First £ (fastest path):** a digital product sold to Sunny's existing audience, independent of site
   traffic. Realistic first month: £25-150. The site cannot produce this; the network can.
3. **Affiliate enrolment, when a page ranks:** Nightwatch first (30% lifetime, 365-day cookie, and it
   genuinely tracks AI citations). On the day of enrolment, flip `ourEnrolment` in `tools.json`, add a
   `corrections.json` entry, and the footer, homepage and disclosure table all update from data.
   **A commission never reorders a table.** Ahrefs, Screaming Frog and Clearscope pay nothing and stay
   named.
4. **Ad networks: never.** Rejected in the dossier. The audience blocks ads and the site's only asset is
   credibility.
5. **Sponsorship: not before ~5,000 engaged subscribers.** Realised newsletter rates make anything
   smaller pointless.

## Monitoring and iteration

- Register in `/seo-monitor-loop` triage (state: **growth**, cadence weekly until first clicks).
- Register in seogets.
- `/evolve-site` enrolment: **2026-08-07** (launch + 4 weeks), once GSC has data to iterate on.
- Weekly: `npm run build` must pass, and a live check that `/does-not-exist/` returns **404**, not 200.
  The soft-404 is fixed; it must stay fixed.

## Entity corroboration checklist

- [ ] `[MANUAL]` LinkedIn URL for `Person` schema `sameAs`. Not invented.
- [ ] `[MANUAL — SUNNY'S CALL]` whether to add `sunnypatel.co.uk` as a `sameAs`. Commit `d860537`
      deliberately stripped a commercial cross-link to reduce footprint under the June 2026 spam update.
      A Person `sameAs` is entity corroboration rather than a commercial link, but it does associate the
      properties. **Default: off.**
- [ ] `[MANUAL]` confirm `hello@geooptimised.com` actually receives mail. It is published on `/contact/`
      and was already in the old site's schema, but we did not verify it exists.
- [ ] No Wikidata item. The notability threshold is unmet, and claiming otherwise would breach the
      site's own standard.
- [ ] Submit sitemap, run `/index-push` on the 11 live URLs.

## 90-day review — 2026-10-08

Compare actual sessions against the month-3 interpolation of the dossier's central case (~1,000/mo).
**Under 25% of that line, trigger `/site-health`** and diagnose rather than let it decay quietly.

The specific failure mode to watch for: the site is correct, well-sourced, and read by nobody, because
"GEO" search interest peaked in August 2025 and sits ~45% below that peak. If wave 2 lands and traffic
still does not move, the answer is not more GEO content. It is to re-point the same evidence-grading
machinery at a term that is still growing, most likely "AI SEO" or "AI visibility". The ledger, the
grading, the disclosure and the components all transfer. Only the vocabulary changes.
