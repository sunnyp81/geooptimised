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

const AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Bingbot', 'CCBot', 'Applebot-Extended',
];

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

// A body counts as a genuine robots.txt only if it plainly carries robots directives, not an HTML challenge page.
function looksLikeRobots(body) {
  if (!body) return false;
  const head = body.slice(0, 4000);
  if (/<html[\s>]/i.test(head) || /<!doctype html/i.test(head)) return false;
  return /user-agent\s*:/i.test(body) || /disallow\s*:/i.test(body) || /allow\s*:/i.test(body) || /sitemap\s*:/i.test(body);
}

// A body counts as a genuine llms.txt only if it is plain text / markdown, not an HTML soft-404.
function looksLikeLlmsTxt(body, contentType) {
  if (!body || body.trim().length === 0) return false;
  const head = body.slice(0, 2000);
  if (/<html[\s>]/i.test(head) || /<!doctype html/i.test(head)) return false;
  if (contentType && /text\/html/i.test(contentType)) return false;
  return true;
}

function classifyState(status, body, isRobots) {
  if (status === 0) return 'unreachable';
  if (status === 404) return 'absent';
  if (status === 502 || status === 503 || status === 504) return 'other_status_502';
  if (status === 429 || status === 403) {
    // Only a genuine directive body redeems a 403/429 from being treated as a gate.
    const genuine = isRobots ? looksLikeRobots(body) : looksLikeLlmsTxt(body);
    if (genuine) return 'readable';
    return 'blocked_by_bot_protection';
  }
  if (status >= 200 && status < 300) {
    if (isRobots) {
      if (looksLikeRobots(body)) return 'readable';
      // 200 with an HTML body on /robots.txt is a challenge/soft page, not a policy.
      return /<html[\s>]/i.test(body.slice(0, 4000)) || /<!doctype html/i.test(body.slice(0, 4000))
        ? 'blocked_by_bot_protection'
        : (body.trim().length === 0 ? 'other_status_502' : 'readable');
    }
    return body.trim().length === 0 ? 'empty_200' : (looksLikeLlmsTxt(body) ? 'present' : 'soft404_html');
  }
  return 'unreachable';
}

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

// robots.txt parsing with standard user-agent grouping (RFC 9309): consecutive User-agent lines share
// the Allow/Disallow rules that follow them until the next group.
function parseRobots(body) {
  const lines = body.split(/\r?\n/);
  const groups = []; // { agents: [lower-cased], rules: [{type:'allow'|'disallow', path}] }
  let current = null;
  for (let raw of lines) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === 'user-agent') {
      if (!current || current.rules.length > 0) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(val.toLowerCase());
    } else if (key === 'allow' || key === 'disallow') {
      if (!current) { current = { agents: ['*'], rules: [] }; groups.push(current); }
      current.rules.push({ type: key, path: val });
    }
  }
  return groups;
}

// Find the group(s) matching a token: exact (case-insensitive) match wins; else fall back to '*'.
function effectiveRules(groups, token) {
  const t = token.toLowerCase();
  const exact = groups.filter(g => g.agents.includes(t));
  if (exact.length > 0) return exact.flatMap(g => g.rules);
  const wildcard = groups.filter(g => g.agents.includes('*'));
  return wildcard.flatMap(g => g.rules);
}

function statusFor(rules) {
  if (rules.length === 0) return { status: 'not_listed', disallow: [] };
  const disallows = rules.filter(r => r.type === 'disallow' && r.path !== '');
  const allows = rules.filter(r => r.type === 'allow');
  const rootDisallow = rules.some(r => r.type === 'disallow' && (r.path === '/' || r.path === ''));
  if (disallows.length === 0) return { status: 'allowed', disallow: [] };
  if (rootDisallow) {
    if (allows.length > 0) return { status: 'partial', disallow: disallows.map(r => r.path) };
    return { status: 'blocked', disallow: disallows.map(r => r.path) };
  }
  return { status: 'partial', disallow: disallows.map(r => r.path) };
}

// Was this token *named* at all (its own group exists), vs purely inheriting '*'?
function isNamed(groups, token) {
  const t = token.toLowerCase();
  return groups.some(g => g.agents.includes(t));
}

function isFullyBlocked(groups, token) {
  const rules = effectiveRules(groups, token);
  if (!isNamed(groups, token)) return false; // inherited rules are never AI-specific
  const s = statusFor(rules);
  return s.status === 'blocked';
}

function deriveAiStance(readable, groups) {
  if (!readable) {
    return { stance: 'indeterminate', note: 'robots.txt could not be read (bot protection or no response), so its stance is unknown.' };
  }
  const googleGroups = effectiveRules(groups, 'googlebot');
  const googleStatus = statusFor(googleGroups);
  const googleBlocked = googleStatus.status === 'blocked';

  const namedAgents = AGENTS.filter(a => isNamed(groups, a));
  if (namedAgents.length === 0) {
    return { stance: 'no_ai_specific_restriction', note: 'No AI token is named; AI crawlers inherit the same generic rules as every other unnamed crawler.' };
  }

  const strictlyBlocked = namedAgents.filter(a => isFullyBlocked(groups, a) && !googleBlocked);
  if (strictlyBlocked.length > 0) {
    return {
      stance: 'restricts_ai_specifically',
      note: `${strictlyBlocked.join(', ')} ${strictlyBlocked.length === 1 ? 'is' : 'are'} fully disallowed while Googlebot is not equally disallowed in the same file.`,
    };
  }
  return { stance: 'no_ai_specific_restriction', note: 'AI tokens named in this file carry rules identical to or more permissive than Googlebot\'s, or share a group with it.' };
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

    const groups = robotsReadable ? parseRobots(robotsRes.body) : [];
    const crawlers = {};
    for (const a of AGENTS) {
      crawlers[a] = robotsReadable
        ? statusFor(effectiveRules(groups, a))
        : { status: 'indeterminate', disallow: [] };
    }
    const { stance, note } = deriveAiStance(robotsReadable, groups);
    const wildcardGroup = groups.find(g => g.agents.includes('*'));
    const wildcardDisallowsRoot = robotsReadable && wildcardGroup
      ? wildcardGroup.rules.some(r => r.type === 'disallow' && r.path === '/')
      : (robotsReadable ? false : null);

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
