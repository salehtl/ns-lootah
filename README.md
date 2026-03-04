# Astro SEO Template

A production-ready, bilingual (English/Arabic) static site template built with [Astro 5](https://astro.build) and [Bun](https://bun.sh). Designed for Lighthouse 100 scores, full SEO coverage, and WCAG 2.1 AA accessibility out of the box.

## Features

- **Bilingual with RTL support** — English and Arabic with path-based localization (`/en/`, `/ar/`), automatic `dir="rtl"`, and `hreflang` tags
- **Complete SEO setup** — Canonical URLs, Open Graph, Twitter Cards, JSON-LD structured data, and unique meta per page per language
- **Zero client-side JS** — Fully static output with Astro's zero-JS default
- **Accessible** — Skip-to-content links, keyboard navigation, visible focus indicators, 4.5:1 contrast ratios
- **Performance budgeted** — LCP < 2.0s, FCP < 1.0s, CLS < 0.05, TBT 0ms, total page weight < 500KB
- **Cloudflare Pages ready** — Includes `Accept-Language` redirect function and caching headers

## Quick Start

```bash
# Use this template on GitHub, then:
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
bun install
bun run dev
```

## Commands

| Command | Description |
| --- | --- |
| `bun run dev` | Start dev server |
| `bun run build` | Production build (outputs to `dist/`) |
| `bun run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/       # Reusable Astro components (Header, Footer, SEOHead, etc.)
├── i18n/
│   ├── types.ts      # Lang and Dir type definitions
│   ├── translations.ts  # All UI strings for both languages
│   └── utils.ts      # Helpers: getLangFromUrl, getDir, getAlternateUrl, etc.
├── layouts/
│   └── BaseLayout.astro # Shared page shell (head, header, main, footer)
├── pages/
│   ├── index.astro   # Root redirect → /en/
│   ├── 404.astro     # Not found page
│   ├── en/           # English pages
│   └── ar/           # Arabic pages
└── styles/
    └── global.css    # CSS custom properties, reset, typography, RTL overrides
public/
├── fonts/            # Self-hosted Inter variable font
├── _headers          # Cloudflare caching and security headers
└── robots.txt
functions/
└── index.ts          # Cloudflare Pages Accept-Language redirect
```

## Adding a New Page

1. Create both language versions: `src/pages/en/about.astro` and `src/pages/ar/about.astro`
2. Add translation keys to `src/i18n/translations.ts` under both `en` and `ar`
3. Use `BaseLayout` with `title`, `description`, `lang`, and `currentPath` props
4. Add JSON-LD structured data via the `jsonLd` prop

## Customization

- **Site URL** — Update `site` in `astro.config.mjs`
- **Colors and typography** — Edit CSS custom properties in `src/styles/global.css`
- **Translations** — Edit `src/i18n/translations.ts`
- **Fonts** — Replace `public/fonts/inter-variable.woff2` and update `@font-face` in `global.css`
- **Deployment** — Remove `functions/` and `public/_headers` if not using Cloudflare Pages

## License

MIT
