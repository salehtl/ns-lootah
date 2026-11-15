---
name: site-brand
description: Apply or change a client's visual identity on a site made from the client-site template — colours and design tokens, the brand mark and wordmark, icons, share cards, and fonts (including checking font licences, self-hosting, Arabic fonts and subsetting). Use this whenever the user hands over brand guidelines, a logo, colours or fonts, asks to "match the logo", try a different typeface, change the palette, or questions whether a font can be used commercially — even if they don't say "brand".
---

# Brand: tokens, mark, wordmark, fonts

The brand lives in four places. Change the source, then run its generator; never edit the generated file.

| What | Source | Generate |
| --- | --- | --- |
| Colours, type scale, spacing, motion | `src/styles/site.tokens.json` (DTCG 2025.10) | `bun run tokens` → `src/styles/tokens.css` |
| Brand mark | `src/assets/brand/mark.svg` (one `<rect>`, one `<path>`) | `bun run icons` → favicon, app icons |
| Share cards | hero photo + mark | `bun run og` → `public/og.jpg`, `og-<locale>.jpg` |
| Fonts | `public/fonts/*.woff2` + `@font-face` in `src/styles/global.css` + preloads in `src/layouts/Base.astro` | — |

The wordmark is live text: the site name and `nav.kind` from `src/content/copy/<locale>/site.json`, styled in
`Header.astro` and `Footer.astro` with `--font-brand` and `--font-arabic-brand`.

## Working with the user on brand

- Show options before committing to one. Make each option real: build the site with that change and screenshot
  the home page (see `site-qa`), then lay the screenshots side by side (a Paper page if the user uses Paper, or an
  HTML contact sheet). Label them A, B, C; the user replies with a letter. If the user can't be asked (they said
  "just do it", or you're working unattended), apply the strongest option, say why, and keep the others easy to
  try.
- When the user rejects a client's guideline (their logo, say), keep the user's choice and note the exception in
  the project memory, so later work doesn't "fix" it back.
- A client's guideline font may not be licensed for the web (see Fonts). Raise it before building with it.

## Tokens

- Edit the token file with targeted edits (Edit tool or a precise `sed`), not by re-serialising the JSON: that
  reformats every line and buries the change in the diff.
- Colours carry `components` (sRGB 0–1) and `hex`; keep them in step. Work out components as `hex / 255` to 4 places.
- DTCG constraints: dimensions are px or rem only, so letter-spacing in em becomes px per size (−0.01em at 56px is
  −0.56px); line height inside a typography token is a plain multiplier; there is no opacity or text-transform
  type (capitals are applied in CSS).
- Check contrast and say the ratios when you change colours: `color.muted` and `color.text` on `color.bg` and
  `color.surface` (4.5:1 or better), and white on `color.primary` (buttons and the footer). The footer's lighter
  text is mixed from white and the primary (`color-mix` in `Footer.astro`); with a mid-tone primary, check the
  76% mix still reaches 4.5:1 and raise the percentage if not.
- `theme-color` in `Base.astro` is the page background (`#ffffff`); change it if `color.bg` isn't white.
- Semantic tokens (`color.primary`, `color.text`, `color.ink`…) point at palette tokens. Change the palette; keep
  the semantic names, because components use them.

## Mark and icons

- The mark is an SVG with exactly one `<rect>` (the ground) then one `<path>` (the letters). `BrandMark.astro`
  recolours them for reversed use, so keep that structure. Outline any letters to paths, so the mark never waits
  on a web font.
- The `<rect>`'s fill in the file must be the brand colour: the page recolours the mark from tokens, but
  `bun run icons` and `bun run og` use the file as it is.
- A monogram from a font (licence permitting; OFL is fine): `scripts/mark-from-font.py` outlines one or more
  letters, centred inside the maskable safe zone, and writes `mark.svg`. The command (fontTools needs brotli to read
  woff2) is at the top of the script. Or use an SVG from the client's designer, reduced to one rect and one path.
- After changing the mark: `bun run icons`, then `bun run og`.

## Fonts

Read `references/fonts.md` before adding, swapping or subsetting a font. The short version:

1. **Licence first.** OFL (Google Fonts, Fontsource) is safe to self-host. Many "free" fonts, system fonts and
   government fonts are not: Dubai's EULA forbids converting it or serving it as downloadable files, which
   self-hosting a woff2 does. Times New Roman can't be web-hosted either. Read the licence and quote the
   relevant clause to the user.
2. **Self-host** the woff2 in `public/fonts/` with its licence text beside it. Don't use Google Fonts' CDN
   (privacy, and it doesn't load in headless renders).
3. **Split by script** with `unicode-range` (Fontsource ships `-arabic-` and `-latin-` files), so each page only
   downloads what it shows. Preload only what sets the first screen, per direction, in `Base.astro`.
4. **Bump the file name** whenever a font file's contents change (`-v2`). Fonts are cached for 30 days
   (`public/_headers`), and a stale cached subset breaks Arabic joining mid-word.
5. Arabic body text must be legible at 16–18px. Pair a readable Arabic sans for body with any display face for
   headings. Arabic gets no letter-spacing and no capitals.

## After any brand change

Run `bun run build`, screenshot home, a service page and contact in both languages at desktop and phone width,
and look at them before reporting. Brand changes often break wrapping in the header lockup at narrow widths.
