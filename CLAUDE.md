# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (English/Arabic) website built with Astro 7 and Bun. Fully static, zero client-side JS by default. Deploys to Cloudflare Pages. See `PRINCIPLES.md` for the full design specification.

## Commands

- `bun run dev` — Start dev server
- `bun run build` — Production build (outputs to `dist/`)
- `bun run preview` — Preview production build locally

## Architecture

- **Framework**: Astro 7, static site generation, strict TypeScript
- **Package manager**: Bun (`bun.lock`)
- **Routing**: File-based via `src/pages/`. Path-based localization: `/en/` and `/ar/` prefixes
- **Static assets**: `public/` (served as-is at site root)
- **Deployment**: Cloudflare Pages. `functions/index.ts` handles Accept-Language redirect at root. `public/_headers` sets caching and security headers.

### Key Patterns

- **BaseLayout** (`src/layouts/BaseLayout.astro`): Every page uses this. Requires `title`, `description`, `lang`, `currentPath` props. Optionally accepts `jsonLd` and `ogImage`.
- **SEOHead** (`src/components/SEOHead.astro`): Renders canonical, hreflang, OG, Twitter Card, and JSON-LD. Included by BaseLayout.
- **i18n system** (`src/i18n/`): `types.ts` defines `Lang` (`'en' | 'ar'`) and `Dir` types. `translations.ts` holds all UI strings as a typed const object — call `t(lang)` to get strings. `utils.ts` provides `getLangFromUrl`, `getDir`, `getLocalizedPath`, `getAlternateUrl`.
- **Content** (`src/data/`): typed `Record<Lang, …>` modules so both languages share one shape. `companies.ts` (the six Group companies: names, taglines, logos, photos, paths), `group.ts` (overview, legacy, milestones, chairman, vision/mission, values), `home.ts`, `company-pages.ts`, and `pages/*.ts` for interior-page copy. `translations.ts` keeps shared UI strings (site details, nav, footer, common labels).
- **Page creation**: Each page needs two thin route files (e.g., `src/pages/en/about.astro` and `src/pages/ar/about.astro`) that set `const lang = 'en'`/`'ar'` and render a shared page component (`src/components/<area>/…Page.astro`) inside BaseLayout. Copy goes in `src/data/`, never inline.
- **Shared components**: `PageHero` (every interior page opens with it; it holds the page's `<h1>` and reserves room for the fixed header — variants `wash`, `panel`, `plain`), `SectionHeading` (eyebrow + heading ending in the gold accent), `CtaLink` (outline/solid/text/on-dark), `Photo` (optimised images), `ContactBand` (closing contact section).

### CSS Architecture

`src/styles/global.css` defines the tokens (colors, type scale, spacing on 4px base, layout, motion), base typography and a few primitives: `.wrap` (content column), `.eyebrow`, `.gi` (gold accent, italic in English), `.reveal` (scroll-driven fade-up), `.visually-hidden`. Components use scoped `<style>` blocks referencing the tokens. Fonts are language-aware: use `var(--font-display)` / `var(--font-body)`, never a family name. English: Lora (display, variable 400–700 plus italic) and DM Sans (text, 400/500). Arabic: Almarai (display, 400/700) and IBM Plex Sans Arabic (text). All self-hosted in `public/fonts/`. Use logical properties (`inset-inline`, `margin-inline`, `text-align: start`) so layouts mirror in RTL; `--dir` is 1/-1 for directional transforms. Arabic gets no letter-spacing (global rule). Scroll-driven animations must use longhand properties (`animation-name`, `animation-timeline`, …): the LightningCSS minifier folds the shorthand into a form browsers drop.

### Images

- Content images live in `src/assets/images/` (company-profile photography in `profile/`) and render through `src/components/Photo.astro`: AVIF + WebP, a width ladder capped at the source size, lazy by default (`priority` for above-the-fold). The image fills its wrapper (`object-fit: cover`), so size the wrapper and style the image via `.wrapper :global(.photo)`.
- Photos carry their `alt` in the data modules, per language. Purely atmospheric backgrounds pass `decorative`.
- Logos stay as raw `<img>` in `public/images/logos/` (SVG, no optimization needed)

## Localization

- Two languages with equal weight — all content 1:1 translated
- URL structure: `nslootah.com/en/about`, `nslootah.com/ar/about`
- Root `/` redirects based on `Accept-Language` (Cloudflare function), with meta-refresh fallback to `/en/`
- RTL pages require `dir="rtl"` and `lang="ar"` on `<html>`
- Every page includes `hreflang` tags pointing to its counterpart and `x-default`

## Styling Rules

- Scoped styles only — no global style leaks between components
- Light theme only — no dark mode
- Design language: the 2026 Company Profile. Cool off-white page (`--color-page: #f5f5f4`), black ink, soft hairlines (`--color-rule`), alternate sections on `--color-page-alt: #ebebe8`
- Gold from the group monogram: `--color-gold: #af6a03` for display sizes only on light; `--color-gold-ink: #8c5502` for small text and hovers on light; `--color-gold-glow: #d9a441` on black
- Headings end in a gold accent word (`AccentTitle` → `{lead} <span class="gi">{accent}</span>`)
- Header: fixed, frosted off-white, transparent over the hero at the top of the page. Footer: black with light text
- Photos in heroes and the contact band sit under a page-coloured wash (grayscale, pale print); company photos run as full-height panels
- 1280px max content width, centered. 4px spacing scale. Mobile-first
- Self-hosted fonts, `font-display: swap`, preload above-the-fold weights
- All transitions respect `prefers-reduced-motion`
- Transitions use `0.3s ease` (not 200ms)

## Performance Targets

- Lighthouse 100 across all categories
- Zero client-side JS unless absolutely necessary
- LCP < 2.0s, FCP < 1.0s, CLS < 0.05, TBT 0ms
- Total page weight < 500KB
- Inline critical CSS, defer non-critical styles, preload key assets

## SEO

- Semantic HTML, one `<h1>` per page, logical heading hierarchy
- Unique `<title>` and `<meta description>` per page per language, canonical URLs
- JSON-LD (Organization on homepage, BreadcrumbList on interior pages), Open Graph, and Twitter Card meta on every page
- All `<img>` must have descriptive `alt` in page language

## Code Standards

- Strict TypeScript — no `any` in production code
- Semantic HTML first; `<div>` only when no semantic element fits
- WCAG 2.1 AA: keyboard accessible, visible focus indicators, 4.5:1 contrast, skip-to-content link
