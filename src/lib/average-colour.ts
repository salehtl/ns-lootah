import sharp from "sharp";
import type { ImageMetadata } from "astro";

const cache = new Map<string, string>();

/**
 * The photo's dominant colour as a hex string, computed at build time.
 * Photo frames are filled with it, so a slow image never leaves a white hole.
 * Falls back to the surface colour when the source file can't be read.
 */
export async function averageColour(image: ImageMetadata): Promise<string> {
  // Astro sets a hidden fsPath on imported images during builds.
  const path = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (!path) return "var(--color-surface)";
  const hit = cache.get(path);
  if (hit) return hit;
  try {
    // The mean of each channel. sharp's `dominant` uses coarse colour buckets
    // and can land on a hue the photo doesn't really have.
    const { channels } = await sharp(path).stats();
    const hex = `#${channels
      .slice(0, 3)
      .map((c) => Math.round(c.mean).toString(16).padStart(2, "0"))
      .join("")}`;
    cache.set(path, hex);
    return hex;
  } catch {
    return "var(--color-surface)";
  }
}
