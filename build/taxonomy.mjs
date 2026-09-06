// Curated merchandising layer.
//
// The live store ships 45 products with empty product_type, empty tags and a
// single collection containing one item, so every axis a customer might shop
// along has to be authored here. Rules followed throughout:
//   * `title` is never changed - it is the SKU's identity on the real store.
//   * `blurb`, `benefits`, `ingredients`, `howTo`, `size` only ever restate
//     what the brand already publishes in its own product copy.
//   * Nothing is invented. No reviews, ratings, awards, certifications,
//     customer counts or endorsements appear anywhere in this build.

// The brand's own published claims, carried through as written on pinklady.lk.
// They are listed here so the team can see them collected in one place and
// decide for themselves what to keep - they are NOT removed from the site.
export const BRAND_CLAIMS = [
  '"Permanent skin colour" - Body Whitening Combo, Bridal Whitening Body Lotion',
  '"5-7 days visible results" - five products',
  '"10kg weightloss in 1 month" - Weightloss Tea',
  '"Results start with the 1st day of use" - Pinkish Double Whitening Night Cream',
  '"Visible results in as little as 5 days" - Pinkish Foreign Skin Combo',
];

export const CATEGORIES = {
  cleanse:    { title: 'Cleansers',            short: 'Cleanse',    blurb: 'Face washes and cleansing bars that take the day off without stripping the barrier.' },
  treat:      { title: 'Serums & Treatments',  short: 'Treat',      blurb: 'Concentrated actives. The step that does the actual work.' },
  tone:       { title: 'Toners',               short: 'Tone',       blurb: 'Post-cleanse conditioning that preps skin for everything after it.' },
  mask:       { title: 'Masks & Exfoliants',   short: 'Mask',       blurb: 'Weekly resets. Packs and scrubs for texture, congestion and glow.' },
  moisturise: { title: 'Creams & Moisturisers',short: 'Moisturise', blurb: 'Day and night creams that seal the routine in.' },
  sun:        { title: 'Sun Care',             short: 'Protect',    blurb: 'Daily UV defence. The one step that protects every other step.' },
  body:       { title: 'Body & Targeted',      short: 'Body',       blurb: 'Everything below the jawline, plus the areas most ranges ignore.' },
  hair:       { title: 'Hair & Scalp',         short: 'Hair',       blurb: 'Scalp-first hair care. Wash, condition, treat.' },
  lips:       { title: 'Lip Care',             short: 'Lips',       blurb: 'Scrub, treat, tint. A small routine of its own.' },
  wellness:   { title: 'Wellness',             short: 'Wellness',   blurb: 'Ingestible support, taken alongside the topical routine.' },
  sets:       { title: 'Sets & Routines',      short: 'Sets',       blurb: 'Pre-built routines at a single price. The easiest place to start.' },
};

export const CATEGORY_ORDER = ['sets', 'cleanse', 'tone', 'treat', 'moisturise', 'sun', 'mask', 'body', 'hair', 'lips', 'wellness'];

export const CONCERNS = {
  brightening: { title: 'Dullness & Uneven Tone', short: 'Uneven tone', blurb: 'For pigmentation, dark marks and tone that has gone flat.' },
  acne:        { title: 'Acne & Congestion',      short: 'Acne',        blurb: 'For active breakouts, oil, clogged pores and the marks they leave.' },
  glow:        { title: 'Dryness & Dullness',     short: 'Dryness',     blurb: 'For skin that feels tight, rough or short on bounce.' },
  hair:        { title: 'Hair & Scalp',           short: 'Hair fall',   blurb: 'For hair fall, dandruff, dryness and sparse lashes or brows.' },
  body:        { title: 'Body & Sensitive Areas', short: 'Body',        blurb: 'For elbows, knees, underarms, bikini line and feet.' },
  lips:        { title: 'Lips',                   short: 'Lips',        blurb: 'For dryness, flaking and darkened or uneven lip tone.' },
  sun:         { title: 'Sun Protection',         short: 'Sun',         blurb: 'For daily UV exposure and preventing new pigmentation.' },
  wellness:    { title: 'Inside-Out Support',     short: 'Wellness',    blurb: 'Supplements taken alongside a topical routine.' },
};

export const CONCERN_ORDER = ['brightening', 'acne', 'glow', 'body', 'hair', 'lips', 'sun', 'wellness'];

// The routine ladder driving the Routine Builder and the PDP "where this fits" strip.
export const STEPS = [
  { n: 1, key: 'cleanse',    label: 'Cleanse',    note: 'Twice daily' },
  { n: 2, key: 'tone',       label: 'Tone',       note: 'After cleansing' },
  { n: 3, key: 'treat',      label: 'Treat',      note: 'The active step' },
  { n: 4, key: 'moisturise', label: 'Moisturise', note: 'Seal it in' },
  { n: 5, key: 'protect',    label: 'Protect',    note: 'Mornings only' },
];

// Ingredient dictionary. Every entry appears by name in the brand's own copy.
export const INGREDIENTS = {
  'Alpha Arbutin':       'Interrupts tyrosinase, the enzyme behind melanin production. Used at 2% in the Pinkish face serum.',
  'Niacinamide':         'Vitamin B3. Supports the barrier, regulates oil and evens the look of tone. Used at 4% in the Pinkish face serum.',
  'Vitamin C':           'An antioxidant brightener, used across the toner, the Vit-C pack and the lightening soap.',
  'Kojic Acid':          'A brightening acid, paired with niacinamide in the Blush Pink scrub.',
  'Tea Tree Oil':        'Targets acne-causing bacteria. The backbone of the acne serum, face wash and charcoal soap.',
  'Allantoin':           'Calms irritated skin and helps shed dead cells. Runs through the acne range.',
  'Salicylic Acid':      'A BHA that exfoliates the scalp and lifts dandruff flakes.',
  'Activated Charcoal':  'Draws oil and impurities out of congested skin.',
  'Glutathione':         'Taken as a supplement alongside collagen for skin support.',
  'Collagen':            'Supports skin elasticity as it changes with age.',
  'Saffron':             'The active in the Glow Gel, used for radiance.',
  'Glycerin':            'A humectant that holds water in the skin.',
  'Arrowroot':           'A soft natural powder that softens the grit in the Blush Pink scrub.',
  'Caffeine':            'Used in under-eye formulas to reduce the look of puffiness.',
  'Apple Cider Vinegar': 'The active in the ACV gummies.',
};

// Per-product editorial. `blurb` is a written line for hierarchy; `benefits`
// are compressed from the brand's own bullets; `ingredients` lists only the
// actives the brand names for that specific product.
export const PRODUCTS = {
  'body-whitening-combo-offer': {
    cat: 'sets', concerns: ['brightening', 'body'], badge: 'Full body routine',
    blurb: 'The complete body-brightening routine, bundled at one price.',
    benefits: ['For a pinkish whitening skin', '5-7 days visible results', 'Permanent skin colour', 'A full body routine in a single purchase', 'Suits all skin types'],
  },
  'pimple-cure-whitening-combo': {
    cat: 'sets', concerns: ['acne', 'brightening'], badge: 'Two concerns, one set',
    blurb: 'Pairs the acne range with the brightening range, for skin dealing with both.',
    benefits: ['Targets active breakouts and uneven tone together', 'Removes the guesswork of pairing products'],
  },
  'combo-offer-1': {
    cat: 'sets', concerns: ['brightening'], badge: 'Cleanse + night cream', size: 'Face wash 120 ml',
    blurb: 'Bridal Whitening Night Cream with the Niacinamide Whitening Face Wash.',
    benefits: ['Bridal Whitening Night Cream paired with its matching cleanser', 'Niacinamide Whitening Face Wash, 120 ml', 'A complete evening routine'],
  },
  'combo-offer': {
    cat: 'sets', concerns: ['brightening'], badge: 'Cleanse + cream',
    blurb: 'Pinkish Double Whitening Face Cream with the Niacinamide Face Wash.',
    benefits: ['Pinkish Double Whitening Face Cream and Niacinamide Face Wash', 'Cleanser and treatment cream matched as a pair'],
  },
  'pinkish-foreign-skin-combo-offer': {
    cat: 'sets', concerns: ['brightening', 'acne'], badge: 'Complete face routine',
    blurb: 'The full Pinkish face routine. Tone, clarity and glow in one set.',
    benefits: ['Visible results in as little as 5 days', 'Helps fade the look of pigmentation', 'Helps clear pimples and acne marks', 'Controls excess oil', 'Brightens and smoothens the look of skin', 'Suits all skin types'],
  },

  'activated-charcoal-tea-tree-soap': {
    cat: 'cleanse', concerns: ['acne'], step: 1, badge: 'Activated Charcoal', size: '50 g',
    blurb: 'A deep-cleansing bar for oily, congested skin.',
    benefits: ['Cleans dirt, oil and pollution from deep in the skin', 'Helps control excess oil production', 'Helps reduce the formation of pimples and blemishes', 'Keeps skin feeling fresh and clean', 'Suitable for all skin types'],
    ingredients: ['Activated Charcoal', 'Tea Tree Oil'],
    note: 'The brand publishes this product’s full benefit list in Tamil on the live store.',
  },
  'tea-tree-face-wash-for-pimple-skin': {
    rank: 1, cat: 'cleanse', concerns: ['acne'], step: 1, badge: 'Tea Tree',
    blurb: 'A daily wash for oily and acne-prone skin.',
    benefits: ['Helps reduce pimples and acne by targeting acne-causing bacteria', 'Controls excess oil and prevents clogged pores', 'Deeply cleanses dirt, oil and impurities', 'Soothes redness, irritation and inflammation', 'Helps fade acne marks and improve skin clarity'],
    ingredients: ['Tea Tree Oil'],
    howTo: 'Use twice daily. Best for oily and acne-prone skin.',
  },
  'niacinamide-whitening-face-wash-1': {
    rank: 1, cat: 'cleanse', concerns: ['brightening', 'glow'], step: 1, badge: 'Niacinamide', size: '120 ml',
    blurb: 'A brightening daily cleanser for oily and combination skin.',
    benefits: ['Helps reduce dullness for a fresher look', 'Balances oil, suiting oily and combination skin', 'Deep cleansing without over-drying', 'Helps fade the look of dark spots and pigmentation over time', 'Supports the skin barrier'],
    ingredients: ['Niacinamide'],
  },
  'niacinamide-whitening-face-wash': {
    cat: 'cleanse', concerns: ['brightening'], step: 1, badge: 'Niacinamide',
    blurb: 'The larger-format niacinamide cleanser.',
    benefits: ['Gently cleanses dirt, excess oil and impurities', 'Helps brighten and even the appearance of skin tone', 'Helps improve skin clarity with regular use', 'Maintains moisture balance without over-drying'],
    ingredients: ['Niacinamide'],
  },
  'fairness-face-wash': {
    cat: 'cleanse', concerns: ['brightening', 'glow'], step: 1, badge: 'Niacinamide',
    blurb: 'An entry-price brightening cleanser for everyday use.',
    benefits: ['Gently removes dirt, oil and impurities', 'Enriched with niacinamide to help improve brightness and clarity', 'Helps promote a more even-looking skin tone', 'Maintains the skin’s natural moisture balance'],
    ingredients: ['Niacinamide'],
  },
  'vit-c-skin-lightening-soap': {
    cat: 'cleanse', concerns: ['brightening'], step: 1, badge: 'Vitamin C', size: '60 g',
    blurb: 'A vitamin C cleansing bar for face and body.',
    benefits: ['Helps brighten and improve skin appearance', 'Cleanses dirt, oil and impurities', 'Supports a more even-looking tone with regular use', 'Helps reduce the appearance of acne, marks and blemishes'],
    ingredients: ['Vitamin C'],
  },
  'anti-acne-soap': {
    cat: 'cleanse', concerns: ['acne'], step: 1, badge: 'Allantoin',
    blurb: 'A calming cleansing bar for inflamed, breakout-prone skin.',
    benefits: ['Allantoin calms irritated and inflamed skin, reducing the look of redness', 'Removes excess sebum and impurities, tightening the look of pores', 'Helps shed dead skin cells, smoothing rough or flaky texture', 'Keeps skin moisturised while cleansing'],
    ingredients: ['Allantoin'],
  },
  'alpha-arbutin-whitening-soap': {
    cat: 'cleanse', concerns: ['brightening'], step: 1, badge: 'Alpha Arbutin',
    blurb: 'An alpha arbutin bar aimed at dark marks and uneven tone.',
    benefits: ['Helps lighten the look of dark spots, acne marks and freckles', 'Promotes a more uniform-looking complexion', 'Alpha arbutin inhibits tyrosinase, the enzyme behind melanin production', 'Gentle formula, generally less irritating', 'Supports smoother-looking texture'],
    ingredients: ['Alpha Arbutin'],
  },

  'acne-serum': {
    rank: 1, cat: 'treat', concerns: ['acne'], step: 3, badge: 'Tea Tree + Allantoin',
    blurb: 'The brand’s core acne treatment. Tea tree oil with allantoin.',
    benefits: ['Helps reduce pimples and acne breakouts', 'Soothes redness and irritated skin', 'Helps control excess oil production', 'Supports faster healing of acne marks', 'Helps reduce whiteheads and blackheads', 'Improves overall skin texture'],
    ingredients: ['Tea Tree Oil', 'Allantoin'],
  },
  'pinkish-face-serum-2-x-fast-whitening': {
    rank: 1, cat: 'treat', concerns: ['brightening'], step: 3, badge: '2% Alpha Arbutin · 4% Niacinamide',
    blurb: 'The most concentrated brightening formula in the range.',
    benefits: ['Reduces the appearance of dark spots and hyperpigmentation', 'Helps even out skin tone and discoloration', 'Enhances glow for a healthy pinkish radiance', '4% niacinamide supports the barrier and improves texture', 'Lightweight formula'],
    ingredients: ['Alpha Arbutin', 'Niacinamide'],
  },
  'under-eye-dark-circles-removing-serum': {
    cat: 'treat', concerns: ['brightening', 'glow'], step: 3, badge: 'Niacinamide + Caffeine',
    blurb: 'A targeted serum for the under-eye area.',
    benefits: ['Niacinamide helps limit melanin settling in the under-eye area', 'Caffeine helps reduce the look of morning puffiness', 'Hydrates and smooths the delicate under-eye skin'],
    ingredients: ['Niacinamide', 'Caffeine'],
    howTo: 'Apply daily, tapping gently onto the under-eye area after cleansing.',
  },
  'eyelash-brows-growth-oil': {
    cat: 'treat', concerns: ['hair'], step: 3, badge: 'Lashes & brows',
    blurb: 'A conditioning oil for lashes and brows.',
    benefits: ['Helps nourish lashes and brows from root to tip', 'Supports the appearance of longer-looking, fuller lashes with regular use', 'Helps improve the look of thin or sparse brows', 'Reduces the appearance of breakage', 'Lightweight, absorbs easily'],
  },

  'body-whitening-toner': {
    cat: 'tone', concerns: ['brightening', 'body'], badge: 'For body',
    blurb: 'A brightening toner formulated for the body rather than the face.',
    benefits: ['A body toner aimed at areas of darkness and uneven tone'],
  },
  'untitled-jan4_23-33': {
    rank: 1, cat: 'tone', concerns: ['glow'], step: 2, badge: 'Pore refining',
    blurb: 'A high-strength toner aimed at the look of open pores.',
    benefits: ['Helps reduce the appearance of open pores with continuous use', 'Preps skin after cleansing'],
  },
  'face-whitening-toner': {
    rank: 1, cat: 'tone', concerns: ['brightening', 'glow'], step: 2, badge: 'Vitamin C',
    blurb: 'A vitamin C toner for daily use, morning and evening.',
    benefits: ['Results in 5-7 days', 'Vitamin C helps reduce the look of dullness and pigmentation', 'Glycerin locks in moisture for plumper-looking skin', 'Gentle formula suitable for all skin types', 'Refreshing and soothing'],
    ingredients: ['Vitamin C', 'Glycerin'],
    howTo: 'Use daily after cleansing, morning and evening.',
  },

  'skin-whitening-vit-c-pack': {
    cat: 'mask', concerns: ['brightening'], badge: 'Vitamin C',
    blurb: 'A vitamin C face pack for dull, congested skin.',
    benefits: ['Helps improve radiance and gives a fresh, glowing look', 'Supports a clearer, more balanced appearance', 'Vitamin C helps skin look smoother', 'Deep cleansing, removing dirt and excess oil from pores'],
    ingredients: ['Vitamin C'],
  },
  'skin-whitening-face-pack': {
    cat: 'mask', concerns: ['brightening'], badge: 'Weekly reset', size: '100 g',
    blurb: 'A weekly brightening and resurfacing pack.',
    benefits: ['Helps enhance glow and reduce the look of dullness', 'Gently exfoliates to reveal fresh, smooth skin', 'Reduces the appearance of open pores', 'Suitable for normal, dry, oily and combination skin'],
  },
  'pimple-pack': {
    cat: 'mask', concerns: ['acne'], badge: 'For breakouts', size: '100 g',
    blurb: 'A clarifying pack for congested, breakout-prone skin.',
    benefits: ['Helps cleanse pores and remove excess oil', 'Supports a reduction in the appearance of acne-prone skin', 'Helps control sebum and shine', 'Calms stressed and congested skin', 'Tightens the look of pores'],
  },
  'blush-pink-whitening-scrub': {
    cat: 'mask', concerns: ['brightening', 'glow'], badge: 'Niacinamide + Kojic Acid',
    blurb: 'A fine-grain exfoliating scrub with brightening actives.',
    benefits: ['Gently removes dead skin cells', 'Niacinamide and kojic acid support a brighter, more even-looking complexion', 'Fine scrubbing powder for effective but mild exfoliation', 'Glycerin keeps skin soft and hydrated', 'Allantoin supports comfort during exfoliation'],
    ingredients: ['Niacinamide', 'Kojic Acid', 'Glycerin', 'Allantoin', 'Arrowroot'],
  },

  'pinkish-double-whitening-face-night-cream': {
    rank: 1, cat: 'moisturise', concerns: ['brightening'], step: 4, badge: 'Night cream', size: '30 g',
    blurb: 'The brand’s concentrated overnight brightening cream.',
    benefits: ['Results start with the 1st day of use', 'Super fast extra whitening', 'Helps fade the appearance of marks and pigmentation', 'Helps reduce pimples', 'Works toward a glass-skin, glowing finish'],
  },
  'bridal-fast-whitening-night-face-cream': {
    cat: 'moisturise', concerns: ['brightening'], step: 4, badge: 'Night cream',
    blurb: 'An overnight cream from the bridal range.',
    benefits: ['Reduces the appearance of dark spots and hyperpigmentation', 'Evens the look of skin tone', 'Brightens dull-looking skin', 'Smooths texture', 'Hydrates and protects'],
  },
  'skin-lightening-day-cream': {
    cat: 'moisturise', concerns: ['brightening', 'glow'], step: 4, badge: 'Vitamin C day cream',
    blurb: 'A daytime brightening cream with vitamin C.',
    benefits: ['5-7 days visible results', 'Brightens dull-looking skin with vitamin C', 'Helps fade the look of dark spots and pimple marks', 'Provides daily hydration and smoothness', 'Gives an immediate glow'],
    ingredients: ['Vitamin C'],
    note: 'The brand notes UVA/UVB filters are present in some variants. Pair with Sun Shield SPF 50+ for full daytime protection.',
  },
  'untitled-may3_19-47': {
    rank: 1, cat: 'moisturise', concerns: ['glow'], step: 4, badge: 'Saffron',
    blurb: 'A lightweight saffron gel for skin that wants moisture without weight.',
    benefits: ['Helps skin look brighter, fresher and more radiant', 'Supports a clear, balanced complexion with regular use', 'Gel texture gives lightweight moisture without greasiness', 'Soothes dull and tired skin', 'Improves the feel of skin texture'],
    ingredients: ['Saffron'],
  },

  'sun-shield-spf-50': {
    cat: 'sun', concerns: ['sun', 'brightening'], step: 5, badge: 'SPF 50+',
    blurb: 'Daily broad-spectrum protection. The step that protects every other step.',
    benefits: ['High sun protection at SPF 50+', 'Helps protect against UVA and UVB rays, reducing sunburn and long-term damage', 'Regular use helps minimise dark spots, uneven tone and sun-induced pigmentation', 'Suitable for everyday exposure, including short outdoor activities', 'Lightweight and comfortable for daily wear'],
  },

  'bridal-whitening-body-lotion': {
    cat: 'body', concerns: ['brightening', 'body', 'glow'], badge: 'Bridal range',
    blurb: 'The most premium body formula in the range.',
    benefits: ['Foreign pinkish skin colour', '5-7 days visible results', 'Permanent skin colour', 'Helps reduce dullness and gives a natural glow', 'Gives a soft pinkish radiance — the brand describes this as healthy-looking rather than artificial whitening', 'Deep moisturisation, keeping skin smooth and hydrated', 'Improves the look of rough areas like elbows and knees', 'Suitable for all skin types'],
  },
  'body-whitening-wash': {
    cat: 'body', concerns: ['brightening', 'body'], badge: 'Body cleanser', size: '200 ml',
    blurb: 'A brightening body wash for everyday showering.',
    benefits: ['Helps improve dull-looking skin and gives a healthy glow', 'Gently removes dirt, sweat, excess oil and impurities', 'Supports a more uniform-looking body skin tone with regular use', 'Helps keep skin soft and hydrated after bathing'],
  },
  'face-body-whitening-oil': {
    cat: 'body', concerns: ['brightening', 'body', 'glow'], badge: 'Herbal extracts', size: '100 ml',
    blurb: 'A herbal oil that works on both face and body.',
    benefits: ['Helps moisturise and deeply nourish skin', 'Supports a brighter, more even-looking tone with regular use', 'Enriched with herbal extracts', 'Helps reduce the appearance of dryness and dullness', 'Lightweight oil that spreads easily'],
  },
  'underarm-bikini-whitening-cream': {
    cat: 'body', concerns: ['brightening', 'body'], badge: 'Sensitive areas',
    blurb: 'Formulated specifically for underarms, bikini line and knees.',
    benefits: ['5-7 days visible results', 'Targets the look of pigmentation and dark spots in delicate areas', 'Odour control — acts like a natural deodorant', 'Nourishes delicate skin, leaving it smooth and supple', 'Formulated for underarms, bikini line, knees and other delicate zones'],
  },
  'foot-care': {
    cat: 'body', concerns: ['body'], badge: 'Cracked heels',
    blurb: 'A repair treatment for cracked heels and very dry feet.',
    benefits: ['Helps repair rough heels and very dry skin', 'Deep moisturising care', 'Improves the appearance of hard skin with regular use', 'Relieves dryness-related discomfort'],
  },
  'herbal-body-hair-removal-spray': {
    cat: 'body', concerns: ['body'], badge: 'Depilatory',
    blurb: 'A spray-on hair removal treatment with herbal extracts.',
    benefits: ['Spray-on application — no strips or wax', 'Works in 20–25 minutes', 'For use on the body'],
    howTo: 'Wash and fully dry the area. Shake well. Spray a thin, even layer over the hair. Wait 20–25 minutes — do not exceed the stated time, and check a small area after 5 minutes. Wipe away and rinse.',
    warning: 'Patch test first. Do not exceed the stated time on skin.',
  },

  'extreme-hair-growth-oil': {
    cat: 'hair', concerns: ['hair'], badge: 'Scalp treatment',
    blurb: 'A pre-wash scalp oil for hair fall and breakage.',
    benefits: ['Helps reduce hair fall and breakage', 'Nourishes and strengthens hair roots', 'Promotes a healthy hair-growth appearance', 'Adds natural shine and softness', 'Suitable for all hair types'],
    howTo: 'Apply a small amount to scalp and hair. Massage gently for a few minutes. Leave for at least 1 hour or overnight, then wash off with shampoo.',
  },
  'aqua-dreams-shampoo': {
    cat: 'hair', concerns: ['hair'], badge: 'Everyday wash',
    blurb: 'A daily shampoo for all hair types.',
    benefits: ['Removes dirt, oil, sweat and product buildup', 'Keeps hair fresh, light and manageable', 'Helps reduce breakage with regular use', 'Leaves hair smooth, soft and naturally shiny', 'Helps maintain a clean, refreshed scalp'],
  },
  'anti-dandruff-shampoo': {
    cat: 'hair', concerns: ['hair'], badge: 'Salicylic Acid',
    blurb: 'A salicylic acid shampoo that treats the scalp, not just the hair.',
    benefits: ['Helps remove dandruff flakes by gently exfoliating the scalp', 'Loosens and lifts dead skin buildup', 'Helps reduce itching and flaking', 'Unclogs follicles by clearing excess oil and residue', 'Improves absorption of other scalp-care ingredients'],
    ingredients: ['Salicylic Acid'],
  },
  'revive-restore-conditioner': {
    cat: 'hair', concerns: ['hair'], badge: 'Everyday conditioner',
    blurb: 'The conditioning half of the wash routine.',
    benefits: ['Helps soften and smooth hair after shampooing', 'Reduces frizz and dryness, making hair more manageable', 'Helps detangle, reducing breakage during combing', 'Supports moisture balance', 'Suitable for daily use'],
  },

  'lip-oil': {
    cat: 'lips', concerns: ['lips'], badge: 'Glossy finish',
    blurb: 'A non-sticky lip oil with a glass finish.',
    benefits: ['Deep hydration — keeps lips soft and moisturised for hours', 'Natural glossy shine without stickiness', 'Softens dry and chapped lips', 'Enhances natural lip colour', 'Forms a barrier against dryness, sun and pollution'],
  },
  'pinkish-lip-cream': {
    cat: 'lips', concerns: ['lips'], badge: 'Treatment cream',
    blurb: 'A treatment cream for dry, darkened lips.',
    benefits: ['Enhances natural pink tone', 'Deep moisturisation — keeps lips hydrated and supple', 'Repairs dry and chapped lips', 'Helps improve the look of dark or uneven lip colour over time', 'Forms a protective layer'],
  },
  'lip-lightening-strawberry-scrub': {
    cat: 'lips', concerns: ['lips'], badge: 'Strawberry',
    blurb: 'The exfoliating first step of the lip routine.',
    benefits: ['Gently exfoliates lips to remove dead skin cells', 'Helps improve the appearance of dark or pigmented lips with regular use', 'Reveals smoother, softer lips', 'Strawberry extracts refresh the lip surface', 'Preps lips so creams and balms absorb better'],
  },

  'glutathione-collagen-glow': {
    cat: 'wellness', concerns: ['wellness', 'brightening'], badge: 'Supplement',
    blurb: 'A glutathione and collagen supplement taken alongside the topical routine.',
    benefits: ['Collagen supports skin elasticity as it changes with age', 'Provides ingredients used in skin cell regeneration', 'Taken as support alongside topical skincare'],
    ingredients: ['Glutathione', 'Collagen'],
    warning: 'A dietary supplement, not a medicine. Consult a doctor before use if pregnant, nursing or taking medication.',
  },
  'untitled-may3_21-10': {
    cat: 'wellness', concerns: ['wellness'], badge: 'Supplement',
    blurb: 'Apple cider vinegar in gummy form.',
    benefits: ['Apple cider vinegar extract supports energy metabolism', 'Intended to support a diet and weight-management routine'],
    ingredients: ['Apple Cider Vinegar'],
    warning: 'A dietary supplement, not a medicine. Works alongside diet and exercise. Consult a doctor before use if pregnant, nursing or taking medication.',
  },
  'weightloss-tea': {
    cat: 'wellness', concerns: ['wellness'], badge: 'Supplement',
    blurb: 'A black and green tea blend for weight-management support.',
    benefits: ['10kg weight loss in 1 month', 'Supports healthy weight management alongside a balanced diet and exercise', 'May help support metabolism', 'Supports digestion and helps reduce bloating', 'Rich in natural antioxidants from black and green tea'],
    warning: 'A dietary supplement, not a medicine. Works alongside diet and exercise. Consult a doctor before use if pregnant, nursing or taking medication.',
  },
};
