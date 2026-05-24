// page-contact.jsx — /contact/ audit request

function ContactPage() {
  const [form, setForm] = React.useState({ name: "", email: "", url: "", budget: "", focus: "geo", message: "" });
  const [sent, setSent] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = "Valid email please";
    if (!form.url.trim()) e.url = "Required";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const budgets = ["< £5k/mo", "£5–10k/mo", "£10–25k/mo", "£25k+/mo", "Project-based"];

  return (
    <>
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Contact" }]} />

      <section className="container-wide pt-8 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">Free AI Visibility Audit</div>
          <h1 className="font-display text-5xl md:text-[64px] font-medium tracking-tighter2 leading-[.98] grad-text">
            Find out how often AI cites you. Or doesn't.
          </h1>
          <p className="mt-6 text-[18px] text-ink-200 leading-relaxed max-w-2xl">
            Drop your details below. We'll run 200+ category-relevant prompts across ChatGPT, Perplexity, Gemini, Claude and Google AI Overview, and send back a 12-page report with your current citation share, gaps, and a prioritised action list. Free. 5-day turnaround. No pitch unless you ask.
          </p>
        </div>
      </section>

      <section className="container-wide pb-20">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="card p-10 text-center min-h-[480px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(0,229,204,.15)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                </div>
                <div className="font-display text-3xl text-white tracking-tighter2 font-medium">You're on the list, {form.name.split(" ")[0] || "friend"}.</div>
                <p className="mt-3 text-ink-200 max-w-md">We'll be in touch within one business day with a calendar link and the scope of your audit. In the meantime, the pillar guide is the best way to spend 14 minutes.</p>
                <Link to="/generative-engine-optimisation/" className="btn btn-ghost mt-6">Read the GEO Field Guide
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="card p-8 md:p-10 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your name" error={errors.name}>
                    <input className="input" placeholder="Jane Doe" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </Field>
                  <Field label="Work email" error={errors.email}>
                    <input className="input" type="email" placeholder="jane@company.com" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </Field>
                </div>

                <Field label="Your website URL" error={errors.url}>
                  <input className="input" placeholder="https://yourdomain.com" value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })} />
                </Field>

                <Field label="Focus">
                  <div className="grid grid-cols-3 gap-2">
                    {[["geo","Full GEO"],["aeo","AEO sprint"],["audit","Just the audit"]].map(([k, l]) => (
                      <button type="button" key={k}
                        onClick={() => setForm({ ...form, focus: k })}
                        className={"px-4 py-2.5 rounded-lg border text-[14px] transition-all " +
                          (form.focus === k ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white" : "hair text-ink-200 hover:text-white hover:border-ink-600")}>
                        {l}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Monthly budget range">
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button type="button" key={b}
                        onClick={() => setForm({ ...form, budget: b })}
                        className={"px-3.5 py-2 rounded-full border text-[13px] font-mono transition-all " +
                          (form.budget === b ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white" : "hair text-ink-200 hover:text-white hover:border-ink-600")}>
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="What are you trying to solve?" hint="The more specific, the better the audit. Mention competitors, key prompts, internal blockers.">
                  <textarea rows="4" className="input resize-none"
                    placeholder="We're losing the &quot;best vendor for X&quot; queries to a competitor in ChatGPT. We need to understand why and what to do about it."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </Field>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                  <div className="text-[12px] text-ink-300 max-w-xs leading-relaxed">By submitting, you agree to our privacy policy. We never share your data, and we delete uncontacted enquiries after 90 days.</div>
                  <button className="btn btn-primary text-[15px] py-3.5 px-5 flex-shrink-0">
                    Request my audit
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Side panel */}
          <aside className="lg:col-span-5 flex flex-col gap-4">
            <div className="card p-7">
              <div className="eyebrow mb-3">What you get</div>
              <ul className="space-y-3">
                {[
                  "Citation-share score across 5 leading AI engines",
                  "Competitor citation map — who's cited, where, in what context",
                  "Gap analysis: the 20 most valuable prompts you're missing",
                  "Entity health check + schema audit",
                  "Prioritised 30-day action list",
                  "12-page PDF report — yours to keep",
                ].map((b) => (
                  <li key={b} className="flex gap-3 text-[14.5px] text-ink-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0 mt-1" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <div className="eyebrow mb-3">Timeline</div>
              <ol className="space-y-4">
                {[
                  ["Day 0", "You submit this form."],
                  ["Day 1", "We confirm scope and send a calendar link."],
                  ["Day 2-4", "We run prompts, score citations, draft the report."],
                  ["Day 5", "30-min walkthrough call (optional). PDF delivered."],
                ].map(([d, t]) => (
                  <li key={d} className="grid grid-cols-[80px_1fr] gap-3">
                    <div className="font-mono text-[12px] text-[var(--accent)] uppercase tracking-widest pt-0.5">{d}</div>
                    <div className="text-[14px] text-ink-100">{t}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card p-7 bg-ink-800/50">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.5 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.5 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.5 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.5 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.5 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
                <span className="ml-1 text-[12px] font-mono text-ink-200">4.9 / 5 · 42 reviews</span>
              </div>
              <blockquote className="mt-3 text-ink-100 text-[15px] leading-relaxed italic">
                "The free audit alone reshuffled our roadmap. We signed a retainer the same week."
              </blockquote>
              <div className="mt-3 text-[12.5px] text-ink-300">— Marketing Director, UK fintech (Series C)</div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] font-medium text-ink-100">{label}</span>
        {error && <span className="text-[12px] text-[#FF6B6B]">{error}</span>}
      </div>
      {children}
      {hint && <div className="mt-1.5 text-[12px] text-ink-400">{hint}</div>}
    </label>
  );
}

Object.assign(window, { ContactPage });
