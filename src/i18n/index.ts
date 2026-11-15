// UI strings and helpers for every page. Page markup lives once, in
// src/views/; each language supplies its words here and its companies and
// articles in src/content/{companies,news}/<locale>/.
import type { Locale } from "./locales";
import en, { type UI } from "./ui/en";
import ar from "./ui/ar";

export * from "./locales";
export * from "./paths";
export type { UI };

const dictionaries: Record<Locale, UI> = { en, ar };

/** The UI strings for a locale. */
export function useTranslations(locale: Locale): UI {
  return dictionaries[locale];
}

/** "01", "02"… Western digits in every language, as the brand asks. */
export const pad = (n: number) => String(n).padStart(2, "0");
