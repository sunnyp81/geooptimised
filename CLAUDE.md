# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev        # Start dev server
npm run build      # Static build → dist/
npm run preview    # Preview production build locally
```

Deploy: Cloudflare Pages via GitHub (`sunnyp81/geooptimised`). Build command `npm run build`, output `dist`, NODE_VERSION=22.

## Architecture

**Stack:** Astro 5 + Tailwind CSS 4 (via `@tailwindcss/vite`), static output, no SSR. `@astrojs/sitemap` auto-generates sitemap-index.xml.

**Layout system:** Single `Base.astro` layout handles all pages. Props: `title`, `description`, `schema` (JSON-LD object or array), `canonical` (optional), `ogType` (default "website"). Schema is injected as `<script type="application/ld+json">` — pass an array for multiple schema blocks.

**Design tokens:** Defined in `src/styles/global.css` via Tailwind 4 `@theme` block. Two scales: `geo-950`→`geo-50` (dark navy primary) and `accent-600`→`accent-300` (cyan). Body is `bg-geo-950 text-gray-200`. Font is Inter (400–800).

**Header/Footer:** Hardcoded nav arrays. Mobile menu uses inline vanilla JS toggle. If adding pages to nav, update both `Header.astro` and `Footer.astro`.

## Content Model — Topical Map

This site follows a ROOT/NODE/SEED topical map architecture (123 total pages planned). The full map lives at `G:\My Drive\Claude Code Work\Topical_Maps\geooptimised.com_topical_map.md`.

- **ROOT** (1 page): `/generative-engine-optimisation/` — pillar, links to all NODEs
- **NODEs** (12 pages): Hub pages for major topic clusters
- **SEEDs** (87+ pages): Long-tail pages under each NODE

Publication velocity: launch set of 8, then 3–4 pages/day ramping every 2 weeks.

## Page Patterns

Every page must include:
1. **JSON-LD schema** — Article + FAQPage for content pages, Service/ProfessionalService for commercial pages, BreadcrumbList on all non-homepage pages
2. **Internal links** — every SEED links to its parent NODE and ROOT; cross-NODE bridges where topically relevant
3. **LLM-citable structure** — lead every section with a bold declarative statement; LLMs prefer confident, quotable definitions

Content sections follow: hero → definition/intro → body sections (cards/tables/lists) → CTA to `/contact/`.

Link styling: `text-accent-400 underline decoration-accent-500/30 underline-offset-2 hover:text-accent-300`.

## Brand & Copy Rules

- Brand name is **GEOoptimised** (exact capitalisation)
- British English throughout: optimisation, colour, organisation
- Exception: "optimization" (US spelling) appears naturally in keyword targets since search volume is US-heavy
- No emojis
- Tone: authoritative specialist, data-driven, not salesy
- Key differentiators: brand=category, practitioner authority, dual-ranking (AI + traditional), platform-specific playbooks

## Adding New Pages

1. Create `src/pages/{slug}.astro` — URL becomes `/{slug}/`
2. Import `Base` layout, pass title/description/schema
3. Include BreadcrumbList schema: Home → parent NODE → current page
4. Link back to parent NODE and ROOT in content
5. Add to Header/Footer nav arrays if it's a top-level page
6. After deploy: IndexNow ping, submit to GSC sitemap

## Static Assets

- `public/robots.txt` — allows all, points to sitemap-index.xml
- `public/llms.txt` — declares site purpose and expertise for AI crawlers; update when adding major new content areas
