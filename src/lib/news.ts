import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLocale, localeCodes, localizePath, type Locale } from "../i18n";

export type Article = CollectionEntry<"news"> & {
  /** The file name, shared by every translation ("souo-showroom-dubai"). */
  slug: string;
  locale: Locale;
  /** The article in this language: "/news/souo-showroom-dubai/". */
  href: string;
};

/** Every article in a language, newest first (dated ones by date, then by `order`). */
export async function getNews(locale: Locale): Promise<Article[]> {
  const all = (await getCollection("news")).map((entry) => {
    const [folder, ...rest] = entry.id.split("/");
    return { ...entry, locale: folder as Locale, slug: rest.join("/") };
  });

  const slugs = (l: Locale) =>
    all
      .filter((a) => a.locale === l)
      .map((a) => a.slug)
      .sort()
      .join(",");
  for (const l of localeCodes) {
    if (slugs(l) !== slugs(defaultLocale)) {
      throw new Error(`News in "${l}" (${slugs(l)}) doesn't match "${defaultLocale}" (${slugs(defaultLocale)}).`);
    }
  }

  const time = (a: (typeof all)[number]) => a.data.date?.getTime() ?? 0;
  return all
    .filter((a) => a.locale === locale)
    .sort((a, b) => time(b) - time(a) || b.data.order - a.data.order)
    .map((a) => ({ ...a, href: localizePath(locale, `/news/${a.slug}/`) }));
}

/** getStaticPaths() for a language's article route file. */
export async function newsPaths(locale: Locale) {
  const articles = await getNews(locale);
  return articles.map((article) => ({ params: { id: article.slug }, props: { locale, article } }));
}
