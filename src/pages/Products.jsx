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

const Products = () => {
  const { language } = useLanguage();
  const t = translations[language]?.home?.products || translations.en.home.products;

  const products = [
    {
      name: t.wellbeingManager.name,
      tagline: t.wellbeingManager.tagline,
      description: t.wellbeingManager.description,
      features: t.wellbeingManager.features,
    },
    {
      name: t.rosterManager.name,
      tagline: t.rosterManager.tagline,
      description: t.rosterManager.description,
      features: t.rosterManager.features,
    },
    {
      name: t.financeManager.name,
      tagline: t.financeManager.tagline,
      description: t.financeManager.description,
      features: t.financeManager.features,
    },
    {
      name: t.prodix.name,
      tagline: t.prodix.tagline,
      description: t.prodix.description,
      features: t.prodix.features,
    },
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-white">
      <SEO 
        title="Pulsara Products — AI Platforms for Modern Business Operations"
        description="Explore AI platforms for wellbeing, roster planning, finance automation, and ProdiX production intelligence. Built for enterprise scale."
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">{t.title}</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 mb-12 sm:mb-24">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 hover:border-purple-300 overflow-hidden"
            >
              {/* Purple gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-400/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-purple-400/8 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none rounded-2xl" />
              
              {/* Purple glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl pointer-events-none" />
              
              {/* Content wrapper */}
              <div className="relative z-10">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full text-sm font-semibold mb-4 group-hover:from-purple-200 group-hover:to-purple-100 group-hover:text-purple-800 group-hover:shadow-md group-hover:shadow-purple-200 transition-all duration-300">
                    {product.tagline}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-relaxed group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">{product.name}</h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{product.description}</p>
                </div>
                <ul className="space-y-3 mb-6 sm:mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start group-hover:translate-x-2 transition-transform duration-300">
                      <IconCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mr-3 flex-shrink-0 group-hover:text-purple-600 group-hover:scale-125 group-hover:drop-shadow-lg transition-all duration-300" />
                      <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-800 font-medium transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton to="/contact" className="w-full md:w-auto group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-purple-500/50 group-hover:scale-105">
                  {language === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
