/** Careers page copy. */
import type { Lang } from '../../i18n/types';
import type { AccentTitle, Photo } from '../types';
import gathering from '../../assets/images/legacy-meeting.webp';

interface Opener {
  eyebrow: string;
  title: AccentTitle;
  lede?: string;
}

export interface CareersCopy {
  meta: { title: string; description: string };
  hero: Opener & { lede: string; primaryCta: string; secondaryCta: string };
  why: Opener & { benefits: string[] };
  culture: Opener & { text: string; valuesCta: string; photo: Photo };
  companies: Opener;
  apply: Opener & { text: string; cta: string; email: string; subject: string; emailLabel: string };
}

export const careers: Record<Lang, CareersCopy> = {
  en: {
    meta: {
      title: 'Careers — N S Lootah Group',
      description:
        'Build your career with N S Lootah Group — opportunities across automotive, trading, food, EV charging and natural stone in the UAE.',
    },
    hero: {
      eyebrow: 'Careers',
      title: { lead: 'Build a career', accent: 'with purpose' },
      lede: 'A family enterprise with a long view: six companies across automotive, trading, food, EV charging and natural stone — and room for people who want to build something lasting.',
      primaryCta: 'Send your CV',
      secondaryCta: 'Why join us',
    },
    why: {
      eyebrow: 'Why join us',
      title: { lead: 'A place to', accent: 'grow and lead' },
      lede: 'Our people are the foundation of our success. We empower talent, encourage collaboration and create opportunities to grow.',
      benefits: [
        'A culture rooted in integrity, respect and collaboration',
        'Diverse, meaningful work across six companies and five sectors',
        'Continuous learning and clear paths for career growth',
        'Exposure to local and international business operations',
        'A supportive team driven by innovation and excellence',
      ],
    },
    culture: {
      eyebrow: 'Our culture',
      title: { lead: 'Guided by', accent: 'shared values' },
      text: 'Each company has its own expertise and commercial focus, but every team works to the same standards — the values that have guided the Lootah family enterprise since 1954.',
      valuesCta: 'Read about our values',
      photo: { src: gathering, alt: 'Guests greeting one another at an N S Lootah Group gathering' },
    },
    companies: {
      eyebrow: 'Where you could work',
      title: { lead: 'Six companies,', accent: 'many paths' },
    },
    apply: {
      eyebrow: 'Submit your CV',
      title: { lead: 'Tell us how', accent: 'you can add value' },
      text: 'Send your CV with a short note about the role or company that interests you. We keep every application on file and will be in touch when your profile matches an opening.',
      cta: 'Email your CV',
      email: 'careers@nslootah.com',
      subject: 'CV submission',
      emailLabel: 'Careers email',
    },
  },
  ar: {
    meta: {
      title: 'الوظائف — مجموعة إن إس لوتاه',
      description:
        'ابنِ مسيرتك المهنية مع مجموعة إن إس لوتاه — فرص في قطاعات السيارات والتجارة والأغذية وشحن المركبات الكهربائية والأحجار الطبيعية في الإمارات.',
    },
    hero: {
      eyebrow: 'الوظائف',
      title: { lead: 'ابنِ مسيرتك', accent: 'بهدف' },
      lede: 'مؤسسة عائلية بنظرة بعيدة المدى: ست شركات في قطاعات السيارات والتجارة والأغذية وشحن المركبات الكهربائية والأحجار الطبيعية، ومكان لمن يريد أن يبني شيئاً يدوم.',
      primaryCta: 'أرسل سيرتك الذاتية',
      secondaryCta: 'لماذا تنضم إلينا',
    },
    why: {
      eyebrow: 'لماذا تنضم إلينا',
      title: { lead: 'بيئة', accent: 'للنمو والقيادة' },
      lede: 'موظفونا أساس نجاحنا. نمكّن المواهب ونشجّع التعاون ونتيح فرص النمو.',
      benefits: [
        'ثقافة قائمة على النزاهة والاحترام والتعاون',
        'عمل متنوع وهادف في ست شركات وخمسة قطاعات',
        'تعلّم مستمر ومسارات واضحة للنمو المهني',
        'الاطلاع على عمليات أعمال محلية ودولية',
        'فريق داعم يقوده الابتكار والتميّز',
      ],
    },
    culture: {
      eyebrow: 'ثقافتنا',
      title: { lead: 'تجمعنا', accent: 'قيم مشتركة' },
      text: 'لكل شركة خبرتها وتركيزها التجاري، لكن جميع الفرق تعمل وفق المعايير ذاتها — القيم التي وجّهت مؤسسة عائلة لوتاه منذ عام 1954.',
      valuesCta: 'تعرّف على قيمنا',
      photo: { src: gathering, alt: 'ضيوف يتبادلون التحية في لقاء لمجموعة إن إس لوتاه' },
    },
    companies: {
      eyebrow: 'أين يمكنك العمل',
      title: { lead: 'ست شركات،', accent: 'ومسارات عديدة' },
    },
    apply: {
      eyebrow: 'أرسل سيرتك الذاتية',
      title: { lead: 'أخبرنا كيف', accent: 'تضيف قيمة' },
      text: 'أرسل سيرتك الذاتية مع نبذة قصيرة عن الدور أو الشركة التي تهمّك. نحتفظ بجميع الطلبات وسنتواصل معك عندما يتطابق ملفك مع إحدى الفرص.',
      cta: 'أرسل سيرتك بالبريد',
      email: 'careers@nslootah.com',
      subject: 'طلب توظيف',
      emailLabel: 'بريد الوظائف',
    },
  },
};
