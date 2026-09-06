import { products, byCategory, byConcern, routineSteps } from '../catalog.mjs';
import { INGREDIENTS, CONCERNS, CATEGORIES } from '../taxonomy.mjs';
import { card, esc, IMG, BRAND, ICON } from '../templates.mjs';

const labels = { 1: 'Cleanse', 2: 'Tone', 3: 'Treat', 4: 'Moisturise', 5: 'Protect' };

function acc(id, title, inner, open = false) {
  return `<div class="acc">
    <button class="acc__btn" type="button" data-disclose aria-expanded="${open}" aria-controls="${id}">
      ${esc(title)} ${ICON.plus}
    </button>
    <div class="acc__panel" id="${id}" data-open="${open}"><div>${inner}</div></div>
  </div>`;
}

export function product(p) {
  const base = '../';
  const cat = byCategory.find((c) => c.key === p.cat);

  // "You might also need" — same concern, different routine step, so the
  // recommendation completes a routine instead of offering a near-duplicate.
  const related = products
    .filter((x) => x.handle !== p.handle && x.concerns.some((c) => p.concerns.includes(c)))
    .sort((a, b) => {
      const as = a.step && a.step !== p.step ? 0 : 1;
      const bs = b.step && b.step !== p.step ? 0 : 1;
      if (as !== bs) return as - bs;
      return a.price - b.price;
    })
    .slice(0, 4);

  const hero = p.images[0];
  const gallery = `<div class="gal" data-gallery>
         <div class="gal__main">
           <img src="${base}${IMG}${hero.lg}" alt="${esc(hero.alt)}" width="940" height="1175"
                fetchpriority="high" decoding="async" data-gallery-main>
         </div>
         ${p.images.length > 1 ? `<div class="gal__thumbs">
           ${p.images.map((im, i) => `
             <button class="gal__thumb" type="button" data-gallery-thumb
                     data-full="${base}${IMG}${im.lg}" data-alt="${esc(im.alt)}"
                     aria-current="${i === 0}" aria-label="View image ${i + 1}">
               <img src="${base}${IMG}${im.sm}" alt="" width="78" height="78" loading="lazy">
             </button>`).join('')}
         </div>` : ''}
       </div>`;

  const ingredientBlock = p.ingredients.length
    ? acc('a-ing', 'Key ingredients', `<ul class="ing-list">
        ${p.ingredients.map((n) => `<li><b>${esc(n)}</b><span>${esc(INGREDIENTS[n])}</span></li>`).join('')}
      </ul>
      <p style="padding-bottom:1.15rem"><a class="ulink" href="${base}ingredients.html">Full ingredient index ${ICON.arrow}</a></p>`)
    : '';

  const howToBlock = p.howTo
    ? acc('a-how', 'How to use', `<p>${esc(p.howTo)}</p>`)
    : (p.step ? acc('a-how', 'How to use', `<p>Step ${p.step} of the routine — ${esc(labels[p.step].toLowerCase())}.
        ${p.step === 5 ? 'Apply every morning as the final step, before makeup.' : 'Apply in routine order, after the step before it.'}</p>
        <p><a class="ulink" href="${base}routine.html">Build a full routine ${ICON.arrow}</a></p>`) : '');

  return `
<section class="section-sm">
  <div class="wrap">
    <div class="pdp">
      <div>${gallery}</div>

      <div class="buy">
        <nav class="buy__crumb" aria-label="Breadcrumb">
          <a href="${base}index.html">Home</a> ·
          <a href="${base}shop.html">Shop</a> ·
          <a href="${base}${cat.url}">${esc(cat.title)}</a>
        </nav>

        ${p.badge ? `<span class="tag tag--pink">${esc(p.badge)}</span>` : ''}
        <h1 class="display d-md">${esc(p.title)}</h1>
        <p class="lede" style="font-size:1.02rem">${esc(p.blurb)}</p>

        <div class="buy__price">
          <b class="num">${p.priceText}</b>
          ${p.size ? `<span class="small muted">${esc(p.size)}</span>` : ''}
        </div>

        <div class="buy__actions">
          <div class="qty" data-qty-input>
            <button type="button" data-step="-1" aria-label="Decrease quantity">${ICON.minus}</button>
            <input id="qty-${p.slug}" type="number" value="1" min="1" max="99" aria-label="Quantity">
            <button type="button" data-step="1" aria-label="Increase quantity">${ICON.plus}</button>
          </div>
          <button class="btn btn--pink btn--block" type="button" data-add="${p.handle}" data-qty-from="#qty-${p.slug}">
            Add to bag · ${p.priceText}
          </button>
        </div>

        <p class="small muted" style="display:flex;align-items:center;gap:.5rem;margin-bottom:1.5rem">
          <span style="color:var(--pink);display:inline-flex;width:14px">${ICON.check}</span>
          ${esc(BRAND.delivery)} · ${esc(BRAND.deliveryDetail)}
        </p>

        ${p.benefits.length ? `<ul class="benefits">
          ${p.benefits.map((b) => `<li>${ICON.check}<span>${esc(b)}</span></li>`).join('')}
        </ul>` : ''}

        ${p.warning ? `<p class="note note--warn">${ICON.info}<span>${esc(p.warning)}</span></p>` : ''}
        ${p.note ? `<p class="note">${ICON.info}<span>${esc(p.note)}</span></p>` : ''}

        <div style="margin-top:1.5rem">
          ${ingredientBlock}
          ${howToBlock}
          ${acc('a-ship', 'Delivery & returns', `
            <ul>
              <li>${esc(BRAND.delivery)} — no minimum spend.</li>
              <li>${esc(BRAND.deliveryDetail)}.</li>
              <li>Questions before you order? WhatsApp ${esc(BRAND.whatsapp)}.</li>
            </ul>
            <p><a class="ulink" href="${base}help.html">Full delivery information ${ICON.arrow}</a></p>`)}
          <div class="acc" style="border-bottom:1px solid var(--rule)"></div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.5rem">
          ${p.concerns.map((c) => `<a class="tag" href="${base}concerns/${c}.html">${esc(CONCERNS[c].title)}</a>`).join('')}
          ${p.step ? `<span class="tag tag--pink">Step ${p.step} · ${labels[p.step]}</span>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

${p.step ? `
<section class="section-sm on-blush">
  <div class="wrap">
    <p class="micro" style="color:var(--pink);margin-bottom:1.25rem">Where this sits in the routine</p>
    <div class="ladder">
      ${routineSteps.map((s) => `
        <div class="ladder__row" style="border-top-color:rgba(26,13,20,.12);${s.n === p.step ? '' : 'opacity:.5'}">
          <div class="ladder__n num">0${s.n}</div>
          <div class="ladder__t">${esc(s.label)}<span>${esc(s.note)}</span></div>
          <div class="ladder__items">
            ${s.n === p.step
              ? `<span class="chip-link" style="border-color:var(--pink);color:var(--pink)">${ICON.check} ${esc(p.title)}</span>`
              : s.items.slice(0, 2).map((x) => `<a class="chip-link" href="${base}${x.url}">${esc(x.title)}</a>`).join('')}
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${related.length ? `
<section class="section">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <p class="micro">Completes the routine</p>
        <h2 class="display d-md">Pairs well with</h2>
      </div>
      <div class="sec-head__aside">
        <p class="lede" style="font-size:.92rem">Same concern, different step — so these work alongside ${esc(p.title)} rather than replacing it.</p>
      </div>
    </div>
    <div class="rail">
      ${related.map((x, i) => card(x, base, { index: i })).join('')}
    </div>
  </div>
</section>` : ''}`;
}
