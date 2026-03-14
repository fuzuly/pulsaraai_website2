import React from "react";
import { Link } from "react-router-dom";
import acLogo from "../assets/ac.png"; // ✅ your aviation PNG logo

/* Tiny chart components (pure SVG, no libs) */
const SparkLine = ({ points = "0,18 8,12 16,14 24,8 32,10 40,6 48,9 56,4", stroke = "currentColor" }) => (
  <svg viewBox="0 0 56 22" className="w-full h-10">
    <polyline
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      points={points}
      style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
    />
  </svg>
);

const Donut = ({ value = 78, size = 52, strokeWidth = 6, track = "#e5e7eb", stroke = "currentColor" }) => {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="shrink-0">
      <g transform={`translate(${size / 2},${size / 2}) rotate(-90)`}>
        <circle r={r} fill="none" stroke={track} strokeWidth={strokeWidth} />
        <circle
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(.65,0,.35,1)" }}
        />
      </g>
    </svg>
  );
};

const MiniBars = ({ bars = [40, 65, 55, 80, 50, 70] }) => (
  <div className="flex items-end gap-1 h-14 w-full">
    {bars.map((h, i) => (
      <div
        key={i}
        className="flex-1 rounded"
        style={{
          height: `${h}%`,
          background:
            "linear-gradient(180deg, rgba(168,85,247,0.9) 0%, rgba(99,102,241,0.9) 100%)",
          transition: "transform .4s",
        }}
      />
    ))}
  </div>
);

/* Pretty background: soft radial + grid overlay */
const PageBG = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* gradient wash */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 opacity-90" />
    {/* radial glow */}
    <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-white/20 blur-[100px]" />
    <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-[120px]" />
    {/* subtle grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
    {/* diagonal shine */}
    <div className="absolute -inset-x-20 -top-10 h-40 rotate-6 bg-white/10 blur-2xl" />
  </div>
);

/* -------- Business (generic) card -------- */
const ChoiceCard = ({
  title,
  subtitle,
  to,
  badge,
  bullets = [],
}) => (
  <Link
    to={to}
    className="group relative block rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
  >
    {/* top gloss */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
    {/* purple edge light */}
    <div className="pointer-events-none absolute -inset-px rounded-3xl ring-2 ring-transparent group-hover:ring-purple-400/60 transition" />

    <div className="relative p-7 sm:p-9">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1">
          {badge}
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-slate-600">{subtitle}</p>

      {/* micro KPIs */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-slate-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">Trend</span>
            <span className="text-xs text-emerald-600 font-semibold">+12%</span>
          </div>
          <SparkLine />
        </div>
        <div className="rounded-xl border border-slate-200 p-3 flex items-center justify-center">
          <Donut value={82} />
        </div>
      </div>

      {/* bars */}
      <div className="mt-4 rounded-xl border border-slate-200 p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-500">Summary</span>
          <span className="text-xs text-slate-500">Last 7d</span>
        </div>
        <MiniBars />
      </div>

      {/* bullets */}
      {bullets.length > 0 && (
        <ul className="mt-5 grid gap-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1 h-2 w-2 rounded-full bg-purple-500/80" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-xl bg-purple-600 text-white font-semibold px-5 py-3 transition group-hover:bg-purple-700">
          Enter
          <svg
            className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>

    {/* corner accent */}
    <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl" />
  </Link>
);

/* --- Aviation-specific bars --- */
const MiniBarsAviation = ({ bars = [35, 52, 48, 66, 54, 72] }) => (
  <div className="flex items-end gap-1 h-14 w-full">
    {bars.map((h, i) => (
      <div
        key={i}
        className="flex-1 rounded"
        style={{
          height: `${h}%`,
          background:
            "linear-gradient(180deg, rgba(14,165,233,0.9) 0%, rgba(20,184,166,0.9) 100%)",
        }}
      />
    ))}
  </div>
);

/* --- Aviation card with PNG logo --- */
const AviationChoiceCard = ({ title, subtitle, to, badge, bullets = [] }) => (
  <Link
    to={to}
    className="group relative block rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_10px_40px_rgba(2,6,23,0.08)] hover:shadow-[0_20px_60px_rgba(2,6,23,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
  >
    {/* soft gloss + subtle grid */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-white/30 to-transparent" />
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(2,6,23,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(2,6,23,.35) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    <div className="relative p-7 sm:p-9">
      {/* ✅ plane PNG logo in corner */}
      <img
        src={acLogo}
        alt="Aviation Logo"
        className="absolute top-4 right-4 w-28 h-28 object-contain"
        loading="lazy"
      />

      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1">
          {badge}
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-slate-600">{subtitle}</p>

      {/* aviation widgets */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">Fuel vs Plan</span>
            <span className="text-xs text-emerald-600 font-semibold">+3.2%</span>
          </div>
          <MiniBarsAviation />
        </div>

        <div className="rounded-xl border border-slate-200 p-3 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Fleet Status</div>
            <div className="text-sm text-slate-500">Operational</div>
          </div>
          <Donut value={92} stroke="#0ea5e9" />
        </div>

        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-xs font-semibold text-slate-500 mb-1">Sector Weather</div>
          <SparkLine
            stroke="#06b6d4"
            points="0,16 8,14 16,12 24,18 32,10 40,12 48,8 56,10"
          />
        </div>

        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-xs font-semibold text-slate-500">Active NOTAMs</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">27</div>
          <div className="text-xs text-emerald-600 font-semibold">-5 today</div>
        </div>
      </div>

      {bullets.length > 0 && (
        <ul className="mt-5 grid gap-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1 h-2 w-2 rounded-full bg-sky-500/80" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-xl bg-sky-600 text-white font-semibold px-5 py-3 transition group-hover:bg-sky-700">
          Enter
          <svg
            className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </Link>
);

export default function Chooser() {
  return (
    <div className="relative min-h-screen text-slate-900">
      <PageBG />

      <header className="relative max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
          Welcome to <span className="text-white/90">Pulsara</span>
        </h1>
        <p className="mt-3 text-white/80 max-w-2xl mx-auto">
          Choose your suite to continue.
        </p>
      </header>

      <main className="relative max-w-6xl mx-auto px-6 pb-20">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Business stays with the generic purple charts */}
          <ChoiceCard
            to="/home"
            badge="Business"
            title="Pulsara Business Management"
            subtitle="Wellbeing · Finance · Rostering in one intelligent platform."
            bullets={[
              "Motivation & burnout insights",
              "Automated financial summaries",
              "AI-optimized 24/7 rosters",
            ]}
          />

          {/* Aviation uses the PNG logo variant */}
          <AviationChoiceCard
            to="/aviation"
            badge="Aviation"
            title="Pulsara Aviation"
            subtitle="The operating system for OCC, MCC, and analytics."
            bullets={[
              "Predictive maintenance (MCC)",
              "AI flight planning (OCC)",
              "Operational efficiency analytics",
            ]}
          />
        </div>

        {/* tiny foot hint */}
        <p className="mt-8 text-center text-white/70 text-sm">
          Tip: you can switch anytime using your browser’s back button.
        </p>
      </main>
    </div>
  );
}
