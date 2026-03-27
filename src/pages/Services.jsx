import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

/* ─── Scroll animation hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── Shared variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

/* ════════════════════════════════════════════════════════════
   VISUAL COMPONENTS
════════════════════════════════════════════════════════════ */

/* Visual 1 — AI Readiness Score Dashboard */
const AIReadinessDashboard = () => (
  <div className="srv-visual group">
    <div className="visual-header">
      <span className="visual-dot bg-red-500" />
      <span className="visual-dot bg-yellow-500" />
      <span className="visual-dot bg-green-500" />
      <span className="visual-title">ai-readiness.report</span>
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-400 uppercase tracking-widest">AI Readiness Score</span>
        <span className="text-xs text-purple-400 font-mono">v2.4.1</span>
      </div>
      <div className="flex items-end gap-3 mb-5">
        <span className="text-6xl font-extrabold text-white tabular-nums leading-none">74</span>
        <div className="pb-1">
          <span className="text-emerald-400 text-sm font-semibold">↑ +12</span>
          <p className="text-slate-500 text-xs">vs. baseline</p>
        </div>
      </div>
      <div className="space-y-3 mb-5">
        {[
          { label: 'Data Infrastructure', score: 82, color: 'bg-blue-500' },
          { label: 'ML Tooling',          score: 61, color: 'bg-purple-500' },
          { label: 'Team Capability',     score: 70, color: 'bg-violet-500' },
          { label: 'Process Maturity',    score: 55, color: 'bg-indigo-500' },
        ].map(({ label, score, color }) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{label}</span>
              <span className="text-slate-300 font-mono">{score}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-3">
        {[
          { label: 'Top Opportunity', value: 'Document AI' },
          { label: 'Est. ROI',        value: '3.2×' },
          { label: 'Time to Value',   value: '8 weeks' },
          { label: 'Risk Level',      value: 'Low' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white/5 rounded-lg p-2.5">
            <p className="text-slate-500 text-xs">{label}</p>
            <p className="text-white text-sm font-semibold mt-0.5">{value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* Visual 2 — Code Terminal */
const CodeTerminal = () => {
  const lines = [
    { type: 'comment', text: '# pulsara build — custom AI system' },
    { type: 'cmd',     text: '$ pulsara init --template agentic-workflow' },
    { type: 'muted',   text: '  → Scaffolding project structure...' },
    { type: 'muted',   text: '  → Connecting vector store: Pinecone OK' },
    { type: 'muted',   text: '  → Wiring LLM gateway: GPT-4o OK' },
    { type: 'success', text: '  ✓ Agent pipeline ready' },
    { type: 'cmd',     text: '$ pulsara deploy --env production' },
    { type: 'muted',   text: '  → Building Docker image...' },
    { type: 'muted',   text: '  → Pushing to Cloud Run...' },
    { type: 'success', text: '  ✓ Live at api.client.com — 0 errors' },
  ];
  const colors = {
    comment: 'text-slate-500',
    cmd:     'text-purple-400',
    muted:   'text-slate-400',
    success: 'text-emerald-400',
  };
  return (
    <div className="srv-visual group">
      <div className="visual-header">
        <span className="visual-dot bg-red-500" />
        <span className="visual-dot bg-yellow-500" />
        <span className="visual-dot bg-green-500" />
        <span className="visual-title">pulsara-cli</span>
      </div>
      <div className="p-5 font-mono text-xs space-y-1.5">
        {lines.map((l, i) => (
          <p key={i} className={colors[l.type]}>{l.text}</p>
        ))}
        <p className="text-slate-300 mt-3">
          <span className="text-purple-400">$</span>
          <span className="animate-pulse ml-1">▌</span>
        </p>
      </div>
    </div>
  );
};

/* Visual 3 — Integration Flow */
const IntegrationFlow = () => {
  const tools = [
    { name: 'ServiceNow', color: 'border-green-500/40 text-green-400' },
    { name: 'Jira',       color: 'border-blue-500/40 text-blue-400'  },
    { name: 'AWS',        color: 'border-orange-500/40 text-orange-400' },
    { name: 'Salesforce', color: 'border-sky-500/40 text-sky-400'    },
  ];
  return (
    <div className="srv-visual group p-5">
      <p className="text-xs text-slate-500 uppercase tracking-widest mb-5">Integration Map</p>
      <div className="flex flex-col gap-3">
        {tools.map((t) => (
          <div key={t.name} className="flex items-center gap-1.5 sm:gap-3">
            <div className={`flex-shrink-0 w-20 sm:w-28 text-center border rounded-lg px-1.5 sm:px-3 py-2 text-xs font-semibold ${t.color} bg-white/5`}>
              {t.name}
            </div>
            <div className="flex-1 flex items-center gap-1 min-w-0">
              <div className="flex-1 h-px border-t border-dashed border-white/20" />
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                <path d="M0 0l8 4-8 4z" />
              </svg>
            </div>
            <div className="flex-shrink-0 w-20 sm:w-28 text-center border border-purple-500/40 rounded-lg px-1.5 sm:px-3 py-2 text-xs font-semibold text-purple-300 bg-purple-500/10">
              Pulsara AI
            </div>
            <div className="flex-1 flex items-center gap-1 min-w-0">
              <div className="flex-1 h-px border-t border-dashed border-white/20" />
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                <path d="M0 0l8 4-8 4z" />
              </svg>
            </div>
            <div className="flex-shrink-0 w-16 sm:w-24 text-center border border-emerald-500/30 rounded-lg px-1.5 sm:px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/5">
              Auto
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-white/10 pt-4 flex gap-4 text-xs text-slate-500">
        <span><span className="text-purple-400 font-semibold">12</span> active flows</span>
        <span><span className="text-emerald-400 font-semibold">99.9%</span> uptime</span>
        <span><span className="text-blue-400 font-semibold">0</span> manual steps</span>
      </div>
    </div>
  );
};

/* Visual 4 — CI/CD Pipeline */
const CIPipeline = () => {
  const stages = [
    { name: 'Build',   status: 'pass', duration: '1m 12s' },
    { name: 'Test',    status: 'pass', duration: '3m 44s' },
    { name: 'Scan',    status: 'pass', duration: '0m 58s' },
    { name: 'Deploy',  status: 'live', duration: '2m 01s' },
  ];
  return (
    <div className="srv-visual group p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-500 uppercase tracking-widest">Pipeline #1,204</p>
        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">All passed</span>
      </div>
      <div className="space-y-2.5 mb-5">
        {stages.map((s) => (
          <div key={s.name} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2.5">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.status === 'live' ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-slate-300 text-sm flex-1">{s.name}</span>
            <span className="text-slate-500 text-xs font-mono">{s.duration}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Deploys/day', value: '4' },
          { label: 'Success rate', value: '99.1%' },
          { label: 'MTTR', value: '< 5m' },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-white font-bold text-lg">{value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Visual 5 — Uptime Monitor */
const UptimeMonitor = () => {
  const bars = Array.from({ length: 40 }, (_, i) => ({
    height: Math.random() > 0.08 ? 100 : Math.floor(Math.random() * 40 + 20),
    ok: Math.random() > 0.08,
  }));
  return (
    <div className="srv-visual group p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-500 uppercase tracking-widest">System Status</p>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          All systems operational
        </span>
      </div>
      <div className="flex items-end gap-0.5 h-12 mb-4">
        {bars.map((b, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-all ${b.ok ? 'bg-emerald-500' : 'bg-red-500/60'}`}
            style={{ height: `${b.height}%` }}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500 mb-5">Last 90 days — 99.97% uptime</p>
      <div className="space-y-2">
        {[
          { name: 'API Gateway',      ping: '12ms',  ok: true },
          { name: 'AI Inference',     ping: '38ms',  ok: true },
          { name: 'Database Cluster', ping: '4ms',   ok: true },
          { name: 'Background Jobs',  ping: 'active', ok: true },
        ].map((s) => (
          <div key={s.name} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300 text-xs">{s.name}</span>
            </div>
            <span className="text-slate-500 text-xs font-mono">{s.ping}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════ */
const Services = () => {
  const { language } = useLanguage();
  const tr = language === 'tr';

  const services = [
    {
      id: 'strategy',
      num: '01',
      title:    tr ? 'AI & Veri Stratejisi'          : 'AI & Data Strategy',
      headline: tr ? 'Hangi AI\'ı inşa edeceğinizi tam olarak bilin — ve nedenini' : 'Know exactly which AI to build — and why',
      desc:     tr
        ? 'Operasyonlarınızı denetliyor, AI hazırlık puanınızı çıkarıyor ve önceliklendirilmiş bir yol haritası sunuyoruz. Belirsiz strateji sunumları yok. Her girişim için ROI tahmini içeren somut bir plan.'
        : 'We audit your operations, score your AI readiness, and hand you a prioritized roadmap. No vague strategy decks. A concrete plan with ROI estimates per initiative.',
      bullets: tr
        ? ['AI olgunluk değerlendirmesi ve net yol haritası', 'İş değerine odaklı veri mimarisi tasarımı', 'En yüksek ROI\'li AI kullanım senaryolarının belirlenmesi', 'Girişim başına ölçülebilir ROI ve etki analizi']
        : ['AI maturity assessment with a clear, actionable roadmap', 'Data architecture designed around business value', 'Identifying the highest-ROI AI use cases for your operations', 'Measurable ROI and impact analysis per initiative'],
      visual: <AIReadinessDashboard />,
      textLeft: true,
    },
    {
      id: 'development',
      num: '02',
      title:    tr ? 'Özel Geliştirme'                   : 'Custom Development',
      headline: tr ? '8 haftada production-grade AI sistemleri' : 'Production-grade AI systems in 8 weeks',
      desc:     tr
        ? 'Uçtan uca tasarlıyor, geliştiriyor ve deploy ediyoruz. Agentic workflow\'lardan müşteriye yönelik uygulamalara kadar, ekibinizin ilk günden itibaren kullandığı yazılımı teslim ediyoruz.'
        : 'We design, build, and deploy — end to end. From agentic workflows to customer-facing apps, we ship software your team uses on day one.',
      bullets: tr
        ? ['Üretim ortamına hazır web ve mobil uygulamalar', 'Sistemlerinizi birleştiren API geliştirme', 'Ölçeklenebilir mikroservis ve bulut mimarisi', 'Haftalık demo ile şeffaf Agile süreç']
        : ['Production-ready web and mobile applications', 'API development that unifies your systems', 'Scalable microservices and cloud architecture', 'Transparent agile delivery with weekly demos'],
      visual: <CodeTerminal />,
      textLeft: false,
    },
    {
      id: 'integrations',
      num: '03',
      title:    tr ? 'Entegrasyonlar & Otomasyon'         : 'Integrations & Automation',
      headline: tr ? 'Mevcut araçlarınız, sonunda birlikte çalışıyor' : 'Your existing tools, finally working together',
      desc:     tr
        ? 'ServiceNow, Jira, AWS ve iç sistemleriniz — bağlı ve otomatik. Ekibinizin zamanını sessizce tüketen manuel işi ortadan kaldırıyoruz.'
        : 'ServiceNow, Jira, AWS, and your internal systems — connected and automated. We eliminate the manual work that\'s silently draining your team\'s time.',
      bullets: tr
        ? ['Kurumsal araç entegrasyonları (ServiceNow, Jira, AWS)', 'Tekrarlayan görevleri ortadan kaldıran iş akışı otomasyonu', 'Temiz, güvenilir veri akışı için ETL süreçleri', 'API yönetimi ve gerçek zamanlı izleme']
        : ['Enterprise tool integrations (ServiceNow, Jira, AWS)', 'Workflow automation that eliminates repetitive tasks', 'ETL processes for clean, reliable data flow', 'API management and real-time monitoring'],
      visual: <IntegrationFlow />,
      textLeft: true,
    },
    {
      id: 'cloud',
      num: '04',
      title:    tr ? 'Bulut, DevOps & İzlenebilirlik'    : 'Cloud, DevOps & Observability',
      headline: tr ? 'Her zaman çalışan, kendi kendini ölçekleyen altyapı' : 'Infrastructure that runs itself and scales with you',
      desc:     tr
        ? 'Ölçeklenebilir bulut altyapısı, CI/CD pipeline\'ları ve kapsamlı izleme — hepsini bir arada. Sistemlerinizin her zaman çalışır durumda kalmasını sağlıyoruz.'
        : 'Scalable cloud infrastructure, CI/CD pipelines, and comprehensive monitoring — all in one. We keep your systems running at all times.',
      bullets: tr
        ? ['AWS, Azure ve GCP altyapı kurulumu ve optimizasyonu', 'Güvenilir teslimat için CI/CD pipeline otomasyonu', 'Kubernetes ve Docker konteyner orkestrasyonu', 'Log yönetimi ve gerçek zamanlı performans izleme']
        : ['AWS, Azure, and GCP infrastructure setup and optimization', 'CI/CD pipeline automation for reliable delivery', 'Kubernetes and Docker container orchestration', 'Log management and real-time performance monitoring'],
      visual: <CIPipeline />,
      textLeft: false,
    },
    {
      id: 'support',
      num: '05',
      title:    tr ? '7/24 Destek'                        : '24/7 Support',
      headline: tr ? 'Sistemler durduğunda, biz zaten haberdarız' : 'When systems go down, we already know',
      desc:     tr
        ? 'Kesintisiz teknik destek ve proaktif bakım. Sorun sizi bulmadan biz buluruz — ve çözeriz.'
        : 'Uninterrupted technical support and proactive maintenance. We find the problem before it finds you — and we fix it.',
      bullets: tr
        ? ['7/24 teknik destek hattı ve garantili yanıt süreleri', 'Sorunları önceden yakalayan proaktif sistem izleme', 'Hızlı incident çözümü ve kök neden analizi', 'Düzenli güvenlik güncellemeleri ve patch yönetimi']
        : ['24/7 technical support with guaranteed response times', 'Proactive system monitoring that catches issues before they escalate', 'Fast incident resolution with root-cause analysis', 'Regular security updates and patch management'],
      visual: <UptimeMonitor />,
      textLeft: true,
    },
  ];

  const processSteps = tr
    ? [
        { num: '01', title: 'Keşif',           sub: '1 hafta', desc: 'Operasyonlarınızı haritalıyoruz ve en yüksek ROI\'li AI fırsatını belirliyoruz.' },
        { num: '02', title: 'Mimari',           sub: '1 hafta', desc: 'Sistemi, stack\'i ve entegrasyonları tasarlıyoruz.' },
        { num: '03', title: 'Geliştirme',       sub: '6 hafta', desc: 'Haftalık demolar, tam şeffaflık, sürpriz yok.' },
        { num: '04', title: 'Deploy & Teslim',  sub: '',        desc: 'Dokümantasyon ve ekip eğitimi ile production deployment.' },
      ]
    : [
        { num: '01', title: 'Discovery',        sub: '1 week',  desc: 'We map your operations and identify the highest-ROI AI opportunity.' },
        { num: '02', title: 'Architecture',     sub: '1 week',  desc: 'We design the system, stack, and integrations.' },
        { num: '03', title: 'Build',            sub: '6 weeks', desc: 'Weekly demos, full transparency, no surprises.' },
        { num: '04', title: 'Deploy & Handover', sub: '',       desc: 'Production deployment with documentation and team training.' },
      ];

  return (
    <div className="bg-white overflow-x-hidden">
      <SEO
        title="Pulsara Services — AI Consulting, Integrations & Enterprise Automation"
        description="Enterprise AI consulting, integrations, automations and custom ML development to build intelligent workflows."
      />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-950 pt-32 pb-24 md:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-purple-700/20 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-blue-700/15 blur-[80px]" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-semibold tracking-wide">
              {tr ? 'Ne İnşa Ediyoruz' : 'What We Build'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight max-w-4xl mx-auto"
          >
            {tr
              ? <>Kurumsal AI, production'a taşındı.<br /><span className="text-slate-400 font-light">Sadece demo için değil.</span></>
              : <>Enterprise AI, built to production.<br /><span className="text-slate-400 font-light">Not just to demo.</span></>
            }
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            {tr
              ? 'En yüksek ROI\'li kullanım senaryosunu seçiyor, 8 haftada inşa ediyor ve ekibinizin gerçekten kullandığı bir sistem teslim ediyoruz.'
              : "We pick the highest-ROI use case, build it in 8 weeks, and hand you a system your team actually uses."
            }
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-6 flex-wrap"
          >
            {[
              { value: '40+', label: tr ? 'canlı sistem' : 'systems live' },
              { value: tr ? '8 haftalık' : '8-week', label: tr ? 'teslimat' : 'delivery' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{value}</span>
                <span className="text-slate-500 text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES — ALTERNATING SECTIONS
      ══════════════════════════════════════════════════════ */}
      <section className="py-4">
        {services.map((svc, idx) => (
          <ServiceRow key={svc.id} svc={svc} isLast={idx === services.length - 1} />
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS STRIP
      ══════════════════════════════════════════════════════ */}
      <ProcessStrip steps={processSteps} tr={tr} />

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <CTASection tr={tr} />

      {/* ── Scoped styles ── */}
      <style>{`
        .srv-visual {
          background: #0f172a;
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 1rem;
          overflow: hidden;
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .srv-visual:hover,
        .srv-visual.group:hover {
          box-shadow: 0 0 40px rgba(139,92,246,0.25);
          border-color: rgba(139,92,246,0.45);
        }
        .visual-header {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
        }
        .visual-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .visual-title {
          margin-left: 6px;
          font-size: 11px;
          color: #64748b;
          font-family: monospace;
        }
        .srv-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(139,92,246,0.3), transparent);
        }
      `}</style>
    </div>
  );
};

/* ─── Service Row ─── */
function ServiceRow({ svc, isLast }) {
  const [ref, inView] = useInView(0.1);

  const textBlock = (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="flex flex-col justify-center"
    >
      <motion.p variants={fadeUp} className="text-purple-600 font-mono text-sm font-semibold mb-3">
        {svc.num}
      </motion.p>
      <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
        {svc.title}
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 leading-snug mb-4">
        {svc.headline}
      </motion.h2>
      <motion.p variants={fadeUp} className="text-slate-600 text-base leading-relaxed mb-6">
        {svc.desc}
      </motion.p>
      <motion.ul variants={stagger} className="space-y-3">
        {svc.bullets.map((b) => (
          <motion.li key={b} variants={fadeUp} className="flex items-start gap-3">
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-slate-700 text-sm leading-relaxed">{b}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  const visualBlock = (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: 0.2 }}
    >
      {svc.visual}
    </motion.div>
  );

  return (
    <>
      <div
        ref={ref}
        className="container mx-auto px-4 md:px-6 py-16 md:py-24 group"
      >
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center ${!svc.textLeft ? 'direction-rtl' : ''}`}>
          {svc.textLeft ? (
            <>
              <div className="pl-0 md:pl-4 border-l-0 md:border-l-2 border-transparent group-hover:border-purple-400 transition-colors duration-500">
                {textBlock}
              </div>
              {visualBlock}
            </>
          ) : (
            <>
              <div className="order-2 lg:order-1">{visualBlock}</div>
              <div className="order-1 lg:order-2 pl-0 md:pl-4 border-l-0 md:border-l-2 border-transparent group-hover:border-purple-400 transition-colors duration-500">
                {textBlock}
              </div>
            </>
          )}
        </div>
      </div>
      {!isLast && <div className="srv-divider mx-auto max-w-5xl" />}
    </>
  );
}

/* ─── Process Strip ─── */
function ProcessStrip({ steps, tr }) {
  const [ref, inView] = useInView(0.15);
  return (
    <section className="bg-slate-950 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] rounded-full bg-purple-700/15 blur-[100px]" />
      </div>
      <div ref={ref} className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {tr ? 'Süreç' : 'How We Work'}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">
            {tr ? '8 haftada, production\'a hazır' : 'From kickoff to production in 8 weeks'}
          </h2>
        </motion.div>

        {/* Connector line desktop */}
        <div className="hidden lg:block relative mb-2">
          <div className="absolute top-7 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-purple-800 z-0" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((s) => (
            <motion.div key={s.num} variants={fadeUp} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-purple-900/60 border-2 border-purple-600/40 flex items-center justify-center mb-4 flex-shrink-0">
                <span className="text-purple-300 font-bold text-sm font-mono">{s.num}</span>
              </div>
              <p className="text-white font-semibold text-base mb-0.5">{s.title}</p>
              {s.sub && <p className="text-purple-400 text-xs font-mono mb-2">{s.sub}</p>}
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection({ tr }) {
  const [ref, inView] = useInView(0.2);
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-blue-900 px-8 py-16 md:py-24 text-center shadow-2xl shadow-purple-900/30"
        >
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 max-w-2xl mx-auto leading-tight">
            {tr
              ? 'Sizin için ne inşa edeceğimizi görmek ister misiniz?'
              : 'Ready to see what we\'d build for you?'}
          </h2>
          <p className="relative text-purple-200 text-base md:text-lg mb-10 max-w-xl mx-auto">
            {tr
              ? 'En büyük operasyonel darboğazınızı bize anlatın. Ücretsiz, somut bir AI önerisiyle geri döneceğiz.'
              : "Tell us your biggest operational bottleneck. We'll come back with a concrete AI proposal — free."}
          </p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg hover:scale-105 transition-all duration-300"
            >
              {tr ? 'Ücretsiz Danışmanlık Rezervasyonu' : 'Book a free consultation'}
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              {tr ? 'Örnek Vakaları Görün' : 'See case studies'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
