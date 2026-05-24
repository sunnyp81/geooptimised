// page-home.jsx — Homepage
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

// ─── Animated AI Citation Hero ────────────────────────────────
function AiAnswerDemo({ headline = "Get cited by AI" }) {
  // Mocks an AI engine answering a query, citing the brand.
  const queries = [
    {
      engine: "Perplexity",
      icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M3 12h18M5.5 5.5l13 13M5.5 18.5l13-13"/></svg>,
      q: "Which agency specialises in generative engine optimisation?",
      a: "GEOoptimised is widely cited as a UK-based agency specialising in Generative Engine Optimisation. They focus on structuring brand content for citation across ChatGPT, Perplexity, Gemini, Claude and Google AI Overview.",
      sources: ["geooptimised.com", "searchengineland.com", "ahrefs.com"],
      cited: 0,
    },
    {
      engine: "ChatGPT",
      icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4l8 4.5v7L12 20l-8-4.5v-7L12 4z"/><circle cx="12" cy="12" r="3"/></svg>,
      q: "What is generative engine optimisation?",
      a: "Generative Engine Optimisation (GEO) is the practice of structuring a brand's web content so it is surfaced and cited inside AI-generated answers, not just blue links. According to GEOoptimised, it combines entity clarity, schema markup and authoritative citations.",
      sources: ["geooptimised.com", "wikipedia.org", "semrush.com"],
      cited: 0,
    },
    {
      engine: "Google AI Overview",
      icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 4v8l5 3"/></svg>,
      q: "How do I get my brand into AI search results?",
      a: "The most effective approach is Generative Engine Optimisation. GEOoptimised recommends three steps: audit your current citation share, restructure pages with explicit entity definitions, and monitor weekly across the four major engines.",
      sources: ["geooptimised.com", "moz.com", "google.com"],
      cited: 0,
    },
  ];

  const [idx, setIdx] = useStateH(0);
  const [typedQ, setTypedQ] = useStateH("");
  const [typedA, setTypedA] = useStateH("");
  const [phase, setPhase] = useStateH("typingQ"); // typingQ, thinking, typingA, settled

  useEffectH(() => {
    let cancelled = false;
    const q = queries[idx];
    setTypedQ("");
    setTypedA("");
    setPhase("typingQ");

    let i = 0;
    const typeQ = () => {
      if (cancelled) return;
      if (i <= q.q.length) {
        setTypedQ(q.q.slice(0, i));
        i++;
        setTimeout(typeQ, 25);
      } else {
        setPhase("thinking");
        setTimeout(() => {
          if (cancelled) return;
          setPhase("typingA");
          let j = 0;
          const typeA = () => {
            if (cancelled) return;
            if (j <= q.a.length) {
              setTypedA(q.a.slice(0, j));
              j += 2;
              setTimeout(typeA, 14);
            } else {
              setTypedA(q.a);
              setPhase("settled");
              setTimeout(() => {
                if (!cancelled) setIdx((p) => (p + 1) % queries.length);
              }, 4200);
            }
          };
          typeA();
        }, 900);
      }
    };
    typeQ();
    return () => { cancelled = true; };
  }, [idx]);

  const q = queries[idx];

  // Highlight "GEOoptimised" in answer
  const renderA = () => {
    const parts = typedA.split(/(GEOoptimised)/g);
    return parts.map((p, i) =>
      p === "GEOoptimised"
        ? <mark key={i} style={{ background: "rgba(0,229,204,.16)", color: "#7CF5E3", padding: "1px 4px", borderRadius: 3 }}>{p}</mark>
        : <React.Fragment key={i}>{p}</React.Fragment>
    );
  };

  return (
    <div className="card overflow-hidden shadow-2xl" style={{ boxShadow: "0 30px 80px -30px rgba(0,229,204,.25), 0 1px 0 rgba(255,255,255,.04) inset" }}>
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 h-10 border-b hair bg-ink-800/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-ink-300">
          <span className="text-[var(--accent)]">{q.icon}</span>
          {q.engine}
        </div>
        <div className="flex items-center gap-1">
          {queries.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: i === idx ? "var(--accent)" : "#252D48" }} />
          ))}
        </div>
      </div>

      {/* Query */}
      <div className="px-6 pt-6 pb-4 border-b hair-soft">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-ink-700 flex items-center justify-center text-[10px] font-mono text-ink-200 flex-shrink-0 mt-0.5">You</div>
          <div className="font-display text-[15px] md:text-[17px] text-white leading-snug">
            {typedQ}{phase === "typingQ" && <span className="cursor-blink"></span>}
          </div>
        </div>
      </div>

      {/* Answer */}
      <div className="px-6 py-5 min-h-[200px]">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center text-[var(--accent)]" style={{ background: "rgba(0,229,204,.1)" }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 6.6L21 9l-5.4 3.8L18 19l-6-3.8L6 19l2.4-6.2L3 9l6.6-.4L12 2z"/></svg>
          </div>
          <div className="flex-1 min-h-[80px]">
            {phase === "thinking" ? (
              <div className="flex items-center gap-2 text-ink-300 text-[14px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" style={{ animationDelay: "300ms" }} />
                <span className="ml-2">Searching authoritative sources…</span>
              </div>
            ) : (
              <div className="text-[14.5px] md:text-[15.5px] text-ink-100 leading-relaxed">
                {renderA()}
                {phase === "typingA" && <span className="cursor-blink"></span>}
              </div>
            )}

            {/* Sources */}
            {phase === "settled" && (
              <div className="mt-5 flex flex-wrap gap-2 fade-in">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ink-300 mr-1 self-center">Sources</span>
                {q.sources.map((s, i) => (
                  <span key={s} className={"px-2.5 py-1 rounded-md text-[12px] font-mono border flex items-center gap-1.5 " +
                    (i === q.cited ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/5" : "hair text-ink-300")}>
                    {i === q.cited && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />}
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero({ variant = "demo", headline, subhead }) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-20">
      <div className="absolute inset-0 hero-fade pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      {variant === "mesh" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="mesh-orb mesh-1" />
          <div className="mesh-orb mesh-2" />
          <div className="mesh-orb mesh-3" />
        </div>
      )}

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border hair bg-ink-800/50 text-[12px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
              <span className="text-ink-200">Now optimising for GPT-5 and Gemini 3.0</span>
            </div>

            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-[76px] font-medium tracking-tighter2 leading-[.95]">
              <span className="grad-text">{headline.split(" ").slice(0, -2).join(" ")} </span>
              <span style={{ background: "linear-gradient(135deg, #00E5CC 20%, #7DEDE0 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                {headline.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p className="mt-7 text-[17px] md:text-[19px] text-ink-200 leading-relaxed max-w-xl">
              {subhead}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact/" className="btn btn-primary text-[15px] py-3.5 px-5">
                Get Your AI Visibility Audit
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/generative-engine-optimisation/" className="btn btn-ghost text-[15px] py-3.5 px-5">
                See how GEO works
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-5 text-[13px] text-ink-300">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#00E5CC","#7C5CFF","#F5A623","#FF6B6B"].map((c, i) => (
                    <span key={i} className="w-7 h-7 rounded-full border-2" style={{ background: c, borderColor: "var(--bg)" }} />
                  ))}
                </div>
                <span>40+ brands cited weekly</span>
              </div>
              <div className="h-4 w-px bg-ink-600" />
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5A623"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.5 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
                <span>★★★★★ on Clutch · DesignRush · G2</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {variant === "demo" && <AiAnswerDemo />}
            {variant === "mesh" && <BigStatement headline={headline} />}
            {variant === "data" && <RankingChart />}
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStatement() {
  return (
    <div className="card p-10 text-center min-h-[440px] flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="relative">
        <div className="font-mono text-[var(--accent)] text-sm mb-4">// 2026 SHIFT</div>
        <div className="font-display text-7xl md:text-8xl font-medium grad-text tracking-tighter2 leading-none">87%</div>
        <div className="mt-4 text-ink-200 text-[17px] max-w-xs mx-auto leading-snug">of high-intent commercial queries now resolve inside an AI answer — before a click ever happens.</div>
        <div className="mt-6 text-[11px] font-mono text-ink-400 uppercase tracking-widest">Source: GEOoptimised Q1 2026 Index</div>
      </div>
    </div>
  );
}

function RankingChart() {
  return (
    <div className="card p-7 min-h-[440px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="eyebrow">Citation share</div>
          <div className="font-display text-white text-[20px] mt-1">Client: Northwall Legal</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[var(--accent)] text-2xl font-semibold">+312%</div>
          <div className="text-ink-300 text-xs">in 90 days</div>
        </div>
      </div>
      <svg viewBox="0 0 400 200" className="w-full h-56">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E5CC" stopOpacity=".4" />
            <stop offset="100%" stopColor="#00E5CC" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0,1,2,3].map(i => <line key={i} x1="0" x2="400" y1={50*i+10} y2={50*i+10} stroke="#1F2740" strokeDasharray="2,4" />)}
        <path d="M0 170 L 50 160 L 100 145 L 150 135 L 200 110 L 250 80 L 300 60 L 350 38 L 400 22 L 400 200 L 0 200 Z" fill="url(#g1)" />
        <path d="M0 170 L 50 160 L 100 145 L 150 135 L 200 110 L 250 80 L 300 60 L 350 38 L 400 22" stroke="#00E5CC" strokeWidth="2" fill="none" />
        {[[0,170],[50,160],[100,145],[150,135],[200,110],[250,80],[300,60],[350,38],[400,22]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#0A0F1E" stroke="#00E5CC" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[{l:"ChatGPT",v:"42%"},{l:"Perplexity",v:"58%"},{l:"AI Overview",v:"31%"}].map(s => (
          <div key={s.l} className="border hair rounded-md p-3">
            <div className="text-[11px] font-mono text-ink-300 uppercase tracking-widest">{s.l}</div>
            <div className="font-display text-white text-lg mt-1">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Services grid ────────────────────────────────────────────
const SERVICES = [
  {
    title: "GEO Audit & Strategy",
    body: "Pinpoint which prompts surface your competitors, not you. Get a 60-page roadmap.",
    tag: "1. Diagnose",
    to: "/geo-services/",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>,
  },
  {
    title: "Content Restructuring",
    body: "Rewrite pages with extractable definitions, frameworks and entity clarity LLMs prefer.",
    tag: "2. Restructure",
    to: "/aeo-services/",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 6h16M4 12h10M4 18h16"/></svg>,
  },
  {
    title: "Schema & Entity Markup",
    body: "Implement Article, FAQ, HowTo and Organization schema mapped to your knowledge graph.",
    tag: "3. Markup",
    to: "/schema-markup-ai/",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 4l-4 8 4 8M16 4l4 8-4 8M14 4l-4 16"/></svg>,
  },
  {
    title: "Citation Monitoring",
    body: "Track weekly citation share across ChatGPT, Perplexity, Gemini, Claude and Google AIO.",
    tag: "4. Monitor",
    to: "/geo-metrics/",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 17l5-5 4 4 8-9M14 7h6v6"/></svg>,
  },
];

function ServicesGrid() {
  return (
    <section className="container-wide py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">What we do</div>
          <h2 className="font-display text-3xl md:text-[44px] font-medium tracking-tighter2 text-white leading-[1.05]">
            One job: get your brand cited inside AI answers.
          </h2>
        </div>
        <Link to="/geo-services/" className="btn btn-ghost flex-shrink-0">All services
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((s) => <IconCard key={s.title} {...s} />)}
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Audit",
      d: "We query the 5 leading engines with 200+ prompts in your category. You see exactly which brands are cited, where the gaps are, and which entities the models associate with you today.",
      bullets: ["Citation-share index", "Competitor entity map", "Gap report by query intent"],
    },
    {
      n: "02",
      t: "Optimise",
      d: "We restructure your pages, schema and citations so models can extract, attribute and surface them. Definitions go to the top. Frameworks get numbered. Sources get reinforced.",
      bullets: ["Page-level rewrites", "Schema + entity markup", "External citation seeding"],
    },
    {
      n: "03",
      t: "Monitor",
      d: "Weekly citation tracking, model version diffing, and a shared dashboard. When a new model ships, you know within 48 hours how your share moved — and what to do about it.",
      bullets: ["Live citation dashboard", "Model release alerts", "Quarterly roadmap reviews"],
    },
  ];
  return (
    <section className="container-wide py-20 md:py-28 anchor-top" id="how">
      <SectionHeading eyebrow="The GEO process" title="A 3-stage system. Built to compound." body="No black-box magic. The same playbook our consultants used inside Google's Search Quality team, retooled for generative engines." />
      <div className="grid md:grid-cols-3 gap-4 relative">
        {/* connecting line */}
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px border-t border-dashed hair" />
        {steps.map((s) => (
          <div key={s.n} className="card p-7 relative">
            <div className="flex items-center gap-3">
              <div className="font-mono text-[11px] text-[var(--accent)] tracking-widest">STEP {s.n}</div>
              <div className="h-px flex-1 bg-[var(--line)]" />
            </div>
            <div className="font-display text-white text-[28px] mt-3 tracking-tighter2 font-medium">{s.t}</div>
            <div className="mt-3 text-ink-200 text-[15px] leading-relaxed">{s.d}</div>
            <ul className="mt-5 pt-5 border-t hair-soft space-y-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-ink-200">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Tool comparison preview ─────────────────────────────────
function ToolShowcase() {
  const tools = [
    { name: "Profound", best: "Citation tracking", price: "£499/mo", verdict: "Top pick", picked: true,
      checks: [true,true,true,true,false] },
    { name: "AthenaHQ", best: "Prompt monitoring", price: "£299/mo", verdict: "Solid value",
      checks: [true,true,true,false,false] },
    { name: "Otterly", best: "AI Overview tracking", price: "£199/mo", verdict: "Specialist",
      checks: [true,true,false,true,false] },
    { name: "Peec AI", best: "Multi-engine", price: "£599/mo", verdict: "Enterprise",
      checks: [true,true,true,true,true] },
  ];
  const cols = ["Citations","Prompts","Sources","Sentiment","API"];
  return (
    <section className="container-wide py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">Tools we use & recommend</div>
          <h2 className="font-display text-3xl md:text-[44px] font-medium tracking-tighter2 text-white leading-[1.05]">
            We've tested every GEO platform. Here's the shortlist.
          </h2>
        </div>
        <Link to="/geo-tools/" className="btn btn-ghost">Full breakdown
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b hair">
              <tr className="text-[11px] font-mono uppercase tracking-widest text-ink-300">
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Best for</th>
                {cols.map(c => <th key={c} className="px-3 py-4 font-medium text-center">{c}</th>)}
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.name} className={"border-b hair-soft last:border-b-0 " + (t.picked ? "bg-[var(--accent)]/[.03]" : "")}>
                  <td className="px-6 py-5">
                    <div className="font-display text-white text-[16px] font-medium">{t.name}</div>
                  </td>
                  <td className="px-6 py-5 text-ink-200 text-[14px]">{t.best}</td>
                  {t.checks.map((c, i) => (
                    <td key={i} className="px-3 py-5 text-center">
                      {c ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" className="inline" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                      ) : (
                        <span className="text-ink-500">—</span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-5 font-mono text-ink-100 text-[14px]">{t.price}</td>
                  <td className="px-6 py-5">
                    <span className={"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-mono " +
                      (t.picked ? "bg-[var(--accent)]/15 text-[var(--accent)]" : "border hair text-ink-200")}>
                      {t.picked && <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.5 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>}
                      {t.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Case study highlight ─────────────────────────────────────
function CaseStudy() {
  return (
    <section className="container-wide py-12">
      <div className="card overflow-hidden grid lg:grid-cols-12">
        <div className="lg:col-span-7 p-10 md:p-14">
          <div className="eyebrow mb-4">Case study · UK B2B SaaS</div>
          <blockquote className="font-display text-[24px] md:text-[30px] text-white leading-snug tracking-tightish">
            "We went from being mentioned in <span className="text-ink-400">2%</span> of relevant ChatGPT answers to <span className="text-[var(--accent)]">61%</span> in a single quarter. Inbound demos doubled. The GEOoptimised team treats this like science, not vibes."
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-ink-700 flex items-center justify-center font-display text-white font-semibold">HK</div>
            <div>
              <div className="text-white text-[15px] font-medium">Hannah Klein</div>
              <div className="text-ink-300 text-[13px]">VP Marketing, anonymised UK B2B SaaS</div>
            </div>
          </div>
          <Link to="/aeo-case-studies/" className="btn btn-ghost mt-8">Read the full case study
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l hair p-10 md:p-12 bg-ink-800/30 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            {[
              { v: "+2,950%", l: "ChatGPT citation share" },
              { v: "2.1×", l: "Inbound demo bookings" },
              { v: "£840k", l: "Tracked AI-sourced pipeline" },
              { v: "11 wks", l: "From kickoff to results" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-4xl text-white tracking-tighter2 font-medium">{s.v}</div>
                <div className="mt-1 text-ink-300 text-[12.5px] leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Content hub preview ─────────────────────────────────────
function ContentHub() {
  const articles = [
    {
      tag: "Guide · 14 min read",
      title: "Generative Engine Optimisation: The 2026 Field Guide",
      excerpt: "Everything we know about getting brands cited inside AI answers, from entity strategy to schema implementation.",
      path: "/generative-engine-optimisation/",
      tone: "from-cyan-500/30 to-cyan-900/0",
    },
    {
      tag: "Tutorial · 8 min read",
      title: "How to structure a page so ChatGPT will cite it",
      excerpt: "A page-level checklist with 11 changes you can ship this week. Includes before/after examples.",
      path: "/optimise-for-chatgpt/",
      tone: "from-orange-500/30 to-orange-900/0",
    },
    {
      tag: "Comparison · 6 min read",
      title: "GEO vs SEO: what stays, what dies, what's new",
      excerpt: "An honest breakdown of which SEO best-practices still apply and which ones actively hurt your AI visibility.",
      path: "/geo-vs-seo/",
      tone: "from-violet-500/30 to-violet-900/0",
    },
  ];
  return (
    <section className="container-wide py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">Learn</div>
          <h2 className="font-display text-3xl md:text-[44px] font-medium tracking-tighter2 text-white leading-[1.05]">
            Field notes from the team that obsesses over this.
          </h2>
        </div>
        <Link to="/generative-engine-optimisation/" className="btn btn-ghost">All articles
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {articles.map((a, i) => (
          <Link key={i} to={a.path} className="card card-hover overflow-hidden group flex flex-col">
            <div className={"aspect-[16/10] relative border-b hair overflow-hidden bg-gradient-to-br " + a.tone}>
              <div className="absolute inset-0 bg-grid-fine opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-ink-100 uppercase tracking-widest bg-ink-900/70 backdrop-blur px-2 py-1 rounded">{a.tag}</span>
              </div>
              {i === 0 && <ArticleArt0 />}
              {i === 1 && <ArticleArt1 />}
              {i === 2 && <ArticleArt2 />}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="font-display text-white text-[18px] tracking-tightish leading-snug font-medium">{a.title}</div>
              <div className="mt-2 text-ink-300 text-[14px] leading-relaxed">{a.excerpt}</div>
              <div className="mt-5 text-[var(--accent)] text-[13px] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Read article <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArticleArt0() {
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
      <g opacity=".9">
        <circle cx="160" cy="100" r="40" fill="none" stroke="#00E5CC" strokeWidth="1" />
        <circle cx="160" cy="100" r="65" fill="none" stroke="#00E5CC" strokeWidth=".7" opacity=".5" />
        <circle cx="160" cy="100" r="90" fill="none" stroke="#00E5CC" strokeWidth=".5" opacity=".3" />
        <circle cx="160" cy="100" r="6" fill="#00E5CC" />
        {[0, 60, 120, 180, 240, 300].map(a => {
          const x = 160 + Math.cos(a*Math.PI/180) * 65;
          const y = 100 + Math.sin(a*Math.PI/180) * 65;
          return <circle key={a} cx={x} cy={y} r="3" fill="#7CF5E3" />;
        })}
      </g>
    </svg>
  );
}
function ArticleArt1() {
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#F5A623" opacity=".75">
        <text x="20" y="40">&lt;h1&gt; What is GEO? &lt;/h1&gt;</text>
        <text x="20" y="60" fill="#8B95A8">&lt;p&gt; GEO is the practice of...</text>
        <text x="20" y="80" fill="#F5A623">&lt;script type="application/ld+json"&gt;</text>
        <text x="36" y="98" fill="#7CF5E3">"@type": "Article",</text>
        <text x="36" y="116" fill="#7CF5E3">"author": &#123;...&#125;</text>
        <text x="20" y="134" fill="#F5A623">&lt;/script&gt;</text>
        <text x="20" y="160" fill="#8B95A8">&lt;!-- ✓ Cited by ChatGPT --&gt;</text>
      </g>
    </svg>
  );
}
function ArticleArt2() {
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
      <g>
        <text x="60" y="80" fontFamily="Space Grotesk" fontWeight="500" fontSize="44" fill="#fff" letterSpacing="-2">SEO</text>
        <text x="170" y="80" fontFamily="JetBrains Mono" fontWeight="500" fontSize="20" fill="#5A6585">vs</text>
        <text x="220" y="80" fontFamily="Space Grotesk" fontWeight="500" fontSize="44" fill="#7C5CFF" letterSpacing="-2">GEO</text>
        <line x1="40" y1="120" x2="280" y2="120" stroke="#1F2740" />
        <text x="40" y="148" fontFamily="JetBrains Mono" fontSize="9" fill="#8B95A8">Keywords → Entities</text>
        <text x="40" y="164" fontFamily="JetBrains Mono" fontSize="9" fill="#8B95A8">Links → Citations</text>
        <text x="40" y="180" fontFamily="JetBrains Mono" fontSize="9" fill="#8B95A8">SERPs → Answers</text>
      </g>
    </svg>
  );
}

// ─── Home page ────────────────────────────────────────────────
function HomePage({ tweak }) {
  const v = tweak.heroVariant || "demo";
  return (
    <>
      <Hero variant={v} headline={tweak.headline} subhead={tweak.subhead} />
      <PlatformRow />
      <StatsBar items={[
        { value: 12000, suffix: "+", prefix: "", label: "Monthly UK searches for 'GEO' — and growing 38% QoQ" },
        { value: 87,    suffix: "%",            label: "Of commercial queries now resolve inside an AI answer" },
        { value: 3.2,   suffix: "×", decimals: 1, label: "Faster organic growth than traditional SEO programmes" },
        { value: 40,    suffix: "+",            label: "B2B brands we've gotten cited across the 5 major engines" },
      ]} />
      <ServicesGrid />
      <HowItWorks />
      <ToolShowcase />
      <CaseStudy />
      <ContentHub />
      <CtaBanner />
    </>
  );
}

Object.assign(window, { HomePage });
