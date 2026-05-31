import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SEO from '../components/SEO';

const IconCheckCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const CTAButton = ({ children, to, className = '' }) => (
  <Link
    to={to}
    className={`inline-block w-full md:w-auto px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-center ${className}`}
  >
    {children}
  </Link>
);

const Solutions = () => {
  const { language } = useLanguage();

  const solutions = [
    {
      id: 'operational-intelligence',
      title: language === 'tr' ? 'Operasyonel Zeka' : 'Operational Intelligence',
      description: language === 'tr'
        ? 'Operasyonel, işgücü ve üretim verilerini birleşik bir AI zeka katmanına dönüştürün. Riskleri tahmin edin, kararları optimize edin ve tüm organizasyonunuzda verimliliği artırın.'
        : 'Fuse operational, workforce, and production data into a unified AI intelligence layer. Predict risks, optimize decisions, and increase efficiency across your entire organization.',
      features: language === 'tr'
        ? [
            'Gerçek zamanlı operasyonel veri füzyonu',
            'Üretim, işgücü ve iş yükü için tahmin',
            'Anomali tespiti ve otomatik risk skorlama',
            'Zamanlama, tahsis ve kaynak optimizasyonu',
          ]
        : [
            'Real-time operational data fusion',
            'Forecasting for production, workforce, and workload',
            'Anomaly detection and automated risk scoring',
            'Optimization for scheduling, allocation, and resources',
          ],
    },
    {
      id: 'behavioral-intelligence',
      title: language === 'tr' ? 'Davranışsal & Psikografik Zeka' : 'Behavioral & Psychographic Intelligence',
      description: language === 'tr'
        ? 'Büyük organizasyonlar içinde ölçekte insan davranışını anlayın. Desenleri, duygu değişimlerini ve grup dinamiklerini tespit eden AI destekli modeller.'
        : 'Understand human behavior at scale with AI-driven models that detect patterns, sentiment shifts, and group dynamics inside large organizations.',
      features: language === 'tr'
        ? [
            'Davranışsal segmentasyon ve persona modelleme',
            'Tükenmişlik ve duygu tahmini',
            'Etki grafiği ve ilişki haritalama',
            'Zaman içinde davranışsal değişim tespiti',
          ]
        : [
            'Behavioral segmentation and persona modeling',
            'Burnout and sentiment prediction',
            'Influence graph and relationship mapping',
            'Behavioral shift detection over time',
          ],
    },
    {
      id: 'decision-intelligence',
      title: language === 'tr' ? 'Liderlik için Karar Zekası' : 'Decision Intelligence for Leadership',
      description: language === 'tr'
        ? 'Yöneticilere veri destekli Palantir tarzı bir karar motoru sunun. Senaryoları simüle edin, etkiyi tahmin edin ve stratejik kararları optimize edin.'
        : 'Give executives a Palantir-style decision engine powered by data. Simulate scenarios, predict impact, and optimize strategic decisions.',
      features: language === 'tr'
        ? [
            'Ne-olursa-olsun simülasyonları ve senaryo modelleme',
            'Tahmine dayalı etki analizi',
            'Otomatik stratejik öneriler',
            'Bütçe ve kaynak tahsis modelleme',
          ]
        : [
            'What-if simulations and scenario modeling',
            'Predictive impact analysis',
            'Automated strategic recommendations',
            'Budget and resource allocation modeling',
          ],
    },
    {
      id: 'public-sector-intelligence',
      title: language === 'tr' ? 'Kamu Sektörü & Nüfus Zekası' : 'Public Sector & Population Intelligence',
      description: language === 'tr'
        ? 'Kurumlar ve kamu sektörü organizasyonları için nüfus, duygu ve bölgesel dinamiklerin büyük ölçekli modellemesi. (Etik kullanım)'
        : 'Large-scale modeling of populations, sentiment, and regional dynamics for institutions and public-sector organizations. (Ethical use)',
      features: language === 'tr'
        ? [
            'Nüfus duygusu ve anlatı modelleme',
            'Bölge düzeyinde tahmin',
            'İstikrar ve risk analitiği',
            'Kampanya performans analizi',
          ]
        : [
            'Population sentiment and narrative modeling',
            'Region-level forecasting',
            'Stability and risk analytics',
            'Campaign performance analysis',
          ],
    },
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-white">
      <SEO 
        title="Pulsara Intelligence Platform , Enterprise Big Data & AI Intelligence"
        description="Pulsara unifies behavioral, operational, and organizational data into a single AI intelligence layer for enterprises, institutions, and governments."
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            {language === 'tr' ? 'AI Zeka Platformu' : 'AI Intelligence Platform'}
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
            {language === 'tr'
              ? 'Pulsara, davranışsal, operasyonel ve organizasyonel verileri, işletmeler, kurumlar ve hükümetler için tek bir AI zeka katmanına birleştirir.'
              : 'Pulsara unifies behavioral, operational, and organizational data into a single AI intelligence layer for enterprises, institutions, and governments.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-relaxed">{solution.title}</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <CTAButton to="/contact" className="w-full md:w-auto">
                {language === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}
              </CTAButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
