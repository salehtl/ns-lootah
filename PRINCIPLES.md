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

Luxe minimalism: warm, refined, heritage-meets-modernity. Generous whitespace, subtle shadows, serif/sans-serif pairing.

### Color Palette
- **Accent**: Champagne gold (`#cfb777`) — decorative accents, hover highlights, active states on dark backgrounds.
- **Interactive**: Dark gold/brown (`#8b7442`) — buttons, interactive link accents (passes WCAG AA on white).
- **Background**: Warm off-white (`#F6F2EF`) primary, rose-beige (`#f7dede`) for alternating sections and footer.
- **Content areas**: White (`#FFFFFF`).
- **Text**: Charcoal (`#333333`) for body, near-black (`#282828`) for headings.
- **Muted text**: Mid-gray (`#646464`) for captions, footer text.

### Typography
- **English headings**: Merriweather (serif) — self-hosted, regular (400) and bold (700).
- **English body**: Raleway (sans-serif) — self-hosted, multiple weights.
- **Arabic headings**: Noto Naskh Arabic (serif) — complements Merriweather's editorial feel.
- **Arabic body**: IBM Plex Sans Arabic — pairs with Raleway's clean geometry.
- H1: bold (700), H2/H3: regular (400). Body line-height 1.8.

### Layout
- Generous whitespace, card-based sections with subtle shadows.
- Section rhythm: alternating white and warm beige backgrounds.
- 1280px standard / 1510px wide / 842px narrow containers. 4px spacing scale. Mobile-first.
- Light header with warm beige border. Light warm footer.

### Buttons & Interactive Elements
- Primary buttons: dark gold (`#8b7442`) fill, white text, minimal border-radius (4px).
- Hover: elevated shadow (`0px 15px 25px -7px rgba(0,0,0,0.1)`).
- Focus: 2px gold outline with offset.

### Shadows & Borders
- Cards: subtle shadow (`0px 15px 15px -10px rgba(0,0,0,0.05)`), no visible borders.
- Minimal border-radius (4px for UI elements, 8px for images).

### Motion
- Subtle only. Gentle fade-ins on scroll, smooth hover transitions (0.3s ease).
- All transitions respect `prefers-reduced-motion`.
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

- **Framework**: Astro 5 (static site generation).
- **Package manager**: Bun.
- **Styling**: Scoped styles or CSS modules. No global style leaks.
- **TypeScript**: Strict mode. No `any` in production.
- **Light theme only**. No dark mode toggle.
- Semantic HTML first. `<div>` only when no semantic element fits.
- Component isolation — no implicit dependencies on parent styles or global state.
