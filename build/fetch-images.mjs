import fs from 'node:fs';
import path from 'node:path';

// Pulls every product image off the live store and bakes two optimised
// renditions into site/assets/img/products.
//
// Shopify's CDN silently refuses `format=jpg` on ~28 of these files (the
// originals are HEIC or transparent PNG), returning 800KB+ PNGs. Everything is
// therefore routed through the weserv image proxy, which re-encodes reliably;
// the raw Shopify URL is kept as a fallback. Inputs are public product photos
// and the output is baked into static files, so there is no runtime dependency
// on the proxy.

const raw = JSON.parse(fs.readFileSync('build/products.raw.json', 'utf8'));
const OUT = 'site/assets/img/products';
fs.mkdirSync(OUT, { recursive: true });

const SIZES = [
  { suffix: 'sm', width: 160, q: 78 },  // routine chips, cart + search thumbs
  { suffix: 'md', width: 560, q: 80 },  // grid cards
  { suffix: 'lg', width: 1000, q: 84 }, // PDP gallery
];

const proxied = (src, w, q) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=${w}&output=jpg&q=${q}&we`;
const direct = (src, w) => {
  const u = new URL(src);
  u.searchParams.set('width', String(w));
  u.searchParams.set('format', 'jpg');
  return u.toString();
};

async function grab(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const b = Buffer.from(await r.arrayBuffer());
  if (b.length < 1200) throw new Error('too small');
  return b;
}

const jobs = [];
for (const p of raw.products) {
  p.images.forEach((im, i) => {
    for (const s of SIZES) jobs.push({ src: im.src, handle: p.handle, idx: i + 1, ...s, w: im.width, h: im.height });
  });
}

const manifest = {};
let ok = 0, viaFallback = 0, fail = 0;

async function worker(queue) {
  while (queue.length) {
    const j = queue.pop();
    let buf = null;
    try {
      buf = await grab(proxied(j.src, j.width, j.q));
      if (buf.slice(0, 2).toString('hex') !== 'ffd8') throw new Error('proxy did not return jpeg');
    } catch {
      try { buf = await grab(direct(j.src, j.width)); viaFallback++; }
      catch (e) { fail++; console.error('FAIL', j.handle, j.idx, j.suffix, e.message); continue; }
    }
    const ext = buf.slice(0, 2).toString('hex') === 'ffd8' ? 'jpg' : 'png';
    const name = `${j.handle}-${j.idx}-${j.suffix}.${ext}`;
    fs.writeFileSync(path.join(OUT, name), buf);
    (manifest[j.handle] ||= [])[j.idx - 1] ||= { ratio: +(j.w / j.h).toFixed(4) };
    manifest[j.handle][j.idx - 1][j.suffix] = name;
    ok++;
  }
}

const queue = jobs.slice();
await Promise.all(Array.from({ length: 6 }, () => worker(queue)));

fs.writeFileSync('build/images.manifest.json', JSON.stringify(manifest, null, 2));
console.log(`ok=${ok} (fallback=${viaFallback}) fail=${fail} total=${jobs.length}`);
