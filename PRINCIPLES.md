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

Distilled from the 2026 Company Profile: editorial, light and image-led. Heritage carried by type and photography rather than ornament. Generous whitespace, hairline rules instead of cards and shadows.

### Color Palette
- **Page**: cool off-white (`#F5F5F4`); alternate sections on `#EBEBE8`.
- **Ink**: near-black (`#0A0A0A`) for headings and text; muted (`#66665F`) for secondary text.
- **Rules**: soft hairlines (`#D7D7D2`).
- **Gold** (from the group monogram): `#AF6A03` for display-size accents on light; `#8C5502` for small text, hovers and buttons on light (5.6:1); `#D9A441` on black.
- **Footer**: black (`#000000`) with light text.

### Typography
- **English**: Lora for display (regular weight, gold italic accent on the last word or phrase), DM Sans for text.
- **Arabic**: Almarai for display, IBM Plex Sans Arabic for text. No letter-spacing; the accent is gold, not italic.
- Large display sizes, tight leading in English, relaxed leading in Arabic. Body line-height ~1.65 (EN) / ~1.85 (AR).

### Layout
- 1280px content column, fluid gutter, 4px spacing scale. Mobile-first.
- Every page opens with a hero under a fixed, frosted header.
- Company photography as full-height panels bleeding off the page edge; architectural photography as pale, washed prints behind type.
- Sections divided by hairlines; numbered, ruled lists for values, milestones and portfolio items.

### Buttons & Interactive Elements
- Gold hairline outline with a trailing arrow; fills dark gold on hover. Text links underlined in gold.
- Focus: 2px dark-gold outline with offset.

### Motion
- Subtle only: load-in rises on heroes, scroll-driven reveals and photo unveils (progressive enhancement), 0.3s ease hovers.
- All motion respects `prefers-reduced-motion`.
- No parallax, no carousels.

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

- **Framework**: Astro 7 (static site generation).
- **Package manager**: Bun.
- **Styling**: Scoped styles or CSS modules. No global style leaks.
- **TypeScript**: Strict mode. No `any` in production.
- **Light theme only**. No dark mode toggle.
- Semantic HTML first. `<div>` only when no semantic element fits.
- Component isolation — no implicit dependencies on parent styles or global state.
