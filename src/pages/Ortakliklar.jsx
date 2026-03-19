import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

/* ─────────────────────────────────────────────────────────────────────────────
   FRAMER MOTION VARIANTS
───────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});
const slideLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const slideRight = { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

/* ─────────────────────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────────────────────── */
const Icon = ({ d, size = 'w-6 h-6' }) => (
  <svg className={size} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const icons = {
  brain:   'M9.663 17h4.673M12 3a9 9 0 100 18 9 9 0 000-18zm0 0v4m0 8h.01',
  cloud:   'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  shield:  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  bolt:    'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  currency:'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  support: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  check:   'M5 13l4 4L19 7',
};

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const gcpPills = ['Vertex AI', 'BigQuery', 'Cloud Run', 'GKE', 'Looker', 'Gemini'];
const openaiPills = ['GPT-4o', 'o1', 'Assistants API', 'Fine-tuning', 'DALL·E', 'Embeddings'];

const combinedBenefits = [
  { icon: 'brain',    title: 'En İleri AI Modelleri',    desc: 'GPT-4o ve Gemini\'ye doğrudan kurumsal erişim ile rakiplerinizin önüne geçin.' },
  { icon: 'cloud',    title: 'Küresel Bulut Altyapısı',  desc: "Google'ın dünya genelindeki veri merkezleri ile düşük gecikme ve yüksek erişilebilirlik." },
  { icon: 'shield',   title: 'Kurumsal Güvenlik',        desc: 'SOC2, GDPR ve KVKK uyumlu deployment ile verileriniz her zaman güvende.' },
  { icon: 'bolt',     title: 'Hızlı Entegrasyon',        desc: "8 haftada production'a çıkma garantisi — sertifikalı ekibimizle hızlı sonuç alın." },
  { icon: 'currency', title: 'Maliyet Avantajı',         desc: 'Partner kredileri ve özel fiyatlandırma ile bütçenizi verimli kullanın.' },
  { icon: 'support',  title: 'Öncelikli Destek',         desc: 'Her iki platformdan doğrudan teknik destek hattı ile kesintisiz operasyon.' },
];

const stats = [
  { target: 80, suffix: '+', label: 'Tamamlanan Proje' },
  { target: 2,  suffix: '',  label: 'Resmi Teknoloji Ortaklığı' },
  { target: 8,  suffix: 'hf', label: 'Ortalama Yayına Alma' },
  { target: 3,  suffix: 'x', label: 'Verimlilik Artışı' },
];

const steps = [
  { num: '01', title: 'Keşif Görüşmesi',              desc: 'İş hedeflerinizi ve teknik ihtiyaçlarınızı analiz ediyoruz.' },
  { num: '02', title: 'Çözüm Tasarımı',               desc: 'Size özel mimari ve entegrasyon planı oluşturuyoruz.' },
  { num: '03', title: 'Google & OpenAI Entegrasyonu', desc: 'Resmi partner erişimimizle modelleri ve altyapıyı kuruyoruz.' },
  { num: '04', title: 'Test & Optimizasyon',          desc: 'Performans, güvenlik ve maliyet testlerini tamamlıyoruz.' },
  { num: '05', title: 'Yayına Alma',                  desc: 'Çözümü production ortamına taşıyıp izlemeye alıyoruz.' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

// Google Cloud 4-color logo
const GCPLogo = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 9.6c3.9 0 7.4 1.4 10.2 3.6l7.2-7.2C37.2 2.2 30.9 0 24 0 14.6 0 6.5 5.2 2.4 12.8l8.4 6.5C12.8 13.2 17.9 9.6 24 9.6z" fill="#EA4335"/>
    <path d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.2 5.6c4.2-3.9 6.6-9.6 7.1-16.5z" fill="#4285F4"/>
    <path d="M10.9 28.7A14.4 14.4 0 019.6 24c0-1.6.3-3.2.8-4.7L2 12.8A23.9 23.9 0 000 24c0 3.9.9 7.5 2.4 10.8l8.5-6.1z" fill="#FBBC05"/>
    <path d="M24 48c6.5 0 12-2.1 16-5.7l-7.2-5.6c-2.2 1.5-5 2.3-8.8 2.3-6.1 0-11.2-3.6-13.2-9.3l-8.5 6.1C6.5 42.8 14.6 48 24 48z" fill="#34A853"/>
  </svg>
);

// OpenAI logo mark
const OpenAILogo = () => (
  <svg viewBox="0 0 41 41" className="w-9 h-9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835 9.964 9.964 0 00-7.505-3.346 10.079 10.079 0 00-9.612 6.977 9.967 9.967 0 00-6.664 4.834 10.08 10.08 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 007.504 3.346 10.078 10.078 0 009.617-6.981 9.967 9.967 0 006.663-4.834 10.079 10.079 0 00-1.243-11.814zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103l-8.051 4.649a7.504 7.504 0 01-10.24-2.744zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.012L7.044 23.86a7.504 7.504 0 01-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.114-.012l8.048 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.05-4.645a7.497 7.497 0 0111.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5V18z"/>
  </svg>
);

function StatItem({ target, suffix, label, active }) {
  const val = useCountUp(target, 1600, active);
  return (
    <div className="text-center">
      <p className="text-5xl md:text-6xl font-extrabold text-white tabular-nums leading-none">
        {val}{suffix}
      </p>
      <p className="mt-2 text-sm md:text-base text-purple-300 font-medium">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function Ortakliklar() {
  const [statsRef, statsInView] = useInView(0.3);

  const scrollToPartners = () => {
    document.getElementById('partners-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white overflow-x-hidden">
      <SEO
        title="Teknoloji Ortaklıkları — Pulsara | Google Cloud & OpenAI"
        description="Pulsara, Google Cloud ve OpenAI'ın resmi ortağı olarak işletmenize en ileri yapay zeka ve bulut çözümlerini sunar."
      />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07071A]">

        {/* Animated blob background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
          {/* Stars */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                width: `${Math.random() > 0.8 ? 2 : 1}px`,
                height: `${Math.random() > 0.8 ? 2 : 1}px`,
              }}
            />
          ))}
          {/* grain */}
          <div className="absolute inset-0 opacity-[0.035]"
            style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'256px 256px'}}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-32 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <span className="partner-badge inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Resmi Teknoloji Ortağı
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight tracking-tight max-w-4xl mx-auto"
          >
            Dünyanın En Güçlü{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300 bg-clip-text text-transparent font-semibold">
              AI Platformlarının
            </span>
            <br />Güvenilir Ortağıyız
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            Google Cloud ve OpenAI ile kurduğumuz resmi ortaklık sayesinde işletmenize en ileri yapay zeka çözümlerini sunuyoruz.
          </motion.p>

          {/* Partner logo badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {/* GCP badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <GCPLogo />
              <div className="text-left">
                <p className="text-white font-semibold text-sm leading-none">Google Cloud</p>
                <p className="text-slate-400 text-xs mt-0.5">Premier Partner</p>
              </div>
            </div>
            {/* OpenAI badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-white"><OpenAILogo /></span>
              <div className="text-left">
                <p className="text-white font-semibold text-sm leading-none">OpenAI</p>
                <p className="text-slate-400 text-xs mt-0.5">Resmi API Ortağı</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="mt-10"
          >
            <button
              onClick={scrollToPartners}
              aria-label="Ortaklık detaylarına git"
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-600/30 hover:scale-105 transition-all duration-300"
            >
              Ortaklıklarımızı Keşfedin
            </button>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — DUAL PARTNERSHIP SHOWCASE
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="partners-section" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-3">Resmi Ortaklıklar</p>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900">İki Güç, Tek Platform</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* Google Cloud card */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="partner-card gcp-card group relative rounded-3xl p-8 md:p-10 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <GCPLogo />
                    <span className="text-white/90 font-semibold text-lg">Google Cloud</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                    Premier Partner
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                  Google Cloud Ortaklığı
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  Google'ın global bulut altyapısı, Vertex AI ve BigQuery teknolojilerini işletmenize entegre ediyoruz.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {gcpPills.map((p) => (
                    <span key={p} className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-300 text-xs font-medium">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10 text-sm">
                  {[['50+', 'Proje'], ['99.9%', 'Uptime'], ['Premier', 'Sertifika']].map(([v, l]) => (
                    <div key={l}>
                      <span className="text-white font-bold">{v}</span>
                      <span className="text-slate-500 ml-1">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow orb */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-700" />
            </motion.div>

            {/* OpenAI card */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="partner-card openai-card group relative rounded-3xl p-8 md:p-10 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-white"><OpenAILogo /></span>
                    <span className="text-white/90 font-semibold text-lg">OpenAI</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                    Resmi API Ortağı
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                  OpenAI Ortaklığı
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  GPT-4o, o1 ve DALL·E modellerini kurumsal iş süreçlerinize entegre ederek rekabet avantajı yaratıyoruz.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {openaiPills.map((p) => (
                    <span key={p} className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-300 text-xs font-medium">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10 text-sm">
                  {[['30+', 'AI Ürünü'], ['Kurumsal', 'Güvenlik'], ['Özel', 'Erişim']].map(([v, l]) => (
                    <div key={l}>
                      <span className="text-white font-bold">{v}</span>
                      <span className="text-slate-500 ml-1">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow orb */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none group-hover:bg-emerald-500/25 transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — COMBINED BENEFITS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F8F7FF]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-3">Neden Pulsara?</p>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900">İki Güçlü Ortaklığın Avantajları</h2>
          </motion.div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {combinedBenefits.map((b) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                className="flex gap-4 bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mt-0.5">
                  <Icon d={icons[b.icon]} size="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{b.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — STATS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="py-20 md:py-28 relative overflow-hidden bg-[#07071A]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {stats.map((s) => (
              <StatItem key={s.label} {...s} active={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-3">Süreç</p>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900">Ortaklık Sürecimiz Nasıl İşler?</h2>
          </motion.div>

          {/* Steps — horizontal on desktop, vertical on mobile */}
          <div className="relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-7 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-px border-t-2 border-dashed border-purple-200 z-0" />

            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4"
            >
              {steps.map((s) => (
                <motion.div
                  key={s.num}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center px-2"
                >
                  <div className="w-14 h-14 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center mb-4 flex-shrink-0">
                    <span className="text-purple-700 font-bold text-sm">{s.num}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm md:text-base leading-snug">{s.title}</h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F8F7FF] relative overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="cta-blob cta-blob-1" />
          <div className="cta-blob cta-blob-2" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-blue-900 px-8 py-16 md:py-24 text-center shadow-2xl shadow-purple-900/40"
          >
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 max-w-2xl mx-auto leading-tight">
              AI Dönüşümünüze Başlamaya
              <br className="hidden sm:block" /> Hazır mısınız?
            </h2>
            <p className="relative text-purple-200 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Google Cloud ve OpenAI ortaklığımız ile işletmenizi geleceğe taşıyalım.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                aria-label="İletişime geçin"
                className="px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg hover:scale-105 transition-all duration-300"
              >
                Bizimle İletişime Geçin
              </Link>
              <Link
                to="/services"
                aria-label="Tüm hizmetleri gör"
                className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Tüm Hizmetleri Gör
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Page-scoped styles ── */}
      <style>{`
        /* Hero blobs */
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: blobFloat 12s ease-in-out infinite;
        }
        .hero-blob-1 {
          width: 600px; height: 600px;
          top: -100px; left: -100px;
          background: radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%);
          animation-delay: 0s;
        }
        .hero-blob-2 {
          width: 500px; height: 500px;
          top: 30%; right: -80px;
          background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
          animation-delay: 4s;
        }
        .hero-blob-3 {
          width: 400px; height: 400px;
          bottom: 0; left: 30%;
          background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%);
          animation-delay: 8s;
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -30px) scale(1.04); }
          66%       { transform: translate(-20px, 20px) scale(0.97); }
        }

        /* Stars */
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle 4s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.7; }
        }

        /* Partner badge */
        .partner-badge {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
          box-shadow: 0 0 20px rgba(139,92,246,0.2), inset 0 0 20px rgba(139,92,246,0.05);
          animation: badgePulse 3s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 12px rgba(139,92,246,0.2), inset 0 0 20px rgba(139,92,246,0.05); }
          50%       { box-shadow: 0 0 28px rgba(139,92,246,0.45), inset 0 0 20px rgba(139,92,246,0.1); }
        }

        /* Partner cards */
        .partner-card {
          background: #0F0F1A;
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .partner-card:hover {
          transform: translateY(-6px);
        }
        .gcp-card { border-color: rgba(66,133,244,0.15); }
        .gcp-card:hover {
          box-shadow: 0 24px 60px rgba(66,133,244,0.18);
          border-color: rgba(66,133,244,0.4);
        }
        .openai-card { border-color: rgba(16,185,129,0.15); }
        .openai-card:hover {
          box-shadow: 0 24px 60px rgba(16,185,129,0.18);
          border-color: rgba(16,185,129,0.4);
        }

        /* CTA blobs */
        .cta-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: blobFloat 10s ease-in-out infinite;
        }
        .cta-blob-1 {
          width: 400px; height: 400px;
          top: -100px; left: -100px;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
        }
        .cta-blob-2 {
          width: 400px; height: 400px;
          bottom: -100px; right: -100px;
          background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
          animation-delay: 5s;
        }
      `}</style>
    </div>
  );
}
