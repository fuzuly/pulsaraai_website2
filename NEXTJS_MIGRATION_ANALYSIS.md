# React+Vite+Prerender vs Next.js 15 App Router
## Architectural Decision — pulsaraai.com
**Date:** 2026-05-31  
**Scope:** Long-term SEO architecture for a startup targeting organic growth at scale

---

## The Core Question

`vite-plugin-prerender` solves the CSR problem *today*, for *15 routes*. The plan calls for 100 blog posts, 500 programmatic SEO pages, competitive intelligence reports, and a wellbeing content hub. At that scale, the question is not whether to migrate — it's when.

---

## Option 1: React + Vite + vite-plugin-prerender

### How it works at scale

Every URL that must be crawlable by Google must be:
1. Manually added to the `routes[]` array in `vite.config.js`
2. Rendered by a headless Chromium instance at build time
3. Rebuilt and redeployed whenever content changes

```js
// vite.config.js at 500 programmatic pages
routes: [
  '/',
  '/pulsara-intel',
  '/products',
  // ... 12 more static routes
  '/intel/reports/coffee-chains-istanbul-q1-2026',
  '/intel/reports/coffee-chains-istanbul-q2-2026',
  // ... 498 more lines
  '/blog/post-1',
  '/blog/post-2',
  // ... 98 more lines
]
```

This is not a theoretical problem. This is what the config file looks like.

### Build time math

| Content volume | Routes | Render time @ 2s/route | Build time |
|---|---|---|---|
| Today | 15 | 30s | ~2 min total |
| 50 blog posts | 65 | 130s | ~4 min |
| 100 blog posts | 115 | 230s | ~6 min |
| 100 blogs + 500 programmatic | 615 | 1,230s | **~22 min** |
| Full vision | 700+ | 1,400s+ | **>25 min** |

Vercel build timeout on Pro plan: **45 minutes**. On free tier: **5 minutes**.  
At full scale, every deploy approaches Vercel's hard limit on paid plans and **exceeds it on free tier**.

Even if the build completes, a 22-minute build pipeline means:
- Fixing a typo takes 22 minutes to go live
- Publishing a new blog post requires a code change + 22-minute deploy
- A content editor cannot publish without a developer

### SEO ceiling

| SEO need | vite-plugin-prerender | Limitation |
|---|---|---|
| New blog post indexed same day | ❌ | Requires code change + deploy |
| Auto-generated sitemap | ❌ | Manual maintenance |
| Per-page OG images | ❌ | No built-in solution |
| ISR (update page without full rebuild) | ❌ | All-or-nothing rebuild only |
| CMS-driven content | ❌ | blogPosts.js is a JS file, not a CMS |
| 500 programmatic pages | ⚠️ | Works but build time becomes untenable |
| Dynamic competitive intelligence reports | ❌ | No server-side data fetching |

### Maintenance reality

Publishing 1 new blog post today requires:
1. Add content to `blogPosts.js`
2. Add slug to `vite.config.js` routes array
3. Git commit both files
4. Push → trigger Vercel build
5. Wait for build + prerender
6. Verify

This is a **developer-gated workflow**. A content writer cannot publish independently.

---

## Option 2: Next.js 15 App Router

### How it solves the same problems

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  // Reads from data source — no manual route list
  return blogPosts.map(post => ({ slug: post.slug }))
}

// At build time: Next.js calls this, discovers all slugs automatically
// New blog post in blogPosts.js → rebuild → new page exists
// No vite.config.js to touch. Ever.
```

For 500 programmatic pages:

```tsx
// app/intel/reports/[city]/[sector]/page.tsx
export async function generateStaticParams() {
  return cities.flatMap(city =>
    sectors.map(sector => ({ city: city.slug, sector: sector.slug }))
  )
}
// 500 pages generated from 10 cities × 50 sectors
// Adding a city = add to data array = automatic
```

### Build time math

Next.js uses concurrent static generation with worker threads, not sequential Puppeteer:

| Content volume | Routes | Next.js build | Vite+Prerender |
|---|---|---|---|
| Today (15) | 15 | ~20s | ~2 min |
| 100 blog posts | 115 | ~45s | ~6 min |
| 500 programmatic | 615 | ~2–3 min | ~22 min |
| 700+ pages | 700+ | ~4 min | >25 min |

Next.js uses Node.js rendering (no Chromium overhead). Each route renders in ~10–50ms, not 2000ms.

### SEO capabilities

| SEO need | Next.js 15 App Router | Notes |
|---|---|---|
| Static HTML for every route | ✅ | Default behavior, no config |
| Auto sitemap generation | ✅ | `app/sitemap.ts` reads from data |
| Per-page OG images | ✅ | `next/og` ImageResponse — generated at build |
| ISR (page refresh without rebuild) | ✅ | `revalidate: 3600` or on-demand |
| CMS integration | ✅ | Contentful, Sanity, Notion, MDX |
| Metadata API | ✅ | `generateMetadata()` per route |
| Dynamic competitive reports | ✅ | Server components fetch at request time or ISR |
| hreflang | ✅ | `alternates` in metadata API |
| BlogPosting schema | ✅ | Per-page `generateMetadata()` |
| Core Web Vitals (LCP) | ✅ | `next/image`, `next/font`, streaming |
| React Server Components | ✅ | Zero JS shipped for static content |

### Auto-sitemap example

```ts
// app/sitemap.ts — runs at build time, always accurate
import { blogPosts } from '@/data/blogPosts'

export default function sitemap() {
  const blogUrls = blogPosts.map(post => ({
    url: `https://pulsaraai.com/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: 'https://pulsaraai.com', priority: 1.0 },
    { url: 'https://pulsaraai.com/pulsara-intel', priority: 0.9 },
    ...blogUrls,
    // new blog post → auto-appears here
  ]
}
```

No manual sitemap.xml maintenance. Ever.

### Per-page OG images

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export default function OGImage({ params }) {
  const post = getPost(params.slug)
  return new ImageResponse(
    <div style={{ background: '#7c3aed', padding: 40 }}>
      <h1>{post.title}</h1>
      <p>Pulsara AI</p>
    </div>
  )
}
// Result: unique OG image per blog post, auto-generated
```

Solves the "every page shares og-default.png" problem without any manual image creation.

### Content publishing workflow

Publishing a blog post with Next.js + file-based content:
1. Add post to `blogPosts.js` (or CMS)
2. Git push
3. Vercel build (~3 min for 100 posts)
4. Live

With Next.js + CMS + ISR:
1. Content writer publishes in CMS
2. CMS webhook triggers `revalidatePath('/blog/new-slug')`
3. Page is live **without any code change or deploy**

A non-developer can publish a blog post in 5 minutes.

---

## Head-to-Head Comparison

| Dimension | React+Vite+Prerender | Next.js 15 App Router |
|---|---|---|
| **Initial setup effort** | 2.5 hours | 1–2 weeks migration |
| **SEO (today, 15 routes)** | ✅ Adequate after fix | ✅ Better |
| **SEO (100 blog posts)** | ⚠️ Manageable, painful | ✅ Excellent |
| **SEO (500 programmatic)** | ❌ Build time breaks | ✅ Built for this |
| **New post = deploy time** | 22+ min at scale | 3–4 min |
| **New post needs developer** | ✅ Yes, always | ❌ No, with CMS+ISR |
| **Auto sitemap** | ❌ Manual XML | ✅ `app/sitemap.ts` |
| **Per-page OG images** | ❌ Manual assets | ✅ `next/og` built-in |
| **ISR (partial updates)** | ❌ Full rebuild only | ✅ Per-page revalidation |
| **hreflang** | Manual SEO.jsx | ✅ `alternates` in metadata |
| **CMS integration** | ❌ Painful | ✅ First-class |
| **Competitive reports (dynamic)** | ❌ No server fetching | ✅ Server components |
| **Vercel cost** | Free tier sufficient | Pro likely needed ($20/mo) |
| **Framework stability** | Vite stable, prerender plugin low-maintenance | Next.js stable, Vercel-backed |
| **Ecosystem** | Large (React) | Larger (Next.js ecosystem) |
| **App Router complexity** | Simple | Client/server boundary learning curve |
| **React components reuse** | N/A (current) | ~80% reusable with `'use client'` |

---

## The 500 Programmatic Page Problem

This is the deciding factor.

Programmatic SEO at scale means generating pages like:
- `/intel/competitive-analysis/coffee-chains-istanbul`
- `/intel/competitive-analysis/fast-food-ankara`
- `/intel/competitive-analysis/fashion-izmir`
- `/intel/monitor/starbucks-turkey-reviews`
- `/blog/competitor-monitoring-for-[sector]`
- `/markets/istanbul-food-beverage`

With vite-plugin-prerender: each of these 500 URLs must be typed into `vite.config.js`. At 2s/route, the build becomes a 22-minute job. Extending the list by 50 pages adds 1.5 minutes to every deploy. The config file becomes a 600-line list that must be kept in sync with content by a developer.

With Next.js:

```tsx
// app/intel/[city]/[sector]/page.tsx
export async function generateStaticParams() {
  return cities.flatMap(city =>
    sectors.map(sector => ({ city, sector }))
  )
}
```

Adding 50 cities and 10 sectors produces 500 pages automatically. Adding a new city = 1 line change in a data array.

**There is no version of vite-plugin-prerender that handles programmatic SEO at scale gracefully.**

---

## Migration Complexity Assessment

### What transfers directly (~80% of code)

- All React components — work in Next.js with `'use client'` directive where needed
- Tailwind CSS — identical
- framer-motion — works with `'use client'`
- translations object — works unchanged
- blogPosts.js data — works unchanged
- All UI logic, state, forms — unchanged

### What requires rewriting (~20%)

| Current | Next.js equivalent | Effort |
|---|---|---|
| `react-router-dom` Routes | `app/` directory file-based routing | Medium |
| `SEO.jsx` component | `generateMetadata()` per page | Medium |
| `main.jsx` BrowserRouter | `app/layout.tsx` RootLayout | Low |
| Formspree forms | Unchanged | None |
| `emailjs-com` | Unchanged | None |
| Context providers | Add `'use client'` directive | Low |
| `HeroVideoHeader` with video | Add `'use client'` directive | Low |
| `BlogDetail` with DOMPurify | Server component (no DOMPurify needed) | Low |

### Estimated migration effort

| Phase | Work | Effort |
|---|---|---|
| Project scaffolding + routing | Create `app/` structure, move pages | 2 days |
| Component migration | Add `'use client'` where needed | 1 day |
| Metadata API migration | Replace SEO.jsx with generateMetadata() | 1 day |
| Blog system | generateStaticParams() + sitemap | 0.5 days |
| Styling + testing | Verify all pages render correctly | 1 day |
| Deploy + DNS | Vercel project, verify | 0.5 days |
| **Total** | | **~1 week** |

This assumes one developer familiar with both React and Next.js basics.

---

## Cost Analysis

### React + Vite (current)
- Vercel free tier: $0/month
- Build minutes: stays within free (currently)
- At 500 programmatic pages: 22-min builds → **exceeds Vercel free tier** (5-min limit)
- Vercel Pro needed: **$20/month**

### Next.js 15 on Vercel
- Vercel free tier: covers static sites
- Server components + ISR trigger serverless functions → **Vercel Pro likely needed** at scale
- Estimated: **$20–40/month** depending on ISR revalidation frequency
- Alternative: self-host on Cloudflare Pages + OpenNext adapter ($0 infra, ~$5/mo for workers)

**Cost difference at scale: roughly equal.** Both require Vercel Pro or equivalent at the content volumes described.

---

## Recommendation

### For a startup targeting long-term organic growth at scale: **Migrate to Next.js 15 App Router.**

**The vite-plugin-prerender path is a local maximum.** It solves today's problem (15 routes, CSR-only) but creates a ceiling that breaks at exactly the scale this product is targeting. The 500-page programmatic SEO content strategy is architecturally incompatible with vite-plugin-prerender at acceptable build times.

The question is not *if* to migrate but *when*.

---

## Recommended Execution Sequence

### Phase 1: This week — Ship prerender for current 15 routes
Configure vite-plugin-prerender per the PRERENDER_PLAN.md. Takes 2.5 hours.

**Why:** Fixes immediate CSR problem. Blog posts and Intel page become crawlable today. Don't leave current content invisible while the migration happens.

### Phase 2: Next 2 weeks — Migrate to Next.js in parallel
Build the Next.js version on a separate branch while the current prerendered Vite site is live. Don't block organic growth on migration timeline.

### Phase 3: Cutover
Deploy Next.js to replace Vite. The Vite site stays live until Next.js is fully validated. Zero downtime cutover via Vercel preview → production promotion.

### Phase 4: Content at scale
With Next.js running, implement:
- CMS integration (Sanity or file-based MDX) — non-developer content publishing
- Auto-sitemap generation
- OG image generation via `next/og`
- Programmatic page templates
- ISR for competitive intelligence reports

---

## Decision Matrix

```
If your content volume stays under 50 pages forever:
→ vite-plugin-prerender is fine. Don't migrate.

If you plan 100 blog posts:
→ vite-plugin-prerender becomes painful. Migration recommended.

If you plan 500 programmatic pages:
→ vite-plugin-prerender breaks. Migration required.

If you want non-developers to publish content:
→ Next.js + CMS. vite-plugin-prerender cannot solve this.

If you want per-page OG images auto-generated:
→ Next.js. vite-plugin-prerender cannot solve this.

If you want ISR (update a page without full redeploy):
→ Next.js. vite-plugin-prerender cannot solve this.
```

For a startup with the stated content ambitions: every row points to Next.js.

---

## One Counterargument Worth Acknowledging

The App Router has a meaningful learning curve. The client/server component boundary trips up developers new to it. `'use client'` placement bugs are a common source of subtle errors. If the team is a solo founder or very small with no Next.js experience, the 1-week migration estimate may stretch to 2–3 weeks.

**However:** The architectural benefit compounds. Every week spent on vite-plugin-prerender is a week building on a foundation that will need to be replaced anyway. The opportunity cost of delay is real — every week without prerendering is a week of CSR-only indexing.

Tactical answer: **Ship vite-plugin-prerender this week.** Strategic answer: **Migrate to Next.js within 30 days.**
