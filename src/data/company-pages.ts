/**
 * Page bodies for the six company pages. Summary fields (name, sector,
 * tagline, logo, cover/detail photos) live in companies.ts; this file holds
 * what only the company page needs. English is distilled from the 2026
 * Company Profile plus the still-current specifics of the previous site;
 * Arabic is a 1:1 translation.
 */
import type { Lang } from '../i18n/types';
import type { AccentTitle, CompanyId, Photo } from './types';

import motorsShowroom from '../assets/images/profile/motors-showroom.webp';
import tradingHills from '../assets/images/profile/trading-hills.webp';
import upgradedEngine from '../assets/images/profile/upgraded-engine.webp';
import realfreshPantry from '../assets/images/profile/realfresh-pantry.webp';
import evCar from '../assets/images/profile/ev-car.webp';
import stonesShowroom from '../assets/images/profile/stones-showroom.webp';
import maxiCharge from '../assets/images/maxi-charge.jpg';
import smartDrive from '../assets/images/smart-drive.webp';
import batteryManagement from '../assets/images/battery-management.webp';
import mechanicalRepairs from '../assets/images/mechanical-repairs.jpg';
import dynamometerTesting from '../assets/images/dynamometer-testing.jpg';
import bodyshopSealant from '../assets/images/bodyshop-sealant.jpg';

export interface Action {
  label: string;
  /** Locale-free site path ('/contact'), in-page anchor ('#…') or absolute URL. */
  href: string;
  external?: boolean;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Item {
  title: string;
  text: string;
}

export interface FeatureItem extends Item {
  photo?: Photo;
}

export type Extra =
  | {
      kind: 'lists';
      id: string;
      eyebrow: string;
      title: AccentTitle;
      lede?: string;
      lists: { title: string; items: string[]; note?: string }[];
    }
  | {
      kind: 'features';
      id: string;
      eyebrow: string;
      title: AccentTitle;
      lede?: string;
      items: FeatureItem[];
      action?: Action;
    }
  | {
      kind: 'contact';
      id: string;
      eyebrow: string;
      title: AccentTitle;
      lede?: string;
      address: string;
      phone: string;
      phoneHref: string;
      email: string;
      website?: { label: string; href: string };
    };

export interface CompanyPageContent {
  meta: { title: string; description: string };
  heroTitle: AccentTitle;
  actions: Action[];
  facts: Fact[];
  focus: string[];
  development: { eyebrow: string; statement: AccentTitle; body: string[]; photo?: Photo };
  portfolio: { title: AccentTitle; intro: string; items: Item[] };
  extras: Extra[];
}

export interface CompanyPageLabels {
  breadcrumb: string;
  focusEyebrow: string;
  focusTitle: AccentTitle;
  portfolioEyebrow: string;
  moreEyebrow: string;
  moreTitle: AccentTitle;
  address: string;
  telephone: string;
  email: string;
  website: string;
}

export const companyPages: Record<
  Lang,
  { labels: CompanyPageLabels; pages: Record<CompanyId, CompanyPageContent> }
> = {
  en: {
    labels: {
      breadcrumb: 'Breadcrumb',
      focusEyebrow: 'The company',
      focusTitle: { lead: 'The company', accent: 'focus' },
      portfolioEyebrow: 'Current portfolio',
      moreEyebrow: 'Our companies',
      moreTitle: { lead: 'More from', accent: 'the Group' },
      address: 'Address',
      telephone: 'Telephone',
      email: 'Email',
      website: 'Website',
    },
    pages: {
      motors: {
        meta: {
          title: 'N S Lootah Motors — N S Lootah Group',
          description:
            'N S Lootah Motors is the automotive arm of N S Lootah Group and exclusive UAE distributor of SOUO Motorcycles — home of the S2000 and the world’s first production Flat-8 motorcycle engine.',
        },
        heroTitle: { lead: 'N S Lootah', accent: 'Motors' },
        actions: [
          { label: 'Enquire', href: '/contact' },
          { label: 'Visit souomoto.ae', href: 'https://www.souomoto.ae/', external: true },
        ],
        facts: [
          { label: 'Legal entity', value: 'N S Lootah Motors LLC' },
          { label: 'Sector', value: 'Automotive' },
          { label: 'Distribution', value: 'SOUO Motorcycles, exclusive in the UAE' },
          { label: 'Showroom', value: 'Dubai' },
        ],
        focus: [
          'N S Lootah Motors LLC is the automotive arm of the Group, established to represent distinctive mobility brands. With a focus on premium mobility, innovative engineering and emerging automotive technologies, it provides a platform for introducing international automotive and motorcycle brands to the UAE market — supported by strong local market knowledge, distribution capabilities and customer-focused services.',
          'The company is currently the exclusive UAE distributor of SOUO Motorcycles, bringing the premium motorcycle brand and its flagship SOUO S2000 to riders across the Emirates. Featuring the world’s first production Flat-8 motorcycle engine, the S2000 combines distinctive design, advanced technology and high-performance engineering.',
        ],
        development: {
          eyebrow: 'The company development',
          statement: {
            lead: 'Through its dedicated showroom in Dubai, N S Lootah Motors delivers an integrated customer experience:',
            accent: 'sales, test rides, brand engagement and after-sales support.',
          },
          body: [
            'Looking ahead, N S Lootah Motors aims to expand its automotive portfolio through strategic partnerships and new mobility opportunities, building a diversified platform of brands and products that respond to the evolving needs of the UAE and regional markets.',
          ],
          photo: {
            src: motorsShowroom,
            alt: 'Guests in the N S Lootah Motors showroom in Dubai beside a red motorcycle',
          },
        },
        portfolio: {
          title: { lead: 'Current', accent: 'portfolio' },
          intro:
            'The products, services and market presence that define the company’s current automotive operations.',
          items: [
            {
              title: 'Exclusive UAE distributor of SOUO Motorcycles',
              text: 'Bringing the premium motorcycle brand and its flagship S2000 to riders across the Emirates.',
            },
            {
              title: 'Dedicated showroom presence in Dubai',
              text: 'A dedicated platform to showcase and sell iconic and collectible vehicles with strong character and heritage.',
            },
            {
              title: 'Sales, test rides & after-sales support',
              text: 'An integrated customer experience, from the first ride to long-term ownership.',
            },
            {
              title: 'Mobile workshop service',
              text: 'Servicing and support brought to the rider, wherever the motorcycle is.',
            },
            {
              title: 'Spare parts, accessories & merchandise',
              text: 'Genuine parts, riding accessories and brand merchandise.',
            },
          ],
        },
        extras: [
          {
            kind: 'features',
            id: 'models',
            eyebrow: 'SOUO Motorcycles',
            title: { lead: 'The SOUO', accent: 'models' },
            lede: 'A horizontally opposed Flat-8 engine gives superior balance, a lower centre of gravity and smoother power delivery.',
            items: [
              {
                title: 'SOUO S2000',
                text: 'The flagship premium touring motorcycle, powered by the world’s first production Flat-8 motorcycle engine.',
              },
              {
                title: 'SOUO S2000C',
                text: 'The luxury cruiser variant of the S2000, with the same Flat-8 at its heart.',
              },
            ],
            action: { label: 'Visit souomoto.ae', href: 'https://www.souomoto.ae/', external: true },
          },
        ],
      },
      trading: {
        meta: {
          title: 'NSL General Trading — N S Lootah Group',
          description:
            'N S L General Trading Co LLC is N S Lootah Group’s trading arm for premium outdoor, adventure and lifestyle products — exclusive UAE distributor of San Hima, with portable power built for the GCC climate.',
        },
        heroTitle: { lead: 'NSL General', accent: 'Trading' },
        actions: [{ label: 'Enquire about products', href: '/contact' }],
        facts: [
          { label: 'Legal entity', value: 'N S L General Trading Co LLC' },
          { label: 'Sector', value: 'Outdoor & lifestyle' },
          { label: 'Distribution', value: 'San Hima, exclusive in the UAE' },
          { label: 'Markets', value: 'UAE & the wider region' },
        ],
        focus: [
          'N S L General Trading Co LLC is the Group’s trading arm for premium outdoor, adventure and lifestyle products. The company focuses on bringing high-quality brands and solutions to the UAE and the wider regional market.',
          'Through strategic partnerships and exclusive distribution agreements, it connects international products with the UAE market — combining global expertise with a strong understanding of local conditions and customer needs.',
        ],
        development: {
          eyebrow: 'Explore with confidence',
          statement: {
            lead: 'From camping and overlanding to travel and outdoor living, the portfolio is built around',
            accent: 'quality, reliability and practical solutions.',
          },
          body: [
            'Inspired by real outdoor experiences, the range continues to grow to serve individuals, families and overlanders — supported by long-term partnerships with innovative international brands.',
            'N S L Trading is committed to products that combine durability, functionality and design. Looking ahead, it will keep expanding across complementary outdoor, adventure and lifestyle categories, strengthening its position as a trusted regional platform for premium international brands.',
          ],
          photo: {
            src: tradingHills,
            alt: 'An off-road vehicle with a roof-top tent and ladder among rocky hills',
          },
        },
        portfolio: {
          title: { lead: 'Current', accent: 'portfolio' },
          intro:
            'Equipment selected for exploration across desert, mountain and coastal environments throughout the Middle East.',
          items: [
            {
              title: 'Exclusive UAE distribution of San Hima',
              text: 'Outdoor, camping and off-road equipment from San Hima, distributed exclusively in the UAE.',
            },
            {
              title: 'Camping, travel & adventure equipment',
              text: 'A growing range that combines durability, function and innovation.',
            },
            {
              title: 'Built for demanding climates',
              text: 'Practical products selected to perform in demanding climates and environments.',
            },
            {
              title: 'Off-road solutions',
              text: 'Roof-top tents, free-standing awnings and accessories for exploration across the region.',
            },
            {
              title: 'Lightbox & Powerbox',
              text: 'Portable light and power for camp, site and vehicle.',
            },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'products',
            eyebrow: 'Products & solutions',
            title: { lead: 'What we', accent: 'supply' },
            lists: [
              {
                title: 'Outdoor & camping',
                items: [
                  'Camping gear',
                  'Roof-top tents for SUVs',
                  'Free-standing off-road awnings',
                  'Camping & caravan accessories',
                ],
                note: 'Exclusive UAE distributor for San Hima camping products.',
              },
              {
                title: 'Power systems',
                items: [
                  'Portable Power Boxes (1000W–4600W)',
                  'Rechargeable LiFePO4 battery systems',
                  'Hybrid solar-compatible power units',
                  'Compact, eco-friendly inverter generators',
                  'Custom off-grid power solutions',
                ],
              },
            ],
          },
          {
            kind: 'features',
            id: 'technology',
            eyebrow: 'Powerbox technology',
            title: { lead: 'Power for', accent: 'the GCC climate' },
            lede: 'LiFePO4 Power Boxes from 1000W to 4600W — a clean, quiet and compact alternative to fuel generators for outdoor, industrial and off-grid use.',
            items: [
              {
                title: 'Maxi-Charge',
                text: 'Market-leading recharging speeds — from 0 to 100% in just 1.5 hours.',
                photo: { src: maxiCharge, alt: 'A portable power station charging from a wall socket' },
              },
              {
                title: 'SmartDrive',
                text: 'Safely and efficiently powers appliances that exceed the unit’s nominal capacity.',
                photo: { src: smartDrive, alt: 'A power box running a hair dryer, microwave, circular saw and cooker' },
              },
              {
                title: 'Battery Management System',
                text: 'Intelligent monitoring of voltage, current and temperature, with advanced protection algorithms.',
                photo: { src: batteryManagement, alt: 'A rendering of the lithium cells inside a power box' },
              },
            ],
          },
          {
            kind: 'lists',
            id: 'markets',
            eyebrow: 'Who we serve',
            title: { lead: 'Built for', accent: 'the field' },
            lists: [
              {
                title: 'Markets',
                items: [
                  'Construction & contracting firms',
                  'Utility & field engineering teams',
                  'Emergency response units',
                  'Camping & off-road enthusiasts',
                  'Government departments',
                  'Event planners',
                ],
              },
            ],
          },
        ],
      },
      upgraded: {
        meta: {
          title: 'Project Upgraded — N S Lootah Group',
          description:
            'Project Upgraded Workshop L.L.C. is the exclusive automotive atelier of N S Lootah Group — restoration, customisation, performance upgrades and fabrication in an 18,000 sq. ft. facility.',
        },
        heroTitle: { lead: 'Project', accent: 'Upgraded' },
        actions: [{ label: 'Enquire about a project', href: '/contact' }],
        facts: [
          { label: 'Legal entity', value: 'Project Upgraded Workshop L.L.C.' },
          { label: 'Facility', value: '18,000 sq. ft.' },
          { label: 'Team', value: '40+ specialists' },
          { label: 'Clients', value: 'Lootah family, VVIP & referral' },
        ],
        focus: [
          'Project Upgraded Workshop L.L.C. is the exclusive automotive atelier of N S Lootah Group, serving the Lootah family, VVIP clients and a selected referral customer base. More than a conventional workshop, it provides bespoke vehicle care with a strong focus on privacy, quality and personalised service.',
          'Each vehicle is approached as an individual project — from specialised maintenance and restoration to customisation, performance upgrades and full transformations. All work is managed in-house by experienced specialists, ensuring close control over quality, execution and confidentiality.',
        ],
        development: {
          eyebrow: 'The company philosophy',
          statement: { lead: 'An automotive experience', accent: 'beyond the ordinary.' },
          body: [
            'Project Upgraded represents the Group’s pursuit of automotive excellence at its most exclusive, combining specialist expertise with a highly personal approach to vehicle care.',
            'Created for clients who expect a level of service beyond the conventional workshop, it brings together advanced engineering, specialist knowledge and individual expression to develop each vehicle according to its character and its owner’s requirements.',
          ],
          photo: { src: upgradedEngine, alt: 'A detailed engine bay in black and white' },
        },
        portfolio: {
          title: { lead: 'Current', accent: 'portfolio' },
          intro: 'Specialist automotive services built around precision, privacy and individual vehicle requirements.',
          items: [
            {
              title: 'Bespoke attention',
              text: 'Individual attention and specialist expertise tailored to each vehicle and its owner.',
            },
            {
              title: 'End-to-end, in-house',
              text: 'Projects are managed from assessment and design through fabrication, finishing and final delivery.',
            },
            {
              title: 'Discreet by design',
              text: 'Personalised service with confidentiality and trusted vehicle handling throughout each project.',
            },
            {
              title: 'Craft meets engineering',
              text: 'Specialist automotive techniques combined with advanced diagnostics, equipment and modern engineering.',
            },
            {
              title: 'In-house equipment',
              text: '3D printing, the latest upholstery machinery, CNC routing, wrapping machines and a dynamometer.',
            },
            {
              title: 'Restoration to transformation',
              text: 'From restorations and bespoke builds to upgrades, aesthetic modifications and complex automotive projects.',
            },
          ],
        },
        extras: [
          {
            kind: 'features',
            id: 'atelier',
            eyebrow: 'Core services',
            title: { lead: 'Inside', accent: 'the atelier' },
            lede: 'An 18,000 sq. ft. facility staffed by more than 40 specialists with the technical expertise and craftsmanship to execute any project.',
            items: [
              {
                title: 'Mechanical & electrical repairs',
                text: 'Precise diagnosis and repair of mechanical and electrical systems.',
                photo: { src: mechanicalRepairs, alt: 'Technicians working in an open engine bay' },
              },
              {
                title: 'ECU tuning & dyno testing',
                text: 'ECU programming and performance tuning, verified on 2WD and AWD dynamometers.',
                photo: { src: dynamometerTesting, alt: 'A car on a dynamometer in front of a large cooling fan' },
              },
              {
                title: 'Bodyshop & ceramic coating',
                text: 'Painting, denting and ceramic coating, finished in-house.',
                photo: { src: bodyshopSealant, alt: 'A gloved hand applying coating to a car’s bodywork' },
              },
            ],
          },
          {
            kind: 'lists',
            id: 'capabilities',
            eyebrow: 'Capabilities',
            title: { lead: 'Services &', accent: 'fabrication' },
            lists: [
              {
                title: 'Core services',
                items: [
                  'Mechanical & electrical repairs',
                  'ECU programming & performance tuning',
                  '2WD & AWD dynamometer testing',
                  'Bodyshop: painting, denting, ceramic coating',
                  'Customisation: upholstery, fiberglass, interior detailing',
                ],
              },
              {
                title: 'Advanced fabrication',
                items: [
                  'Waterjet cutting',
                  'Laser engraving',
                  '3D printing',
                  'Steel fabrication',
                  'Carpentry',
                  'Sand blasting',
                ],
              },
              {
                title: 'Why Project Upgraded',
                items: [
                  'End-to-end in-house execution',
                  'Discreet service for VVIP clients',
                  'Specialists in tuning, fabrication and restoration',
                  'Traditional craftsmanship meets modern technology',
                ],
              },
            ],
          },
        ],
      },
      realfresh: {
        meta: {
          title: 'Real Fresh — N S Lootah Group',
          description:
            'Real Fresh Wholesale Trading LLC is the food sourcing, wholesale and distribution arm of N S Lootah Group, connecting quality food and non-food products with businesses across the UAE since 2019.',
        },
        heroTitle: { lead: 'Real', accent: 'Fresh' },
        actions: [
          { label: 'Contact Real Fresh', href: '#company-contact' },
          { label: 'Visit realfreshuae.com', href: 'https://realfreshuae.com/', external: true },
        ],
        facts: [
          { label: 'Legal entity', value: 'Real Fresh Wholesale Trading LLC' },
          { label: 'Established', value: '2019, Dubai' },
          { label: 'Warehouse', value: 'Al Qusais Industrial Area 1' },
          { label: 'Markets', value: 'UAE & neighbouring countries' },
        ],
        focus: [
          'Real Fresh Wholesale Trading LLC connects quality products with businesses across the UAE through a reliable and responsive supply network. Established in Dubai in 2019, it imports, distributes and merchandises products sourced locally and from around the world.',
          'Built on the principles of quality, consistency and partnership, Real Fresh works closely with trusted suppliers to deliver dependable solutions tailored to the needs of the sector — combining market knowledge, efficient sourcing and reliable distribution so the right products reach customers with the service and consistency they expect.',
        ],
        development: {
          eyebrow: 'The company development',
          statement: {
            lead: 'Beyond distribution, Real Fresh is building',
            accent: 'lasting relationships and new opportunities.',
          },
          body: [
            'The company is focused on developing lasting business relationships and identifying new opportunities across local and international markets — growing into a broad supply platform that connects producers, products and businesses.',
            'Its vision: to become an effective and reliable supply chain manager in the industry, building customer loyalty and offering comprehensive solutions.',
          ],
          photo: {
            src: realfreshPantry,
            alt: 'Real Fresh pantry products — oils, sauces, honey and spices — on a dark shelf',
          },
        },
        portfolio: {
          title: { lead: 'Where Real Fresh', accent: 'is growing' },
          intro: 'Six priorities shaping the company’s next chapter.',
          items: [
            {
              title: 'Strategic sourcing & distribution',
              text: 'Expanding local and international sourcing networks while strengthening efficient wholesale distribution across the UAE.',
            },
            {
              title: 'Consistent quality & reliability',
              text: 'Maintaining strong standards across sourcing, product selection, handling and delivery to provide dependable supply.',
            },
            {
              title: 'Long-term partnerships',
              text: 'Developing lasting relationships with customers and suppliers through transparency, responsiveness and growth.',
            },
            {
              title: 'Supporting the Group’s F&B portfolio',
              text: 'Strengthening the Group’s food and hospitality activities through connected sourcing, supply and distribution — while developing its own brand of premium products.',
            },
            {
              title: 'Expanding market opportunities',
              text: 'Exploring new products, sourcing markets and strategic partnerships to broaden the portfolio and respond to demand.',
            },
            {
              title: 'Continued growth',
              text: 'Developing Real Fresh beyond distribution into a broad supply platform connecting producers, products and businesses.',
            },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'products',
            eyebrow: 'Products',
            title: { lead: 'What we', accent: 'supply' },
            lede: 'Real Fresh is driven by a commitment to hygienic products, high quality standards and customer responsiveness.',
            lists: [
              {
                title: 'Food products',
                items: ['Frozen chicken', 'Fish and meat', 'Mojito and squash', 'Fruit pulp', 'General food products'],
              },
              {
                title: 'Non-food products',
                items: ['General non-food products', 'Clay products'],
              },
              {
                title: 'Our strengths',
                items: [
                  'A track record built on diligence, efficiency and integrity',
                  'Global presence with established partner networks',
                  'Strong financial position',
                  'International management team',
                  'Government entity affiliations',
                ],
              },
            ],
          },
          {
            kind: 'contact',
            id: 'company-contact',
            eyebrow: 'Contact Real Fresh',
            title: { lead: 'Reach', accent: 'Real Fresh' },
            lede: 'For orders, supply and partnership enquiries, contact the Real Fresh team directly.',
            address: 'Al Mulla Warehouses, Al Qusais Industrial Area 1, Dubai',
            phone: '+971 4 358 1088',
            phoneHref: 'tel:+97143581088',
            email: 'info@realfreshuae.com',
            website: { label: 'realfreshuae.com', href: 'https://realfreshuae.com/' },
          },
        ],
      },
      ev: {
        meta: {
          title: 'N S Lootah EV Charging — N S Lootah Group',
          description:
            'N S Lootah Electric Vehicles Fast Charging Stations provides reliable, professionally managed EV charging for homes, businesses, government entities and fleets across the UAE.',
        },
        heroTitle: { lead: 'N S Lootah', accent: 'EV Charging' },
        actions: [{ label: 'Enquire about charging', href: '/contact' }],
        facts: [
          { label: 'Legal entity', value: 'N S Lootah Electric Vehicles Fast Charging Stations' },
          { label: 'Sector', value: 'Energy & mobility' },
          { label: 'Serving', value: 'Homes, businesses, government & fleets' },
          { label: 'Market', value: 'United Arab Emirates' },
        ],
        focus: [
          'N S Lootah Electric Vehicles Fast Charging Stations makes electric mobility more practical and accessible through professionally managed charging solutions. Its services support the evolving needs of individuals, businesses, government entities, transport operators and fleet owners.',
          'The company focuses on reliable and accessible charging infrastructure supported by efficient operations — ensuring charging stations are effectively managed and maintained, and giving EV users a dependable experience.',
        ],
        development: {
          eyebrow: 'The road ahead',
          statement: {
            lead: 'Supporting the UAE’s transition towards',
            accent: 'clean and sustainable transportation.',
          },
          body: [
            'The company is growing the charging network through new technologies and strategic partnerships that support the UAE’s electric mobility ecosystem — expanding the infrastructure needed for wider EV adoption.',
          ],
          photo: { src: evCar, alt: 'An electric sports car charging beside a concrete pavilion' },
        },
        portfolio: {
          title: { lead: 'Current', accent: 'portfolio' },
          intro: 'Charging infrastructure and operational solutions supporting the UAE’s growing electric mobility network.',
          items: [
            {
              title: 'Station management & maintenance',
              text: 'Managing and maintaining EV charging stations for consistent performance, accessibility and operational efficiency.',
            },
            {
              title: 'Adaptable charging solutions',
              text: 'Solutions for residential, commercial, government, transport and corporate fleet requirements.',
            },
            {
              title: 'Network growth',
              text: 'Growing the charging network through new technologies and strategic partnerships.',
            },
            {
              title: 'Infrastructure for adoption',
              text: 'Expanding the infrastructure needed for wider EV adoption and the UAE’s move to cleaner transport.',
            },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'clients',
            eyebrow: 'Who we serve',
            title: { lead: 'Charging for', accent: 'every need' },
            lists: [
              {
                title: 'Clients',
                items: [
                  'Individuals & homes',
                  'Businesses & commercial sites',
                  'Government entities',
                  'Transport operators',
                  'Fleet owners',
                ],
              },
            ],
          },
        ],
      },
      stones: {
        meta: {
          title: 'NSL Himalayan Stones — N S Lootah Group',
          description:
            'NSL Himalayan Stones Trading sources natural slate, marble and granite from the Himalayan region for architects, developers, contractors and landscape professionals across the UAE.',
        },
        heroTitle: { lead: 'NSL Himalayan', accent: 'Stones' },
        actions: [{ label: 'Enquire about stone', href: '/contact' }],
        facts: [
          { label: 'Legal entity', value: 'NSL Himalayan Stones Trading' },
          { label: 'Materials', value: 'Slate, marble & granite' },
          { label: 'Origin', value: 'The Himalayan region' },
          { label: 'Market', value: 'United Arab Emirates' },
        ],
        focus: [
          'NSL Himalayan Stones Trading sources and trades premium natural slate, marble and granite from the Himalayan region, serving architects, developers, contractors and landscape professionals with carefully selected natural stone solutions.',
          'Its range supports interior and exterior applications — including cladding, flooring, feature walls, pathways, executive showers and landscaping — with a focus on reliable sourcing, consistent quality and dependable supply across the UAE market.',
        ],
        development: {
          eyebrow: 'The company development',
          statement: {
            lead: 'Bringing the strength and natural character of the Himalayas',
            accent: 'to projects across the UAE.',
          },
          body: [
            'NSL Himalayan Stones Trading continues to develop its portfolio of distinctive natural materials, expanding its sourcing network to offer greater choice for architectural, interior and landscape projects.',
            'The company is strengthening relationships with architects, developers and contractors while building a dependable supply network defined by material quality, variety and reliable service.',
          ],
          photo: {
            src: stonesShowroom,
            alt: 'The Himalayan natural slate stone showroom, with slate-clad walls and a lounge setting',
          },
        },
        portfolio: {
          title: { lead: 'Expanding the possibilities of', accent: 'natural stone' },
          intro: 'Applications for interior, exterior and landscape projects.',
          items: [
            { title: 'Cladding', text: 'Natural slate and stone for façades and interior walls.' },
            { title: 'Flooring', text: 'Durable natural surfaces for interiors and exteriors.' },
            { title: 'Feature walls', text: 'Distinctive textures that give a space its character.' },
            { title: 'Pathways & landscaping', text: 'Stone for gardens, pathways and outdoor living.' },
            { title: 'Executive showers', text: 'Natural stone finishes for refined bathrooms.' },
            { title: 'Reliable supply', text: 'Consistent quality and dependable supply across the UAE market.' },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'clients',
            eyebrow: 'Who we serve',
            title: { lead: 'Stone for', accent: 'the professionals' },
            lists: [
              {
                title: 'Clients',
                items: ['Architects', 'Developers', 'Contractors', 'Landscape professionals'],
              },
            ],
          },
        ],
      },
    },
  },
  ar: {
    labels: {
      breadcrumb: 'مسار التنقل',
      focusEyebrow: 'الشركة',
      focusTitle: { lead: 'تركيز', accent: 'الشركة' },
      portfolioEyebrow: 'المحفظة الحالية',
      moreEyebrow: 'شركاتنا',
      moreTitle: { lead: 'المزيد من', accent: 'المجموعة' },
      address: 'العنوان',
      telephone: 'الهاتف',
      email: 'البريد الإلكتروني',
      website: 'الموقع الإلكتروني',
    },
    pages: {
      motors: {
        meta: {
          title: 'إن إس لوتاه موتورز — مجموعة إن إس لوتاه',
          description:
            'إن إس لوتاه موتورز ذراع السيارات في مجموعة إن إس لوتاه والموزع الحصري في الإمارات لدراجات SOUO النارية، صاحبة طراز S2000 وأول محرك دراجة نارية Flat-8 يُنتج تجارياً في العالم.',
        },
        heroTitle: { lead: 'إن إس لوتاه', accent: 'موتورز' },
        actions: [
          { label: 'استفسر الآن', href: '/contact' },
          { label: 'زيارة souomoto.ae', href: 'https://www.souomoto.ae/', external: true },
        ],
        facts: [
          { label: 'الكيان القانوني', value: 'إن إس لوتاه موتورز ذ.م.م' },
          { label: 'القطاع', value: 'السيارات' },
          { label: 'التوزيع', value: 'دراجات SOUO النارية، حصرياً في الإمارات' },
          { label: 'صالة العرض', value: 'دبي' },
        ],
        focus: [
          'إن إس لوتاه موتورز ذ.م.م هي ذراع السيارات في المجموعة، أُسست لتمثيل علامات تنقّل مميزة. ومع تركيزها على التنقل الفاخر والهندسة المبتكرة وتقنيات السيارات الناشئة، توفر الشركة منصة لتقديم علامات السيارات والدراجات النارية العالمية إلى السوق الإماراتي، مدعومة بمعرفة راسخة بالسوق المحلي وقدرات توزيع وخدمات تتمحور حول العملاء.',
          'والشركة حالياً الموزع الحصري في الإمارات لدراجات SOUO النارية، تقدّم هذه العلامة الفاخرة وطرازها الرائد SOUO S2000 لراكبي الدراجات في أنحاء الدولة. ويجمع طراز S2000، المزوّد بأول محرك دراجة نارية Flat-8 يُنتج تجارياً في العالم، بين التصميم المميز والتقنية المتقدمة والهندسة عالية الأداء.',
        ],
        development: {
          eyebrow: 'تطوّر الشركة',
          statement: {
            lead: 'من خلال صالة عرضها المخصصة في دبي، تقدّم إن إس لوتاه موتورز تجربة متكاملة للعملاء تشمل',
            accent: 'المبيعات وتجارب القيادة والتفاعل مع العلامة وخدمات ما بعد البيع.',
          },
          body: [
            'وتتطلع إن إس لوتاه موتورز إلى توسيع محفظتها في قطاع السيارات من خلال الشراكات الاستراتيجية وفرص التنقل الجديدة، لبناء منصة متنوعة من العلامات والمنتجات تلبي الاحتياجات المتطورة للسوق الإماراتي والأسواق الإقليمية.',
          ],
          photo: {
            src: motorsShowroom,
            alt: 'زوار في صالة عرض إن إس لوتاه موتورز في دبي بجانب دراجة نارية حمراء',
          },
        },
        portfolio: {
          title: { lead: 'المحفظة', accent: 'الحالية' },
          intro: 'المنتجات والخدمات والحضور في السوق التي تحدد عمليات الشركة الحالية في قطاع السيارات.',
          items: [
            {
              title: 'الموزع الحصري لدراجات SOUO النارية في الإمارات',
              text: 'تقديم العلامة الفاخرة وطرازها الرائد S2000 لراكبي الدراجات في أنحاء الدولة.',
            },
            {
              title: 'صالة عرض مخصصة في دبي',
              text: 'منصة مخصصة لعرض وبيع مركبات أيقونية ونادرة ذات طابع مميز وإرث عريق.',
            },
            {
              title: 'المبيعات وتجارب القيادة وخدمات ما بعد البيع',
              text: 'تجربة متكاملة للعملاء، من أول جولة وحتى الملكية طويلة الأمد.',
            },
            {
              title: 'خدمة الورشة المتنقلة',
              text: 'خدمات الصيانة والدعم تصل إلى راكب الدراجة أينما كان.',
            },
            {
              title: 'قطع الغيار والإكسسوارات والمنتجات الترويجية',
              text: 'قطع غيار أصلية وإكسسوارات للقيادة ومنتجات تحمل العلامة.',
            },
          ],
        },
        extras: [
          {
            kind: 'features',
            id: 'models',
            eyebrow: 'دراجات SOUO النارية',
            title: { lead: 'طرازات', accent: 'SOUO' },
            lede: 'يمنح محرك Flat-8 بتصميمه الأفقي المتقابل توازناً فائقاً ومركز ثقل أكثر انخفاضاً وأداءً أكثر سلاسة.',
            items: [
              {
                title: 'SOUO S2000',
                text: 'الدراجة السياحية الفاخرة الرائدة، يعمل بها أول محرك دراجة نارية Flat-8 يُنتج تجارياً في العالم.',
              },
              {
                title: 'SOUO S2000C',
                text: 'نسخة الكروزر الفاخرة من طراز S2000، بالمحرك Flat-8 ذاته في قلبها.',
              },
            ],
            action: { label: 'زيارة souomoto.ae', href: 'https://www.souomoto.ae/', external: true },
          },
        ],
      },
      trading: {
        meta: {
          title: 'إن إس إل للتجارة العامة — مجموعة إن إس لوتاه',
          description:
            'إن إس إل للتجارة العامة ذ.م.م الذراع التجارية لمجموعة إن إس لوتاه لمنتجات الرحلات والمغامرات وأسلوب الحياة الفاخرة — الموزع الحصري لسان هيما في الإمارات، مع حلول طاقة محمولة تناسب مناخ الخليج.',
        },
        heroTitle: { lead: 'إن إس إل', accent: 'للتجارة العامة' },
        actions: [{ label: 'استفسر عن المنتجات', href: '/contact' }],
        facts: [
          { label: 'الكيان القانوني', value: 'إن إس إل للتجارة العامة ذ.م.م' },
          { label: 'القطاع', value: 'الرحلات وأسلوب الحياة' },
          { label: 'التوزيع', value: 'سان هيما، حصرياً في الإمارات' },
          { label: 'الأسواق', value: 'الإمارات والمنطقة' },
        ],
        focus: [
          'إن إس إل للتجارة العامة ذ.م.م هي الذراع التجارية للمجموعة في منتجات الرحلات والمغامرات وأسلوب الحياة الفاخرة، وتركّز على تقديم علامات وحلول عالية الجودة للسوق الإماراتي والأسواق الإقليمية الأوسع.',
          'ومن خلال الشراكات الاستراتيجية واتفاقيات التوزيع الحصرية، تربط الشركة المنتجات العالمية بالسوق الإماراتي، جامعةً بين الخبرة العالمية والفهم العميق للظروف المحلية واحتياجات العملاء.',
        ],
        development: {
          eyebrow: 'استكشف بثقة',
          statement: {
            lead: 'من التخييم والرحلات البرية إلى السفر والحياة في الهواء الطلق، تقوم المحفظة على',
            accent: 'الجودة والموثوقية والحلول العملية.',
          },
          body: [
            'ومستوحاةً من تجارب حقيقية في الهواء الطلق، تواصل المجموعة نموها لتخدم الأفراد والعائلات وهواة الرحلات البرية، مدعومة بشراكات طويلة الأمد مع علامات عالمية مبتكرة.',
            'وتلتزم إن إس إل للتجارة بمنتجات تجمع بين المتانة والوظيفة والتصميم، وستواصل التوسع في فئات مكمّلة من منتجات الرحلات والمغامرات وأسلوب الحياة، معززةً مكانتها كمنصة إقليمية موثوقة للعلامات العالمية الفاخرة.',
          ],
          photo: { src: tradingHills, alt: 'مركبة طرق وعرة بخيمة سقف وسلّم بين تلال صخرية' },
        },
        portfolio: {
          title: { lead: 'المحفظة', accent: 'الحالية' },
          intro: 'معدات مختارة لاستكشاف الصحراء والجبال والسواحل في أنحاء الشرق الأوسط.',
          items: [
            {
              title: 'التوزيع الحصري لسان هيما في الإمارات',
              text: 'معدات سان هيما للرحلات والتخييم والطرق الوعرة، بتوزيع حصري في الإمارات.',
            },
            {
              title: 'معدات التخييم والسفر والمغامرات',
              text: 'مجموعة متنامية تجمع بين المتانة والوظيفة والابتكار.',
            },
            {
              title: 'مصممة للمناخات القاسية',
              text: 'منتجات عملية مختارة لتؤدي في أصعب المناخات والبيئات.',
            },
            {
              title: 'حلول الطرق الوعرة',
              text: 'خيام السقف والمظلات القائمة والإكسسوارات لاستكشاف المنطقة.',
            },
            {
              title: 'Lightbox و Powerbox',
              text: 'إضاءة وطاقة محمولة للمخيم والموقع والمركبة.',
            },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'products',
            eyebrow: 'المنتجات والحلول',
            title: { lead: 'ما', accent: 'نقدّمه' },
            lists: [
              {
                title: 'معدات الرحلات والتخييم',
                items: [
                  'معدات التخييم',
                  'خيام سقف السيارة (للدفع الرباعي)',
                  'مظلات طرق وعرة قائمة بذاتها',
                  'إكسسوارات التخييم والكرفانات',
                ],
                note: 'الموزع الحصري في الإمارات لمنتجات سان هيما للتخييم.',
              },
              {
                title: 'أنظمة الطاقة',
                items: [
                  'صناديق طاقة محمولة (1000 واط–4600 واط)',
                  'أنظمة بطاريات LiFePO4 قابلة للشحن',
                  'وحدات طاقة هجينة متوافقة مع الطاقة الشمسية',
                  'مولدات إنفرتر مدمجة صديقة للبيئة',
                  'حلول طاقة مخصصة خارج الشبكة',
                ],
              },
            ],
          },
          {
            kind: 'features',
            id: 'technology',
            eyebrow: 'تقنية Powerbox',
            title: { lead: 'طاقة تناسب', accent: 'مناخ الخليج' },
            lede: 'صناديق طاقة بتقنية LiFePO4 من 1000 واط إلى 4600 واط — بديل نظيف وهادئ ومدمج للمولدات التي تعمل بالوقود، للاستخدام في الهواء الطلق والمواقع الصناعية وخارج الشبكة.',
            items: [
              {
                title: 'ماكسي تشارج',
                text: 'سرعات شحن رائدة في السوق — من 0 إلى 100% في ساعة ونصف فقط.',
                photo: { src: maxiCharge, alt: 'محطة طاقة محمولة تُشحن من مقبس جداري' },
              },
              {
                title: 'سمارت درايف',
                text: 'تشغيل الأجهزة التي تتجاوز السعة الاسمية للوحدة بأمان وكفاءة.',
                photo: { src: smartDrive, alt: 'صندوق طاقة يشغّل مجفف شعر وميكروويف ومنشاراً دائرياً وموقد طهي' },
              },
              {
                title: 'نظام إدارة البطارية',
                text: 'مراقبة ذكية للجهد والتيار والحرارة مع خوارزميات حماية متقدمة.',
                photo: { src: batteryManagement, alt: 'رسم توضيحي لخلايا الليثيوم داخل صندوق الطاقة' },
              },
            ],
          },
          {
            kind: 'lists',
            id: 'markets',
            eyebrow: 'من نخدم',
            title: { lead: 'صُممت', accent: 'للميدان' },
            lists: [
              {
                title: 'الأسواق',
                items: [
                  'شركات البناء والمقاولات',
                  'فرق المرافق والهندسة الميدانية',
                  'وحدات الاستجابة للطوارئ',
                  'هواة التخييم والطرق الوعرة',
                  'الجهات الحكومية',
                  'منظمو الفعاليات',
                ],
              },
            ],
          },
        ],
      },
      upgraded: {
        meta: {
          title: 'بروجكت أبغريدد — مجموعة إن إس لوتاه',
          description:
            'بروجكت أبغريدد ورشة ذ.م.م الأتيليه الحصري للسيارات في مجموعة إن إس لوتاه — ترميم وتخصيص وتحسين أداء وتصنيع في منشأة بمساحة 18,000 قدم مربع.',
        },
        heroTitle: { lead: 'بروجكت', accent: 'أبغريدد' },
        actions: [{ label: 'استفسر عن مشروع', href: '/contact' }],
        facts: [
          { label: 'الكيان القانوني', value: 'بروجكت أبغريدد ورشة ذ.م.م' },
          { label: 'المنشأة', value: '18,000 قدم مربع' },
          { label: 'الفريق', value: 'أكثر من 40 متخصصاً' },
          { label: 'العملاء', value: 'عائلة لوتاه وكبار الشخصيات وعملاء بالترشيح' },
        ],
        focus: [
          'بروجكت أبغريدد ورشة ذ.م.م هي الأتيليه الحصري للسيارات في مجموعة إن إس لوتاه، تخدم عائلة لوتاه وكبار الشخصيات وقاعدة مختارة من العملاء بالترشيح. وهي أكثر من ورشة تقليدية؛ إذ تقدّم عناية مخصصة بالمركبات مع تركيز كبير على الخصوصية والجودة والخدمة الشخصية.',
          'تُعامَل كل مركبة كمشروع مستقل — من الصيانة المتخصصة والترميم إلى التخصيص وتحسين الأداء والتحويلات الكاملة. وتُدار جميع الأعمال داخلياً على يد متخصصين ذوي خبرة، بما يضمن رقابة دقيقة على الجودة والتنفيذ والسرية.',
        ],
        development: {
          eyebrow: 'فلسفة الشركة',
          statement: { lead: 'تجربة سيارات', accent: 'تتجاوز المألوف.' },
          body: [
            'تجسّد بروجكت أبغريدد سعي المجموعة إلى التميّز في عالم السيارات بأكثر صوره حصرية، جامعةً بين الخبرة المتخصصة ونهج شخصي للغاية في العناية بالمركبات.',
            'صُممت لعملاء يتوقعون مستوى خدمة يتجاوز الورشة التقليدية، فتجمع بين الهندسة المتقدمة والمعرفة المتخصصة والتعبير الفردي لتطوير كل مركبة وفق طابعها ومتطلبات مالكها.',
          ],
          photo: { src: upgradedEngine, alt: 'حجرة محرك بتفاصيلها بالأبيض والأسود' },
        },
        portfolio: {
          title: { lead: 'المحفظة', accent: 'الحالية' },
          intro: 'خدمات سيارات متخصصة قوامها الدقة والخصوصية والمتطلبات الفردية لكل مركبة.',
          items: [
            { title: 'عناية مخصصة', text: 'اهتمام فردي وخبرة متخصصة مصممة لكل مركبة ومالكها.' },
            {
              title: 'تنفيذ داخلي شامل',
              text: 'تُدار المشاريع من التقييم والتصميم مروراً بالتصنيع والتشطيب وحتى التسليم النهائي.',
            },
            {
              title: 'خصوصية بالتصميم',
              text: 'خدمة شخصية مع السرية والتعامل الموثوق مع المركبة طوال كل مشروع.',
            },
            {
              title: 'حرفية تلتقي بالهندسة',
              text: 'تقنيات سيارات متخصصة تتكامل مع التشخيص المتقدم والمعدات والهندسة الحديثة.',
            },
            {
              title: 'معدات داخلية',
              text: 'طباعة ثلاثية الأبعاد وأحدث آلات التنجيد وماكينات CNC والتغليف وجهاز ديناموميتر.',
            },
            {
              title: 'من الترميم إلى التحويل الكامل',
              text: 'من الترميم وبناء النماذج المخصصة إلى التحسينات والتعديلات الجمالية ومشاريع السيارات المعقدة.',
            },
          ],
        },
        extras: [
          {
            kind: 'features',
            id: 'atelier',
            eyebrow: 'الخدمات الأساسية',
            title: { lead: 'داخل', accent: 'الأتيليه' },
            lede: 'منشأة بمساحة 18,000 قدم مربع يعمل بها أكثر من 40 متخصصاً بالخبرة التقنية والحرفية اللازمة لتنفيذ أي مشروع.',
            items: [
              {
                title: 'إصلاحات ميكانيكية وكهربائية',
                text: 'تشخيص وإصلاح دقيق للأنظمة الميكانيكية والكهربائية.',
                photo: { src: mechanicalRepairs, alt: 'فنيون يعملون في حجرة محرك مفتوحة' },
              },
              {
                title: 'برمجة ECU واختبار الديناموميتر',
                text: 'برمجة وحدة التحكم وضبط الأداء، مع التحقق على أجهزة ديناموميتر 2WD و AWD.',
                photo: { src: dynamometerTesting, alt: 'سيارة على جهاز ديناموميتر أمام مروحة تبريد كبيرة' },
              },
              {
                title: 'السمكرة وطلاء السيراميك',
                text: 'الدهان والسمكرة وطلاء السيراميك، بتنفيذ داخلي.',
                photo: { src: bodyshopSealant, alt: 'يد بقفاز تضع طبقة حماية على هيكل سيارة' },
              },
            ],
          },
          {
            kind: 'lists',
            id: 'capabilities',
            eyebrow: 'القدرات',
            title: { lead: 'الخدمات', accent: 'والتصنيع' },
            lists: [
              {
                title: 'الخدمات الأساسية',
                items: [
                  'إصلاحات ميكانيكية وكهربائية',
                  'برمجة ECU وضبط الأداء',
                  'اختبار الديناموميتر 2WD و AWD',
                  'ورشة السمكرة: دهان، سمكرة، طلاء سيراميك',
                  'التخصيص: تنجيد، فايبرجلاس، تفصيل داخلي',
                ],
              },
              {
                title: 'التصنيع المتقدم',
                items: [
                  'القطع بالماء',
                  'النقش بالليزر',
                  'الطباعة ثلاثية الأبعاد',
                  'تصنيع الحديد',
                  'النجارة',
                  'السفع الرملي',
                ],
              },
              {
                title: 'لماذا بروجكت أبغريدد',
                items: [
                  'تنفيذ شامل داخلي من البداية إلى النهاية',
                  'خدمة متكتمة لكبار الشخصيات',
                  'تخصص في الضبط والتصنيع والترميم',
                  'حرفية تقليدية تلتقي بالتكنولوجيا الحديثة',
                ],
              },
            ],
          },
        ],
      },
      realfresh: {
        meta: {
          title: 'ريل فريش — مجموعة إن إس لوتاه',
          description:
            'ريل فريش للتجارة بالجملة ذ.م.م ذراع توريد الأغذية وتجارتها بالجملة وتوزيعها في مجموعة إن إس لوتاه، تربط منتجات غذائية وغير غذائية عالية الجودة بالشركات في أنحاء الإمارات منذ 2019.',
        },
        heroTitle: { lead: 'ريل', accent: 'فريش' },
        actions: [
          { label: 'تواصل مع ريل فريش', href: '#company-contact' },
          { label: 'زيارة realfreshuae.com', href: 'https://realfreshuae.com/', external: true },
        ],
        facts: [
          { label: 'الكيان القانوني', value: 'ريل فريش للتجارة بالجملة ذ.م.م' },
          { label: 'التأسيس', value: '2019، دبي' },
          { label: 'المستودع', value: 'المنطقة الصناعية 1 بالقصيص' },
          { label: 'الأسواق', value: 'الإمارات والدول المجاورة' },
        ],
        focus: [
          'تربط ريل فريش للتجارة بالجملة ذ.م.م المنتجات عالية الجودة بالشركات في أنحاء الإمارات عبر شبكة إمداد موثوقة وسريعة الاستجابة. تأسست في دبي عام 2019، وتستورد وتوزع وتسوّق منتجات من مصادر محلية ومن مختلف أنحاء العالم.',
          'وانطلاقاً من مبادئ الجودة والاتساق والشراكة، تعمل ريل فريش عن قرب مع موردين موثوقين لتقديم حلول يُعتمد عليها تلائم احتياجات القطاع، جامعةً بين المعرفة بالسوق والتوريد الفعّال والتوزيع الموثوق، لتصل المنتجات المناسبة إلى العملاء بالخدمة والاتساق اللذين يتوقعونهما.',
        ],
        development: {
          eyebrow: 'تطوّر الشركة',
          statement: {
            lead: 'إلى جانب التوزيع، تبني ريل فريش',
            accent: 'علاقات دائمة وفرصاً جديدة.',
          },
          body: [
            'تركّز الشركة على تطوير علاقات عمل دائمة واكتشاف فرص جديدة في الأسواق المحلية والدولية، لتنمو وتصبح منصة إمداد واسعة تربط المنتجين بالمنتجات والشركات.',
            'ورؤيتها أن تصبح مديراً فعّالاً وموثوقاً لسلاسل الإمداد في القطاع، يبني ولاء العملاء ويقدّم حلولاً شاملة.',
          ],
          photo: {
            src: realfreshPantry,
            alt: 'منتجات ريل فريش للمؤن — زيوت وصلصات وعسل وتوابل — على رف داكن',
          },
        },
        portfolio: {
          title: { lead: 'مجالات', accent: 'النمو' },
          intro: 'ست أولويات ترسم المرحلة المقبلة للشركة.',
          items: [
            {
              title: 'التوريد والتوزيع الاستراتيجي',
              text: 'توسيع شبكات التوريد المحلية والدولية مع تعزيز كفاءة التوزيع بالجملة في أنحاء الإمارات.',
            },
            {
              title: 'جودة ثابتة وموثوقية',
              text: 'الحفاظ على معايير عالية في التوريد واختيار المنتجات والتداول والتسليم لضمان إمداد يُعتمد عليه.',
            },
            {
              title: 'شراكات طويلة الأمد',
              text: 'بناء علاقات دائمة مع العملاء والموردين قوامها الشفافية وسرعة الاستجابة والنمو.',
            },
            {
              title: 'دعم محفظة المجموعة في الأغذية والمشروبات',
              text: 'تعزيز أنشطة المجموعة في الأغذية والضيافة عبر توريد وإمداد وتوزيع مترابط، مع تطوير علامتها الخاصة من المنتجات الفاخرة.',
            },
            {
              title: 'توسيع فرص السوق',
              text: 'استكشاف منتجات وأسواق توريد وشراكات استراتيجية جديدة لتوسيع المحفظة وتلبية الطلب.',
            },
            {
              title: 'نمو مستمر',
              text: 'تطوير ريل فريش لتتجاوز التوزيع وتصبح منصة إمداد واسعة تربط المنتجين بالمنتجات والشركات.',
            },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'products',
            eyebrow: 'المنتجات',
            title: { lead: 'ما', accent: 'نورّده' },
            lede: 'تلتزم ريل فريش بتقديم منتجات صحية ومعايير جودة عالية واستجابة سريعة للعملاء.',
            lists: [
              {
                title: 'منتجات غذائية',
                items: ['دجاج مجمد', 'أسماك ولحوم', 'موهيتو وسكواش', 'لب الفواكه', 'منتجات غذائية عامة'],
              },
              {
                title: 'منتجات غير غذائية',
                items: ['منتجات عامة غير غذائية', 'منتجات فخارية'],
              },
              {
                title: 'نقاط قوتنا',
                items: [
                  'سجل حافل مبني على الاجتهاد والكفاءة والنزاهة',
                  'حضور عالمي مع شبكات شركاء راسخة',
                  'مركز مالي قوي',
                  'فريق إدارة دولي',
                  'ارتباطات مع جهات حكومية',
                ],
              },
            ],
          },
          {
            kind: 'contact',
            id: 'company-contact',
            eyebrow: 'تواصل مع ريل فريش',
            title: { lead: 'تواصل مع', accent: 'ريل فريش' },
            lede: 'للطلبات والتوريد واستفسارات الشراكة، تواصل مباشرة مع فريق ريل فريش.',
            address: 'مستودعات الملا، المنطقة الصناعية 1 بالقصيص، دبي',
            phone: '+971 4 358 1088',
            phoneHref: 'tel:+97143581088',
            email: 'info@realfreshuae.com',
            website: { label: 'realfreshuae.com', href: 'https://realfreshuae.com/' },
          },
        ],
      },
      ev: {
        meta: {
          title: 'إن إس لوتاه لشحن المركبات الكهربائية — مجموعة إن إس لوتاه',
          description:
            'إن إس لوتاه لمحطات الشحن السريع للمركبات الكهربائية توفر شحناً موثوقاً يُدار باحترافية للمنازل والشركات والجهات الحكومية والأساطيل في أنحاء الإمارات.',
        },
        heroTitle: { lead: 'إن إس لوتاه', accent: 'لشحن المركبات الكهربائية' },
        actions: [{ label: 'استفسر عن حلول الشحن', href: '/contact' }],
        facts: [
          { label: 'الكيان القانوني', value: 'إن إس لوتاه لمحطات الشحن السريع للمركبات الكهربائية' },
          { label: 'القطاع', value: 'الطاقة والتنقل' },
          { label: 'نخدم', value: 'المنازل والشركات والجهات الحكومية والأساطيل' },
          { label: 'السوق', value: 'الإمارات العربية المتحدة' },
        ],
        focus: [
          'تجعل إن إس لوتاه لمحطات الشحن السريع للمركبات الكهربائية التنقلَ الكهربائي أكثر عملية وسهولة من خلال حلول شحن تُدار باحترافية، وتلبي خدماتها الاحتياجات المتطورة للأفراد والشركات والجهات الحكومية ومشغلي النقل وأصحاب الأساطيل.',
          'وتركّز الشركة على بنية تحتية للشحن موثوقة وسهلة الوصول مدعومة بعمليات تشغيل فعّالة، بما يضمن إدارة محطات الشحن وصيانتها بكفاءة ويمنح مستخدمي المركبات الكهربائية تجربة يُعتمد عليها.',
        ],
        development: {
          eyebrow: 'الطريق إلى الأمام',
          statement: { lead: 'دعم تحوّل دولة الإمارات نحو', accent: 'نقل نظيف ومستدام.' },
          body: [
            'تعمل الشركة على توسيع شبكة الشحن من خلال تقنيات جديدة وشراكات استراتيجية تدعم منظومة التنقل الكهربائي في دولة الإمارات، وتطوير البنية التحتية اللازمة لانتشار أوسع للمركبات الكهربائية.',
          ],
          photo: { src: evCar, alt: 'سيارة رياضية كهربائية تُشحن بجانب جناح خرساني' },
        },
        portfolio: {
          title: { lead: 'المحفظة', accent: 'الحالية' },
          intro: 'بنية تحتية للشحن وحلول تشغيلية تدعم شبكة التنقل الكهربائي المتنامية في دولة الإمارات.',
          items: [
            {
              title: 'إدارة المحطات وصيانتها',
              text: 'إدارة محطات شحن المركبات الكهربائية وصيانتها لضمان أداء ثابت وسهولة وصول وكفاءة تشغيلية.',
            },
            {
              title: 'حلول شحن مرنة',
              text: 'حلول تلائم متطلبات المنازل والقطاع التجاري والجهات الحكومية والنقل وأساطيل الشركات.',
            },
            {
              title: 'توسيع الشبكة',
              text: 'تنمية شبكة الشحن من خلال تقنيات جديدة وشراكات استراتيجية.',
            },
            {
              title: 'بنية تحتية للانتشار',
              text: 'توسيع البنية التحتية اللازمة لانتشار أوسع للمركبات الكهربائية وتحوّل الدولة نحو نقل أنظف.',
            },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'clients',
            eyebrow: 'من نخدم',
            title: { lead: 'شحن يلبّي', accent: 'كل الاحتياجات' },
            lists: [
              {
                title: 'العملاء',
                items: [
                  'الأفراد والمنازل',
                  'الشركات والمواقع التجارية',
                  'الجهات الحكومية',
                  'مشغلو النقل',
                  'أصحاب الأساطيل',
                ],
              },
            ],
          },
        ],
      },
      stones: {
        meta: {
          title: 'إن إس إل لأحجار الهيمالايا — مجموعة إن إس لوتاه',
          description:
            'إن إس إل لتجارة أحجار الهيمالايا توفر أحجار الأردواز والرخام والجرانيت الطبيعية من منطقة الهيمالايا للمعماريين والمطورين والمقاولين ومختصي تنسيق المواقع في أنحاء الإمارات.',
        },
        heroTitle: { lead: 'إن إس إل', accent: 'لأحجار الهيمالايا' },
        actions: [{ label: 'استفسر عن الأحجار', href: '/contact' }],
        facts: [
          { label: 'الكيان القانوني', value: 'إن إس إل لتجارة أحجار الهيمالايا' },
          { label: 'المواد', value: 'الأردواز والرخام والجرانيت' },
          { label: 'المصدر', value: 'منطقة الهيمالايا' },
          { label: 'السوق', value: 'الإمارات العربية المتحدة' },
        ],
        focus: [
          'تعمل إن إس إل لتجارة أحجار الهيمالايا على توريد أحجار الأردواز والرخام والجرانيت الطبيعية الفاخرة من منطقة الهيمالايا والاتجار بها، وتخدم المعماريين والمطورين والمقاولين ومختصي تنسيق المواقع بحلول من الأحجار الطبيعية المنتقاة بعناية.',
          'وتشمل تطبيقاتها المساحات الداخلية والخارجية — من التكسيات والأرضيات والجدران المميزة إلى الممرات والدُّشات الفاخرة وتنسيق الحدائق — مع تركيز على التوريد الموثوق والجودة الثابتة والإمداد الذي يُعتمد عليه في السوق الإماراتي.',
        ],
        development: {
          eyebrow: 'تطوّر الشركة',
          statement: {
            lead: 'نقدّم صلابة الهيمالايا وطابعها الطبيعي',
            accent: 'لمشاريع في أنحاء الإمارات.',
          },
          body: [
            'تواصل الشركة تطوير محفظتها من المواد الطبيعية المميزة، وتوسيع شبكة توريدها لتقدّم خيارات أوسع للمشاريع المعمارية والداخلية ومشاريع تنسيق المواقع.',
            'كما تعزز علاقاتها مع المعماريين والمطورين والمقاولين، وتبني شبكة إمداد يُعتمد عليها قوامها جودة المواد وتنوعها وموثوقية الخدمة.',
          ],
          photo: {
            src: stonesShowroom,
            alt: 'صالة عرض أحجار الأردواز الطبيعية من الهيمالايا بجدران مكسوة بالأردواز وجلسة استرخاء',
          },
        },
        portfolio: {
          title: { lead: 'آفاق أوسع', accent: 'للحجر الطبيعي' },
          intro: 'تطبيقات للمشاريع الداخلية والخارجية ومشاريع تنسيق المواقع.',
          items: [
            { title: 'التكسيات', text: 'أردواز وحجر طبيعي للواجهات والجدران الداخلية.' },
            { title: 'الأرضيات', text: 'أسطح طبيعية متينة للمساحات الداخلية والخارجية.' },
            { title: 'الجدران المميزة', text: 'ملامس فريدة تمنح المكان طابعه.' },
            { title: 'الممرات وتنسيق الحدائق', text: 'أحجار للحدائق والممرات والمساحات الخارجية.' },
            { title: 'الدُّشات الفاخرة', text: 'تشطيبات من الحجر الطبيعي لحمامات راقية.' },
            { title: 'إمداد موثوق', text: 'جودة ثابتة وإمداد يُعتمد عليه في أنحاء السوق الإماراتي.' },
          ],
        },
        extras: [
          {
            kind: 'lists',
            id: 'clients',
            eyebrow: 'من نخدم',
            title: { lead: 'أحجار', accent: 'للمحترفين' },
            lists: [
              {
                title: 'العملاء',
                items: ['المعماريون', 'المطورون', 'المقاولون', 'مختصو تنسيق المواقع'],
              },
            ],
          },
        ],
      },
    },
  },
};
