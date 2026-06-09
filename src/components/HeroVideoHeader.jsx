import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

/* ─── Bilingual copy ─── */
const COPY = {
  en: {
    headline: 'Clarity. Focus. Impact.',
    subtitle: 'We turn complex ideas into effortless experiences',
  },
  tr: {
    headline: 'Netlik. Odak. Etki.',
    subtitle: 'Karmaşık fikirleri zahmetsiz deneyimlere dönüştürüyoruz.',
  },
};

/* ─── Animated wave canvas ─── */
const WaveCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    let tick = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    /* Draw one filled wave layer */
    const drawLayer = (w, h, baseY, amp, freq, sp, phase, stops) => {
      ctx.beginPath();
      ctx.moveTo(0, h);

      /* Smooth quadratic curve through sampled points */
      const pts = [];
      for (let x = 0; x <= w; x += 4) {
        const nx = x / w;
        const t1 = nx * Math.PI * 2 * freq  + tick * sp        + phase;
        const t2 = nx * Math.PI * 2 * freq * 0.43 + tick * sp * 1.6 + phase * 1.9;
        pts.push({ x, y: baseY + Math.sin(t1) * amp + Math.sin(t2) * amp * 0.38 });
      }

      ctx.lineTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.lineTo(w, h);
      ctx.closePath();

      const g = ctx.createLinearGradient(0, 0, w, 0);
      stops.forEach(([pos, col]) => g.addColorStop(pos, col));
      ctx.fillStyle = g;
      ctx.fill();
    };

    const render = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      /* ── Wave layers back → front ── */
      /* deep base */
      drawLayer(w, h, h * 0.80, 44, 1.1, 0.0018, 0.00,  [
        [0,    'rgba(90,10,3,0.75)'],
        [0.38, 'rgba(170,35,5,0.85)'],
        [0.65, 'rgba(55,85,12,0.65)'],
        [1,    'rgba(18,38,5,0.50)'],
      ]);

      /* mid layer */
      drawLayer(w, h, h * 0.68, 38, 1.45, 0.0024, 2.10, [
        [0,    'rgba(130,18,5,0.60)'],
        [0.30, 'rgba(215,58,8,0.78)'],
        [0.60, 'rgba(70,105,16,0.55)'],
        [1,    'rgba(25,52,8,0.42)'],
      ]);

      /* top accent */
      drawLayer(w, h, h * 0.58, 28, 1.85, 0.0030, 4.20, [
        [0,    'rgba(75,7,2,0.50)'],
        [0.28, 'rgba(195,48,6,0.70)'],
        [0.58, 'rgba(38,68,7,0.58)'],
        [1,    'rgba(12,28,4,0.38)'],
      ]);

      /* narrow bright crest */
      drawLayer(w, h, h * 0.73, 22, 2.40, 0.0038, 1.55, [
        [0,    'rgba(110,14,3,0.45)'],
        [0.35, 'rgba(240,70,10,0.60)'],
        [0.62, 'rgba(45,78,10,0.50)'],
        [1,    'rgba(15,32,4,0.32)'],
      ]);

      /* ── Glow blobs ── */
      const gx = w * (0.32 + 0.06 * Math.sin(tick * 0.0012));
      const gy = h * (0.55 + 0.05 * Math.cos(tick * 0.0009));
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.55;
      // orange-red glow
      const rg1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.28);
      rg1.addColorStop(0,   'rgba(255,80,10,0.55)');
      rg1.addColorStop(0.5, 'rgba(200,40,5,0.20)');
      rg1.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = rg1;
      ctx.fillRect(0, 0, w, h);
      // subtle green glow right side
      const gx2 = w * (0.68 + 0.04 * Math.sin(tick * 0.0010 + 1.8));
      const gy2 = h * (0.65 + 0.04 * Math.cos(tick * 0.0007 + 0.9));
      const rg2 = ctx.createRadialGradient(gx2, gy2, 0, gx2, gy2, w * 0.22);
      rg2.addColorStop(0,   'rgba(60,120,15,0.45)');
      rg2.addColorStop(0.5, 'rgba(30,80,8,0.15)');
      rg2.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = rg2;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      /* ── Top fade: hard black → transparent (hides top of wave) ── */
      const fadeTop = ctx.createLinearGradient(0, 0, 0, h * 0.52);
      fadeTop.addColorStop(0, 'rgba(0,0,0,1)');
      fadeTop.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fadeTop;
      ctx.fillRect(0, 0, w, h);

      /* ── Bottom fade to black ── */
      const fadeBot = ctx.createLinearGradient(0, h * 0.82, 0, h);
      fadeBot.addColorStop(0, 'rgba(0,0,0,0)');
      fadeBot.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = fadeBot;
      ctx.fillRect(0, 0, w, h);

      tick++;
      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};

/* ─── Hero ─── */
const HeroVideoHeader = () => {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;

  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Text */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 1.5rem',
          userSelect: 'none',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
            fontWeight: 300,
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            background: 'linear-gradient(90deg, #7dd3fc 0%, #a78bfa 40%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 1.4rem 0',
          }}
        >
          {c.headline}
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            fontWeight: 300,
            letterSpacing: '0.01em',
            margin: 0,
          }}
        >
          {c.subtitle}
        </p>
      </div>

      {/* Wave */}
      <WaveCanvas />
    </section>
  );
};

export default HeroVideoHeader;
