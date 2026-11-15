// English UI strings. The words are in src/content/copy/en/ (editable at /admin);
// this file adds the labels that stay in code.
import { buildUI, copyEn, type UI } from "./build";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

const en: UI = buildUI(copyEn, {
  shareImage: "/og.jpg",
  skipLink: "Skip to main content",
  navLabel: "Main",
  homeLabel: (site) => `${site}, home`,
  footerLabel: "Footer",
  breadcrumbLabel: "Breadcrumb",
  closeMenu: "Close menu",
  date: (d) => dateFormat.format(d),
});

export type { UI };
export default en;
