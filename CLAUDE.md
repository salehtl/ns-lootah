# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (English/Arabic) website built with Astro 5 and Bun. Fully static, zero client-side JS by default. Deploys to Cloudflare Pages. See `PRINCIPLES.md` for the full design specification.

## Commands

- `bun run dev` — Start dev server
- `bun run build` — Production build (outputs to `dist/`)
- `bun run preview` — Preview production build locally

## Architecture

- **Framework**: Astro 5, static site generation, strict TypeScript
- **Package manager**: Bun (`bun.lock`)
- **Routing**: File-based via `src/pages/`. Path-based localization: `/en/` and `/ar/` prefixes
- **Static assets**: `public/` (served as-is at site root)
- **Deployment**: Cloudflare Pages. `functions/index.ts` handles Accept-Language redirect at root. `public/_headers` sets caching and security headers.

### Key Patterns

- **BaseLayout** (`src/layouts/BaseLayout.astro`): Every page uses this. Requires `title`, `description`, `lang`, `currentPath` props. Optionally accepts `jsonLd` and `ogImage`.
- **SEOHead** (`src/components/SEOHead.astro`): Renders canonical, hreflang, OG, Twitter Card, and JSON-LD. Included by BaseLayout.
- **i18n system** (`src/i18n/`): `types.ts` defines `Lang` (`'en' | 'ar'`) and `Dir` types. `translations.ts` holds all UI strings as a typed const object — call `t(lang)` to get strings. `utils.ts` provides `getLangFromUrl`, `getDir`, `getLocalizedPath`, `getAlternateUrl`.
- **Page creation**: Each page needs two files (e.g., `src/pages/en/about.astro` and `src/pages/ar/about.astro`). Each sets `const lang = 'en'`/`'ar'` explicitly and passes it to BaseLayout. Add corresponding translation keys to `src/i18n/translations.ts`.

### CSS Architecture

`src/styles/global.css` defines CSS custom properties (colors, type scale, spacing on 4px base, layout). Components use scoped `<style>` blocks referencing these variables. RTL overrides use `html[dir="rtl"]` selectors. Fonts: Merriweather (English headings, serif), Raleway (English body, sans-serif), Noto Naskh Arabic (Arabic headings, serif), IBM Plex Sans Arabic (Arabic body) — all self-hosted at `public/fonts/`.

### Images

- Content images live in `src/assets/images/` and use Astro's `<Image>` component (`import { Image } from 'astro:assets'`) for automatic optimization (WebP conversion, resizing)
- CSS background images (hero sections) must stay in `public/images/` — Astro cannot process `url()` references
- Logos stay as raw `<img>` in `public/images/` (small files, no optimization needed)
- Every `<Image>` must have: descriptive `alt` (via i18n), numeric `width`/`height`, `loading="lazy"` for below-fold images

## Localization

- Two languages with equal weight — all content 1:1 translated
- URL structure: `nslootah.com/en/about`, `nslootah.com/ar/about`
- Root `/` redirects based on `Accept-Language` (Cloudflare function), with meta-refresh fallback to `/en/`
- RTL pages require `dir="rtl"` and `lang="ar"` on `<html>`
- Every page includes `hreflang` tags pointing to its counterpart and `x-default`

## Styling Rules

- Scoped styles only — no global style leaks between components
- Light theme only — no dark mode
- Champagne gold accent (`--color-gold: #cfb777`) + dark gold (`--color-gold-dark: #8b7442`) for buttons/interactive. Warm beige backgrounds.
- Header and footer: full black (`#000000`) backgrounds with white/light text
- Section alternating backgrounds: `--color-bg-alt: #F0EBE6` (warm neutral beige)
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
