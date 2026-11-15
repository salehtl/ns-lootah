/**
 * Contact page copy. The Group's own address, phone and email come from
 * i18n translations (site.*); this module frames them and adds direct lines
 * for companies that publish their own.
 */
import type { Lang } from '../../i18n/types';
import type { AccentTitle, CompanyId, Photo } from '../types';
import skyline from '../../assets/images/dubai-lootah1.jpg';

interface Opener {
  eyebrow: string;
  title: AccentTitle;
  lede?: string;
}

export interface Topic {
  title: string;
  text: string;
  cta: string;
  /** 'mail' composes an email to the Group with this subject; 'page' links to a locale-free path. */
  kind: 'mail' | 'page';
  target: string;
}

export interface DirectLine {
  address?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  website?: string;
}

export interface ContactCopy {
  meta: { title: string; description: string };
  hero: Opener & { lede: string; photo: Photo };
  office: Opener & {
    labels: { address: string; phone: string; email: string };
    maps: string;
    mapsUrl: string;
    whatsapp: string;
    whatsappUrl: string;
  };
  topics: Opener & { items: Topic[] };
  companies: Opener & { lede: string; visit: string; directLabel: string };
  direct: Partial<Record<CompanyId, DirectLine>>;
}

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Al%20Ttay%2C%20Al%20Khawaneej%2C%20Dubai';
const whatsappUrl = 'https://wa.me/971563333783';

export const contact: Record<Lang, ContactCopy> = {
  en: {
    meta: {
      title: 'Contact — N S Lootah Group',
      description:
        'Contact N S Lootah Group in Dubai — the Group office, telephone and email, and how to reach each of our six companies.',
    },
    hero: {
      eyebrow: 'Contact',
      title: { lead: 'Let’s build', accent: 'something together' },
      lede: 'Whether you’re exploring a partnership, enquiring about one of our companies or simply want to connect, the Group office is the place to start.',
      photo: { src: skyline, alt: 'The Dubai skyline seen from above' },
    },
    office: {
      eyebrow: 'Group office',
      title: { lead: 'Visit or', accent: 'call us' },
      lede: 'Our team will direct your enquiry to the right company.',
      labels: { address: 'Office', phone: 'Telephone', email: 'Email' },
      maps: 'Open in Google Maps',
      mapsUrl,
      whatsapp: 'Message on WhatsApp',
      whatsappUrl,
    },
    topics: {
      eyebrow: 'How can we help',
      title: { lead: 'Start the', accent: 'right conversation' },
      items: [
        {
          title: 'Partnerships & business',
          text: 'Distribution, investment and partnership opportunities with the Group or any of its companies.',
          cta: 'Email the Group',
          kind: 'mail',
          target: 'Partnership enquiry',
        },
        {
          title: 'Careers',
          text: 'Send your CV or ask about opportunities across our six companies.',
          cta: 'Visit Careers',
          kind: 'page',
          target: '/careers',
        },
        {
          title: 'Media & general',
          text: 'Press, information requests and anything else — we’ll route it to the right team.',
          cta: 'Email us',
          kind: 'mail',
          target: 'General enquiry',
        },
      ],
    },
    companies: {
      eyebrow: 'Our companies',
      title: { lead: 'Reach a', accent: 'company' },
      lede: 'Each company has its own team. Visit its page, or contact the Group office and we’ll connect you.',
      visit: 'Visit page',
      directLabel: 'Direct line',
    },
    direct: {
      realfresh: {
        address: 'Al Mulla Warehouses, Al Qusais Industrial Area 1, Dubai',
        phone: '+971 4 358 1088',
        phoneHref: 'tel:+97143581088',
        email: 'info@realfreshuae.com',
        website: 'https://realfreshuae.com/',
      },
    },
  },
  ar: {
    meta: {
      title: 'تواصل معنا — مجموعة إن إس لوتاه',
      description:
        'تواصل مع مجموعة إن إس لوتاه في دبي — مكتب المجموعة والهاتف والبريد الإلكتروني، وكيفية الوصول إلى كل شركة من شركاتنا الست.',
    },
    hero: {
      eyebrow: 'تواصل معنا',
      title: { lead: 'لنبنِ معاً', accent: 'شيئاً عظيماً' },
      lede: 'سواء كنت تبحث عن شراكة أو تستفسر عن إحدى شركاتنا أو تريد التواصل فحسب، فمكتب المجموعة هو نقطة البداية.',
      photo: { src: skyline, alt: 'أفق مدينة دبي من الأعلى' },
    },
    office: {
      eyebrow: 'مكتب المجموعة',
      title: { lead: 'زرنا أو', accent: 'اتصل بنا' },
      lede: 'سيوجّه فريقنا استفسارك إلى الشركة المعنية.',
      labels: { address: 'العنوان', phone: 'الهاتف', email: 'البريد الإلكتروني' },
      maps: 'افتح في خرائط Google',
      mapsUrl,
      whatsapp: 'راسلنا عبر واتساب',
      whatsappUrl,
    },
    topics: {
      eyebrow: 'كيف يمكننا المساعدة',
      title: { lead: 'ابدأ', accent: 'المحادثة المناسبة' },
      items: [
        {
          title: 'الشراكات والأعمال',
          text: 'فرص التوزيع والاستثمار والشراكة مع المجموعة أو أيٍّ من شركاتها.',
          cta: 'راسل المجموعة',
          kind: 'mail',
          target: 'استفسار عن شراكة',
        },
        {
          title: 'الوظائف',
          text: 'أرسل سيرتك الذاتية أو استفسر عن الفرص المتاحة في شركاتنا الست.',
          cta: 'صفحة الوظائف',
          kind: 'page',
          target: '/careers',
        },
        {
          title: 'الإعلام والاستفسارات العامة',
          text: 'الصحافة وطلبات المعلومات وأي استفسار آخر — سنوجّهه إلى الفريق المعني.',
          cta: 'راسلنا',
          kind: 'mail',
          target: 'استفسار عام',
        },
      ],
    },
    companies: {
      eyebrow: 'شركاتنا',
      title: { lead: 'تواصل مع', accent: 'إحدى شركاتنا' },
      lede: 'لكل شركة فريقها الخاص. تفضّل بزيارة صفحتها، أو تواصل مع مكتب المجموعة وسنوصلك بها.',
      visit: 'زيارة الصفحة',
      directLabel: 'تواصل مباشر',
    },
    direct: {
      realfresh: {
        address: 'مستودعات الملا، المنطقة الصناعية القصيص 1، دبي',
        phone: '+971 4 358 1088',
        phoneHref: 'tel:+97143581088',
        email: 'info@realfreshuae.com',
        website: 'https://realfreshuae.com/',
      },
    },
  },
};
