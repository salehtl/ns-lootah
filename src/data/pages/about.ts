/**
 * About page copy. The Group's story itself (overview, legacy, chairman,
 * direction, values) lives in data/group.ts; this module holds the page's
 * framing: meta, hero and section openers.
 */
import type { Lang } from '../../i18n/types';
import type { AccentTitle } from '../types';

interface Opener {
  eyebrow: string;
  title: AccentTitle;
  lede?: string;
}

export interface AboutCopy {
  meta: { title: string; description: string };
  hero: Opener & { lede: string };
  overview: Opener;
  legacy: { principlesLabel: string; philosophyLabel: string };
  timeline: Opener;
  direction: Opener & { aheadLabel: string };
  values: { lede: string };
  companies: Opener & { lede: string };
  leadershipCta: string;
}

export const about: Record<Lang, AboutCopy> = {
  en: {
    meta: {
      title: 'About the Group — N S Lootah Group',
      description:
        'N S Lootah Group is a diversified UAE holding company carrying forward a family enterprise founded in 1954 — its story, leadership, vision and values.',
    },
    hero: {
      eyebrow: 'About the Group',
      title: { lead: 'Built', accent: 'on heritage' },
      lede: 'A diversified UAE holding company carrying forward a family enterprise that began in 1954 — and the principles it was built on.',
    },
    overview: {
      eyebrow: 'Company overview',
      title: { lead: 'One group,', accent: 'many disciplines' },
    },
    legacy: {
      principlesLabel: 'Three enduring principles',
      philosophyLabel: 'The philosophy we build on',
    },
    timeline: {
      eyebrow: 'Milestones',
      title: { lead: 'Seven decades', accent: 'of enterprise' },
    },
    direction: {
      eyebrow: 'Strategic direction',
      title: { lead: 'Where the Group', accent: 'is heading' },
      aheadLabel: 'Looking ahead',
    },
    values: {
      lede: 'Seven values shape how every company in the Group works — with its people, its partners and the communities it serves.',
    },
    companies: {
      eyebrow: 'Portfolio structure',
      title: { lead: 'Six companies,', accent: 'one standard' },
      lede: 'The Group operates across multiple sectors through a diverse portfolio of subsidiary companies, each contributing its own expertise and commercial focus.',
    },
    leadershipCta: 'Contact the Group office',
  },
  ar: {
    meta: {
      title: 'عن المجموعة — مجموعة إن إس لوتاه',
      description:
        'مجموعة إن إس لوتاه شركة قابضة إماراتية متنوعة تواصل مسيرة مؤسسة عائلية تأسست عام 1954 — تعرّف على قصتها وقيادتها ورؤيتها وقيمها.',
    },
    hero: {
      eyebrow: 'عن المجموعة',
      title: { lead: 'بُنيت', accent: 'على الإرث' },
      lede: 'شركة قابضة إماراتية متنوعة تواصل مسيرة مؤسسة عائلية بدأت عام 1954، وتحمل المبادئ التي قامت عليها.',
    },
    overview: {
      eyebrow: 'نظرة عامة',
      title: { lead: 'مجموعة واحدة،', accent: 'وتخصصات متعددة' },
    },
    legacy: {
      principlesLabel: 'ثلاثة مبادئ راسخة',
      philosophyLabel: 'الفلسفة التي نبني عليها',
    },
    timeline: {
      eyebrow: 'محطات',
      title: { lead: 'سبعة عقود', accent: 'من ريادة الأعمال' },
    },
    direction: {
      eyebrow: 'التوجه الاستراتيجي',
      title: { lead: 'إلى أين', accent: 'تتجه المجموعة' },
      aheadLabel: 'نظرة إلى المستقبل',
    },
    values: {
      lede: 'سبع قيم تشكّل طريقة عمل كل شركة في المجموعة — مع موظفيها وشركائها والمجتمعات التي تخدمها.',
    },
    companies: {
      eyebrow: 'هيكل المحفظة',
      title: { lead: 'ست شركات،', accent: 'ومعيار واحد' },
      lede: 'تعمل المجموعة في قطاعات متعددة من خلال محفظة متنوعة من الشركات التابعة، تسهم كل منها بخبرتها وتركيزها التجاري الخاص.',
    },
    leadershipCta: 'تواصل مع مكتب المجموعة',
  },
};
