import React from 'react';
import { Link } from 'react-router-dom';
import pulsaraLogo from '../assets/pulsara1.png';

const MarketingFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src={pulsaraLogo} 
                alt="Pulsara" 
                className="h-8 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-slate-600">
              Privacy-first by design. No content monitoring.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/product" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Privacy</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                  Privacy Principles
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/company" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Pulsara. All rights reserved.
          </p>
          <p className="text-sm text-slate-600">
            Privacy-first by design. No content monitoring.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;

