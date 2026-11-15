/** Homepage-only copy. The Group story and companies come from group.ts and companies.ts. */
import type { Lang } from '../i18n/types';
import type { Photo } from './types';

import newsPhoto from '../assets/images/electric-car-blog.jpg';
import careersPhoto from '../assets/images/careers-hero.jpg';

export interface HomeContent {
  metaTitle: string;
  metaDescription: string;
  hero: { lines: [string, string]; sub: string; cue: string; markAlt: string };
  intro: { eyebrow: string };
  chapters: { heading: string; indexLabel: string; total: string };
  legacy: { more: string };
  updates: {
    heading: string;
    news: { eyebrow: string; title: string; text: string; cta: string; path: string; photo: Photo };
    careers: { eyebrow: string; title: string; text: string; cta: string; path: string; photo: Photo };
  };
}

export const home: Record<Lang, HomeContent> = {
  en: {
    metaTitle: 'N S Lootah Group — A diversified UAE holding company',
    metaDescription:
      'N S Lootah Group is a UAE-based holding company with six companies across automotive, outdoor trading, food, EV charging and natural stone — carrying forward a family enterprise that began in 1954.',
    hero: {
      lines: ['Six companies.', 'One standard.'],
      sub: 'A diversified UAE group carrying forward a family enterprise that began in 1954 — across automotive, outdoor trading, food, EV charging and natural stone.',
      cue: 'Explore the Group',
      markAlt: 'N S Lootah Group of Companies',
    },
    intro: { eyebrow: 'About the Group' },
    chapters: { heading: 'Our companies', indexLabel: 'Company chapters', total: '06' },
    legacy: { more: 'More about the Group' },
    updates: {
      heading: 'From the Group',
      news: {
        eyebrow: 'Latest news',
        title: 'First electric car hits Dubai roads',
        text: 'Dubai became the first city in the Gulf to license fully electric cars — part of the Lootah family’s long-running Green Car programme.',
        cta: 'Read the story',
        path: '/news/electric-car',
        photo: { src: newsPhoto, alt: 'An electric car on a Dubai road' },
      },
      careers: {
        eyebrow: 'Careers',
        title: 'Build what comes next',
        text: 'A legacy-driven group with room to grow — across automotive, trading, food, energy and natural stone.',
        cta: 'Explore careers',
        path: '/careers',
        photo: { src: careersPhoto, alt: 'Colleagues at work at N S Lootah Group' },
      },
    },
  },
  ar: {
    metaTitle: 'مجموعة إن إس لوتاه — شركة قابضة إماراتية متنوعة',
    metaDescription:
      'مجموعة إن إس لوتاه شركة قابضة مقرها الإمارات تضم ست شركات في قطاعات السيارات وتجارة معدات الرحلات والأغذية وشحن المركبات الكهربائية والأحجار الطبيعية — امتداداً لمؤسسة عائلية بدأت عام 1954.',
    hero: {
      lines: ['ست شركات.', 'معيار واحد.'],
      sub: 'مجموعة إماراتية متنوعة تواصل مسيرة مؤسسة عائلية بدأت عام 1954 — في قطاعات السيارات وتجارة معدات الرحلات والأغذية وشحن المركبات الكهربائية والأحجار الطبيعية.',
      cue: 'استكشف المجموعة',
      markAlt: 'مجموعة إن إس لوتاه للشركات',
    },
    intro: { eyebrow: 'عن المجموعة' },
    chapters: { heading: 'شركاتنا', indexLabel: 'فصول الشركات', total: '06' },
    legacy: { more: 'المزيد عن المجموعة' },
    updates: {
      heading: 'من المجموعة',
      news: {
        eyebrow: 'آخر الأخبار',
        title: 'أول سيارة كهربائية تسير على طرقات دبي',
        text: 'أصبحت دبي أول مدينة في الخليج ترخّص سيارات كهربائية بالكامل — ضمن برنامج "السيارة الخضراء" الذي أطلقته عائلة لوتاه.',
        cta: 'اقرأ الخبر',
        path: '/news/electric-car',
        photo: { src: newsPhoto, alt: 'سيارة كهربائية على أحد طرقات دبي' },
      },
      careers: {
        eyebrow: 'الوظائف',
        title: 'شاركنا بناء ما هو آت',
        text: 'مجموعة يقودها الإرث وتتسع للنمو — في قطاعات السيارات والتجارة والأغذية والطاقة والأحجار الطبيعية.',
        cta: 'استكشف الوظائف',
        path: '/careers',
        photo: { src: careersPhoto, alt: 'زملاء في بيئة العمل لدى مجموعة إن إس لوتاه' },
      },
    },
  },
};
