import { readFileSync } from 'fs';
import { resolve } from 'path';

const SITE = 'https://geooptimised.com';
const KEY = 'hermes-seo-loop';
const API = 'https://api.indexnow.org/indexnow';

const sitemap = readFileSync(resolve('dist/sitemap-0.xml'), 'utf-8');
const urls = [...sitemap.matchAll(/<loc>(.+?)<\/loc>/g)].map(m => m[1]);

if (!urls.length) { console.log('No URLs found in sitemap.'); process.exit(0); }

const body = JSON.stringify({ host: 'geooptimised.com', key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls });
const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

console.log(`IndexNow: ${urls.length} URLs submitted — ${res.status} ${res.statusText}`);
urls.forEach(u => console.log(`  ${u}`));
