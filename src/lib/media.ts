// Photos and logos by key, so content files name them once in every language.
//   photo("profile/motors")   → src/assets/images/profile/motors.webp
//   logo("ns-lootah-motors")  → src/assets/logos/ns-lootah-motors.svg
// A missing key fails the build with the file it expected.
import type { ImageMetadata } from "astro";

const keyOf = (path: string, base: string) => path.slice(path.indexOf(base) + base.length).replace(/\.\w+$/, "");

const photoFiles = import.meta.glob<{ default: ImageMetadata }>("../assets/images/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
});
const photos = new Map(Object.entries(photoFiles).map(([path, mod]) => [keyOf(path, "assets/images/"), mod.default]));

const logoFiles = import.meta.glob<string>("../assets/logos/*.svg", { eager: true, query: "?url", import: "default" });
const logoRaw = import.meta.glob<string>("../assets/logos/*.svg", { eager: true, query: "?raw", import: "default" });
const logos = new Map(
  Object.entries(logoFiles).map(([path, src]) => {
    // Width and height from the viewBox, so the <img> reserves its space.
    const box = /viewBox="([\d.\s-]+)"/.exec(logoRaw[path] ?? "")?.[1]?.trim().split(/\s+/).map(Number);
    const [width, height] = box && box.length === 4 ? [Math.round(box[2]!), Math.round(box[3]!)] : [300, 100];
    return [keyOf(path, "assets/logos/"), { src, width, height }];
  }),
);

export interface Logo {
  src: string;
  width: number;
  height: number;
}

/** A photograph in src/assets/images/, by its path without the extension. */
export function photo(key: string): ImageMetadata {
  const found = photos.get(key);
  if (!found) throw new Error(`No photo "${key}": expected src/assets/images/${key}.(jpg|webp|png|avif).`);
  return found;
}

/** A logo in src/assets/logos/, by its file name without .svg. Served hashed, as-is. */
export function logo(key: string): Logo {
  const found = logos.get(key);
  if (!found) throw new Error(`No logo "${key}": expected src/assets/logos/${key}.svg.`);
  return found;
}
