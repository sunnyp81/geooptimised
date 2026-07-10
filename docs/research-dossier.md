# Research Dossier: geooptimised.com

Date: 2026-07-10 | Researcher: Claude (Opus 4.8) | Status: **CONDITIONAL GO**

**Verdict in one line:** NO-GO on the site as it exists today (a GEO agency). CONDITIONAL GO on a
hard pivot to an independent, vendor-neutral evidence and tooling property. The seed is not binned,
it is redirected.

---

## 1. Demand (real data only)

| Query / prompt | Source | Volume or impressions | Trend |
|---|---|---|---|
| geooptimised.com, all queries, 6 months | GSC (owned) | **15 impressions, 0 clicks**, positions 88-99 | flat at zero |
| sunnypatel.co.uk `/blog/best-aeo-agencies/` | GSC (owned) | **1,418 impressions, 0 clicks**, avg pos 38.6 | real impressions, no clicks |
| sunnypatel.co.uk `/blog/top-geo-agencies/` | GSC (owned) | **59 impressions, 0 clicks**, avg pos 16.3 | negligible |
| "GEO" as a term | Rankability, Google Keyword Planner, 3,751 kw x 48 months | **~45% below its Aug 2025 peak** | **declining from peak** |
| "AEO" as a term | same | ~17% below its Sep 2025 peak | plateaued |
| GEO vs AEO relative volume | same | GEO ~2x AEO, yet practitioners converge on AEO | naming unsettled |
| ChatGPT weekly active users | Ahrefs, citing OpenAI | 900M (Feb 2026), up from 400M (Feb 2025) | **strongly rising** |
| Willingness to pay | Indie Hackers (LLM Pulse, founder Daniel Peris) | mid-five-figure MRR within ~1 year, bootstrapped | proven |
| Tool market capital | Fortune, TechCrunch, PRNewswire | $300M+ raised across vendors 2025-26; Profound at $1B valuation | rising |

**No absolute monthly search volume exists for any of the seed terms.** Five separate attempts
across published sources found only relative/percentage trend shape. The Bing keyword API was tested
once and returned the known .NET null-ref 400; it was not retried. Any number claiming a hard volume
for "generative engine optimization" is unsourced.

**Evidence quality: MIXED, and the two readings must be held together.**
- Underlying *behaviour* (people using AI to find things) is growing fast and is not in doubt.
- The *jargon* ("GEO", "AEO") crested in late summer 2025 and has been flat-to-declining for ~9 months.
- The *commercial* intent in this niche converts at zero on owned data: 1,477 impressions across two
  agency pages on an established domain produced **zero clicks in six months**.
- Demand for *tools* is proven by revenue, not by search volume.

The honest conclusion: there is a real, modest, information-and-tooling market here, and essentially
no winnable agency market.

---

## 2. SERP reality

Two-tier structure across all five head terms examined ("generative engine optimisation", "answer
engine optimization", "geo vs seo", "how to rank in chatgpt", "ai visibility tool"):

- **Tier 1:** DR 80-90+ incumbents with proprietary data - Ahrefs, Semrush, HubSpot, Similarweb,
  Search Engine Land, Neil Patel. Not winnable head-on by a DR-0 domain.
- **Tier 2:** a fast-multiplying swarm of small, near-identical sites (nicklafferty.com, geoptie.com,
  aristral.com, wellows.com, rankchase.com, stackmatix.com, novastacks-ai.com and dozens more)
  publishing interchangeable "best tools 2026" / "X vs Y" / "pricing" listicles. Several show the
  signatures of AI content mills. **They broke in within 12-18 months, which proves the SERP is still
  young enough to enter.**

**The exploitable weakness, documented:** every "best GEO tools" listicle in the top results is
published by a vendor that ranks its own product. Verified examples: Profound ranks Profound
(tryprofound.com/blog/best-generative-engine-optimization-tools); Frase ranks Frase
(frase.io/blog/the-10-best-ai-visibility-tools-in-2026); Evertune ranks Evertune. There is no
vendor-neutral referee. Pricing is scattered, demo-gated, and self-contradictory: Profound, Peec and
Brandlight publish no real price ladder, and Writesonic's own pages disagree with each other.

Saturated, do not enter: "GEO pricing/cost" (10+ near-duplicate pages), "UK GEO agencies"
(5+ near-duplicate listicles), generic "GEO vs SEO" (8+ domains, near-verbatim framing).

---

## 3. AI-chat landscape

Prompt inventory of ~37 real questions was assembled and clustered. Intent split is unusual and
diagnostic: **~25% definitional, ~10% openly sceptical ("is GEO a scam?")**. A mature subtopic does
not carry a 10% scepticism share. The term is still being fought over.

**Who gets cited today:** a small set of capital-intensive first-party datasets - Ahrefs (17M
citations; 4M AI Overview URLs), Profound (680M citations), Semrush (11,882 prompts / 337,785 URLs),
Peec (30M sources), SE Ranking (129,000 domains). Plus the founding academic paper.

**Foundational source, verified directly:** Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan &
Deshpande, "GEO: Generative Engine Optimization", arXiv:2311.09735, accepted to KDD 2024
(doi.org/10.1145/3637528.3671900). Its headline "up to 40% visibility uplift" is measured on
GEO-bench, a ~10,000-query benchmark, using a word-count-share metric. **It is a lab result. It is
not a measurement of live ChatGPT or Perplexity citation behaviour.** Almost every marketing page
repeating the 40% omits this.

**The gap no cited source fills:** nobody audits the studies against each other. See section 5.

---

## 4. Community signal

Reddit was inaccessible (MCP 403s; domain blocked for WebFetch/WebSearch). Substituted with Hacker
News (Algolia API + item pages), Digiday, LinkedIn threads, Indie Hackers, practitioner Substacks,
and trade press. All quotes below were sourced, most fetched directly.

**Pain #1, measurement is broken.** Hacker News: *"AI traffic, fetches, and mentions are basically a
black box."* Google's own AI Search report in GSC gives impressions only, no clicks, no CTR, no
queries. Sandeep Mallya: *"You're left with proof that you showed up and no way to know if showing up
mattered."*

**Pain #2, the tools contradict each other.** Paul Dyer, CEO of /prompt, in Digiday: *"If you use
three different tools and give them the same prompts, you get three different answers."* Kai
Cromwell, LinkedIn: *"All bought these AI rank trackers. All hate them. Biggest issue is they all say
something different."*

**Pain #3, is any of this real.** Lily Ray: *"Anybody that's pretending to be an expert in [GEO],
they're lying."* Neil Vogel, CEO of People Inc.: *"This whole conversation is not rooted in any fact."*
Google's John Mueller: *"The higher the urgency, and the stronger the push of new acronyms, the more
likely they're just making spam and scamming."*

**The measurement problem is not opinion, it is measured.** Two independent datasets:
- SparkToro + Gumshoe (600 volunteers, 2,961 runs, 12 prompts x 60-100 runs, ChatGPT/Claude/Google
  AI Overviews, Nov-Dec 2025): *"there's a <1 in 100 chance that ChatGPT or Google's AI, if asked
  100X, will give you the same list of brands in any two responses"*, and ordering repeats at roughly
  1 in 1,000.
- Kevin Indig (3.7M citations, 20k prompts, May 2026): *"only 2.37% of cited URLs appear in all 3
  LLMs for the same prompt. 91% live in exactly one."*

**What earns credibility here:** original reproducible data, published methodology, a named author,
and publishing results that do not flatter you (Seer Interactive is repeatedly cited for exactly
this). **What destroys it:** guaranteeing AI rankings, urgency marketing, unverifiable case studies,
and selling a single blended "AI Visibility %" without disclosing prompt volatility.

**What people pay for, versus what they say:** they pay for a dashboard number (tools sell at $29 to
$499/mo; LLM Pulse reached mid-five-figure MRR in a year) while the same community insists that
number is meaningless. That contradiction is the commercial opportunity and the reputational trap.

---

## 5. Competitor teardown

| Site / class | Strength | Exploitable gap |
|---|---|---|
| Profound ($155M raised, $1B val.) | 680M-citation dataset, enterprise trust | Sells a SaaS; ranks itself in its own "best tools" post; no public price ladder |
| Ahrefs / Semrush | Genuine large-N studies, DR 90+ | Vendor-interested; Semrush being acquired by Adobe (~$1.9B); Ahrefs runs **no affiliate program** so no listicle has an incentive to rank it honestly |
| Peec, Otterly, Rankscale, Knowatoa, AthenaHQ, Gauge, Trakkr | Cheap self-serve tiers | No independent benchmark of whether any of them agree with each other |
| The tier-2 listicle swarm | Volume, speed | Interchangeable; recycle the same 4-5 vendor studies; several stats they repeat are untraceable |
| Scrunch AI | Was a pure-play tracker | **Acquired by Sitecore, June 2026** |
| **Lorelight** | Was a GEO tracker | **Shut down after ~7 months.** Founder Benjamin Houy: *"Customers were churning because the product didn't change what they needed to do."* *"There's no secret GEO strategy. AI models reward the same fundamentals that already drive SEO and PR."* *"GEO makes more sense as a feature within existing SEO platforms, not as a standalone category."* |

**Nobody is the referee.** Every source above sells something the reader is being told to buy.

### The rigour gap, demonstrated rather than asserted

During this research I attempted to verify the niche's most-repeated numbers. Results:

- **Reproduced exactly:** Ahrefs' finding that AI Overview citations sourced from the organic top 10
  fell from ~76% (Jul 2025) to 37.9% (Jan 2026), n=863k SERPs / 4M URLs, published 2 Mar 2026.
- **Could not reproduce:** the widely-cited llms.txt server-log numbers ("84 of 62,100 bot hits").
  The primary page did not yield them. The qualitative direction is corroborated by John Mueller; the
  numbers are not currently verifiable.
- **Untraceable:** "YouTube mentions correlate with AI visibility at r=0.737" (attributed to a Semrush
  126M-prompt index; the Semrush study that does exist explicitly did not test YouTube). "A 100-word
  Reddit comment gets cited 12x more than a 2,000-word guide." "GEO market $848M -> $33.7B at 50.5%
  CAGR."
- **Silently corrupted in retelling:** SparkToro's "<1 in 100" (same brand list) is widely retold as
  "0.1%", which is actually their figure for the same list *in the same order*. I was handed the
  conflated version during this very research and repeated it before checking.

Three of the most-quoted numbers in this niche have no traceable source, one is unreproducible, the
single most-quoted stat is a lab benchmark passed off as a field result, and a real stat is drifting
by a factor of ten as it is retold. **This is a rigour gap, not a capital gap. Rigour is the one moat
that does not require funding**, which is precisely why a DR-0 site can take it.

---

## 6. Monetisation arithmetic

### Verified affiliate terms (fetched from the programs' own pages)

| Tool | Rate | Model | Cookie | On-theme? |
|---|---|---|---|---|
| **Nightwatch** | **30%** | **lifetime recurring** | **365 days** | Yes, tracks AI citations |
| Scalenut | 30-40% | lifetime recurring | 60d | AI content |
| NeuronWriter | 30% | lifetime recurring | 60d | AI content |
| Mangools | 30-35% | lifetime recurring | 30d | SEO |
| SE Ranking | 30% | recurring | 120d | Has an AI Search add-on |
| Frase | 30-40% | recurring, 12-mo cap | 60d | Bundles AI visibility |
| Otterly | 20% | recurring, 12-mo cap | - | **The only GEO-native that pays** |
| Semrush | ~$200 | **one-time bounty** | 120d | Yes |
| Surfer | 75-125% of first payment | **one-time** | ~90d | SEO |
| **Ahrefs** | **none** | program closed 2019 | - | Yes |
| Clearscope, Screaming Frog | **none** | - | - | Yes |
| Profound, Peec, AthenaHQ, Evertune, Brandlight, Bluefish, Goodie, Gauge, Knowatoa | **none found** | - | - | Yes |

Spot-checked directly: `otterly.ai/affiliate`, `otterly.ai/partners`, `peec.ai/affiliate` all 404;
Semrush's affiliate page returns 200 as a control.

**The structural fact that becomes the USP:** three of the most credible tools in this niche (Ahrefs,
Clearscope, Screaming Frog) pay nothing, and most GEO-native trackers pay nothing. Any site whose
rankings follow its commissions will necessarily rank the wrong tools. Everyone in this SERP has that
conflict. Disclosing it is free, and nobody has.

### Traffic-to-revenue arithmetic

Chain: `sessions x affiliate-click-rate x click-to-sale x £/conversion`.
Benchmarks: affiliate click-to-sale 0.5-2% (cross-industry, sourced); session-to-affiliate-click
3-8% [ASSUMPTION, blended informational + comparison pages]; £/conversion £40/£75/£150 [ASSUMPTION,
mix of first-month recurring commissions on $30-100/mo tools plus occasional Semrush bounties].

**I am deliberately haircutting the traffic assumption below the research agent's.** It proposed
month-12 sessions of 8k conservative / 20k central. That is too rich for a DR-0 domain in a niche
whose head term is 45% off peak. My model:

| Month 12 | Conservative | Central | Optimistic |
|---|---|---|---|
| Sessions/mo | 1,500 | 5,000 | 12,000 |
| Affiliate conversions/mo | ~0.2 | ~2.5 | ~19 |
| Affiliate £/mo (new) | ~£9 | ~£188 | ~£2,880 |
| Digital product £/mo | ~£30 | ~£130 | ~£390 |
| **Total £/mo, month 12** | **~£40** | **~£320** | **~£3,270** |

Recurring-lifetime commissions (Nightwatch, Scalenut, NeuronWriter, Mangools) compound: each retained
referral pays every month. At the central case that steady state builds toward roughly £120/mo of
pure recurring after 18-24 months, on top of new conversions. **It arrives after the 12-month window,
not inside it.**

**Month 6, central: roughly £80-150/mo. Month 12, central: roughly £320/mo.**

### Two things Sunny must hear plainly

1. **Nothing on this site monetises today.** At 15 impressions and 0 clicks, affiliate revenue is £0
   and will be £0 for months. The only mechanism that can earn in week one is a digital product sold
   to an existing audience (LinkedIn, network, Product Hunt), which is independent of site traffic.
   Realistic first month at zero traffic: a handful of sales, £25-150.
2. **This site will not reach £2,000/mo within 12 months on this evidence.** Central case lands near
   £320/mo. Reaching £2k would need the optimistic column, which requires 12,000 sessions/mo in a
   niche where no absolute search volume could be established at all. Anyone promising otherwise is
   doing the exact thing this dossier criticises.

**What it *is* worth:** a compounding, genuinely citable authority asset with lifetime-recurring
affiliate economics, an email list, and a defensible position that gets stronger as the niche gets
noisier. It is a good tree. It is not a fast one.

### Rules check
- No premature AdSense. Display ads are **rejected outright**: the audience runs ad blockers heavily,
  and ads visibly cheapen a property whose entire product is credibility.
- Affiliate realism: yes, with mandatory disclosure of every commercial relationship including the
  zero-paying ones.

---

## GO/NO-GO scorecard

| # | Criterion | Pass? | Evidence |
|---|---|---|---|
| 1 | Demand proven with real data | **MARGINAL PASS** | Behaviour rising (ChatGPT 900M WAU); willingness-to-pay proven (LLM Pulse MRR, $29-499/mo tools). But jargon demand is 45% off peak and no absolute volume exists. §1 |
| 2 | Winnable: documented weakness | **PASS** | Every top listicle is a vendor ranking itself; 3 headline stats untraceable; 1 unreproducible; SparkToro stat drifting 10x in retelling. §2, §5 |
| 3 | £ path with arithmetic | **MARGINAL PASS** | ~£320/mo at month 12 central, compounding via lifetime-recurring. **Fails the £2k/12mo framing; passes "meaningful".** §6 |
| 4 | USP nobody else has | **PASS** | No vendor-neutral referee exists. Nobody publishes evidence grades or their own affiliate terms. §5 |
| 5 | Effort proportionate | **PASS** | Domain, Astro scaffold, CF Pages pipeline all sunk and working. Backend cost is bounded (£0.001-0.008 per audit; Cloudflare Workers free tier 100k req/day). |
| 6 | No portfolio cannibalisation | **FAIL as an agency. PASS as an evidence property.** | sunnypatel.co.uk already runs `/services/ai-search-optimisation`, a GEO case study, and 7 GEO/AEO posts. agenticai.associates already sells AI consultancy on retainers. A third Sunny-owned site selling AI/SEO consultancy is a duplicate. |

**VERDICT: NO-GO on the current agency positioning. CONDITIONAL GO on the pivot.**

Criterion 6 fails outright today and criterion 3 fails the stated £2k target. Both are cured by the
same move, and neither is cured by building more agency pages.

### Conditions attached to the GO

1. The agency positioning is removed. `/contact/` stops being the primary CTA. No lead form as the
   business model.
2. geooptimised.com never targets commercial "agency" or "services" queries. Those belong to
   sunnypatel.co.uk. This site takes informational, tool, and data intent only. Clean split, no
   cannibalisation.
3. The 16 existing pages (~35,700 words) are triaged, not deleted wholesale: the definitional and
   comparison pages are rewritten to the new standard; the agency/services/companies pages are
   retired or redirected.
4. Original data is generated on a bounded, capped budget. Sunny approves the spend.
5. Every claim published carries an evidence grade and a primary source. Every commercial
   relationship is disclosed, including the tools that pay nothing.

---

## USP candidates (feeds Phase 1)

**Primary (recommended).** *Every claim on this site carries an evidence grade, a named primary
source, and a note on whether we could reproduce it ourselves. We publish exactly what each tool we
review pays us, including the ones that pay us nothing.*

- Traces to §5: three untraceable stats, one unreproducible, one drifting 10x in retelling.
- Specific and falsifiable: a reader can pick any claim and check the grade against the source.
- Not claimed by any top-5 competitor: all of them sell the tools they rank.
- Not used by any portfolio site.
- Repeatable in one sentence: "It's the site that grades the evidence and tells you who pays it."
- Contains no banned word.

**Secondary (the original-data engine, what makes it citable).** *A public, reproducible measurement
of how much AI answers disagree with themselves and with each other* - a fixed, published prompt set
run on a schedule against multiple engines, publishing stability and cross-engine overlap. Extends
SparkToro's one-off (Nov-Dec 2025) and Indig's single-window analysis into a standing series. This is
the one dataset the funded vendors will not publish, because it undermines the single blended
"AI Visibility %" they sell.

Critically, this is **pre-computed on a schedule, not user-triggered**, so cost is bounded and known
and there is no public endpoint to abuse.

**Tertiary (disambiguation, an entity play).** "GEO" collides with geographic/geo-targeting, which
practitioners already cite as a reason to prefer "AEO". The entity definition must disambiguate
explicitly. That disambiguation page is itself a citable asset, and the brand should cover GEO *and*
AEO rather than betting the site on the declining acronym. Owned evidence supports this: Sunny's AEO
page drew 1,418 impressions against the GEO page's 59.
