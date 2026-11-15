# Fonts: licensing, self-hosting, subsetting

## Licence checklist

Before a font ships on a site, answer these from the licence text itself (not a blog post):

- Is web embedding (`@font-face`) allowed for a commercial website?
- May the files be converted (to woff2) and subset? Some EULAs forbid any modification.
- Must the files be protected from download? A self-hosted woff2 is downloadable by anyone, so a licence that
  requires the font to be "secure" or "not extractable" rules out self-hosting.
- For OFL fonts: does it declare Reserved Font Names? If it does, a subset or any modified file can't keep the
  original name. Serve the unmodified file, or rename the family in the subset.

Known cases:

| Font | Verdict |
| --- | --- |
| Anything under SIL OFL (Google Fonts, Fontsource) | Self-host freely. Keep `<Family>-OFL.txt` beside it. |
| Dubai (Dubai Font EULA) | No. Forbids converting and requires it not be extractable. Fine in images. |
| Times New Roman, Arial, Helvetica, other system fonts | Not licensed for web hosting. Use a free alternative (Newsreader, Libre Caslon, Tinos for Times). |
| Italiana (OFL with RFN) | Self-host the unmodified file; don't subset under the same name. |
| Noto (OFL, no RFN) | Subsetting is fine. |

Tell the user what you found, quoting the clause, before switching fonts.

## Getting the files

- Fontsource (`https://cdn.jsdelivr.net/npm/@fontsource/<family>@<version>/files/`) has woff2 per script subset and
  weight: `<family>-arabic-400-normal.woff2`, `<family>-latin-400-normal.woff2`. Pin the version. It has weights the
  google/fonts repo lacks (IBM Plex Sans Arabic Light, for one).
- Variable fonts: pin the weight you use with the fontTools instancer to cut size, keeping axes you want (Newsreader
  keeps `opsz`):

  ```sh
  nix shell --impure --expr '(import (builtins.getFlake "nixpkgs") {}).python3.withPackages (ps: [ps.fonttools ps.brotli])' \
    -c python3 -I script.py
  ```

  ```python
  from fontTools.ttLib import TTFont
  from fontTools.varLib import instancer
  f = instancer.instantiateVariableFont(TTFont(src), {"wght": 300})
  f.flavor = "woff2"; f.save(out)
  ```

## @font-face pattern

One block per weight and script; `font-display: swap` for text, `block` only for a tiny wordmark subset.

```css
@font-face {
  font-family: "IBM Plex Sans Arabic";
  src: url("/fonts/IBMPlexSansArabic-arabic-400.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
}
```

Point the tokens at the family (`font.sans`, `font.display`, `font.arabic`, `font.arabic-display`, `font.brand`,
`font.arabic-brand`), run `bun run tokens`, and update the preloads in `Base.astro` (two files per direction at most).

## Subsetting a wordmark font

For a display face used only for a fixed name (an Arabic wordmark, say), a subset of just those letters can be a
few KB. Rules learned the hard way:

- Instance first, **save and reload**, then subset. Subsetting an in-memory instanced font can drop features.
- Keep all layout features: `Options(layout_features=["*"])`, or Arabic letters won't join.
- Include every letter of every string set in that font (name and `nav.kind`), in every form.
- Bump the file name (`-v2`, `-v3`) on every rebuild: browsers keep the old subset for 30 days, and a letter missing
  from it falls back to another font, which breaks joining mid-word.
- Render the subset next to the full font to compare before shipping.
- If editors can change the name in the CMS, the subset must be rebuilt then. Say so in the README.
