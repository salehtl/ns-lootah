# Website Principles

Guiding principles for this website. Every design decision, technical choice, and content update must align with these.

---

## 1. Purpose

Corporate website for NS Lootah Group, a diversified business group spanning trading, automotive, energy, and project services. Serves both B2B clients and end consumers — establishing credibility, showcasing capabilities, and generating inquiries.

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

Modern corporate: clean, trustworthy, forward-looking. Sharp lines, clear hierarchy, approachable authority.

### Color Palette
- **Primary**: Deep classic navy (`#1B2A4A`) — headings, footer background, buttons, key UI elements.
- **Accent**: Warm gold (`#C8963E`) — highlights, icons, decorative touches. Used sparingly, never on buttons.
- **Background**: Cool off-white (`#F4F6F8`) primary, light cool gray (`#E8ECF0`) for alternating sections.
- **Text**: Near-black (`#1A1D23`) for body, navy for headings.
- **Neutrals**: Cool gray scale for borders, muted text, and dividers.

### Typography
- **English headings**: Archivo (geometric sans-serif) — self-hosted, variable weight.
- **English body**: Archivo — same family for cohesion.
- **Arabic**: IBM Plex Sans Arabic — geometric, complements Archivo's structure.
- Tight heading tracking (`-0.02em`), relaxed body line-height (`1.6`).

### Layout
- Grid-structured, card-based sections. Orderly and scannable.
- Section rhythm: alternating white and light cool gray backgrounds.
- 1200px max content width. 4px spacing scale. Mobile-first.
- Light header, dark navy footer.

### Buttons & Interactive Elements
- Primary buttons: solid navy fill with subtle shadow. No gold on buttons.
- Hover: slight lightening or shadow lift.
- Focus: 2px navy outline with offset.

### Motion
- Subtle only. Gentle fade-ins on scroll, smooth hover transitions.
- All transitions respect `prefers-reduced-motion`.
- No parallax, no carousels. Interactions < 300ms, entrances < 600ms.

### Contrast
- 4.5:1 for body text, 3:1 for large text (WCAG AA).
- Color never the sole means of conveying information.

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
