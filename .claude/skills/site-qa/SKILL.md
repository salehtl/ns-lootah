---
name: site-qa
description: Check a site made from the client-site template before showing or shipping it — full-page screenshots in every language at desktop and phone width, SEO and metadata checks (titles, descriptions, canonical, hreflang, share cards, sitemap, robots), placeholders left in copy, performance and image weight, accessibility basics, and a pre-launch checklist. Use after any visible change, before every push the user will look at, when comparing design options, and whenever the user asks "does this look right", "is it ready to launch", or reports something looks off in a browser.
---

# Review and launch checks

Look at what you changed before reporting it. Screenshots are the main evidence; say what you couldn't check.

## Screenshots

```sh
nix develop -c bun run build
nix develop -c bun .claude/skills/site-qa/scripts/shots.ts --out <scratch dir>/shots [--pages /,/about/] [--widths 1440,390]
```

It serves `dist/` on its own port and opens each page in every locale at each width in a real-sized viewport (900px
tall, 844px on phones, so full-screen sections keep their true height). It scrolls through the page so lazy photos
load, shows all scroll-triggered content at once, renders with reduced motion so animations show their end state,
captures the full page over the DevTools protocol and splits long pages into `-1`, `-2`… parts. It prints the files
and any console errors. Read the files and compare the languages side by side. Look for:

- Header lockup wrapping, nav overflow at 390px, the language switch present.
- Text over busy parts of a photo; the right-to-left hero (photo side, fade, no visible seam).
- Arabic letters joining (a missing glyph falls back to another font and breaks the word), no letter-spacing or
  capitals on Arabic.
- Placeholder brackets left in places the user expects real copy.
- Empty sections (a scroll-reveal that never fired) and broken images.

For an interactive check (menu, form errors, hover), use the browser pane on `bun --bun astro preview --port <free
port>`; another site's preview may already hold 4321. The pane is Chromium: it can't stand in for Safari, so say so
when a change involves masks, gradients, fonts or `backdrop-filter`.

To show design options, build each variant, screenshot it at the same size, and put them side by side, labelled
A, B, C, for the user to pick.

## Crop correctly

`sips -c` crops from the centre. Use `magick in.png -crop WxH+X+Y +repage out.png`.

## SEO and metadata

Run `scripts/seo-check.ts` against `dist/` (`nix develop -c bun .claude/skills/site-qa/scripts/seo-check.ts`). It
checks every built page for a title, a description of sensible length, a canonical URL on the production domain,
hreflang alternates (each language and `x-default`), Open Graph and Twitter image tags that point at real files, a
single `h1`, `lang` and `dir` on `<html>`, and that the sitemap lists every indexable page and no `noindex` page. Fix
what it reports.

## Before launch

Read `references/launch-checklist.md` and go through it with the user. Report it as two lists: done and checked,
and still open (with who needs to act: the client, the user, or you).
