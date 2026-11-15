/** News index and article copy. One article today; add more to `articles`. */
import type { Lang } from '../../i18n/types';
import type { AccentTitle, Photo } from '../types';
import carCard from '../../assets/images/electric-car-blog.jpg';
import carPhoto from '../../assets/images/electric-car.jpg';

export type ArticleBlock = { type: 'p'; text: string } | { type: 'quote'; text: string; author: string };

export interface Article {
  /** URL segment under /news/. */
  slug: string;
  topic: string;
  title: string;
  summary: string;
  meta: { title: string; description: string };
  card: Photo;
  photo: Photo;
  caption: string;
  blocks: ArticleBlock[];
}

export interface NewsCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: AccentTitle; lede: string };
  listLabel: string;
  readMore: string;
  comingSoon: string;
  backToNews: string;
  articles: Article[];
}

export const news: Record<Lang, NewsCopy> = {
  en: {
    meta: {
      title: 'News — N S Lootah Group',
      description:
        'Announcements, milestones and stories from N S Lootah Group and its companies.',
    },
    hero: {
      eyebrow: 'News',
      title: { lead: 'News &', accent: 'updates' },
      lede: 'Announcements, milestones and stories from N S Lootah Group and its companies.',
    },
    listLabel: 'Latest',
    readMore: 'Read the story',
    comingSoon: 'More stories coming soon.',
    backToNews: 'Back to News',
    articles: [
      {
        slug: 'electric-car',
        topic: 'Sustainable mobility',
        title: 'First electric car hits Dubai roads',
        summary:
          'In a significant step towards Dubai’s vision for sustainable transport, the first fully electric cars took to the city’s roads.',
        meta: {
          title: 'First electric car hits Dubai roads — N S Lootah Group',
          description:
            'Dubai roads welcomed fully electric cars for the first time, licensed to S. S. Lootah Group as part of its Green Car programme.',
        },
        card: { src: carCard, alt: 'One of the first electric cars licensed in Dubai, with the Burj Al Arab behind' },
        photo: { src: carPhoto, alt: 'A newspaper photograph of one of the first electric cars licensed in Dubai, with the Burj Al Arab behind' },
        caption: 'From the press coverage of the launch.',
        blocks: [
          {
            type: 'p',
            text: 'In a significant step towards fulfilling Dubai’s vision for sustainable transport, Dubai roads recently welcomed fully electric cars for the first time — making it the first city in the Gulf to license electric cars.',
          },
          {
            type: 'p',
            text: 'The electric cars, licensed to Dubai-based S. S. Lootah Group, are the latest addition to the company fleet as part of its “Green Car” programme.',
          },
          {
            type: 'quote',
            text: 'The Green Car Programme has seen great progress since its inception, starting with the conversion of part of our fleet to Compressed Natural Gas, followed by hybrid cars and now electric cars. We are currently testing the performance and specifications of the electric car to suit Gulf conditions, and the response so far has been very positive.',
            author: 'Nasser Lootah, Director, S. S. Lootah Group',
          },
          {
            type: 'p',
            text: 'Conceived three years ago, the programme addresses the company’s mobility needs with minimum effect on the environment — part of the Group’s drive to make sustainability a core driver of business strategy, in line with the vision of the nation’s leadership.',
          },
          {
            type: 'p',
            text: 'Compressed Natural Gas (CNG), the cleanest-burning fossil fuel, hybrid vehicles, high-mileage vehicles and fleet modernisation are among the programme’s features.',
          },
          {
            type: 'quote',
            text: 'We are committed to contributing to our leadership’s vision of making Dubai sustainable in every respect, including mainstream transport. We are confident the electric car will be a viable alternative for commuting within the city and will play a significant role in reducing pollution.',
            author: 'Engineer Yahya Lootah, Vice Chairman & CEO, S. S. Lootah Group',
          },
        ],
      },
    ],
  },
  ar: {
    meta: {
      title: 'الأخبار — مجموعة إن إس لوتاه',
      description: 'إعلانات ومحطات وقصص من مجموعة إن إس لوتاه وشركاتها.',
    },
    hero: {
      eyebrow: 'الأخبار',
      title: { lead: 'الأخبار', accent: 'والمستجدات' },
      lede: 'إعلانات ومحطات وقصص من مجموعة إن إس لوتاه وشركاتها.',
    },
    listLabel: 'الأحدث',
    readMore: 'اقرأ القصة',
    comingSoon: 'المزيد من القصص قريباً.',
    backToNews: 'العودة إلى الأخبار',
    articles: [
      {
        slug: 'electric-car',
        topic: 'التنقل المستدام',
        title: 'أول سيارة كهربائية تسير على طرقات دبي',
        summary:
          'في خطوة مهمة نحو تحقيق رؤية دبي للنقل المستدام، انطلقت أولى السيارات الكهربائية بالكامل على طرقات المدينة.',
        meta: {
          title: 'أول سيارة كهربائية تسير على طرقات دبي — مجموعة إن إس لوتاه',
          description:
            'رحّبت طرقات دبي لأول مرة بسيارات كهربائية بالكامل، مرخّصة لمجموعة إس إس لوتاه ضمن برنامج السيارة الخضراء.',
        },
        card: { src: carCard, alt: 'إحدى أولى السيارات الكهربائية المرخّصة في دبي وخلفها برج العرب' },
        photo: { src: carPhoto, alt: 'صورة صحفية لإحدى أولى السيارات الكهربائية المرخّصة في دبي وخلفها برج العرب' },
        caption: 'من التغطية الصحفية للحدث.',
        blocks: [
          {
            type: 'p',
            text: 'في خطوة مهمة نحو تحقيق رؤية دبي للنقل المستدام، رحّبت طرقات دبي مؤخراً ولأول مرة بسيارات كهربائية بالكامل، لتصبح أول مدينة في الخليج ترخّص السيارات الكهربائية.',
          },
          {
            type: 'p',
            text: 'السيارات الكهربائية المرخّصة لمجموعة إس إس لوتاه، ومقرها دبي، هي أحدث إضافة إلى أسطول الشركة ضمن برنامج «السيارة الخضراء».',
          },
          {
            type: 'quote',
            text: 'شهد برنامج السيارة الخضراء تقدماً كبيراً منذ إطلاقه، بدءاً بتحويل جزء من أسطولنا إلى الغاز الطبيعي المضغوط، ثم استخدام السيارات الهجينة، والآن السيارات الكهربائية. ونختبر حالياً أداء السيارة الكهربائية ومواصفاتها لتلائم ظروف الخليج، وقد كانت الاستجابة إيجابية جداً حتى الآن.',
            author: 'ناصر لوتاه، مدير، مجموعة إس إس لوتاه',
          },
          {
            type: 'p',
            text: 'يلبّي البرنامج، الذي وُضع تصوره قبل ثلاث سنوات، احتياجات الشركة من التنقل بأقل أثر على البيئة، ضمن سعي المجموعة إلى جعل الاستدامة محركاً أساسياً لاستراتيجية أعمالها، تماشياً مع رؤية قيادة الدولة.',
          },
          {
            type: 'p',
            text: 'ومن أبرز ملامح البرنامج: استخدام الغاز الطبيعي المضغوط، أنظف أنواع الوقود الأحفوري احتراقاً، والمركبات الهجينة، والمركبات عالية الكفاءة، وتحديث الأسطول.',
          },
          {
            type: 'quote',
            text: 'نحن ملتزمون بالإسهام في رؤية قيادتنا لجعل دبي مستدامة في كل جانب، بما في ذلك وسائل النقل. ونحن واثقون من أن السيارة الكهربائية ستكون بديلاً عملياً للتنقل داخل المدينة، وستؤدي دوراً مهماً في الحد من التلوث.',
            author: 'المهندس يحيى لوتاه، نائب رئيس مجلس الإدارة والرئيس التنفيذي، مجموعة إس إس لوتاه',
          },
        ],
      },
    ],
  },
};

export function getArticle(lang: Lang, slug: string): Article {
  const article = news[lang].articles.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown article: ${slug}`);
  return article;
}
