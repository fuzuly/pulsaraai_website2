import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import pulsaraLogo from '../assets/pulsara1.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language] || translations.en;

  const isHome = location.pathname === '/';
  const isIntel = location.pathname === '/pulsara-intel';
  
  // Dark mode is active if we are on Intel page (always), or Home page (when not scrolled)
  const isDarkModeActive = isIntel || (isHome && !isScrolled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.products, path: '/products' },
    { name: t.nav.intel, path: '/pulsara-intel' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.partnerships, path: '/ortakliklar' },
    { name: t.nav.company, path: '/company' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isIntel 
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/95 backdrop-blur-xl border-b border-slate-200'
          : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm md:bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={pulsaraLogo} 
              alt="Pulsara" 
              className={`h-10 sm:h-11 md:h-12 w-auto transition-all duration-300 ${
                !isDarkModeActive
                  ? ''
                  : 'brightness-0 invert'
              }`}
              loading="eager"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-purple-500'
                    : isDarkModeActive 
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                !isDarkModeActive
                  ? 'text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-purple-500'
                  : 'text-white hover:text-white/80 border border-white/30 hover:border-white/60'
              }`}
            >
              {language === 'en' ? 'TR' : 'EN'}
            </button>
            <Link to="/contact" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              {t.nav.getStarted}
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${isDarkModeActive ? 'text-white' : 'text-slate-800'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 space-y-3 backdrop-blur-xl rounded-lg shadow-lg z-50 relative animate-fade-in-up ${isDarkModeActive ? 'bg-slate-900/95 shadow-purple-500/10' : 'bg-white/95'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? isDarkModeActive ? 'text-purple-400 bg-purple-500/10' : 'text-purple-600 bg-purple-50'
                    : isDarkModeActive ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-2 mt-4 px-4">
              <button
                onClick={toggleLanguage}
                className={`flex-1 px-4 py-2.5 text-sm font-medium border rounded-lg transition-colors ${isDarkModeActive ? 'text-slate-300 border-slate-700 hover:border-purple-500 hover:bg-purple-500/10' : 'text-slate-700 border-slate-300 hover:border-purple-500 hover:bg-purple-50'}`}
              >
                {language === 'en' ? 'Türkçe' : 'English'}
              </button>
            </div>
            <div className="px-4">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-center block hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                {t.nav.getStarted}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

