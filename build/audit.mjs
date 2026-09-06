// Static audit over every generated page: broken links, missing images,
// duplicate ids, and the accessibility basics that are cheap to check without
// a browser. Exits non-zero on any failure so it can gate a build.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'site';
const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith('.html')) pages.push(f);
  }
})(ROOT);

const problems = [];
const add = (page, kind, detail) => problems.push({ page: path.relative(ROOT, page).replace(/\\/g, '/'), kind, detail });

const attrs = (tag) => Object.fromEntries(
  [...tag.matchAll(/([a-zA-Z-]+)\s*=\s*"([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2]])
);

let checkedLinks = 0, checkedImgs = 0;

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const dir = path.dirname(page);

  // --- internal links resolve ---
  for (const m of html.matchAll(/<a\b[^>]*>/g)) {
    const a = attrs(m[0]);
    const href = a.href;
    if (!href) { add(page, 'link', '<a> with no href'); continue; }
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    checkedLinks++;
    const [file] = href.split('#')[0].split('?');
    if (!file) continue;
    // a leading "/" is root-relative to the deployed site, not to this file
    const target = file.startsWith('/')
      ? path.resolve(ROOT, '.' + file)
      : path.resolve(dir, file);
    if (!fs.existsSync(target)) add(page, 'broken-link', `${href} -> ${path.relative(ROOT, target)}`);
  }

  // --- images resolve and carry alt ---
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const a = attrs(m[0]);
    if (a.alt === undefined) add(page, 'a11y', `<img> without alt: ${a.src || '(no src)'}`);
    if (!a.src) { add(page, 'img', '<img> with no src'); continue; }
    if (/^(https?:|data:)/.test(a.src)) continue;
    checkedImgs++;
    const target = path.resolve(dir, a.src);
    if (!fs.existsSync(target)) add(page, 'missing-image', a.src);
    if (!a.width || !a.height) add(page, 'cls', `<img> without width/height: ${a.src}`);
  }

  // --- duplicate ids ---
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set(), dupes = new Set();
  for (const id of ids) (seen.has(id) ? dupes : seen).add(id);
  for (const d of dupes) add(page, 'duplicate-id', d);

  // --- aria-controls point at something ---
  for (const m of html.matchAll(/aria-controls="([^"]+)"/g)) {
    if (!ids.includes(m[1])) add(page, 'a11y', `aria-controls="${m[1]}" has no matching id`);
  }

  // --- exactly one h1 ---
  const h1s = (html.match(/<h1\b/g) || []).length;
  if (h1s !== 1) add(page, 'a11y', `${h1s} <h1> elements (expected 1)`);

  // --- buttons need an accessible name ---
  for (const m of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)) {
    const a = attrs(m[0]);
    const text = m[1].replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').trim();
    if (!text && !a['aria-label'] && !a['aria-labelledby']) {
      add(page, 'a11y', `<button> with no accessible name: ${m[0].slice(0, 80)}`);
    }
  }

  // --- lang + title + description ---
  if (!/<html[^>]+lang="/.test(html)) add(page, 'a11y', 'no lang on <html>');
  if (!/<title>[^<]+<\/title>/.test(html)) add(page, 'seo', 'no <title>');
  if (!/<meta name="description" content="[^"]+"/.test(html)) add(page, 'seo', 'no meta description');

  // --- nothing should reference the scaffolding contact sheet ---
  if (html.includes('_sheet.html')) add(page, 'build', 'references the scratch contact sheet');

  // --- template hygiene ---
  // Text already containing an entity that then passes through esc() renders
  // the entity literally to the reader.
  if (html.includes('&amp;amp;')) add(page, 'escaping', 'double-escaped entity (&amp;amp;)');
  // An unrendered ${...} means a template literal leaked into the output.
  const leak = html.match(/\$\{[^}]{0,60}\}/);
  if (leak) add(page, 'build', `unrendered template literal: ${leak[0]}`);
  if (/undefined/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    add(page, 'build', 'the string "undefined" appears in rendered markup');
  }
  if (html.includes('[object Object]')) add(page, 'build', '[object Object] in output');
}

// --- orphan check: every product page reachable from shop.html ---
const shop = fs.readFileSync(path.join(ROOT, 'shop.html'), 'utf8');
const productFiles = fs.readdirSync(path.join(ROOT, 'products')).filter((f) => f.endsWith('.html'));
for (const f of productFiles) {
  if (!shop.includes(`products/${f}`)) add('site/shop.html', 'orphan', `${f} not linked from shop`);
}

const byKind = problems.reduce((a, p) => ((a[p.kind] = (a[p.kind] || 0) + 1), a), {});
console.log(`audited ${pages.length} pages · ${checkedLinks} internal links · ${checkedImgs} images · ${productFiles.length} product pages`);
if (!problems.length) {
  console.log('PASS — no problems found');
} else {
  console.log('\nFAIL —', problems.length, 'problem(s):', byKind);
  const shown = problems.slice(0, 40);
  for (const p of shown) console.log(`  [${p.kind}] ${p.page}: ${p.detail}`);
  if (problems.length > shown.length) console.log(`  … and ${problems.length - shown.length} more`);
  process.exitCode = 1;
}
