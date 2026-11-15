/** 404 copy. The page serves both languages at once, English first. */
import type { Lang } from '../../i18n/types';

export interface NotFoundCopy {
  title: string;
  text: string;
  linksLabel: string;
  links: { label: string; path: string }[];
}

export const notFound: Record<Lang, NotFoundCopy> = {
  en: {
    title: 'Page not found',
    text: 'The page you’re looking for doesn’t exist or has moved. These will take you somewhere useful:',
    linksLabel: 'Key pages',
    links: [
      { label: 'Home', path: '/en/' },
      { label: 'About the Group', path: '/en/about' },
      { label: 'Our companies', path: '/en/#companies' },
      { label: 'Contact', path: '/en/contact' },
    ],
  },
  ar: {
    title: 'الصفحة غير موجودة',
    text: 'الصفحة التي تبحث عنها غير موجودة أو نُقلت. يمكنك المتابعة من هنا:',
    linksLabel: 'صفحات رئيسية',
    links: [
      { label: 'الرئيسية', path: '/ar/' },
      { label: 'عن المجموعة', path: '/ar/about' },
      { label: 'شركاتنا', path: '/ar/#companies' },
      { label: 'تواصل معنا', path: '/ar/contact' },
    ],
  },
};
