// Builds the site icons from the brand mark (src/assets/brand/mark.svg).
// Run with `bun scripts/icons.ts` after the mark changes.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const master = await readFile(new URL("../src/assets/brand/mark.svg", import.meta.url));
const pub = (name: string) => new URL(`../public/${name}`, import.meta.url).pathname;
const png = (size: number) => sharp(master, { density: 72 * (size / 512) * 4 }).resize(size, size).png().toBuffer();

// Browsers: the master as it is.
await writeFile(pub("favicon.svg"), master);

// The block is a full-bleed square and the letters sit well inside the
// maskable safe zone (a centred circle of 80% width), so one artwork serves all.
await writeFile(pub("apple-touch-icon.png"), await png(180));
await writeFile(pub("icon-192.png"), await png(192));
await writeFile(pub("icon-512.png"), await png(512));
await writeFile(pub("icon-maskable-512.png"), await png(512));

// favicon.ico: 16, 32 and 48px PNGs in an ICO container.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
await writeFile(pub("favicon.ico"), Buffer.concat([header, ...images]));
console.log("wrote favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png");
