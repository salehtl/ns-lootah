// Shared image settings for src/components/Photo.astro.
// AVIF first, WebP for the <img> fallback: Astro's default fallback for WebP
// sources is PNG, which made photos up to 2 MB. Encoder quality stays at
// sharp's defaults (AVIF 50, WebP 80), which suit these soft, atmospheric
// photos; pass `quality` to Photo for a sharp, detailed one.
export const PHOTO_FORMATS = ["avif"] as const satisfies "avif"[];
export const PHOTO_FALLBACK = "webp" as const;

/** Widths for a photo: the standard ladder below the source's own width, plus the source width (up to 1920). */
export function widthLadder(natural: number): number[] {
  const ladder = [480, 768, 1080, 1440, 1920].filter((w) => w < natural);
  if (natural <= 1920) ladder.push(natural);
  return ladder;
}
