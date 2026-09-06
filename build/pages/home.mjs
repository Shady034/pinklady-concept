import { byCategory, byConcern, routineSteps, get, latest, products, ingredientIndex, stats } from '../catalog.mjs';
import { card, esc, IMG, BRAND, ICON } from '../templates.mjs';

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export function home() {
  const heroProduct = get('blush-pink-whitening-scrub');
  const sets = byCategory.find((c) => c.key === 'sets');
  const spotlight = get('pinkish-face-serum-2-x-fast-whitening');
  const ing = ingredientIndex.filter((i) => ['Niacinamide', 'Alpha Arbutin', 'Tea Tree Oil', 'Vitamin C'].includes(i.name));

  return `
<!-- ============ HERO ============ -->
<section class="hero">
  <div class="wrap">
    <div class="hero__grid">
      <div>
        <p class="micro hero__eyebrow" data-reveal>Skincare from Sri Lanka</p>
        <h1 class="display d-xl" data-reveal>Care your skin<br>with <em>love</em>.</h1>
        <p class="lede hero__lede" data-reveal>
          ${stats.products} formulas for tone, clarity and glow — sorted by what your
          skin is actually dealing with, not by what happened to be uploaded last.
        </p>
        <div class="hero__cta" data-reveal>
          <a class="btn" href="shop.html">Shop the range ${ICON.arrow}</a>
          <a class="btn btn--ghost" href="routine.html">Build your routine</a>
        </div>
        <div class="hero__stats" data-reveal>
          <div class="hero__stat"><b class="num">${stats.products}</b><span>Formulas</span></div>
          <div class="hero__stat"><b>Free</b><span>Islandwide delivery</span></div>
          <div class="hero__stat"><b class="num">1&ndash;3</b><span>Working days</span></div>
        </div>
      </div>
      <div class="hero__art" data-reveal>
        <figure style="--ar:${heroProduct.images[0].ratio}">
          <img src="${IMG}${heroProduct.images[0].lg}" alt="${esc(heroProduct.images[0].alt)}"
               width="940" height="1175" fetchpriority="high" decoding="async">
        </figure>
        <a class="hero__chip" href="${heroProduct.url}">
          <b>${esc(heroProduct.title)}</b>
          <span class="num">${heroProduct.priceText}</span>
          ${ICON.arrow}
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ============ CONCERNS — the entry point the live store has no version of ============ -->
<section class="section">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <p class="micro" data-reveal>Start here</p>
        <h2 class="display d-lg" data-reveal>What is your skin<br>dealing with?</h2>
      </div>
      <div class="sec-head__aside" data-reveal>
        <p class="lede" style="font-size:.95rem">
          Every product is filed under the concern it treats, so you can go
          straight to the four or five that are relevant to you.
        </p>
      </div>
    </div>
    <div class="tiles">
      ${byConcern.map((c, i) => `
        <a class="tile" href="${c.url}" data-reveal>
          <span class="tile__n">${roman[i]}</span>
          <span>
            <span class="tile__t">${esc(c.title)}</span>
            <span class="tile__c num">${c.items.length} product${c.items.length === 1 ? '' : 's'}</span>
          </span>
        </a>`).join('')}
    </div>
  </div>
</section>

<!-- ============ SETS ============ -->
<section class="section on-ink">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <p class="micro" data-reveal>Sets &amp; routines</p>
        <h2 class="display d-lg" data-reveal>The whole routine,<br>one price.</h2>
      </div>
      <div class="sec-head__aside" data-reveal>
        <p class="lede" style="font-size:.95rem">
          ${sets.items.length} pre-built sets that pair a cleanser with the treatment
          it belongs to — the easiest place to start if you are new to the range.
        </p>
        <a class="ulink" style="margin-top:1rem" href="collections/sets.html">All sets ${ICON.arrow}</a>
      </div>
    </div>
    <div class="rail rail--5">
      ${sets.items.map((p, i) => card(p, '', { index: i })).join('')}
    </div>
  </div>
</section>

<!-- ============ ROUTINE LADDER ============ -->
<section class="section">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <p class="micro" data-reveal>The order things go on</p>
        <h2 class="display d-lg" data-reveal>Five steps,<br>morning and night.</h2>
      </div>
      <div class="sec-head__aside" data-reveal>
        <p class="lede" style="font-size:.95rem">
          Skincare only works in sequence. Here is where each Pink Lady product sits —
          and what to reach for at each step.
        </p>
        <a class="ulink" style="margin-top:1rem" href="routine.html">Build mine ${ICON.arrow}</a>
      </div>
    </div>
    <div class="ladder">
      ${routineSteps.map((s) => `
        <div class="ladder__row" data-reveal>
          <div class="ladder__n num">0${s.n}</div>
          <div class="ladder__t">${esc(s.label)}<span>${esc(s.note)}</span></div>
          <div class="ladder__items">
            ${s.items.slice(0, 5).map((p) => `
              <a class="chip-link" href="${p.url}">
                <img src="${IMG}${p.images[0].sm}" alt="" width="30" height="30" loading="lazy">
                ${esc(p.title)}
              </a>`).join('')}
            ${s.items.length > 5 ? `<a class="chip-link" href="shop.html?cat=${s.items[0].cat}">+${s.items.length - 5} more</a>` : ''}
          </div>
        </div>`).join('')}
      <div class="ladder__row" style="border-bottom:1px solid var(--rule)"></div>
    </div>
  </div>
</section>

<!-- ============ INGREDIENTS ============ -->
<section class="section on-blush">
  <div class="wrap">
    <div class="split split--wide">
      <div data-reveal>
        <p class="micro" style="color:var(--pink)">What is actually in it</p>
        <h2 class="display d-lg" style="margin-block:1rem 1.25rem">The actives,<br>in plain language.</h2>
        <p class="lede">
          ${stats.ingredients} actives run through the range. Each one has its own page
          listing every product it appears in — so you can shop the ingredient, not the label.
        </p>
        <a class="btn" style="margin-top:1.75rem" href="ingredients.html">Ingredient index ${ICON.arrow}</a>
      </div>
      <div class="stack" style="--gap:0" data-reveal>
        ${ing.map((i, n) => `
          <a class="rule-row" href="ingredients.html#${i.slug}" style="padding-block:1.15rem;align-items:flex-start">
            <span class="rule-row__n num">0${n + 1}</span>
            <span style="flex:1">
              <span class="display d-sm" style="display:block">${esc(i.name)}</span>
              <span class="small muted" style="display:block;margin-top:.3rem">${esc(i.note)}</span>
            </span>
            <span class="tag" style="flex:none">${i.items.length}</span>
          </a>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ============ SPOTLIGHT — the one product with stated active percentages ============ -->
<section class="spot">
  <div class="wrap spot__grid">
    <div class="spot__copy" data-reveal>
      <p class="micro" style="color:var(--pink-lit)">The formula</p>
      <h2 class="display d-lg" style="margin-block:1rem 1.25rem">The one that tells&nbsp;you<br>how&nbsp;much.</h2>
      <p class="lede" style="color:#dcc6cf;max-width:40ch">
        Most of the range lists its actives. This is the only formula that publishes
        the strengths — which is why it is the one to start with for pigmentation
        and dark marks.
      </p>
      <dl class="spot__specs">
        <div><dt>2% Alpha arbutin</dt><dd>Inhibits tyrosinase, the enzyme behind melanin production</dd></div>
        <div><dt>4% Niacinamide</dt><dd>Supports the skin barrier and improves texture</dd></div>
      </dl>
      <div style="display:flex;flex-wrap:wrap;gap:.65rem;margin-top:2rem">
        <button class="btn btn--pink" type="button" data-add="${spotlight.handle}">Add to bag · ${spotlight.priceText}</button>
        <a class="btn btn--ghost" href="${spotlight.url}">Read the formula ${ICON.arrow}</a>
      </div>
    </div>
    <figure class="spot__fig" style="--ar:${spotlight.images[0].ratio}" data-reveal>
      <img src="${IMG}${spotlight.images[0].lg}" alt="${esc(spotlight.images[0].alt)}"
           width="940" height="1175" loading="lazy" decoding="async">
    </figure>
  </div>
</section>

<!-- ============ LATEST ============ -->
<section class="section">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <p class="micro" data-reveal>Latest additions</p>
        <h2 class="display d-lg" data-reveal>New to the range.</h2>
      </div>
      <div class="sec-head__aside" data-reveal>
        <p class="lede" style="font-size:.95rem">Ordered by the date each formula was added to the store.</p>
        <a class="ulink" style="margin-top:1rem" href="shop.html">Shop all ${stats.products} ${ICON.arrow}</a>
      </div>
    </div>
    <div class="rail">
      ${latest.filter((p) => p.cat !== 'sets').slice(0, 4).map((p, i) => card(p, '', { index: i })).join('')}
    </div>
  </div>
</section>

<!-- ============ CATEGORIES ============ -->
<section class="section-sm">
  <div class="wrap">
    <div class="rule-row" style="margin-bottom:1.5rem"><span class="rule-row__n">—</span><p class="micro">Browse by category</p></div>
    <div style="display:flex;flex-wrap:wrap;gap:.6rem" data-reveal>
      ${byCategory.map((c) => `<a class="chip-link" href="${c.url}">${esc(c.title)} <span class="muted num" style="font-size:.72rem">${c.items.length}</span></a>`).join('')}
    </div>
  </div>
</section>

<!-- ============ TRUST / DELIVERY ============ -->
<section class="section on-ink">
  <div class="wrap">
    <div class="split">
      <div data-reveal>
        <p class="micro" style="color:var(--pink-lit)">Ordering</p>
        <h2 class="display d-lg" style="margin-block:1rem 1.25rem">Free delivery,<br>anywhere on the island.</h2>
        <p class="lede">
          Every order ships free and arrives within one to three working days.
          Prefer to ask before you buy? Message the team on WhatsApp — that is how
          most Pink Lady orders already happen.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.75rem">
          <a class="btn btn--pink" href="${BRAND.whatsappHref}" target="_blank" rel="noopener">${ICON.wa} ${esc(BRAND.whatsapp)}</a>
          <a class="btn btn--ghost" href="help.html">Delivery &amp; returns</a>
        </div>
      </div>
      <div class="stack" style="--gap:0" data-reveal>
        ${[
          ['Free islandwide delivery', 'On every order, no minimum spend.'],
          ['1–3 working days', 'Dispatched from Sri Lanka.'],
          ['Order over WhatsApp', `Message ${BRAND.whatsapp} and the team will place it for you.`],
          ['Follow the brand', 'Instagram, Facebook and TikTok — @pinkladywhitening.'],
        ].map(([t, d], n) => `
          <div class="rule-row" style="padding-block:1.15rem;align-items:flex-start">
            <span class="rule-row__n num">0${n + 1}</span>
            <span style="flex:1">
              <span class="display d-sm" style="display:block">${esc(t)}</span>
              <span class="small muted" style="display:block;margin-top:.3rem">${esc(d)}</span>
            </span>
          </div>`).join('')}
      </div>
    </div>
  </div>
</section>`;
}
