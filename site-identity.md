# Site Identity Record: GEOoptimised

```yaml
siteId: geooptimised
domain: geooptimised.com
launched: 2026-06 (as an agency site) | repositioned: 2026-07-10
```

## Entity definition (quotable by an LLM, one sentence)

> GEOoptimised is an independent evidence base for AI search visibility that grades every published
> claim by whether it traces to a primary source and reproduces, and that publishes exactly what
> each tool it reviews pays it.

**Mandatory disambiguation** (carried in Organization schema, `llms.txt`, and the entity home):

> GEOoptimised covers generative engine optimisation, meaning how brands come to be cited by AI
> assistants such as ChatGPT, Perplexity, Claude and Google AI Overviews. It has nothing to do with
> geographic, location-based or geo-targeted marketing.

This matters commercially: practitioners already cite the "GEO"/geo-targeting collision as a reason
to prefer the term "AEO". The site must own the disambiguation rather than be a victim of it, and
must cover **both** GEO and AEO. Owned evidence supports covering AEO: on sunnypatel.co.uk, the AEO
agencies page drew 1,418 impressions against the GEO page's 59.

## USP

- **Statement:** Every claim on GEOoptimised carries an evidence grade, a named primary source, and a
  note on whether we reproduced it ourselves; and we publish exactly what each tool we review pays
  us, including the ones that pay us nothing.
- **Traced to dossier gap:** §5 (three of the niche's most-quoted stats are untraceable, one is
  unreproducible, the headline "40%" is a lab benchmark presented as a field result, and SparkToro's
  real finding is drifting by a factor of ten in retelling). Plus §2 (every top-ranking "best GEO
  tools" listicle is published by a vendor ranking its own product).
- **Specificity test:**
  - No banned word used (comprehensive, ultimate, one-stop, best-in-class, all-in-one, trusted, leading).
  - Falsifiable: a reader can pick any claim, follow the source, and check the grade.
  - Not claimed by any top-5 competitor: all of them sell the tools they rank.
  - Not used by any portfolio sibling.
  - Repeatable by a stranger: "It's the site that grades the evidence and tells you who pays it."

### The grading taxonomy (this IS the product)

| Grade | Meaning |
|---|---|
| `VERIFIED` | We fetched the primary source ourselves and the numbers reproduced. |
| `REFUTED` | A named primary source directly contradicts the claim. |
| `MISLEADING` | The source is real, but the claim misrepresents what it measured. |
| `DIRECTIONAL` | A real, named source exists, but it is single-sourced or only partly reproducible. |
| `UNREPRODUCED` | A source is cited for the number, but we could not surface that number from it. |
| `UNTRACEABLE` | The number circulates widely with no locatable primary source. |

The grade always describes **the claim as it circulates**, not the finding that settles it. A true
finding that demolishes a popular claim makes that claim `REFUTED`, not `VERIFIED`. This distinction
was added on 2026-07-10 after the first draft of the taxonomy graded a false claim `VERIFIED`
because we had verified the study disproving it. Logged in `corrections.json`.

Orthogonal flag, applied on top of any grade: `VENDOR-INTERESTED` - the publisher sells a product
whose value the finding supports. Not disqualifying. Always disclosed.

**The site's own rule, published openly:** we apply these grades to ourselves. When we get one wrong,
the correction stays on the page with a date. During the research that produced this site we
personally repeated the mis-scaled SparkToro figure before checking it. That correction ships as
launch content, not as an embarrassment to hide.

## Positioning

| vs | They are | We are |
|---|---|---|
| **Profound** ($155M raised, $1B valuation) | The category leader, with a 680M-citation dataset and enterprise trust. Ranks its own product in its own "best GEO tools" article. No public price ladder. | Selling nothing but the grading. We rank tools that pay us nothing above tools that do, and show the receipts. |
| **Ahrefs / Semrush** | Genuine large-N research, DR 90+, the studies everyone cites. Vendor-interested by construction. Semrush is being absorbed by Adobe. | Not a data producer at their scale, and we say so. We audit their studies against each other, which they will never do. |
| **The tier-2 listicle swarm** (geoptie, wellows, rankchase, novastacks and dozens more) | Fast, high-volume, interchangeable. Recycle the same 4-5 vendor studies. Several repeat stats that have no traceable source. | The site that checked. Slower, fewer pages, every number graded and dated. |

## Audience (ICP)

An in-house marketer, solo consultant or small-agency owner who has just been asked "why aren't we
showing up in ChatGPT?" and needs a defensible answer this week, without a $499/mo enterprise
contract. Sophistication: intermediate to expert. They already suspect much of the GEO discourse is
repackaged SEO, and they are right. They will smell a sales pitch instantly, and one unsourced number
loses them permanently. The job they hire this site for: **"tell me what is actually known, what is
actually guessed, and who is being paid to tell me otherwise."**

## Author persona (E-E-A-T)

The community research is unambiguous: a named author with a track record and a public willingness to
be wrong earns credibility, while the anonymous "GEO expert" is the recurring villain in every
sceptical quote gathered. This site cannot be faceless.

- **Name:** Sunny Patel
- **Credential/experience claim (defensible, verifiable, no invention):** SEO consultant based in
  Berkshire, UK. Runs a portfolio of independent websites and works with search performance data
  daily. **No claim is made about employers, clients, certifications or awards.**
- **Bio (2-3 sentences, for the entity home + Person schema):** Sunny Patel is an SEO consultant based
  in Berkshire, England. He runs a portfolio of independent websites and publishes what the data shows,
  including when it contradicts him. GEOoptimised exists because he could not verify the numbers he
  kept being asked to repeat.
- **sameAs:**
  - `[MANUAL]` LinkedIn profile URL - needed for Person schema. Not invented here.
  - `[MANUAL - DECISION FOR SUNNY]` whether to add `https://sunnypatel.co.uk` as a `sameAs`.
    Commit `d860537` deliberately stripped a commercial body-link to sunnypatel.co.uk to reduce
    footprint under the June 2026 spam update. A Person-schema `sameAs` is entity corroboration
    rather than a commercial link, and is the strongest available signal, but it does associate the
    two properties. **Default: OFF, pending Sunny's call.** No commercial cross-links either way.

## Voice

- **3 traits:** plain-spoken; numerate (every number has a source and a sample size); on the reader's
  side against the people selling to them.
- **Never:** hype, urgency, new acronyms as a sales tactic, guaranteed outcomes, unverifiable case
  studies, a blended "AI Visibility %" quoted without its volatility, emojis, em dashes, en dashes.
- **British English.** "optimisation", "colour", "organisation". "to" not "through" for date ranges.
- Exception, deliberate: "optimization" appears in keyword targets and in quoted source titles, since
  the literature is US-spelled. Never in our own prose.

## Visual direction (from /design)

**Decided by Sunny on 2026-07-10: "content is better, design was better before."** The original dark
system is canonical. A paper-and-serif "scientific register" variant was built, reviewed and rejected.
Do not reintroduce it.

- **Direction:** the original dark navy and cyan system, carrying the evidence-ledger architecture.
- **Palette:** `--bg: #0A0F1E`, `--accent: #00E5CC`, amber secondary `#F5A623`. Hero glow
  (`.hero-fade`), background grid (`.bg-grid`), glass nav (`.nav-glass`).
- **Grade palette, retuned for the dark ground:** green `VERIFIED`, red `REFUTED`, purple `MISLEADING`,
  blue `DIRECTIONAL`, amber `UNREPRODUCED`, grey `UNTRACEABLE`, plus a neutral `VENDOR-INTERESTED` flag.
  Colour carries meaning; it is never decoration. **Grades never rely on colour alone (WCAG): each
  badge carries its text label.**
- **Type:** Space Grotesk display, Inter body, JetBrains Mono for every number, grade, source and
  sample size, so data is visually distinct from prose.
- **Layout signature (the one move this site owns):** **the Claim Card**, a `.card` record showing the
  claim, its grade, the primary source with sample size and date, and a one-line reproduction note. It
  renders identically wherever it appears, is independently linkable at `/evidence/#<id>`, and is
  emitted as `ClaimReview` JSON-LD so an LLM can lift it whole. The evidence ledger is a page of these.
- **Implementation note:** pages style themselves through CSS variables, so a skin swap is a token
  change in `global.css`, not a markup rewrite. `--font-serif` is deliberately mapped to Space Grotesk
  so existing `font-serif` headings resolve to the display face.
- **Must NOT resemble:** `sunnypatel-nextjs`; `agenticai-associates`; and the dashboards of the tools
  it reviews.

## Entity home plan (from /entity-authority)

- **Entity home URL:** `/about/` - carrying the entity definition, the disambiguation paragraph, the
  named author, the grading taxonomy, the corrections policy, and the full affiliate disclosure.
  This is the page every `sameAs` and citation should point at.
- **Corroboration targets:** `[MANUAL]` LinkedIn; `[MANUAL]` a Wikidata item is **not** appropriate
  yet (notability threshold unmet, and claiming otherwise would violate the site's own standard).
  Realistic near-term: author byline consistency, an `/methodology/` page that is independently
  citable, and inbound citation from practitioners who use the ledger.
- **Schema wiring:**
  - `Organization` `@id: https://geooptimised.com/#organization`, with `knowsAbout` and an explicit
    `disambiguatingDescription` separating it from geo-targeting.
  - `Person` `@id: https://geooptimised.com/#sunny-patel`, `author` of every content page.
  - Each graded claim as a `ClaimReview`-shaped object with `reviewRating`, `itemReviewed`, and the
    primary source as `citation`.
  - JSON-LD inline per page. Never injected globally.

## What must never happen on this site

1. A number without a source, a sample size, and a date.
2. A tool ranked above another because it pays more. The affiliate disclosure table is the proof.
3. A guaranteed outcome, an urgency claim, or a case study that cannot be independently checked.
4. Display advertising. The audience blocks it and it would cheapen the one asset this site has.
5. A commercial "GEO agency" or "GEO services" page. That intent belongs to sunnypatel.co.uk, and
   duplicating it is what failed the gate in the first place.
