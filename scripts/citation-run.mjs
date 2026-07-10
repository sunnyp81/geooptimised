#!/usr/bin/env node
/**
 * Citation-source harness.
 *
 * Sibling of volatility-run.mjs. That script measures which BRAND NAMES a model utters from its own
 * weights, with no retrieval. This one measures which SOURCE DOMAINS an engine actually cites when it
 * does retrieve. They are different quantities and must never be conflated: four of the claims in
 * claims.json are about cited sources, and until now we had no instrument that could reproduce them.
 *
 * Design decisions, inherited deliberately from volatility-run.mjs:
 *
 * 1. PRE-COMPUTED, NEVER USER-TRIGGERED. No public endpoint. A public tool that calls paid LLM APIs is
 *    a metered wallet exposed to the internet. This runs on a schedule and writes a JSON file.
 *
 * 2. HARD SPEND CEILING. MAX_CALLS is enforced before any request is made.
 *
 * 3. REPEATED MEASUREMENT, ALWAYS. Citation output is stochastic. A single run is a sample, not a fact.
 *    Every domain is reported as a share across R runs with a 95% interval and the run count attached.
 *    We also publish the stability of each engine: the mean pairwise Jaccard overlap of the cited-domain
 *    set between runs of the same prompt. That number is the honest answer to "how much should you trust
 *    any single-run citation table", including ours.
 *
 * 4. THREE ENGINES ONLY, FOR LEGAL REASONS, NOT TECHNICAL ONES.
 *    Google's Gemini "Grounding with Google Search" terms (effective 2026-03-23) forbid
 *    "using Links to build an index" and separately forbid caching or analysing Grounded Results.
 *    Microsoft's "Grounding with Bing Search" terms (Section 4(b)(o), updated 2025-11) forbid
 *    "Copy, store, cache, archive, or create a database of Output".
 *    Collecting cited links from either, to publish aggregate statistics, is exactly what those clauses
 *    describe. The guard below is not a style preference. Do not remove it.
 *    See /the-grounding-clause/ for the verbatim quotes and primary sources.
 *
 * Usage:  node scripts/citation-run.mjs [--dry-run] [--repeats=N]
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------------------
// Constants. Every cost figure is an estimate, labelled as such wherever printed.
// ---------------------------------------------------------------------------
const MAX_CALLS = 400;
const DEFAULT_REPEATS = 20;
const CONCURRENCY = 3;
const RETRIES = 3;

const BANNED_ENGINES = ['gemini', 'google', 'bing', 'copilot', 'azure'];

const COST_PER_CALL_USD = { perplexity: 0.0070, openai: 0.0134, anthropic: 0.0140 };

const PROMPTS = [
  { id: 'geo-definition', text: 'What is generative engine optimisation and does it actually work?' },
  { id: 'ai-visibility-measure', text: 'How do you measure whether a brand is cited by AI search engines?' },
  { id: 'llms-txt', text: 'Does adding an llms.txt file help a website get cited by AI assistants?' },
  { id: 'aio-vs-rank', text: 'Do Google AI Overviews cite the same pages that rank in the organic top ten?' },
];

// Multi-part public suffixes we care about. No external dependency, by design.
const MULTI_SUFFIX = new Set([
  'co.uk', 'org.uk', 'ac.uk', 'gov.uk', 'me.uk', 'net.uk', 'sch.uk',
  'com.au', 'net.au', 'org.au', 'co.nz', 'co.za', 'com.br', 'co.jp', 'co.in', 'com.cn',
]);

// ---------------------------------------------------------------------------
function registrableDomain(rawUrl) {
  let host;
  try {
    host = new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (host.startsWith('www.')) host = host.slice(4);
  const parts = host.split('.');
  if (parts.length <= 2) return host;
  const lastTwo = parts.slice(-2).join('.');
  if (MULTI_SUFFIX.has(lastTwo)) return parts.slice(-3).join('.');
  return lastTwo;
}

function mean(xs) {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
}

function sampleStdDev(xs) {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1));
}

/** Normal approximation. Adequate at n >= 20, and we say so on the page rather than pretend otherwise. */
function ci95(xs) {
  const m = mean(xs);
  const se = xs.length ? sampleStdDev(xs) / Math.sqrt(xs.length) : 0;
  return [Math.max(0, m - 1.96 * se), Math.min(100, m + 1.96 * se)];
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size && !B.size) return 1;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

function meanPairwiseJaccard(sets) {
  if (sets.length < 2) return null;
  const vals = [];
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) vals.push(jaccard(sets[i], sets[j]));
  }
  return mean(vals);
}

// ---------------------------------------------------------------------------
// Engine adapters. Each returns the list of source URLs the engine cited.
// ---------------------------------------------------------------------------
const ENGINES = {
  perplexity: {
    model: 'sonar',
    key: 'PERPLEXITY_API_KEY',
    async call(model, prompt) {
      const r = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }] }),
      });
      if (!r.ok) throw new Error(`perplexity ${r.status}`);
      const j = await r.json();
      const fromResults = (j.search_results ?? []).map(s => s.url).filter(Boolean);
      return fromResults.length ? fromResults : (j.citations ?? []);
    },
  },

  openai: {
    model: 'gpt-5.4-mini',
    key: 'OPENAI_API_KEY',
    async call(model, prompt) {
      const r = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ model, input: prompt, tools: [{ type: 'web_search' }] }),
      });
      if (!r.ok) throw new Error(`openai ${r.status}`);
      const j = await r.json();
      const urls = [];
      for (const item of j.output ?? []) {
        for (const c of item.content ?? []) {
          for (const a of c.annotations ?? []) {
            if (a.type === 'url_citation' && a.url) urls.push(a.url);
          }
        }
      }
      return urls;
    },
  },

  anthropic: {
    model: 'claude-haiku-4-5-20251001',
    key: 'ANTHROPIC_API_KEY',
    async call(model, prompt) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }],
          tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 5 }],
        }),
      });
      if (!r.ok) throw new Error(`anthropic ${r.status}`);
      const j = await r.json();
      const urls = [];
      for (const block of j.content ?? []) {
        if (block.type === 'web_search_tool_result') {
          for (const item of block.content ?? []) if (item.url) urls.push(item.url);
        }
        for (const c of block.citations ?? []) if (c.url) urls.push(c.url);
      }
      return urls;
    },
  },
};

// ---------------------------------------------------------------------------
function assertNoForbiddenEngines(ids) {
  for (const id of ids) {
    if (BANNED_ENGINES.includes(id.toLowerCase())) {
      throw new Error(
        `Refusing to run: engine "${id}" is permanently banned. Gemini and Bing grounding terms ` +
          `forbid collecting Links to build an index or creating a database of Output. ` +
          `See /the-grounding-clause/. This guard is load-bearing, not stylistic.`,
      );
    }
  }
}

async function withRetry(fn) {
  let lastErr;
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const status = Number(String(err.message).match(/\d{3}/)?.[0] ?? 0);
      if (status && status !== 429 && status < 500) break;
      await new Promise(res => setTimeout(res, 2 ** attempt * 1000));
    }
  }
  throw lastErr;
}

async function pool(tasks, limit) {
  const results = [];
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]().catch(err => ({ __failed: true, error: String(err.message) }));
    }
  });
  await Promise.all(workers);
  return results;
}

// ---------------------------------------------------------------------------
async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes('--dry-run');
  const repeats = Number(argv.find(a => a.startsWith('--repeats='))?.split('=')[1] ?? DEFAULT_REPEATS);

  const active = Object.keys(ENGINES);
  assertNoForbiddenEngines(active);

  const available = active.filter(id => {
    const present = Boolean(process.env[ENGINES[id].key]);
    if (!present) console.warn(`  skipping ${id}: ${ENGINES[id].key} not set`);
    return present;
  });

  const plannedCalls = PROMPTS.length * repeats * (dryRun ? active.length : available.length);
  const engineList = dryRun ? active : available;

  console.log(`\nprompts: ${PROMPTS.length}, repeats: ${repeats}, engines: ${engineList.join(', ') || 'none'}`);
  let estCost = 0;
  for (const id of engineList) estCost += PROMPTS.length * repeats * COST_PER_CALL_USD[id];
  console.log(`planned API calls: ${plannedCalls} (ceiling ${MAX_CALLS})`);
  console.log(`estimated cost: $${estCost.toFixed(2)} (estimate)`);

  if (plannedCalls > MAX_CALLS) {
    throw new Error(`Refusing to run: ${plannedCalls} calls exceeds MAX_CALLS=${MAX_CALLS}.`);
  }

  const out = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    measures: 'cited source domains, not brand names',
    repeats,
    prompts: PROMPTS.map(p => p.id),
    engines: [],
  };

  if (dryRun || !available.length) {
    out.status = 'no-data';
    out.note = dryRun
      ? 'Dry run. No API calls were made and no data was invented.'
      : 'No API keys present. No API calls were made and no data was invented.';
    writeOut(out);
    console.log('\nNo network calls made. Wrote an honest empty state.\n');
    return;
  }

  let failed = 0;
  for (const id of available) {
    const eng = ENGINES[id];
    const perPromptSets = [];
    const domainRunFlags = new Map(); // domain -> array of 0/1 per run

    for (const prompt of PROMPTS) {
      const tasks = Array.from({ length: repeats }, () => () => withRetry(() => eng.call(eng.model, prompt.text)));
      const runs = await pool(tasks, CONCURRENCY);

      const runSets = [];
      for (const run of runs) {
        if (run && run.__failed) {
          failed++;
          continue; // a failed call is excluded from statistics, never substituted
        }
        const domains = [...new Set((run ?? []).map(registrableDomain).filter(Boolean))];
        runSets.push(domains);
      }
      perPromptSets.push(...(runSets.length > 1 ? [runSets] : []));

      for (const set of runSets) {
        const seen = new Set(set);
        const universe = new Set([...domainRunFlags.keys(), ...seen]);
        for (const d of universe) {
          if (!domainRunFlags.has(d)) domainRunFlags.set(d, []);
          domainRunFlags.get(d).push(seen.has(d) ? 100 : 0);
        }
      }
    }

    const stabilities = perPromptSets.map(meanPairwiseJaccard).filter(v => v !== null);

    const domains = [...domainRunFlags.entries()]
      .map(([domain, flags]) => {
        const [lo, hi] = ci95(flags);
        return {
          domain,
          sharePct: Number(mean(flags).toFixed(1)),
          stdDev: Number(sampleStdDev(flags).toFixed(1)),
          ci95Low: Number(lo.toFixed(1)),
          ci95High: Number(hi.toFixed(1)),
          runs: flags.length,
        };
      })
      .sort((a, b) => b.sharePct - a.sharePct);

    out.engines.push({
      engine: id,
      model: eng.model,
      repeats,
      stability: stabilities.length ? Number(mean(stabilities).toFixed(3)) : null,
      domains,
    });
  }

  out.failedCalls = failed;
  writeOut(out);
  console.log(`\nWrote citation data. Failed calls excluded from statistics: ${failed}\n`);
}

function writeOut(obj) {
  const path = resolve(ROOT, 'src/data/citations.json');
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(obj, null, 2) + '\n');
  console.log(`  -> ${path}`);
}

main().catch(err => {
  console.error(`\n${err.message}\n`);
  process.exit(1);
});
