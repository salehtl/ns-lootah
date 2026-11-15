import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLocale, localeCodes, localizePath, pad, type Locale } from "../i18n";

export type Company = CollectionEntry<"companies"> & {
  /** The file name, shared by every translation ("ns-lootah-motors"). */
  slug: string;
  locale: Locale;
  /** "01", "02"… from the display order. */
  number: string;
  /** The company page in this language: "/companies/ns-lootah-motors/". */
  href: string;
};

/** Every Group company in a language, in display order. */
export async function getCompanies(locale: Locale): Promise<Company[]> {
  const all = (await getCollection("companies")).map((entry) => {
    const [folder, ...rest] = entry.id.split("/");
    return { ...entry, locale: folder as Locale, slug: rest.join("/") };
  });

  // Every language must have the same companies, so no language links to a page that isn't built.
  const slugs = (l: Locale) =>
    all
      .filter((c) => c.locale === l)
      .map((c) => c.slug)
      .sort()
      .join(",");
  for (const l of localeCodes) {
    if (slugs(l) !== slugs(defaultLocale)) {
      throw new Error(`Companies in "${l}" (${slugs(l)}) don't match "${defaultLocale}" (${slugs(defaultLocale)}).`);
    }
  }

  return all
    .filter((c) => c.locale === locale)
    .sort((a, b) => a.data.order - b.data.order)
    .map((c, i) => ({ ...c, number: pad(i + 1), href: localizePath(locale, `/companies/${c.slug}/`) }));
}

/** getStaticPaths() for a language's company route file. */
export async function companyPaths(locale: Locale) {
  const companies = await getCompanies(locale);
  return companies.map((company) => ({ params: { id: company.slug }, props: { locale, company } }));
}
