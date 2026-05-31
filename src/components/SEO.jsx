import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SEO = ({ title, description, datePublished = null, dateModified = null, breadcrumbData = null }) => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const baseUrl = 'https://pulsaraai.com';

    let canonicalPath = location.pathname;
    if (canonicalPath === '/home') {
      canonicalPath = '/';
    }

    const currentUrl = typeof window !== 'undefined'
      ? window.location.origin + location.pathname
      : baseUrl + location.pathname;

    const canonicalUrl = baseUrl + canonicalPath;
    const locale = language === 'tr' ? 'tr_TR' : 'en_US';

    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('lang', language);
    }

    if (title) {
      document.title = title;
    }

    const updateMetaTag = (attribute, value, content) => {
      let meta = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (attribute === 'name') meta.setAttribute('name', value);
        else if (attribute === 'property') meta.setAttribute('property', value);
        document.head.appendChild(meta);
      }
      if (content) meta.setAttribute('content', content);
    };

    const updateLinkTag = (rel, href, hreflang = null) => {
      let link;
      if (hreflang) {
        link = document.querySelector(`link[rel="${rel}"][hreflang="${hreflang}"]`);
      } else {
        link = document.querySelector(`link[rel="${rel}"]`);
      }
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (hreflang) link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      if (href) link.setAttribute('href', href);
    };

    const injectJSONLD = (id, jsonData) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonData);
      document.head.appendChild(script);
    };

    const removeJSONLD = (id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };

    // ── Meta tags ──────────────────────────────────────────────────────────
    updateMetaTag('name', 'description', description);
    updateLinkTag('canonical', canonicalUrl);

    // ── Hreflang ──────────────────────────────────────────────────────────
    ['tr', 'en', 'x-default'].forEach(lang => {
      const el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (el) el.remove();
    });
    if (canonicalPath.startsWith('/tr/')) {
      updateLinkTag('alternate', `${baseUrl}${canonicalPath}`, 'tr');
      updateLinkTag('alternate', `${baseUrl}/pulsara-intel`, 'en');
    } else if (canonicalPath === '/pulsara-intel') {
      // Reciprocal: /pulsara-intel is the EN counterpart of the Turkish landing pages
      updateLinkTag('alternate', `${baseUrl}/pulsara-intel`, 'en');
      updateLinkTag('alternate', `${baseUrl}/tr/rakip-takip/kahve-zincirleri`, 'tr');
    } else {
      updateLinkTag('alternate', `${baseUrl}${canonicalPath}`, 'en');
    }
    updateLinkTag('alternate', `${baseUrl}/`, 'x-default');

    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', `${baseUrl}/og-default.png`);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'Pulsara AI');
    updateMetaTag('property', 'og:locale', locale);

    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', `${baseUrl}/og-default.png`);

    // ── 1. Organization Schema (every page) ───────────────────────────────
    injectJSONLD('organization-schema', {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Pulsara AI",
      "url": "https://pulsaraai.com/",
      "logo": "https://pulsaraai.com/pulsara_icon.webp",
      "description": "Enterprise AI platforms for workforce wellbeing, shift scheduling, and competitive intelligence.",
      "sameAs": ["https://www.linkedin.com/company/pulsara-ai"]
    });

    // ── 2. WebSite Schema (home only) — SearchAction removed (route DNE) ──
    if (canonicalPath === '/') {
      injectJSONLD('website-schema', {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Pulsara AI",
        "url": "https://pulsaraai.com/"
      });
    } else {
      removeJSONLD('website-schema');
    }

    // ── 3. BreadcrumbList Schema ───────────────────────────────────────────
    const isBlogPost = canonicalPath.startsWith('/blog/') && canonicalPath.length > '/blog/'.length;
    const isTurkishLandingPage = canonicalPath.startsWith('/tr/');

    if (canonicalPath === '/' || canonicalPath === '/home') {
      removeJSONLD('breadcrumb-schema');
    } else if (isBlogPost) {
      // 3-level: Home > Blog > Article title
      injectJSONLD('breadcrumb-schema', {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",  "item": "https://pulsaraai.com/" },
          { "@type": "ListItem", "position": 2, "name": "Blog",  "item": "https://pulsaraai.com/blog" },
          { "@type": "ListItem", "position": 3, "name": title || "Article", "item": `${baseUrl}${canonicalPath}` }
        ]
      });
    } else if (isTurkishLandingPage && breadcrumbData) {
      // 3-level: Home > Category > Page (Turkish landing pages)
      injectJSONLD('breadcrumb-schema', {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://pulsaraai.com/" },
          { "@type": "ListItem", "position": 2, "name": breadcrumbData.cat, "item": breadcrumbData.catUrl },
          { "@type": "ListItem", "position": 3, "name": breadcrumbData.page, "item": `${baseUrl}${canonicalPath}` }
        ]
      });
    } else {
      const breadcrumbMap = {
        '/products':      { name: 'Products' },
        '/services':      { name: 'Services' },
        '/ortakliklar':   { name: 'Teknoloji Ortaklıkları' },
        '/company':       { name: 'Company' },
        '/contact':       { name: 'Contact' },
        '/blog':          { name: 'Blog' },
        '/pulsara-intel': { name: 'Pulsara Intel' },
        '/ai':            { name: 'AI Solutions' },
        '/privacy':       { name: 'Privacy Policy' },
      };
      const pageInfo = breadcrumbMap[canonicalPath];
      if (pageInfo) {
        injectJSONLD('breadcrumb-schema', {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsaraai.com/" },
            { "@type": "ListItem", "position": 2, "name": pageInfo.name, "item": `${baseUrl}${canonicalPath}` }
          ]
        });
      } else {
        removeJSONLD('breadcrumb-schema');
      }
    }

    // ── 3b. WebPage Schema for Turkish landing pages ──────────────────────
    if (isTurkishLandingPage) {
      injectJSONLD('webpage-schema', {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": `${baseUrl}${canonicalPath}`,
        "inLanguage": "tr",
        "isPartOf": { "@type": "WebSite", "url": "https://pulsaraai.com" }
      });
    } else {
      removeJSONLD('webpage-schema');
    }

    // ── 4. Product Schemas (/products only) — Finance Manager + ProdiX removed
    if (canonicalPath === '/products') {
      const products = [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Pulsara Wellbeing",
          "description": "AI-powered wellbeing and burnout platform. Detects burnout risk weeks in advance with anonymous pulse surveys and manager dashboards.",
          "brand": { "@type": "Brand", "name": "Pulsara AI" },
          "url": "https://pulsaraai.com/products"
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Pulsara Roster",
          "description": "Intelligent shift planning for 24/7 operations. Balance workforce load, respect constraints, and keep every shift covered automatically.",
          "brand": { "@type": "Brand", "name": "Pulsara AI" },
          "url": "https://pulsaraai.com/products"
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Pulsara Intelligence",
          "description": "Data intelligence platform consolidating scattered sources into real-time analytics dashboards and AI-powered reporting.",
          "brand": { "@type": "Brand", "name": "Pulsara AI" },
          "url": "https://pulsaraai.com/products"
        }
      ];
      products.forEach((product, index) => {
        injectJSONLD(`product-schema-${index}`, product);
      });
      // Remove stale 4th slot (Finance Manager / ProdiX era)
      removeJSONLD('product-schema-3');
    } else {
      for (let i = 0; i < 4; i++) removeJSONLD(`product-schema-${i}`);
    }

    // ── 5. SoftwareApplication Schema (/pulsara-intel only) ───────────────
    if (canonicalPath === '/pulsara-intel') {
      injectJSONLD('software-schema', {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Pulsara Intel",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "AI-powered competitor monitoring platform for Turkish retail and F&B brands. Tracks Google Maps reviews, competitor prices, and generates weekly AI reports.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "TRY",
          "description": "3-month free pilot for the first 10 brands"
        },
        "provider": {
          "@type": "Organization",
          "name": "Pulsara AI",
          "url": "https://pulsaraai.com"
        },
        "url": "https://pulsaraai.com/pulsara-intel"
      });
    } else {
      removeJSONLD('software-schema');
    }

    // ── 6. BlogPosting Schema (/blog/:slug only, requires datePublished prop) ─
    if (isBlogPost && datePublished) {
      injectJSONLD('article-schema', {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "author": {
          "@type": "Organization",
          "name": "Pulsara AI",
          "url": "https://pulsaraai.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Pulsara AI",
          "logo": {
            "@type": "ImageObject",
            "url": "https://pulsaraai.com/pulsara_icon.webp"
          }
        },
        "url": `${baseUrl}${canonicalPath}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}${canonicalPath}`
        }
      });
    } else {
      removeJSONLD('article-schema');
    }

  }, [title, description, datePublished, dateModified, breadcrumbData, location.pathname, language]);

  return null;
};

export default SEO;
