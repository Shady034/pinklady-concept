import fs from 'node:fs';
import { PRODUCTS, CATEGORIES, CATEGORY_ORDER, CONCERNS, CONCERN_ORDER, INGREDIENTS, STEPS } from './taxonomy.mjs';
import { EXCLUDE, NEEDS_ART, HERO_IMAGE, CATEGORY_TONE, alt } from './art.mjs';

const raw = JSON.parse(fs.readFileSync('build/products.raw.json', 'utf8'));
const imgs = JSON.parse(fs.readFileSync('build/images.manifest.json', 'utf8'));

export const money = (n) => 'Rs ' + Math.round(n).toLocaleString('en-US');

// Live handles are keyed off Shopify and are not all usable as URLs - four
// products were uploaded untitled and carry handles like `untitled-may3_21-10`.
// Data stays keyed by the real handle; page URLs get a clean slug off the title.
const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const seenSlugs = new Set();
function uniqueSlug(title) {
  const base = slugify(title);
  let s = base, i = 2;
  while (seenSlugs.has(s)) s = `${base}-${i++}`;
  seenSlugs.add(s);
  return s;
}

export const products = raw.products.map((p) => {
  const t = PRODUCTS[p.handle];
  if (!t) throw new Error(`No taxonomy entry for handle "${p.handle}" (${p.title})`);
  const price = Number(p.variants[0].price);
  const all = (imgs[p.handle] || []).filter(Boolean);
  if (!all.length) throw new Error(`No images at all for "${p.handle}"`);
  // Every image ships. Ordering only: promote the chosen hero to the front.
  const heroAt = (HERO_IMAGE[p.handle] || 1) - 1;
  const gallery = heroAt > 0 && all[heroAt]
    ? [all[heroAt], ...all.filter((_, i) => i !== heroAt)]
    : all;
  // Three live titles are written "Anti - Acne Soap" with spaces around the
  // hyphen. Closing that gap is a typographic fix, not a rename; hyphens inside
  // words ("Vit-C", "Under-Eye") are left alone.
  const title = p.title.replace(/\s+/g, ' ').replace(/(\w) - (\w)/g, '$1-$2').trim();
  const slug = uniqueSlug(title);

  return {
    handle: p.handle,
    slug,
    title,
    price,
    priceText: money(price),
    published: p.published_at,
    url: `products/${slug}.html`,
    images: gallery.map((g, i) => ({ ...g, alt: alt({ title }, i) })),
    tone: CATEGORY_TONE[t.cat] || 'blush',
    cat: t.cat,
    catTitle: CATEGORIES[t.cat].title,
    catShort: CATEGORIES[t.cat].short,
    concerns: t.concerns || [],
    step: t.step || null,
    rank: t.rank || 9,
    badge: t.badge || null,
    size: t.size || null,
    blurb: t.blurb,
    benefits: t.benefits || [],
    ingredients: (t.ingredients || []).filter((i) => {
      if (!INGREDIENTS[i]) throw new Error(`Unknown ingredient "${i}" on ${p.handle}`);
      return true;
    }),
    howTo: t.howTo || null,
    note: t.note || null,
    warning: t.warning || null,
  };
});

if (products.length !== raw.products.length) throw new Error('product count mismatch');

const byHandle = new Map(products.map((p) => [p.handle, p]));
export const get = (h) => {
  const p = byHandle.get(h);
  if (!p) throw new Error(`get("${h}") missing`);
  return p;
};

export const byCategory = CATEGORY_ORDER.map((key) => ({
  key, ...CATEGORIES[key],
  url: `collections/${key}.html`,
  items: products.filter((p) => p.cat === key),
})).filter((c) => c.items.length);

export const byConcern = CONCERN_ORDER.map((key) => ({
  key, ...CONCERNS[key],
  url: `concerns/${key}.html`,
  items: products.filter((p) => p.concerns.includes(key)),
})).filter((c) => c.items.length);

// Ingredient index: only actives actually named against a product.
export const ingredientIndex = Object.entries(INGREDIENTS)
  .map(([name, note]) => ({
    name, note, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    items: products.filter((p) => p.ingredients.includes(name)),
  }))
  .filter((i) => i.items.length)
  .sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name));

export const routineSteps = STEPS.map((s) => ({
  ...s,
  items: products.filter((p) => p.step === s.n),
}));

export const latest = products.slice().sort((a, b) => new Date(b.published) - new Date(a.published));

// Default merchandising order. The live store's only ordering is alphabetical,
// which is why its homepage row opens with six products starting with "A".
// This round-robins across categories so the grid reads as a varied range, and
// starts with categories that have real product photography rather than the
// sets, whose only source assets had to be replaced with designed cards.
const ROTATION = ['treat', 'cleanse', 'moisturise', 'body', 'mask', 'hair', 'tone', 'lips', 'sun', 'wellness', 'sets'];
export const featured = (() => {
  const buckets = new Map(ROTATION.map((k) => [k, products.filter((p) => p.cat === k).sort((a, b) => new Date(b.published) - new Date(a.published))]));
  const out = [];
  while (out.length < products.length) {
    let moved = false;
    for (const k of ROTATION) {
      const b = buckets.get(k);
      if (b && b.length) { out.push(b.shift()); moved = true; }
    }
    if (!moved) break;
  }
  if (out.length !== products.length) throw new Error(`featured order dropped products: ${out.length}/${products.length}`);
  return out;
})();

export const priceRange = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};

// Sanity: every product must be reachable from at least one browse axis.
for (const p of products) {
  if (!p.concerns.length) throw new Error(`"${p.handle}" has no concern and would be unreachable`);
  if (!CATEGORIES[p.cat]) throw new Error(`"${p.handle}" has unknown category "${p.cat}"`);
}

export const stats = {
  products: products.length,
  categories: byCategory.length,
  concerns: byConcern.length,
  ingredients: ingredientIndex.length,
  images: products.reduce((a, p) => a + p.images.length, 0),
};
