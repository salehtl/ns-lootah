import type { Lang } from '../../i18n/types';
import type { CompanyId } from '../../data/types';
import { t } from '../../i18n/translations';
import { getLocalizedPath } from '../../i18n/utils';
import { getCompany } from '../../data/companies';
import { companyPages } from '../../data/company-pages';

const SITE = 'https://nslootah.com';

/** Everything a company route needs for BaseLayout: meta, path and JSON-LD. */
export function companyRoute(lang: Lang, id: CompanyId) {
  const company = getCompany(lang, id);
  const page = companyPages[lang].pages[id];
  const strings = t(lang);
  const currentPath = getLocalizedPath(company.path, lang);
  const home = getLocalizedPath('/', lang);
  const website = page.actions.find((a) => a.external)?.href;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: strings.nav.home, item: `${SITE}${home}` },
          { '@type': 'ListItem', position: 2, name: strings.nav.companies, item: `${SITE}${home}#companies` },
          { '@type': 'ListItem', position: 3, name: company.name, item: `${SITE}${currentPath}` },
        ],
      },
      {
        '@type': 'Organization',
        name: company.legalName,
        url: `${SITE}${currentPath}`,
        logo: `${SITE}${company.logo.src}`,
        description: company.tagline,
        ...(website ? { sameAs: [website] } : {}),
        parentOrganization: { '@type': 'Organization', name: strings.site.legalName, url: `${SITE}${home}` },
      },
    ],
  };

  return { title: page.meta.title, description: page.meta.description, currentPath, jsonLd };
}
