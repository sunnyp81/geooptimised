# Default Settings

_Started 2026-05-24 19:54 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "GEO Optimised"
Project is currently empty (no files)
Current date is now May 24, 2026
</system-info>

<pasted_text name="Pasted text (208 lines)">
You are designing a high-converting agency website for **geooptimised.com** — a specialist agency focused on Generative Engine Optimisation (GEO). The site must rank on Google AND be cited by LLMs (ChatGPT, Perplexity, Gemini, Claude). It practices what it sells.

### Brand Identity

- **Name:** GEOoptimised (stylised: GEO is the emphasis, "optimised" is the qualifier)
- **Domain:** geooptimised.com
- **Tagline:** "Get Cited by AI" or "Rank Where AI Looks"
- **Positioning:** The agency that makes brands visible in AI-generated search results. Not traditional SEO — this is the next evolution.
- **Tone:** Confident, technical-but-accessible, forward-looking. Not hype. Not corporate. Think: the smartest person in the room who explains things simply.
- **UK English spelling** throughout (optimised, not optimized).

### Tech Stack

- **Astro 5** (static site generator)
- **Tailwind CSS 4** (utility-first styling)
- **No React/Vue/Svelte** — vanilla JS only where needed (counters, mobile nav, scroll animations)
- **JSON-LD** schema inline per page
- All images: WebP with Satori-generated OG images
- Deploy: Cloudflare Pages via GitHub

### Design System Requirements

#### Colour Palette
Design a palette that communicates: AI, precision, trust, technical authority. Suggested direction:
- **Primary:** Deep navy or near-black (#0A0F1E or similar) — authority, depth
- **Accent:** Electric teal/cyan (#00E5CC or similar) — AI, future, data
- **Secondary accent:** Warm amber/gold (#F5A623) — for CTAs, urgency, warmth
- **Neutrals:** Cool greys (#1A1F2E, #2D3348, #8B95A8, #E2E8F0)
- **Background:** Dark mode primary (#0A0F1E), light sections (#F8FAFC)
- **Text:** #F0F4F8 on dark, #0A0F1E on light

The site should feel like a premium SaaS dashboard meets agency portfolio. Dark-mode-first.

#### Typography
- **Headings:** Inter or Space Grotesk (geometric, clean, modern)
- **Body:** Inter (highly legible, system-font-like)
- **Code/data:** JetBrains Mono (for any code snippets, metrics displays)
- Scale: 16px base, 1.25 modular scale

#### Component Library

Design these reusable components:

1. **Hero Section** — full-width, dark bg, animated gradient mesh or particle field, H1 + subheading + dual CTA (primary: "Get Your AI Visibility Audit" / secondary: "See How GEO Works")
2. **Stats Bar** — 3-4 key metrics in a row (e.g., "12,000+ monthly searches for GEO", "87% of clicks going to AI answers", "3x faster growth than traditional SEO"). Animated counters on scroll.
3. **Service Card** — icon + title + 2-line description + arrow link. Used on services hub. Hover: subtle glow/border animation.
4. **Tool Comparison Table** — responsive table with feature checkmarks, pricing tiers, verdict badges. Sticky header. Mobile: horizontal scroll or card flip.
5. **Content Hub Card** — thumbnail + category tag + title + excerpt + read time. Grid layout, 3-col desktop / 1-col mobile.
6. **CTA Banner** — full-width, gradient background, H2 + paragraph + button. Used between content sections.
7. **Testimonial/Case Study Card** — quote + metric uplift + client name/logo. Carousel on mobile.
8. **FAQ Accordion** — clean expand/collapse with smooth animation. Generates FAQ schema.
9. **Platform Badge Row** — logos/icons for ChatGPT, Perplexity, Gemini, Claude, Google AI Overview. Shows "we optimise for all of these."
10. **Breadcrumb** — lightweight, schema-aware, fits the dark theme.
11. **Author Card** — photo + name + title + short bio. Used on all content pages. Builds E-E-A-T.
12. **Internal Link Block** — "Related Reading" section with 3-4 cards. Used at bottom of every SEED page.
13. **Newsletter Capture** — minimal: email input + submit. "Get the GEO Weekly" or similar.
14. **Mobile Navigation** — hamburger → slide-in panel, dark theme, grouped by NODE categories.

#### Page Layouts

Design these page templates:

**1. Homepage**
```
[Nav: Logo | Services | Tools | Learn | Industries | Contact]
[Hero: H1 "Get Your Brand Cited by AI" + subheading + dual CTA]
[Platform Badge Row: ChatGPT | Perplexity | Gemini | Claude | Google AIO]
[Stats Bar: 3 animated metrics]
[Services Grid: 4 service cards → /geo-services/]
[How It Works: 3-step process (Audit → Optimise → Monitor)]
[Tool Showcase: Featured tool comparison preview → /geo-tools/]
[Case Study Highlight: 1 featured result → /aeo-case-studies/]
[Content Hub Preview: 3 latest articles]
[CTA Banner: "Ready to rank where AI looks?"]
[Footer: sitemap links, newsletter, social, legal]
```

**2. NODE Page (e.g., /geo-services/)**
```
[Breadcrumb]
[Hero: H1 + summary paragraph + CTA]
[Overview section: what this node covers, 2-3 paragraphs]
[SEED Cards Grid: all child pages as cards]
[Comparison Table: if applicable (tools nodes)]
[FAQ Accordion: 4-6 questions, schema-enriched]
[CTA Banner]
[Related NODEs: 2-3 sibling nodes]
[Author Card]
```

**3. SEED Page (content page)**
```
[Breadcrumb]
[Article Header: H1 + meta (read time, updated date, author)]
[Table of Contents: sticky sidebar on desktop, collapsible on mobile]
[Article Body: H2/H3 structure, images, callout boxes, data tables]
[Key Takeaways Box: 3-5 bullet summary at top (for LLM citation)]
[Author Card]
[Internal Link Block: 3-4 related pages from same NODE]
[CTA Banner: contextual to the page topic]
[FAQ section if applicable]
```

**4. ROOT Page (/generative-engine-optimisation/)**
```
[Breadcrumb]
[Hero: H1 (most important heading in entire site) + authoritative opening paragraph]
[Table of Contents: links to all major sections]
[Definition Section: clear, quotable definition block (styled as callout)]
[How It Works: detailed process]
[GEO vs SEO: comparison table]
[Tools Overview: top picks with links to /geo-tools/]
[Industry Applications: links to /geo-by-industry/]
[Platform Breakdown: links to /optimise-for-ai-platforms/]
[Metrics & KPIs: links to /geo-metrics/]
[FAQ Accordion]
[CTA: "Get Your Free AI Visibility Audit"]
[All NODE links: structured navigation to every NODE]
```

**5. Contact / Audit Request Page**
```
[H1: "Get Your AI Visibility Audit"]
[2-col: Left = form (name, email, URL, budget range, message) | Right = what they get (deliverables list + timeline)]
[Trust signals: platform logos, stats, mini-testimonial]
```

#### LLM-Citability Design Patterns

Every page must include these structural elements that make content extractable by LLMs:

1. **Definition callout box** — styled blockquote at top of key pages with a clear "GEO is..." or "AEO is..." statement
2. **Key Takeaways** — bulleted box before the main content (LLMs often cite these)
3. **Numbered frameworks** — "The 7-Step GEO Process", "5 Pillars of AI Visibility" (LLMs love numbered lists from authoritative sources)
4. **Data tables** — structured comparison data that LLMs can parse
5. **Clear H2 question format** — "What is GEO?", "How does GEO work?" (matches LLM query patterns)
6. **Schema on every page** — Article, FAQ, HowTo, BreadcrumbList, Organization
7. **Consistent entity naming** — first mention always "GEO (Generative Engine Optimisation)", thereafter "GEO"

#### Responsive Breakpoints
- Mobile: 320-639px (1 column, stacked)
- Tablet: 640-1023px (2 column where applicable)
- Desktop: 1024-1279px (standard layout)
- Wide: 1280px+ (max-width container, centred)

#### Performance Targets
- Lighthouse: 95+ on all metrics
- First Contentful Paint: <1.2s
- CLS: 0
- No layout shifts from font loading (use font-display: swap + preload)
- All images lazy-loaded except above-fold
- Total page weight: <200KB HTML+CSS+JS (excluding images)

#### Accessibility
- WCAG 2.1 AA minimum
- Skip-to-content link
- Focus styles on all interactive elements
- Colour contrast ratios: 4.5:1 minimum for text
- Semantic HTML throughout (nav, main, article, aside, footer)
- All images have descriptive alt text

### Deliverables

Please generate:

1. **Design system tokens** — colours, typography, spacing as Tailwind config
2. **Component code** — each component as an Astro component (.astro files) with Tailwind classes
3. **Page layouts** — all 5 templates as Astro layouts
4. **Homepage** — fully built with placeholder content
5. **One NODE page** — /geo-services/ with placeholder cards
6. **One SEED page** — /geo-agency/ with full article layout
7. **Global styles** — base.css with custom properties, dark mode defaults
8. **Navigation** — desktop + mobile, with the site's actual page structure

Use the actual page titles and URLs from the topical map. The site structure is:

```
/ (homepage)
├── /generative-engine-optimisation/  (ROOT — pillar guide)
├── /geo-services/                    (NODE — services hub)
│   ├── /geo-agency/                  (SEED)
│   ├── /ai-optimisation-agency/      (SEED)
│   ├── /aeo-agency/                  (SEED)
│   └── /aeo-services/                (SEED)
├── /answer-engine-optimisation/      (NODE — AEO guide)
├── /geo-tools/                       (NODE — tools hub)
│   ├── /best-ai-optimisation-tools/  (SEED)
│   ├── /best-aeo-platforms-2026/     (SEED)
│   └── /best-ai-tools-geo/          (SEED)
├── /geo-vs-seo/                      (NODE — comparison)
├── /ai-brand-visibility/             (NODE — visibility hub)
│   ├── /knowledge-graph-optimisation/ (SEED)
│   ├── /entity-optimisation/          (SEED)
│   └── /schema-markup-ai/            (SEED)
├── /geo-strategy/                    (NODE — strategy hub)
├── /geo-by-industry/                 (NODE — verticals)
│   ├── /geo-for-law-firms/           (SEED)
│   ├── /ai-optimisation-ecommerce/   (SEED)
│   └── /geo-for-b2b/                (SEED)
├── /optimise-for-ai-platforms/       (NODE — platforms)
│   ├── /optimise-for-chatgpt/        (SEED)
│   └── /optimise-for-perplexity/     (SEED)
├── /geo-metrics/                     (NODE — KPIs)
└── /contact/                         (Lead capture)
```

Build it production-ready. No placeholder "lorem ipsum" — use realistic copy that matches the brand positioning. Every heading should target a real keyword from the topical map.

</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design. Follow the instructions about design in your system prompt, particularly the 'How to do design work' section. Use the design_canvas starter component, or make a full-bleed prototype and offer options via Tweaks.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>

<attached-skill name="Design System (design system)">
[Design System] This project uses the **Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.

    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/a6cae38f-7a8c-4f2d-8584-390d18a48e78/`. Before producing any visuals, explore it: call `list_files("/projects/a6cae38f-7a8c-4f2d-8584-390d18a48e78/")` to see the structure, then `read_file` the README/base.md or whatever index file it has. Don't guess at the design system's contents.

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s). Before writing any `var(--*)`, look up the real name in the design system's `.css` files (`list_files` + `read_file` under `/projects/a6cae38f-7a8c-4f2d-8584-390d18a48e78/`). Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/a6cae38f-7a8c-4f2d-8584-390d18a48e78/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## Assistant

_[tool: list_files]_

_[tool: questions_v2]_

## User

Questions timed out; go with defaults

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: write_file]_

_[tool: write_file]_

Now the shared components:Now the homepage:

_[tool: write_file]_

Now the ROOT pillar page (the most important content page):

_[tool: write_file]_

Now the NODE, SEED, and Contact pages:

_[tool: write_file]_

_[tool: write_file]_

Contact / Audit Request page:

_[tool: write_file]_

Now the app wrapper with router, tweaks, and 404 fallback for unknown routes:

_[tool: write_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: show_html]_

Good, my usage is correct. Let me load and check for errors.

_[tool: done]_

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

Built the GEOoptimised site as a working multi-page prototype. Live preview is open.

**What's there**
- **Homepage** — animated AI-citation hero (cycles ChatGPT → Perplexity → AI Overview answers with the brand highlighted in the cite), platform badge row, animated stats bar, services grid, 3-step process, tool comparison table, anonymised case study, content-hub preview, CTA banner, full footer
- **ROOT pillar** `/generative-engine-optimisation/` — sticky TOC, definition callout, key-takeaways box, GEO-vs-SEO table, 7-step framework, FAQ with schema-friendly structure
- **NODE hub** `/geo-services/` — overview, four service cards, tier comparison table, FAQ, related NODEs
- **SEED page** `/geo-agency/` — long-form layout with TOC, fit/not-fit boxes, transparent pricing tiers, team grid, FAQ, related reading
- **Contact** `/contact/` — two-column audit-request form with validation, success state, deliverables checklist, timeline

**Tweaks panel** (toolbar toggle) controls accent colour (4 swatches), display font, hero variant (Demo / Mesh / Chart), headline + subhead copy, and has a quick jump-nav to every template.

Navigate via the top nav, footer links, or hash URLs (`#/geo-agency/` etc.). Any unbuilt route falls through to a stub that points to the equivalent designed template.

**Worth noting**
- It's a design preview, not real Astro yet — your eventual `.astro` build would lift the same components and tokens. The `--accent`, `--bg`, etc. CSS variables map cleanly to your Tailwind 4 theme config.
- Testimonials are anonymised ("UK B2B SaaS", "UK fintech") — swap with real once you have signed quotes.
- Platform "logos" are abstract geometric icons + wordmark, safer than recreating real marks.

