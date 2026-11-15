# Working on this site

nslootah.com, the N S Lootah Group website: a static, bilingual (English and Arabic) site built on
`salehtl/client-site-template`. Read `README.md` for the layout. The skills in `.claude/skills/` cover the recurring
jobs: `site-brand`, `site-content`, `site-images`, `site-deploy` and `site-qa`. Load the matching one before
starting that kind of work.

## Commands

Everything runs in the flake's dev shell: `nix develop -c bun run <script>` (or plain `bun run` with direnv).
Run Astro as `bun --bun astro <cmd>`. Dev and preview servers run in the background; stop them with
`bun --bun astro dev stop` or `preview stop`. Only one preview per machine: pass `--port` for another.

## Rules

- `master` is production: every push deploys. Commit when asked. Push only when the user says to push in the
  same request; otherwise ask first, and say what will go live.
- After a push, check the live site serves the change (curl for a new asset name or string) before saying it's
  live.
- Generated files are never edited by hand: `src/styles/tokens.css` (`bun run tokens`), `public/admin/config.yml`
  (`bun run cms`), the icons (`bun run icons`) and the share cards (`bun run og`).
- No UI framework, no Tailwind, no client JS by default. Note why in the commit when adding a package.
- Every page, company and article exists in every language. Change copy in all languages together, or leave a
  bracketed placeholder in the language you can't write.
- Check a font's licence before shipping it. Self-hosted web fonts need a licence that allows web embedding and
  conversion to woff2 (SIL OFL is the safe default). Keep the licence file beside the font.
- Never mirror a photograph of a real place for right-to-left pages.
- Look at what you changed before reporting it: build, then screenshot the affected pages at desktop and phone
  width in both languages (see `site-qa`). Say plainly what you did not check (for example Safari or a real inbox).

## Client rules

- The portfolio is open-ended: never state a count of companies ("six companies", "06", «ست شركات»). Lists come
  from `src/content/companies/`, so adding a company is adding a file.
- No establishment timeline, and no founding dates presented as the Group's own (the client found the old
  1954–1975–1986 timeline misleading). The Group builds on the Lootah family's legacy; say it that way.
- The home line is "Diversified businesses. One standard." (Arabic «أعمال متنوعة. معيار واحد.»).
- English copy comes from the 2026 Company Profile; keep the client's wording. Arabic is a translation to be
  checked by a native speaker before launch.

## Design language

The 2026 Company Profile, light only:

- A cool off-white page (`--color-bg`), black ink, soft hairlines (`--border-hairline`), alternate sections on
  `--color-surface`. Black footer.
- Gold from the Group monogram: `--color-gold` for display sizes on light grounds, `--color-gold-ink` for small
  text and hovers on light, `--color-gold-glow` on black.
- Headings end in a gold accent (`{lead} <span class="gi">{accent}</span>`, italic in English); content stores them
  as `{ lead, accent }`.
- Fonts by role, never by family: `--font-display` / `--font-body` switch with the language. English: Lora (display)
  and DM Sans (text). Arabic: Almarai (display) and IBM Plex Sans Arabic (text). Arabic gets no letter-spacing or
  capitals.
- The header is fixed and frosted, transparent over the hero at the top of the page. Hero and contact-band photos
  sit under a page-coloured wash (greyscale, a pale print); company photos run as full-height panels.
- Use logical properties so layouts mirror in Arabic; `--dir` (1 or -1) mirrors arrows and offsets.
- Motion: `data-enter` for entrances, `Photo` reveals for images, both played once by the script in `Base.astro`.
  Scroll-driven CSS animations must use longhand properties (`animation-name`, `animation-timeline`, …): the CSS
  minifier folds the shorthand into a form browsers drop. Everything respects `prefers-reduced-motion`.

## Writing to the user

The user writes short messages, often with typos; read for intent, and when you pick between options they offered,
say which. A question ("should we use X?") gets an answer, not an action. Give options as a short list with a
recommendation. Report what changed, where it is, and what's not verified.
