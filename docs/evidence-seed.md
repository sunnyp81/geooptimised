# Evidence log - claims in AI search, graded by what I could personally reproduce

Grading:
- **VERIFIED** = I fetched the primary source myself this session and the numbers matched.
- **UNREPRODUCED** = a source was cited to me but I could not surface the numbers from the primary page.
- **UNTRACEABLE** = the number circulates widely with no locatable primary source.
- **VENDOR-INTERESTED** = the publisher sells a product whose value the finding supports. Not
  disqualifying, but must be disclosed.

---

## VERIFIED

### AI Overviews now cite far fewer pages from the organic top 10
- Claim: share of AI Overview citations that also appear in the SERP's first 10 blocks fell from
  ~76% (July 2025) to 37.9% (January 2026). Organic-only figure: 37.10%.
- Source: Ahrefs, "AI Overview citations and the top 10", Louise Linehan & Xibeijia Guan,
  published 2 March 2026. https://ahrefs.com/blog/ai-overview-citations-top-10/
- Dataset: 863,000 keyword SERPs; 4M AI Overview URLs.
- Verbatim: "Google is selecting far fewer pages straight from the original SERP (~76% in July 2025
  vs. ~38% today)."
- I fetched this page myself. Numbers reproduced exactly.
- Note: VENDOR-INTERESTED (Ahrefs sells Brand Radar), but the methodology and n are disclosed.

### The GEO academic paper says 40%, on a benchmark, not on live ChatGPT
- Claim: "GEO boosts visibility by up to 40%."
- Source: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande. "GEO: Generative Engine
  Optimization." arXiv:2311.09735, v1 Nov 2023, v3 Jun 2024. Accepted KDD 2024.
  https://doi.org/10.1145/3637528.3671900
- The 40% is measured on GEO-bench (~10k queries, 9 datasets) using a "visibility" metric based on
  share of the response's word count attributable to a source. It is a lab benchmark result.
- **The distinction almost every marketing page repeating this stat omits:** it is not a field
  measurement of live ChatGPT or Perplexity citation behaviour.

### Term interest in "GEO" has already peaked
- Claim: GEO peaked Aug 2025 and sits ~45% below that high; AEO peaked Sep 2025 and sits ~17% below.
  GEO has ~2x AEO's search volume, yet practitioners are converging on "AEO".
- Source: Rankability, "State of AI Search". Google Keyword Planner export, 3,751 keywords x 48
  monthly data points, Jun 2022 - May 2026. https://www.rankability.com/reports/state-of-ai-search/
- I fetched this myself and confirmed the wording: "AEO sits ~17% below its September high",
  "GEO ~45% below its August high", and "GEO with roughly twice the search volume of AEO - yet
  practitioners are converging on 'AEO' as the standard label."
- SINGLE-SOURCED. No second independent dataset found. Treat as directional.

### AI brand recommendations are wildly unstable run to run
- Source: SparkToro (Rand Fishkin) with Patrick O'Donnell of Gumshoe.ai, Nov-Dec 2025.
  https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/
- Method: 600 volunteers, 2,961 combined runs, 12 brand-recommendation prompts run 60-100 times
  each, across ChatGPT, Claude and Google AI Overviews / AI Mode. Human runners on default,
  personalised settings (not temperature-pinned), deliberately reflecting real-world variation.
- Verbatim: "there's a <1 in 100 chance that ChatGPT or Google's AI, if asked 100X, will give you
  the same list of brands in any two responses"
- Verbatim: "when it comes to ordering, AI tool responses are so random that it's more like 1 in
  1,000 runs before you'd see two lists in the same order"
- **CAUTION - this stat is already being retold wrongly.** The "1 in 1,000" (0.1%) applies to
  *ordering*. The same-list-membership figure is <1 in 100 (<1%). I was myself handed the
  conflated version during this very research and repeated it before checking. Any page citing
  "0.1% chance of the same list" is wrong.

### There is no single "AI visibility" - the engines barely agree
- Claim: of URLs cited for the same prompt, only 2.37% appear in all three of ChatGPT, Perplexity
  and Google AI Overviews. 91% appear in exactly one engine.
- Source: Kevin Indig, analysing 3.7M citations from 20k prompts using Omnia data, May 2026.
  https://substack.com/@kevinindig/note/c-257190906 (his own words); longer treatment at
  https://www.growth-memo.com/p/the-consensus-gap
- Verbatim: "only 2.37% of cited URLs appear in all 3 LLMs for the same prompt. 91% live in exactly one."
- Implication, and it is the commercially important one: any tool reporting a single blended
  "AI Visibility %" across engines is averaging three near-disjoint populations.

### A GEO tracking startup shut down and its founder said the category is a feature
- Lorelight, founded by Benjamin Houy, operated ~7 months (April to October 2025) and closed.
- Source: Search Engine Land, 4 Nov 2025. https://searchengineland.com/geo-startup-lorelight-shuts-down-464208
- Verbatim: "Customers were churning because the product didn't change what they needed to do."
- Verbatim: "There's no secret GEO strategy. AI models reward the same fundamentals that already
  drive SEO and PR."
- Verbatim: "GEO makes more sense as a feature within existing SEO platforms, not as a standalone
  category."
- I fetched this myself. This is the single most important fact in the dossier: it is a NO-GO on
  building a tracker, and a GO on being the party willing to say this out loud.

### The category is consolidating from above while commoditising from below
- Adobe is acquiring Semrush for ~$1.9B all-cash ($12/share), expected to close H1 2026.
  https://www.searchenginejournal.com/adobe-to-acquire-semrush-in-1-9-billion-cash-deal/561438/
- Sitecore acquired Scrunch AI (a pure-play GEO tracker), announced 3 June 2026; the ~$225M price is
  Bloomberg-sourced and unconfirmed by Sitecore.
  https://www.prnewswire.com/news-releases/sitecore-acquires-scrunch-to-help-brands-influence-discovery-and-buying-decisions-in-the-ai-search-era-302790214.html
- Meanwhile Google Search Console shipped AI performance reports (3 Jun 2026) - impressions only,
  no clicks, no CTR, no queries, AI Overviews and AI Mode not separated.
  https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- Bing Webmaster Tools shipped an AI Performance report with Citation Share (June 2026).
- OpenAI still ships NO publisher analytics for ChatGPT. This is the gap keeping third-party
  cross-engine tools alive, and the single biggest thesis risk if OpenAI closes it.

### Affiliate reality: the GEO-native tools mostly do not pay
- Verified myself: Nightwatch pays **30% lifetime recurring, 365-day cookie**, $100 payout
  threshold, PayPal/Stripe, no brand-keyword bidding. It also genuinely tracks AI citations
  ("Citation Intelligence"). https://nightwatch.io/seo-affiliate-program/
- Otterly.ai: 20% recurring, first 12 months only. https://otterly.ai/referral
- Rankscale: 10% recurring, capped at 12 months, 60-day cookie.
- Writesonic: 20% recurring, 12 months (official page; aggregators claiming 30% lifetime are wrong).
- **Ahrefs runs no affiliate program at all** (closed 2019). Clearscope: none. Screaming Frog: none.
- Profound, Peec, AthenaHQ, Evertune, Brandlight, Bluefish, Goodie, Gauge, Knowatoa: no public
  affiliate program found. Confirmed by spot-check: otterly.ai/affiliate, otterly.ai/partners and
  peec.ai/affiliate all return 404; semrush's affiliate page returns 200 as a control.
- **Consequence:** the three best-regarded tools in the niche pay nothing. Any site whose rankings
  follow its commissions will rank the wrong tools. That is the trust vacuum.

---

## UNREPRODUCED

### The llms.txt server-log study
- Claim as relayed to me: over 90 days, only 84 of 62,100+ AI bot hits requested /llms.txt (0.1%),
  and the path underperformed ordinary content pages 3x.
- Cited source: Otterly.ai, "Llms.txt Experiment", 5 Feb 2026. https://otterly.ai/blog/llms-txt/
- I fetched the page myself and **could not surface those numbers**. The page's methodology section
  did not yield the sample size, date range, or the 84/62,100 figures.
- Status: the *direction* (AI crawlers largely ignore llms.txt) is corroborated by John Mueller's
  public comments, but **the specific numbers are not currently reproducible by me and must not be
  published as fact.** Needs a primary re-check, or cite only the qualitative finding.
- Also VENDOR-INTERESTED: Otterly sells AI search monitoring.

---

## UNTRACEABLE - do not publish without a primary source

### "YouTube mentions correlate with AI visibility at r=0.737"
- Attributed to a "Semrush AI Visibility Index" of 126M prompts. The Semrush study that *was*
  verified (11,882 prompts, 337,785 URLs, published 14 Jan 2026) explicitly states it did NOT test
  YouTube or backlink correlations. The 0.737 figure may be misattributed or fabricated, and is
  circulating across vendor blogs.

### "A 100-word Reddit comment gets cited 12x more than a 2,000-word guide"
- Suspiciously precise, no traceable methodology. Reads as marketing copy.

### "GEO market: $848M in 2025 -> $33.7B by 2034, 50.5% CAGR"
- Repeated across secondary blogs; not traceable to a named primary market-research firm.

---

## The point

Three of the most-repeated numbers in this niche are untraceable, one is unreproducible, and the
single most-quoted stat (40%) is a lab benchmark being passed off as a field result. That is the
gap. It is not a data-scale gap - Ahrefs and Profound win that on capital. It is a **rigour** gap,
and rigour does not require funding.
