#!/usr/bin/env node
// Regression test for src/lib/robots-parse.mjs, the module shared by the sector-index
// collector (scripts/crawler-index-run.mjs) and the live /ai-crawler-check/ tool.
// Runs against archived raw robots.txt bodies, so it needs no network access and no keys.
//
// Usage: node scripts/check-tool-test.mjs

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyState, analyseRobots } from '../src/lib/robots-parse.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = join(__dirname, '..', 'src', 'data', 'ai-crawler-index', 'raw');

const cases = [
  {
    label: 'fieldfisher.com (Disallow: / for ClaudeBot/GPTBot/Google-Extended/CCBot, Googlebot not equally disallowed)',
    file: 'fieldfisher.com.txt',
    expectedState: 'readable',
    expectedStance: 'restricts_ai_specifically',
  },
  {
    label: 'gowlingwlg.com (GPTBot/ClaudeBot explicitly Allow: /, same rules as Googlebot/Bingbot)',
    file: 'gowlingwlg.com.txt',
    expectedState: 'readable',
    expectedStance: 'no_ai_specific_restriction',
  },
  {
    label: 'dlapiper.com (Vercel Security Checkpoint HTML challenge served for /robots.txt)',
    file: 'dlapiper.com.txt',
    expectedState: 'blocked_by_bot_protection',
    expectedStance: 'indeterminate',
  },
];

let failures = 0;

for (const c of cases) {
  const body = readFileSync(join(RAW_DIR, c.file), 'utf8');
  const state = classifyState(200, body, true);
  const readable = state === 'readable';
  const { stance } = analyseRobots(readable, body);

  const stateOk = state === c.expectedState;
  const stanceOk = stance === c.expectedStance;
  const ok = stateOk && stanceOk;

  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.label}`);
  if (!stateOk) console.log(`      state expected ${c.expectedState}, got ${state}`);
  if (!stanceOk) console.log(`      stance expected ${c.expectedStance}, got ${stance}`);
  if (!ok) failures++;
}

if (failures > 0) {
  console.error(`\n${failures} of ${cases.length} case(s) failed.`);
  process.exit(1);
} else {
  console.log(`\nAll ${cases.length} cases passed.`);
}
