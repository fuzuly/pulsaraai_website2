import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SEO = ({ title, description }) => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    // Base URL for canonical and Open Graph
    const baseUrl = 'https://pulsaraai.com';
    
    // Normalize pathname - handle duplicate paths
    let canonicalPath = location.pathname;
    if (canonicalPath === '/home') {
      canonicalPath = '/';
    }
    
    // Get current URL for Open Graph
    const currentUrl = typeof window !== 'undefined' 
      ? window.location.origin + location.pathname 
      : baseUrl + location.pathname;
    
    // Canonical URL (always use baseUrl)
    const canonicalUrl = baseUrl + canonicalPath;
    
    // Set locale based on language
    const locale = language === 'tr' ? 'tr_TR' : 'en_US';
    
    // Update HTML lang attribute dynamically
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('lang', language);
    }
    
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (attribute, value, content) => {
      let meta = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (attribute === 'name') {
          meta.setAttribute('name', value);
        } else if (attribute === 'property') {
          meta.setAttribute('property', value);
        }
        document.head.appendChild(meta);
      }
      if (content) {
        meta.setAttribute('content', content);
      }
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel, href, hreflang = null) => {
      // For hreflang tags, we need to find by both rel and hreflang
      let link;
      if (hreflang) {
        link = document.querySelector(`link[rel="${rel}"][hreflang="${hreflang}"]`);
      } else {
        link = document.querySelector(`link[rel="${rel}"]`);
      }
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (hreflang) {
          link.setAttribute('hreflang', hreflang);
        }
        document.head.appendChild(link);
      }
      if (href) {
        link.setAttribute('href', href);
      }
    };
    
    // Helper function to remove all hreflang tags
    const removeHreflangTags = () => {
      const existingHreflang = document.querySelectorAll('link[hreflang]');
      existingHreflang.forEach(link => link.remove());
    };

    // Helper function to inject JSON-LD script
    const injectJSONLD = (id, jsonData) => {
      // Remove existing script with same id if it exists
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }

      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonData);
      document.head.appendChild(script);
    };

    // Update or create meta description
    updateMetaTag('name', 'description', description);

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);
    
    // Hreflang tags for language alternates
    // Remove existing hreflang tags first
    removeHreflangTags();
    
    // Define all routes for hreflang
    const routes = ['/', '/products', '/solutions', '/services', '/ortakliklar', '/company', '/contact'];
    
    // Generate hreflang tags for each route
    routes.forEach(route => {
      // English version
      updateLinkTag('alternate', `${baseUrl}${route}`, 'en');
      // Turkish version (assuming /tr/ prefix for Turkish routes)
      updateLinkTag('alternate', `${baseUrl}/tr${route === '/' ? '' : route}`, 'tr');
    });
    
    // Add x-default pointing to English version
    updateLinkTag('alternate', `${baseUrl}${canonicalPath}`, 'x-default');

    // Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', `${baseUrl}/og-default.jpg`);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'Pulsara AI');
    updateMetaTag('property', 'og:locale', locale);

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', `${baseUrl}/og-default.jpg`);

    // JSON-LD Structured Data

    // 1. Organization Schema (on all pages)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Pulsara AI",
      "url": "https://pulsaraai.com/",
      "logo": "https://pulsaraai.com/pulsara_icon.webp",
      "description": "Enterprise AI platforms for workforce, finance and production.",
      "sameAs": [
        "https://www.linkedin.com/company/pulsara-ai"
      ]
    };
    injectJSONLD('organization-schema', organizationSchema);

    // 2. WebSite Schema (only on home page)
    if (canonicalPath === '/') {
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Pulsara AI",
        "url": "https://pulsaraai.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://pulsaraai.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
      injectJSONLD('website-schema', websiteSchema);
    } else {
      // Remove website schema if not on home page
      const existing = document.getElementById('website-schema');
      if (existing) {
        existing.remove();
      }
    }

    // 3. BreadcrumbList Schema (on main pages, not home)
    if (canonicalPath !== '/' && canonicalPath !== '/home') {
      const breadcrumbMap = {
        '/products': { name: 'Products' },
        '/solutions': { name: 'Solutions' },
        '/services': { name: 'Services' },
        '/ortakliklar': { name: 'Teknoloji Ortaklıkları' },
        '/company': { name: 'Company' },
        '/contact': { name: 'Contact' }
      };

      const pageInfo = breadcrumbMap[canonicalPath];
      if (pageInfo) {
        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://pulsaraai.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": pageInfo.name,
              "item": `${baseUrl}${canonicalPath}`
            }
          ]
        };
        injectJSONLD('breadcrumb-schema', breadcrumbSchema);
      }
    } else {
      // Remove breadcrumb schema if on home page
      const existing = document.getElementById('breadcrumb-schema');
      if (existing) {
        existing.remove();
      }
    }

    // 4. Product Schemas (only on /products page)
    if (canonicalPath === '/products') {
      const products = [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Wellbeing Manager",
          "description": "AI-powered wellbeing and burnout platform that helps you understand how your teams feel, react early to risks, and protect engagement at scale.",
          "brand": {
            "@type": "Brand",
            "name": "Pulsara AI"
          },
          "url": "https://pulsaraai.com/products"
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Roster Manager",
          "description": "Intelligent rostering for 24/7 operations. Balance workforce load, respect constraints, and keep every shift covered with minimal manual work.",
          "brand": {
            "@type": "Brand",
            "name": "Pulsara AI"
          },
          "url": "https://pulsaraai.com/products"
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Finance Manager",
          "description": "Centralize contracts, invoices, and financial performance. See the real profitability of customers, projects, and teams in one place.",
          "brand": {
            "@type": "Brand",
            "name": "Pulsara AI"
          },
          "url": "https://pulsaraai.com/products"
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "ProdiX",
          "description": "AI-powered production intelligence platform for SKT, stock, quality and line performance.",
          "brand": {
            "@type": "Brand",
            "name": "Pulsara AI"
          },
          "url": "https://pulsaraai.com/products"
        }
      ];

      // Inject each product schema with unique ID
      products.forEach((product, index) => {
        injectJSONLD(`product-schema-${index}`, product);
      });
    } else {
      // Remove product schemas if not on products page
      for (let i = 0; i < 4; i++) {
        const existing = document.getElementById(`product-schema-${i}`);
        if (existing) {
          existing.remove();
        }
      }
    }
  }, [title, description, location.pathname, language]);

  return null;
};

export default SEO;

