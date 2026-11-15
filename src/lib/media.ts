// Photos and logos by path, so content files name them once in every language.
// The CMS image picker writes paths under its public folders:
//   photo("/images/profile/motors.webp")  → src/assets/images/profile/motors.webp
//   logo("/logos/ns-lootah-motors.svg")   → src/assets/logos/ns-lootah-motors.svg
// Short keys without the folder or extension work too: photo("profile/motors").
// A missing file fails the build with the file it expected, so a bad edit in the
// CMS never reaches the live site.
import type { ImageMetadata } from "astro";

/** "/images/profile/motors.webp" → "profile/motors". */
const keyOf = (value: string, folder: string) =>
  value
    .trim()
    .replace(/^\/+/, "")
    .replace(new RegExp(`^${folder}/`), "")
    .replace(/\.\w+$/, "");

const fromGlob = (path: string, base: string) => keyOf(path.slice(path.indexOf(base) + base.length), "");

const photoFiles = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true },
);
const photos = new Map(Object.entries(photoFiles).map(([path, mod]) => [fromGlob(path, "assets/images/"), mod.default]));

const logoFiles = import.meta.glob<string>("../assets/logos/*.{svg,SVG}", { eager: true, query: "?url", import: "default" });
const logoRaw = import.meta.glob<string>("../assets/logos/*.{svg,SVG}", { eager: true, query: "?raw", import: "default" });
const logos = new Map(
  Object.entries(logoFiles).map(([path, src]) => {
    // Width and height from the viewBox, so the <img> reserves its space.
    const box = /viewBox="([\d.\s-]+)"/.exec(logoRaw[path] ?? "")?.[1]?.trim().split(/\s+/).map(Number);
    const [width, height] = box && box.length === 4 ? [Math.round(box[2]!), Math.round(box[3]!)] : [300, 100];
    return [fromGlob(path, "assets/logos/"), { src, width, height }];
  }),
);

export interface Logo {
  src: string;
  width: number;
  height: number;
}

/** A photograph in src/assets/images/, by its CMS path ("/images/…") or short key ("profile/motors"). */
export function photo(value: string): ImageMetadata {
  const found = photos.get(keyOf(value, "images"));
  if (!found) throw new Error(`No photo "${value}": expected a file in src/assets/images/ (jpg, png, webp or avif).`);
  return found;
}

/** A logo in src/assets/logos/, by its CMS path ("/logos/….svg") or file name. Served hashed, as-is. */
export function logo(value: string): Logo {
  const found = logos.get(keyOf(value, "logos"));
  if (!found) throw new Error(`No logo "${value}": expected an SVG in src/assets/logos/.`);
  return found;
}
