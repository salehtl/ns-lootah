/** Structured-data helpers for interior pages. */

const SITE = 'https://nslootah.com';

export interface Crumb {
  name: string;
  /** Absolute path, e.g. '/en/about'. */
  path: string;
}

/** schema.org BreadcrumbList for a trail of pages, home first. */
export function breadcrumbJsonLd(crumbs: Crumb[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
}
