// Shared robots.txt / llms.txt parsing and AI-stance derivation.
// Extracted from scripts/crawler-index-run.mjs so the sector indices and the
// /ai-crawler-check/ tool can never drift: both import this module, neither
// re-implements the methodology.

export const AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Bingbot', 'CCBot', 'Applebot-Extended',
];

// A body counts as a genuine robots.txt only if it plainly carries robots directives, not an HTML challenge page.
export function looksLikeRobots(body) {
  if (!body) return false;
  const head = body.slice(0, 4000);
  if (/<html[\s>]/i.test(head) || /<!doctype html/i.test(head)) return false;
  return /user-agent\s*:/i.test(body) || /disallow\s*:/i.test(body) || /allow\s*:/i.test(body) || /sitemap\s*:/i.test(body);
}

// A body counts as a genuine llms.txt only if it is plain text / markdown, not an HTML soft-404.
export function looksLikeLlmsTxt(body, contentType) {
  if (!body || body.trim().length === 0) return false;
  const head = body.slice(0, 2000);
  if (/<html[\s>]/i.test(head) || /<!doctype html/i.test(head)) return false;
  if (contentType && /text\/html/i.test(contentType)) return false;
  return true;
}

export function classifyState(status, body, isRobots) {
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

// robots.txt parsing with standard user-agent grouping (RFC 9309): consecutive User-agent lines share
// the Allow/Disallow rules that follow them until the next group.
export function parseRobots(body) {
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
export function effectiveRules(groups, token) {
  const t = token.toLowerCase();
  const exact = groups.filter(g => g.agents.includes(t));
  if (exact.length > 0) return exact.flatMap(g => g.rules);
  const wildcard = groups.filter(g => g.agents.includes('*'));
  return wildcard.flatMap(g => g.rules);
}

export function statusFor(rules) {
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
export function isNamed(groups, token) {
  const t = token.toLowerCase();
  return groups.some(g => g.agents.includes(t));
}

export function isFullyBlocked(groups, token) {
  const rules = effectiveRules(groups, token);
  if (!isNamed(groups, token)) return false; // inherited rules are never AI-specific
  const s = statusFor(rules);
  return s.status === 'blocked';
}

export function deriveAiStance(readable, groups) {
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

// Per-crawler status table for every AGENT, plus the derived stance, given a readable/parsed robots.txt.
// Returns { crawlers, stance, note, googleblocked } so callers (the collector script and the live tool)
// compute identically.
export function analyseRobots(robotsReadable, body) {
  const groups = robotsReadable ? parseRobots(body) : [];
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
  return { groups, crawlers, stance, note, wildcardDisallowsRoot };
}
