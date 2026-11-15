// Assembles a language's UI strings from its copy files.
//
// The words live in src/content/copy/<locale>/*.json, one file per page, so the
// Group can edit them in the CMS at /admin. What stays in code is what an editor
// shouldn't touch: screen-reader labels, file paths and date formats.
// Page copy passes through as it is (t.about, t.careers…), so a new key in a
// copy file needs no change here.
import siteEn from "../../content/copy/en/site.json";
import homeEn from "../../content/copy/en/home.json";
import aboutEn from "../../content/copy/en/about.json";
import companiesEn from "../../content/copy/en/companies.json";
import careersEn from "../../content/copy/en/careers.json";
import contactEn from "../../content/copy/en/contact.json";
import newsEn from "../../content/copy/en/news.json";
import notFoundEn from "../../content/copy/en/not-found.json";

/** One language's copy files. The English files define the shape every language must match. */
export interface Copy {
  site: typeof siteEn;
  home: typeof homeEn;
  about: typeof aboutEn;
  companies: typeof companiesEn;
  careers: typeof careersEn;
  contact: typeof contactEn;
  news: typeof newsEn;
  notFound: typeof notFoundEn;
}

export const copyEn: Copy = {
  site: siteEn,
  home: homeEn,
  about: aboutEn,
  companies: companiesEn,
  careers: careersEn,
  contact: contactEn,
  news: newsEn,
  notFound: notFoundEn,
};

/** Labels and settings that stay in code. */
export interface Fixed {
  shareImage: string;
  skipLink: string;
  navLabel: string;
  /** Screen-reader name for the logo link, given the Group's name. */
  homeLabel: (site: string) => string;
  footerLabel: string;
  breadcrumbLabel: string;
  closeMenu: string;
  /** A long date in this language, with Western digits. */
  date: (d: Date) => string;
}

export function buildUI(c: Copy, f: Fixed) {
  return {
    site: c.site.name,
    meta: {
      description: c.site.description,
      tagline: c.site.tagline,
      image: f.shareImage,
      imageAlt: c.site.shareImageAlt,
    },
    nav: { label: f.navLabel, home: f.homeLabel(c.site.name), close: f.closeMenu, ...c.site.nav },
    firm: c.site.firm,
    footer: { label: f.footerLabel, ...c.site.footer },
    contactBand: c.site.contactBand,
    a11y: { skipLink: f.skipLink, breadcrumb: f.breadcrumbLabel },
    date: f.date,
    home: c.home,
    about: c.about,
    companies: c.companies,
    careers: c.careers,
    contact: c.contact,
    news: c.news,
    notFound: c.notFound,
  };
}

export type UI = ReturnType<typeof buildUI>;
