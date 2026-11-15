import { defaultLocale, localeCodes, type Locale } from "./locales";

/** A site path in a locale: "/about/" stays "/about/" in English and becomes "/ar/about/" in Arabic. */
export function localizePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean}`;
}

/** The locale a URL path belongs to, from its first segment. */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1] ?? "";
  return first !== defaultLocale && (localeCodes as string[]).includes(first) ? (first as Locale) : defaultLocale;
}

/** A URL path without its locale prefix: "/ar/about/" becomes "/about/". */
export function unlocalizePath(pathname: string): string {
  const locale = localeFromPath(pathname);
  if (locale === defaultLocale) return pathname;
  return pathname.slice(locale.length + 1) || "/";
}
