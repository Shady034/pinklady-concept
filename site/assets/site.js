/* Pink Lady — front-end behaviour.
   No framework, no build step: the whole site is static HTML and this file is
   the only script. Cart state lives in localStorage so it survives navigation
   across real page loads. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = (n) => 'Rs ' + Math.round(n).toLocaleString('en-US');
  const BASE = document.documentElement.dataset.base || '';
  const CATALOG = window.PL_CATALOG || [];
  const byHandle = new Map(CATALOG.map((p) => [p.h, p]));

  /* ---------------- cart ---------------- */
  const KEY = 'pl.cart.v1';
  const readCart = () => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(v) ? v.filter((l) => l && byHandle.has(l.h) && l.q > 0) : [];
    } catch { return []; }
  };
  let cart = readCart();
  const saveCart = () => {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch { /* private mode */ }
    renderCart();
  };
  const cartCount = () => cart.reduce((a, l) => a + l.q, 0);
  const cartTotal = () => cart.reduce((a, l) => a + l.q * (byHandle.get(l.h)?.p || 0), 0);

  function addToCart(handle, qty = 1) {
    if (!byHandle.has(handle)) return;
    const line = cart.find((l) => l.h === handle);
    if (line) line.q = Math.min(99, line.q + qty);
    else cart.push({ h: handle, q: Math.min(99, qty) });
    saveCart();
    toast(`${byHandle.get(handle).t} added`);
    openPanel('cart');
  }
  function setQty(handle, q) {
    const line = cart.find((l) => l.h === handle);
    if (!line) return;
    if (q <= 0) cart = cart.filter((l) => l.h !== handle);
    else line.q = Math.min(99, q);
    saveCart();
  }

  const icon = {
    minus: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3.5 8h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>',
    plus: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>',
  };

  function lineHTML(l) {
    const p = byHandle.get(l.h);
    return `<div class="line">
      <a class="line__img" href="${BASE}${p.u}"><img src="${BASE}${p.i}" alt="" loading="lazy" width="76" height="95"></a>
      <div>
        <a class="line__t" href="${BASE}${p.u}">${p.t}</a>
        <div class="line__meta">${p.c}</div>
        <div class="line__ctl">
          <div class="stepper">
            <button type="button" data-qty="${p.h}" data-step="-1" aria-label="Decrease quantity of ${p.t}">${icon.minus}</button>
            <span class="num">${l.q}</span>
            <button type="button" data-qty="${p.h}" data-step="1" aria-label="Increase quantity of ${p.t}">${icon.plus}</button>
          </div>
          <button type="button" data-remove="${p.h}">Remove</button>
        </div>
      </div>
      <div class="line__price num">${money(p.p * l.q)}</div>
    </div>`;
  }

  function renderCart() {
    const n = cartCount();
    $$('[data-cart-count]').forEach((el) => { el.textContent = n; el.dataset.on = n > 0; });
    $$('[data-cart-lines]').forEach((el) => {
      el.innerHTML = cart.length
        ? cart.map(lineHTML).join('')
        : `<div class="empty">
             <p class="display d-sm">Your bag is empty</p>
             <p class="small muted">Not sure where to start? The routine builder narrows 45 products down to a handful.</p>
             <div style="display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center">
               <a class="btn btn--sm" href="${BASE}shop.html">Shop all</a>
               <a class="btn btn--sm btn--ghost" href="${BASE}routine.html">Build a routine</a>
             </div>
           </div>`;
    });
    const total = cartTotal();
    $$('[data-cart-total]').forEach((el) => { el.textContent = money(total); });
    $$('[data-cart-sub]').forEach((el) => { el.textContent = money(total); });
    $$('[data-cart-foot]').forEach((el) => { el.hidden = cart.length === 0; });
    $$('[data-cart-empty-hide]').forEach((el) => { el.hidden = cart.length === 0; });
  }

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      e.preventDefault();
      const qEl = add.dataset.qtyFrom ? $(add.dataset.qtyFrom) : null;
      addToCart(add.dataset.add, qEl ? Math.max(1, parseInt(qEl.value, 10) || 1) : 1);
      return;
    }
    const q = e.target.closest('[data-qty]');
    if (q) {
      const line = cart.find((l) => l.h === q.dataset.qty);
      if (line) setQty(q.dataset.qty, line.q + Number(q.dataset.step));
      return;
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) { setQty(rm.dataset.remove, 0); toast('Removed from bag'); }
  });

  /* ---------------- toast ---------------- */
  let toastTimer;
  function toast(msg) {
    let t = $('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span>';
      document.body.appendChild(t);
    }
    $('span', t).textContent = msg;
    t.dataset.on = 'true';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.dataset.on = 'false'; }, 2600);
  }

  /* ---------------- panels (nav + cart) ---------------- */
  let lastFocus = null;
  function openPanel(name) {
    const p = $(`[data-panel="${name}"]`);
    if (!p) return;
    lastFocus = document.activeElement;
    $$('[data-panel]').forEach((el) => { el.dataset.open = String(el === p); });
    $('[data-scrim]').dataset.open = 'true';
    document.body.classList.add('is-locked');
    const f = p.querySelector('button, a, input');
    setTimeout(() => f && f.focus(), 60);
  }
  function closePanels() {
    $$('[data-panel]').forEach((el) => { el.dataset.open = 'false'; });
    const s = $('[data-scrim]');
    if (s) s.dataset.open = 'false';
    document.body.classList.remove('is-locked');
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
  }
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open-panel]');
    if (o) { e.preventDefault(); openPanel(o.dataset.openPanel); return; }
    if (e.target.closest('[data-close-panel]') || e.target.matches('[data-scrim]')) closePanels();
  });

  /* ---------------- mega menu ---------------- */
  const megaWrap = $('[data-mega-wrap]');
  if (megaWrap) {
    let hideTimer;
    const setMega = (id) => {
      $$('[data-mega]').forEach((m) => { m.dataset.open = String(m.dataset.mega === id); });
      $$('[data-mega-trigger]').forEach((t) => {
        const on = t.dataset.megaTrigger === id;
        t.setAttribute('aria-expanded', String(on));
        t.closest('[data-mega-item]')?.classList.toggle('navitem--open', on);
      });
    };
    $$('[data-mega-trigger]').forEach((t) => {
      const item = t.closest('[data-mega-item]') || t;
      const show = () => { clearTimeout(hideTimer); setMega(t.dataset.megaTrigger); };
      item.addEventListener('mouseenter', show);
      t.addEventListener('focus', show);
      t.addEventListener('click', (e) => {
        e.preventDefault();
        const open = t.getAttribute('aria-expanded') === 'true';
        setMega(open ? null : t.dataset.megaTrigger);
      });
    });
    const scheduleHide = () => { hideTimer = setTimeout(() => setMega(null), 160); };
    megaWrap.addEventListener('mouseleave', scheduleHide);
    $$('[data-mega]').forEach((m) => {
      m.addEventListener('mouseenter', () => clearTimeout(hideTimer));
      m.addEventListener('mouseleave', scheduleHide);
    });
    megaWrap.addEventListener('focusout', (e) => {
      if (!megaWrap.contains(e.relatedTarget)) setMega(null);
    });
  }

  /* ---------------- disclosure (accordions + mobile nav) ---------------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-disclose]');
    if (!b) return;
    const panel = $('#' + b.getAttribute('aria-controls'));
    if (!panel) return;
    const open = b.getAttribute('aria-expanded') === 'true';
    if (b.dataset.disclose === 'exclusive') {
      const group = b.closest('[data-disclose-group]');
      if (group) {
        $$('[data-disclose]', group).forEach((o) => {
          if (o === b) return;
          o.setAttribute('aria-expanded', 'false');
          const op = $('#' + o.getAttribute('aria-controls'));
          if (op) op.dataset.open = 'false';
        });
      }
    }
    b.setAttribute('aria-expanded', String(!open));
    panel.dataset.open = String(!open);
  });

  /* ---------------- header scroll state ---------------- */
  const hdr = $('.hdr');
  if (hdr) {
    let scrolled = null, queued = false;
    const apply = () => {
      queued = false;
      const next = window.scrollY > 8;
      if (next === scrolled) return;   // only touch the DOM when it actually changes
      scrolled = next;
      hdr.dataset.scrolled = String(next);
    };
    apply();
    addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    }, { passive: true });
  }

  /* ---------------- ribbon: stop animating once off-screen ---------------- */
  {
    const ribbons = $$('[data-ribbon]');
    if (ribbons.length && 'IntersectionObserver' in window) {
      const rio = new IntersectionObserver((entries) => {
        entries.forEach((en) => { en.target.dataset.paused = String(!en.isIntersecting); });
      }, { threshold: 0 });
      ribbons.forEach((r) => rio.observe(r));
    }
  }

  /* ---------------- reveal on scroll ---------------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealables = $$('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const sibs = [...(en.target.parentElement?.children || [])].filter((c) => c.hasAttribute('data-reveal'));
        const i = Math.max(0, sibs.indexOf(en.target));
        en.target.style.setProperty('--d', Math.min(i, 4) * 35 + 'ms');
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '140px 0px 60px 0px', threshold: 0 });
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------------- deferred hover images ----------------
     The second card image only ever shows on hover, so it carries no src until
     the pointer arrives. On touch devices it is never requested at all, which
     halves image bytes on the grid pages. */
  {
    const load = (card) => {
      const img = card.querySelector('img[data-hover-src]');
      if (!img) return;
      img.src = img.dataset.hoverSrc;
      delete img.dataset.hoverSrc;
    };
    const onEnter = (e) => {
      const card = e.target.closest?.('.card');
      if (card) load(card);
    };
    document.addEventListener('pointerenter', onEnter, true);
    document.addEventListener('focusin', onEnter);
  }

  /* ---------------- PDP gallery ---------------- */
  const gal = $('[data-gallery]');
  if (gal) {
    const main = $('[data-gallery-main]', gal);
    $$('[data-gallery-thumb]', gal).forEach((t) => {
      t.addEventListener('click', () => {
        main.src = t.dataset.full;
        main.alt = t.dataset.alt || '';
        $$('[data-gallery-thumb]', gal).forEach((o) => o.setAttribute('aria-current', String(o === t)));
      });
    });
  }

  /* ---------------- quantity input ---------------- */
  $$('[data-qty-input]').forEach((wrap) => {
    const input = $('input', wrap);
    $$('button', wrap).forEach((b) => b.addEventListener('click', () => {
      const next = (parseInt(input.value, 10) || 1) + Number(b.dataset.step);
      input.value = Math.max(1, Math.min(99, next));
    }));
  });

  /* ---------------- shop filters ---------------- */
  const shop = $('[data-shop]');
  if (shop) {
    const cards = $$('[data-card]', shop);
    const countEl = $('[data-result-count]');
    const sortEl = $('[data-sort]');
    const grid = $('[data-grid]', shop);
    const state = { cat: 'all', concern: 'all' };

    const params = new URLSearchParams(location.search);
    if (params.get('cat')) state.cat = params.get('cat');
    if (params.get('concern')) state.concern = params.get('concern');

    function apply() {
      let shown = 0;
      cards.forEach((c) => {
        const okCat = state.cat === 'all' || c.dataset.cat === state.cat;
        const okCon = state.concern === 'all' || (c.dataset.concerns || '').split(' ').includes(state.concern);
        const ok = okCat && okCon;
        c.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = `${shown} ${shown === 1 ? 'product' : 'products'}`;
      $$('[data-filter]').forEach((b) => {
        const [k, v] = b.dataset.filter.split(':');
        b.setAttribute('aria-pressed', String(state[k] === v));
      });
      const empty = $('[data-shop-empty]');
      if (empty) empty.hidden = shown > 0;
    }

    $$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
      const [k, v] = b.dataset.filter.split(':');
      state[k] = state[k] === v ? 'all' : v;
      apply();
      const u = new URL(location.href);
      Object.entries(state).forEach(([kk, vv]) => vv === 'all' ? u.searchParams.delete(kk) : u.searchParams.set(kk, vv));
      history.replaceState(null, '', u);
    }));

    if (sortEl) sortEl.addEventListener('change', () => {
      const v = sortEl.value;
      const sorted = cards.slice().sort((a, b) => {
        const pa = Number(a.dataset.price), pb = Number(b.dataset.price);
        if (v === 'price-asc') return pa - pb;
        if (v === 'price-desc') return pb - pa;
        if (v === 'az') return a.dataset.title.localeCompare(b.dataset.title);
        if (v === 'newest') return Number(b.dataset.published) - Number(a.dataset.published);
        return Number(a.dataset.index) - Number(b.dataset.index);
      });
      sorted.forEach((c) => grid.appendChild(c));
    });

    apply();
  }

  /* ---------------- search ---------------- */
  const search = $('[data-search]');
  if (search) {
    const input = $('input', search);
    const out = $('[data-search-results]', search);
    const seed = $('[data-search-seed]', search);
    let active = -1;

    const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s]/g, ' ');
    function run(q) {
      const terms = norm(q).split(/\s+/).filter(Boolean);
      if (!terms.length) { out.innerHTML = ''; if (seed) seed.hidden = false; active = -1; return; }
      if (seed) seed.hidden = true;
      const hits = CATALOG.map((p) => {
        const hay = norm([p.t, p.c, p.b, (p.k || []).join(' ')].join(' '));
        let score = 0;
        for (const t of terms) {
          if (!hay.includes(t)) return null;
          score += norm(p.t).startsWith(t) ? 3 : norm(p.t).includes(t) ? 2 : 1;
        }
        return { p, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);

      out.innerHTML = hits.length
        ? hits.map(({ p }) => `<a class="sr-item" href="${BASE}${p.u}">
            <img src="${BASE}${p.i}" alt="" loading="lazy" width="56" height="70">
            <div><div class="sr-item__t">${p.t}</div><div class="sr-item__m">${p.c}</div></div>
            <div class="num small">${money(p.p)}</div></a>`).join('')
        : `<p class="muted small">No products match “${q.replace(/[<>&]/g, '')}”. Try “serum”, “acne”, “niacinamide” or “hair”.</p>`;
      active = -1;
    }

    let t;
    input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => run(input.value), 90); });
    input.addEventListener('keydown', (e) => {
      const items = $$('.sr-item', out);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!items.length) return;
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach((it, i) => it.classList.toggle('is-active', i === active));
        items[active].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && active > -1 && items[active]) {
        location.href = items[active].href;
      }
    });

    const open = () => {
      search.dataset.open = 'true';
      document.body.classList.add('is-locked');
      setTimeout(() => input.focus(), 80);
    };
    const close = () => {
      search.dataset.open = 'false';
      document.body.classList.remove('is-locked');
    };
    $$('[data-open-search]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); open(); }));
    $$('[data-close-search]', search).forEach((b) => b.addEventListener('click', close));
    search.addEventListener('click', (e) => { if (e.target === search) close(); });
    addEventListener('keydown', (e) => {
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });
  }

  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closePanels();
    const s = $('[data-search]');
    if (s && s.dataset.open === 'true') { s.dataset.open = 'false'; document.body.classList.remove('is-locked'); }
  });

  /* ---------------- routine builder ---------------- */
  const rb = $('[data-routine]');
  if (rb) {
    const answers = {};
    const steps = $$('[data-rb-step]', rb);
    const resultEl = $('[data-rb-result]', rb);
    const progress = $('[data-rb-progress]', rb);
    let idx = 0;

    function show(i) {
      idx = i;
      steps.forEach((s, k) => { s.hidden = k !== i; });
      if (progress) progress.style.width = ((i / steps.length) * 100) + '%';
      resultEl.hidden = true;
      rb.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    }

    $$('[data-rb-opt]', rb).forEach((b) => b.addEventListener('click', () => {
      const step = b.closest('[data-rb-step]');
      answers[step.dataset.rbStep] = b.dataset.rbOpt;
      $$('[data-rb-opt]', step).forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
      if (idx < steps.length - 1) show(idx + 1); else finish();
    }));
    $$('[data-rb-back]', rb).forEach((b) => b.addEventListener('click', () => show(Math.max(0, idx - 1))));
    $$('[data-rb-restart]', rb).forEach((b) => b.addEventListener('click', () => {
      $$('[data-rb-opt]', rb).forEach((o) => o.setAttribute('aria-pressed', 'false'));
      show(0);
    }));

    function finish() {
      const concern = answers.concern || 'brightening';
      const depth = answers.depth || 'core';
      const budgetCap = { low: 3000, mid: 5000, any: Infinity }[answers.budget || 'any'];

      // One product per routine step, chosen from the products that actually
      // carry that concern, cheapest-first within the budget the user picked.
      const wanted = depth === 'full' ? [1, 2, 3, 4, 5] : [1, 3, 5];
      const picks = [];
      const used = new Set();
      for (const step of wanted) {
        const pool = CATALOG
          .filter((p) => p.s === step && !used.has(p.h))
          .sort((a, b) => {
            const am = a.n.includes(concern) ? 0 : 1, bm = b.n.includes(concern) ? 0 : 1;
            if (am !== bm) return am - bm;
            if (am === 1 && a.r !== b.r) return a.r - b.r;
            const ao = a.p <= budgetCap ? 0 : 1, bo = b.p <= budgetCap ? 0 : 1;
            if (ao !== bo) return ao - bo;
            if (a.r !== b.r) return a.r - b.r;
            return a.p - b.p;
          });
        if (pool[0]) { picks.push({ step, p: pool[0] }); used.add(pool[0].h); }
      }

      const total = picks.reduce((a, x) => a + x.p.p, 0);
      const labels = { 1: 'Cleanse', 2: 'Tone', 3: 'Treat', 4: 'Moisturise', 5: 'Protect' };
      $('[data-rb-list]', rb).innerHTML = picks.map(({ step, p }) => `
        <li class="line">
          <a class="line__img" href="${BASE}${p.u}"><img src="${BASE}${p.i}" alt="" loading="lazy" width="76" height="95"></a>
          <div>
            <div class="micro" style="color:var(--pink)">Step ${step} · ${labels[step]}</div>
            <a class="line__t" href="${BASE}${p.u}">${p.t}</a>
            <div class="line__meta">${p.b}</div>
          </div>
          <div class="line__price num">${money(p.p)}</div>
        </li>`).join('');
      $('[data-rb-total]', rb).textContent = money(total);
      $('[data-rb-count]', rb).textContent = picks.length;
      const addAll = $('[data-rb-addall]', rb);
      addAll.onclick = () => { picks.forEach(({ p }) => addToCart(p.h, 1)); };

      steps.forEach((s) => { s.hidden = true; });
      resultEl.hidden = false;
      if (progress) progress.style.width = '100%';
      resultEl.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }

    show(0);
  }

  /* ---------------- newsletter / contact (concept only) ---------------- */
  $$('[data-demo-form]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    toast(f.dataset.demoForm || 'Thanks — this is a concept demo.');
    f.reset();
  }));

  renderCart();
})();
