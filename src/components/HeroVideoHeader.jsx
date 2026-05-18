import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

// ─── Terminal scenarios ────────────────────────────────────────────────────────
const SCENARIOS_EN = [
  {
    comment: 'initialising workforce-wellbeing agent',
    lines: [
      { text: '$ pulsara init wellbeing-agent', type: 'command' },
      { text: '  → Loading mood signals: 1,240 employees', type: 'muted' },
      { text: '  → Connecting to HR platform: Salesforce OK', type: 'muted' },
      { text: '  ✓ Agent online — burnout risk alerts active', type: 'success' },
    ],
  },
  {
    comment: 'initialising roster-optimisation agent',
    lines: [
      { text: '$ pulsara init roster-agent', type: 'command' },
      { text: '  → Syncing shift data: 86 active locations', type: 'muted' },
      { text: '  → Running compliance rules v4.1', type: 'muted' },
      { text: '  ✓ Agent online — schedules optimised 3× faster', type: 'success' },
    ],
  },
  {
    comment: 'initialising finance-automation agent',
    lines: [
      { text: '$ pulsara init finance-agent', type: 'command' },
      { text: '  → Parsing invoices: PDF, XLSX, ERP feed', type: 'muted' },
      { text: '  → Accuracy benchmark: 99.1% on test set', type: 'muted' },
      { text: '  ✓ Agent online — processing 8k docs/day', type: 'success' },
    ],
  },
];

const SCENARIOS_TR = [
  {
    comment: 'wellbeing ajanı başlatılıyor',
    lines: [
      { text: '$ pulsara init wellbeing-agent', type: 'command' },
      { text: '  → Ruh hali sinyalleri yükleniyor: 1.240 çalışan', type: 'muted' },
      { text: '  → İK platformuna bağlanılıyor: Başarılı', type: 'muted' },
      { text: '  ✓ Ajan aktif — tükenmişlik uyarıları çalışıyor', type: 'success' },
    ],
  },
  {
    comment: 'vardiya optimizasyon ajanı başlatılıyor',
    lines: [
      { text: '$ pulsara init roster-agent', type: 'command' },
      { text: '  → Vardiya verisi senkronize ediliyor: 86 lokasyon', type: 'muted' },
      { text: '  → Uyumluluk kuralları çalıştırılıyor v4.1', type: 'muted' },
      { text: '  ✓ Ajan aktif — programlar 3× daha hızlı', type: 'success' },
    ],
  },
  {
    comment: 'finans otomasyon ajanı başlatılıyor',
    lines: [
      { text: '$ pulsara init finance-agent', type: 'command' },
      { text: '  → Faturalar ayrıştırılıyor: PDF, XLSX, ERP', type: 'muted' },
      { text: '  → Doğruluk kıyaslaması: %99,1', type: 'muted' },
      { text: '  ✓ Ajan aktif — günlük 8k belge işleniyor', type: 'success' },
    ],
  },
];

const METRICS_EN = [
  { value: '40+', label: 'AI systems live' },
  { value: '3×', label: 'Efficiency gain' },
  { value: '8wk', label: 'Time to production' },
  { value: '99%+', label: 'Accuracy rate' },
];

const METRICS_TR = [
  { value: '40+', label: 'Aktif AI sistemi' },
  { value: '3×', label: 'Verimlilik artışı' },
  { value: '8hf', label: 'Yayına alma süresi' },
  { value: '99%+', label: 'Doğruluk oranı' },
];

// ─── Line colour helper ────────────────────────────────────────────────────────
function lineColour(type) {
  switch (type) {
    case 'command': return '#a387fd';
    case 'success': return '#4ade80';
    default:        return '#6b7280';
  }
}

// ─── Terminal animation ────────────────────────────────────────────────────────
function TerminalDisplay({ scenario, onDone }) {
  const [completedLines, setCompletedLines] = useState([]);
  const [typingLine, setTypingLine]         = useState(0);
  const [typingChars, setTypingChars]       = useState(0);
  const [showCursor, setShowCursor]         = useState(true);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  // Typewriter
  useEffect(() => {
    if (typingLine >= scenario.lines.length) {
      onDoneRef.current();
      return;
    }
    const lineText = scenario.lines[typingLine].text;
    if (typingChars < lineText.length) {
      const id = setTimeout(() => setTypingChars(c => c + 1), 26);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setCompletedLines(prev => [...prev, lineText]);
        setTypingLine(l => l + 1);
        setTypingChars(0);
      }, 85);
      return () => clearTimeout(id);
    }
  }, [typingLine, typingChars, scenario]);

  return (
    <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', lineHeight: '1.75', minHeight: '110px' }}>
      <div style={{ color: '#6b7280', marginBottom: '4px' }}># {scenario.comment}</div>

      {completedLines.map((line, i) => (
        <div key={i} style={{ color: lineColour(scenario.lines[i].type) }}>{line}</div>
      ))}

      {typingLine < scenario.lines.length && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: lineColour(scenario.lines[typingLine].type) }}>
            {scenario.lines[typingLine].text.slice(0, typingChars)}
          </span>
          <span style={{ color: '#fff', opacity: showCursor ? 1 : 0, transition: 'opacity 0.07s' }}>▋</span>
        </div>
      )}

      {typingLine >= scenario.lines.length && (
        <span style={{ color: '#fff', opacity: showCursor ? 1 : 0, transition: 'opacity 0.07s' }}>▋</span>
      )}
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
const HeroVideoHeader = () => {
  const { language } = useLanguage();
  const t = (translations[language]?.home?.hero) ?? translations.en.home.hero;

  const scenarios = language === 'tr' ? SCENARIOS_TR : SCENARIOS_EN;
  const metrics   = language === 'tr' ? METRICS_TR   : METRICS_EN;

  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [terminalKey, setTerminalKey] = useState(0);

  const advanceScenario = useCallback(() => {
    const id = setTimeout(() => {
      setScenarioIdx(prev => (prev + 1) % scenarios.length);
      setTerminalKey(k => k + 1);
    }, 3000);
    return () => clearTimeout(id);
  }, [scenarios.length]);

  const trustSignals = language === 'tr'
    ? ['Kurumsal hazır', 'Gizlilik öncelikli', '8 haftada yayında']
    : ['Enterprise-ready', 'Privacy-first', '8-week delivery'];

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center bg-white overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Soft violet radial gradient — top right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '85%',
          background: 'radial-gradient(ellipse at top right, rgba(124,92,252,0.09) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 w-full grid lg:grid-cols-[55fr_45fr] gap-8 sm:gap-12 lg:gap-16 items-center">

        {/* ── LEFT ── */}
        <div>
          {/* H1 */}
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-bold text-slate-900 mb-7 leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.25rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {t.titlePart1}{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {t.titlePart2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 font-light leading-relaxed mb-9 max-w-full sm:max-w-[460px]"
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex items-center gap-4 mb-8 flex-wrap"
          >
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-sm shadow-lg hover:shadow-purple-500/40 transition-all duration-300 text-sm"
            >
              {t.talkToTeam}
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex items-center gap-3 sm:gap-6 flex-wrap"
          >
            {trustSignals.map(signal => (
              <span key={signal} className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="text-purple-500 font-medium">✓</span>
                {signal}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — Terminal card ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, type: 'spring', stiffness: 75, damping: 20 }}
          className="bg-white border border-slate-200 rounded-2xl shadow-[0_8px_48px_rgba(124,92,252,0.10)] overflow-hidden"
        >
          {/* Terminal top bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b border-slate-100"
            style={{ background: '#f5f3ff' }}
          >
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28ca41', display: 'inline-block' }} />
            <span
              className="ml-3 text-slate-400 select-none"
              style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
            >
              pulsara-agent.py
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="px-5 py-5"
            style={{ background: '#0a0812' }}
          >
            <TerminalDisplay
              key={terminalKey}
              scenario={scenarios[scenarioIdx]}
              onDone={advanceScenario}
            />
          </div>

          {/* Metrics 2×2 */}
          <div
            className="grid grid-cols-2"
            style={{ gap: '1px', background: '#e8e4f8' }}
            role="list"
            aria-label={language === 'tr' ? 'Canlı metrikler' : 'Live metrics'}
          >
            {metrics.map(metric => (
              <div key={metric.label} className="bg-white px-3 sm:px-5 py-3 sm:py-4" role="listitem">
                <div
                  className="font-bold leading-none mb-1"
                  style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', color: '#7c5cfc', fontVariantNumeric: 'tabular-nums' }}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroVideoHeader;
