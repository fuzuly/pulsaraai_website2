import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

/* ─── Scroll-trigger hook ─── */
function useInView(threshold = 0.12) {
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
  }, [threshold]);
  return [ref, inView];
}

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Bilingual content ─── */
const content = {
  tr: {
    seo: {
      title: 'Pulsara Intel — Rakip İstihbarat Departmanınız',
      description: 'Rakiplerinizi biz izleriz, siz kararı verin. Haftalık brifing, anlık öneri uyarıları ve aylık strateji raporu ile Türk perakende ve F&B markalarının rekabet yönetimi ortağı.',
    },
    hero: {
      eyebrow: 'Rakip İstihbaratı Hizmeti',
      headline: 'Rakiplerinizi biz izleriz.\nSiz sadece kararı verin.',
      subheadline: 'Pulsara Intel bir dashboard değil. Rakiplerinizi 7/24 izleyen, haftalık brifing hazırlayan ve her önemli hamlede ne yapmanız gerektiğini söyleyen bir ekip.',
      cta1: 'Ücretsiz Brifing Alın',
      cta2: 'Nasıl Çalışır',
    },
    problem: {
      eyebrow: 'Sorun',
      headline: 'Rekabeti takip etmek tam zamanlı bir iş.',
      sub: 'Rakipleriniz hareket ediyor. Siz operasyonla meşgulsünüz.',
      cards: [
        {
          title: 'Fiyat değişimi geç fark edildi',
          desc: 'Rakip fiyatı düşürdüğünde müşterileriniz zaten gitmiş oluyor. Tepki veremeden kaybediyorsunuz.',
        },
        {
          title: 'Yorumlar okunamıyor',
          desc: 'Haftada 200+ rakip yorumu geliyor. Kritik şikayeti bulmak saatler alıyor — ya da hiç bulunmuyor.',
        },
        {
          title: 'Strateji değil, sezgi',
          desc: 'Rakip analizi olmadan her karar reaktif. Veriye değil, tahmine dayanıyorsunuz.',
        },
      ],
    },
    deliver: {
      eyebrow: 'Ne Alıyorsunuz',
      headline: 'Analizi biz yaparız.\nSize sadece karar gelir.',
      sub: 'Pulsara Intel bir araç değil. Her hafta masa başınızda hazır olan rakip istihbarat departmanınız.',
      items: [
        {
          icon: 'briefing',
          title: "Haftalık Rekabet Brifing'i",
          desc: 'Her Pazartesi sabahı gelen net rapor: bu hafta rakiplerinizde ne oldu, ne anlama geliyor ve ne yapmanız öneriliyor.',
          detail: 'PDF + e-posta · Yönetim sunumuna hazır',
        },
        {
          icon: 'alert',
          title: 'Anlık Öneri Uyarıları',
          desc: 'Rakip fiyat değiştirdiğinde, büyük şikayet aldığında veya kampanya başlattığında SMS/WhatsApp ile bildirim + bizim önerimiz.',
          detail: 'Sadece veri değil — ne yapmalısınız?',
        },
        {
          icon: 'strategy',
          title: 'Aylık Strateji Analizi',
          desc: 'Trend analizi, rakip konumlandırma haritası ve önümüzdeki ay için üç stratejik öneri. Yönetim kurulu sunumuna hazır.',
          detail: 'Uzman incelemesi ile · Derinlemesine',
        },
      ],
    },
    process: {
      eyebrow: 'Nasıl Çalışır',
      headline: 'Bir şey yapmanıza gerek yok.',
      steps: [
        { n: '01', title: 'Onboarding (1 gün)', desc: 'Sektörünüzü, rakiplerinizi ve önceliklerinizi öğreniriz. Sonrasını biz hallederiz.' },
        { n: '02', title: 'Sürekli İzleme', desc: 'AI + insan analistlerimiz rakiplerinizi 7/24 takip eder. Fiyat, yorum, kampanya, sosyal medya.' },
        { n: '03', title: 'Biz Analiz Ederiz', desc: 'Ham veriyi değil, gürültüden arındırılmış içgörüleri sunuyoruz. Ne önemli, ne değil — biz karar veririz.' },
        { n: '04', title: 'Aksiyon Teslimi', desc: 'Her hafta brifing, her kritik gelişmede anlık öneri. Siz kararı verirsiniz, biz zeminini hazırlarız.' },
      ],
    },
    sectors: {
      headline: 'Hangi sektörler için?',
      items: [
        { name: 'Kahve & Kafe', emoji: '☕' },
        { name: 'Fast Food', emoji: '🍔' },
        { name: 'Moda & Giyim', emoji: '👗' },
        { name: 'Market & Süpermarket', emoji: '🛒' },
      ],
    },
    useCases: {
      headline: 'Sektörünüze özel rehberler',
      sub: 'Rakip istihbaratının kendi sektörünüzde nasıl çalıştığını keşfedin.',
      items: [
        { emoji: '☕', name: 'Kahve & Kafe', desc: 'Fiyat savaşlarına hazır olun, yorum körleşmesini bitirin.', href: '/tr/rakip-takip/kahve-zincirleri' },
        { emoji: '🍽️', name: 'Restoranlar', desc: 'Rakip restoran hamlelerini anlık izleyin.', href: '/tr/rakip-takip/restoranlar' },
        { emoji: '🍔', name: 'Fast Food', desc: 'Kampanya ve fiyat değişimlerinde öne geçin.', href: '/tr/rakip-takip/fast-food-restoranlar' },
        { emoji: '📍', name: 'Google Haritalar — Restoranlar', desc: 'Google Maps sıralamasını rakiplerinizden önce analiz edin.', href: '/tr/google-haritalar-izleme/restoranlar' },
        { emoji: '☕', name: 'Google Haritalar — Kahve', desc: 'Kahve dükkanı keşfedilebilirliğini artırın.', href: '/tr/google-haritalar-izleme/kahve-dukkanlari' },
        { emoji: '🏙️', name: 'İstanbul Kahve Zincirleri', desc: "İstanbul'da kahve zinciri rekabetini analiz edin.", href: '/tr/istanbul/kahve-zinciri-rakip-analizi' },
      ],
      cta: 'Detaylı incele →',
    },
    faq: {
      headline: 'Sık sorulan sorular',
      items: [
        { q: 'Bu bir yazılım mı yoksa hizmet mi?', a: 'Bir hizmet. Herhangi bir dashboard veya araç kullanmanız gerekmiyor. Ekibimiz ve AI sistemlerimiz rakiplerinizi izler, analiz eder ve size her hafta hazır brifing + anlık öneri olarak sunar.' },
        { q: 'Pilot süresi ne kadar?', a: 'Pilot program 1 aydır. İlk 10 başvuran marka için tamamen ücretsizdir. Pilot sonunda memnun kalmazsanız herhangi bir ücret ödemeniz gerekmez.' },
        { q: 'Hangi rakiplerinizi izliyorsunuz?', a: 'Onboarding sırasında sektörünüzü ve lokasyonunuzu öğreniyoruz. Rakiplerinizi birlikte belirliyoruz — istediğinizi ekleyebilir ya da çıkartabilirsiniz.' },
        { q: 'Haftalık brifing ne içeriyor?', a: 'Bu hafta rakiplerinizde öne çıkan gelişmeler, fiyat değişimleri, yorum trendleri ve bizim aksiyon önerilerimiz. Yönetim sunumuna hazır, sade ve okunabilir format.' },
        { q: 'Sözleşme zorunluluğu var mı?', a: 'Pilot döneminde herhangi bir sözleşme yoktur. Pilot sonrasında aylık veya yıllık hizmet seçenekleri sunulur.' },
        { q: 'Kurulum veya entegrasyon gerekiyor mu?', a: 'Hayır. Hiçbir kurulum, entegrasyon veya teknik iş gerekmez. Brifingler e-posta ve PDF ile, uyarılar SMS/WhatsApp ile gelir.' },
      ],
    },
    form: {
      headline: 'Ücretsiz pilot için başvurun',
      subhead: 'İlk 10 marka için 1 ay ücretsiz — kurulum yok, sözleşme yok',
      brand: 'Marka Adı',
      sector: 'Sektör',
      sectorPlaceholder: 'Sektör seçin',
      sectorOptions: ['Kahve & Kafe', 'Fast Food', 'Moda & Giyim', 'Market / Süpermarket', 'Diğer'],
      contact: 'Şirket Yetkilisi Adı',
      email: 'E-posta',
      phone: 'Telefon',
      size: 'Şube Sayısı',
      sizePlaceholder: 'Şube sayısı seçin',
      sizeOptions: ['1-10 şube', '11-50 şube', '50+ şube'],
      notes: 'Öncelikli rakipleriniz veya sorularınız',
      notesPlaceholder: 'Hangi rakipleri izlememizi istiyorsunuz? Özel sorularınız var mı?',
      submit: 'Ücretsiz Pilot Başvurusu',
      privacy: 'Verileriniz KVKK kapsamında korunur, üçüncü taraflarla paylaşılmaz.',
      thanks: 'Başvurunuz alındı. 48 saat içinde sizi arayacağız.',
      valid: 'Geçerli',
      errors: {
        brand: 'Marka adı gereklidir',
        sector: 'Sektör seçimi gereklidir',
        contact: 'Yetkili adı gereklidir',
        emailRequired: 'E-posta gereklidir',
        emailInvalid: 'Geçerli bir e-posta adresi giriniz',
        phone: 'Telefon numarası gereklidir',
        size: 'Şube sayısı seçimi gereklidir',
      },
    },
    footerCta: {
      headline: "İlk brifing'inizi ücretsiz alın.",
      sub: 'İlk 10 pilot hakkı dolmadan başvurun.',
      btn: 'Pilot Başvurusu',
    },
  },
  en: {
    seo: {
      title: 'Pulsara Intel — Your Outsourced Competitor Intelligence Department',
      description: 'We monitor your competitors. You make the calls. Weekly briefings, real-time action alerts, and monthly strategy reports for Turkish retail and F&B brands.',
    },
    hero: {
      eyebrow: 'Competitor Intelligence Service',
      headline: 'We monitor your competitors.\nYou make the decisions.',
      subheadline: "Pulsara Intel is not a dashboard. It's a dedicated team that watches your competitors 24/7, prepares weekly briefings, and tells you what to do when something important happens.",
      cta1: 'Get a Free Briefing',
      cta2: 'See How It Works',
    },
    problem: {
      eyebrow: 'The Problem',
      headline: 'Competitor intelligence is a full-time job.',
      sub: "Your competitors are moving. You're busy running the business.",
      cards: [
        {
          title: 'Price changes spotted too late',
          desc: "By the time you notice a competitor dropped their price, your customers have already left.",
        },
        {
          title: 'Reviews go unread',
          desc: '200+ competitor reviews per week. Finding the critical complaint takes hours — or never happens.',
        },
        {
          title: 'Strategy based on gut, not data',
          desc: "Without structured intelligence, every decision is reactive. You're always a step behind.",
        },
      ],
    },
    deliver: {
      eyebrow: 'What You Receive',
      headline: 'We do the analysis.\nYou get the decisions.',
      sub: "Pulsara Intel is not a tool. It's your competitor intelligence department — ready every week, without any effort from your team.",
      items: [
        {
          icon: 'briefing',
          title: 'Weekly Intelligence Briefing',
          desc: 'Every Monday morning: what happened with your competitors this week, what it means, and what we recommend you do.',
          detail: 'PDF + email · Boardroom-ready',
        },
        {
          icon: 'alert',
          title: 'Real-Time Action Alerts',
          desc: "When a competitor changes a price, receives a surge of negative reviews, or launches a campaign — SMS/WhatsApp with our recommended response.",
          detail: 'Not just data — what should you do next?',
        },
        {
          icon: 'strategy',
          title: 'Monthly Strategy Report',
          desc: 'Trend analysis, competitor positioning map, and three strategic recommendations for the month ahead.',
          detail: 'In-depth · Expert-reviewed',
        },
      ],
    },
    process: {
      eyebrow: 'How It Works',
      headline: "You don't have to do anything.",
      steps: [
        { n: '01', title: 'Onboarding (1 day)', desc: 'We learn your sector, competitors, and priorities. Then we handle everything.' },
        { n: '02', title: 'Continuous Monitoring', desc: 'Our AI + human analysts track your competitors 24/7. Prices, reviews, campaigns, social media.' },
        { n: '03', title: 'We Analyze', desc: "We don't send raw data. We filter noise, identify what matters, and form a clear view." },
        { n: '04', title: 'Action Delivery', desc: 'Weekly briefings, instant alerts on critical moves. You decide — we give you the ground truth.' },
      ],
    },
    sectors: {
      headline: 'Which sectors?',
      items: [
        { name: 'Coffee & Café', emoji: '☕' },
        { name: 'Fast Food', emoji: '🍔' },
        { name: 'Fashion & Apparel', emoji: '👗' },
        { name: 'Grocery & Supermarket', emoji: '🛒' },
      ],
    },
    useCases: {
      headline: 'Sector-specific guides',
      sub: 'Discover how competitor intelligence works for your sector.',
      items: [
        { emoji: '☕', name: 'Coffee & Café', desc: 'Be ready for price wars, end review blindness.', href: '/tr/rakip-takip/kahve-zincirleri' },
        { emoji: '🍽️', name: 'Restaurants', desc: 'Monitor competitor restaurant moves in real time.', href: '/tr/rakip-takip/restoranlar' },
        { emoji: '🍔', name: 'Fast Food', desc: 'Stay ahead of campaign and price changes.', href: '/tr/rakip-takip/fast-food-restoranlar' },
        { emoji: '📍', name: 'Google Maps — Restaurants', desc: 'Analyze Google Maps rankings before your competitors.', href: '/tr/google-haritalar-izleme/restoranlar' },
        { emoji: '☕', name: 'Google Maps — Coffee', desc: 'Improve coffee shop discoverability.', href: '/tr/google-haritalar-izleme/kahve-dukkanlari' },
        { emoji: '🏙️', name: 'Istanbul Coffee Chains', desc: 'Analyze coffee chain competition in Istanbul.', href: '/tr/istanbul/kahve-zinciri-rakip-analizi' },
      ],
      cta: 'Read guide →',
    },
    faq: {
      headline: 'Frequently asked questions',
      items: [
        { q: 'Is this a software tool or a service?', a: "A service. You don't use any dashboard or tool. Our team and AI systems monitor your competitors, analyze the data, and deliver weekly briefings + real-time action alerts directly to you." },
        { q: 'How long is the pilot?', a: "The pilot runs for 1 month and is completely free for the first 10 applicants. If you're not satisfied, you pay nothing." },
        { q: 'Which competitors do you monitor?', a: 'During onboarding we learn your sector and location. We identify competitors together — you can add or remove any of them.' },
        { q: "What's in the weekly briefing?", a: 'Key developments from your competitors this week, price changes, review trends, and our action recommendations. Clear, readable, boardroom-ready.' },
        { q: 'Is a contract required?', a: 'No contract during the pilot period. After the pilot, monthly or annual service options are available.' },
        { q: 'Is any setup or integration required?', a: 'None. No installation, integration, or technical work needed. Briefings arrive via email and PDF; alerts via SMS/WhatsApp.' },
      ],
    },
    form: {
      headline: 'Apply for your free pilot',
      subhead: 'Free for the first 10 brands — no setup, no contract',
      brand: 'Brand Name',
      sector: 'Sector',
      sectorPlaceholder: 'Select sector',
      sectorOptions: ['Coffee & Café', 'Fast Food', 'Fashion & Apparel', 'Grocery / Supermarket', 'Other'],
      contact: 'Company Representative Name',
      email: 'Email',
      phone: 'Phone',
      size: 'Number of Branches',
      sizePlaceholder: 'Select branch count',
      sizeOptions: ['1-10 branches', '11-50 branches', '50+ branches'],
      notes: 'Priority competitors or questions',
      notesPlaceholder: 'Which competitors do you want us to monitor? Any specific questions?',
      submit: 'Apply for Free Pilot',
      privacy: 'Your data is protected under KVKK and will not be shared with third parties.',
      thanks: "Application received. We'll call you within 48 hours.",
      valid: 'Valid',
      errors: {
        brand: 'Brand name is required',
        sector: 'Sector selection is required',
        contact: 'Representative name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        phone: 'Phone number is required',
        size: 'Branch count selection is required',
      },
    },
    footerCta: {
      headline: 'Get your first briefing free.',
      sub: 'Apply before the first 10 pilot spots fill up.',
      btn: 'Apply for Pilot',
    },
  },
};

/* ─── Deliver section icons ─── */
const DeliverIcons = {
  briefing: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M5 8h14M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
    </svg>
  ),
  alert: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  strategy: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4M2 12h4m12 0h4m-4.93-7.07-2.83 2.83M9.76 14.24l-2.83 2.83m0-12.14 2.83 2.83m4.48 4.48 2.83 2.83" />
    </svg>
  ),
};

const deliverColors = {
  briefing: { ring: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', pill: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  alert:    { ring: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20',   pill: 'bg-amber-500/10 text-amber-300 border-amber-500/20'   },
  strategy: { ring: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20',     pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'       },
};

/* ─── Weekly Briefing mockup ─── */
const IntelBriefing = () => (
  <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-[0_0_80px_-15px_rgba(168,85,247,0.3)] border border-white/10 overflow-hidden">
    {/* Window chrome */}
    <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-red-500/80" />
      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
      <span className="text-xs text-slate-400 font-mono ml-3 truncate">Haftalık Rekabet Brifing'i</span>
      <span className="ml-auto text-xs text-slate-500 font-mono">15 Haz 2025</span>
      <span className="ml-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Teslim Edildi ✓
      </span>
    </div>

    <div className="p-4 sm:p-6">
      {/* Summary row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Bu hafta</p>
          <p className="text-xl font-bold text-white">3 kritik gelişme</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Analiz edildi</p>
          <p className="text-sm font-semibold text-slate-300">847 yorum · 20 rakip</p>
        </div>
      </div>

      {/* Briefing items */}
      <div className="space-y-3 mb-5">
        {/* Warning */}
        <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-red-300">Fiyat Hamlesi — Rakip A</p>
              <p className="text-xs text-slate-400 mt-0.5">Büyük boy ₺95 → ₺79'a düştü</p>
              <div className="mt-2.5 bg-slate-900/60 border border-white/5 rounded-lg px-3 py-2">
                <p className="text-xs text-slate-300 leading-relaxed">🎯 <span className="font-semibold text-purple-300">Önerimiz:</span> Sadık müşteri kampanyası başlatın, fiyata yanıt vermeyin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity */}
        <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">📉</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-emerald-300">Şikayet Artışı — Rakip B</p>
              <p className="text-xs text-slate-400 mt-0.5">Servis hızı şikayetleri %34 arttı</p>
              <div className="mt-2.5 bg-slate-900/60 border border-white/5 rounded-lg px-3 py-2">
                <p className="text-xs text-slate-300 leading-relaxed">🎯 <span className="font-semibold text-purple-300">Önerimiz:</span> "Hızlı Servis" mesajını öne çıkarın</p>
              </div>
            </div>
          </div>
        </div>

        {/* Neutral */}
        <div className="bg-white/4 border border-white/8 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">👀</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-300">Yeni Ürün — Rakip C</p>
              <p className="text-xs text-slate-400 mt-0.5">Sezonluk içecek serisi duyuruldu</p>
              <div className="mt-2.5 bg-slate-900/60 border border-white/5 rounded-lg px-3 py-2">
                <p className="text-xs text-slate-300 leading-relaxed">🎯 <span className="font-semibold text-purple-300">Önerimiz:</span> İzleyin — şu an tepki gerekmez</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 pt-4 flex items-center justify-between">
        <p className="text-xs text-slate-500 italic">Analizi biz yaptık. Karar sizin.</p>
        <button className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">Tam raporu oku →</button>
      </div>
    </div>
  </div>
);

/* ─── Validation ─── */
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validateField(name, value, f) {
  if (name === 'brand')   return value.trim() ? '' : f.errors.brand;
  if (name === 'sector')  return value ? '' : f.errors.sector;
  if (name === 'contact') return value.trim() ? '' : f.errors.contact;
  if (name === 'email') {
    if (!value.trim()) return f.errors.emailRequired;
    if (!validateEmail(value)) return f.errors.emailInvalid;
    return '';
  }
  if (name === 'phone') return value.trim() ? '' : f.errors.phone;
  if (name === 'size')  return value ? '' : f.errors.size;
  return '';
}

const Field = ({ id, label, error, touched, valid, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>
    {children}
    {touched && error && (
      <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
    {touched && !error && valid && (
      <p className="mt-1.5 text-sm text-emerald-400 flex items-center gap-1.5">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {valid}
      </p>
    )}
  </div>
);

const inputCls = (touched, error) =>
  `w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors bg-white/5 text-white placeholder-slate-500 ${
    touched && error
      ? 'border-red-500/50 focus:border-red-500 focus:bg-white/10'
      : touched && !error
      ? 'border-emerald-500/50 focus:border-emerald-500 focus:bg-white/10'
      : 'border-white/10 focus:border-purple-500 focus:bg-white/10'
  }`;

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
const PulsaraIntel = () => {
  const { language } = useLanguage();
  const c = content[language] || content.tr;
  const f = c.form;

  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ brand: '', sector: '', contact: '', email: '', phone: '', size: '', notes: '' });
  const [errors, setErrors]   = useState({ brand: '', sector: '', contact: '', email: '', phone: '', size: '' });
  const [touched, setTouched] = useState({ brand: false, sector: false, contact: false, email: false, phone: false, size: false });

  const isThanks = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('thanks') === '1';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors(prev => ({ ...prev, [name]: validateField(name, value, f) }));
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value, f) }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const required = ['brand', 'sector', 'contact', 'email', 'phone', 'size'];
    const allTouched = Object.fromEntries(required.map(k => [k, true]));
    const newErrors  = Object.fromEntries(required.map(k => [k, validateField(k, formData[k], f)]));
    setTouched(allTouched);
    setErrors(newErrors);
    if (required.every(k => !newErrors[k])) e.target.submit();
  };

  const [heroRef,    heroInView]    = useInView(0.05);
  const [problemRef, problemInView] = useInView();
  const [deliverRef, deliverInView] = useInView();
  const [processRef, processInView] = useInView();
  const [sectRef,    sectInView]    = useInView();
  const [faqRef,     faqInView]     = useInView();

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 selection:bg-purple-500/30">
      <SEO title={c.seo.title} description={c.seo.description} />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none transform translate-y-1/3" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center"
          >
            {/* Left copy */}
            <div>
              <motion.div variants={fadeUp} className="mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  {c.hero.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 leading-tight mb-6 whitespace-pre-line"
              >
                {c.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-xl"
              >
                {c.hero.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#pilot-form"
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg text-center shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:scale-105 transition-all duration-300"
                >
                  {c.hero.cta1}
                </a>
                <a
                  href="#process"
                  className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded-lg text-center hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                >
                  {c.hero.cta2}
                </a>
              </motion.div>
            </div>

            {/* Right — briefing mockup */}
            <motion.div variants={fadeUp} className="lg:pl-4">
              <IntelBriefing />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. PROBLEM
      ══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={problemRef}
            initial="hidden"
            animate={problemInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="inline-block mb-4 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold tracking-wide uppercase">
                {c.problem.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{c.problem.headline}</h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">{c.problem.sub}</p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {c.problem.cards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-red-500/30 hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-200 mb-3">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. WHAT YOU RECEIVE
      ══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div
            ref={deliverRef}
            initial="hidden"
            animate={deliverInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="inline-block mb-4 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-wide uppercase">
                {c.deliver.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 whitespace-pre-line">{c.deliver.headline}</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">{c.deliver.sub}</p>
            </motion.div>

            <motion.div variants={stagger} className="flex flex-col gap-5 max-w-4xl mx-auto">
              {c.deliver.items.map((item, i) => {
                const col = deliverColors[item.icon];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white/4 backdrop-blur-sm rounded-2xl border border-white/8 hover:border-white/15 hover:bg-white/8 transition-all duration-400 group"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-6 p-7 sm:p-8">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center flex-shrink-0 ${col.bg} ${col.ring} group-hover:scale-110 transition-transform duration-400`}>
                        {DeliverIcons[item.icon]}
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-slate-100">{item.title}</h3>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${col.pill}`}>
                            {item.detail}
                          </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. OUR PROCESS
      ══════════════════════════════════════════ */}
      <section id="process" className="relative py-24 sm:py-32 bg-slate-900/50 border-y border-white/5 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div
            ref={processRef}
            initial="hidden"
            animate={processInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-20">
              <span className="inline-block mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                {c.process.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{c.process.headline}</h2>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {c.process.steps.map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center group">
                    <div className="relative z-10 w-24 h-24 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6 shadow-xl group-hover:-translate-y-2 group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-400 font-extrabold text-3xl">{step.n}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-200 mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed px-2">{step.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. SECTORS & FAQ
      ══════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={sectRef}
            initial="hidden"
            animate={sectInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {/* Sectors */}
            <div>
              <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white mb-8">{c.sectors.headline}</motion.h2>
              <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
                {c.sectors.items.map((sector, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-colors text-center"
                  >
                    <div className="text-4xl mb-4">{sector.emoji}</div>
                    <p className="text-sm font-semibold text-slate-300">{sector.name}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* FAQ */}
            <div ref={faqRef}>
              <motion.h2
                initial="hidden"
                animate={sectInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                className="text-3xl font-extrabold text-white mb-8"
              >
                {c.faq.headline}
              </motion.h2>
              <motion.div
                initial="hidden"
                animate={sectInView ? 'visible' : 'hidden'}
                variants={stagger}
                className="space-y-4"
              >
                {c.faq.items.map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <button
                      className="w-full px-6 py-4 text-left font-semibold text-slate-200 flex justify-between items-center hover:bg-white/5 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {item.q}
                      <span className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. USE CASES
      ══════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{c.useCases.headline}</h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">{c.useCases.sub}</p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {c.useCases.items.map((item, i) => (
                <motion.a
                  key={i}
                  variants={fadeUp}
                  href={item.href}
                  className="bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 rounded-2xl p-6 transition-all duration-300 group block"
                >
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="text-base font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-sm text-purple-400 group-hover:text-purple-300 font-semibold transition-colors">{c.useCases.cta}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. PILOT FORM
      ══════════════════════════════════════════ */}
      <section id="pilot-form" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{f.headline}</h2>
              <p className="text-purple-300 text-lg">{f.subhead}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10">
              {isThanks && (
                <div className="mb-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-emerald-400 text-center shadow-lg">
                  <svg className="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-bold text-lg">{f.thanks}</p>
                </div>
              )}

              <form
                action="https://formspree.io/f/xpqylrkk"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-8"
                noValidate
              >
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.origin + '/pulsara-intel?thanks=1' : 'https://pulsaraai.com/pulsara-intel?thanks=1'} />
                <input type="hidden" name="_subject" value="Pulsara Intel — Yeni Pilot Başvurusu" />
                <input type="text" name="_gotcha" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field id="brand" label={f.brand} error={errors.brand} touched={touched.brand} valid={touched.brand && !errors.brand && formData.brand ? f.valid : ''}>
                    <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} onBlur={handleBlur} required className={inputCls(touched.brand, errors.brand)} placeholder="Pulsara Kafe" />
                  </Field>
                  <Field id="sector" label={f.sector} error={errors.sector} touched={touched.sector} valid={touched.sector && !errors.sector && formData.sector ? f.valid : ''}>
                    <select id="sector" name="sector" value={formData.sector} onChange={handleChange} onBlur={handleBlur} required className={inputCls(touched.sector, errors.sector)}>
                      <option value="" className="bg-slate-900 text-slate-400">{f.sectorPlaceholder}</option>
                      {f.sectorOptions.map(o => <option key={o} value={o} className="bg-slate-900 text-white">{o}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field id="contact" label={f.contact} error={errors.contact} touched={touched.contact} valid={touched.contact && !errors.contact && formData.contact ? f.valid : ''}>
                    <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} onBlur={handleBlur} required className={inputCls(touched.contact, errors.contact)} placeholder="Ahmet Yılmaz" />
                  </Field>
                  <Field id="email" label={f.email} error={errors.email} touched={touched.email} valid={touched.email && !errors.email && formData.email ? f.valid : ''}>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required className={inputCls(touched.email, errors.email)} placeholder="ahmet@pulsarakafe.com" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field id="phone" label={f.phone} error={errors.phone} touched={touched.phone} valid={touched.phone && !errors.phone && formData.phone ? f.valid : ''}>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} required className={inputCls(touched.phone, errors.phone)} placeholder="+90 532 000 00 00" />
                  </Field>
                  <Field id="size" label={f.size} error={errors.size} touched={touched.size} valid={touched.size && !errors.size && formData.size ? f.valid : ''}>
                    <select id="size" name="size" value={formData.size} onChange={handleChange} onBlur={handleBlur} required className={inputCls(touched.size, errors.size)}>
                      <option value="" className="bg-slate-900 text-slate-400">{f.sizePlaceholder}</option>
                      {f.sizeOptions.map(o => <option key={o} value={o} className="bg-slate-900 text-white">{o}</option>)}
                    </select>
                  </Field>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-slate-300 mb-2">{f.notes}</label>
                  <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none transition-colors resize-none text-white placeholder-slate-500"
                    placeholder={f.notesPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-5 mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all duration-500 text-lg tracking-wide hover:scale-[1.02]"
                >
                  {f.submit}
                </button>
                <p className="text-center text-xs text-slate-500 leading-relaxed mt-6">{f.privacy}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PulsaraIntel;
