/**
 * Shared UI strings: site details, navigation, footer and common labels.
 * Page copy lives in typed modules under src/data/.
 */
import type { Lang } from './types';

interface Strings {
  site: {
    name: string;
    legalName: string;
    phone: string;
    phoneHref: string;
    email: string;
    address: string;
  };
  nav: {
    home: string;
    about: string;
    aboutGroup: string;
    companies: string;
    news: string;
    careers: string;
    contact: string;
    langSwitch: string;
    openMenu: string;
    mainNavigation: string;
    footerNavigation: string;
  };
  footer: {
    companies: string;
    group: string;
    contact: string;
    tagline: string;
    rights: string;
  };
  common: {
    telephone: string;
    email: string;
    office: string;
    contactTitle: string;
    contactAccent: string;
    contactLede: string;
  };
  a11y: {
    skipToContent: string;
  };
}

const translations: Record<Lang, Strings> = {
  en: {
    site: {
      name: 'N S Lootah Group',
      legalName: 'N S Lootah Group L.L.C.',
      phone: '+971 5633 33 783',
      phoneHref: 'tel:+971563333783',
      email: 'contact@nslootah.com',
      address: 'Al Ttay, Al Khawaneej, Dubai — UAE',
    },
    nav: {
      home: 'Home',
      about: 'About',
      aboutGroup: 'About the Group',
      companies: 'Companies',
      news: 'News',
      careers: 'Careers',
      contact: 'Contact',
      langSwitch: 'العربية',
      openMenu: 'Menu',
      mainNavigation: 'Main navigation',
      footerNavigation: 'Footer navigation',
    },
    footer: {
      companies: 'Companies',
      group: 'The Group',
      contact: 'Contact',
      tagline: 'A diversified UAE group carrying forward a family enterprise that began in 1954.',
      rights: 'All rights reserved.',
    },
    common: {
      telephone: 'Telephone',
      email: 'Email',
      office: 'Office',
      contactTitle: 'Contact',
      contactAccent: 'us',
      contactLede: 'For partnerships, enquiries or to reach any of our companies, the Group office is the place to start.',
    },
    a11y: {
      skipToContent: 'Skip to main content',
    },
  },
  ar: {
    site: {
      name: 'مجموعة إن إس لوتاه',
      legalName: 'مجموعة إن إس لوتاه ذ.م.م',
      phone: '+971 5633 33 783',
      phoneHref: 'tel:+971563333783',
      email: 'contact@nslootah.com',
      address: 'الطي، الخوانيج، دبي — الإمارات العربية المتحدة',
    },
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      aboutGroup: 'عن المجموعة',
      companies: 'الشركات',
      news: 'الأخبار',
      careers: 'الوظائف',
      contact: 'اتصل بنا',
      langSwitch: 'English',
      openMenu: 'القائمة',
      mainNavigation: 'التنقل الرئيسي',
      footerNavigation: 'تنقل التذييل',
    },
    footer: {
      companies: 'الشركات',
      group: 'المجموعة',
      contact: 'التواصل',
      tagline: 'مجموعة إماراتية متنوعة تواصل مسيرة مؤسسة عائلية بدأت عام 1954.',
      rights: 'جميع الحقوق محفوظة.',
    },
    common: {
      telephone: 'الهاتف',
      email: 'البريد الإلكتروني',
      office: 'المكتب',
      contactTitle: 'تواصل',
      contactAccent: 'معنا',
      contactLede: 'للشراكات والاستفسارات أو للتواصل مع أيٍّ من شركاتنا، يبدأ ذلك من مكتب المجموعة.',
    },
    a11y: {
      skipToContent: 'تخطَّ إلى المحتوى الرئيسي',
    },
  },
};

export type TranslationKey = Strings;

export function t(lang: Lang): Strings {
  return translations[lang];
}
