# Adding or removing a language

## Drop Arabic (English-only site)

1. `src/i18n/locales.ts`: delete the `ar` entry.
2. `src/i18n/index.ts`: remove the `ar` import and its entry in `dictionaries`. Delete `src/i18n/ui/ar.ts`.
3. Delete `src/pages/ar/`, `src/content/copy/ar/`, `src/content/services/ar/` and `public/og-ar.jpg`.
4. `src/layouts/Base.astro`: the hreflang alternates and the language switch read `localeCodes`, so they disappear
   on their own; check the header has no empty divider left (`Header.astro`, the `.divider` before the language
   links) and remove it if the switch is gone.
5. `scripts/og.ts` loops over `locales`, so it now writes `og.jpg` only.
6. Fonts: if no Arabic is shown, drop the `IBMPlexSansArabic-arabic-*` files and their `@font-face` blocks and the
   RTL preload branch in `Base.astro`. Keep the `-latin-` files (they are the Latin body face), or swap in
   another Latin text face.
7. Arabic-only CSS is now dead. It is spread across files, so find it rather than trusting a list:

   ```sh
   grep -rn ':lang(ar)\|\[dir="rtl"\]\|rtl\|arabic' src/components src/views src/layouts src/styles/global.css
   ```

   (Header and Footer wordmark rules, the home hero and fact numbers, arrows, breadcrumbs, the contact form's
   email and phone inputs, Arabic type rules at the end of `global.css`.) Remove each rule. Leave the Arabic font
   and typography tokens in `site.tokens.json` only if you keep the Arabic font files.
8. `accent` lines are short lines in "the other language". To remove them everywhere:
   - copy: the `accent` keys in `home.json`, `about.json`, `contact.json`;
   - views: the `.accent` elements and their styles (`grep -rn accent src/views src/styles`);
   - `src/i18n/ui/build.ts`: `accentLang` in `Fixed`, the `accent()` helper and its calls, the `contactAccent`
     destructuring; `src/i18n/ui/en.ts`: `accentLang`;
   - `scripts/cms-config.ts`: the `accent` label and hint, and the `name === "accent"` check.
   Or repurpose them as a tagline in the same language.
9. Wording that says the site is bilingual: `grep -rni "arabic\|both languages\|in english and" src scripts README.md CLAUDE.md`
   (copy descriptions, CMS hints such as "Shown on the home page in both languages", the README's Languages section).
10. `bun run cms`, `bun run build`, `seo-check.ts`, and grep `dist/` for `/ar/`, `hreflang="ar"` and `dir="rtl"`
    to confirm nothing is left. The pages keep `hreflang="en"` and `x-default`; that's harmless.
11. `worker/index.ts` reads a `lang` field to send Arabic visitors back to `/ar/`; with no Arabic form it never
    fires. Leave it or remove the branch.

## Add a language (French, say)

1. Add it to `locales` in `src/i18n/locales.ts` (name in itself, `dir`, Open Graph locale such as `fr_FR`).
2. Copy `src/content/copy/en/` to `fr/` and translate it. Copy `src/i18n/ui/ar.ts` to `fr.ts`, point its imports
   at the French files, write its labels and count wording, and register it in `src/i18n/index.ts`.
3. Add `src/content/services/fr/` with a file for every service (the build fails if one is missing).
4. Copy `src/pages/ar/` to `src/pages/fr/` and change `"ar"` to `"fr"` in each route file.
5. `bun run og` writes `og-fr.jpg`; set `shareImage` in `fr.ts` to `/og-fr.jpg`.
6. Fonts: make sure the text face covers the script; add a subset and preload if it doesn't.
7. `bun run cms` picks up the locale; `bun run build`.

## Right-to-left notes

- Layout uses logical properties; new CSS must too (`margin-inline-start`, not `margin-left`).
- Mirror directional icons (arrows), never photographs of real places.
- If the home hero's copy would sit over the photo's subject in RTL, don't flip the photo: crop it to the other
  side and fade it with `mask-image` on the image itself (a wash laid over it leaves a seam), on a ground sampled
  from the LTR hero's tones so both languages feel equally light. See the `[dir="rtl"]` rules in `HomePage.astro`.
- Test RTL in Safari as well as Chromium when you can; mask and gradient rendering differ. Say so if you couldn't.
