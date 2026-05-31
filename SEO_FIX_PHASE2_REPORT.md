# SEO Hardening — Phase 2 Report
**Date:** 2026-05-31  
**Scope:** hreflang tags · breadcrumb URL fix · related guides cross-links

---

## Files Changed

| File | Change |
|---|---|
| `src/components/SEO.jsx` | +hreflang injection block |
| `src/data/seo/kahveZincirleri.js` | breadcrumb cat + catUrl fixed |
| `src/data/seo/restoranlar.js` | breadcrumb cat + catUrl fixed |
| `src/data/seo/fastFoodRestoranlar.js` | breadcrumb cat + catUrl fixed |
| `src/data/seo/googleMapsRestoranlar.js` | breadcrumb cat + catUrl fixed |
| `src/data/seo/googleMapsKahve.js` | breadcrumb cat + catUrl fixed |
| `src/data/seo/istanbulKahveZinciri.js` | breadcrumb cat + catUrl fixed |
| `src/components/seo/TurkishLandingPage.jsx` | +useLocation, +RELATED_GUIDES, +section 6 |

---

## 1. Hreflang Behavior

### Implementation
Injected in `SEO.jsx` immediately after `<link rel="canonical">`. Stale tags cleaned before each re-injection (SPA route changes leave DOM nodes otherwise).

### Rules applied

| Page type | `hreflang="tr"` | `hreflang="en"` | `hreflang="x-default"` |
|---|---|---|---|
| `/tr/*` pages | current URL | `https://pulsaraai.com/pulsara-intel` | `https://pulsaraai.com/` |
| All other pages | — | current URL | `https://pulsaraai.com/` |

### Rationale
- `/tr/*` pages contain Turkish-specific content with no 1:1 English equivalents. `/pulsara-intel` is the closest English-language product page covering the same product.
- Main pages (`/`, `/products`, etc.) are primarily English. They serve both languages via JS toggle but Googlebot sees English on first render — `hreflang="en"` is accurate.
- `x-default` always points to `/` as the language-agnostic fallback for all locales.

### Canonical not affected
`<link rel="canonical">` is injected before the hreflang block and uses a separate `updateLinkTag` call. No overlap.

---

## 2. Breadcrumb URL Fix

### Problem
All 6 Turkish landing page data files had `catUrl` pointing to non-existent routes:
- `https://pulsaraai.com/tr/rakip-takip` → catch-all → 301 to `/`
- `https://pulsaraai.com/tr/google-haritalar-izleme` → catch-all → 301 to `/`
- `https://pulsaraai.com/tr/istanbul` → catch-all → 301 to `/`

Google Rich Results Test flags BreadcrumbList items whose `item` URL redirects or 404s.

### Fix applied
Option (a) — point all category URLs to `/pulsara-intel`. No new routes needed.

Both `cat` (display label) and `catUrl` updated in all 6 data files:

**Before:**
```js
breadcrumb: {
  cat: 'Rakip Takip',           // or 'Google Haritalar İzleme' / 'İstanbul'
  catUrl: 'https://pulsaraai.com/tr/rakip-takip',
  page: '...',
}
```

**After (all 6 files):**
```js
breadcrumb: {
  cat: 'Pulsara Intel',
  catUrl: 'https://pulsaraai.com/pulsara-intel',
  page: '...',
}
```

### Resulting BreadcrumbList schema (example — Kahve Zincirleri)
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Ana Sayfa",     "item": "https://pulsaraai.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pulsara Intel", "item": "https://pulsaraai.com/pulsara-intel" },
    { "@type": "ListItem", "position": 3, "name": "Kahve Zincirleri", "item": "https://pulsaraai.com/tr/rakip-takip/kahve-zincirleri" }
  ]
}
```

All three URLs now resolve to real pages. No redirects in the breadcrumb chain.

---

## 3. Related Guides Cross-Links

### Implementation
Added section 6 "İlgili Rehberler / Related Guides" to `TurkishLandingPage.jsx` between the FAQ accordion and the Footer CTA band.

**Static data:** `RELATED_GUIDES` constant defined at module level (outside component). Contains all 6 Turkish landing pages with bilingual name + description.

**Filtering:** Uses `useLocation().pathname` to exclude the current page. Each page shows 5 of 6 guides — never links to itself.

**Language:** Respects `useLanguage()` — shows Turkish names when `language === 'tr'`, English names when `language === 'en'`.

### Links added per page

| Page | Links to |
|---|---|
| `/tr/rakip-takip/kahve-zincirleri` | Restoranlar, Fast Food, GMaps Rst, GMaps Kahve, İstanbul |
| `/tr/rakip-takip/restoranlar` | Kahve, Fast Food, GMaps Rst, GMaps Kahve, İstanbul |
| `/tr/rakip-takip/fast-food-restoranlar` | Kahve, Restoranlar, GMaps Rst, GMaps Kahve, İstanbul |
| `/tr/google-haritalar-izleme/restoranlar` | Kahve, Restoranlar, Fast Food, GMaps Kahve, İstanbul |
| `/tr/google-haritalar-izleme/kahve-dukkanlari` | Kahve, Restoranlar, Fast Food, GMaps Rst, İstanbul |
| `/tr/istanbul/kahve-zinciri-rakip-analizi` | Kahve, Restoranlar, Fast Food, GMaps Rst, GMaps Kahve |

Total new internal links: 30 (6 pages × 5 links each).

### Design
- Background: `bg-white` (alternates correctly with preceding `bg-slate-50` FAQ section)
- Cards: `border border-slate-200 hover:border-purple-300 hover:shadow-md` — matches existing FeatureCard style
- No Navbar changes. No homepage changes. No PulsaraIntel changes.

---

## Build Result

```
✓ built in 1.07s
dist/assets/index-Coj-Jaas.js   709.60 kB │ gzip: 207.01 kB
dist/assets/index-CPU97jnP.css   77.81 kB │ gzip:  12.12 kB
```

No errors. Bundle +3KB from RELATED_GUIDES constant + new section JSX (expected).

---

## Testing Checklist

### Hreflang

- [ ] Open DevTools → Elements → `<head>`. On `/tr/rakip-takip/kahve-zincirleri`: confirm 3 `<link rel="alternate">` tags present with `hreflang="tr"`, `hreflang="en"`, `hreflang="x-default"`
- [ ] On `/pulsara-intel`: confirm `hreflang="en"` + `hreflang="x-default"` present, no `hreflang="tr"`
- [ ] Navigate from a `/tr/*` page to `/products`: confirm old `hreflang="tr"` tag is removed, new `hreflang="en"` tag is injected
- [ ] Verify `<link rel="canonical">` is unaffected on all pages

### Breadcrumb

- [ ] Open [Google Rich Results Test](https://search.google.com/test/rich-results) for `https://pulsaraai.com/tr/rakip-takip/kahve-zincirleri` — BreadcrumbList should show 3 items with no invalid URLs
- [ ] Confirm position 2 item URL = `https://pulsaraai.com/pulsara-intel` (resolves, no redirect)
- [ ] Repeat for all 6 Turkish landing pages

### Related guides

- [ ] Visit each of the 6 Turkish landing pages — confirm "İlgili Rehberler" section appears above footer CTA
- [ ] Confirm current page is NOT listed in its own related guides (filter working)
- [ ] Toggle language to EN — confirm section heading becomes "Related Guides" and guide names switch to English
- [ ] Click each guide link — confirm correct page loads
- [ ] Check on mobile (375px) — cards stack to single column

### Regression

- [ ] `/pulsara-intel` — layout unchanged, Use Cases section intact, pilot form scrolls correctly
- [ ] `/` homepage — unchanged
- [ ] `/blog/:slug` — BlogPosting schema still injected, hreflang="en" injected
- [ ] `/products` — Product schemas intact, hreflang="en" injected
