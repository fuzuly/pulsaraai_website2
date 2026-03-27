import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Company = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      hero: {
        title: 'Building AI Systems That Power Modern Enterprises',
        subtitle: 'We design intelligent solutions that transform workforce operations, manufacturing, retail, and C2C operations.',
      },
      mission: {
        title: 'Our Mission',
        paragraph: 'To make enterprise AI accessible, scalable, and impactful for every industry.',
        bullets: [
          'Automate complex workflows and reduce manual overhead',
          'Optimize operations with data-driven insights and predictions',
          'Deliver measurable ROI through intelligent systems',
        ],
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Technical Excellence',
            description: 'We build robust, scalable systems using cutting-edge AI and cloud technologies.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            ),
          },
          {
            title: 'Enterprise Reliability',
            description: 'We ensure 99.9% uptime, security compliance, and seamless integrations with existing systems.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
          },
          {
            title: 'Customer Partnership',
            description: 'We work closely with clients to understand their needs and deliver solutions that drive real business value.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
          },
          {
            title: 'Impact Focus',
            description: 'We measure success by the tangible improvements in efficiency, cost reduction, and operational excellence.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ),
          },
        ],
      },
      whatWeDo: {
        title: 'What We Do',
        items: [
          {
            title: 'Workforce Intelligence',
            description: 'AI-powered solutions for employee wellbeing, scheduling, and performance management.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
          },
          {
            title: 'Manufacturing & Automation',
            subtitle: 'ProdiX',
            description: 'Factory intelligence, production optimization, and predictive maintenance for industrial operations.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
          },
          {
            title: 'Retail & Commerce',
            description: 'Customer analytics, inventory optimization, and personalized shopping experiences powered by AI.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            ),
          },
          {
            title: 'C2C Technology',
            subtitle: 'Homix',
            description: 'Intelligent property matching, tenant management, and C2C analytics platforms.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            ),
          },
        ],
      },
      timeline: {
        title: 'Our Journey',
        subtitle: 'We\'ve come a long way in a short time.',
        items: [
          {
            year: '2024',
            title: 'Pulsara founded',
            description: 'Pulsara was founded with the vision of transforming enterprise operations with artificial intelligence.',
          },
          {
            year: '2024',
            title: 'First enterprise customers',
            description: 'We launched wellbeing and shift solutions with our first B2B customers in Turkey.',
          },
          {
            year: '2025',
            title: 'Pulsara AI Suite launch',
            description: 'We brought together Wellbeing Manager, Roster Manager, Finance Manager, and ProdiX under one roof.',
          },
          {
            year: '2025',
            title: 'Expansion to factory automation',
            description: 'We started AI-based factory automation projects for production, SKT, and line efficiency with ProdiX.',
          },
        ],
      },
      careers: {
        title: 'Join Us in Building the Future of Enterprise AI',
        subtitle: "We're hiring engineers, data scientists, designers, and consultants passionate about AI and enterprise software.",
        description: 'Open positions will be posted here soon. In the meantime, feel free to reach out to discuss opportunities.',
        button: 'Contact Us About Careers',
      },
    },
    tr: {
      hero: {
        title: 'Modern İşletmeleri Güçlendiren AI Sistemleri İnşa Ediyoruz',
        subtitle: 'İşgücü operasyonları, üretim, perakende ve C2C operasyonlarını dönüştüren akıllı çözümler tasarlıyoruz.',
      },
      mission: {
        title: 'Misyonumuz',
        paragraph: 'Kurumsal AI\'yı her sektör için erişilebilir, ölçeklenebilir ve etkili hale getirmek.',
        bullets: [
          'Karmaşık iş akışlarını otomatikleştirin ve manuel yükü azaltın',
          'Veri odaklı içgörüler ve tahminlerle operasyonları optimize edin',
          'Akıllı sistemler aracılığıyla ölçülebilir ROI sağlayın',
        ],
      },
      values: {
        title: 'Değerlerimiz',
        items: [
          {
            title: 'Teknik Mükemmellik',
            description: 'En son AI ve bulut teknolojilerini kullanarak sağlam, ölçeklenebilir sistemler inşa ediyoruz.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            ),
          },
          {
            title: 'Kurumsal Güvenilirlik',
            description: '%99.9 çalışma süresi, güvenlik uyumluluğu ve mevcut sistemlerle sorunsuz entegrasyonlar sağlıyoruz.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
          },
          {
            title: 'Müşteri Ortaklığı',
            description: 'Müşterilerimizle yakın çalışarak ihtiyaçlarını anlıyor ve gerçek iş değeri sağlayan çözümler sunuyoruz.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
          },
          {
            title: 'Etki Odaklılık',
            description: 'Başarıyı verimlilik, maliyet azaltma ve operasyonel mükemmellikteki somut iyileştirmelerle ölçüyoruz.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ),
          },
        ],
      },
      whatWeDo: {
        title: 'Ne Yapıyoruz',
        items: [
          {
            title: 'İşgücü Zekası',
            description: 'Çalışan refahı, zamanlama ve performans yönetimi için AI destekli çözümler.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
          },
          {
            title: 'Üretim & Otomasyon',
            subtitle: 'ProdiX',
            description: 'Endüstriyel operasyonlar için fabrika zekası, üretim optimizasyonu ve öngörülü bakım.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
          },
          {
            title: 'Perakende & Ticaret',
            description: 'AI destekli müşteri analitiği, stok optimizasyonu ve kişiselleştirilmiş alışveriş deneyimleri.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            ),
          },
          {
            title: 'C2C Teknolojisi',
            subtitle: 'Homix',
            description: 'Akıllı mülk eşleştirme, kiracı yönetimi ve gayrimenkul analitik platformları.',
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            ),
          },
        ],
      },
      timeline: {
        title: 'Yolculuğumuz',
        subtitle: 'Kısa sürede hızlı bir yol katettik.',
        items: [
          {
            year: '2024',
            title: 'Pulsara kuruldu',
            description: 'Pulsara, kurumsal operasyonları yapay zekâ ile dönüştürme vizyonuyla kuruldu.',
          },
          {
            year: '2024',
            title: 'İlk kurumsal müşteriler',
            description: 'Türkiye\'deki ilk B2B müşterilerimizle wellbeing ve vardiya çözümlerini canlıya aldık.',
          },
          {
            year: '2025',
            title: 'Pulsara AI Suite lansmanı',
            description: 'Wellbeing Manager, Roster Manager, Finance Manager ve ProdiX\'i tek çatı altında topladık.',
          },
          {
            year: '2025',
            title: 'Fabrika otomasyonuna açılım',
            description: 'ProdiX ile üretim, SKT ve hat verimliliği için AI tabanlı fabrika otomasyon projelerine başladık.',
          },
        ],
      },
      careers: {
        title: 'Kurumsal AI\'ın Geleceğini İnşa Etmemize Katılın',
        subtitle: 'AI ve kurumsal yazılım konusunda tutkulu mühendisler, veri bilimcileri, tasarımcılar ve danışmanlar arıyoruz.',
        description: 'Açık pozisyonlar yakında burada yayınlanacak. Bu arada, fırsatları tartışmak için bizimle iletişime geçmekten çekinmeyin.',
        button: 'Kariyer Hakkında Bize Ulaşın',
      },
    },
  };

  const t = content[language] || content.en;

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="About Pulsara — Enterprise AI Company Building the Future of Operations"
        description="Discover Pulsara's mission, values, and journey in building AI platforms that transform operations across industries."
      />
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-20 md:pb-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
              {t.mission.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
              {t.mission.paragraph}
            </p>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              {t.mission.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg sm:text-xl text-gray-700 flex-1">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Values Section */}
      <section className="py-12 md:py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-snug">
              {t.values.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.values.items.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4 md:mb-6 text-purple-600">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* What We Do Section */}
      <section className="py-12 md:py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-snug">
              {t.whatWeDo.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {t.whatWeDo.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4 md:mb-6 text-white">
                  {item.icon}
                </div>
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      {item.subtitle}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Timeline Section */}
      <section className="py-12 md:py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-snug">
              {t.timeline.title}
            </h2>
            {t.timeline.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                {t.timeline.subtitle}
              </p>
            )}
          </div>
          
          <div className="relative">
            {/* Vertical line - centered */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-400 to-purple-300 hidden md:block transform -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-16">
              {t.timeline.items.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Year circle - overlaps the line */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-white font-semibold text-sm md:text-base">{item.year}</span>
                  </div>
                  
                  {/* Card - alternates left/right on desktop, centered on mobile */}
                  <div
                    className={`flex-1 w-full md:max-w-[calc(50%-3rem)] ${
                      index % 2 === 0
                        ? 'md:mr-auto md:pr-8 md:text-right'
                        : 'md:ml-auto md:pl-8 md:text-left'
                    }`}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-5 md:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Careers Section */}
      <section className="py-12 md:py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
              {t.careers.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
              {t.careers.subtitle}
            </p>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              {t.careers.description}
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              {t.careers.button}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
