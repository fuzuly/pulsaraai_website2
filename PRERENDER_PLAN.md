# Prerender Implementation Plan — pulsaraai.com
**Date:** 2026-05-31  
**Status:** Audit only — no code changes

---

## 1. Current Crawlability State

### Verdict: Pure CSR. Googlebot gets a blank shell.

**Evidence:**

```js
// vite.config.js — current state
export default defineConfig({
  plugins: [react()],   // ← vite-plugin-prerender is installed but never loaded
})
```

**What Googlebot receives today on first request:**

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Pulsara AI — Workforce, Intelligence & AI Platforms</title>
    <meta name="description" content="Pulsara AI builds enterprise platforms..." />
  </head>
  <body>
    <div id="root" style="min-height: 100vh; background: #ffffff;"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

The `<div id="root">` is completely empty. All content — headings, product descriptions, blog posts, the Pulsara Intel pilot form — is invisible to Googlebot on first pass.

Googlebot does eventually render JavaScript, but:
- It queues JS rendering separately from HTML crawling
- Rendering delay is typically 1 day to 3 weeks for new/updated content
- Rendering is inconsistent for SPAs — not guaranteed on every crawl
- All JS-rendered content is indexed at lower confidence than static HTML

**Current SEO impact:** Every page on the site is indexed as if it contains only the fallback title and description. No headings, no body copy, no structured content visible to Google's ranking signals.

---

## 2. Plugin Status

`vite-plugin-prerender@1.0.8` is already installed in `devDependencies`. Zero configuration changes were needed to install it — **it only needs to be added to `vite.config.js`**.

### Installed dependency chain:
```
vite-plugin-prerender@1.0.8
└── @prerenderer/prerenderer@0.7.2
└── @prerenderer/renderer-puppeteer@0.2.0
    └── puppeteer@1.20.0  (peer dep — also installed)
        └── Chromium binary: node_modules/puppeteer/.local-chromium/mac-686378/
```

**The plugin works by:**
1. Running `vite build` to produce the standard `dist/` output
2. Spinning up a local static server serving `dist/`
3. Launching Puppeteer (headless Chromium) to visit each specified route
4. Capturing the fully-rendered HTML after React hydrates
5. Writing each route's HTML to `dist/<route>/index.html`

The result: every prerendered route gets a real HTML file with full content that any crawler can read without JavaScript.

---

## 3. Vercel Compatibility Analysis

### Rewrite rule (current `vercel.json`):
```json
"rewrites": [{ "source": "/(.*)", "destination": "/" }]
```

### How this interacts with prerendering:

**Vercel serves static files before applying rewrites.** This is documented Vercel behavior. The priority order is:

1. Static file match (e.g., `dist/products/index.html`) → **served directly**
2. Rewrite rule → only fires if no static file exists

This means:
- `/products` → Vercel finds `dist/products/index.html` → serves prerendered HTML ✓
- `/blog/hidden-cost-of-employee-burnout` → Vercel finds `dist/blog/hidden-cost-of-employee-burnout/index.html` → serves prerendered HTML ✓
- Unknown route → no static file → rewrite to `dist/index.html` (SPA fallback) ✓

**The existing rewrite rule does not need to change.** Prerendering is fully compatible with the current Vercel setup.

---

## 4. Critical Risk: Puppeteer on Vercel Build Environment

### Risk level: HIGH

This is the main technical obstacle.

**Problem:** Puppeteer 1.20.0 downloaded a **macOS Chromium binary** during local `npm install`:
```
node_modules/puppeteer/.local-chromium/mac-686378/
```

Vercel builds run on **Linux (Amazon Linux 2)**. A macOS Chromium binary will not execute on a Linux build container. The prerender step will crash during `vercel build`.

### Three mitigation paths:

---

#### Path A — Update Puppeteer (Recommended)

Update `puppeteer` to a current version (`^24.x`). Modern Puppeteer auto-downloads the correct Chromium for the current OS. On Vercel Linux, it downloads a Linux binary.

Required changes:
1. `npm install puppeteer@latest --save-dev`
2. In `vite.config.js` renderer config, add standard Linux CI flags:
```js
renderer: new Renderer({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  maxConcurrentRoutes: 2,
  renderAfterTime: 2000,
})
```

**Effort:** 30 min  
**Risk:** `@prerenderer/renderer-puppeteer@0.2.0` is old and may have API compatibility issues with Puppeteer 24.x. Needs local verification.

---

#### Path B — System Chromium on Vercel (Simpler, fragile)

Point Puppeteer at Vercel's system Chromium (if available) rather than the bundled binary:

```js
renderer: new Renderer({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium-browser',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
```

**Problem:** Vercel does not guarantee a system Chromium on all build images. This approach works inconsistently and silently fails when Chromium isn't available.

**Effort:** 15 min  
**Risk:** High — unreliable on Vercel. Not recommended for production pipeline.

---

#### Path C — JSDOM Renderer (No Chromium required)

`@prerenderer/renderer-jsdom` uses Node's JSDOM instead of a real browser. No Chromium binary needed — works everywhere.

```js
import { JsDomRenderer } from '@prerenderer/renderer-jsdom'

renderer: new JsDomRenderer({
  maxConcurrentRoutes: 4,
})
```

**Limitations:**
- JSDOM doesn't execute `requestAnimationFrame`, CSS animations, or some browser APIs
- Framer Motion animations won't render (visible as static initial state in HTML)
- Blog content with `DOMPurify.sanitize()` may not render correctly (DOMPurify needs a real DOM)
- Some `useEffect` hooks may not fire reliably

**For this specific codebase:** `BlogDetail.jsx` uses `DOMPurify` which requires a browser DOM. JSDOM partially emulates this but it's unreliable for sanitization.

**Effort:** 1 hr  
**Risk:** Medium — some content will be prerendered incorrectly. Blog post body content may be missing or unsanitized.

---

#### Recommended path: **Path A** (updated Puppeteer, tested locally first)

---

## 5. Browser-API Safety Audit

Before prerendering can work, all browser-only APIs must be safely guarded. An unguarded `localStorage.getItem()` or `window.scrollTo()` call during Puppeteer render will cause the page to crash silently.

### Current status — all critical paths are already guarded ✅

| File | API | Guard present? |
|---|---|---|
| `LanguageContext.jsx` | `localStorage.getItem/setItem` | ✅ `typeof window !== 'undefined'` |
| `ThemeContext.jsx` | `localStorage` | ✅ guarded |
| `SEO.jsx` | `window.location` | ✅ guarded |
| `Contact.jsx` | `window.location.origin` | ✅ guarded |
| `PulsaraIntel.jsx` | `window.location.search` | ✅ guarded |
| `ScrollToTop.jsx` | `window.history.scrollRestoration` | ✅ guarded |
| `App.jsx` (BusinessApp) | `window.location` | ✅ guarded |
| `PulsaraSuite.jsx` | `window.requestAnimationFrame` | ✅ inside `useEffect` (safe) |

**No blocking changes needed before prerendering.** All browser-only API access is already protected.

### One watch item — `DOMPurify` in BlogDetail:

```js
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
```

`DOMPurify` requires a real DOM environment. Puppeteer provides a real Chromium DOM — **this works fine**. If Path C (JSDOM) is chosen instead, blog post body content may not render correctly.

---

## 6. Routes to Prerender

### Static routes (enumerate explicitly — 15 total)

| Route | Priority | Rationale |
|---|---|---|
| `/` | 🔴 Critical | Homepage — highest traffic |
| `/pulsara-intel` | 🔴 Critical | Primary conversion page |
| `/products` | 🔴 Critical | Product discovery |
| `/blog` | 🔴 Critical | Content index — drives organic traffic |
| `/blog/hidden-cost-of-employee-burnout` | 🔴 Critical | Newest post |
| `/blog/how-to-monitor-competitors` | 🔴 Critical | Newest post, targets key Intel keyword |
| `/services` | 🟠 High | Enterprise services — commercial intent |
| `/contact` | 🟠 High | Conversion page |
| `/company` | 🟡 Medium | Trust signal for investors |
| `/ai` | 🟡 Medium | AI solutions page |
| `/blog/ai-vs-burnout` | 🟡 Medium | Wellbeing content |
| `/blog/end-of-manual-scheduling-ai-workforce-management` | 🟡 Medium | Workforce content |
| `/blog/ai-energy-water-cost` | 🟡 Medium | Evergreen content |
| `/ortakliklar` | 🟢 Low | Turkish-only, lower traffic |
| `/privacy` | 🟢 Low | Legal page — thin content |

### Routes to explicitly exclude from prerender:

| Route | Reason |
|---|---|
| `/home` | Duplicate of `/` — has canonical pointing to `/` |
| `/business` | Legacy dead route — not in sitemap, not publicly linked |
| `/blog/:slug` | Dynamic pattern — each slug must be enumerated individually (done above) |

---

## 7. Expected vite.config.js After Implementation

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePrerender from 'vite-plugin-prerender'
import path from 'path'

const Renderer = vitePrerender.PuppeteerRenderer

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/pulsara-intel',
        '/products',
        '/blog',
        '/blog/hidden-cost-of-employee-burnout',
        '/blog/how-to-monitor-competitors',
        '/blog/ai-vs-burnout',
        '/blog/end-of-manual-scheduling-ai-workforce-management',
        '/blog/ai-energy-water-cost',
        '/services',
        '/contact',
        '/company',
        '/ai',
        '/ortakliklar',
        '/privacy',
      ],
      renderer: new Renderer({
        maxConcurrentRoutes: 2,         // lower = fewer Chromium instances = safer
        renderAfterTime: 2000,          // wait 2s for React to hydrate fully
        args: [
          '--no-sandbox',               // required for Linux/CI environments
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',    // prevents shared memory issues in containers
        ],
      }),
    }),
  ],
})
```

### Why `renderAfterTime: 2000`?

The site uses Framer Motion and IntersectionObserver-based animations. The prerenderer must wait for React to fully hydrate and render before capturing HTML. 2 seconds is conservative — could be reduced to 1000ms if build speed matters.

---

## 8. Build Output Structure After Prerendering

```
dist/
├── index.html                          ← homepage (prerendered)
├── pulsara-intel/
│   └── index.html                      ← Intel page (prerendered)
├── products/
│   └── index.html                      ← Products page (prerendered)
├── blog/
│   ├── index.html                      ← Blog list (prerendered)
│   ├── hidden-cost-of-employee-burnout/
│   │   └── index.html                  ← Blog post (prerendered)
│   ├── how-to-monitor-competitors/
│   │   └── index.html
│   ├── ai-vs-burnout/
│   │   └── index.html
│   ├── end-of-manual-scheduling-ai-workforce-management/
│   │   └── index.html
│   └── ai-energy-water-cost/
│       └── index.html
├── services/
│   └── index.html
├── contact/
│   └── index.html
├── company/
│   └── index.html
├── ai/
│   └── index.html
├── ortakliklar/
│   └── index.html
├── privacy/
│   └── index.html
└── assets/
    ├── index-xxx.js                    ← unchanged JS bundle
    └── index-xxx.css                   ← unchanged CSS
```

Vercel sees each route as a static file → serves it instantly, no rewrite needed.

---

## 9. Estimated SEO Impact

### Crawl speed
| Before | After |
|---|---|
| Googlebot crawls HTML shell, queues JS render | Googlebot reads full content on first HTTP request |
| New page indexed in 1–3 weeks | New page indexed in 1–3 days |
| Crawl budget spent on JS rendering queue | Crawl budget spent on content |

### Ranking signals unlocked

| Signal | Before prerender | After prerender |
|---|---|---|
| `<h1>` / `<h2>` headings | Not visible to crawler | ✅ Full heading hierarchy indexed |
| Body copy / keyword density | Not visible | ✅ All copy indexed |
| Blog post content | Not visible | ✅ Full article text indexed |
| JSON-LD schemas | Injected by JS — indexed with delay | ✅ Present in static HTML immediately |
| Internal link graph | Not discovered | ✅ All `<a>` tags crawled |
| Core Web Vitals (LCP) | React bundle must parse first | ✅ Meaningful HTML painted before JS |

### Estimated organic traffic impact (6-month horizon)
- **Blog posts**: Currently invisible. With prerendering + sitemap, expect first rankings within 4–8 weeks for long-tail queries.
- **Pulsara Intel page**: Currently not indexed for body copy. Key phrases ("rakip takip", "competitor monitoring Turkey") become crawlable.
- **Overall**: Crawlability is the single largest bottleneck for this site. Fixing it unlocks all other SEO investments (schemas, sitemap, titles) that currently sit behind a JS wall.

---

## 10. Implementation Effort Estimate

| Step | Description | Effort |
|---|---|---|
| 1 | Update puppeteer to v24 and test locally | 30 min |
| 2 | Update vite.config.js with plugin config | 20 min |
| 3 | Run `npm run build` locally — verify prerender output | 30 min |
| 4 | Inspect 3 prerendered HTML files for content completeness | 20 min |
| 5 | Push and verify Vercel build succeeds | 30 min |
| 6 | Validate with Google's Rich Results Test on 2 pages | 15 min |
| 7 | Submit sitemap to Search Console, request indexing | 15 min |
| **Total** | | **~2.5 hours** |

### Failure scenarios and fallbacks

| Failure | Probability | Fallback |
|---|---|---|
| Vercel build fails — Chromium binary issue | Medium | Switch to Path B (system Chromium) or Path C (JSDOM) |
| `renderAfterTime` too short — some pages render blank | Low | Increase to 3000ms |
| Blog posts render with unsanitized HTML (JSDOM path only) | High if JSDOM | Use Puppeteer path instead |
| Prerender adds >3 min to Vercel build time | Low | Reduce `maxConcurrentRoutes` to 1 |
| Puppeteer v24 incompatible with `renderer-puppeteer@0.2.0` | Medium | Update `vite-plugin-prerender` to latest or fork renderer |

---

## 11. What Prerendering Does NOT Fix

| Gap | Solution Required |
|---|---|
| New blog posts not auto-added to prerender route list | Must manually add slug to `vite.config.js` routes array each time a post is published |
| Dynamic routes beyond known slugs | No solution within this plugin — would need Next.js for truly dynamic SSG |
| hreflang tags | Still need to call `updateLinkTag` with hreflang args in SEO.jsx |
| OG images per page | Still needs per-page OG image assets |
| `vite build` time increase | Expect +1–3 min per 15 routes (Chromium overhead) |

The blog slug maintenance issue is operationally important: **every new blog post requires a `vite.config.js` update** to be prerendered. If this doesn't happen, new posts revert to CSR-only indexing. Consider adding a comment in `vite.config.js` to make this clear.

---

## 12. Decision Checklist Before Implementation

- [ ] Confirm Path A (puppeteer update) is acceptable — check `@prerenderer/renderer-puppeteer` changelog for compatibility
- [ ] Test `npm run build` locally with plugin configured — measure build time increase
- [ ] Inspect `dist/products/index.html` after local build — confirm React content is present (not blank)
- [ ] Inspect `dist/blog/hidden-cost-of-employee-burnout/index.html` — confirm article body text visible
- [ ] Confirm Vercel build succeeds on first deploy attempt
- [ ] After deploy: test `/products` with `curl -A "Googlebot" https://pulsaraai.com/products` — response should contain `<h1>` tag
