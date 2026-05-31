# SEO Landing Page Architecture Review
**Date:** 2026-05-31  
**Scope:** 6 Turkish SEO landing pages + optional Intel "Use Cases" section  
**Output:** Plan only — no implementation

---

## Pages to Implement

| # | URL | Type |
|---|-----|------|
| 1 | `/tr/rakip-takip/kahve-zincirleri` | Sector — Coffee Chains |
| 2 | `/tr/rakip-takip/restoranlar` | Sector — Restaurants |
| 3 | `/tr/rakip-takip/fast-food-restoranlar` | Sector — Fast Food |
| 4 | `/tr/google-haritalar-izleme/restoranlar` | Google Maps Monitor — Restaurants |
| 5 | `/tr/google-haritalar-izleme/kahve-dukkanlari` | Google Maps Monitor — Coffee |
| 6 | `/tr/istanbul/kahve-zinciri-rakip-analizi` | City+Sector — Istanbul/Coffee |
| 7 | `/pulsara-intel` (partial) | Add "Use Cases" section only |

---

## 1. Existing Architecture Findings

### Routing
- **Framework:** React Router v7, client-side SPA
- **Entry point:** `src/App.jsx` — `<Routes>` containing 13 registered routes
- **Catch-all:** `<Route path="*" element={<Navigate to="/" replace />}` — line 1533
- **Critical consequence:** All 6 `/tr/*` URLs currently redirect to homepage. They must be registered as explicit routes before deploy. If only 4 of 6 are registered and deployed, the remaining 2 silently serve the homepage, confusing Googlebot.

### Registered routes (current)
```
/           /home        /blog        /blog/:slug
/contact    /products    /services    /ortakliklar
/company    /pulsara-intel           /ai          /privacy
/business   *→ /
```

### Navbar — Active Link & Dark Mode Logic
This is the most important piece of existing logic to understand before touching anything.

```js
// Navbar.jsx lines 14-18
const isHome  = location.pathname === '/';
const isIntel = location.pathname === '/pulsara-intel';      // exact string match
const isDarkModeActive = isIntel || (isHome && !isScrolled);
```

**Implication for new `/tr/*` pages:**
- `isIntel` = `false` — no path starts with `/pulsara-intel`
- `isDarkModeActive` = `false` — Navbar renders in **light mode** on all 6 new pages
- No nav link will be highlighted (active state uses `location.pathname === link.path` exact match)
- The Pulsara logo renders in **normal color** (not inverted)

**This is the correct behavior.** Light Navbar on light landing pages. Zero changes to Navbar required.

**Risk if nav logic is touched:** Any change to `isIntel` (e.g. changing to `startsWith`) would accidentally darken the Navbar on `/tr/*` pages. **Do not touch the Navbar.**

### PulsaraIntel.jsx — Dark Theme
```js
// PulsaraIntel.jsx line ~454
<div className="bg-slate-950 min-h-screen text-slate-300 selection:bg-purple-500/30">
```

PulsaraIntel uses a **deep dark theme** (bg-slate-950) — completely different from every other page. The new SEO landing pages must use **light theme** (bg-white / bg-slate-50) matching Products, Services, Contact. This is confirmed correct: the landing pages are informational pages, not product pages.

### Footer.jsx
No dark/light branching. Uses `bg-slate-50 border-t border-slate-200` — compatible with both contexts. **No changes needed.**

### SEO.jsx — Breadcrumb Map
Current map (after previous fixes):
```js
const breadcrumbMap = {
  '/products':      { name: 'Products' },
  '/services':      { name: 'Services' },
  '/ortakliklar':   { name: '...' },
  '/company':       { name: 'Company' },
  '/contact':       { name: 'Contact' },
  '/blog':          { name: 'Blog' },
  '/pulsara-intel': { name: 'Pulsara Intel' },
  '/ai':            { name: 'AI Solutions' },
  '/privacy':       { name: 'Privacy Policy' },
};
```

All 6 new `/tr/*` URLs are missing from this map. Without entries, no breadcrumb schema is injected for these pages. **SEO.jsx requires updates.**

Additionally, the new pages need a **3-level breadcrumb** (Home → Sector Category → Page), not the current 2-level structure used for top-level pages. The blog post logic (`isBlogPost` + `startsWith('/blog/')`) is the reference pattern for nested breadcrumbs.

---

## 2. Components Available for Reuse

### Reuse without modification

| Component | File | What it provides |
|---|---|---|
| `Section` | `components/Section.jsx` | `py-16 md:py-24` section wrapper with container |
| `SectionTitle` | `components/SectionTitle.jsx` | `<h2>` + subtitle, centered or left-aligned |
| `FeatureCard` | `components/FeatureCard.jsx` | Card: icon + title + description, `border-slate-200` |
| `SEO` | `components/SEO.jsx` | Meta tags, OG, JSON-LD injection |
| `Navbar` | `components/Navbar.jsx` | Already handles light mode on non-Intel paths |
| `Footer` | `components/Footer.jsx` | Standard, no branching |
| `ErrorBoundary` | `components/ErrorBoundary.jsx` | Already wraps all routes |
| `ScrollToTop` | `components/ScrollToTop.jsx` | Already active globally |

### Reuse patterns (copy from existing pages)

| Pattern | Source file | What to copy |
|---|---|---|
| `useInView` hook | `pages/Services.jsx` lines 8-22 | Scroll-trigger IntersectionObserver |
| `fadeUp` variant | `pages/Products.jsx` lines 15-18 | Standard entry animation |
| `stagger` variant | `pages/Products.jsx` lines 19-22 | Children stagger |
| Form validation | `pages/Contact.jsx` | `touched`, `errors`, `validateField` pattern |
| Input field classes | `pages/Contact.jsx` | `border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500` |
| CTA button | `pages/Products.jsx` | `bg-gradient-to-r from-purple-600 to-blue-600` |
| Pain point cards | `pages/PulsaraIntel.jsx` sector — but light-themed version | `bg-slate-50 rounded-2xl border border-slate-200` |
| FAQ accordion | `pages/PulsaraIntel.jsx` — adapt to light | Toggle with chevron icon |

### `useLanguage` context
All new pages import `useLanguage` and render bilingual content. Turkish is primary; English is fallback. The pattern is consistent across the codebase.

---

## 3. Architecture Decision: Template vs. 6 Separate Files

### Option A — 6 separate JSX files
```
src/pages/
  tr/
    RakipTakipKahve.jsx
    RakipTakipRestoranlar.jsx
    RakipTakipFastFood.jsx
    GoogleMapsRestoranlar.jsx
    GoogleMapsKahve.jsx
    IstanbulKahve.jsx
```
- Pro: Simple, no abstraction, each page fully independent
- Con: 6 files × ~400 lines = 2,400 lines of near-identical structure. Adding page 7 means copying again.

### Option B — Shared template + data objects (RECOMMENDED)
```
src/
  pages/
    tr/
      KahveZincirleriRakipTakip.jsx    ← thin wrapper
      RestoranlarRakipTakip.jsx        ← thin wrapper
      FastFoodRakipTakip.jsx           ← thin wrapper
      GoogleMapsRestoranlar.jsx        ← thin wrapper
      GoogleMapsKahve.jsx              ← thin wrapper
      IstanbulKahveZinciri.jsx         ← thin wrapper
  components/seo/
    TurkishLandingPage.jsx             ← single template component
```

**Thin wrapper pattern:**
```jsx
// src/pages/tr/KahveZincirleriRakipTakip.jsx
import TurkishLandingPage from '../../components/seo/TurkishLandingPage';
import { kahveZincirleriData } from '../../data/seo/kahveZincirleri';
export default () => <TurkishLandingPage data={kahveZincirleriData} />;
```

**Template receives a `data` prop with shape:**
```js
{
  seo: { title, description, breadcrumbLabel, breadcrumbParent },
  hero: { headline, subheadline, cta1, cta2 },
  painPoints: [ { title, desc, icon? } × 3 ],
  solution: { headline, steps: [ { n, title, desc } × 4 ] },
  features: [ { title, desc } × 6 ],
  faq: [ { q, a } × 5 ],
  schema: { /* JSON-LD SoftwareApplication or WebPage */ }
}
```

This is the correct approach for a programmatic SEO system. Adding page 7 = 1 data file + 1 thin wrapper + 1 route line + 1 sitemap entry.

---

## 4. Files That Need Modification

### Required modifications (touching existing code)

| File | Change | Risk | Lines affected |
|---|---|---|---|
| `src/App.jsx` | Add 6 `<Route>` entries + 6 imports | Low | +18 lines |
| `src/components/SEO.jsx` | Add 3-level breadcrumb logic for `/tr/*` paths | Low | +20 lines |
| `public/sitemap.xml` | Add 6 `<url>` entries | None | +30 lines |

### Optional modification (Intel page)

| File | Change | Risk | Lines affected |
|---|---|---|---|
| `src/pages/PulsaraIntel.jsx` | Insert "Use Cases" `<section>` between trust and pilot form | Low | +60 lines (additive only) |

### No modification needed

| File | Why |
|---|---|
| `src/components/Navbar.jsx` | Light mode already works on new paths. isIntel exact match is safe. |
| `src/components/Footer.jsx` | No branching logic. Works on all routes. |
| `src/index.css` | Global styles compatible. No dark mode class interference. |
| `tailwind.config.js` | No new tokens needed. Using existing palette. |
| `vercel.json` | SPA rewrite handles all paths. No change needed. |
| `src/context/LanguageContext.jsx` | Unchanged — new pages consume it normally. |
| `src/context/ThemeContext.jsx` | Unused in new pages. |
| Any existing page JSX | Completely untouched. |

---

## 5. New Routes Required

```jsx
// src/App.jsx additions

// ── Sector landing pages (Turkish) ──
<Route path="/tr/rakip-takip/kahve-zincirleri" element={
  <><Navbar /><KahveZincirleriRakipTakip /><Footer /></>
} />
<Route path="/tr/rakip-takip/restoranlar" element={
  <><Navbar /><RestoranlarRakipTakip /><Footer /></>
} />
<Route path="/tr/rakip-takip/fast-food-restoranlar" element={
  <><Navbar /><FastFoodRakipTakip /><Footer /></>
} />

// ── Google Maps monitoring pages (Turkish) ──
<Route path="/tr/google-haritalar-izleme/restoranlar" element={
  <><Navbar /><GoogleMapsRestoranlar /><Footer /></>
} />
<Route path="/tr/google-haritalar-izleme/kahve-dukkanlari" element={
  <><Navbar /><GoogleMapsKahve /><Footer /></>
} />

// ── City + sector pages (Turkish) ──
<Route path="/tr/istanbul/kahve-zinciri-rakip-analizi" element={
  <><Navbar /><IstanbulKahveZinciri /><Footer /></>
} />
```

**Route ordering:** React Router v7 uses first-match. The catch-all `*` route is last in the file. New routes can be added before the catch-all without affecting existing route resolution.

---

## 6. SEO.jsx Changes Needed

### A — Breadcrumb map extension
New `/tr/*` routes need breadcrumb entries. The paths are nested (3 levels), so the same pattern used for `/blog/:slug` applies.

```js
// Proposed logic inside SEO.jsx useEffect

const isTurkishSeoPage = canonicalPath.startsWith('/tr/');

if (isTurkishSeoPage) {
  // Build 3-level breadcrumb: Home → Category → Page
  // Category derived from path segment 2 (rakip-takip, google-haritalar-izleme, istanbul)
  // Page name derived from path segment 3
  // Both mapped from a lookup table to human-readable Turkish labels
  const trBreadcrumbMap = {
    '/tr/rakip-takip/kahve-zincirleri':          { cat: 'Rakip Takip', page: 'Kahve Zincirleri' },
    '/tr/rakip-takip/restoranlar':               { cat: 'Rakip Takip', page: 'Restoranlar' },
    '/tr/rakip-takip/fast-food-restoranlar':     { cat: 'Rakip Takip', page: 'Fast Food' },
    '/tr/google-haritalar-izleme/restoranlar':   { cat: 'Google Haritalar İzleme', page: 'Restoranlar' },
    '/tr/google-haritalar-izleme/kahve-dukkanlari': { cat: 'Google Haritalar İzleme', page: 'Kahve Dükkanları' },
    '/tr/istanbul/kahve-zinciri-rakip-analizi':  { cat: 'İstanbul', page: 'Kahve Zinciri Rakip Analizi' },
  };
  // inject 3-level BreadcrumbList schema
}
```

### B — WebPage schema for landing pages
New pages should inject a `WebPage` JSON-LD instead of the generic Organization-only baseline:

```json
{
  "@type": "WebPage",
  "name": "<page title>",
  "description": "<page description>",
  "url": "https://pulsaraai.com/tr/rakip-takip/kahve-zincirleri",
  "inLanguage": "tr",
  "isPartOf": { "@type": "WebSite", "url": "https://pulsaraai.com" }
}
```

This should be injected when `canonicalPath.startsWith('/tr/')` is true.

### C — Existing behavior unchanged
All breadcrumb entries for existing pages (`/products`, `/services`, etc.) remain exactly as-is. The new condition is additive, not replacing existing logic.

---

## 7. TurkishLandingPage Template — Section Structure

Each of the 6 pages renders these sections in order:

```
1. Hero
   ├── H1 headline (sector-specific)
   ├── Subheadline
   ├── Primary CTA → /pulsara-intel#pilot-form
   └── Secondary CTA → /pulsara-intel (product page)

2. Pain Points (3 cards)
   ├── bg-slate-50 card with red warning icon
   ├── Title + sector-specific description
   └── No CTA

3. How Pulsara Solves It (4-step process)
   ├── Numbered steps with purple gradient squares
   └── Match Products.jsx step pattern

4. Features Highlight (6 inline SVG icons + 1-line desc)
   └── 3-column grid, bg-white cards with hover border-purple-300

5. FAQ Accordion (5 questions, sector-specific)
   └── Match PulsaraIntel.jsx FAQ pattern, light theme

6. Footer CTA Band
   ├── Purple/gradient background
   ├── Headline + subhead
   └── Button → /pulsara-intel#pilot-form
```

**Visual system used throughout:**
- Background: `bg-white` / alternating `bg-slate-50`
- Cards: `rounded-2xl border border-slate-200 hover:border-purple-300`
- Primary button: `bg-gradient-to-r from-purple-600 to-blue-600`
- Section padding: `py-20 sm:py-28`
- Container: `max-w-6xl mx-auto px-4 sm:px-6`
- Typography: `text-4xl font-extrabold text-slate-900` (H1), `text-3xl font-extrabold text-slate-900` (H2)
- Animations: `fadeUp` + `stagger` + `useInView` (identical to Products.jsx)

---

## 8. "Use Cases" Section — PulsaraIntel.jsx

### Location
Insert between the existing **Trust section** and the **Pilot form section** (`id="pilot-form"`). This is a natural discovery path: user reads product features → sees what types of businesses use it → scrolls to apply.

### Content
6 sector cards linking to the new landing pages:

```
Kahve & Kafe      → /tr/rakip-takip/kahve-zincirleri
Restoranlar       → /tr/rakip-takip/restoranlar
Fast Food         → /tr/rakip-takip/fast-food-restoranlar
Google Maps (Rst) → /tr/google-haritalar-izleme/restoranlar
Google Maps (Kahve)→ /tr/google-haritalar-izleme/kahve-dukkanlari
İstanbul Kahve    → /tr/istanbul/kahve-zinciri-rakip-analizi
```

### Theme
Must match PulsaraIntel dark theme:
- Card background: `bg-white/5 border border-white/10 hover:border-purple-500/40`
- Text: `text-white` headline, `text-slate-400` description
- Link: `→ Detaylı incele` in purple

### Risk
**Low.** The section is purely additive — a new `<section>` tag inserted between two existing `<section>` tags. No existing section IDs, refs, or animation triggers are modified.

---

## 9. Risk Assessment

| Risk | Severity | Likelihood | Details |
|---|---|---|---|
| **Catch-all redirects new routes** | High | Certain if routes not added | All 6 routes must be in App.jsx before deploy |
| **Navbar dark mode bleeds into new pages** | High | Unlikely | `isIntel` uses strict `===` equality. `/tr/` paths can't trigger it. Only risk: if someone adds `startsWith` logic later |
| **PulsaraIntel.jsx dark theme bleeds into new pages** | None | Impossible | Intel wrapper `bg-slate-950` is scoped to that component's return JSX. Separate routes, separate components |
| **SEO.jsx breadcrumb for existing pages breaks** | Low | Very unlikely | Additions only. Existing `breadcrumbMap` entries unchanged. New `isTurkishSeoPage` check runs in its own `else` branch |
| **SectionTitle.jsx has hardcoded `text-white`** | Medium | Confirmed | **Confirmed bug**: `SectionTitle.jsx` has `text-white` hardcoded alongside `text-slate-900`. On light backgrounds, `text-white` makes text invisible. Do NOT use `SectionTitle` component on new pages — write inline heading markup or fix the component first |
| **Bundle size** | Low | Certain | +6 thin wrappers + 1 template + 6 data files ≈ +30-40KB unminified. Acceptable |
| **English fallback on Turkish-only pages** | Medium | Likely | Pages have Turkish copy. `useLanguage` toggles EN/TR. Must provide English translations for all string keys or the language toggle will break on these pages |
| **Vercel catch-all rewrite** | None | Impossible | Vercel SPA rewrite sends all paths to `index.html`. React Router then handles routing. No Vercel config change needed |

---

## 10. SectionTitle Bug — Confirmed

```jsx
// components/SectionTitle.jsx
<h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 text-white mb-6 tracking-tight">
```

**Problem:** Both `text-slate-900` and `text-white` are applied. In Tailwind, the later class wins — `text-white` overrides `text-slate-900`. On light backgrounds, headings are invisible.

**Impact on new pages:** If `SectionTitle` is reused directly, section headings on light pages will be white-on-white. Invisible.

**Options:**
1. Fix `SectionTitle.jsx` by removing `text-white` (safest — but check where it's currently used)
2. Pass `className` prop to `SectionTitle` that overrides text color
3. Write inline headings on new pages, bypassing the component entirely

**Before implementing new pages, check:** Where is `SectionTitle` currently used? Is removing `text-white` a regression for any existing page?

```bash
grep -rn "SectionTitle" src/ --include="*.jsx"
```

---

## 11. English Translation Requirement

The new pages use `useLanguage()` — when user toggles to EN, the page switches language. All content data objects must include both TR and EN keys:

```js
const kahveZincirleriData = {
  tr: {
    seo: { title: '...', description: '...' },
    hero: { headline: 'Kahve zincirinizin rakiplerini...', ... },
    painPoints: [ { title: 'Fiyat savaşları körlüğü', ... } ],
  },
  en: {
    seo: { title: '...', description: '...' },
    hero: { headline: 'Monitor your coffee chain competitors...', ... },
    painPoints: [ { title: 'Price war blindness', ... } ],
  }
};
```

If English copy is omitted and user toggles to EN, the component crashes or renders `undefined`. This is a **must-have**, not optional.

---

## 12. Sitemap Additions Required

```xml
<!-- public/sitemap.xml — 6 new entries -->
<url>
  <loc>https://pulsaraai.com/tr/rakip-takip/kahve-zincirleri</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://pulsaraai.com/tr/rakip-takip/restoranlar</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://pulsaraai.com/tr/rakip-takip/fast-food-restoranlar</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://pulsaraai.com/tr/google-haritalar-izleme/restoranlar</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://pulsaraai.com/tr/google-haritalar-izleme/kahve-dukkanlari</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://pulsaraai.com/tr/istanbul/kahve-zinciri-rakip-analizi</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Google Maps monitoring pages get `0.9` — highest priority among new pages, justified by near-zero competition.

---

## 13. Implementation Effort Estimate

| Task | Effort | Notes |
|---|---|---|
| Fix `SectionTitle.jsx` bug | 15 min | Must do first — check existing usages |
| Create `TurkishLandingPage` template component | 3 hrs | Hero, pain points, solution, features, FAQ, CTA sections |
| Write TR + EN data for 3 sector pages | 2 hrs | Kahve, Restoran, Fast Food |
| Write TR + EN data for 2 Google Maps pages | 1.5 hrs | Both draw from same template |
| Write TR + EN data for 1 city page | 1 hr | Istanbul/Kahve — same template + city-specific copy |
| Create 6 thin wrapper components | 30 min | One-import-one-render pattern |
| Update `App.jsx` (routes + imports) | 20 min | Low risk, additive |
| Update `SEO.jsx` (breadcrumb + WebPage schema) | 45 min | Additive, existing tests cover regressions |
| Update `sitemap.xml` | 10 min | Additive |
| Add "Use Cases" section to `PulsaraIntel.jsx` | 1 hr | Dark theme, 6 cards, internal links |
| Regression test all existing pages | 1 hr | Load each page, verify nav, footer, layout |
| **Total** | **~11 hours** | |

---

## 14. Implementation Order (Dependency Chain)

```
Step 1: Audit SectionTitle.jsx usages → decide fix strategy
Step 2: Create TurkishLandingPage.jsx template (no data yet)
Step 3: Create data file for Page 1 (Kahve Zincirleri) — TR + EN
Step 4: Wire Page 1 thin wrapper + route + sitemap entry
Step 5: Test Page 1 in browser — verify Navbar, Footer, SEO, breadcrumb
Step 6: Update SEO.jsx breadcrumb logic (single change covers all 6 pages)
Step 7: Repeat data + wrapper + route for Pages 2–6
Step 8: Add "Use Cases" section to PulsaraIntel.jsx
Step 9: Run full regression: /, /products, /services, /pulsara-intel, /blog
Step 10: Deploy
```

**Why this order?** Template is built and verified on Page 1 before scaling to 5 more. Any structural issues are caught early. SEO.jsx change in Step 6 is made once and covers all 6 pages automatically.

---

## 15. Files Created (final list)

```
NEW:
src/components/seo/TurkishLandingPage.jsx     ← template
src/data/seo/kahveZincirleri.js               ← data
src/data/seo/restoranlar.js
src/data/seo/fastFoodRestoranlar.js
src/data/seo/googleMapsRestoranlar.js
src/data/seo/googleMapsKahve.js
src/data/seo/istanbulKahveZinciri.js
src/pages/tr/KahveZincirleriRakipTakip.jsx    ← thin wrapper
src/pages/tr/RestoranlarRakipTakip.jsx
src/pages/tr/FastFoodRakipTakip.jsx
src/pages/tr/GoogleMapsRestoranlar.jsx
src/pages/tr/GoogleMapsKahve.jsx
src/pages/tr/IstanbulKahveZinciri.jsx

MODIFIED:
src/App.jsx                                    ← +6 routes
src/components/SEO.jsx                         ← +breadcrumbs +WebPage schema
src/components/SectionTitle.jsx               ← fix text-white bug (if used)
src/pages/PulsaraIntel.jsx                    ← +Use Cases section
public/sitemap.xml                            ← +6 entries

UNTOUCHED:
src/components/Navbar.jsx
src/components/Footer.jsx
src/index.css
tailwind.config.js
vercel.json
All other existing pages
```

---

## 16. Pre-Implementation Checklist

Before writing a single line of code:

- [ ] Run `grep -rn "SectionTitle" src/ --include="*.jsx"` — identify all usages, decide if fixing `text-white` is safe
- [ ] Confirm `framer-motion` version supports `useInView` pattern or requires `whileInView` — check Products.jsx vs Services.jsx pattern in current Vite build
- [ ] Confirm Formspree Intel form ID is set (currently `YOUR_INTEL_FORMSPREE_ID` placeholder) — landing page CTA links to this form
- [ ] Confirm Turkish content matches TURKISH_SEO_HUB.md pain points — not generic placeholders
- [ ] Agree on English copy strategy — full translations or soft fallback to TR strings
