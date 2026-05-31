import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

/* ─── Icons ─── */
const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Bilingual content ─── */
const content = {
  tr: {
    seo: {
      title: 'Pulsara Ürünleri , Kurumsal AI Platformları',
      description: 'Wellbeing, işgücü planlama ve veri analitiği için kurumsal yapay zeka platformları.',
    },
    eyebrow: 'Ürünlerimiz',
    heading: 'Ürünlerimiz',
    subtitle: 'İşletmenizin her katmanı için kurumsal yapay zeka çözümleri',
    cta: {
      heading: 'Hangi ürün işinize yarar?',
      sub: 'Ekibimiz, ihtiyaçlarınızı dinleyip size en uygun platformu önerir , ücretsiz.',
      btn: 'Uzmanla Konuşun',
    },
    learnMore: 'Daha Fazla Bilgi',
    products: [
      {
        badge: 'Wellbeing',
        badgeColor: 'bg-purple-100 text-purple-700',
        name: 'Pulsara Wellbeing',
        tagline: 'Ekip sağlığınızı veriye dönüştürün',
        taglineColor: 'text-violet-600',
        description: 'Tükenmişlik riskini haftalarca önce tespit eden, anonim nabız anketleri ve AI destekli içgörülerle yöneticilere aksiyon önerileri sunan kurumsal wellbeing platformu.',
        features: [
          'Ruh hali takibi & tükenmişlik riski tespiti',
          'Anonim nabız anketleri ve içgörüler',
          'Yönetici paneli ile aksiyon önerileri',
          'Şirket geneli wellbeing raporlama',
        ],
        prominent: false,
      },
      {
        badge: 'İşgücü Planlama',
        badgeColor: 'bg-blue-100 text-blue-700',
        name: 'Pulsara Roster',
        tagline: 'Vardiya planlamanızı otomatikleştirin',
        taglineColor: 'text-blue-600',
        description: '7/24 operasyonlar için akıllı vardiya planlama. İşgücü yükünü dengeleyin, kısıtlamalara saygı gösterin ve minimum manuel işle her vardiyayı kapsayın.',
        features: [
          'Akıllı vardiya planlama ve otomatik zamanlama',
          'Yetenek, sözleşme ve uyumluluk bilinçli vardiyalar',
          'Gerçek zamanlı kapsama ve fazla mesai görünürlüğü',
          'İK ve zaman takip araçları ile entegrasyonlar',
        ],
        prominent: false,
      },
      {
        badge: 'Veri & Analitik',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        name: 'Pulsara Intelligence',
        tagline: 'Ham veriden iş kararına',
        taglineColor: 'text-indigo-600',
        description: 'Dağınık veri kaynaklarını birleştiren, gerçek zamanlı analitik paneller ve AI destekli raporlama ile kurumsal karar alma süreçlerini hızlandıran veri zekası platformu.',
        features: [
          'Uçtan uca rakip analizi',
          'Fiyat analizi, sosyal medya analizi, haber analizi, web sitesi analizi',
          'AI destekli anomali tespiti ve tahminleme',
          'Özelleştirilebilir KPI takip panelleri',
        ],
        prominent: false,
      },
    ],
  },
  en: {
    seo: {
      title: 'Pulsara Products , Enterprise AI Platforms',
      description: 'Enterprise AI platforms for wellbeing, workforce planning, and data analytics. Built for scale.',
    },
    eyebrow: 'Our Products',
    heading: 'Our Products',
    subtitle: 'Enterprise AI solutions for every layer of your business',
    cta: {
      heading: 'Not sure which product fits?',
      sub: 'Our team will listen to your needs and recommend the right platform , for free.',
      btn: 'Talk to an Expert',
    },
    learnMore: 'Learn More',
    products: [
      {
        badge: 'Wellbeing',
        badgeColor: 'bg-purple-100 text-purple-700',
        name: 'Pulsara Wellbeing',
        tagline: 'Turn team health into data',
        taglineColor: 'text-violet-600',
        description: 'An enterprise wellbeing platform that detects burnout risk weeks in advance, using anonymous pulse surveys and AI-powered insights to deliver actionable recommendations to managers.',
        features: [
          'Mood tracking & burnout risk detection',
          'Anonymous pulse surveys and insights',
          'Manager dashboard with action recommendations',
          'Company-wide wellbeing reporting',
        ],
        prominent: false,
      },
      {
        badge: 'Workforce Planning',
        badgeColor: 'bg-blue-100 text-blue-700',
        name: 'Pulsara Roster',
        tagline: 'Automate your shift planning',
        taglineColor: 'text-blue-600',
        description: 'Intelligent shift planning for 24/7 operations. Balance workforce load, respect constraints, and keep every shift covered with minimal manual work.',
        features: [
          'Smart shift planning and automatic scheduling',
          'Skill, contract, and compliance-aware shifts',
          'Real-time coverage and overtime visibility',
          'Integrations with HR and time-tracking tools',
        ],
        prominent: false,
      },
      {
        badge: 'Data & Analytics',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        name: 'Pulsara Intelligence',
        tagline: 'From raw data to business decisions',
        taglineColor: 'text-indigo-600',
        description: 'A data intelligence platform that consolidates scattered data sources, accelerating enterprise decision-making with real-time analytics dashboards and AI-powered reporting.',
        features: [
          'End-to-end competitor analysis',
          'Price analysis, social media analysis, news analysis, website analysis',
          'AI-powered anomaly detection and forecasting',
          'Customizable KPI tracking panels',
        ],
        prominent: false,
      },
    ],
  },
};

/* ─── Product Card ─── */
const ProductCard = ({ badge, badgeColor, name, tagline, taglineColor, description, features, prominent, learnMore }) => (
  <motion.div
    variants={fadeUp}
    className={`flex flex-col bg-white rounded-2xl border overflow-hidden transition-shadow duration-300 hover:shadow-xl ${prominent
      ? 'border-teal-200 hover:shadow-teal-100/60 shadow-md'
      : 'border-gray-200 hover:shadow-purple-100/60'
      }`}
  >
    {/* Top accent bar */}
    <div className={`h-1 w-full ${prominent ? 'bg-gradient-to-r from-teal-400 to-cyan-500' : 'bg-gradient-to-r from-violet-600 to-purple-500'}`} />

    <div className="flex flex-col flex-1 p-6 sm:p-8">
      {/* Badge */}
      <div className="mb-5">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${badgeColor}`}>
          {badge}
        </span>
      </div>

      {/* Name & Tagline */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">{name}</h3>
      <p className={`text-sm font-semibold mb-4 ${taglineColor}`}>{tagline}</p>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">{description}</p>

      {/* Features */}
      <ul className="space-y-2.5 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className={`flex items-start gap-2.5 text-sm text-gray-700 ${prominent ? '[&>svg]:text-teal-500' : '[&>svg]:text-violet-500'}`}>
            <CheckIcon />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${prominent
          ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-600 hover:text-white hover:border-teal-600'
          : 'bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-600 hover:text-white hover:border-violet-600'
          }`}
      >
        {learnMore}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  </motion.div>
);

/* ─── Category Header ─── */
/* ─── Main Page ─── */
const Products = () => {
  const { language } = useLanguage();
  const c = content[language === 'tr' ? 'tr' : 'en'];

  return (
    <div className="bg-white min-h-screen">
      <SEO title={c.seo.title} description={c.seo.description} />

      {/* ── Page Header ── */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold tracking-widest uppercase">
              {c.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug mb-4">
              {c.heading}
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {c.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {c.products.map((product, i) => (
              <ProductCard key={i} {...product} learnMore={c.learnMore} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 max-w-3xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {c.cta.heading}
          </h2>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            {c.cta.sub}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 text-white font-semibold rounded-xl shadow-lg hover:bg-violet-700 hover:shadow-violet-300/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            {c.cta.btn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Products;
