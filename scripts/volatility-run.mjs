#!/usr/bin/env node
/**
 * Answer-volatility harness.
 *
 * Runs a fixed, pre-registered prompt set N times against several model APIs and records which brand
 * names come back. Publishes stability (how often the same set repeats) and cross-model overlap.
 *
 * Three design decisions, all deliberate:
 *
 * 1. PRE-COMPUTED, NEVER USER-TRIGGERED. There is no public endpoint. A public tool that calls paid
 *    LLM APIs is a metered wallet exposed to the internet. This runs on a schedule, writes a JSON
 *    file, and the site renders that file as static HTML.
 *
 * 2. HARD SPEND CEILING. MAX_CALLS is enforced before any request is made. The script refuses to
 *    start if the planned call count exceeds it. Default is a dry run.
 *
 * 3. IT MEASURES APIs, NOT chatgpt.com. An API call is not the same product as the consumer chat
 *    surface: different retrieval, different system prompt, different sampling defaults. SparkToro
 *    used 600 human volunteers precisely because of this. Every figure this produces must be
 *    labelled "cross-model API disagreement", never "ChatGPT volatility". Overstating this would be
 *    the exact failure the site exists to catch.
 *
 * Usage:
 *   node scripts/volatility-run.mjs --dry-run     # plan and cost estimate only, no API calls
 *   node scripts/volatility-run.mjs --run         # executes, requires API keys in env
 *
 * Env: OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY (each optional; missing providers skipped)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MAX_CALLS = 400;          // hard ceiling per run. 6 prompts x 20 runs x 3 models = 360.
const MAX_EST_USD = 1.0;        // refuse to run if the estimate exceeds this.
const APPROX_USD_PER_CALL = 0.0015;

const args = new Set(process.argv.slice(2));
const DRY = !args.has('--run');

const cfg = JSON.parse(readFileSync(resolve(ROOT, 'data/prompts.json'), 'utf8'));

const providers = {
  openai: {
    key: () => process.env.OPENAI_API_KEY,
    async call(model, prompt) {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], max_tokens: 300 }),
      });
      if (!r.ok) throw new Error(`openai ${r.status}`);
      const j = await r.json();
      return j.choices?.[0]?.message?.content ?? '';
    },
  },
  anthropic: {
    key: () => process.env.ANTHROPIC_API_KEY,
    async call(model, prompt) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({ model, max_tokens: 300, messages: [{ role: 'user', content: prompt }] }),
      });
      if (!r.ok) throw new Error(`anthropic ${r.status}`);
      const j = await r.json();
      return j.content?.map(b => b.text ?? '').join('') ?? '';
    },
  },
  google: {
    key: () => process.env.GEMINI_API_KEY,
    async call(model, prompt) {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        },
      );
      if (!r.ok) throw new Error(`google ${r.status}`);
      const j = await r.json();
      return j.candidates?.[0]?.content?.parts?.map(p => p.text ?? '').join('') ?? '';
    },
  },
};

/** Extract candidate brand names. Deliberately crude and documented as such. */
function extractBrands(text) {
  const out = new Set();
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*(?:[-*\d.)\s]+)?\*{0,2}([A-Z][A-Za-z0-9&.'-]*(?:\s+[A-Z][A-Za-z0-9&.'-]*){0,2})\*{0,2}\s*(?:[:—-]|$)/);
    if (m && m[1] && m[1].length > 1 && m[1].length < 40) out.add(m[1].trim());
  }
  return [...out];
}

const jaccard = (a, b) => {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter(x => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : inter / union;
};

const active = cfg.models.filter(m => providers[m.provider]?.key());
const planned = cfg.prompts.length * cfg.runsPerPrompt * (DRY ? cfg.models.length : active.length);
const estUsd = planned * APPROX_USD_PER_CALL;

console.log(`prompt set v${cfg.version} | ${cfg.prompts.length} prompts x ${cfg.runsPerPrompt} runs`);
console.log(`models with keys present: ${active.length ? active.map(m => m.label).join(', ') : 'NONE'}`);
console.log(`planned calls: ${planned} | estimated cost: ~$${estUsd.toFixed(2)}`);

if (planned > MAX_CALLS) { console.error(`REFUSING: ${planned} calls exceeds MAX_CALLS=${MAX_CALLS}`); process.exit(1); }
if (estUsd > MAX_EST_USD) { console.error(`REFUSING: est $${estUsd.toFixed(2)} exceeds MAX_EST_USD=${MAX_EST_USD}`); process.exit(1); }

if (DRY) {
  console.log('\nDRY RUN. No API calls made. Re-run with --run once keys are set.');
  if (!active.length) console.log('No API keys found in env. Set OPENAI_API_KEY / ANTHROPIC_API_KEY / GEMINI_API_KEY.');
  process.exit(0);
}
if (!active.length) { console.error('No API keys present. Nothing to run.'); process.exit(1); }

const results = [];
let calls = 0;

for (const p of cfg.prompts) {
  for (const m of active) {
    const runs = [];
    for (let i = 0; i < cfg.runsPerPrompt; i++) {
      if (++calls > MAX_CALLS) { console.error('Hit MAX_CALLS mid-run. Stopping.'); break; }
      try {
        runs.push(extractBrands(await providers[m.provider].call(m.model, p.text)));
      } catch (e) {
        console.warn(`  ${p.id}/${m.model} run ${i}: ${e.message}`);
      }
    }
    // How often did two runs return the identical brand set?
    let identical = 0, pairs = 0;
    for (let i = 0; i < runs.length; i++) {
      for (let j = i + 1; j < runs.length; j++) {
        pairs++;
        if (jaccard(runs[i], runs[j]) === 1) identical++;
      }
    }
    results.push({
      promptId: p.id,
      model: m.label,
      runs: runs.length,
      identicalSetRate: pairs ? identical / pairs : null,
      meanJaccard: pairs
        ? runs.flatMap((r, i) => runs.slice(i + 1).map(s => jaccard(r, s))).reduce((a, b) => a + b, 0) / pairs
        : null,
      unionBrands: [...new Set(runs.flat())].sort(),
    });
    console.log(`  ${p.id} / ${m.label}: ${runs.length} runs, identical-set rate ${(results.at(-1).identicalSetRate * 100).toFixed(1)}%`);
  }
}

const outPath = resolve(ROOT, 'src/data/volatility.json');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({
  $comment: 'Measured against model APIs, NOT the consumer chat surfaces. Label accordingly on the site.',
  promptSetVersion: cfg.version,
  runsPerPrompt: cfg.runsPerPrompt,
  totalCalls: calls,
  results,
}, null, 2) + '\n');

console.log(`\nWrote ${outPath} after ${calls} calls (~$${(calls * APPROX_USD_PER_CALL).toFixed(2)}).`);
