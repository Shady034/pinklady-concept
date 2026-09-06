import fs from 'node:fs';
import path from 'node:path';
import { products, byCategory, byConcern, stats, latest } from './catalog.mjs';
import { page, IMG } from './templates.mjs';
import { home } from './pages/home.mjs';
import { shop, collection, concern } from './pages/shop.mjs';
import { product } from './pages/product.mjs';
import { routine, ingredients, about, help, cartPage, checkout, notFound } from './pages/content.mjs';

const OUT = 'site';
// GitHub Pages serves a project repo from /<repo>/, so the 404 page's
// root-absolute links need that prefix baked in at build time.
// Accepts "pinklady-concept", "/pinklady-concept" or "/pinklady-concept/".
// Git Bash on Windows rewrites a leading-slash env var into a filesystem
// path, so the repo name is passed bare and normalised here.
const REPO = (process.env.SITE_ROOT || '').split(/[\/]/).filter(Boolean).pop() || '';
const ROOT = REPO ? `/${REPO}/` : '/';
const write = (rel, html) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  return html.length;
};

/* Client-side catalogue: powers search, the cart drawer and the routine
   builder. Kept to the fields those three actually read. */
const catalogJson = JSON.stringify(products.map((p) => ({
  h: p.handle,
  t: p.title,
  u: p.url,
  p: p.price,
  c: p.catTitle,
  b: p.blurb,
  s: p.step,
  r: p.rank,
  n: p.concerns,
  i: IMG + p.images[0].sm,
  k: [...p.ingredients, p.badge || '', p.catShort, ...p.concerns].filter(Boolean),
})));

let files = 0, bytes = 0;
const emitted = [];
const emit = (rel, opts) => { bytes += write(rel, page({ ...opts })); emitted.push(rel); files++; };

/* ---- static assets ---- */
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.copyFileSync('src/site.css', path.join(OUT, 'assets/site.css'));
fs.copyFileSync('src/site.js', path.join(OUT, 'assets/site.js'));
fs.writeFileSync(path.join(OUT, 'assets/catalog.js'), `window.PL_CATALOG=${catalogJson};`);
fs.writeFileSync(path.join(OUT, 'assets/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#1a0d14"/><text x="16" y="23" font-family="Georgia,serif" font-size="20" font-style="italic" fill="#ff4d8d" text-anchor="middle">P</text></svg>`);

/* ---- pages ---- */
emit('index.html', {
  body: home(), current: 'home',
  description: 'Pink Lady — 45 skincare formulas for tone, clarity and glow. Free islandwide delivery in Sri Lanka, delivered within 1–3 working days.',
});

emit('shop.html', {
  title: 'All products', current: 'shop', body: shop(),
  description: `Every Pink Lady product — ${stats.products} formulas across ${stats.categories} categories, filterable by concern and routine step.`,
});

for (const c of byCategory) {
  emit(`collections/${c.key}.html`, {
    title: c.title, base: '../', body: collection(c),
    current: c.key === 'sets' ? 'sets' : '',
    description: `${c.title} from Pink Lady — ${c.items.length} product${c.items.length === 1 ? '' : 's'}. ${c.blurb}`,
  });
}

for (const c of byConcern) {
  emit(`concerns/${c.key}.html`, {
    title: c.title, base: '../', body: concern(c),
    description: `Pink Lady products for ${c.title.toLowerCase()} — ${c.items.length} product${c.items.length === 1 ? '' : 's'}. ${c.blurb}`,
  });
}

for (const p of products) {
  emit(`products/${p.slug}.html`, {
    title: p.title, base: '../', body: product(p),
    description: `${p.title} — ${p.priceText}. ${p.blurb} Free islandwide delivery.`,
  });
}

emit('routine.html', { title: 'Build your routine', current: 'routine', body: routine(), description: 'Answer three questions and Pink Lady’s 45 products narrow to the handful that belong together, in the order they go on.' });
emit('ingredients.html', { title: 'Ingredient index', current: 'ingredients', body: ingredients(), description: 'Every active Pink Lady names across its range, what it does, and each product it appears in.' });
emit('about.html', { title: 'About', current: 'about', body: about(), description: 'Pink Lady is a Sri Lankan skincare brand — 45 formulas across face, body, hair and lips, delivered free islandwide.' });
emit('help.html', { title: 'Delivery & help', body: help(), description: 'Delivery, returns and frequently asked questions for Pink Lady.' });
emit('cart.html', { title: 'Your bag', body: cartPage(), description: 'Your Pink Lady bag.' });
emit('checkout.html', { title: 'Checkout', body: checkout(), description: 'Checkout.' });
emit('404.html', { title: 'Page not found', body: notFound(ROOT), description: 'Page not found.' });

/* ---- sitemap + robots ---- */
const urls = [
  'index.html', 'shop.html', 'routine.html', 'ingredients.html', 'about.html', 'help.html',
  ...byCategory.map((c) => c.url), ...byConcern.map((c) => c.url), ...products.map((p) => p.url),
];
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${ROOT}${u}</loc></url>`).join('\n') + `\n</urlset>\n`);
// This build republishes the client's own catalogue, so it must not compete
// with pinklady.lk in search results.
// This build republishes the client's own catalogue, so it must not compete
// with pinklady.lk in search results.
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *
Disallow: /
`);
// Stops GitHub Pages running the output through Jekyll.
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
// Stops GitHub Pages running the output through Jekyll.
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

/* ---- housekeeping ----
   Delete any .html in the output that this run did not write, so a page removed
   from the build cannot linger in the deployed site. */
const written = new Set(emitted.map((f) => path.resolve(OUT, f)));
(function sweep(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets') sweep(f); continue; }
    if (!e.name.endsWith('.html')) continue;
    if (!written.has(path.resolve(f))) {
      fs.unlinkSync(f);
      console.log('  removed stale page:', path.relative(OUT, f).split(path.sep).join('/'));
    }
  }
})(OUT);

console.log(`built ${files} pages, ${(bytes / 1024).toFixed(0)}KB of HTML`);
console.log(`  ${products.length} products · ${byCategory.length} collections · ${byConcern.length} concerns`);
