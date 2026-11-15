/**
 * The six Group companies, in profile order. Copy is distilled from the 2026
 * Company Profile; Arabic is a 1:1 translation. Shared fields (paths, logos,
 * photos) are declared once and merged with each language's text.
 */
import type { Lang } from '../i18n/types';
import type { Company, CompanyId, LogoAsset } from './types';
import type { ImageMetadata } from 'astro';

import motorsCover from '../assets/images/profile/motors.webp';
import motorsDetail from '../assets/images/profile/motors-bike.webp';
import tradingCover from '../assets/images/profile/trading.webp';
import tradingDetail from '../assets/images/profile/trading-sunset.webp';
import upgradedCover from '../assets/images/profile/upgraded.webp';
import upgradedDetail from '../assets/images/profile/upgraded-workshop.webp';
import realfreshCover from '../assets/images/profile/realfresh.webp';
import realfreshDetail from '../assets/images/profile/realfresh-food.webp';
import evCover from '../assets/images/profile/ev.webp';
import evDetail from '../assets/images/profile/ev-chargers.webp';
import stonesCover from '../assets/images/profile/stones.webp';
import stonesDetail from '../assets/images/profile/stones-lounge.webp';

interface Shared {
  id: CompanyId;
  number: string;
  path: string;
  logo: LogoAsset;
  cover: ImageMetadata;
  detail: ImageMetadata;
}

type Text = Omit<Company, keyof Shared | 'cover' | 'detail'> & {
  coverAlt: string;
  detailAlt: string;
};

const shared: Shared[] = [
  {
    id: 'motors',
    number: '01',
    path: '/ns-lootah-motors',
    logo: { src: '/images/logos/ns-lootah-motors.svg', width: 1210, height: 533 },
    cover: motorsCover,
    detail: motorsDetail,
  },
  {
    id: 'trading',
    number: '02',
    path: '/nsl-trading',
    logo: { src: '/images/logos/nsl-general-trading.svg', width: 771, height: 274 },
    cover: tradingCover,
    detail: tradingDetail,
  },
  {
    id: 'upgraded',
    number: '03',
    path: '/project-upgraded',
    logo: { src: '/images/logos/project-upgraded.svg', width: 660, height: 167 },
    cover: upgradedCover,
    detail: upgradedDetail,
  },
  {
    id: 'realfresh',
    number: '04',
    path: '/real-fresh',
    logo: { src: '/images/logos/real-fresh.svg', width: 579, height: 278 },
    cover: realfreshCover,
    detail: realfreshDetail,
  },
  {
    id: 'ev',
    number: '05',
    path: '/ev-charging',
    logo: { src: '/images/logos/ns-lootah-ev-charging.svg', width: 894, height: 317 },
    cover: evCover,
    detail: evDetail,
  },
  {
    id: 'stones',
    number: '06',
    path: '/himalayan-stones',
    logo: { src: '/images/logos/nsl-himalayan-stones.svg', width: 504, height: 258 },
    cover: stonesCover,
    detail: stonesDetail,
  },
];

const text: Record<Lang, Record<CompanyId, Text>> = {
  en: {
    motors: {
      name: 'N S Lootah Motors',
      shortName: 'Motors',
      legalName: 'N S Lootah Motors LLC',
      sector: 'Automotive',
      tagline: 'The automotive arm of the Group, established to represent distinctive mobility brands.',
      summary:
        'Exclusive UAE distributor of SOUO Motorcycles and the flagship S2000 — the world’s first production Flat-8 motorcycle engine.',
      focus:
        'A platform for introducing international automotive and motorcycle brands to the UAE, backed by local market knowledge, distribution capability and customer-focused service.',
      points: [
        'Exclusive UAE distributor of SOUO Motorcycles',
        'Dedicated showroom presence in Dubai',
        'Sales, test rides & after-sales support',
      ],
      cta: 'Discover N S Lootah Motors',
      coverAlt: 'A classic silver grand tourer in a warmly lit Dubai showroom',
      detailAlt: 'The red tank and chrome controls of a SOUO S2000 motorcycle',
    },
    trading: {
      name: 'NSL General Trading',
      shortName: 'General Trading',
      legalName: 'N S L General Trading Co LLC',
      sector: 'Outdoor & lifestyle',
      tagline: 'Premium outdoor & adventure solutions.',
      summary:
        'Exclusive UAE distribution of San Hima outdoor, camping and off-road equipment — selected for desert, mountain and coastal exploration.',
      focus:
        'The Group’s trading arm connects international outdoor, adventure and lifestyle brands with the UAE through strategic partnerships and exclusive distribution agreements.',
      points: [
        'Exclusive UAE distribution of San Hima',
        'Camping, travel & overlanding equipment',
        'Lightbox & Powerbox',
      ],
      cta: 'Explore NSL General Trading',
      coverAlt: 'A rooftop tent pitched on an off-road vehicle at night',
      detailAlt: 'A pickup with a rooftop tent and awning at sunset in the desert',
    },
    upgraded: {
      name: 'Project Upgraded',
      shortName: 'Project Upgraded',
      legalName: 'Project Upgraded Workshop L.L.C.',
      sector: 'Automotive atelier',
      tagline: 'Cars to be driven. The exclusive automotive atelier of N S Lootah Group.',
      summary:
        'Bespoke vehicle care for the Lootah family, VVIP clients and a selected referral base — built around privacy, quality and personal service.',
      focus:
        'Each vehicle is its own project: specialised maintenance, restoration, customisation, performance upgrades and full transformations, all managed in-house.',
      points: [
        'Restorations & bespoke builds',
        'Performance upgrades & full transformations',
        '3D printing, CNC, upholstery & dyno in-house',
      ],
      cta: 'Visit the atelier',
      coverAlt: 'A modified muscle car silhouetted against an amber city skyline',
      detailAlt: 'A yellow classic Range Rover mid-restoration in the workshop',
    },
    realfresh: {
      name: 'Real Fresh',
      shortName: 'Real Fresh',
      legalName: 'Real Fresh Wholesale Trading LLC',
      sector: 'Food',
      tagline: 'Food sourcing, wholesale and distribution.',
      summary:
        'Connecting quality products with businesses across the UAE through a reliable, responsive supply network — and its own range of premium products.',
      focus:
        'Built on quality, consistency and partnership, Real Fresh works closely with trusted suppliers and supports the Group’s food and hospitality activities.',
      points: [
        'Strategic sourcing & distribution',
        'Consistent quality & reliability',
        'Long-term supplier partnerships',
      ],
      cta: 'Explore Real Fresh',
      coverAlt: 'Real Fresh frozen products — prawns, berries, croissants and fries — on dark stone',
      detailAlt: 'Bowls of rice, vegetables and grilled dishes on a slate table',
    },
    ev: {
      name: 'N S Lootah EV Charging',
      shortName: 'EV Charging',
      legalName: 'N S Lootah Electric Vehicles Fast Charging Stations',
      sector: 'Energy',
      tagline: 'Supporting the UAE’s transition towards clean and sustainable transportation.',
      summary:
        'Reliable, accessible charging infrastructure — professionally managed and maintained for homes, businesses, government entities and fleets.',
      focus:
        'Making electric mobility more practical and accessible through professionally managed charging solutions and efficient operations.',
      points: [
        'Managing & maintaining charging stations',
        'Residential, commercial & fleet solutions',
        'Growing the UAE’s EV network',
      ],
      cta: 'Explore EV Charging',
      coverAlt: 'A dual-cable DC fast charger lit against a dark wall',
      detailAlt: 'A row of EV charging posts with connected cables',
    },
    stones: {
      name: 'NSL Himalayan Stones',
      shortName: 'Himalayan Stones',
      legalName: 'NSL Himalayan Stones Trading',
      sector: 'Natural stone',
      tagline: 'Natural slate, marble and granite from the Himalayan region.',
      summary:
        'Carefully selected natural stone for architects, developers, contractors and landscape professionals across the UAE.',
      focus:
        'Cladding, flooring, feature walls, pathways, showers and landscaping — backed by reliable sourcing, consistent quality and dependable supply.',
      points: [
        'Interior & exterior applications',
        'Reliable sourcing & consistent quality',
        'Partnerships with industry professionals',
      ],
      cta: 'Explore Himalayan Stones',
      coverAlt: 'A translucent blue bathtub against a dark slate stone wall',
      detailAlt: 'A lounge clad in textured black slate with lanterns and pampas grass',
    },
  },
  ar: {
    motors: {
      name: 'إن إس لوتاه موتورز',
      shortName: 'موتورز',
      legalName: 'إن إس لوتاه موتورز ذ.م.م',
      sector: 'السيارات',
      tagline: 'ذراع السيارات في المجموعة، أُسست لتمثيل علامات تنقّل مميزة.',
      summary:
        'الموزع الحصري في الإمارات لدراجات SOUO النارية وطرازها الرائد S2000 — أول دراجة نارية في العالم بمحرك ثماني الأسطوانات متقابل (Flat-8) يُنتج تجارياً.',
      focus:
        'منصة لتقديم علامات السيارات والدراجات النارية العالمية إلى السوق الإماراتي، مدعومة بمعرفة عميقة بالسوق المحلي وقدرات توزيع وخدمات تتمحور حول العملاء.',
      points: [
        'الموزع الحصري لدراجات SOUO النارية في الإمارات',
        'صالة عرض مخصصة في دبي',
        'المبيعات وتجارب القيادة وخدمات ما بعد البيع',
      ],
      cta: 'اكتشف إن إس لوتاه موتورز',
      coverAlt: 'سيارة كلاسيكية فضية في صالة عرض بإضاءة دافئة في دبي',
      detailAlt: 'خزان الوقود الأحمر وأدوات التحكم الكرومية لدراجة SOUO S2000',
    },
    trading: {
      name: 'إن إس إل للتجارة العامة',
      shortName: 'التجارة العامة',
      legalName: 'إن إس إل للتجارة العامة ذ.م.م',
      sector: 'الرحلات وأسلوب الحياة',
      tagline: 'حلول متميزة للرحلات والمغامرات في الهواء الطلق.',
      summary:
        'التوزيع الحصري في الإمارات لمعدات سان هيما للتخييم والرحلات والطرق الوعرة — مختارة لاستكشاف الصحراء والجبال والسواحل.',
      focus:
        'الذراع التجارية للمجموعة، تربط علامات الرحلات والمغامرات وأسلوب الحياة العالمية بالسوق الإماراتي عبر شراكات استراتيجية واتفاقيات توزيع حصرية.',
      points: [
        'التوزيع الحصري لسان هيما في الإمارات',
        'معدات التخييم والسفر والرحلات البرية',
        'Lightbox و Powerbox',
      ],
      cta: 'استكشف إن إس إل للتجارة العامة',
      coverAlt: 'خيمة سقف منصوبة على مركبة دفع رباعي ليلاً',
      detailAlt: 'شاحنة بخيمة سقف ومظلة عند الغروب في الصحراء',
    },
    upgraded: {
      name: 'بروجكت أبغريدد',
      shortName: 'بروجكت أبغريدد',
      legalName: 'بروجكت أبغريدد ورشة ذ.م.م',
      sector: 'أتيليه السيارات',
      tagline: 'سيارات صُنعت لتُقاد. الأتيليه الحصري للسيارات في مجموعة إن إس لوتاه.',
      summary:
        'عناية مخصصة بالمركبات لعائلة لوتاه وكبار الشخصيات وقاعدة مختارة من العملاء — قوامها الخصوصية والجودة والخدمة الشخصية.',
      focus:
        'كل مركبة مشروع قائم بذاته: صيانة متخصصة وترميم وتخصيص وتحسين للأداء وتحويلات كاملة، تُدار جميعها داخلياً.',
      points: [
        'ترميم المركبات وبناء نماذج مخصصة',
        'تحسين الأداء والتحويلات الكاملة',
        'طباعة ثلاثية الأبعاد وCNC وتنجيد وديناموميتر داخلياً',
      ],
      cta: 'زر الأتيليه',
      coverAlt: 'سيارة معدّلة على خلفية أفق مدينة بلون كهرماني',
      detailAlt: 'سيارة رينج روفر كلاسيكية صفراء قيد الترميم في الورشة',
    },
    realfresh: {
      name: 'ريل فريش',
      shortName: 'ريل فريش',
      legalName: 'ريل فريش للتجارة بالجملة ذ.م.م',
      sector: 'الأغذية',
      tagline: 'توريد الأغذية وتجارتها بالجملة وتوزيعها.',
      summary:
        'تربط المنتجات عالية الجودة بالشركات في أنحاء الإمارات عبر شبكة إمداد موثوقة وسريعة الاستجابة — إلى جانب مجموعتها الخاصة من المنتجات المتميزة.',
      focus:
        'تقوم ريل فريش على الجودة والاتساق والشراكة، وتعمل عن قرب مع موردين موثوقين وتدعم أنشطة المجموعة في قطاع الأغذية والضيافة.',
      points: [
        'توريد وتوزيع استراتيجي',
        'جودة ثابتة وموثوقية',
        'شراكات طويلة الأمد مع الموردين',
      ],
      cta: 'استكشف ريل فريش',
      coverAlt: 'منتجات ريل فريش المجمدة — روبيان وتوت وكرواسون وبطاطس — على حجر داكن',
      detailAlt: 'أطباق أرز وخضروات ومشويات على طاولة من الحجر',
    },
    ev: {
      name: 'إن إس لوتاه لشحن المركبات الكهربائية',
      shortName: 'شحن المركبات الكهربائية',
      legalName: 'إن إس لوتاه لمحطات الشحن السريع للمركبات الكهربائية',
      sector: 'الطاقة',
      tagline: 'دعم تحوّل الإمارات نحو نقل نظيف ومستدام.',
      summary:
        'بنية تحتية للشحن موثوقة وسهلة الوصول — تُدار وتُصان باحترافية للمنازل والشركات والجهات الحكومية وأساطيل المركبات.',
      focus:
        'جعل التنقل الكهربائي أكثر عملية وسهولة من خلال حلول شحن تُدار باحترافية وعمليات تشغيل فعّالة.',
      points: [
        'إدارة محطات الشحن وصيانتها',
        'حلول للمنازل والقطاع التجاري والأساطيل',
        'توسيع شبكة الشحن في الإمارات',
      ],
      cta: 'استكشف حلول الشحن',
      coverAlt: 'شاحن سريع بكابلين مضاء أمام جدار داكن',
      detailAlt: 'صف من أعمدة شحن المركبات الكهربائية مع كابلاتها',
    },
    stones: {
      name: 'إن إس إل لأحجار الهيمالايا',
      shortName: 'أحجار الهيمالايا',
      legalName: 'إن إس إل لتجارة أحجار الهيمالايا',
      sector: 'الأحجار الطبيعية',
      tagline: 'أحجار الأردواز والرخام والجرانيت الطبيعية من منطقة الهيمالايا.',
      summary:
        'أحجار طبيعية منتقاة بعناية للمعماريين والمطورين والمقاولين ومختصي تنسيق المواقع في أنحاء الإمارات.',
      focus:
        'تكسيات وأرضيات وجدران مميزة وممرات ودُشات وتنسيق حدائق — مدعومة بتوريد موثوق وجودة ثابتة وإمداد يُعتمد عليه.',
      points: [
        'تطبيقات داخلية وخارجية',
        'توريد موثوق وجودة ثابتة',
        'شراكات مع محترفي القطاع',
      ],
      cta: 'استكشف أحجار الهيمالايا',
      coverAlt: 'حوض استحمام أزرق شفاف أمام جدار من حجر الأردواز الداكن',
      detailAlt: 'صالة مكسوة بحجر أردواز أسود مع فوانيس وعشب البامباس',
    },
  },
};

function build(lang: Lang): Company[] {
  return shared.map((s) => {
    const { coverAlt, detailAlt, ...copy } = text[lang][s.id];
    return {
      ...s,
      ...copy,
      cover: { src: s.cover, alt: coverAlt },
      detail: { src: s.detail, alt: detailAlt },
    };
  });
}

export const companies: Record<Lang, Company[]> = { en: build('en'), ar: build('ar') };

export function getCompany(lang: Lang, id: CompanyId): Company {
  const company = companies[lang].find((c) => c.id === id);
  if (!company) throw new Error(`Unknown company: ${id}`);
  return company;
}
