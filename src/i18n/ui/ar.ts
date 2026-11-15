// Arabic UI strings, in plain Modern Standard Arabic. The words are in
// src/content/copy/ar/ (editable at /admin); this file adds the labels that
// stay in code. Digits stay Western (0-9).
import { buildUI, type Copy, type UI } from "./build";
import site from "../../content/copy/ar/site.json";
import home from "../../content/copy/ar/home.json";
import about from "../../content/copy/ar/about.json";
import companies from "../../content/copy/ar/companies.json";
import careers from "../../content/copy/ar/careers.json";
import contact from "../../content/copy/ar/contact.json";
import news from "../../content/copy/ar/news.json";
import notFound from "../../content/copy/ar/not-found.json";

const copy: Copy = { site, home, about, companies, careers, contact, news, notFound };

// Arabic month names, Western digits.
const dateFormat = new Intl.DateTimeFormat("ar-AE-u-nu-latn", { day: "numeric", month: "long", year: "numeric" });

const ar: UI = buildUI(copy, {
  shareImage: "/og-ar.jpg",
  skipLink: "تخطَّ إلى المحتوى الرئيسي",
  navLabel: "القائمة الرئيسية",
  homeLabel: (site) => `${site}، الصفحة الرئيسية`,
  footerLabel: "تذييل الصفحة",
  breadcrumbLabel: "مسار التنقل",
  closeMenu: "إغلاق القائمة",
  date: (d) => dateFormat.format(d),
});

export default ar;
