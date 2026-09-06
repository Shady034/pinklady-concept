import { byCategory, byConcern, money } from './catalog.mjs';

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const IMG = 'assets/img/products/';

// Transparent 1x1 placeholder. The hover image starts on this so the markup
// stays valid and no broken-image frame flashes; site.js swaps in the real
// file the first time a pointer reaches the card.
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

/* --- facts taken verbatim from the live store; nothing here is invented --- */
export const BRAND = {
  name: 'Pink Lady',
  tagline: 'Care Your Skin with Love',
  descriptor: 'Luxury skincare crafted with care to enhance your natural beauty.',
  delivery: 'Free islandwide delivery',
  deliveryDetail: 'Delivered within 1–3 working days',
  whatsapp: '0741 639 933',
  whatsappHref: 'https://wa.me/94741639933',
  instagram: 'https://www.instagram.com/pinkladywhiteningcream',
  facebook: 'https://www.facebook.com/share/17Y8evKGwA/',
  tiktok: 'https://www.tiktok.com/@pinkladywhitening',
  live: 'https://pinklady.lk/',
};

export const ICON = {
  search: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  bag: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><path d="M4 6.5h12l-.9 10.2a1.4 1.4 0 0 1-1.4 1.3H6.3a1.4 1.4 0 0 1-1.4-1.3L4 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7.3 8.4V5.6a2.7 2.7 0 0 1 5.4 0v2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  menu: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  minus: '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true"><path d="M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  plus: '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  caret: '<svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true"><path d="M4 6.5L8 10.5l4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrow: '<svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true"><path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M3 8.4l3.1 3.1L13 4.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  info: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.3" stroke="currentColor" stroke-width="1.3"/><path d="M8 7.2v4M8 5.1v.9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  wa: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.6-.9 2.6.3 1.4 1 2.6 2 3.6a9 9 0 0 0 4 2.4c1.2.4 2 .3 2.6.2.6-.1 1.4-.6 1.6-1.2.2-.5.2-1 .1-1.1l-.5-.2Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.13-2.41-.13-2.38 0-4.01 1.45-4.01 4.13v2.3H7.6V13h2.67v8h3.23Z"/></svg>',
  tt: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.35 2.05 1.6 3.4 3.6 3.6v2.5a6.5 6.5 0 0 1-3.6-1.15v5.6a5.6 5.6 0 1 1-5.6-5.6c.28 0 .55.02.82.06v2.66a2.98 2.98 0 1 0 2.1 2.85V3h2.68Z"/></svg>',
};

/* ---------- product card ---------- */
export function card(p, base = '', { index = 0, eager = false } = {}) {
  const img1 = p.images[0], img2 = p.images[1];
  const media = `<img src="${base}${IMG}${img1.md}" alt="${esc(img1.alt)}" width="520" height="650" loading="${eager ? 'eager' : 'lazy'}" ${eager ? 'fetchpriority="high"' : ''} decoding="async">
       ${img2 ? `<img src="${BLANK}" data-hover-src="${base}${IMG}${img2.md}" alt="" width="520" height="650" decoding="async" aria-hidden="true">` : ''}`;

  return `<article class="card" data-card data-tone="${p.tone}" data-cat="${p.cat}" data-concerns="${p.concerns.join(' ')}" data-price="${p.price}" data-title="${esc(p.title)}" data-published="${Date.parse(p.published)}" data-index="${index}" data-reveal>
    <a class="card__media" href="${base}${p.url}" tabindex="-1" aria-hidden="true">${media}</a>
    ${p.badge ? `<span class="tag card__badge">${esc(p.badge)}</span>` : ''}
    <div class="card__body">
      <p class="card__cat">${esc(p.catShort)}</p>
      <h3 class="card__title"><a href="${base}${p.url}">${esc(p.title)}</a></h3>
      <p class="card__blurb">${esc(p.blurb)}</p>
      <p class="card__price num">${p.priceText}</p>
    </div>
    <div class="card__quick">
      <button class="btn btn--sm btn--block" type="button" data-add="${p.handle}">Add · ${p.priceText}</button>
    </div>
  </article>`;
}

/* ---------- shell ---------- */
function megaMenu(base) {
  const col = (title, items, extra = '') => `<div class="mega__col">
    <h3 class="micro">${title}</h3>
    <div class="mega__list">${items}</div>${extra}</div>`;

  const catItems = byCategory.map((c) => `<a href="${base}${c.url}">${esc(c.title)}<span>${c.items.length}</span></a>`).join('');
  const conItems = byConcern.map((c) => `<a href="${base}${c.url}">${esc(c.title)}<span>${c.items.length}</span></a>`).join('');

  return `<div class="mega" data-mega="shop"><div class="wrap"><div class="mega__inner">
    ${col('Shop by category', catItems)}
    ${col('Shop by concern', conItems)}
    ${col('Guides', `
      <a href="${base}routine.html">Build your routine</a>
      <a href="${base}ingredients.html">Ingredient index</a>
      <a href="${base}about.html">About Pink Lady</a>
      <a href="${base}help.html">Delivery &amp; help</a>`)}
    <div class="mega__feat">
      <div>
        <p class="micro" style="color:var(--pink)">Not sure where to start?</p>
        <p class="display d-sm" style="margin-top:.5rem">Three questions, one routine.</p>
      </div>
      <a class="btn btn--sm" href="${base}routine.html">Build your routine ${ICON.arrow}</a>
    </div>
  </div></div></div>`;
}

function header(base, current) {
  const on = (k) => (current === k ? ' aria-current="page"' : '');
  // The ribbon sits ABOVE the sticky header, not inside it. Inside, its marquee
  // never left the viewport and so never stopped animating.
  return `<div class="ribbon" data-ribbon aria-label="Store announcements">
      <div class="ribbon__track">
        ${[0, 1].map(() => `<div class="ribbon__grp">
          <span><i></i>${esc(BRAND.delivery)}</span>
          <span><i></i>${esc(BRAND.deliveryDetail)}</span>
          <span><i></i>Order on WhatsApp ${esc(BRAND.whatsapp)}</span>
          <span><i></i>${esc(BRAND.tagline)}</span>
        </div>`).join('')}
      </div>
    </div>
  <header class="hdr">
    <div class="wrap" data-mega-wrap>
      <div class="hdr__bar">
        <nav class="hdr__nav" aria-label="Primary">
          <span class="navitem" data-mega-item>
            <a class="navlink" href="${base}shop.html"${on('shop')}>Shop</a>
            <button class="navitem__caret" type="button" data-mega-trigger="shop"
                    aria-expanded="false" aria-label="Browse categories and concerns">${ICON.caret}</button>
          </span>
          <a class="navlink" href="${base}collections/sets.html"${on('sets')}>Sets</a>
          <a class="navlink" href="${base}routine.html"${on('routine')}>Routine</a>
          <a class="navlink" href="${base}ingredients.html"${on('ingredients')}>Ingredients</a>
          <a class="navlink" href="${base}about.html"${on('about')}>About</a>
        </nav>
        <button class="icon-btn icon-btn--menu" type="button" data-open-panel="nav" aria-label="Open menu">${ICON.menu}</button>
        <a class="brand" href="${base}index.html" aria-label="Pink Lady, home">
          <span class="brand__mark">Pink <em>Lady</em></span>
        </a>
        <div class="hdr__tools">
          <button class="icon-btn" type="button" data-open-search aria-label="Search products">${ICON.search}</button>
          <button class="icon-btn" type="button" data-open-panel="cart" aria-label="Open bag">
            ${ICON.bag}<span class="cart-count num" data-cart-count data-on="false">0</span>
          </button>
        </div>
      </div>
      ${megaMenu(base)}
    </div>
  </header>`;
}

function navPanel(base) {
  const group = (id, title, items) => `
    <div class="nav-acc">
      <button class="nav-acc__btn" type="button" data-disclose="exclusive" aria-expanded="false" aria-controls="${id}">
        ${title} ${ICON.plus}
      </button>
      <div class="nav-acc__panel" id="${id}" data-open="false"><div>${items}</div></div>
    </div>`;

  return `<div class="panel panel--left" data-panel="nav" data-open="false" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="panel__head">
      <span class="brand__mark">Pink <em>Lady</em></span>
      <button class="icon-btn" type="button" data-close-panel aria-label="Close menu">${ICON.close}</button>
    </div>
    <div class="panel__body" data-disclose-group>
      ${group('m-cat', 'Category', byCategory.map((c) => `<a href="${base}${c.url}">${esc(c.title)}<span>${c.items.length}</span></a>`).join(''))}
      ${group('m-con', 'Concern', byConcern.map((c) => `<a href="${base}${c.url}">${esc(c.title)}<span>${c.items.length}</span></a>`).join(''))}
      <div class="nav-acc"><a class="nav-acc__btn" href="${base}shop.html">All products ${ICON.arrow}</a></div>
      <div class="nav-acc"><a class="nav-acc__btn" href="${base}routine.html">Build your routine ${ICON.arrow}</a></div>
      <div class="nav-acc"><a class="nav-acc__btn" href="${base}ingredients.html">Ingredients ${ICON.arrow}</a></div>
      <div class="nav-acc"><a class="nav-acc__btn" href="${base}about.html">About ${ICON.arrow}</a></div>
      <div class="nav-acc"><a class="nav-acc__btn" href="${base}help.html">Delivery &amp; help ${ICON.arrow}</a></div>
    </div>
    <div class="panel__foot">
      <a class="btn btn--block btn--sm" href="${BRAND.whatsappHref}" target="_blank" rel="noopener">${ICON.wa} Order on WhatsApp</a>
    </div>
  </div>`;
}

function cartPanel(base) {
  return `<div class="panel panel--right" data-panel="cart" data-open="false" role="dialog" aria-modal="true" aria-label="Shopping bag">
    <div class="panel__head">
      <p class="micro">Your bag (<span data-cart-count>0</span>)</p>
      <button class="icon-btn" type="button" data-close-panel aria-label="Close bag">${ICON.close}</button>
    </div>
    <div class="panel__body">
      <div class="meter" data-cart-empty-hide hidden>
        <p class="micro" style="color:var(--pink)">${ICON.check} ${esc(BRAND.delivery)} unlocked</p>
        <div class="meter__bar"><div class="meter__fill" style="width:100%"></div></div>
        <p class="small muted" style="margin:0">${esc(BRAND.deliveryDetail)}, on every order.</p>
      </div>
      <div data-cart-lines></div>
    </div>
    <div class="panel__foot" data-cart-foot hidden>
      <div class="totals" style="margin-bottom:1rem">
        <div><span>Delivery</span><span>Free</span></div>
        <div class="is-total"><span>Total</span><span class="num" data-cart-total>Rs 0</span></div>
      </div>
      <a class="btn btn--pink btn--block" href="${base}checkout.html">Checkout ${ICON.arrow}</a>
      <p class="small muted" style="text-align:center;margin-top:.75rem">
        or <a href="${BRAND.whatsappHref}" target="_blank" rel="noopener" style="text-decoration:underline">order on WhatsApp</a>
      </p>
    </div>
  </div>`;
}

function searchOverlay(base) {
  const seeds = ['Serum', 'Acne', 'Niacinamide', 'Sunscreen', 'Hair fall', 'Lips', 'Sets'];
  return `<div class="search" data-search data-open="false" role="dialog" aria-modal="true" aria-label="Search">
    <div class="search__sheet"><div class="wrap">
      <div class="search__field">
        <span style="color:var(--pink);width:22px" aria-hidden="true">${ICON.search}</span>
        <input type="search" placeholder="Search products…" aria-label="Search products" autocomplete="off" spellcheck="false">
        <button class="icon-btn" type="button" data-close-search aria-label="Close search">${ICON.close}</button>
      </div>
      <div class="search__results">
        <div data-search-seed>
          <p class="micro muted" style="margin-bottom:.9rem">Try</p>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem">
            ${seeds.map((s) => `<span class="tag">${s}</span>`).join('')}
          </div>
        </div>
        <div data-search-results></div>
      </div>
    </div></div>
  </div>`;
}

function footer(base) {
  const linkList = (items) => `<div class="ftr__links">${items.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div>`;
  return `<footer class="ftr">
    <div class="wrap">
      <div class="ftr__top">
        <div>
          <span class="brand__mark" style="font-size:2rem">Pink <em>Lady</em></span>
          <p class="lede" style="margin-top:1rem;color:#c8adb8;font-size:1rem">${esc(BRAND.descriptor)}</p>
          <form class="subscribe" data-demo-form="Thanks — this is a concept demo, nothing was sent.">
            <input type="email" required placeholder="Email address" aria-label="Email address">
            <button class="btn btn--pink btn--sm" type="submit">Join</button>
          </form>
          <div class="socials">
            <a href="${BRAND.instagram}" target="_blank" rel="noopener" aria-label="Pink Lady on Instagram">${ICON.ig}</a>
            <a href="${BRAND.facebook}" target="_blank" rel="noopener" aria-label="Pink Lady on Facebook">${ICON.fb}</a>
            <a href="${BRAND.tiktok}" target="_blank" rel="noopener" aria-label="Pink Lady on TikTok">${ICON.tt}</a>
          </div>
        </div>
        <div>
          <h3 class="micro">Shop</h3>
          ${linkList([
            [`${base}shop.html`, 'All products'],
            ...byCategory.slice(0, 6).map((c) => [`${base}${c.url}`, c.title]),
          ])}
        </div>
        <div>
          <h3 class="micro">Concerns</h3>
          ${linkList(byConcern.slice(0, 6).map((c) => [`${base}${c.url}`, c.title]))}
        </div>
        <div>
          <h3 class="micro">Help</h3>
          ${linkList([
            [`${base}help.html`, 'Delivery & returns'],
            [`${base}help.html#faq`, 'FAQ'],
            [`${base}routine.html`, 'Build a routine'],
            [`${base}ingredients.html`, 'Ingredient index'],
            [`${base}about.html`, 'About us'],
            [BRAND.whatsappHref, `WhatsApp ${BRAND.whatsapp}`],
          ])}
        </div>
      </div>
      <div class="ftr__bot">
        <p>&copy; ${new Date().getFullYear()} ${BRAND.name}. ${esc(BRAND.tagline)}.</p>
        <p>Concept redesign &mdash; not the live pinklady.lk store</p>
      </div>
    </div>
  </footer>`;
}

/* ---------- page shell ---------- */
export function page({ title, description, base = '', current = '', body, bodyClass = '' }) {
  const t = title ? `${title} · ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
  return `<!doctype html>
<html lang="en" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(t)}</title>
<meta name="description" content="${esc(description || BRAND.descriptor)}">
<meta name="theme-color" content="#180810">
<meta name="robots" content="noindex, nofollow">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(description || BRAND.descriptor)}">
<meta property="og:type" content="website">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${base}assets/fonts/fraunces-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/manrope-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/site.css">
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
${header(base, current)}
<main id="main">
${body}
</main>
${footer(base)}
<div class="scrim" data-scrim data-open="false"></div>
${navPanel(base)}
${cartPanel(base)}
${searchOverlay(base)}
<a class="wa" href="${BRAND.whatsappHref}" target="_blank" rel="noopener">${ICON.wa}<span>WhatsApp us</span></a>
<script src="${base}assets/catalog.js" defer></script>
<script src="${base}assets/site.js" defer></script>
</body>
</html>`;
}

export { money };
