// components.jsx — Shared building blocks for GEOoptimised
// Exports to window so other Babel scripts can use them.

const { useState, useEffect, useRef, useCallback } = React;

// ─── Site config ────────────────────────────────────────────────
const NAV = [
  { label: "Services", path: "/geo-services/", group: "services" },
  { label: "Tools", path: "/geo-tools/", group: "tools" },
  { label: "Learn", path: "/generative-engine-optimisation/", group: "learn" },
  { label: "Industries", path: "/geo-by-industry/", group: "industries" },
  { label: "Contact", path: "/contact/", group: "contact" },
];

const FOOTER_GROUPS = [
  {
    title: "Services",
    links: [
      { label: "GEO Agency", path: "/geo-agency/" },
      { label: "AI Optimisation Agency", path: "/ai-optimisation-agency/" },
      { label: "AEO Agency", path: "/aeo-agency/" },
      { label: "AEO Services", path: "/aeo-services/" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Generative Engine Optimisation", path: "/generative-engine-optimisation/" },
      { label: "Answer Engine Optimisation", path: "/answer-engine-optimisation/" },
      { label: "GEO vs SEO", path: "/geo-vs-seo/" },
      { label: "AI Brand Visibility", path: "/ai-brand-visibility/" },
      { label: "GEO Strategy", path: "/geo-strategy/" },
      { label: "GEO Metrics", path: "/geo-metrics/" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Best AI Optimisation Tools", path: "/best-ai-optimisation-tools/" },
      { label: "Best AEO Platforms 2026", path: "/best-aeo-platforms-2026/" },
      { label: "Best AI Tools for GEO", path: "/best-ai-tools-geo/" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Optimise for ChatGPT", path: "/optimise-for-chatgpt/" },
      { label: "Optimise for Perplexity", path: "/optimise-for-perplexity/" },
      { label: "Knowledge Graph", path: "/knowledge-graph-optimisation/" },
      { label: "Schema Markup for AI", path: "/schema-markup-ai/" },
    ],
  },
];

// ─── Router (very small hash-based) ─────────────────────────────
function useRoute() {
  const [path, setPath] = useState(() => {
    const h = window.location.hash.replace(/^#/, "");
    return h || "/";
  });
  useEffect(() => {
    const onHash = () => setPath(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = useCallback((p) => {
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return [path, go];
}

function Link({ to, children, className = "", ...rest }) {
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <a href={"#" + to} onClick={onClick} className={className} {...rest}>{children}</a>
  );
}

// ─── Logo ───────────────────────────────────────────────────────
function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg,#00E5CC 0%,#0BB29F 100%)" }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#001a16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>
        </svg>
        <span className="absolute inset-0 rounded-lg pulse-dot" style={{ boxShadow: "0 0 0 1px rgba(0,229,204,.4)" }} />
      </span>
      <span className="font-display font-semibold text-[17px] tracking-tightish text-white">
        GEO<span className="text-ink-300 font-medium">optimised</span>
      </span>
    </Link>
  );
}

// ─── Nav ────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <header className={"fixed top-0 inset-x-0 z-40 " + (scrolled ? "nav-glass" : "")}>
      <div className="container-wide flex items-center justify-between h-[68px]">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link key={n.path} to={n.path}
              className="px-3 py-2 text-[14px] text-ink-200 hover:text-white rounded-md transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link to="/contact/" className="btn btn-ghost">Book a call</Link>
          <Link to="/contact/" className="btn btn-primary">Get AI Audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-md border hair">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"}/></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden absolute inset-x-0 top-[68px] nav-glass border-t hair-soft">
          <div className="container-wide py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.path} to={n.path} onClick={() => setOpen(false)}
                className="py-3 text-[18px] text-white border-b hair-soft font-display">
                {n.label}
              </Link>
            ))}
            <Link to="/contact/" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full justify-center">Get Free AI Audit</Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t hair mt-24 bg-ink-950">
      <div className="container-wide pt-16 pb-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 text-ink-300 text-[14px] leading-relaxed max-w-sm">
              The agency that makes brands visible in AI-generated answers. We optimise for the engines people are actually asking — ChatGPT, Perplexity, Gemini, Claude, and Google AI Overview.
            </p>
            <Newsletter />
          </div>
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_GROUPS.map((g) => (
              <div key={g.title}>
                <div className="eyebrow mb-3 !text-ink-300">{g.title}</div>
                <ul className="flex flex-col gap-2">
                  {g.links.map((l) => (
                    <li key={l.path}>
                      <Link to={l.path} className="text-[14px] text-ink-200 hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 pt-6 border-t hair-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[13px] text-ink-400">
          <div>© 2026 GEOoptimised Ltd · Registered in England & Wales</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <span className="font-mono text-ink-500">v.2026.05</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Newsletter() {
  const [v, setV] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <form className="mt-6 flex gap-2 max-w-sm"
      onSubmit={(e) => { e.preventDefault(); if (v.includes("@")) { setSent(true); setV(""); } }}>
      <input value={v} onChange={(e) => setV(e.target.value)} type="email" required
        placeholder="you@company.com" className="input flex-1 text-[14px]" />
      <button className="btn btn-primary">{sent ? "✓ Subscribed" : "Subscribe"}</button>
    </form>
  );
}

// ─── Platform badge row ─────────────────────────────────────────
const PLATFORMS = [
  { name: "ChatGPT", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4l8 4.5v7L12 20l-8-4.5v-7L12 4z"/><circle cx="12" cy="12" r="3"/></svg>
  )},
  { name: "Perplexity", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v18M3 12h18M5.5 5.5l13 13M5.5 18.5l13-13"/></svg>
  )},
  { name: "Gemini", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/></svg>
  )},
  { name: "Claude", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 4l3 16M17 4l-3 16M5 9l14 0M5 15l14 0"/></svg>
  )},
  { name: "Google AIO", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8"/><path d="M12 4v8l5 3"/></svg>
  )},
  { name: "Copilot", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 14c0-3 2.5-5 6-5h4c3.5 0 6 2 6 5s-2.5 5-6 5h-4c-3.5 0-6-2-6-5z"/><circle cx="9" cy="14" r="1.2" fill="currentColor"/><circle cx="15" cy="14" r="1.2" fill="currentColor"/></svg>
  )},
];

function PlatformRow({ compact = false, title = "We get brands cited across" }) {
  return (
    <div className={"border-y hair " + (compact ? "py-7" : "py-10")}>
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="text-[12px] font-mono uppercase tracking-widest text-ink-300 md:max-w-[200px]">
            {title}
          </div>
          <div className="flex-1 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-2">
            {PLATFORMS.map((p) => (
              <div key={p.name} className="flex items-center gap-2.5 text-ink-200 hover:text-white transition-colors px-2 py-2 rounded-md">
                <span className="w-6 h-6 inline-flex items-center justify-center text-[var(--accent)] flex-shrink-0">{p.icon}</span>
                <span className="font-display text-[15px] font-medium tracking-tightish">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Animated counter ──────────────────────────────────────────
function Counter({ to, prefix = "", suffix = "", duration = 1600, decimals = 0 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-GB");
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function StatsBar({ items }) {
  return (
    <section className="border-y hair">
      <div className="container-wide py-14 grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-10 divide-y md:divide-y-0 md:divide-x hair">
        {items.map((s, i) => (
          <div key={i} className="md:pl-10 first:md:pl-0 pt-10 first:pt-0 md:pt-0">
            <div className="font-display text-5xl md:text-6xl font-medium tracking-tighter2 text-white">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="mt-3 text-ink-300 text-[14px] leading-snug max-w-[230px]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA banner ────────────────────────────────────────────────
function CtaBanner({ title = "Ready to rank where AI looks?", body = "Get a free AI Visibility Audit. We'll show you which prompts mention your competitors, and how to get your brand cited instead.", cta = "Get your free audit", to = "/contact/" }) {
  return (
    <section className="container-wide py-16">
      <div className="relative overflow-hidden rounded-2xl border hair p-10 md:p-14">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,229,204,.18) 0%, transparent 60%)" }} />
        <div className="relative grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <div className="eyebrow mb-3">Start here</div>
            <h2 className="font-display text-3xl md:text-[42px] font-medium tracking-tighter2 text-white leading-[1.05]">{title}</h2>
            <p className="mt-4 text-ink-200 text-[16px] md:text-[17px] leading-relaxed max-w-xl">{body}</p>
          </div>
          <div className="md:col-span-4 flex md:justify-end gap-3 flex-wrap">
            <Link to={to} className="btn btn-primary text-[15px] py-3.5 px-5">{cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/generative-engine-optimisation/" className="btn btn-ghost text-[15px] py-3.5 px-5">See how GEO works</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────
function FAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t hair">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b hair">
            <button onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full text-left py-6 flex items-start justify-between gap-6 group">
              <span className="font-display text-[19px] md:text-[22px] text-white font-medium tracking-tightish leading-snug">{it.q}</span>
              <span className={"flex-shrink-0 w-7 h-7 rounded-full border hair flex items-center justify-center transition-transform " + (isOpen ? "rotate-45 border-[var(--accent)]" : "")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? "400px" : 0 }} className="overflow-hidden transition-[max-height] duration-300 ease-out">
              <div className="pb-6 text-ink-200 text-[16px] leading-relaxed max-w-3xl">{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Service / generic icon card ──────────────────────────────
function IconCard({ icon, title, body, to, tag, big = false }) {
  return (
    <Link to={to} className={"card card-hover p-7 flex flex-col gap-5 group " + (big ? "md:col-span-2" : "")}>
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-lg border hair flex items-center justify-center text-[var(--accent)] bg-ink-800">
          {icon}
        </div>
        {tag && <span className="text-[11px] font-mono uppercase tracking-widest text-ink-300">{tag}</span>}
      </div>
      <div>
        <div className="font-display text-[20px] text-white font-medium tracking-tightish">{title}</div>
        <p className="mt-2 text-[14.5px] text-ink-300 leading-relaxed">{body}</p>
      </div>
      <div className="mt-auto flex items-center gap-2 text-[var(--accent)] text-[13px] font-medium group-hover:gap-3 transition-all">
        Learn more
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </div>
    </Link>
  );
}

// ─── Breadcrumb ────────────────────────────────────────────────
function Breadcrumb({ items }) {
  return (
    <nav className="container-wide pt-28 md:pt-32">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink-300 font-mono">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-ink-500">/</span>}
            {i === items.length - 1 ? (
              <span className="text-ink-100">{it.label}</span>
            ) : (
              <Link to={it.path} className="hover:text-white">{it.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Author card ───────────────────────────────────────────────
function AuthorCard({ compact = false }) {
  return (
    <div className={"card p-6 flex items-center gap-5 " + (compact ? "" : "max-w-2xl")}>
      <div className="w-14 h-14 rounded-full flex-shrink-0" style={{
        background: "conic-gradient(from 200deg at 50% 50%, #00E5CC, #7C5CFF, #F5A623, #00E5CC)",
        padding: "2px"
      }}>
        <div className="w-full h-full rounded-full bg-ink-800 flex items-center justify-center font-display text-white font-semibold text-lg">
          AM
        </div>
      </div>
      <div className="flex-1">
        <div className="font-display text-white font-medium text-[16px]">Adrian Marshall</div>
        <div className="text-ink-300 text-[13px]">Head of GEO Strategy · Ex-Google Search Quality</div>
        <div className="mt-2 text-[13px] text-ink-200 leading-relaxed">
          15 years in organic discovery. Co-author of the AEO Field Guide. Speaks at BrightonSEO, SearchLove and DMSS.
        </div>
      </div>
    </div>
  );
}

// ─── Key takeaways box ─────────────────────────────────────────
function KeyTakeaways({ items }) {
  return (
    <aside className="card p-6 my-8" aria-label="Key takeaways">
      <div className="flex items-center gap-2 mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
        <span className="eyebrow !mb-0">Key takeaways</span>
      </div>
      <ul className="space-y-2.5 text-[15px] text-ink-100">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-mono text-[11px] flex items-center justify-center mt-0.5">{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ─── Section heading ───────────────────────────────────────────
function SectionHeading({ eyebrow, title, body, align = "left" }) {
  return (
    <div className={"mb-12 " + (align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl")}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="font-display text-3xl md:text-[44px] font-medium tracking-tighter2 text-white leading-[1.05]">{title}</h2>
      {body && <p className="mt-5 text-[17px] md:text-[18px] text-ink-200 leading-relaxed">{body}</p>}
    </div>
  );
}

// ─── Definition callout ────────────────────────────────────────
function Definition({ term, children }) {
  return (
    <div className="relative my-10">
      <div className="absolute -left-1 top-2 bottom-2 w-[2px] bg-[var(--accent)] rounded-full" />
      <div className="pl-7">
        <div className="eyebrow mb-2">Definition</div>
        <div className="font-display text-[22px] md:text-[26px] text-white tracking-tightish leading-snug">
          <span className="text-[var(--accent)]">{term}</span> {children}
        </div>
      </div>
    </div>
  );
}

// ─── Internal Link Block ──────────────────────────────────────
function RelatedReading({ items }) {
  return (
    <section className="my-14">
      <div className="eyebrow mb-4">Related reading</div>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <Link key={i} to={it.path} className="card card-hover p-5 group">
            <div className="text-[11px] font-mono uppercase tracking-widest text-ink-300">{it.tag}</div>
            <div className="mt-2 font-display text-[17px] text-white tracking-tightish leading-snug">{it.title}</div>
            <div className="mt-2 text-[13px] text-ink-300">{it.excerpt}</div>
            <div className="mt-4 flex items-center gap-2 text-[var(--accent)] text-[12px] font-medium group-hover:gap-3 transition-all">
              Read article
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Export all to window so other Babel scripts can use them.
Object.assign(window, {
  NAV, FOOTER_GROUPS, PLATFORMS,
  useRoute, Link, Logo, Nav, Footer, Newsletter,
  PlatformRow, Counter, StatsBar, CtaBanner, FAQ,
  IconCard, Breadcrumb, AuthorCard, KeyTakeaways,
  SectionHeading, Definition, RelatedReading,
});
