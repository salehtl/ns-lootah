# Website Principles

Guiding principles for this website. Every design decision, technical choice, and content update must align with these.

---

## 1. Purpose

<!-- Define what this site is and who it serves. -->

---

## 2. Localization

Path-based localization (`/en/`, `/ar/`) with equal weight for each language.

- Root `/` redirects based on `Accept-Language`, defaulting to English.
- RTL pages require `dir="rtl"` and `lang` on `<html>`, mirrored layouts, and bidi text handling.
- Every page includes `hreflang` tags pointing to its counterpart and `x-default`.
- Content is translated 1:1 — no orphaned content in either language.

---

## 3. SEO

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
- Unique `<title>` and `<meta description>` per page per language.
- Canonical URLs on every page.
- Open Graph and Twitter Card meta on every page.
- JSON-LD: Organization schema on homepage, BreadcrumbList on interior pages.
- One `<h1>` per page, logical heading hierarchy.
- Descriptive `alt` text on all images in the page's language.
- Clean URL slugs — no IDs or query strings for content.
- 404 page with navigation back to key sections.

---

## 4. Performance

Target: **Lighthouse 100** across all categories.

| Metric | Budget |
| ------ | ------ |
| FCP | < 1.0s |
| LCP | < 2.0s |
| CLS | < 0.05 |
| TBT | 0ms |
| Page weight | < 500KB |

- Zero client-side JS unless absolutely necessary (Astro zero-JS default).
- Inline critical CSS, defer non-critical styles.
- Preload key assets (fonts, above-the-fold images).
- Self-host all fonts with `font-display: swap`.

---

## 5. Media

- **Images**: AVIF primary, WebP fallback via `<picture>` + `<source>`. No PNG/JPEG (use SVG for icons/logos).
- **Icons**: Inline SVG only.
- `srcset` with 3+ widths, `sizes` matching layout breakpoints.
- Explicit `width`/`height` on every `<img>`.
- Lazy load below-the-fold; eagerly load and preload above-the-fold.
- Hero images < 80KB, thumbnails < 40KB.

---

## 6. Aesthetics

- Minimal, generous whitespace. Content and typography convey authority.
- Neutral color foundation + one accent color, used sparingly.
- 4.5:1 contrast for body text, 3:1 for large text (WCAG AA).
- Mobile-first. 1200px max content width. 4px spacing scale.
- Subtle motion only. All transitions respect `prefers-reduced-motion`.
- No parallax, no carousels. Interactions < 300ms, entrances < 600ms.

---

## 7. Accessibility (WCAG 2.1 AA)

- Keyboard accessible with visible focus indicators.
- ARIA landmarks and labels where semantic HTML is insufficient.
- Skip-to-content link on every page.
- Color never the sole means of conveying information.

---

## 8. Technical Standards

- **Framework**: Astro 5 (static site generation).
- **Package manager**: Bun.
- **Styling**: Scoped styles or CSS modules. No global style leaks.
- **TypeScript**: Strict mode. No `any` in production.
- **Light theme only**. No dark mode toggle.
- Semantic HTML first. `<div>` only when no semantic element fits.
- Component isolation — no implicit dependencies on parent styles or global state.
