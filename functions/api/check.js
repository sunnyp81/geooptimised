// Cloudflare Pages Function: GET /api/check?domain=example.com
// Server-side fetch of https://<domain>/robots.txt and /llms.txt, parsed with the exact
// methodology of the sector indices (src/lib/robots-parse.mjs). Never drifts from
// scripts/crawler-index-run.mjs because both import the same module.
//
// This is a transparency tool, not a lead magnet: no logging of domains beyond what
// Cloudflare retains at the edge by default, no storage, no email capture.

import { AGENTS, classifyState, analyseRobots } from '../../src/lib/robots-parse.mjs';

const UA = 'Mozilla/5.0 (compatible; geooptimised-ai-crawler-check/1.0; +https://geooptimised.com/ai-crawler-check/)';
const FETCH_TIMEOUT_MS = 10000;
const MAX_BYTES = 512 * 1024; // 512KB cap

// Hostname-only, no scheme/path/port/userinfo. Rejects IP literals and localhost/private hosts.
function sanitiseDomain(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let d = raw.trim().toLowerCase();
  if (d.length === 0 || d.length > 253) return null;

  // Strip a scheme and any path/query/fragment/port/userinfo the caller might have pasted in.
  d = d.replace(/^[a-z]+:\/\//, '');
  d = d.split('/')[0].split('?')[0].split('#')[0];
  d = d.split('@').pop(); // drop userinfo if present
  d = d.split(':')[0]; // drop port

  // Reject IPv4 / IPv6 literals outright, and obvious localhost/loopback names.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(d)) return null;
  if (d.includes(':')) return null; // leftover IPv6 bracket forms
  if (d === 'localhost' || d.endsWith('.localhost') || d === '0.0.0.0') return null;

  // Valid hostname: labels of letters/digits/hyphen, dot-separated, at least one dot, valid TLD.
  const hostnameRe = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;
  if (!hostnameRe.test(d)) return null;

  // Reject the private/reserved TLDs and common internal-network suffixes.
  const blockedSuffixes = ['.local', '.internal', '.test', '.invalid', '.example', '.localdomain'];
  if (blockedSuffixes.some(s => d.endsWith(s))) return null;

  return d;
}

async function fetchCapped(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let res;
    try {
      res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': UA, 'Accept': 'text/plain,text/*;q=0.9,*/*;q=0.5' },
        signal: controller.signal,
        cf: { cacheTtl: 0 },
      });
    } finally {
      clearTimeout(timer);
    }

    // Read up to MAX_BYTES only; abort the stream past the cap rather than buffering it all.
    const reader = res.body ? res.body.getReader() : null;
    let received = 0;
    const chunks = [];
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        if (received > MAX_BYTES) {
          try { await reader.cancel(); } catch {}
          break;
        }
        chunks.push(value);
      }
    }
    const body = new TextDecoder('utf-8').decode(
      chunks.length ? concatUint8(chunks) : new Uint8Array()
    );
    return {
      status: res.status,
      url: res.url || url,
      body,
      contentType: res.headers.get('content-type') || '',
      truncated: received > MAX_BYTES,
      error: null,
    };
  } catch (err) {
    return { status: 0, url, body: '', contentType: '', truncated: false, error: String(err && err.message || err) };
  }
}

function concatUint8(chunks) {
  const total = chunks.reduce((n, c) => n + c.byteLength, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) { out.set(c, offset); offset += c.byteLength; }
  return out;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Polite caching: identical domain lookups within a short window are served from cache
      // rather than re-fetched, without any per-caller rate-limit state to maintain.
      'cache-control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const rawDomain = url.searchParams.get('domain') || '';
  const domain = sanitiseDomain(rawDomain);

  if (!domain) {
    return jsonResponse({ error: 'invalid_domain', message: 'Enter a plain domain, for example example.com, with no scheme, path or port.' }, 400);
  }

  const robotsUrl = `https://${domain}/robots.txt`;
  const llmsUrl = `https://${domain}/llms.txt`;

  let [robotsRes, llmsRes] = await Promise.all([fetchCapped(robotsUrl), fetchCapped(llmsUrl)]);

  // Some sites answer only on their www host (the sector indices hit the same thing).
  // If the apex did not respond at all, retry once on www before calling it unreadable.
  if (robotsRes.status === 0 && !domain.startsWith('www.')) {
    const wwwRobots = await fetchCapped(`https://www.${domain}/robots.txt`);
    if (wwwRobots.status !== 0) {
      robotsRes = wwwRobots;
      if (llmsRes.status === 0) {
        llmsRes = await fetchCapped(`https://www.${domain}/llms.txt`);
      }
    }
  }

  const robotsState = classifyState(robotsRes.status, robotsRes.body, true);
  const robotsReadable = robotsState === 'readable';

  const llmsState = classifyState(llmsRes.status, llmsRes.body, false);
  const llmsGenuine = llmsState === 'present';

  const { crawlers, stance, note, wildcardDisallowsRoot } = analyseRobots(robotsReadable, robotsRes.body);

  const fetchedAt = new Date().toISOString();

  return jsonResponse({
    domain,
    fetchedAt,
    agentsChecked: AGENTS,
    aiSpecificStance: stance,
    aiSpecificNote: note,
    robots: {
      httpStatus: robotsRes.status,
      effectiveUrl: robotsRes.url,
      state: robotsState,
      readable: robotsReadable,
      wildcardDisallowsRoot,
      truncated: robotsRes.truncated,
      error: robotsRes.error,
    },
    llms: {
      httpStatus: llmsRes.status,
      effectiveUrl: llmsRes.url,
      state: llmsState,
      genuine: llmsGenuine,
      truncated: llmsRes.truncated,
      error: llmsRes.error,
    },
    crawlers,
  });
}

// Any method other than GET is out of scope for a read-only check.
export async function onRequestPost() {
  return jsonResponse({ error: 'method_not_allowed' }, 405);
}
