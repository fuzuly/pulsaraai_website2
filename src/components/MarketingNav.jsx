import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import pulsaraLogo from '../assets/pulsara1.png';

const MarketingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHowItWorksClick = (e) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      window.location.href = '/#how-it-works';
    } else {
      e.preventDefault();
      const element = document.getElementById('how-it-works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navLinks = [
    { name: 'Product', path: '/product' },
    { name: 'How it works', path: '/#how-it-works', onClick: handleHowItWorksClick },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Use cases', path: '/use-cases' },

    { name: 'Company', path: '/company' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={pulsaraLogo} 
              alt="Pulsara" 
              className="h-8 md:h-10 w-auto"
              loading="eager"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.onClick ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={link.onClick}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path || (link.path.includes('#') && location.pathname === '/')
                      ? 'text-purple-600'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-purple-600'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link 
              to="/contact" 
              className="px-5 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors text-sm"
            >
              Request Access
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-700"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              link.onClick ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => {
                    link.onClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === link.path || (link.path.includes('#') && location.pathname === '/')
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 px-5 py-2 bg-purple-600 text-white font-medium rounded-md text-center hover:bg-purple-700 transition-colors"
            >
              Request Access
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MarketingNav;

