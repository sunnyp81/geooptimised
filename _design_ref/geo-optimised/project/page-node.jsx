// page-node.jsx — /geo-services/ NODE hub page

function NodePage() {
  const services = [
    {
      title: "GEO Agency",
      tag: "Full-service",
      body: "End-to-end Generative Engine Optimisation programme. Audit, restructure, monitor.",
      to: "/geo-agency/",
      icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 12l9-9 9 9M5 10v10h14V10"/></svg>,
    },
    {
      title: "AI Optimisation Agency",
      tag: "Platform-led",
      body: "Targeted optimisation for a single AI platform — ChatGPT, Perplexity or Gemini.",
      to: "/ai-optimisation-agency/",
      icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4"/></svg>,
    },
    {
      title: "AEO Agency",
      tag: "Answer-focused",
      body: "Answer Engine Optimisation: featured snippets, AI Overviews, voice search.",
      to: "/aeo-agency/",
      icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h16v12H8l-4 4V4z"/></svg>,
    },
    {
      title: "AEO Services",
      tag: "Modular",
      body: "Standalone AEO sprints: schema implementation, content restructuring, citation seeding.",
      to: "/aeo-services/",
      icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    },
  ];

  return (
    <>
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/geo-services/" },
      ]} />

      <section className="container-wide pt-8 pb-14 relative">
        <div className="absolute inset-0 hero-fade pointer-events-none opacity-60" />
        <div className="relative grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">GEO Services Hub</div>
            <h1 className="font-display text-5xl md:text-[68px] font-medium tracking-tighter2 leading-[.98] grad-text">
              Generative Engine Optimisation services, built for AI-first discovery.
            </h1>
            <p className="mt-6 text-[18px] text-ink-200 leading-relaxed max-w-2xl">
              Four engagement models — from full-service GEO retainers to standalone schema sprints. Pick the one that matches your team's bandwidth and risk profile. Every engagement ships against a defined milestone schedule.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact/" className="btn btn-primary">Request a proposal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/generative-engine-optimisation/" className="btn btn-ghost">Read the pillar guide</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="card p-6">
              <div className="eyebrow mb-3">At a glance</div>
              <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                {[
                  { v: "4-6 wks", l: "Time to first citation lift" },
                  { v: "£6.5k+", l: "Starting monthly retainer" },
                  { v: "5 engines", l: "ChatGPT · Perplexity · Gemini · Claude · AIO" },
                  { v: "40+", l: "B2B brands optimised to date" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-white text-2xl tracking-tighter2 font-medium">{s.v}</div>
                    <div className="mt-1 text-ink-300 text-[12.5px] leading-snug">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide py-10">
        <SectionHeading eyebrow="Engagement models" title="Pick the shape of engagement that fits." body="Most clients start with a one-off audit, then graduate to a full retainer once they see the ceiling on citation share they're missing." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => <IconCard key={s.title} {...s} />)}
        </div>
      </section>

      {/* Overview text */}
      <section className="container-wide py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="eyebrow mb-4">What this covers</div>
            <h2 className="font-display text-3xl md:text-[36px] font-medium tracking-tighter2 text-white leading-tight">
              Same playbook. Different scope.
            </h2>
          </div>
          <div className="md:col-span-7 prose-dark">
            <p>
              Every engagement on this page draws from the same underlying methodology — the 7-step GEO framework we've refined across 40+ B2B and DTC client programmes. What varies is scope, depth and team commitment.
            </p>
            <p>
              <strong>Full-service retainers</strong> are for brands where AI visibility is a category-defining priority. We embed with marketing, run the full diagnostic, restructure content at the page level, and manage the weekly monitoring loop end-to-end.
            </p>
            <p>
              <strong>Modular sprints</strong> are for in-house teams who already own content and just need a specialist hand on schema, citation seeding or a single platform. Three- to six-week engagements, fixed scope, fixed fee.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="container-wide py-10">
        <SectionHeading eyebrow="Compare engagements" title="What's included at each tier." />
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-[14px] min-w-[700px]">
            <thead className="border-b hair">
              <tr className="text-[11px] font-mono uppercase tracking-widest text-ink-300">
                <th className="px-5 py-4 font-medium">Included</th>
                {["AEO Services","AEO Agency","AI Opt. Agency","GEO Agency"].map((t,i) => (
                  <th key={t} className={"px-5 py-4 font-medium text-center " + (i === 3 ? "text-[var(--accent)]" : "")}>{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Citation share audit",      [false,true,true,true]],
                ["Content restructuring",     [true,true,true,true]],
                ["Schema implementation",     [true,true,true,true]],
                ["External citation seeding", [false,false,true,true]],
                ["Per-platform tuning",       [false,false,true,true]],
                ["Weekly monitoring dashboard",[false,false,false,true]],
                ["Quarterly executive review",[false,false,false,true]],
                ["Model-release alerts (24h)",[false,false,false,true]],
              ].map((row) => (
                <tr key={row[0]} className="border-b hair-soft last:border-b-0">
                  <td className="px-5 py-4 text-ink-100">{row[0]}</td>
                  {row[1].map((on, i) => (
                    <td key={i} className="px-5 py-4 text-center">
                      {on ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" className="inline" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                      ) : <span className="text-ink-500">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-5 py-5 text-ink-300 text-[12.5px] font-mono uppercase tracking-widest">From</td>
                {["£2.5k","£4.2k/mo","£5.8k/mo","£6.5k/mo"].map((p,i) => (
                  <td key={i} className={"px-5 py-5 text-center font-display " + (i === 3 ? "text-[var(--accent)] text-lg" : "text-white")}>{p}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-wide py-16">
        <SectionHeading eyebrow="FAQ" title="Common questions about GEO services." />
        <FAQ items={[
          { q: "What's the difference between GEO and AEO services?", a: "GEO is the broader practice — getting cited inside any AI-generated answer. AEO historically meant featured snippets and voice answers. Today the techniques overlap to the point where we run them as one discipline. We use the term that matches the client's existing vocabulary." },
          { q: "Do I need both SEO and GEO?", a: "Yes, for now. SEO still drives brand and navigational traffic. GEO captures commercial intent that increasingly resolves inside AI answers. Most of our clients run them in parallel with a single content team." },
          { q: "What's your typical engagement length?", a: "Modular sprints: 3-6 weeks. Retainer programmes: 12-month minimum with quarterly reviews. We do not offer month-to-month full-service engagements — the work compounds over quarters, not weeks." },
          { q: "Which industries do you specialise in?", a: "B2B SaaS, professional services (law, accounting, consulting), and high-consideration DTC. We don't work in YMYL categories where we can't certify accuracy (medical, financial advice)." },
          { q: "Can you work with our existing SEO agency?", a: "Yes — about 30% of our retainers are alongside an incumbent SEO partner. We define a clean RACI, share dashboards, and meet weekly. No turf wars." },
        ]} />
      </section>

      <CtaBanner title="Not sure which engagement fits?" body="20-minute scoping call. We'll look at your category, your competitors, and your in-house bandwidth, then recommend a starting point. No pitch." cta="Book a scoping call" />

      <section className="container-wide py-10">
        <div className="eyebrow mb-4">Related hubs</div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { tag: "Tools", title: "Best GEO platforms 2026", excerpt: "Profound, AthenaHQ, Otterly, Peec — full comparison with verdicts.", path: "/geo-tools/" },
            { tag: "Strategy", title: "GEO strategy playbook", excerpt: "Phased plans for SMB, scale-up and enterprise programmes.", path: "/geo-strategy/" },
            { tag: "Verticals", title: "GEO by industry", excerpt: "Tactical guides for law firms, e-commerce and B2B.", path: "/geo-by-industry/" },
          ].map((it) => (
            <Link key={it.path} to={it.path} className="card card-hover p-6 group">
              <div className="text-[11px] font-mono uppercase tracking-widest text-ink-300">{it.tag}</div>
              <div className="mt-2 font-display text-[19px] text-white tracking-tightish font-medium">{it.title}</div>
              <div className="mt-2 text-[14px] text-ink-300 leading-relaxed">{it.excerpt}</div>
              <div className="mt-5 text-[var(--accent)] text-[13px] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-wide py-10">
        <AuthorCard />
      </section>
    </>
  );
}

Object.assign(window, { NodePage });
