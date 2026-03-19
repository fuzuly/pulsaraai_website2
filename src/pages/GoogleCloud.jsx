import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const icons = {
  trophy: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-4v4M5 3H3v4a4 4 0 004 4h10a4 4 0 004-4V3h-2M5 3h14M9 11V3m6 8V3" />
    </svg>
  ),
  bolt: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  currency: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  rocket: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l-.55-.55M15 5H9L3 15l6 6 10-6V9l-4-4zM12 12a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  ),
  globe: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: 'trophy', title: 'Sertifikalı Uzmanlık', desc: 'Google Cloud teknolojilerinde sertifikalı mühendis kadrosuyla projelerinizi güvende tutun.' },
  { icon: 'bolt',   title: 'Öncelikli Destek',    desc: "Google'dan doğrudan teknik destek ve öncelikli erişim avantajı." },
  { icon: 'currency', title: 'Özel Fiyatlandırma', desc: 'Müşterilerimize özel Google Cloud kredileri ve kurumsal indirimler.' },
  { icon: 'shield', title: 'Güvenlik & Uyumluluk', desc: 'Enterprise düzey güvenlik standartları ve uyumluluk çerçeveleri.' },
  { icon: 'rocket', title: 'Hızlı Deployment',    desc: "Google altyapısı ile 8 haftada yayına alma garantisi." },
  { icon: 'globe',  title: 'Global Altyapı',      desc: "Google'ın dünya genelindeki veri merkezleri ile düşük gecikme süresi." },
];

const gcpServices = [
  {
    id: 'bigquery',
    label: 'BigQuery',
    description: 'Petabyte ölçekli veri analitiği platformu. SQL sorguları ile milyarlarca satırı saniyeler içinde sorgulayın, gerçek zamanlı içgörüler elde edin.',
    features: [
      'Serverless veri ambarı mimarisi',
      'Gerçek zamanlı veri akışı ve analiz',
      'ML modelleri ile doğrudan entegrasyon (BigQuery ML)',
      'Güvenli paylaşım ve çok bulut desteği',
    ],
  },
  {
    id: 'vertexai',
    label: 'Vertex AI',
    description: "Google'ın birleşik yapay zeka platformu. Model eğitimi, dağıtımı ve izlemeyi tek bir yerde yönetin; Gemini dahil en güncel modellere erişin.",
    features: [
      'AutoML ve özel model eğitimi',
      'Model registry ve sürüm yönetimi',
      'Feature Store ile veri tutarlılığı',
      'MLOps pipeline otomasyonu',
    ],
  },
  {
    id: 'cloudrun',
    label: 'Cloud Run',
    description: 'Altyapı yönetimine gerek kalmadan konteyner tabanlı uygulamaları dağıtın. Sıfırdan milyona ölçekleyin, yalnızca kullandığınız kadar ödeyin.',
    features: [
      'Otomatik ölçekleme (sıfıra dahil)',
      'HTTPS endpoints ile anlık dağıtım',
      'CI/CD entegrasyonu (Cloud Build)',
      'VPC ve IAM ile güvenli erişim',
    ],
  },
  {
    id: 'gke',
    label: 'GKE',
    description: "Google Kubernetes Engine ile kurumsal düzeyde konteyner orkestrasyonu. Autopilot modu ile operasyonel yükü sıfıra indirin.",
    features: [
      'Autopilot ve Standard mod seçenekleri',
      'Workload Identity ile güvenli kimlik doğrulama',
      'Çok bölgeli küme yönetimi',
      'Node auto-provisioning ve maliyet optimizasyonu',
    ],
  },
  {
    id: 'looker',
    label: 'Looker',
    description: 'İşletme genelinde veri keşfi ve görselleştirme. LookML semantik katmanıyla tutarlı metrik tanımları ve self-servis analitik.',
    features: [
      'Sürükle-bırak dashboard oluşturma',
      'Yerleşik veri yönetişimi ve erişim kontrolü',
      'BigQuery, PostgreSQL ve 50+ kaynak bağlantısı',
      'API ve uygulama içi gömme desteği',
    ],
  },
];

// ─── Tab component ────────────────────────────────────────────────────────────
function ServiceTabs() {
  const [activeId, setActiveId] = useState('bigquery');
  const [fading, setFading] = useState(false);
  const active = gcpServices.find((s) => s.id === activeId);

  const switchTab = (id) => {
    if (id === activeId) return;
    setFading(true);
    setTimeout(() => {
      setActiveId(id);
      setFading(false);
    }, 160);
  };

  return (
    <div>
      {/* Pill selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {gcpServices.map((s) => (
          <button
            key={s.id}
            onClick={() => switchTab(s.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeId === s.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-300'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-400 hover:text-purple-600'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        className={`transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              {active.label}
            </span>
            <p className="text-slate-700 leading-relaxed text-base md:text-lg">
              {active.description}
            </p>
          </div>
          <ul className="space-y-3">
            {active.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Stats counter ────────────────────────────────────────────────────────────
const stats = [
  { target: 50, suffix: '+', label: 'Tamamlanan Google Cloud Projesi' },
  { target: 99, suffix: '.9%', label: 'Uptime Garantisi' },
  { target: 8,  suffix: 'hf',  label: 'Ortalama Yayına Alma Süresi' },
  { target: 3,  suffix: 'x',   label: 'Maliyet Optimizasyonu' },
];

function StatCounter({ target, suffix, label, start }) {
  const val = useCountUp(target, 1600, start);
  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-extrabold text-white tabular-nums">
        {val}{suffix}
      </p>
      <p className="mt-2 text-sm md:text-base text-slate-300">{label}</p>
    </div>
  );
}

// ─── Stagger variants ─────────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Google Cloud logo (inline SVG) ──────────────────────────────────────────
const GCPLogo = () => (
  <svg viewBox="0 0 109 22" fill="none" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.77 4.58l-1.87 1.87a6.45 6.45 0 11-9.12 9.12l-1.87 1.87A9 9 0 1015.77 4.58z" fill="#4285F4"/>
    <path d="M3.21 9.37l1.87 1.87a6.45 6.45 0 009.12 0l1.87-1.87A9 9 0 003.21 9.37z" fill="#34A853"/>
    <path d="M9 3a6.45 6.45 0 016.45 6.45l1.87-1.87A9 9 0 009 0v3z" fill="#FBBC05"/>
    <path d="M9 3v6.45A6.45 6.45 0 012.55 9L.68 7.13A9 9 0 009 3z" fill="#EA4335"/>
    <text x="20" y="16" fontFamily="Google Sans,sans-serif" fontWeight="500" fontSize="14" fill="#5F6368">Google Cloud</text>
  </svg>
);

// ─── Main page ────────────────────────────────────────────────────────────────
const GoogleCloud = () => {
  const [statsRef, statsInView] = useInView(0.3);

  return (
    <div className="bg-white">
      <SEO
        title="Google Cloud Ortaklığı — Pulsara"
        description="Pulsara, Google Cloud'un resmi iş ortağı olarak BigQuery, Vertex AI, Cloud Run, GKE ve Looker hizmetleri sunar."
      />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0a0a14]">
        {/* Gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full bg-blue-800/20 blur-3xl" />
          {/* Noise grain */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",backgroundSize:'256px 256px'}}
          />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white font-medium">
                {/* pulse ring */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                Official Google Cloud Partner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight"
            >
              Google Cloud
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                Sertifikalı Ortağıyız
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl"
            >
              Pulsara olarak Google Cloud'un güvenilir iş ortağı sıfatıyla işletmenizi geleceğe taşıyoruz.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="px-7 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
              >
                Bizimle İletişime Geçin
              </Link>
              <Link
                to="/services"
                className="px-7 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                Tüm Hizmetleri Gör
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. BENEFITS ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-3">Neden Pulsara?</p>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900">Ortaklığımızın Avantajları</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:shadow-md hover:border-purple-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  {icons[b.icon]}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. GCP SERVICES TABS ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F5F3FF]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-3">Uzmanlık Alanlarımız</p>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900">Sunduğumuz Google Cloud Hizmetleri</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ServiceTabs />
          </motion.div>
        </div>
      </section>

      {/* ── 4. STATS ──────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="py-20 md:py-28 bg-[#0a0a14] relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-700/15 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-blue-700/15 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} start={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 px-8 py-16 md:py-20 text-center"
          >
            {/* Decorative blobs inside card */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 max-w-2xl mx-auto">
              Google Cloud ile İşinizi Büyütmeye
              <br className="hidden sm:block" /> Hazır mısınız?
            </h2>
            <p className="relative text-purple-100 text-base md:text-lg mb-8 max-w-lg mx-auto">
              Sertifikalı ekibimiz ile Google Cloud'un tüm gücünü işletmenize taşıyalım.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 shadow-lg transition-all duration-300"
              >
                Bizimle İletişime Geçin
              </Link>
              <Link
                to="/services"
                className="px-8 py-3 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Tüm Hizmetleri Gör
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GoogleCloud;
