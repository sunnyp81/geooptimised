#!/usr/bin/env node
// Generalised AI-crawler-access collector, extracted from the UK law firms methodology.
// Usage: node scripts/crawler-index-run.mjs <input.json> <output.json> <rawDir> --study "..." --source '{"publisher":...}'
//
// input.json: [{ "rank": 1, "firm": "Name", "domain": "example.com" }, ...]
// Output matches src/data/ai-crawler-index.json's schema exactly, including
// aiSpecificStance derived the same way (RFC 9309 grouping, Googlebot benchmark, conservative on ambiguity).

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AGENTS, classifyState, analyseRobots } from '../src/lib/robots-parse.mjs';

const args = process.argv.slice(2);
const inputPath = args[0];
const outputPath = args[1];
const rawDir = args[2];
const studyIdx = args.indexOf('--study');
const study = studyIdx > -1 ? args[studyIdx + 1] : 'AI Crawler Access Index';
const sourceIdx = args.indexOf('--source');
const firmListSource = sourceIdx > -1 ? JSON.parse(args[sourceIdx + 1]) : null;

if (!inputPath || !outputPath || !rawDir || !firmListSource) {
  console.error('Usage: node crawler-index-run.mjs <input.json> <output.json> <rawDir> --study "..." --source \'{"publisher":...}\'');
  process.exit(1);
}

const input = JSON.parse(await import('node:fs').then(fs => fs.promises.readFile(inputPath, 'utf8')));

if (!existsSync(rawDir)) mkdirSync(rawDir, { recursive: true });

const UA = 'Mozilla/5.0 (compatible; geooptimised-crawler-index/1.0; +https://geooptimised.com/uk-law-firms-ai-crawler-index/)';

async function fetchOne(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': UA, 'Accept': 'text/plain,text/*;q=0.9,*/*;q=0.5' },
      signal: AbortSignal.timeout(15000),
    });
    const body = await res.text();
    return { status: res.status, url: res.url || url, body, contentType: res.headers.get('content-type') || '', error: null };
  } catch (err) {
    return { status: 0, url, body: '', contentType: '', error: String(err && err.message || err) };
  }
}

function safeName(domain) { return domain.replace(/[^a-z0-9.-]/gi, '_'); }
// Relative raw-folder label used inside rawFile, e.g. "raw-fintech" from ".../ai-crawler-index/raw-fintech".
const rawLabel = rawDir.replace(/\\/g, '/').split('/').pop();

const records = [];
const fetchedOn = new Date().toISOString().slice(0, 10);

let i = 0;
const CONCURRENCY = 6;
async function worker() {
  while (i < input.length) {
    const idx = i++;
    const item = input[idx];
    const { rank, firm, domain } = item;
    const robotsUrl = `https://${domain}/robots.txt`;
    const llmsUrl = `https://${domain}/llms.txt`;
    const [robotsRes, llmsRes] = await Promise.all([fetchOne(robotsUrl), fetchOne(llmsUrl)]);

    const robotsState = classifyState(robotsRes.status, robotsRes.body, true);
    const robotsReadable = robotsState === 'readable';
    const robotsFile = join(rawDir, `${safeName(domain)}.txt`);
    writeFileSync(robotsFile, robotsRes.body || '');

    const llmsState = classifyState(llmsRes.status, llmsRes.body, false);
    const llmsGenuine = llmsState === 'present';
    const llmsFile = join(rawDir, `${safeName(domain)}.llms.txt`);
    writeFileSync(llmsFile, llmsRes.body || '');

    const { crawlers, stance, note, wildcardDisallowsRoot } = analyseRobots(robotsReadable, robotsRes.body);

    records.push({
      rank, firm, domain,
      aiSpecificStance: stance,
      aiSpecificNote: note,
      robots: {
        httpStatus: robotsRes.status,
        effectiveUrl: robotsRes.url,
        state: robotsState,
        readable: robotsReadable,
        wildcardDisallowsRoot,
        fetchedAt: new Date().toISOString(),
        rawFile: `${rawLabel}/${safeName(domain)}.txt`,
        error: robotsRes.error,
      },
      llms: {
        httpStatus: llmsRes.status,
        effectiveUrl: llmsRes.url,
        state: llmsState,
        genuine: llmsGenuine,
        fetchedAt: new Date().toISOString(),
        rawFile: `${rawLabel}/${safeName(domain)}.llms.txt`,
        error: llmsRes.error,
      },
      crawlers,
    });
    process.stderr.write(`[${rank}] ${firm} (${domain}) -> robots:${robotsState} llms:${llmsState} stance:${stance}\n`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
records.sort((a, b) => a.rank - b.rank);

const output = {
  $comment: "AI Crawler Access Index. Each record is one firm's robots.txt and llms.txt as WE fetched them. 'state' records whether the file was genuinely readable or was gated by bot protection / returned a soft-404. Per-crawler 'status' describes the file's syntax shape only: 'not_listed' means the token does not appear (NOT a block); 'partial' means named with path-level or allowlist rules (NOT a judgement that the firm restricts AI); 'indeterminate' means we could not read the file. 'aiSpecificStance' is the derived judgement: 'restricts_ai_specifically' only when an AI token's effective directives (RFC 9309 grouping, most specific match wins) are clearly stricter than the same file's effective directives for Googlebot; restriction inherited from 'User-agent: *' or shared with Googlebot's own group is never AI-specific. robots.txt is a request, not enforcement.",
  study,
  firmListSource,
  agentsChecked: AGENTS,
  fetchedOn,
  method: `For each firm's primary domain we fetched https://<domain>/robots.txt and https://<domain>/llms.txt ourselves, following redirects, and saved every raw response verbatim under raw-*/. robots.txt was parsed with standard user-agent grouping. A response was only parsed for directives when its body was a genuine robots.txt; HTML bot-challenge pages (Vercel, Cloudflare, Azure WAF, Incapsula) returning 200/403/429 were recorded as unreadable, never parsed.`,
  records,
};

writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
console.error(`\nWrote ${records.length} records to ${outputPath}`);
