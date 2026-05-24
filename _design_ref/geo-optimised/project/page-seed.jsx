// page-seed.jsx — /geo-agency/ SEED content page

function SeedPage() {
  const [active, setActive] = React.useState("what");
  const sections = [
    { id: "what", label: "What we do" },
    { id: "how", label: "How we work" },
    { id: "for-who", label: "Who it's for" },
    { id: "pricing", label: "Pricing" },
    { id: "results", label: "Recent results" },
    { id: "team", label: "Meet the team" },
    { id: "faq", label: "FAQ" },
  ];
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-30% 0% -60% 0%" });
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/geo-services/" },
        { label: "GEO Agency" },
      ]} />

      <article className="container-wide pt-8 pb-12 relative">
        <div className="absolute inset-0 hero-fade pointer-events-none opacity-50" />
        <header className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-[12px] font-mono text-ink-300 mb-4">
            <span className="px-2 py-1 rounded-md border hair text-[var(--accent)]">Services</span>
            <span>·</span>
            <span>Updated 12 May 2026</span>
            <span>·</span>
            <span>9 min read</span>
          </div>
          <h1 className="font-display text-5xl md:text-[62px] font-medium tracking-tighter2 leading-[.98] grad-text">
            GEO Agency: the team that gets your brand cited by AI.
          </h1>
          <p className="mt-6 text-[18px] text-ink-200 leading-relaxed max-w-3xl">
            GEOoptimised is a specialist Generative Engine Optimisation agency. We work exclusively with B2B SaaS, professional services and considered-purchase DTC brands who want to be the answer ChatGPT, Perplexity, Gemini, Claude and Google AI Overview give to their category's most valuable prompts.
          </p>
        </header>
      </article>

      <div className="container-wide flex gap-12">
        <aside className="hidden lg:block w-[220px] flex-shrink-0">
          <div className="sticky top-24">
            <div className="eyebrow mb-3">On this page</div>
            <nav className="toc">
              {sections.map((s) => (
                <a key={s.id} href={"#" + s.id} className={active === s.id ? "active" : ""}>{s.label}</a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 max-w-3xl pb-16">
          <KeyTakeaways items={[
            "We focus on a single outcome: increased citation share inside AI answers.",
            "Our 12-month retainers compound — average client doubles citation share by month 9.",
            "Every deliverable is mapped to a measurable KPI before kickoff.",
            "We work with 40+ B2B brands. We do not take on competing clients in the same category.",
            "Engagements start with a free 5-day audit so both sides can decide.",
          ]} />

          <div className="prose-dark">
            <h2 id="what" className="anchor-top">What a GEO agency actually does</h2>
            <p>
              A GEO agency restructures a brand's web presence so that AI models reliably surface it inside answers. That's the headline. Underneath it sits a stack of disciplines — entity strategy, on-page content engineering, schema markup, citation-share monitoring, and ongoing diffing against new model releases.
            </p>
            <p>
              We're not a generalist marketing agency that added "AI" to the brochure. GEOoptimised was founded in 2024 specifically to solve this problem. It's the only thing we do.
            </p>

            <h3>Our four core workstreams</h3>
            <ul>
              <li><strong>Diagnose</strong> — citation-share audit across 200+ category prompts, scored against your top 5 competitors.</li>
              <li><strong>Restructure</strong> — page-by-page rewrites that lead with definitions, frameworks and quotable claims.</li>
              <li><strong>Reinforce</strong> — schema, sameAs, Wikidata and external citation seeding into authoritative sources.</li>
              <li><strong>Monitor</strong> — weekly tracking dashboards, model-release alerts within 48 hours, quarterly executive reviews.</li>
            </ul>

            <h2 id="how" className="anchor-top">How we work</h2>
            <p>
              We run engagements in 90-day waves. Each wave starts with a written hypothesis — "we believe doing X will move citation share for prompt-cluster Y by Z%" — and ends with a measured outcome. No deliverable goes into a wave without an explicit prediction.
            </p>
            <p>
              The team you meet on day one is the team you work with for the duration. No bait-and-switch. No offshore content mills. Every page we ship is written or reviewed by a senior strategist with first-hand experience inside Google's Search Quality team, or running search at a category-leading SaaS.
            </p>

            <h2 id="for-who" className="anchor-top">Who this is for</h2>
            <div className="grid md:grid-cols-2 gap-3 my-6 not-prose">
              <div className="card p-5">
                <div className="flex items-center gap-2 text-[var(--accent)] mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                  <span className="font-mono text-[11px] uppercase tracking-widest">Good fit</span>
                </div>
                <ul className="space-y-2 text-[14px] text-ink-100">
                  <li>· B2B SaaS at £5M+ ARR</li>
                  <li>· Professional services with high deal value</li>
                  <li>· Considered-purchase DTC (£500+ AOV)</li>
                  <li>· In-house team to ship our recommendations</li>
                  <li>· 12-month commitment runway</li>
                </ul>
              </div>
              <div className="card p-5">
                <div className="flex items-center gap-2 text-ink-300 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
                  <span className="font-mono text-[11px] uppercase tracking-widest">Not a fit</span>
                </div>
                <ul className="space-y-2 text-[14px] text-ink-300">
                  <li>· Pre-revenue or early MVP stage</li>
                  <li>· YMYL (medical, financial advice)</li>
                  <li>· Looking for "AI content at scale"</li>
                  <li>· Needs results in &lt;30 days</li>
                  <li>· No content team to implement</li>
                </ul>
              </div>
            </div>

            <h2 id="pricing" className="anchor-top">Pricing, transparently</h2>
            <p>
              We publish our pricing because most of our peers don't, and we think that's a tell. Our retainers start at <strong>£6,500 per month</strong> for a full-service GEO programme. Scope scales with content volume and competitor density.
            </p>
            <div className="not-prose card overflow-hidden my-6">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x hair">
                {[
                  { name: "Scout", price: "£6,500", desc: "Single-product brands, &lt; 100 pages of optimisable content. 1 strategist, 1 writer." },
                  { name: "Programme", price: "£12,400", desc: "Multi-product or international scope. 2 strategists, 2 writers, dedicated analyst.", featured: true },
                  { name: "Embedded", price: "£24,000+", desc: "Embedded with your marketing team. Custom scope, executive sponsorship." },
                ].map((p) => (
                  <div key={p.name} className={"p-6 " + (p.featured ? "bg-[var(--accent)]/[.04]" : "")}>
                    <div className="flex items-baseline justify-between">
                      <div className="font-display text-white text-[20px] font-medium">{p.name}</div>
                      {p.featured && <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">Most picked</span>}
                    </div>
                    <div className="mt-2 font-display text-3xl text-white tracking-tighter2 font-medium">{p.price}<span className="text-ink-300 text-base font-normal">/mo</span></div>
                    <div className="mt-3 text-ink-300 text-[13.5px] leading-relaxed" dangerouslySetInnerHTML={{ __html: p.desc }} />
                  </div>
                ))}
              </div>
            </div>

            <h2 id="results" className="anchor-top">Recent results</h2>
            <div className="not-prose grid sm:grid-cols-3 gap-3 my-6">
              {[
                { v: "+312%", l: "Citation share, UK legal client", c: "var(--accent)" },
                { v: "61%", l: "Of ChatGPT answers in category", c: "#7C5CFF" },
                { v: "£840k", l: "Pipeline tracked to AI citations", c: "#F5A623" },
              ].map((s, i) => (
                <div key={i} className="card p-6">
                  <div className="font-display text-4xl tracking-tighter2 font-medium" style={{ color: s.c }}>{s.v}</div>
                  <div className="mt-2 text-ink-300 text-[13px] leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
            <p>
              We anonymise client names by default; we'll share specifics under NDA on a discovery call.
            </p>

            <h2 id="team" className="anchor-top">The team</h2>
          </div>

          <div className="my-6 grid md:grid-cols-2 gap-3 not-prose">
            {[
              { initials: "AM", name: "Adrian Marshall", role: "Head of GEO Strategy", bg: "linear-gradient(135deg,#00E5CC,#7C5CFF)" },
              { initials: "MO", name: "Dr. Mia Okafor", role: "Lead Research Scientist", bg: "linear-gradient(135deg,#F5A623,#FF6B6B)" },
              { initials: "TK", name: "Tomás Køhler", role: "Principal Engineer, Schema", bg: "linear-gradient(135deg,#7C5CFF,#00E5CC)" },
              { initials: "SP", name: "Saskia Patel", role: "Director, Citation Programmes", bg: "linear-gradient(135deg,#00E5CC,#F5A623)" },
            ].map((m) => (
              <div key={m.name} className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-display text-white font-semibold" style={{ background: m.bg }}>{m.initials}</div>
                <div>
                  <div className="font-display text-white text-[16px] font-medium">{m.name}</div>
                  <div className="text-ink-300 text-[13px]">{m.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="prose-dark">
            <h2 id="faq" className="anchor-top">FAQ</h2>
          </div>
          <FAQ items={[
            { q: "How is this different from an SEO agency that added GEO services?", a: "We rebuilt the entire delivery model around generative engines. Different audit methodology, different content briefs, different success metrics. The SEO agencies tacking GEO onto existing retainers are doing on-page tweaks; we're rewiring the underlying entity graph." },
            { q: "Do you have a minimum engagement length?", a: "12 months for retainers. The work compounds — six months is not long enough to see the full curve, and we'd rather decline than under-deliver." },
            { q: "Will you sign an exclusivity clause?", a: "We voluntarily do not work with direct competitors in the same vertical and geography. That's a clause we'll add to your contract on request." },
            { q: "What happens at the end of the engagement?", a: "You own everything we produce — content, schema, dashboards, playbooks. We hand off to your in-house team in the final 60 days, with documented runbooks." },
          ]} />

          <RelatedReading items={[
            { tag: "Service", title: "AI Optimisation Agency", excerpt: "Single-platform deep-dives for ChatGPT, Perplexity or Gemini.", path: "/ai-optimisation-agency/" },
            { tag: "Service", title: "AEO Agency", excerpt: "Answer Engine Optimisation across featured snippets and AIO.", path: "/aeo-agency/" },
            { tag: "Guide", title: "The 2026 GEO Field Guide", excerpt: "Our pillar guide — the full discipline, end-to-end.", path: "/generative-engine-optimisation/" },
          ]} />

          <div className="my-10">
            <AuthorCard />
          </div>
        </div>
      </div>

      <CtaBanner title="Want us to look at your category?" body="Tell us your domain and your top 3 competitors. We'll send back a free 12-page audit showing your current citation share across all 5 engines. 5-day turnaround." cta="Get your free audit" />
    </>
  );
}

Object.assign(window, { SeedPage });
