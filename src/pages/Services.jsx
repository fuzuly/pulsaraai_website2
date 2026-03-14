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

const Services = () => {
  const { language } = useLanguage();

  const services = [
    {
      id: 'strategy',
      title: language === 'tr' ? 'AI & Veri Stratejisi' : 'AI & Data Strategy',
      description: language === 'tr'
        ? 'İşletmeniz için kapsamlı AI stratejisi geliştirin. Veri mimarisi, AI yol haritası ve uygulama planları ile dijital dönüşümünüzü hızlandırın.'
        : 'Develop comprehensive AI strategy for your business. Accelerate your digital transformation with data architecture, AI roadmap, and implementation plans.',
      features: language === 'tr'
        ? [
            'AI olgunluk değerlendirmesi ve yol haritası',
            'Veri mimarisi tasarımı ve stratejisi',
            'AI kullanım senaryoları ve önceliklendirme',
            'ROI analizi ve iş değeri ölçümü',
          ]
        : [
            'AI maturity assessment and roadmap',
            'Data architecture design and strategy',
            'AI use case identification and prioritization',
            'ROI analysis and business value measurement',
          ],
    },
    {
      id: 'development',
      title: language === 'tr' ? 'Özel Geliştirme' : 'Custom Development',
      description: language === 'tr'
        ? 'İşletmenizin özel ihtiyaçlarına göre özelleştirilmiş yazılım çözümleri. Web uygulamaları, API\'ler ve entegrasyonlar geliştiriyoruz.'
        : 'Custom software solutions tailored to your business needs. We develop web applications, APIs, and integrations.',
      features: language === 'tr'
        ? [
            'Web ve mobil uygulama geliştirme',
            'API geliştirme ve entegrasyon',
            'Mikroservis mimarisi ve bulut uygulamaları',
            'Agile geliştirme metodolojisi',
          ]
        : [
            'Web and mobile application development',
            'API development and integration',
            'Microservices architecture and cloud applications',
            'Agile development methodology',
          ],
    },
    {
      id: 'integrations',
      title: language === 'tr' ? 'Entegrasyonlar & Otomasyon' : 'Integrations & Automation',
      description: language === 'tr'
        ? 'Mevcut sistemlerinizi birbirine bağlayın. ServiceNow, Jira, AWS ve diğer kurumsal araçlarla sorunsuz entegrasyon.'
        : 'Connect your existing systems. Seamless integration with ServiceNow, Jira, AWS, and other enterprise tools.',
      features: language === 'tr'
        ? [
            'Kurumsal araç entegrasyonları (ServiceNow, Jira, AWS)',
            'İş akışı otomasyonu ve orkestrasyon',
            'Veri senkronizasyonu ve ETL süreçleri',
            'API yönetimi ve izleme',
          ]
        : [
            'Enterprise tool integrations (ServiceNow, Jira, AWS)',
            'Workflow automation and orchestration',
            'Data synchronization and ETL processes',
            'API management and monitoring',
          ],
    },
    {
      id: 'cloud',
      title: language === 'tr' ? 'Bulut, DevOps & İzlenebilirlik' : 'Cloud, DevOps & Observability',
      description: language === 'tr'
        ? 'Ölçeklenebilir bulut altyapısı, CI/CD pipeline\'ları ve kapsamlı izleme çözümleri. Sistemlerinizin her zaman çalışır durumda kalmasını sağlayın.'
        : 'Scalable cloud infrastructure, CI/CD pipelines, and comprehensive monitoring solutions. Keep your systems running at all times.',
      features: language === 'tr'
        ? [
            'AWS, Azure ve GCP altyapı kurulumu',
            'CI/CD pipeline kurulumu ve otomasyon',
            'Konteyner orkestrasyonu (Kubernetes, Docker)',
            'Log yönetimi ve performans izleme',
          ]
        : [
            'AWS, Azure, and GCP infrastructure setup',
            'CI/CD pipeline setup and automation',
            'Container orchestration (Kubernetes, Docker)',
            'Log management and performance monitoring',
          ],
    },
    {
      id: 'support',
      title: language === 'tr' ? '7/24 Destek' : '24/7 Support',
      description: language === 'tr'
        ? 'Kesintisiz teknik destek ve bakım hizmetleri. Sistemlerinizin sorunsuz çalışmasını sağlayın.'
        : 'Uninterrupted technical support and maintenance services. Keep your systems running smoothly.',
      features: language === 'tr'
        ? [
            '7/24 teknik destek hattı',
            'Proaktif sistem izleme ve bakım',
            'Hızlı yanıt süreleri ve sorun çözme',
            'Düzenli güvenlik güncellemeleri',
          ]
        : [
            '24/7 technical support hotline',
            'Proactive system monitoring and maintenance',
            'Fast response times and issue resolution',
            'Regular security updates',
          ],
    },
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-white">
      <SEO 
        title="Pulsara Services — AI Consulting, Integrations & Enterprise Automation"
        description="Enterprise AI consulting, integrations, automations and custom ML development to build intelligent workflows."
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            {language === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
            {language === 'tr'
              ? 'Kurumsal AI ve yazılım çözümleri için kapsamlı hizmetler'
              : 'Comprehensive services for enterprise AI and software solutions'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-200"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 leading-relaxed">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
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

export default Services;
