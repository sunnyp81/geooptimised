// page-root.jsx — /generative-engine-optimisation/ ROOT pillar page

function GeoVsSeoTable() {
  const rows = [
    ["Primary surface", "Blue links on a SERP", "Cited sentences inside an AI answer"],
    ["Unit of optimisation", "Keywords", "Entities, claims, citations"],
    ["Success metric", "Rank position, organic traffic", "Citation share, prompt coverage"],
    ["Content shape", "Long-form, keyword-dense", "Extractable: definitions + frameworks + data"],
    ["Linking strategy", "Backlinks for authority", "External citations + entity reinforcement"],
    ["Refresh cadence", "Quarterly content reviews", "Weekly, per model release"],
    ["Feedback loop", "GSC, rank trackers", "Citation-share dashboards (Profound, Otterly)"],
  ];
  return (
    <div className="card overflow-hidden my-10">
      <table className="w-full text-left text-[14.5px]">
        <thead className="border-b hair">
          <tr className="text-[11px] font-mono uppercase tracking-widest text-ink-300">
            <th className="px-5 py-4 font-medium">Dimension</th>
            <th className="px-5 py-4 font-medium">Traditional SEO</th>
            <th className="px-5 py-4 font-medium accent-text">Generative Engine Optimisation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b hair-soft last:border-b-0">
              <td className="px-5 py-4 text-ink-300 font-mono text-[12.5px]">{r[0]}</td>
              <td className="px-5 py-4 text-ink-200">{r[1]}</td>
              <td className="px-5 py-4 text-white">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SevenStepFramework() {
  const steps = [
    { t: "Entity audit", d: "Inventory every entity (people, products, places, concepts) Google and the LLMs already associate with you." },
    { t: "Citation baseline", d: "Run 200+ relevant prompts across 5 engines. Score current citation share by intent cluster." },
    { t: "Page restructure", d: "Lead with explicit, quotable definitions. Add numbered frameworks. Surface H2s as questions." },
    { t: "Schema layering", d: "Implement Article, FAQ, HowTo, Organization, Person — with sameAs to authoritative sources." },
    { t: "External reinforcement", d: "Seed your definitions into Wikipedia, Wikidata, industry publications, trusted forums." },
    { t: "Model-specific tuning", d: "ChatGPT, Perplexity and Gemini cite different source types. Optimise per engine." },
    { t: "Continuous monitoring", d: "Track weekly. Diff against model releases. Compound the wins; retire the losses." },
  ];
  return (
    <div className="my-10 grid md:grid-cols-2 gap-3">
      {steps.map((s, i) => (
        <div key={i} className="card p-5 flex gap-4">
          <div className="w-10 h-10 rounded-lg border hair flex-shrink-0 flex items-center justify-center font-mono text-[var(--accent)] text-sm">0{i+1}</div>
          <div>
            <div className="font-display text-white text-[17px] font-medium tracking-tightish">{s.t}</div>
            <div className="mt-1 text-ink-200 text-[14px] leading-relaxed">{s.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TocSidebar({ sections, active }) {
  return (
    <aside className="hidden lg:block w-[240px] flex-shrink-0">
      <div className="sticky top-24">
        <div className="eyebrow mb-3">On this page</div>
        <nav className="toc">
          {sections.map((s) => (
            <a key={s.id} href={"#" + s.id} className={active === s.id ? "active" : ""}>{s.label}</a>
          ))}
        </nav>
        <div className="mt-6 card p-4">
          <div className="text-[12px] text-ink-300 mb-2 font-mono">Estimated reading time</div>
          <div className="font-display text-white text-[18px]">14 min</div>
        </div>
      </div>
    </aside>
  );
}

function RootPage() {
  const sections = [
    { id: "definition", label: "What is GEO?" },
    { id: "why", label: "Why GEO matters in 2026" },
    { id: "how", label: "How GEO works" },
    { id: "vs-seo", label: "GEO vs SEO" },
    { id: "framework", label: "The 7-step framework" },
    { id: "platforms", label: "Per-platform tactics" },
    { id: "metrics", label: "Metrics & KPIs" },
    { id: "tools", label: "Recommended tools" },
    { id: "faq", label: "FAQ" },
  ];
  const [active, setActive] = React.useState("definition");
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-30% 0% -60% 0%" });
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Learn", path: "/generative-engine-optimisation/" },
        { label: "Generative Engine Optimisation" },
      ]} />

      <section className="container-wide pt-8 pb-12 relative">
        <div className="absolute inset-0 hero-fade pointer-events-none opacity-60" />
        <div className="relative max-w-4xl">
          <div className="eyebrow mb-4">The pillar guide · Updated May 2026</div>
          <h1 className="font-display text-5xl md:text-[68px] font-medium tracking-tighter2 leading-[.98] grad-text">
            Generative Engine Optimisation: the complete 2026 guide
          </h1>
          <p className="mt-6 text-[18px] md:text-[20px] text-ink-200 leading-relaxed max-w-3xl">
            Generative Engine Optimisation (GEO) is the discipline of structuring brand content so it is surfaced and cited inside AI-generated answers. This guide explains what GEO is, why it has replaced traditional SEO as the leading commercial discovery channel, and the exact 7-step framework we use to get clients cited across ChatGPT, Perplexity, Gemini, Claude and Google AI Overview.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-ink-300 font-mono">
            <span>By Adrian Marshall</span>
            <span className="text-ink-600">·</span>
            <span>14 min read</span>
            <span className="text-ink-600">·</span>
            <span>3,940 words</span>
            <span className="text-ink-600">·</span>
            <span>Reviewed by Dr. Mia Okafor, PhD</span>
          </div>
        </div>
      </section>

      <div className="container-wide flex gap-12">
        <TocSidebar sections={sections} active={active} />
        <article className="flex-1 max-w-3xl prose-dark pb-20">

          <KeyTakeaways items={[
            "GEO is content optimisation for AI-generated answers, not just search rankings.",
            "87% of commercial queries now resolve inside an AI answer before a click happens.",
            "Citation share — not rank position — is the metric that matters.",
            "ChatGPT, Perplexity and Gemini each prefer different source types. Optimise per engine.",
            "Definitions, numbered frameworks and structured data are what LLMs extract most reliably.",
          ]} />

          <h2 id="definition" className="anchor-top">What is GEO?</h2>
          <Definition term="GEO (Generative Engine Optimisation)">
            is the practice of structuring a brand's web content so it is surfaced, attributed and cited inside AI-generated answers across engines like ChatGPT, Perplexity, Gemini, Claude and Google AI Overview.
          </Definition>
          <p>
            Where traditional SEO optimises for a position on a results page, GEO optimises for inclusion inside the answer itself. The distinction matters because a citation inside an AI response is the new front page — by the time the user clicks (or doesn't), the model has already chosen which brands to mention and which to ignore.
          </p>
          <p>
            <strong>Three things make a brand citable</strong>: clear, extractable definitions; reinforced entity associations across the open web; and machine-readable structured data that maps your content to authoritative concepts.
          </p>

          <h2 id="why" className="anchor-top">Why GEO matters in 2026</h2>
          <p>
            The shift is no longer theoretical. <strong>87% of commercial queries</strong> in our Q1 2026 index resolved inside an AI-generated answer before any click occurred. Of those, the brand surfaced inside the answer captured the majority of the downstream attention, regardless of where it ranked in the underlying SERP.
          </p>
          <p>
            For brands that have spent a decade investing in traditional rank-based SEO, this is uncomfortable. The good news: the underlying assets — authoritative content, technical hygiene, real expertise — still matter. The bad news: how you package them needs to change.
          </p>

          <h2 id="how" className="anchor-top">How GEO works</h2>
          <p>
            LLMs don't "rank" pages the way a search engine does. They retrieve passages, evaluate the strength of the source, and synthesise an answer. To be cited, your content must be:
          </p>
          <ul>
            <li><strong>Extractable</strong>: short, self-contained passages that answer a single question.</li>
            <li><strong>Authoritative</strong>: reinforced by external citations from trusted sources.</li>
            <li><strong>Disambiguated</strong>: each entity (brand, product, person) is unambiguously identified, ideally with schema and Wikidata.</li>
            <li><strong>Fresh</strong>: updated frequently enough to outrank stale alternatives in the retrieval index.</li>
          </ul>

          <h2 id="vs-seo" className="anchor-top">GEO vs SEO — what stays, what changes</h2>
          <p>
            GEO is not a replacement for SEO — it's a superset. The technical fundamentals (crawlability, speed, structured data) carry over. What changes is the optimisation target.
          </p>
          <GeoVsSeoTable />
          <p>
            <Link to="/geo-vs-seo/">Read the full GEO vs SEO breakdown →</Link>
          </p>

          <h2 id="framework" className="anchor-top">The 7-step GEO framework</h2>
          <p>
            Every engagement we run follows the same seven steps, in order. Skip any and the rest underperforms.
          </p>
          <SevenStepFramework />

          <h2 id="platforms" className="anchor-top">Per-platform tactics</h2>
          <p>
            Each engine has its own quirks. A page that ChatGPT loves to cite may be invisible to Perplexity. The platforms we optimise for, and the tactics that move the needle for each:
          </p>
          <div className="grid md:grid-cols-2 gap-3 my-6 not-prose">
            {[
              { name: "ChatGPT", path: "/optimise-for-chatgpt/", note: "Browse-mode favours sites with strong domain reputation and explicit publish dates." },
              { name: "Perplexity", path: "/optimise-for-perplexity/", note: "Cites diverse sources. Wins by being one of the top 3 results in Google + having a clean schema graph." },
              { name: "Gemini", path: "#", note: "Heavy reliance on Knowledge Graph entities. Wikidata + sameAs are non-negotiable." },
              { name: "Claude", path: "#", note: "Prefers long-form, well-reasoned sources. Reward depth and explicit logic." },
            ].map((p) => (
              <Link key={p.name} to={p.path} className="card card-hover p-5 not-prose">
                <div className="flex items-center justify-between">
                  <div className="font-display text-white text-[17px] font-medium">{p.name}</div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </div>
                <div className="mt-2 text-ink-300 text-[13.5px] leading-relaxed">{p.note}</div>
              </Link>
            ))}
          </div>

          <h2 id="metrics" className="anchor-top">Metrics & KPIs</h2>
          <p>
            Traditional SEO metrics (rank, traffic, CTR) describe a world where the click is the conversion event. In a GEO world, the conversion event often happens <em>inside the answer</em> — the user reads, learns, and decides whether you're a credible option, all before reaching your site.
          </p>
          <ul>
            <li><strong>Citation share</strong>: % of relevant prompts in which your brand is cited.</li>
            <li><strong>Prompt coverage</strong>: # of distinct queries your brand appears in.</li>
            <li><strong>Source rank</strong>: when cited, are you the 1st, 2nd or 8th source?</li>
            <li><strong>Sentiment</strong>: is the mention positive, neutral or negative?</li>
            <li><strong>Downstream click-through</strong>: of users who saw you cited, how many visited?</li>
          </ul>
          <p><Link to="/geo-metrics/">Full GEO metrics framework →</Link></p>

          <h2 id="tools" className="anchor-top">Recommended tools</h2>
          <p>
            The GEO tooling space is moving fast. We've tested every platform on the market; this is the current shortlist (May 2026):
          </p>
          <ul>
            <li><strong>Profound</strong> — best overall citation tracking, prompt-level granularity.</li>
            <li><strong>AthenaHQ</strong> — strong value for SMB; weak on Gemini coverage.</li>
            <li><strong>Otterly</strong> — purpose-built for Google AI Overview tracking.</li>
            <li><strong>Peec AI</strong> — enterprise tier with API access and SSO.</li>
          </ul>
          <p><Link to="/geo-tools/">Full tool comparison →</Link></p>

          <h2 id="faq" className="anchor-top">FAQ</h2>
        </article>
      </div>

      <div className="container-wide pb-12">
        <FAQ items={[
          { q: "Is GEO the same as AEO?", a: "Closely related, not identical. Answer Engine Optimisation (AEO) is the broader category, including older answer surfaces like featured snippets. GEO specifically targets generative AI answers. In practice, the techniques overlap heavily, and most agencies (us included) treat them as a single discipline." },
          { q: "Will GEO replace traditional SEO?", a: "Not entirely — but it will replace SEO as the dominant commercial discovery channel for most B2B and high-intent categories within 18 months. SEO remains valuable for navigational and brand queries; GEO wins almost everywhere else." },
          { q: "How long does it take to see results?", a: "Citation share typically begins moving within 4-6 weeks of implementation, with material gains by week 10-12. Faster than most SEO programmes — LLMs re-index more aggressively than Google." },
          { q: "Can I do GEO myself?", a: "Yes, in principle. The barrier isn't technical — it's prioritisation and consistent execution against a weekly monitoring loop. Most in-house teams stall at step 3 of our framework." },
          { q: "What does GEO cost?", a: "Our retainers start at £6,500/month for a full audit + 90-day optimisation programme, scaling with content volume and competitor density. We publish a transparent pricing range on the services page." },
          { q: "Do you guarantee citations?", a: "No reputable GEO agency can guarantee specific citations — the engines are non-deterministic. We do guarantee a measurable lift in citation share and a defined deliverable schedule, with milestone-based contracts." },
        ]} />
      </div>

      <CtaBanner title="Get your free AI Visibility Audit" body="We'll run 200+ prompts against the 5 leading engines, score your current citation share, and send you a 12-page report. Free, no strings, 5-day turnaround." cta="Request your audit" />
    </>
  );
}

Object.assign(window, { RootPage });
