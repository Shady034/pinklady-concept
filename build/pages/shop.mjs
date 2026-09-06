import { byCategory, byConcern, products, featured, stats } from '../catalog.mjs';
import { card, esc, ICON } from '../templates.mjs';

function filterBar(base) {
  return `<div class="filters">
    <div class="wrap">
      <div class="filters__bar" role="group" aria-label="Filter by category">
        <span class="filters__label" aria-hidden="true">Category</span>
        <button class="fchip" type="button" data-filter="cat:all" aria-pressed="true">All<span class="fchip__n num">${stats.products}</span></button>
        <span class="filters__sep" aria-hidden="true"></span>
        ${byCategory.map((c) => `<button class="fchip" type="button" data-filter="cat:${c.key}" aria-pressed="false">${esc(c.short)}<span class="fchip__n num">${c.items.length}</span></button>`).join('')}
      </div>
      <div class="filters__bar" style="border-top:1px solid var(--rule-soft)" role="group" aria-label="Filter by concern">
        <span class="filters__label" aria-hidden="true">Concern</span>
        ${byConcern.map((c) => `<button class="fchip" type="button" data-filter="concern:${c.key}" aria-pressed="false">${esc(c.short)}<span class="fchip__n num">${c.items.length}</span></button>`).join('')}
      </div>
      <div class="filters__bar" style="border-top:1px solid var(--rule-soft);justify-content:space-between">
        <span class="result-count num" data-result-count>${stats.products} products</span>
        <label style="display:flex;align-items:center;gap:.5rem;flex:none">
          <span class="micro muted">Sort</span>
          <select class="select" data-sort aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="az">A – Z</option>
          </select>
        </label>
      </div>
    </div>
  </div>`;
}

export function shop() {
  const ordered = featured;
  return `
<section class="pagehead">
  <div class="wrap">
    <p class="micro">The range</p>
    <h1 class="display d-lg">All products</h1>
    <p class="lede">
      ${stats.products} formulas across ${stats.categories} categories.
      Filter by what you are treating, or by where it sits in your routine.
    </p>
  </div>
</section>

${filterBar('')}

<section class="section-sm" data-shop>
  <div class="wrap">
    <div class="grid-p" data-grid>
      ${ordered.map((p, i) => card(p, '', { index: i, eager: i < 4 })).join('')}
    </div>
    <div class="empty" data-shop-empty hidden>
      <p class="display d-sm">Nothing matches those filters</p>
      <p class="small muted">Try clearing one of them.</p>
    </div>
  </div>
</section>`;
}

export function collection(c) {
  const others = byCategory.filter((x) => x.key !== c.key);
  return `
<section class="pagehead">
  <div class="wrap">
    <p class="micro"><a href="../shop.html">All products</a> · Category</p>
    <h1 class="display d-lg">${esc(c.title)}</h1>
    <p class="lede">${esc(c.blurb)}</p>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="rule-row" style="margin-bottom:2rem">
      <span class="rule-row__n num">${String(c.items.length).padStart(2, '0')}</span>
      <p class="micro">${c.items.length === 1 ? 'Product' : 'Products'}</p>
    </div>
    <div class="grid-p">
      ${c.items.map((p, i) => card(p, '../', { index: i, eager: i < 4 })).join('')}
    </div>
  </div>
</section>

<section class="section-sm on-bone2">
  <div class="wrap">
    <p class="micro muted" style="margin-bottom:1rem">Other categories</p>
    <div style="display:flex;flex-wrap:wrap;gap:.6rem">
      ${others.map((x) => `<a class="chip-link" href="${x.key}.html">${esc(x.title)} <span class="muted num" style="font-size:.72rem">${x.items.length}</span></a>`).join('')}
    </div>
  </div>
</section>`;
}

export function concern(c) {
  const others = byConcern.filter((x) => x.key !== c.key);
  const steps = [1, 2, 3, 4, 5]
    .map((n) => ({ n, items: c.items.filter((p) => p.step === n) }))
    .filter((s) => s.items.length);
  const labels = { 1: 'Cleanse', 2: 'Tone', 3: 'Treat', 4: 'Moisturise', 5: 'Protect' };

  return `
<section class="pagehead">
  <div class="wrap">
    <p class="micro"><a href="../shop.html">All products</a> · Concern</p>
    <h1 class="display d-lg">${esc(c.title)}</h1>
    <p class="lede">${esc(c.blurb)}</p>
  </div>
</section>

${steps.length > 1 ? `
<section class="section-sm on-blush">
  <div class="wrap">
    <p class="micro" style="color:var(--pink);margin-bottom:1.25rem">A routine for this concern</p>
    <div class="ladder">
      ${steps.map((s) => `
        <div class="ladder__row" style="border-top-color:rgba(26,13,20,.12)">
          <div class="ladder__n num">0${s.n}</div>
          <div class="ladder__t">${labels[s.n]}</div>
          <div class="ladder__items">
            ${s.items.map((p) => `<a class="chip-link" href="../${p.url}">${esc(p.title)}</a>`).join('')}
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>` : ''}

<section class="section-sm">
  <div class="wrap">
    <div class="rule-row" style="margin-bottom:2rem">
      <span class="rule-row__n num">${String(c.items.length).padStart(2, '0')}</span>
      <p class="micro">Everything for ${esc(c.short.toLowerCase())}</p>
    </div>
    <div class="grid-p">
      ${c.items.map((p, i) => card(p, '../', { index: i, eager: i < 4 })).join('')}
    </div>
  </div>
</section>

<section class="section-sm on-bone2">
  <div class="wrap">
    <p class="micro muted" style="margin-bottom:1rem">Other concerns</p>
    <div style="display:flex;flex-wrap:wrap;gap:.6rem">
      ${others.map((x) => `<a class="chip-link" href="${x.key}.html">${esc(x.title)} <span class="muted num" style="font-size:.72rem">${x.items.length}</span></a>`).join('')}
    </div>
  </div>
</section>`;
}
