import { readFileSync } from 'fs';
import { resolve } from 'path';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) { console.log('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping notification.'); process.exit(0); }

const sitemap = readFileSync(resolve('dist/sitemap-0.xml'), 'utf-8');
const urls = [...sitemap.matchAll(/<loc>(.+?)<\/loc>/g)].map(m => m[1]);

const msg = `🚀 *geooptimised.com deployed*\n${urls.length} pages live\n\n${urls.map(u => `• ${u.replace('https://geooptimised.com', '')}`).join('\n')}`;

const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'Markdown' }),
});

console.log(`Telegram: ${res.status} ${res.statusText}`);
