// app.jsx — Root: router + tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#00E5CC",
  "heroVariant": "demo",
  "headline": "Get your brand cited by AI",
  "subhead": "GEOoptimised is a specialist Generative Engine Optimisation agency. We restructure your content, schema and citations so ChatGPT, Perplexity, Gemini, Claude and Google AI Overview name your brand when it matters.",
  "displayFont": "Space Grotesk",
  "density": "comfortable"
}/*EDITMODE-END*/;

// Apply accent to CSS variable
function applyAccent(hex) {
  document.documentElement.style.setProperty("--accent", hex);
  // derive RGB for glow
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  document.documentElement.style.setProperty("--accent-glow", `${r},${g},${b}`);
}

function applyFont(family) {
  document.documentElement.style.setProperty("--display-font", family);
  // Rewrite class definition by toggling body class
  document.documentElement.dataset.font = family;
  const map = {
    "Space Grotesk": '"Space Grotesk", Inter, sans-serif',
    "Inter": 'Inter, sans-serif',
    "Instrument Serif": '"Instrument Serif", Georgia, serif',
  };
  const css = `.font-display{font-family:${map[family] || map["Space Grotesk"]} !important; letter-spacing:-0.02em}`;
  let tag = document.getElementById("__font-override");
  if (!tag) { tag = document.createElement("style"); tag.id = "__font-override"; document.head.appendChild(tag); }
  tag.textContent = css;
}

// Catch-all "we haven't built this template yet" page
function StubPage({ path }) {
  const title = path.replace(/^\/|\/$/g, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Page";
  return (
    <>
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: title }]} />
      <section className="container-wide pt-8 pb-16">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">{path}</div>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tighter2 grad-text leading-[1]">
            {title}
          </h1>
          <p className="mt-5 text-[17px] text-ink-200 leading-relaxed">
            This route uses one of the production page templates (NODE, SEED, ROOT or comparison). In this design preview we've built four exemplar templates — see the links below to jump to a fully-designed equivalent.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <Link to="/" className="card card-hover p-5">
              <div className="text-[var(--accent)] text-[11px] font-mono uppercase tracking-widest">Designed template</div>
              <div className="mt-1 font-display text-white text-[17px]">Homepage</div>
            </Link>
            <Link to="/generative-engine-optimisation/" className="card card-hover p-5">
              <div className="text-[var(--accent)] text-[11px] font-mono uppercase tracking-widest">Designed template</div>
              <div className="mt-1 font-display text-white text-[17px]">ROOT pillar guide</div>
            </Link>
            <Link to="/geo-services/" className="card card-hover p-5">
              <div className="text-[var(--accent)] text-[11px] font-mono uppercase tracking-widest">Designed template</div>
              <div className="mt-1 font-display text-white text-[17px]">NODE hub page</div>
            </Link>
            <Link to="/geo-agency/" className="card card-hover p-5">
              <div className="text-[var(--accent)] text-[11px] font-mono uppercase tracking-widest">Designed template</div>
              <div className="mt-1 font-display text-white text-[17px]">SEED content page</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [path] = useRoute();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyAccent(t.accent); }, [t.accent]);
  React.useEffect(() => { applyFont(t.displayFont); }, [t.displayFont]);

  let page;
  if (path === "/" || path === "") page = <HomePage tweak={t} />;
  else if (path === "/generative-engine-optimisation/") page = <RootPage />;
  else if (path === "/geo-services/") page = <NodePage />;
  else if (path === "/geo-agency/") page = <SeedPage />;
  else if (path === "/contact/") page = <ContactPage />;
  else page = <StubPage path={path} />;

  return (
    <div data-screen-label={"GEOoptimised — " + path}>
      <Nav />
      <main key={path}>{page}</main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={["#00E5CC", "#7C5CFF", "#F5A623", "#A6FF3D"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Display font" value={t.displayFont}
          options={["Space Grotesk", "Inter", "Instrument Serif"]}
          onChange={(v) => setTweak("displayFont", v)} />

        <TweakSection label="Hero" />
        <TweakRadio label="Hero variant" value={t.heroVariant}
          options={[
            { value: "demo", label: "Demo" },
            { value: "mesh", label: "Mesh" },
            { value: "data", label: "Chart" },
          ]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakText label="Headline" value={t.headline}
          onChange={(v) => setTweak("headline", v)} />
        <TweakText label="Subhead" value={t.subhead}
          onChange={(v) => setTweak("subhead", v)} />

        <TweakSection label="Navigate" />
        <div className="flex flex-col gap-1 text-[12px]">
          {[
            ["/","Homepage"],
            ["/generative-engine-optimisation/","ROOT · GEO Guide"],
            ["/geo-services/","NODE · Services"],
            ["/geo-agency/","SEED · GEO Agency"],
            ["/contact/","Contact"],
          ].map(([p, l]) => (
            <a key={p} href={"#" + p} onClick={(e) => { e.preventDefault(); window.location.hash = p; window.scrollTo({top:0,behavior:"instant"}); }}
              style={{padding:"5px 8px",borderRadius:6,border:"1px solid rgba(0,0,0,.08)",background:"rgba(255,255,255,.5)",color:"#29261b",textDecoration:"none"}}>
              {l}
            </a>
          ))}
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
