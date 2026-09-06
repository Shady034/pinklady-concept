import { byCategory, byConcern, ingredientIndex, routineSteps, products, stats, priceRange, money } from '../catalog.mjs';
import { CONCERNS, BRAND_CLAIMS } from '../taxonomy.mjs';
import { card, esc, IMG, BRAND, ICON } from '../templates.mjs';

/* ---------------- routine builder ---------------- */
export function routine() {
  const q = (key, title, sub, opts) => `
    <div data-rb-step="${key}" hidden>
      <p class="micro" style="color:var(--pink)">${esc(sub)}</p>
      <h2 class="display d-md" style="margin-block:.85rem 1.75rem">${esc(title)}</h2>
      <div style="display:grid;gap:.6rem;max-width:34rem">
        ${opts.map(([v, label, note]) => `
          <button class="tile" type="button" data-rb-opt="${v}" aria-pressed="false"
                  style="min-height:0;gap:.35rem;text-align:left;align-items:flex-start">
            <span class="tile__t" style="font-size:1.05rem">${esc(label)}</span>
            ${note ? `<span class="tile__c" style="margin:0">${esc(note)}</span>` : ''}
          </button>`).join('')}
      </div>
      <button class="ulink" type="button" data-rb-back style="margin-top:1.75rem">Back</button>
    </div>`;

  return `
<section class="pagehead">
  <div class="wrap">
    <p class="micro">Routine builder</p>
    <h1 class="display d-lg">Three questions.<br>One routine.</h1>
    <p class="lede">
      ${stats.products} products is a lot to read through. Answer three questions and
      this narrows it to the handful that belong together, in the order they go on.
      This builds a <strong>face</strong> routine &mdash; for body, hair or lips,
      browse those categories directly.
    </p>
  </div>
</section>

<section class="section-sm" data-routine>
  <div class="wrap">
    <div style="height:2px;background:var(--rule-soft);border-radius:2px;margin-bottom:2.5rem;max-width:34rem">
      <div data-rb-progress style="height:100%;width:0;background:var(--pink);border-radius:2px;transition:width .5s var(--ease)"></div>
    </div>

    ${q('concern', 'What are you treating?', 'Question 1 of 3',
      byConcern.filter((c) => ['brightening', 'acne', 'glow'].includes(c.key))
        .map((c) => [c.key, c.title, c.blurb]))}

    ${q('depth', 'How many steps do you want?', 'Question 2 of 3', [
      ['core', 'Keep it simple', 'Three products — cleanse, treat, protect.'],
      ['full', 'The full routine', 'Five products — adds a toner and a moisturiser.'],
    ])}

    ${q('budget', 'Where should each product sit?', 'Question 3 of 3', [
      ['low', `Under ${money(3000)} each`, 'The most accessible option at every step.'],
      ['mid', `Under ${money(5000)} each`, 'Room for the stronger treatment formulas.'],
      ['any', 'No preference', 'Pick the best fit regardless of price.'],
    ])}

    <div data-rb-result hidden>
      <p class="micro" style="color:var(--pink)">Your routine</p>
      <h2 class="display d-md" style="margin-block:.85rem 1.5rem">
        <span data-rb-count class="num">0</span> products, in order.
      </h2>
      <ul class="stack" style="--gap:0;max-width:44rem" data-rb-list></ul>
      <div class="totals" style="max-width:44rem;margin-top:1.5rem">
        <div><span>Delivery</span><span>Free</span></div>
        <div class="is-total"><span>Routine total</span><span class="num" data-rb-total>Rs 0</span></div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.75rem">
        <button class="btn btn--pink" type="button" data-rb-addall>Add all to bag</button>
        <button class="btn btn--ghost" type="button" data-rb-restart>Start again</button>
      </div>
      <p class="note" style="max-width:44rem;margin-top:1.75rem">${ICON.info}
        <span>Suggestions are matched from the Pink Lady range by concern and routine
        step. They are not medical advice — for persistent or painful skin
        conditions, see a dermatologist.</span></p>
    </div>
  </div>
</section>

<section class="section on-ink">
  <div class="wrap">
    <div class="sec-head"><p class="micro">Reference</p><h2 class="display d-lg">The five steps</h2></div>
    <div class="ladder">
      ${routineSteps.map((s) => `
        <div class="ladder__row">
          <div class="ladder__n num">0${s.n}</div>
          <div class="ladder__t">${esc(s.label)}<span>${esc(s.note)}</span></div>
          <div class="ladder__items">
            ${s.items.map((p) => `<a class="chip-link" href="${p.url}">${esc(p.title)}</a>`).join('')}
          </div>
        </div>`).join('')}
      <div class="ladder__row" style="border-bottom:1px solid var(--rule)"></div>
    </div>
  </div>
</section>`;
}

/* ---------------- ingredient index ---------------- */
export function ingredients() {
  return `
<section class="pagehead">
  <div class="wrap">
    <p class="micro">Reference</p>
    <h1 class="display d-lg">Ingredient index</h1>
    <p class="lede">
      Every active Pink Lady names across the range, what it does, and each product
      it appears in. Compiled from the brand's own product information.
    </p>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2.5rem">
      ${ingredientIndex.map((i) => `<a class="chip-link" href="#${i.slug}">${esc(i.name)} <span class="muted num" style="font-size:.72rem">${i.items.length}</span></a>`).join('')}
    </div>

    ${ingredientIndex.map((i, n) => `
      <section id="${i.slug}" style="scroll-margin-top:calc(var(--header-h) + 1rem)">
        <div class="ladder__row" style="grid-template-columns:none">
          <div class="split split--wide" style="align-items:start">
            <div>
              <p class="rule-row__n num" style="margin-bottom:.5rem">${String(n + 1).padStart(2, '0')}</p>
              <h2 class="display d-md">${esc(i.name)}</h2>
              <p class="lede" style="margin-top:.85rem;font-size:.98rem">${esc(i.note)}</p>
            </div>
            <div class="ladder__items" style="padding-top:.5rem">
              ${i.items.map((p) => `
                <a class="chip-link" href="${p.url}">
                  <img src="${IMG}${p.images[0].sm}" alt="" width="30" height="30" loading="lazy">
                  ${esc(p.title)}
                </a>`).join('')}
            </div>
          </div>
        </div>
      </section>`).join('')}
    <div style="border-top:1px solid var(--rule)"></div>

    <p class="note" style="margin-top:2rem;max-width:44rem">${ICON.info}
      <span>This index lists only the actives Pink Lady names in its published product
      information. It is not a full INCI list — for a complete ingredient
      declaration, check the pack or ask on WhatsApp.</span></p>
  </div>
</section>`;
}

/* ---------------- about ---------------- */
export function about() {
  return `
<section class="hero" style="--header-h:0">
  <div class="wrap">
    <div class="hero__grid" style="grid-template-columns:1fr">
      <div style="max-width:52rem">
        <p class="micro hero__eyebrow" data-reveal>About</p>
        <h1 class="display d-xl" style="margin-block:1.1rem" data-reveal>Care your skin<br>with <em>love</em>.</h1>
        <p class="lede hero__lede" style="max-width:46ch" data-reveal>
          Pink Lady is a Sri Lankan skincare brand selling ${stats.products} formulas
          across face, body, hair and lips — delivered free anywhere on the island.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split split--wide">
      <div class="prose" data-reveal>
        <p class="micro" style="color:var(--pink)">The range</p>
        <h2 class="display d-lg" style="margin-block:1rem 1.5rem">Built one concern at a time.</h2>
        <p>
          The range grew the way most independent beauty brands grow — a formula at a
          time, in response to what customers kept asking for. A tea tree wash for
          breakouts. A niacinamide cleanser for uneven tone. A salicylic acid shampoo
          for dandruff. A foot cream for cracked heels.
        </p>
        <p>
          That is ${stats.products} products now, covering ${stats.categories}
          categories and ${stats.concerns} distinct concerns, at prices from
          ${money(priceRange.min)} to ${money(priceRange.max)}.
        </p>
        <p>
          <strong>Nothing on this site is invented.</strong> Every product, price,
          ingredient and benefit shown here comes from Pink Lady's own published
          product information.
        </p>
      </div>
      <div class="stack" style="--gap:0" data-reveal>
        ${[
          [stats.products, 'Formulas in the range'],
          [stats.categories, 'Categories'],
          [stats.concerns, 'Concerns covered'],
          [stats.ingredients, 'Named actives'],
        ].map(([n, l], i) => `
          <div class="rule-row" style="padding-block:1.35rem;align-items:center">
            <span class="rule-row__n num">0${i + 1}</span>
            <span style="flex:1"><span class="display d-md num" style="display:block">${n}</span>
            <span class="small muted">${esc(l)}</span></span>
          </div>`).join('')}
        <div style="border-top:1px solid var(--rule)"></div>
      </div>
    </div>
  </div>
</section>

<section class="section on-ink">
  <div class="wrap">
    <div class="sec-head"><p class="micro">How to reach us</p><h2 class="display d-lg">Most orders start<br>as a message.</h2></div>
    <div class="split">
      <div>
        <p class="lede">
          WhatsApp is how Pink Lady already talks to its customers — questions about
          which product suits which skin, order placement, delivery updates. That has
          not been replaced here, just given a permanent place on every page.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.75rem">
          <a class="btn btn--pink" href="${BRAND.whatsappHref}" target="_blank" rel="noopener">${ICON.wa} ${esc(BRAND.whatsapp)}</a>
          <a class="btn btn--ghost" href="help.html">Delivery &amp; help</a>
        </div>
      </div>
      <div class="stack" style="--gap:0">
        ${[
          ['Instagram', '@pinkladywhiteningcream', BRAND.instagram],
          ['TikTok', '@pinkladywhitening', BRAND.tiktok],
          ['Facebook', 'Pink Lady', BRAND.facebook],
          ['WhatsApp', BRAND.whatsapp, BRAND.whatsappHref],
        ].map(([t, h, url], i) => `
          <a class="rule-row" href="${url}" target="_blank" rel="noopener" style="padding-block:1.15rem;align-items:center">
            <span class="rule-row__n num">0${i + 1}</span>
            <span style="flex:1"><span class="display d-sm" style="display:block">${esc(t)}</span>
            <span class="small muted">${esc(h)}</span></span>
            <span style="flex:none;color:var(--pink)">${ICON.arrow}</span>
          </a>`).join('')}
        <div style="border-top:1px solid var(--rule)"></div>
      </div>
    </div>
  </div>
</section>`;
}

/* ---------------- help / FAQ ---------------- */
export function help() {
  const faqs = [
    ['How much is delivery?', `${BRAND.delivery} — there is no minimum spend. Every order ships free anywhere in Sri Lanka.`],
    ['How long will my order take?', `${BRAND.deliveryDetail}.`],
    ['Can I order without using the website?', `Yes. Message ${BRAND.whatsapp} on WhatsApp and the team will place the order for you. That is how a large share of Pink Lady orders already happen.`],
    ['Which product should I start with?', 'Use the routine builder — three questions and it narrows the range down to the products that belong together. Or browse by concern rather than by category.'],
    ['Are the products suitable for sensitive skin?', 'Several formulas state that they suit all skin types, and that is noted on each product page where the brand says so. Patch test anything new on a small area first, and stop use if irritation develops.'],
    ['Do you ship outside Sri Lanka?', 'The current delivery promise covers Sri Lanka. For anywhere else, ask on WhatsApp before ordering.'],
  ];

  return `
<section class="pagehead">
  <div class="wrap">
    <p class="micro">Help</p>
    <h1 class="display d-lg">Delivery, returns<br>&amp; questions</h1>
    <p class="lede">Everything the current store leaves you to guess at.</p>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="tiles" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))">
      ${[
        ['Free delivery', BRAND.delivery + ', with no minimum spend.'],
        ['1–3 working days', BRAND.deliveryDetail + '.'],
        ['WhatsApp ordering', `Message ${BRAND.whatsapp} to order or ask a question.`],
      ].map(([t, d], i) => `
        <div class="tile" data-reveal>
          <span class="tile__n">0${i + 1}</span>
          <span><span class="tile__t">${esc(t)}</span><span class="tile__c" style="margin-top:.5rem;display:block">${esc(d)}</span></span>
        </div>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="faq" style="scroll-margin-top:calc(var(--header-h) + 1rem)">
  <div class="wrap-tight">
    <h2 class="display d-lg" style="margin-bottom:2rem">Frequently asked</h2>
    <div data-disclose-group>
      ${faqs.map(([q, a], i) => `
        <div class="acc">
          <button class="acc__btn" type="button" data-disclose="exclusive" aria-expanded="false" aria-controls="f${i}">
            ${esc(q)} ${ICON.plus}
          </button>
          <div class="acc__panel" id="f${i}" data-open="false"><div><p>${esc(a)}</p></div></div>
        </div>`).join('')}
      <div style="border-top:1px solid var(--rule)"></div>
    </div>

    <div class="note" style="margin-top:2.5rem">${ICON.info}
      <span><strong>A note on returns.</strong> The live Pink Lady store publishes a
      privacy policy but no returns, refund or shipping policy. This page is
      structured to hold one — the copy needs to come from the business, so it has
      been left for them to write rather than invented here.</span></div>
  </div>
</section>

<section class="section-sm on-ink">
  <div class="wrap" style="text-align:center">
    <h2 class="display d-md">Still stuck?</h2>
    <p class="lede" style="margin:1rem auto 1.75rem">Message the team directly.</p>
    <a class="btn btn--pink" href="${BRAND.whatsappHref}" target="_blank" rel="noopener">${ICON.wa} WhatsApp ${esc(BRAND.whatsapp)}</a>
  </div>
</section>`;
}

/* ---------------- cart ---------------- */
export function cartPage() {
  return `
<section class="pagehead">
  <div class="wrap"><p class="micro">Bag</p><h1 class="display d-lg">Your bag</h1></div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="split split--wide" style="align-items:start">
      <div>
        <div class="meter" data-cart-empty-hide hidden style="margin-bottom:1.5rem">
          <p class="micro" style="color:var(--pink)">${ICON.check} ${esc(BRAND.delivery)} unlocked</p>
          <div class="meter__bar"><div class="meter__fill" style="width:100%"></div></div>
          <p class="small muted" style="margin:0">${esc(BRAND.deliveryDetail)}, on every order.</p>
        </div>
        <div data-cart-lines></div>
      </div>
      <aside data-cart-foot hidden style="position:sticky;top:calc(var(--header-h) + 1.5rem);background:var(--bone-2);padding:1.5rem;border-radius:var(--r-lg)">
        <p class="micro muted" style="margin-bottom:1.25rem">Summary</p>
        <div class="totals">
          <div><span>Subtotal</span><span class="num" data-cart-sub>Rs 0</span></div>
          <div><span>Delivery</span><span>Free</span></div>
          <div class="is-total"><span>Total</span><span class="num" data-cart-total>Rs 0</span></div>
        </div>
        <a class="btn btn--pink btn--block" style="margin-top:1.5rem" href="checkout.html">Checkout ${ICON.arrow}</a>
        <p class="small muted" style="text-align:center;margin-top:.85rem">
          or <a href="${BRAND.whatsappHref}" target="_blank" rel="noopener" style="text-decoration:underline">order on WhatsApp</a>
        </p>
      </aside>
    </div>
  </div>
</section>`;
}

/* ---------------- checkout (concept walkthrough) ---------------- */
export function checkout() {
  const field = (id, label, type = 'text', extra = '') => `
    <label style="display:grid;gap:.4rem">
      <span class="micro muted">${esc(label)}</span>
      <input id="${id}" type="${type}" ${extra} style="padding:.85rem 1rem;border:1px solid var(--rule);border-radius:var(--r);background:var(--bone)">
    </label>`;

  return `
<section class="pagehead">
  <div class="wrap">
    <p class="micro">Checkout</p>
    <h1 class="display d-lg">Almost there</h1>
    <p class="lede">Three fields fewer than the default. Delivery is free, so there is no shipping step to sit through.</p>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="split split--wide" style="align-items:start">
      <form class="stack" style="--gap:1.5rem" data-demo-form="This is a concept demo — no order was placed.">
        <fieldset style="border:0;padding:0;display:grid;gap:1rem">
          <legend class="display d-sm" style="margin-bottom:.75rem">Contact</legend>
          ${field('co-name', 'Full name', 'text', 'required autocomplete="name"')}
          ${field('co-phone', 'Mobile number', 'tel', 'required autocomplete="tel" inputmode="tel"')}
          ${field('co-email', 'Email (for the receipt)', 'email', 'autocomplete="email"')}
        </fieldset>

        <fieldset style="border:0;padding:0;display:grid;gap:1rem">
          <legend class="display d-sm" style="margin-bottom:.75rem">Delivery address</legend>
          ${field('co-addr', 'Address', 'text', 'required autocomplete="street-address"')}
          ${field('co-city', 'City', 'text', 'required autocomplete="address-level2"')}
          <p class="note">${ICON.info}<span>${esc(BRAND.delivery)}, ${esc(BRAND.deliveryDetail.toLowerCase())}. No shipping options to choose between.</span></p>
        </fieldset>

        <fieldset style="border:0;padding:0;display:grid;gap:.6rem">
          <legend class="display d-sm" style="margin-bottom:.75rem">Payment</legend>
          <p class="note note--warn">${ICON.info}
            <span><strong>Left blank on purpose.</strong> The payment methods Pink Lady
            accepts are not published on the live store, so nothing has been invented
            here. This block is where card, bank transfer or cash on delivery would go
            once the business confirms which of those it offers.</span></p>
        </fieldset>

        <button class="btn btn--pink btn--block" type="submit">Place order</button>
        <p class="small muted" style="text-align:center">
          Prefer to talk first? <a href="${BRAND.whatsappHref}" target="_blank" rel="noopener" style="text-decoration:underline">Order on WhatsApp</a>
        </p>
      </form>

      <aside style="background:var(--bone-2);padding:1.5rem;border-radius:var(--r-lg)">
        <p class="micro muted" style="margin-bottom:1rem">Your order</p>
        <div data-cart-lines></div>
        <div class="totals" style="margin-top:1.25rem" data-cart-foot hidden>
          <div><span>Subtotal</span><span class="num" data-cart-sub>Rs 0</span></div>
          <div><span>Delivery</span><span>Free</span></div>
          <div class="is-total"><span>Total</span><span class="num" data-cart-total>Rs 0</span></div>
        </div>
      </aside>
    </div>
  </div>
</section>`;
}

/* ---------------- 404 ---------------- */
export function notFound(root = '/') {
  return `
<section class="section" style="min-height:60vh;display:grid;place-items:center;text-align:center">
  <div class="wrap-tight">
    <p class="micro" style="color:var(--pink)">404</p>
    <h1 class="display d-lg" style="margin-block:1rem">That page moved,<br>or never existed.</h1>
    <p class="lede" style="margin-inline:auto">Try the full range, or search for what you were after.</p>
    <div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin-top:2rem">
      <a class="btn btn--pink" href="${root}shop.html">Shop all ${stats.products}</a>
      <button class="btn btn--ghost" type="button" data-open-search>Search</button>
    </div>
  </div>
</section>`;
}
