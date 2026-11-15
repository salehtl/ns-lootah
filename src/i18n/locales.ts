// The site's languages. astro.config.mjs reads this file too, so adding a
// language starts here. See README.md, "Languages".

export const defaultLocale = "en";

export const locales = {
  en: {
    /** Name of the language in itself, shown in the language switch. */
    name: "English",
    dir: "ltr",
    /** Open Graph locale. */
    ogLocale: "en_AE",
  },
  ar: {
    name: "العربية",
    dir: "rtl",
    ogLocale: "ar_AE",
  },
} as const;

export type Locale = keyof typeof locales;

export const localeCodes = Object.keys(locales) as Locale[];
