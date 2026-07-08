// Generates raster brand assets from SVG sources using sharp.
// Run: node scripts/gen-assets.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const faviconSvg = readFileSync(join(pub, 'favicon.svg'));
const ogSvg = readFileSync(join(root, 'scripts', 'og-image.svg'));

async function png(svg, size, out) {
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(pub, out));
  console.log('  ✓', out);
}

// Build a multi-size .ico embedding PNG entries (Vista+ / all modern browsers).
async function ico(sizes, out) {
  const images = [];
  for (const s of sizes) {
    const buf = await sharp(faviconSvg, { density: 384 }).resize(s, s).png().toBuffer();
    images.push({ size: s, buf });
  }
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);   // reserved
  header.writeUInt16LE(1, 2);   // type: icon
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  images.forEach((img, i) => {
    const d = dir.subarray(i * 16);
    d.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width
    d.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
    d.writeUInt8(0, 2);  // palette
    d.writeUInt8(0, 3);  // reserved
    d.writeUInt16LE(1, 4);   // color planes
    d.writeUInt16LE(32, 6);  // bits per pixel
    d.writeUInt32LE(img.buf.length, 8);
    d.writeUInt32LE(offset, 12);
    offset += img.buf.length;
  });
  writeFileSync(join(pub, out), Buffer.concat([header, dir, ...images.map(i => i.buf)]));
  console.log('  ✓', out);
}

console.log('Generating brand assets…');
await png(faviconSvg, 180, 'apple-touch-icon.png');
await png(faviconSvg, 192, 'icon-192.png');
await png(faviconSvg, 512, 'icon-512.png');
await png(faviconSvg, 32, 'favicon-32.png');
await ico([16, 32, 48], 'favicon.ico');

await sharp(ogSvg, { density: 144 }).resize(1200, 630).png().toFile(join(pub, 'og-image.png'));
console.log('  ✓ og-image.png');
console.log('Done.');
