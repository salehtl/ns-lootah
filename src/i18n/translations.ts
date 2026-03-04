const translations = {
  en: {
    site: {
      name: 'My Site',
    },
    nav: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      langSwitch: 'عربي',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    home: {
      metaTitle: 'My Site',
      metaDescription: 'Welcome to My Site.',
      heading: 'Welcome',
      tagline: 'A brief tagline about what this site is.',
    },
    about: {
      metaTitle: 'About — My Site',
      metaDescription: 'Learn more about us.',
      heading: 'About',
    },
    contact: {
      metaTitle: 'Contact — My Site',
      metaDescription: 'Get in touch.',
      heading: 'Contact',
      address: 'Your address here',
      email: 'hello@example.com',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    notFound: {
      metaTitle: 'Page Not Found — My Site',
      heading: 'Page not found',
      text: 'The page you are looking for does not exist or has been moved.',
      link: 'Return home',
    },
    a11y: {
      skipToContent: 'Skip to main content',
    },
  },
  ar: {
    site: {
      name: 'موقعي',
    },
    nav: {
      home: 'الرئيسية',
      about: 'عن الموقع',
      contact: 'اتصل بنا',
      langSwitch: 'English',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },
    home: {
      metaTitle: 'موقعي',
      metaDescription: 'مرحباً بكم في موقعي.',
      heading: 'مرحباً',
      tagline: 'وصف مختصر عن هذا الموقع.',
    },
    about: {
      metaTitle: 'عن الموقع — موقعي',
      metaDescription: 'تعرف علينا أكثر.',
      heading: 'عن الموقع',
    },
    contact: {
      metaTitle: 'اتصل بنا — موقعي',
      metaDescription: 'تواصل معنا.',
      heading: 'اتصل بنا',
      address: 'عنوانك هنا',
      email: 'hello@example.com',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
    },
    notFound: {
      metaTitle: 'الصفحة غير موجودة — موقعي',
      heading: 'الصفحة غير موجودة',
      text: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      link: 'العودة للرئيسية',
    },
    a11y: {
      skipToContent: 'تخطي إلى المحتوى الرئيسي',
    },
  },
} as const;

export type TranslationKey = typeof translations.en;

export function t(lang: 'en' | 'ar'): TranslationKey {
  return translations[lang];
}
