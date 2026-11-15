import { localizePath, type Locale } from "../i18n";

/** A heading that ends in the gold accent: `{lead} <span class="gi">{accent}</span>`. */
export interface AccentTitle {
  lead: string;
  accent: string;
}

/** True for links that leave the site. */
export const isExternal = (href: string) => /^(https?:)?\/\//.test(href);

/**
 * A link from content in a language: site paths ("/contact/") get the language
 * prefix; anchors, mailto:, tel: and full URLs are left as they are.
 */
export function linkTo(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  return localizePath(locale, href);
}

/** The tel: link for a phone number as written ("+971 5633 33 783"). */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** schema.org BreadcrumbList for a trail of pages, home first. */
export function breadcrumbJsonLd(site: URL | undefined, crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: new URL(c.path, site).href,
    })),
  };
}
