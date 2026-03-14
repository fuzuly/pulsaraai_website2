# Pulsara Website — Audit & Fix Roadmap

This document summarizes **errors**, **bugs**, **UI/UX issues**, and a **prioritized roadmap** to fix them.

---

## 1. Critical errors & bugs

### 1.1 Missing routes (navbar links 404)

**Issue:** The navbar links to **AI**, **Blog**, and **Google Cloud** (Integrations), but `App.jsx` has **no routes** for them. All unmatched paths redirect to `/`, so users never see these pages.

| Nav link        | Path in Navbar              | Route in App | Result        |
|-----------------|-----------------------------|--------------|---------------|
| AI              | `/ai`                       | ❌ Missing   | Redirect to / |
| Blog            | `/blog`                     | ❌ Missing   | Redirect to / |
| Blog post       | `/blog/:slug`               | ❌ Missing   | Redirect to / |
| Google Cloud    | `/integrations/google-cloud`| ❌ Missing   | Redirect to / |

**Fix:** Add routes in `App.jsx` and lazy-load the page components:

- `Route path="/ai"` → `<AI />` (with Navbar + Footer)
- `Route path="/blog"` → `<BlogList />`
- `Route path="/blog/:slug"` → `<BlogDetail />`
- `Route path="/integrations/google-cloud"` → `<GoogleCloudIntegration />`

Import: `AI`, `BlogList`, `BlogDetail`, `GoogleCloudIntegration` from the corresponding page files.

---

### 1.2 Favicon 404

**Issue:** `index.html` references:

```html
<link rel="icon" type="image/png" href="/pulsara1.png" />
```

There is **no** `public/pulsara1.png`. In Vite, `/` is the `public` folder, so the favicon request returns 404.

**Fix:** Either copy `src/assets/pulsara1.png` (or your preferred icon) to `public/pulsara1.png`, or add a `public` favicon and point `href` to it. Ensure the file exists under `public/`.

---

### 1.3 Unused imports in App.jsx

**Issue:** `App.jsx` imports `PulsaraSuite` and `Chooser` but there are **no routes** that render them. Same for `Link` (imported from react-router-dom but the main app uses `Routes`/`Route`/`Navigate` only; `Link` may be unused in the main export). `LandingPage` is defined but never used.

**Fix:** Remove unused imports and the unused `LandingPage` component to reduce noise and bundle size. If PulsaraSuite/Chooser are needed later, add explicit routes.

---

### 1.4 ScrollToTop not used

**Issue:** `ScrollToTop` exists and updates the window scroll position on route change, but it is **never rendered** in the app. After navigation (e.g. from Home to Contact), the page can stay scrolled down.

**Fix:** Render `ScrollToTop` inside the router (e.g. inside `BrowserRouter` in `App.jsx` or `main.jsx`) so every route change scrolls to top.

---

## 2. UI/UX and content issues

### 2.1 Footer: Privacy & Terms are dead links

**Issue:** Footer has:

```jsx
<a href="#"> ... Privacy
<a href="#"> ... Terms
```

Clicking them does nothing useful and leaves `href="#"` in the URL.

**Fix:** Either:

- Point to real pages (e.g. `/privacy`, `/terms`) and add those routes and pages, or  
- Use `role="button"` and `onClick` to open a modal / external doc, or  
- Remove the links until pages exist. Prefer proper routes if you have content.

---

### 2.2 SEO: Hreflang URLs may not match implementation

**Issue:** In `SEO.jsx`, Turkish alternates use a path prefix `/tr` (e.g. `baseUrl + '/tr' + route`). The app does **not** use `/tr/...` routes; language is handled via context only. So the declared alternate URLs may not match the actual site behavior and can confuse search engines.

**Fix:** Either implement locale-based routes (e.g. `/tr/...`) and keep hreflang, or align hreflang with the current single-URL + context behavior (e.g. same URL for both languages and no `/tr` alternates, or document that Turkish is chosen via UI only).

---

### 2.3 Hero video overlays (AI page vs Home)

**Issue:** In `HeroVideoHeader.jsx` you use strong overlays:

- `bg-gradient-to-b from-black/75 via-purple-900/55 to-black/90`
- `bg-gradient-to-t from-black/40`
- Plus watermark-hiding gradients at the bottom

On the AI page you previously wanted “no purple” and “video fully visible”; on the home hero the same component is used with purple/dark overlays. If the goal is “no purple on AI, visible video on home,” the shared component may need a variant or the home hero might be too dark.

**Fix:** Decide one approach: either one shared hero with no (or minimal) purple, or a prop/variant so the AI page (or any future page) can use lighter/less purple overlays and keep video more visible.

---

### 2.4 Mobile nav button contrast on homepage

**Issue:** On the homepage, the nav uses a transparent/dark background and the mobile menu button uses `text-black md:text-white`. On small screens over the hero video/gradient, the button can be hard to see depending on the frame.

**Fix:** Ensure the hamburger has enough contrast on all backgrounds (e.g. consistent white with shadow on home when not scrolled, or a dedicated “menu” background). Test on real devices.

---

### 2.5 Contact form: redirect URL inconsistency

**Issue:** Contact form’s FormSubmit `_next` is set to `window.location.origin + "/contact?thanks=1"`. If the site is ever deployed under a different origin (e.g. `pulsara.com.tr` vs `www.pulsara.ai`), the redirect is correct for the current domain. The comment in App.jsx business contact form used `"/business?thanks=1"` — different flow. No bug if intentional; just ensure both contact forms (main Contact page vs business ContactPage) use the intended thank-you URLs.

**Fix:** Confirm desired thank-you URLs for each form and document them.

---

### 2.6 Orphan / legacy components and pages

**Issue:** These files exist but are **not** used by the current routing or layout:

- **Components:** `MarketingNav.jsx`, `MarketingFooter.jsx`, `Section.jsx`, `FeatureCard.jsx`, `PrivacyTable.jsx`, `Timeline.jsx`
- **Pages:** `Privacy.jsx`, `Product.jsx`, `UseCases.jsx`

So either they are legacy from a previous redesign or planned for future use. They add clutter and can cause confusion.

**Fix:** If not needed: remove them (or move to a `/legacy` or `/archive` folder). If needed: add routes and nav links (e.g. Privacy, Product, Use cases) and use the components there; otherwise delete.

---

### 2.7 Console logs in production

**Issue:** `main.jsx` and `App.jsx` contain `console.log` calls (e.g. “Main.jsx: Starting app render…”, “App component rendering…”). They are useful in development but unnecessary in production.

**Fix:** Remove them or wrap in `if (import.meta.env.DEV) { ... }` so they only run in development.

---

### 2.8 Browserslist data outdated

**Issue:** Build reports: “Browserslist: browsers data (caniuse-lite) is 7 months old.”

**Fix:** Run:

```bash
npx update-browserslist-db@latest
```

and re-run the build. Optionally add a note in the roadmap to update this periodically.

---

## 3. Optional / nice-to-have

- **Accessibility:** Add `aria-label` to icon-only buttons (e.g. language toggle, mobile menu), and ensure focus order and visible focus styles on all interactive elements.
- **Performance:** Consider lazy-loading heavy pages (AI, Blog list/detail, Google Cloud) with `React.lazy` + `Suspense` to keep initial bundle smaller.
- **Blog:** Add `blog` (and `/blog/:slug`) to the SEO `routes` array and JSON-LD if you want them in sitemap/structured data.
- **Canonical:** Ensure any new routes (e.g. `/ai`, `/blog`, `/blog/:slug`, `/integrations/google-cloud`) are reflected in canonical and sitemap generation (if you have one).

---

## 4. Prioritized fix roadmap

| Priority | Item | Effort | Action |
|----------|------|--------|--------|
| **P0** | Missing routes for AI, Blog, Blog detail, Google Cloud | Small | Add 4 routes in `App.jsx`, wire Navbar links to correct paths. |
| **P0** | Favicon 404 | Small | Add `public/pulsara1.png` (or chosen icon) and keep `index.html` link. |
| **P1** | Footer Privacy/Terms dead links | Small | Add `/privacy` (and optionally `/terms`) routes or point to real URLs; or remove. |
| **P1** | ScrollToTop not used | Small | Render `ScrollToTop` inside router so every route change scrolls to top. |
| **P1** | Remove unused App imports and LandingPage | Small | Remove `PulsaraSuite`, `Chooser`, and any unused `Link`; delete or comment `LandingPage` if unused. |
| **P2** | SEO hreflang vs single-URL language | Medium | Decide strategy (no /tr routes vs add them) and align `SEO.jsx` hreflang and canonicals. |
| **P2** | Hero video overlays (purple/visibility) | Small | Tidy overlays in `HeroVideoHeader.jsx` (and AI page if different) so video is visible and branding consistent. |
| **P2** | Mobile nav contrast on homepage | Small | Ensure hamburger is always visible (e.g. color/shadow) on hero. |
| **P2** | Orphan components/pages | Medium | Delete or archive `MarketingNav`, `MarketingFooter`, `Section`, `FeatureCard`, `PrivacyTable`, `Timeline`; add routes for `Privacy`, `Product`, `UseCases` if you want those pages live, else remove. |
| **P3** | Strip or guard console.log in production | Small | Remove or wrap in `import.meta.env.DEV`. |
| **P3** | Update browserslist DB | Small | Run `npx update-browserslist-db@latest`. |
| **P3** | A11y and performance** | Ongoing | Add aria-labels, focus styles; consider lazy loading for heavy routes. |

---

## 5. Summary

- **Critical:** Add the 4 missing routes and fix the favicon so the main site navigation and first impression work.
- **High:** Fix footer links, use ScrollToTop, and clean unused code.
- **Medium:** Align SEO with routing, hero overlays, mobile contrast, and orphan files.
- **Low:** Console logs, browserslist, then a11y and performance.

If you want, the next step can be implementing the P0 and P1 items (routes, favicon, ScrollToTop, footer, unused imports) directly in the repo.
