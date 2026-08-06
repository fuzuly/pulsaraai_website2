import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import HeroVideoHeader from '../components/HeroVideoHeader';
import SEO from '../components/SEO';

const Home = () => {
  const { language } = useLanguage();
  const t = (translations[language] && translations[language].home) ? translations[language].home : translations.en.home;
  const [selectedService, setSelectedService] = useState('automation'); // Default to automation

  // Services/Products icons - Kartaca style with content
  const services = [
    {
      id: 'ai-platforms',
      name: language === 'tr' ? 'AI Platformları' : 'AI Platforms',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      title: language === 'tr' 
        ? 'Kurumsal AI Platformları ile Verimliliği Artırın'
        : 'Increase Efficiency with Enterprise AI Platforms',
      description1: language === 'tr'
        ? 'Pulsara\'nın AI platformları, işgücü yönetimi, Wellbeing takibi ve rakip zekası için kurumsal düzeyde çözümler sunar. Yapay zeka destekli sistemlerle operasyonlarınızı optimize edin.'
        : 'Pulsara\'s AI platforms deliver enterprise-grade solutions for workforce management, wellbeing tracking, and competitive intelligence. Optimize your operations with AI-powered systems.',
      description2: language === 'tr'
        ? 'Wellbeing Manager, Roster Manager ve Clarus gibi platformlarımız, verilerinizi tek bir yerde toplayarak gerçek zamanlı içgörüler ve otomatik karar destek sistemleri sağlar.'
        : 'Our platforms like Wellbeing Manager, Roster Manager, and Clarus centralize your data to provide real-time insights and automated decision support systems.',
      hint: language === 'tr'
        ? 'AI platformları ile işgücü yönetimini dijitalleştirerek tüm süreçleri tek bir platformda gerçek zamanlı olarak takip edebilirsiniz.'
        : 'Digitize workforce management with AI platforms to track all processes in real-time on a single platform.',
    },
    {
      id: 'automation',
      name: language === 'tr' ? 'Otomasyon' : 'Automation',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
      title: language === 'tr'
        ? 'Akıllı Otomasyon ile Manuel İşleri Azaltın'
        : 'Reduce Manual Work with Intelligent Automation',
      description1: language === 'tr'
        ? 'Operasyonları kolaylaştıran ve manuel işi azaltan akıllı otomasyon çözümleri. Tekrarlayan görevleri otomatikleştirerek ekiplerinizin değerli zamanını geri kazandırın.'
        : 'Intelligent automation solutions that streamline operations and reduce manual work. Automate repetitive tasks to give your teams valuable time back.',
      description2: language === 'tr'
        ? 'AI destekli otomasyon sistemlerimiz, vardiya planlamasından faturalamaya, raporlamadan veri analizine kadar geniş bir yelpazede otomatik süreçler sunar.'
        : 'Our AI-powered automation systems provide automated processes across a wide range, from shift planning to invoicing, reporting to data analysis.',
      hint: language === 'tr'
        ? 'Otomasyon sistemleri ile tekrarlayan idari görevleri otomatikleştirerek ekiplerinizin stratejik işlere odaklanmasını sağlayın.'
        : 'Automate repetitive administrative tasks with automation systems to allow your teams to focus on strategic work.',
    },
    {
      id: 'cloud',
      name: language === 'tr' ? 'Bulut' : 'Cloud',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: language === 'tr'
        ? 'Ölçeklenebilir Bulut Altyapısı ile Güvenilir Operasyonlar'
        : 'Reliable Operations with Scalable Cloud Infrastructure',
      description1: language === 'tr'
        ? 'Güvenilir operasyonlar için ölçeklenebilir bulut altyapısı ve DevOps çözümleri. Sistemlerinizin her zaman çalışır durumda kalmasını sağlayın.'
        : 'Scalable cloud infrastructure and DevOps solutions for reliable operations. Keep your systems running at all times.',
      description2: language === 'tr'
        ? 'AWS, Azure ve diğer bulut sağlayıcıları ile entegre çalışan altyapılarımız, yüksek kullanılabilirlik, otomatik ölçeklendirme ve 7/24 izleme sunar.'
        : 'Our infrastructures integrated with AWS, Azure and other cloud providers offer high availability, automatic scaling, and 24/7 monitoring.',
      hint: language === 'tr'
        ? 'Bulut altyapısına geçiş yaparak sistem çalışma süresini %99.9\'a çıkarabilir ve kesintisiz hizmet sunabilirsiniz.'
        : 'Migrate to cloud infrastructure to achieve 99.9% system uptime and provide uninterrupted service.',
    },
    {
      id: 'integrations',
      name: language === 'tr' ? 'Entegrasyonlar' : 'Integrations',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: language === 'tr'
        ? 'Kurumsal Araçlarla Sorunsuz Entegrasyon'
        : 'Seamless Integration with Enterprise Tools',
      description1: language === 'tr'
        ? 'ServiceNow, Jira, Grafana, n8n, AWS ve diğer kurumsal araçlarla sorunsuz entegrasyon. İş akışı otomasyonu ve API geliştirme ile sistemlerinizi birleştirin.'
        : 'Seamless integration with ServiceNow, Jira, Grafana, n8n, AWS, and other enterprise tools. Unify your systems with workflow automation and API development.',
      description2: language === 'tr'
        ? 'Mevcut sistemlerinizle entegre çalışan çözümlerimiz, veri silolarını ortadan kaldırarak tüm bilgilerin tek bir yerden yönetilmesini sağlar.'
        : 'Our solutions that integrate with your existing systems eliminate data silos and enable all information to be managed from a single place.',
      hint: language === 'tr'
        ? 'Mevcut sistemlerinizi entegre ederek Jira, ServiceNow ve AWS gibi araçların birlikte çalışmasını ve sorunsuz veri akışını sağlayın.'
        : 'Integrate your existing systems to enable tools like Jira, ServiceNow, and AWS to work together with seamless data flow.',
    },
    {
      id: 'data',
      name: language === 'tr' ? 'Veri Analitiği' : 'Data Analytics',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: language === 'tr'
        ? 'Veri Odaklı Kararlar ile İşletmenizi Büyütün'
        : 'Grow Your Business with Data-Driven Decisions',
      description1: language === 'tr'
        ? 'Gelişmiş veri analitiği ve görselleştirme araçları ile işletmenizin performansını gerçek zamanlı olarak izleyin. Veri odaklı kararlar alın.'
        : 'Monitor your business performance in real-time with advanced data analytics and visualization tools. Make data-driven decisions.',
      description2: language === 'tr'
        ? 'Özel dashboard\'lar, raporlama sistemleri ve tahmine dayalı analitik ile gelecekteki trendleri öngörün ve proaktif kararlar alın.'
        : 'Predict future trends and make proactive decisions with custom dashboards, reporting systems, and predictive analytics.',
      hint: language === 'tr'
        ? 'Veri analitiği ile operasyonel maliyetleri azaltabilir ve tüm kararlarınızı veriye dayalı hale getirebilirsiniz.'
        : 'Use data analytics to reduce operational costs and make all your decisions data-driven.',
    },
    {
      id: 'wellbeing',
      name: language === 'tr' ? 'Wellbeing' : 'Workforce Wellbeing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: language === 'tr'
        ? 'Çalışan Refahını Koruyarak Verimliliği Artırın'
        : 'Increase Productivity by Protecting Employee Wellbeing',
      description1: language === 'tr'
        ? 'AI destekli Wellbeing ve tükenmişlik platformu ile ekiplerinizin nasıl hissettiğini anlayın, risklere erken tepki verin ve ölçekte bağlılığı koruyun.'
        : 'Understand how your teams feel, react early to risks, and protect engagement at scale with an AI-powered wellbeing and burnout platform.',
      description2: language === 'tr'
        ? 'Wellbeing Manager ile ruh hali takibi, anonim anketler, tükenmişlik riski tespiti ve yönetici panelleri ile çalışan sağlığını önceliklendirin.'
        : 'Prioritize employee health with Wellbeing Manager through mood tracking, anonymous surveys, burnout risk detection, and manager dashboards.',
      hint: language === 'tr'
        ? 'Wellbeing Manager ile çalışan memnuniyetini artırın, tükenmişlik oranlarını azaltın. Sağlıklı ekipler daha iyi sonuçlar verir.'
        : 'Increase employee satisfaction and reduce burnout rates with Wellbeing Manager. Healthy teams deliver better results.',
    },
  ];

  // Get selected service content or default
  const activeService = services.find(s => s.id === selectedService);
  const displayService = activeService || services[1]; // Default to automation if not found

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <SEO 
        title="Pulsara AI , Enterprise AI Solutions for Workforce & Intelligence"
        description="AI platforms for workforce wellbeing, scheduling, and competitive intelligence. Built for modern enterprises."
      />
      {/* Hero Section - Full Screen Video */}
      <HeroVideoHeader />

      {/* Main Content Section - Kartaca Style */}
      <section className="pt-24 sm:pt-32 pb-12 md:pb-16 sm:pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Title Section */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-light text-slate-900 mb-8 sm:mb-12 tracking-tight leading-snug">
              {language === 'tr' ? 'İnşa etmeye bayılıyoruz' : 'We love to build'}
            </h2>
            
            {/* Services/Products Icons Row - Kartaca Style */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 sm:mb-16">
              {services.map((service) => {
                const isHighlighted = selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex flex-col items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 rounded-lg transition-all duration-300 cursor-pointer ${
                      isHighlighted
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-transparent text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className={isHighlighted ? 'text-white' : 'text-slate-600'}>
                      {service.icon}
                    </div>
                    <span className={`text-sm font-medium ${isHighlighted ? 'text-white' : 'text-slate-700'}`}>
                      {service.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Grid - Kartaca Style */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left Column - Dynamic Content Based on Selected Service */}
            <div className="transition-all duration-500">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-slate-900 mb-6 sm:mb-8 leading-relaxed tracking-tight">
                {displayService.title}
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p>
                  {displayService.description1}
                </p>
                <p>
                  {displayService.description2}
                </p>
              </div>
            </div>

            {/* Right Column - Dynamic Hint Box */}
            <div className="lg:sticky lg:top-24 mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-lg font-semibold">
                    {language === 'tr' ? 'Öneri' : 'Hint'}
                  </h3>
                </div>
                <p className="text-lg leading-relaxed">
                  {displayService.hint}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Kartaca Style Grid */}
      <section className="py-12 md:py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 mb-6 sm:mb-8 text-center tracking-tight leading-snug">
              {t.products.title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 text-center max-w-3xl mx-auto font-light px-4">
              {t.products.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">

            {/* Left column: Wellbeing + Roster stacked */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow flex-1">
                <span className="inline-block px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-4">
                  {t.products.wellbeingManager.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-3 leading-snug">
                  {t.products.wellbeingManager.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  {t.products.wellbeingManager.description}
                </p>
                <ul className="space-y-2 mb-5">
                  {t.products.wellbeingManager.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/products" className="text-purple-600 text-sm font-semibold hover:underline">
                  {language === 'tr' ? 'Daha fazla bilgi' : 'Learn more'} →
                </Link>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow flex-1">
                <span className="inline-block px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-4">
                  {t.products.rosterManager.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-3 leading-snug">
                  {t.products.rosterManager.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  {t.products.rosterManager.description}
                </p>
                <ul className="space-y-2 mb-5">
                  {t.products.rosterManager.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/products" className="text-blue-600 text-sm font-semibold hover:underline">
                  {language === 'tr' ? 'Daha fazla bilgi' : 'Learn more'} →
                </Link>
              </div>
            </div>

            {/* Right column: Clarus — dark, col-span-2, full height */}
            <div className="lg:col-span-2 relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.35)] transition-all duration-500 group flex flex-col">
              {/* Ambient orbs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-600/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 lg:p-10">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 leading-snug">
                    {t.products.pulsaraIntel.name}
                  </h3>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg">
                    {t.products.pulsaraIntel.description}
                  </p>
                </div>

                {/* Mini briefing preview */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t.products.pulsaraIntel.briefingLabel}</p>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">{t.products.pulsaraIntel.briefingDelivered}</span>
                  </div>
                  <div className="space-y-2">
                    {t.products.pulsaraIntel.briefingItems.map((item, i) => (
                      <div key={i} className={`rounded-lg p-3 border ${i === 0 ? 'bg-red-500/8 border-red-500/20' : 'bg-emerald-500/8 border-emerald-500/20'}`}>
                        <p className={`text-xs font-bold mb-1 ${i === 0 ? 'text-red-300' : 'text-emerald-300'}`}>{item.label}</p>
                        <p className="text-xs text-slate-400">🎯 <span className="text-purple-300 font-semibold">{item.rec}</span></p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {t.products.pulsaraIntel.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/pulsara-intel"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.25)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)] hover:scale-105 transition-all duration-300 w-fit text-sm sm:text-base"
                >
                  {t.products.pulsaraIntel.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section - Minimal, Large */}
      <section className="py-12 md:py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 mb-6 sm:mb-8 tracking-tight leading-snug">
            {t.cta.title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 font-light px-4">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link to="/contact" className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-sm shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-base sm:text-lg text-center">
              {t.cta.scheduleConsultation}
            </Link>
            <Link to="/services" className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-gray-300 text-gray-900 font-medium rounded-sm hover:border-purple-500 transition-all duration-300 text-base sm:text-lg text-center">
              {t.cta.viewServices}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
