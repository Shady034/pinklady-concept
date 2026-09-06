// Art direction over the brand's image library.
//
// The concept now carries the store's full image set - all 99 images, including
// the before/after composites and the campaign posters. Nothing is withheld;
// Pink Lady sees their own library as it stands and decides what to reshoot.
//
// What remains here is ordering, not exclusion: HERO_IMAGE names the frame that
// leads a product card where the first upload is not the strongest one, so the
// grid reads as a considered range rather than a folder listing.

export const EXCLUDE = {};
export const NEEDS_ART = {};

// Card-leading image (1-based) where a later frame is the better shopfront.
// Every image still appears in the product gallery.
export const HERO_IMAGE = {
  'blush-pink-whitening-scrub': 2,
  'anti-acne-soap': 2,
  'alpha-arbutin-whitening-soap': 2,
  'niacinamide-whitening-face-wash': 1,
  'glutathione-collagen-glow': 1,
  'lip-oil': 2,
  'face-body-whitening-oil': 1,
};

// Tonal accent per category, used by the card and PDP surfaces so the range
// reads as a family rather than 45 unrelated photographs.
export const CATEGORY_TONE = {
  sets: 'plum',
  cleanse: 'sage',
  tone: 'rose',
  treat: 'pink',
  moisturise: 'blush',
  sun: 'amber',
  mask: 'rose',
  body: 'plum',
  hair: 'sage',
  lips: 'pink',
  wellness: 'amber',
};

// Alt text, written per product because the source images carry no useful
// metadata - screen-reader users currently get filenames like "IMG-5556".
export const alt = (p, i) =>
  i === 0
    ? `${p.title} by Pink Lady`
    : `${p.title} - view ${i + 1}`;
