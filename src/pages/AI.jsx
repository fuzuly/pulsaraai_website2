import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import aiVideo from '../assets/ai-video2.mp4';

const AI = () => {
  const videoRef = useRef(null);
  const { language } = useLanguage();

  const content = {
    en: {
      hero: {
        title: 'AI-Powered Solutions',
        subtitle: 'Transforming Enterprise Operations with Intelligent Automation',
        description: 'Discover how Pulsara leverages cutting-edge AI to revolutionize workforce management, wellbeing tracking, and business intelligence.',
      },
      features: {
        title: 'How AI Powers Pulsara',
        subtitle: 'Intelligent systems that learn, adapt, and optimize',
        items: [
          {
            title: 'Predictive Analytics',
            description: 'Our AI models analyze patterns in workforce data to predict burnout risks, optimize scheduling, and identify opportunities for improvement before they become problems.',
          },
          {
            title: 'Natural Language Processing',
            description: 'Advanced NLP capabilities enable sentiment analysis, automated insights from employee feedback, and intelligent categorization of wellbeing data.',
          },
          {
            title: 'Machine Learning Optimization',
            description: 'Continuous learning algorithms improve scheduling efficiency, reduce costs, and enhance decision-making accuracy over time.',
          },
          {
            title: 'Real-Time Intelligence',
            description: 'Get instant insights and recommendations powered by AI that help managers make data-driven decisions in real-time.',
          },
        ],
      },
      applications: {
        title: 'AI Applications',
        subtitle: 'Where intelligence meets impact',
        items: [
          {
            title: 'Wellbeing Management',
            description: 'AI-driven burnout detection and prevention, mood analysis, and personalized wellbeing recommendations.',
          },
          {
            title: 'Workforce Scheduling',
            description: 'Intelligent rostering that balances fairness, compliance, and operational efficiency using predictive demand forecasting.',
          },
          {
            title: 'Financial Intelligence',
            description: 'Automated expense tracking, contract management, and financial reporting with AI-powered insights.',
          },
        ],
      },
      cta: {
        title: 'Ready to Transform Your Operations?',
        description: 'See how AI can revolutionize your workforce management and wellbeing programs.',
        button: 'Schedule a Demo',
      },
    },
    tr: {
      hero: {
        title: 'AI Destekli Çözümler',
        subtitle: 'Kurumsal Operasyonları Akıllı Otomasyon ile Dönüştürme',
        description: 'Pulsara\'nın işgücü yönetimi, refah takibi ve iş zekası alanlarında devrim yaratmak için en son AI teknolojisini nasıl kullandığını keşfedin.',
      },
      features: {
        title: 'AI Pulsara\'yı Nasıl Güçlendiriyor',
        subtitle: 'Öğrenen, uyum sağlayan ve optimize eden akıllı sistemler',
        items: [
          {
            title: 'Tahmine Dayalı Analitik',
            description: 'AI modellerimiz, işgücü verilerindeki kalıpları analiz ederek tükenmişlik risklerini tahmin eder, programlamayı optimize eder ve sorun haline gelmeden önce iyileştirme fırsatlarını belirler.',
          },
          {
            title: 'Doğal Dil İşleme',
            description: 'Gelişmiş NLP yetenekleri, duygu analizi, çalışan geri bildirimlerinden otomatik içgörüler ve refah verilerinin akıllı kategorilere ayrılmasını sağlar.',
          },
          {
            title: 'Makine Öğrenmesi Optimizasyonu',
            description: 'Sürekli öğrenen algoritmalar, zaman içinde programlama verimliliğini artırır, maliyetleri düşürür ve karar verme doğruluğunu geliştirir.',
          },
          {
            title: 'Gerçek Zamanlı Zeka',
            description: 'Yöneticilerin gerçek zamanlı olarak veri odaklı kararlar almasına yardımcı olan AI destekli anlık içgörüler ve öneriler alın.',
          },
        ],
      },
      applications: {
        title: 'AI Uygulamaları',
        subtitle: 'Zekanın etkiyle buluştuğu yer',
        items: [
          {
            title: 'Refah Yönetimi',
            description: 'AI destekli tükenmişlik tespiti ve önleme, ruh hali analizi ve kişiselleştirilmiş refah önerileri.',
          },
          {
            title: 'İşgücü Programlama',
            description: 'Tahmine dayalı talep tahmini kullanarak adalet, uyumluluk ve operasyonel verimliliği dengeleyen akıllı vardiya planlama.',
          },
          {
            title: 'Finansal Zeka',
            description: 'AI destekli içgörülerle otomatik gider takibi, sözleşme yönetimi ve finansal raporlama.',
          },
        ],
      },
      cta: {
        title: 'Operasyonlarınızı Dönüştürmeye Hazır mısınız?',
        description: 'AI\'nın işgücü yönetimi ve refah programlarınızı nasıl devrim yaratabileceğini görün.',
        button: 'Demo Planla',
      },
    },
  };

  const t = content[language];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={t.hero.title}
        description={t.hero.description}
      />
      
      {/* Hero Section with Video */}
      <section className="relative w-full h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Static Background for Mobile */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 md:hidden" />
        
        {/* Background Video - Desktop Only */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disableRemotePlayback
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%239333ea;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%231e293b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)'/%3E%3C/svg%3E"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        >
          <source src={aiVideo} type="video/mp4" />
        </video>

        {/* Minimal dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        {/* Content */}
        <div className="relative z-30 container mx-auto px-4 sm:px-6 max-w-5xl text-center py-20 md:py-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] font-medium">
            {t.hero.subtitle}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              {t.cta.button}
            </Link>
            <Link
              to="/products"
              className="px-8 py-3 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 hover:bg-white/10 transition-all duration-300"
            >
              {language === 'tr' ? 'Ürünleri Keşfet' : 'Explore Products'}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t.features.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.features.items.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t.applications.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t.applications.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.applications.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            {t.cta.title}
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AI;

