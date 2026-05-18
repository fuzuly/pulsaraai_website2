import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

/* ─── Scroll-trigger hook (same pattern as Services) ─── */
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
  }, []);
  return [ref, inView];
}

/* ─── Animation variants (same as Products / Services) ─── */
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
      title: 'Pulsara Intel — AI Destekli Rakip Takip Platformu',
      description: 'Türk perakende ve F&B markaları için rakip analizi, fiyat takibi ve haftalık AI raporları — hepsi tek platformda.',
    },
    hero: {
      badge: 'Yeni Ürün',
      headline: 'Rakiplerinizi sizin için izleyen yapay zeka',
      subheadline: 'Türk perakende ve F&B markaları için rakip analizi, fiyat takibi ve haftalık AI raporları — hepsi tek platformda.',
      cta1: 'Pilot Başvurusu',
      cta2: 'Demo İste',
    },
    problem: {
      headline: 'Rakip takibi neden bu kadar zor?',
      cards: [
        {
          title: 'Manuel takip günler alıyor',
          desc: 'Manuel Excel takibi günler alıyor, yine eksik kalıyor.',
        },
        {
          title: 'Hangi yorum kritik bilinmiyor',
          desc: 'Yüzlerce yorum arasında hangi şikayet kritik olduğunu bilemiyorsunuz.',
        },
        {
          title: 'Fiyat değişimleri geç fark ediliyor',
          desc: 'Rakip fiyat değişimini fark ettiğinizde zaten geç oluyor.',
        },
      ],
    },
    howItWorks: {
      headline: 'Pulsara Intel nasıl çalışır?',
      steps: [
        { n: '01', title: 'Sektörünüzü seçin', desc: '20 rakip otomatik bulunur ve izlemeye başlanır.' },
        { n: '02', title: 'AI yorumları analiz eder', desc: 'Türkçe sentiment analizi ve kategori etiketleme ile kritik içgörüler.' },
        { n: '03', title: 'Fiyatlar 24/7 takip edilir', desc: 'Değişimde anlık uyarı — hiçbir hamleyi kaçırmayın.' },
        { n: '04', title: 'Haftalık hazır rapor', desc: 'Her Pazartesi yönetime sunuma hazır AI raporu.' },
      ],
    },
    features: {
      headline: 'Tüm özellikler',
      items: [
        { title: 'Otomatik Rakip Keşfi', desc: 'Sektörünüzü girin, platform rakiplerinizi otomatik belirler.' },
        { title: 'Türkçe AI Yorum Analizi', desc: 'Google Maps yorumlarını Türkçe sentiment ile kategorize eder.' },
        { title: 'Fiyat Değişim Takibi', desc: 'Rakip fiyatlarını sürekli izler, değişimde anında bildirir.' },
        { title: 'Haftalık AI Raporu (PDF)', desc: 'Her Pazartesi yönetime hazır, okunabilir PDF raporu.' },
        { title: 'Anlık Uyarılar', desc: 'Kritik değişimlerde SMS, e-posta veya push bildirim.' },
        { title: 'Çoklu Şube Yönetimi', desc: 'Tüm şubelerinizi ve rakiplerini tek ekrandan takip edin.' },
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
    trust: {
      headline: "Türkiye'nin önde gelen markaları için geliştirildi",
      note: 'Referans logolar yakında eklenecek.',
      items: ['Kahve zinciri', 'Moda markası', 'Fast food zinciri', 'Süpermarket grubu'],
    },
    form: {
      headline: 'Pilot programına başvurun',
      subhead: 'İlk 10 marka için 3 ay ücretsiz pilot kullanım',
      brand: 'Marka Adı',
      sector: 'Sektör',
      sectorPlaceholder: 'Sektör seçin',
      sectorOptions: ['Kahve & Kafe', 'Fast Food', 'Moda & Giyim', 'Market / Süpermarket', 'Diğer'],
      contact: 'Şirket Yetkilisi Adı',
      email: 'E-posta',
      phone: 'Telefon',
      size: 'Şirket Büyüklüğü',
      sizePlaceholder: 'Büyüklük seçin',
      sizeOptions: ['1-10 şube', '11-50 şube', '50+ şube'],
      notes: 'Notlar / Sorular',
      notesPlaceholder: 'Varsa ek sorularınızı yazabilirsiniz...',
      submit: 'Başvuruyu Gönder',
      privacy: 'Verileriniz KVKK kapsamında korunur, üçüncü taraflarla paylaşılmaz.',
      thanks: 'Başvurunuz alındı. 48 saat içinde size dönüş yapacağız.',
      valid: 'Geçerli',
      errors: {
        brand: 'Marka adı gereklidir',
        sector: 'Sektör seçimi gereklidir',
        contact: 'Yetkili adı gereklidir',
        emailRequired: 'E-posta gereklidir',
        emailInvalid: 'Geçerli bir e-posta adresi giriniz',
        phone: 'Telefon numarası gereklidir',
        size: 'Şirket büyüklüğü seçimi gereklidir',
      },
    },
    faq: {
      headline: 'Sık sorulan sorular',
      items: [
        { q: 'Pilot süresi ne kadar?', a: 'Pilot program 3 aydır. İlk 10 başvuran marka için tamamen ücretsizdir.' },
        { q: 'Hangi rakiplerimi izleyebilirim?', a: 'Sektörünüzü ve konumunuzu belirttiğinizde sistem otomatik olarak 20 rakip tespit eder. İstediğiniz rakipleri manuel olarak da ekleyebilirsiniz.' },
        { q: 'Veriler nereden geliyor?', a: 'Google Maps yorumları, sosyal medya verileri ve kamuya açık fiyat bilgileri AI tarafından gerçek zamanlı analiz edilir.' },
        { q: 'Sözleşme zorunluluğu var mı?', a: 'Pilot döneminde herhangi bir sözleşme yoktur. Pilot sonrasında aylık veya yıllık abonelik seçenekleri sunulur.' },
        { q: 'Pilot sonrası fiyatlandırma nasıl?', a: 'Fiyatlandırma şube sayısı ve takip edilen rakip sayısına göre belirlenir. Pilot süresince kişiselleştirilmiş bir teklif sunulur.' },
        { q: 'Entegrasyon veya kurulum gerekiyor mu?', a: 'Hayır. Pulsara Intel tamamen bulut tabanlıdır, herhangi bir kurulum veya teknik entegrasyon gerekmez.' },
      ],
    },
    footerCta: {
      headline: 'Hazır mısınız?',
      sub: 'İlk 10 pilot hakkı hızla dolduruluyor. Hemen başvurun.',
      btn: 'Pilot Başvurusu',
    },
  },
  en: {
    seo: {
      title: 'Pulsara Intel — AI-Powered Competitor Monitoring Platform',
      description: 'Competitor analysis, price tracking and weekly AI reports for Turkish retail and F&B brands — all in one platform.',
    },
    hero: {
      badge: 'New Product',
      headline: 'The AI that monitors your competitors for you',
      subheadline: 'Competitor analysis, price tracking, and weekly AI reports for Turkish retail and F&B brands — all in one platform.',
      cta1: 'Apply for Pilot',
      cta2: 'Request Demo',
    },
    problem: {
      headline: 'Why is competitor tracking so hard?',
      cards: [
        {
          title: 'Manual tracking takes days',
          desc: 'Manual spreadsheet tracking takes days and is still incomplete.',
        },
        {
          title: "You don't know which review is critical",
          desc: "Hundreds of reviews — you can't tell which complaints matter most.",
        },
        {
          title: 'Price changes are spotted too late',
          desc: "By the time you notice a competitor's price change, it's already too late.",
        },
      ],
    },
    howItWorks: {
      headline: 'How does Pulsara Intel work?',
      steps: [
        { n: '01', title: 'Select your sector', desc: '20 competitors are automatically found and monitored.' },
        { n: '02', title: 'AI analyzes reviews', desc: 'Turkish sentiment analysis and category tagging for critical insights.' },
        { n: '03', title: 'Prices tracked 24/7', desc: 'Instant alerts on changes — never miss a move.' },
        { n: '04', title: 'Weekly ready report', desc: 'Every Monday, a presentation-ready AI report for leadership.' },
      ],
    },
    features: {
      headline: 'All features',
      items: [
        { title: 'Automatic Competitor Discovery', desc: 'Enter your sector and the platform identifies your competitors automatically.' },
        { title: 'Turkish AI Review Analysis', desc: 'Categorizes Google Maps reviews with Turkish sentiment analysis.' },
        { title: 'Price Change Tracking', desc: 'Continuously monitors competitor prices, instant notification on change.' },
        { title: 'Weekly AI Report (PDF)', desc: 'Every Monday, a readable, presentation-ready PDF report.' },
        { title: 'Instant Alerts', desc: 'SMS, email, or push notification on critical changes.' },
        { title: 'Multi-Branch Management', desc: 'Track all your branches and competitors from one screen.' },
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
    trust: {
      headline: "Built for Turkey's leading brands",
      note: 'Reference logos coming soon.',
      items: ['Coffee chain', 'Fashion brand', 'Fast food chain', 'Supermarket group'],
    },
    form: {
      headline: 'Apply for the pilot program',
      subhead: 'Free 3-month pilot for the first 10 brands',
      brand: 'Brand Name',
      sector: 'Sector',
      sectorPlaceholder: 'Select sector',
      sectorOptions: ['Coffee & Café', 'Fast Food', 'Fashion & Apparel', 'Grocery / Supermarket', 'Other'],
      contact: 'Company Representative Name',
      email: 'Email',
      phone: 'Phone',
      size: 'Company Size',
      sizePlaceholder: 'Select size',
      sizeOptions: ['1-10 branches', '11-50 branches', '50+ branches'],
      notes: 'Notes / Questions',
      notesPlaceholder: 'Feel free to add any additional questions...',
      submit: 'Submit Application',
      privacy: 'Your data is protected under KVKK and will not be shared with third parties.',
      thanks: 'Your application has been received. We will get back to you within 48 hours.',
      valid: 'Valid',
      errors: {
        brand: 'Brand name is required',
        sector: 'Sector selection is required',
        contact: 'Representative name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        phone: 'Phone number is required',
        size: 'Company size selection is required',
      },
    },
    faq: {
      headline: 'Frequently asked questions',
      items: [
        { q: 'How long is the pilot?', a: 'The pilot program runs for 3 months and is completely free for the first 10 applicants.' },
        { q: 'Which competitors can I monitor?', a: 'When you specify your sector and location, the system automatically identifies 20 competitors. You can also add competitors manually.' },
        { q: 'Where does the data come from?', a: 'Google Maps reviews, social media data, and publicly available price information are analyzed by AI in real time.' },
        { q: 'Is a contract required?', a: 'No contract during the pilot period. After the pilot, monthly or annual subscription options are available.' },
        { q: 'What about post-pilot pricing?', a: 'Pricing is determined by number of branches and competitors tracked. A personalized quote is provided during the pilot.' },
        { q: 'Is integration or installation required?', a: 'No. Pulsara Intel is fully cloud-based — no installation or technical integration required.' },
      ],
    },
    footerCta: {
      headline: 'Ready to start?',
      sub: 'The first 10 pilot spots are filling fast. Apply now.',
      btn: 'Apply for Pilot',
    },
  },
};

/* ─── Feature icons (inline SVG) ─── */
const FeatureIcons = [
  // Otomatik Rakip Keşfi — magnifying glass
  <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
  </svg>,
  // AI Yorum Analizi — chat + star
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  // Fiyat Takibi — trending up
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>,
  // Haftalık Rapor — document
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  // Anlık Uyarılar — bell
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>,
  // Çoklu Şube — building
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
];

/* ─── Hero dashboard mockup ─── */
const IntelDashboard = () => (
  <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
    {/* Window chrome */}
    <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
      <span className="text-xs text-gray-400 font-mono ml-2 truncate">intel.pulsaraai.com — Dashboard</span>
      <span className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0">Canlı</span>
    </div>
    <div className="p-4 sm:p-5">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-purple-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Rakip</p>
          <p className="text-2xl font-extrabold text-purple-700">20</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Yorum / hf</p>
          <p className="text-2xl font-extrabold text-blue-700">847</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Uyarı</p>
          <p className="text-2xl font-extrabold text-amber-600">3</p>
        </div>
      </div>

      {/* Competitor table */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Rakip Sıralama</p>
        <div className="space-y-1.5">
          {[
            { name: 'Rakip A', rating: 4.6, delta: '+0.2', up: true, price: '₺75' },
            { name: 'Rakip B', rating: 4.1, delta: '-0.3', up: false, price: '₺95' },
            { name: 'Rakip C', rating: 3.8, delta: '-0.1', up: false, price: '₺42' },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700">{c.name}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-500">★ {c.rating}</span>
                <span className={`text-xs font-semibold ${c.up ? 'text-green-600' : 'text-red-500'}`}>{c.delta}</span>
                <span className="text-xs font-mono text-gray-600">{c.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 flex items-start gap-2 mb-3">
        <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div>
          <p className="text-xs font-semibold text-amber-800">Fiyat Değişimi Algılandı</p>
          <p className="text-xs text-amber-700 mt-0.5">Rakip B büyük boy ürünü ₺95 → ₺85'e indirdi</p>
        </div>
      </div>

      {/* Sentiment bar */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bu Hafta Sentiment</p>
        <div className="flex h-2 rounded-full overflow-hidden">
          <div className="bg-green-400 h-full" style={{ width: '58%' }} />
          <div className="bg-gray-200 h-full" style={{ width: '22%' }} />
          <div className="bg-red-400 h-full" style={{ width: '20%' }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
          <span className="text-green-600 font-medium">Olumlu 58%</span>
          <span>Nötr 22%</span>
          <span className="text-red-500 font-medium">Olumsuz 20%</span>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Validation helper ─── */
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/* ─── Form validation ─── */
function validateField(name, value, f) {
  if (name === 'brand') return value.trim() ? '' : f.errors.brand;
  if (name === 'sector') return value ? '' : f.errors.sector;
  if (name === 'contact') return value.trim() ? '' : f.errors.contact;
  if (name === 'email') {
    if (!value.trim()) return f.errors.emailRequired;
    if (!validateEmail(value)) return f.errors.emailInvalid;
    return '';
  }
  if (name === 'phone') return value.trim() ? '' : f.errors.phone;
  if (name === 'size') return value ? '' : f.errors.size;
  return '';
}

/* ─── Reusable validated input ─── */
const Field = ({ id, label, error, touched, valid, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    {children}
    {touched && error && (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
    {touched && !error && valid && (
      <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {valid}
      </p>
    )}
  </div>
);

const inputCls = (touched, error) =>
  `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors ${
    touched && error
      ? 'border-red-500 focus:border-red-500'
      : touched && !error
      ? 'border-green-500 focus:border-green-500'
      : 'border-gray-300 focus:border-purple-500'
  }`;

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
const PulsaraIntel = () => {
  const { language } = useLanguage();
  const c = content[language] || content.tr;
  const f = c.form;

  /* ── FAQ state ── */
  const [openFaq, setOpenFaq] = useState(null);

  /* ── Form state ── */
  const [formData, setFormData] = useState({ brand: '', sector: '', contact: '', email: '', phone: '', size: '', notes: '' });
  const [errors, setErrors] = useState({ brand: '', sector: '', contact: '', email: '', phone: '', size: '' });
  const [touched, setTouched] = useState({ brand: false, sector: false, contact: false, email: false, phone: false, size: false });

  const isThanks = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('thanks') === '1';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value, f) }));
    }
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
    const newErrors = Object.fromEntries(required.map(k => [k, validateField(k, formData[k], f)]));
    setTouched(allTouched);
    setErrors(newErrors);
    if (required.every(k => !newErrors[k])) {
      e.target.submit();
    }
  };

  /* ── Section refs for scroll animations ── */
  const [heroRef, heroInView] = useInView(0.05);
  const [problemRef, problemInView] = useInView();
  const [howRef, howInView] = useInView();
  const [featRef, featInView] = useInView();
  const [sectRef, sectInView] = useInView();
  const [trustRef, trustInView] = useInView();
  const [faqRef, faqInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <div className="bg-white">
      <SEO title={c.seo.title} description={c.seo.description} />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50/30 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left copy */}
            <div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
              >
                {c.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl"
              >
                {c.hero.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#pilot-form"
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                >
                  {c.hero.cta1}
                </a>
                <a
                  href="#pilot-form"
                  className="px-8 py-3.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg text-center hover:border-purple-500 hover:text-purple-700 transition-all duration-300"
                >
                  {c.hero.cta2}
                </a>
              </motion.div>
            </div>

            {/* Right dashboard */}
            <motion.div variants={fadeUp} className="lg:pl-4">
              <IntelDashboard />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. PROBLEM STATEMENT
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={problemRef}
            initial="hidden"
            animate={problemInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{c.problem.headline}</h2>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {c.problem.cards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-purple-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={howRef}
            initial="hidden"
            animate={howInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{c.howItWorks.headline}</h2>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connector line (desktop) */}
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-blue-300" />

              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {c.howItWorks.steps.map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
                      <span className="text-white font-extrabold text-xl">{step.n}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
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
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={featRef}
            initial="hidden"
            animate={featInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{c.features.headline}</h2>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {c.features.items.map((feat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    {FeatureIcons[i]}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. SECTORS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={sectRef}
            initial="hidden"
            animate={sectInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{c.sectors.headline}</h2>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {c.sectors.items.map((sector, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{sector.emoji}</div>
                  <p className="text-sm sm:text-base font-semibold text-slate-800">{sector.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. TRUST / SOCIAL PROOF
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={trustRef}
            initial="hidden"
            animate={trustInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{c.trust.headline}</h2>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. PILOT APPLICATION FORM
      ══════════════════════════════════════════ */}
      <section id="pilot-form" className="py-20 sm:py-28 bg-gradient-to-br from-purple-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{f.headline}</h2>
              <p className="text-purple-200 text-lg">{f.subhead}</p>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-2xl">
              {isThanks && (
                <div className="mb-8 rounded-xl bg-green-50 border border-green-200 p-5 text-green-800 text-center">
                  <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-semibold text-lg">{f.thanks}</p>
                </div>
              )}

              {/*
                IMPORTANT: Replace YOUR_INTEL_FORMSPREE_ID with your real Formspree form ID.
                Create a new form at formspree.io and paste the 8-char ID here.
              */}
              <form
                action="https://formspree.io/f/YOUR_INTEL_FORMSPREE_ID"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.origin + '/pulsara-intel?thanks=1' : 'https://pulsaraai.com/pulsara-intel?thanks=1'} />
                <input type="hidden" name="_subject" value="Pulsara Intel — Yeni Pilot Başvurusu" />
                <input type="text" name="_gotcha" style={{ display: 'none' }} />

                {/* 2-col row: brand + sector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field id="brand" label={f.brand} error={errors.brand} touched={touched.brand} valid={touched.brand && !errors.brand && formData.brand ? f.valid : ''}>
                    <input
                      type="text" id="brand" name="brand" value={formData.brand}
                      onChange={handleChange} onBlur={handleBlur} required
                      className={inputCls(touched.brand, errors.brand)}
                      placeholder="Pulsara Kafe"
                    />
                  </Field>

                  <Field id="sector" label={f.sector} error={errors.sector} touched={touched.sector} valid={touched.sector && !errors.sector && formData.sector ? f.valid : ''}>
                    <select
                      id="sector" name="sector" value={formData.sector}
                      onChange={handleChange} onBlur={handleBlur} required
                      className={inputCls(touched.sector, errors.sector)}
                    >
                      <option value="">{f.sectorPlaceholder}</option>
                      {f.sectorOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>

                {/* contact + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field id="contact" label={f.contact} error={errors.contact} touched={touched.contact} valid={touched.contact && !errors.contact && formData.contact ? f.valid : ''}>
                    <input
                      type="text" id="contact" name="contact" value={formData.contact}
                      onChange={handleChange} onBlur={handleBlur} required
                      className={inputCls(touched.contact, errors.contact)}
                      placeholder="Ahmet Yılmaz"
                    />
                  </Field>

                  <Field id="email" label={f.email} error={errors.email} touched={touched.email} valid={touched.email && !errors.email && formData.email ? f.valid : ''}>
                    <input
                      type="email" id="email" name="email" value={formData.email}
                      onChange={handleChange} onBlur={handleBlur} required
                      className={inputCls(touched.email, errors.email)}
                      placeholder="ahmet@pulsarakafe.com"
                    />
                  </Field>
                </div>

                {/* phone + size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field id="phone" label={f.phone} error={errors.phone} touched={touched.phone} valid={touched.phone && !errors.phone && formData.phone ? f.valid : ''}>
                    <input
                      type="tel" id="phone" name="phone" value={formData.phone}
                      onChange={handleChange} onBlur={handleBlur} required
                      className={inputCls(touched.phone, errors.phone)}
                      placeholder="+90 532 000 00 00"
                    />
                  </Field>

                  <Field id="size" label={f.size} error={errors.size} touched={touched.size} valid={touched.size && !errors.size && formData.size ? f.valid : ''}>
                    <select
                      id="size" name="size" value={formData.size}
                      onChange={handleChange} onBlur={handleBlur} required
                      className={inputCls(touched.size, errors.size)}
                    >
                      <option value="">{f.sizePlaceholder}</option>
                      {f.sizeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>

                {/* notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">{f.notes}</label>
                  <textarea
                    id="notes" name="notes" value={formData.notes}
                    onChange={handleChange} rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    placeholder={f.notesPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 text-base"
                >
                  {f.submit}
                </button>

                <p className="text-center text-xs text-gray-500 leading-relaxed">{f.privacy}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            ref={faqRef}
            initial="hidden"
            animate={faqInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{c.faq.headline}</h2>
            </motion.div>
            <motion.div variants={stagger} className="space-y-3">
              {c.faq.items.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                    <svg
                      className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed text-sm border-t border-slate-100 pt-4">
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
          9. FOOTER CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-slate-900">
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="container mx-auto px-4 sm:px-6 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {c.footerCta.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            {c.footerCta.sub}
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="#pilot-form"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-base"
            >
              {c.footerCta.btn}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default PulsaraIntel;
