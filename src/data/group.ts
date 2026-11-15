/**
 * The Group's own story, distilled from the 2026 Company Profile: overview,
 * legacy, leadership, direction and values. Arabic is a 1:1 translation.
 * Shared by the homepage and the About page.
 */
import type { Lang } from '../i18n/types';
import type { AccentTitle, Photo } from './types';

import towers from '../assets/images/profile/towers.webp';
import dome from '../assets/images/profile/dome.webp';
import glassRoof from '../assets/images/profile/glass-roof.webp';
import tower from '../assets/images/profile/tower.webp';
import legacyPhoto from '../assets/images/profile/legacy.webp';
import portrait from '../assets/images/director-bonlootah.webp';

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export interface Value {
  name: string;
  text: string;
}

export interface GroupContent {
  overview: string;
  heritage: string;
  standards: string;
  growth: string;
  /** The homepage statement: plain lead, then the gold italic close. */
  statement: AccentTitle;
  stats: { label: string; value: string }[];
  legacy: {
    eyebrow: string;
    title: AccentTitle;
    kicker: string;
    intro: string;
    founder: string;
    achievements: string;
    today: string;
    philosophy: string;
    closing: string;
    principles: string[];
  };
  milestones: Milestone[];
  chairman: {
    eyebrow: string;
    title: AccentTitle;
    name: string;
    role: string;
    bio: string[];
    portrait: Photo;
  };
  direction: {
    vision: { title: string; lines: string[] };
    mission: { title: string; lines: string[] };
  };
  values: { eyebrow: string; title: AccentTitle; items: Value[] };
  imagery: {
    towers: Photo;
    dome: Photo;
    glassRoof: Photo;
    tower: Photo;
    legacy: Photo;
  };
}

export const group: Record<Lang, GroupContent> = {
  en: {
    overview:
      'N S Lootah Group L.L.C. is a UAE-based holding company with businesses across automotive, sustainability, EV charging, food and emerging sectors.',
    heritage:
      'Building on the legacy of S. S. Lootah Group, established in 1954, the company carries forward decades of business experience.',
    standards:
      'Its companies combine specialised expertise with independent commercial focus, creating a diverse portfolio connected by shared standards of excellence.',
    growth:
      'As the portfolio expands, the Group continues to pursue new opportunities while supporting local industries and the UAE economy.',
    statement: {
      lead: 'N S Lootah Group L.L.C. is a UAE-based holding company with businesses across automotive, sustainability, EV charging, food and emerging sectors. Its companies combine specialised expertise with independent commercial focus, creating a diverse portfolio connected by',
      accent: 'shared standards of excellence.',
    },
    stats: [
      { label: 'Legacy since', value: '1954' },
      { label: 'Operating companies', value: '06' },
      { label: 'Sectors', value: '05' },
      { label: 'Headquarters', value: 'Dubai' },
    ],
    legacy: {
      eyebrow: 'Our story',
      title: { lead: 'A legacy', accent: 'with purpose' },
      kicker: 'Rooted in legacy. Driven by purpose.',
      intro:
        'The story behind N S Lootah Group is rooted in a legacy of entrepreneurship, responsibility and service to society.',
      founder:
        'That legacy was shaped by the late Haj Saeed bin Ahmed Al Lootah, one of the UAE’s pioneering entrepreneurs — a visionary whose philosophy rested on three enduring principles: Education, Cooperation and Economy.',
      achievements:
        'His achievements reflected a belief that enterprise should create value not only for its owners, but for people and society. In 1975 he helped establish Dubai Islamic Bank, recognised as the world’s first commercial Islamic bank, and he later founded pioneering educational institutions, including Dubai Medical College for Girls in 1986.',
      today:
        'Under the leadership of Nasser Saeed Ahmed Nasser Lootah, the Group carries that entrepreneurial spirit into a new generation — building a diversified portfolio across automotive, trading, sustainable mobility, food distribution and emerging sectors.',
      philosophy:
        'Build with purpose, pursue opportunity with integrity, invest for the long term, and create businesses that contribute positively to the UAE and its people.',
      closing: 'A legacy not simply to preserve, but to build upon.',
      principles: ['Education', 'Cooperation', 'Economy'],
    },
    milestones: [
      { year: '1954', title: 'S. S. Lootah Group', text: 'The family enterprise whose decades of business experience the Group carries forward.' },
      { year: '1975', title: 'Dubai Islamic Bank', text: 'Haj Saeed bin Ahmed Al Lootah helps establish the world’s first commercial Islamic bank.' },
      { year: '1986', title: 'Dubai Medical College for Girls', text: 'Opening the study of medicine to women within the UAE.' },
      { year: 'Today', title: 'N S Lootah Group', text: 'Six companies across automotive, trading, food, EV charging and natural stone.' },
    ],
    chairman: {
      eyebrow: 'The leadership',
      title: { lead: 'Chairman’s vision', accent: 'with operating depth' },
      name: 'Nasser Saeed Ahmed Nasser Lootah',
      role: 'Founder & Chairman',
      bio: [
        'Nasser Saeed Ahmed Nasser Lootah is the Founder and Chairman of N S Lootah Group, a diversified business group with interests across automotive, general trading, EV charging solutions, food trading and other evolving sectors. He also serves as Vice Chairman of S. S. Lootah Group and sits on various company boards, contributing strategic direction and financial insight across a broad range of business interests.',
        'With a strong background in banking and finance, he brings extensive commercial experience and a clear understanding of business operations and long-term strategy. He is a major shareholder of Dubai Islamic Bank, the world’s first Islamic bank, founded by his late father, Haj Saeed bin Ahmed Al Lootah.',
        'Alongside his financial experience, his passion for automobiles has led to an active, hands-on role in developing the Group’s automotive interests. His leadership reflects a commitment to innovation, operational excellence and sustainable growth, as the Group supports the UAE’s national vision through job creation, local industry development and continued business growth.',
      ],
      portrait: { src: portrait, alt: 'Nasser Saeed Ahmed Nasser Lootah, Founder and Chairman' },
    },
    direction: {
      vision: {
        title: 'Vision',
        lines: [
          'To continue evolving as a diversified UAE business group, creating lasting value across industries and pursuing new opportunities.',
          'To strengthen the Group’s position while contributing to the country’s continued economic development.',
        ],
      },
      mission: {
        title: 'Mission',
        lines: [
          'To support established and growing industries, create meaningful opportunities for people and continue to shape the UAE business landscape.',
          'To expand the Group’s reach, strengthen its competitiveness and establish a growing presence across regional and global markets.',
        ],
      },
    },
    values: {
      eyebrow: 'What guides us',
      title: { lead: 'The Group', accent: 'values' },
      items: [
        { name: 'Responsibility', text: 'Business has a responsibility beyond commercial success. We make decisions that create lasting economic and social value for our stakeholders and future generations.' },
        { name: 'Integrity', text: 'We conduct our business with honesty, transparency and accountability, building trust with our people, partners, customers and communities.' },
        { name: 'Innovation', text: 'We embrace new ideas, technologies and ways of thinking to create better solutions and continuously strengthen our businesses.' },
        { name: 'Excellence', text: 'We pursue the highest standards in everything we do, delivering quality products, services and experiences across our portfolio.' },
        { name: 'People', text: 'Our people are the foundation of our success. We empower talent, encourage collaboration and create opportunities to grow and lead.' },
        { name: 'Sustainable Growth', text: 'We make responsible, forward-looking decisions that create lasting value for our businesses, communities and future generations.' },
        { name: 'Commitment to the UAE', text: 'We are proud to contribute to the UAE’s development through responsible investment, entrepreneurship and long-term growth.' },
      ],
    },
    imagery: {
      towers: { src: towers, alt: 'Dubai towers seen from below' },
      dome: { src: dome, alt: 'A glass dome against a pale sky' },
      glassRoof: { src: glassRoof, alt: 'Looking up through a faceted glass roof at Dubai towers' },
      tower: { src: tower, alt: 'A curved Dubai tower rising into a pale sky' },
      legacy: { src: legacyPhoto, alt: 'Two members of the Lootah family seated in conversation' },
    },
  },
  ar: {
    overview:
      'مجموعة إن إس لوتاه ذ.م.م شركة قابضة مقرها دولة الإمارات، لها أعمال في قطاعات السيارات والاستدامة وشحن المركبات الكهربائية والأغذية والقطاعات الناشئة.',
    heritage:
      'وامتداداً لإرث مجموعة إس إس لوتاه التي تأسست عام 1954، تحمل الشركة عقوداً من الخبرة في عالم الأعمال.',
    standards:
      'تجمع شركاتها بين الخبرة المتخصصة والتركيز التجاري المستقل، لتشكّل محفظة متنوعة تربطها معايير مشتركة من التميّز.',
    growth:
      'ومع توسّع المحفظة، تواصل المجموعة اقتناص الفرص الجديدة مع دعم الصناعات المحلية واقتصاد دولة الإمارات.',
    statement: {
      lead: 'مجموعة إن إس لوتاه ذ.م.م شركة قابضة مقرها دولة الإمارات، لها أعمال في قطاعات السيارات والاستدامة وشحن المركبات الكهربائية والأغذية والقطاعات الناشئة. تجمع شركاتها بين الخبرة المتخصصة والتركيز التجاري المستقل، لتشكّل محفظة متنوعة تربطها',
      accent: 'معايير مشتركة من التميّز.',
    },
    stats: [
      { label: 'إرث منذ', value: '1954' },
      { label: 'شركات عاملة', value: '06' },
      { label: 'قطاعات', value: '05' },
      { label: 'المقر الرئيسي', value: 'دبي' },
    ],
    legacy: {
      eyebrow: 'قصتنا',
      title: { lead: 'إرثٌ', accent: 'يحمل رسالة' },
      kicker: 'جذورنا في الإرث، ودافعنا الرسالة.',
      intro: 'تمتد جذور قصة مجموعة إن إس لوتاه إلى إرث من ريادة الأعمال والمسؤولية وخدمة المجتمع.',
      founder:
        'وقد صاغ هذا الإرثَ المغفور له الحاج سعيد بن أحمد آل لوتاه، أحد رواد الأعمال الأوائل في دولة الإمارات، وصاحب رؤية قامت فلسفته على ثلاثة مبادئ راسخة: التعليم والتعاون والاقتصاد.',
      achievements:
        'عكست إنجازاته إيماناً بأن المشاريع ينبغي أن تصنع قيمة لا لأصحابها فحسب، بل للناس والمجتمع. ففي عام 1975 أسهم في تأسيس بنك دبي الإسلامي، أول بنك إسلامي تجاري في العالم، ثم أسس مؤسسات تعليمية رائدة، منها كلية دبي الطبية للبنات عام 1986.',
      today:
        'وتحت قيادة ناصر سعيد أحمد ناصر لوتاه، تحمل المجموعة روح ريادة الأعمال هذه إلى جيل جديد، فتبني محفظة متنوعة في قطاعات السيارات والتجارة والتنقل المستدام وتوزيع الأغذية والقطاعات الناشئة.',
      philosophy:
        'أن نبني بهدف، ونسعى وراء الفرص بنزاهة، ونستثمر للمدى البعيد، وننشئ أعمالاً تسهم إيجاباً في دولة الإمارات وشعبها.',
      closing: 'إرثٌ لا نكتفي بصونه، بل نبني عليه.',
      principles: ['التعليم', 'التعاون', 'الاقتصاد'],
    },
    milestones: [
      { year: '1954', title: 'مجموعة إس إس لوتاه', text: 'المؤسسة العائلية التي تحمل المجموعة عقوداً من خبرتها في عالم الأعمال.' },
      { year: '1975', title: 'بنك دبي الإسلامي', text: 'الحاج سعيد بن أحمد آل لوتاه يسهم في تأسيس أول بنك إسلامي تجاري في العالم.' },
      { year: '1986', title: 'كلية دبي الطبية للبنات', text: 'فتح باب دراسة الطب أمام المرأة داخل دولة الإمارات.' },
      { year: 'اليوم', title: 'مجموعة إن إس لوتاه', text: 'ست شركات في قطاعات السيارات والتجارة والأغذية وشحن المركبات الكهربائية والأحجار الطبيعية.' },
    ],
    chairman: {
      eyebrow: 'القيادة',
      title: { lead: 'رؤية رئيس مجلس الإدارة', accent: 'بعمق تشغيلي' },
      name: 'ناصر سعيد أحمد ناصر لوتاه',
      role: 'المؤسس ورئيس مجلس الإدارة',
      bio: [
        'ناصر سعيد أحمد ناصر لوتاه هو مؤسس مجموعة إن إس لوتاه ورئيس مجلس إدارتها، وهي مجموعة أعمال متنوعة لها مصالح في قطاعات السيارات والتجارة العامة وحلول شحن المركبات الكهربائية وتجارة الأغذية وقطاعات أخرى متنامية. ويشغل أيضاً منصب نائب رئيس مجلس إدارة مجموعة إس إس لوتاه، وهو عضو في مجالس إدارة عدد من الشركات، يسهم فيها بالتوجيه الاستراتيجي والرؤية المالية.',
        'وبفضل خلفيته الراسخة في القطاعين المصرفي والمالي، يمتلك خبرة تجارية واسعة وفهماً واضحاً لعمليات الأعمال والاستراتيجيات بعيدة المدى. وهو مساهم رئيسي في بنك دبي الإسلامي، أول بنك إسلامي في العالم، الذي أسسه والده المغفور له الحاج سعيد بن أحمد آل لوتاه.',
        'وإلى جانب خبرته المالية، قاده شغفه بالسيارات إلى دور فاعل ومباشر في تطوير أعمال المجموعة في قطاع السيارات. وتعكس قيادته التزاماً بالابتكار والتميّز التشغيلي والنمو المستدام، فيما تواصل المجموعة دعم الرؤية الوطنية لدولة الإمارات من خلال خلق فرص العمل وتنمية الصناعة المحلية ومواصلة نمو الأعمال.',
      ],
      portrait: { src: portrait, alt: 'ناصر سعيد أحمد ناصر لوتاه، المؤسس ورئيس مجلس الإدارة' },
    },
    direction: {
      vision: {
        title: 'الرؤية',
        lines: [
          'أن نواصل تطورنا كمجموعة أعمال إماراتية متنوعة، نصنع قيمة مستدامة عبر القطاعات ونسعى وراء فرص جديدة.',
          'أن نعزز مكانة المجموعة مع الإسهام في التنمية الاقتصادية المستمرة للدولة.',
        ],
      },
      mission: {
        title: 'الرسالة',
        lines: [
          'أن ندعم الصناعات القائمة والناشئة، ونخلق فرصاً هادفة للناس، ونواصل الإسهام في تشكيل بيئة الأعمال في دولة الإمارات.',
          'أن نوسّع نطاق المجموعة ونعزز تنافسيتها ونبني حضوراً متنامياً في الأسواق الإقليمية والعالمية.',
        ],
      },
    },
    values: {
      eyebrow: 'ما يوجّهنا',
      title: { lead: 'قيم', accent: 'المجموعة' },
      items: [
        { name: 'المسؤولية', text: 'للأعمال مسؤولية تتجاوز النجاح التجاري. نتخذ قرارات تصنع قيمة اقتصادية واجتماعية مستدامة لأصحاب المصلحة وللأجيال القادمة.' },
        { name: 'النزاهة', text: 'نمارس أعمالنا بأمانة وشفافية ومساءلة، ونبني الثقة مع موظفينا وشركائنا وعملائنا ومجتمعاتنا.' },
        { name: 'الابتكار', text: 'نتبنّى الأفكار والتقنيات وأساليب التفكير الجديدة لنصنع حلولاً أفضل ونعزز أعمالنا باستمرار.' },
        { name: 'التميّز', text: 'نسعى إلى أعلى المعايير في كل ما نقوم به، ونقدّم منتجات وخدمات وتجارب عالية الجودة عبر محفظتنا.' },
        { name: 'الإنسان', text: 'موظفونا أساس نجاحنا. نمكّن المواهب ونشجع التعاون ونتيح فرص النمو والقيادة.' },
        { name: 'النمو المستدام', text: 'نتخذ قرارات مسؤولة واستشرافية تصنع قيمة دائمة لأعمالنا ومجتمعاتنا والأجيال القادمة.' },
        { name: 'الالتزام تجاه الإمارات', text: 'نفخر بالإسهام في تنمية دولة الإمارات من خلال الاستثمار المسؤول وريادة الأعمال والنمو طويل الأمد.' },
      ],
    },
    imagery: {
      towers: { src: towers, alt: 'أبراج دبي من الأسفل' },
      dome: { src: dome, alt: 'قبة زجاجية أمام سماء صافية' },
      glassRoof: { src: glassRoof, alt: 'منظر عبر سقف زجاجي متعدد الأوجه نحو أبراج دبي' },
      tower: { src: tower, alt: 'برج منحنٍ في دبي يرتفع نحو سماء صافية' },
      legacy: { src: legacyPhoto, alt: 'فردان من عائلة لوتاه يتبادلان الحديث' },
    },
  },
};
