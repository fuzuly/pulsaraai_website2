import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import SEO from '../SEO';

/* ─── Animation variants (matches Products.jsx) ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Feature icons (inline SVG, matches existing PulsaraIntel icons) ─── */
const FeatureIcons = [
  <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
  </svg>,
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
];

/* ─── Pain point warning icon ─── */
const WarnIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/* ─── Related guides (static, filtered by current pathname) ─── */
const RELATED_GUIDES = [
  {
    emoji: '☕',
    tr: { name: 'Kahve Zincirleri Rakip Takibi', desc: 'Fiyat savaşlarına hazır olun, yorum körleşmesini bitirin.' },
    en: { name: 'Coffee Chain Competitor Monitoring', desc: 'Be ready for price wars, end review blindness.' },
    href: '/tr/rakip-takip/kahve-zincirleri',
  },
  {
    emoji: '🍽️',
    tr: { name: 'Restoran Rakip Takibi', desc: 'Rakip restoran hamlelerini anlık izleyin.' },
    en: { name: 'Restaurant Competitor Monitoring', desc: 'Monitor competitor restaurant moves in real time.' },
    href: '/tr/rakip-takip/restoranlar',
  },
  {
    emoji: '🍔',
    tr: { name: 'Fast Food Rakip Takibi', desc: 'Kampanya ve fiyat değişimlerinde öne geçin.' },
    en: { name: 'Fast Food Competitor Monitoring', desc: 'Stay ahead of campaign and price changes.' },
    href: '/tr/rakip-takip/fast-food-restoranlar',
  },
  {
    emoji: '📍',
    tr: { name: 'Google Haritalar — Restoranlar', desc: 'Google Maps sıralamasını rakiplerinizden önce analiz edin.' },
    en: { name: 'Google Maps — Restaurants', desc: 'Analyze Google Maps rankings before your competitors.' },
    href: '/tr/google-haritalar-izleme/restoranlar',
  },
  {
    emoji: '☕',
    tr: { name: 'Google Haritalar — Kahve Dükkanları', desc: 'Kahve dükkanı keşfedilebilirliğini artırın.' },
    en: { name: 'Google Maps — Coffee Shops', desc: 'Improve coffee shop discoverability.' },
    href: '/tr/google-haritalar-izleme/kahve-dukkanlari',
  },
  {
    emoji: '🏙️',
    tr: { name: 'İstanbul Kahve Zinciri Analizi', desc: "İstanbul'da kahve zinciri rekabetini analiz edin." },
    en: { name: 'Istanbul Coffee Chain Analysis', desc: 'Analyze coffee chain competition in Istanbul.' },
    href: '/tr/istanbul/kahve-zinciri-rakip-analizi',
  },
];

/* ─── Check icon for features ─── */
const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/* ════════════════════════════════════════════════════════════
   MAIN TEMPLATE
   Receives a `data` prop with shape:
   { breadcrumb: { cat, catUrl, page }, tr: {...}, en: {...} }
════════════════════════════════════════════════════════════ */
const TurkishLandingPage = ({ data }) => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const c = data[language] || data.tr;
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-white">
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        breadcrumbData={data.breadcrumb}
      />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
            >
              {c.hero.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl"
            >
              {c.hero.subheadline}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a
                href="/pulsara-intel#pilot-form"
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
              >
                {c.hero.cta1}
              </a>
              <Link
                to="/pulsara-intel"
                className="px-8 py-3.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg text-center hover:border-purple-500 hover:text-purple-700 transition-all duration-300"
              >
                {c.hero.cta2}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. PAIN POINTS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-14"
            >
              {c.painPoints.headline}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {c.painPoints.items.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-red-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                    <WarnIcon />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. SOLUTION / HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-16"
            >
              {c.solution.headline}
            </motion.h2>

            <div className="relative max-w-5xl mx-auto">
              {/* Connector line (desktop) */}
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-blue-300" />

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {c.solution.steps.map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
                      <span className="text-white font-extrabold text-xl">{step.n}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. FEATURES GRID
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-14"
            >
              {c.features.headline}
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {c.features.items.map((feat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    {FeatureIcons[i]}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. FAQ ACCORDION
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12"
            >
              {c.faq.headline}
            </motion.h2>
            <motion.div variants={stagger} className="space-y-3">
              {c.faq.items.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 pr-4 text-sm">{item.q}</span>
                    <svg
                      className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {item.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. RELATED GUIDES
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10"
            >
              {language === 'tr' ? 'İlgili Rehberler' : 'Related Guides'}
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            >
              {RELATED_GUIDES.filter(g => g.href !== pathname).map((guide, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Link
                    to={guide.href}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 group bg-white block"
                  >
                    <span className="text-2xl mt-0.5 flex-shrink-0">{guide.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
                        {language === 'tr' ? guide.tr.name : guide.en.name}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {language === 'tr' ? guide.tr.desc : guide.en.desc}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-purple-500 flex-shrink-0 mt-1 ml-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FOOTER CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-purple-600 to-blue-700">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="container mx-auto px-4 sm:px-6 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {c.footerCta.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-purple-200 text-lg mb-8 max-w-xl mx-auto">
            {c.footerCta.sub}
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="/pulsara-intel#pilot-form"
              className="inline-block px-10 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300 text-base"
            >
              {c.footerCta.btn}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default TurkishLandingPage;
