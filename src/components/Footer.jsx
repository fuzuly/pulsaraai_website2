import React from 'react';
import { Link } from 'react-router-dom';
import pulsaraLogo from '../assets/pulsara1.png';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language]?.footer || {
    products: 'Products',
    solutions: 'Solutions',
    services: 'Services',
    company: 'Company',
    tagline: 'AI Software & Consulting for the Enterprise',
    copyright: 'All rights reserved.',
    privacy: 'Privacy',
    terms: 'Terms',
  };

  const footerSections = [
    {
      title: t.products || 'Products',
      links: [
        { name: 'Wellbeing Manager', path: '/products' },
        { name: 'Roster Manager', path: '/products' },
        { name: 'Finance Manager', path: '/products' },
        { name: 'ProdiX', path: '/products' },
      ],
    },
    {
      title: t.solutions || 'Solutions',
      links: [
        { name: 'Retail & E-commerce', path: '/solutions' },
        { name: 'Manufacturing', path: '/solutions' },
        { name: 'HR Tech', path: '/solutions' },
        { name: 'Real Estate', path: '/solutions' },
      ],
    },
    {
      title: t.services || 'Services',
      links: [
        { name: 'AI Strategy', path: '/services' },
        { name: 'Custom Development', path: '/services' },
        { name: 'Integrations', path: '/services' },
        { name: 'Cloud & DevOps', path: '/services' },
      ],
    },
    {
      title: t.company || 'Company',
      links: [
        { name: 'About', path: '/company' },
        { name: 'Careers', path: '/company' },
        { name: 'Contact', path: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/">
                <img 
                  src={pulsaraLogo} 
                  alt="Pulsara" 
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="text-slate-600 text-sm mb-6">
              {t.tagline || 'AI Software & Consulting for the Enterprise'}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/pulsaraai/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-slate-900 font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-slate-600 hover:text-purple-600 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Pulsara. {t.copyright || 'All rights reserved.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="#" className="text-slate-600 hover:text-purple-600 text-sm transition-colors">
              {t.privacy || 'Privacy'}
            </a>
            <a href="#" className="text-slate-600 hover:text-purple-600 text-sm transition-colors">
              {t.terms || 'Terms'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

