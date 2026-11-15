---
name: site-images
description: Add, replace, generate or sharpen photographs on a site made from the client-site template — the home hero, page photos, per-service images, stand-in photography made with an image-generation tool, upscaled files, and image quality, size and loading behaviour. Use whenever the user says an image looks soft, blurry, low quality or slow, wants new or different photos, sends their own photo, or asks for images for a new page or service.
---

# Photographs

## How images flow

- Sources live in `src/assets/images/` (per-service photos in `services/<slug>.jpg`, mapped in
  `src/lib/service-images.ts`). Astro's `<Picture>` turns each into AVIF and WebP at several widths at build time.
- Photos are wrapped by `src/components/Photo.astro`, which fills the frame with the photo's average colour
  (`src/lib/average-colour.ts`, the channel mean — sharp's `dominant` gives odd colours) and wipes a cover away once
  the image has decoded, capped at 3 seconds. Never clip or hide the `<img>` itself: some Chromium builds never load
  a lazy image that's clipped.
- The home hero is preloaded with `getImage()` using the same widths, format and quality as its `<Picture>`
  (`HERO_WIDTHS`, `HERO_QUALITY` in `src/lib/images.ts`). If the two drift apart, the browser downloads it twice.

## Sizing and quality

- Source files should be at least as wide as the largest width served. For a full-bleed hero that's 3840px
  (Retina laptops draw ~2880, 4K screens 3840). Astro won't upscale beyond the source, so a 2048px source caps the
  hero at 2048 and looks soft on high-density screens.
- Encoder quality: sharp's defaults (AVIF 50, WebP 80) suit soft, atmospheric photos; raising quality on those made
  files bigger with no visible gain. Sharp, detailed photos (architecture, text, fine texture) smudge at AVIF 50:
  give them their own quality (the hero uses 70) and add the larger widths. Report the before/after file sizes per
  width, and check a 1:1 crop of the built AVIF against the source before calling it fixed.
- To compare: crop the same region from the source and the built file
  (`magick dist/_astro/<file>.avif -crop 1000x600+X+Y +repage crop.png`) and look at both.

## When the user says an image is low quality

1. Check the source's pixel size (`sips -g pixelWidth -g pixelHeight`) and the largest built file's size.
2. If the source is too small, ask for a bigger original or an upscale. If the user offers to upscale it (fal.ai
   Clarity, Topaz…), tell them the file, the target size (2× usually, e.g. 4096×2304), low creativity / high
   resemblance for real buildings or people, and PNG or JPEG ≥ 95. When it arrives, check it for invented detail
   before using it.
3. If the encode is the problem, raise quality for that image only and add widths.
4. Build, compare crops, report sizes.

## New or stand-in photos

- If an image-generation tool is connected, use it for stand-ins and say the cost before and after. Generated
  photos of real landmarks or people are stand-ins only; note in the README that licensed photography is needed
  before launch.
- Match the existing set: same light, palette and lens feel. Generate at the aspect each slot uses (hero 16:9,
  portraits 4:5) and at 2K or more.
- Service photos are picked up by file name: `src/assets/images/services/<slug>.jpg`. `bun run placeholders` writes
  a labelled placeholder for every service that has no photo yet (`--tint "#top,#bottom"` to match the palette).
  Set `positions` in `src/lib/service-images.ts` for a photo whose subject isn't centred.
- Never mirror a photograph of a real place to suit right-to-left pages; crop and fade instead (see
  `site-content` → languages).
- After replacing the hero, run `bun run og` so the share cards match.

## Files the user drops in

They may save into the main checkout rather than your worktree. If the file looks unchanged, check the main
checkout and `~/Downloads`, and copy it across.
