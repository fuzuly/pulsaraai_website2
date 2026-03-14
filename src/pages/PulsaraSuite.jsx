 import aviationVideo from "../assets/hero-video.mp4";
 import pulsaraAircraft from "../assets/pulsara_icon.webp";
import React, { useState, useEffect, useRef } from 'react';

// --- Language Content ---
const content = {
  EN: {
    aboutTitle: "About Us",
aboutSubtitle: "Pulsara Aviation is redefining airline operations with AI.",
aboutMission: "Our Mission",
aboutMissionText: "To optimize crew, finance, and operational processes through AI-driven solutions.",
aboutVision: "Our Vision",
aboutVisionText: "A safer, more efficient, and data-powered future of aviation.",
aboutValues: "Our Values",
aboutValuesText: "Innovation, reliability, transparency, and customer focus.",
    navLinks: ["Features", "Technology", "Products", "Contact"],
    requestDemo: "Request Demo",
    heroTitle: "The Operating System for Aviation",
    heroSubtitle: "Pulsara is the enterprise-grade AI platform that transforms aviation data into predictive insights, operational efficiency, and enhanced safety.",
    exploreProducts: "Explore Our Products",
    contactSales: "Contact Sales",
    featuresTitle: "The Future of Aviation Control",
    featuresSubtitle: "Our AI-enhanced modules are designed to integrate seamlessly into your existing workflow, providing unparalleled control and insight.",
    feature1Title: "Predictive Maintenance (MCC)",
    feature1Desc: "Leverage AI to forecast component failures before they happen, minimizing AOG situations and optimizing maintenance schedules.",
    feature2Title: "Intelligent Flight Planning (OCC)",
    feature2Desc: "AI algorithms analyze weather, NOTAMs, and airspace data in real-time to generate the most fuel-efficient and timely routes.",
    feature3Title: "Operational Efficiency Analytics",
    feature3Desc: "Gain deep insights into your operations with advanced analytics, identifying bottlenecks and areas for improvement.",
    feature4Title: "Enhanced Safety Protocols",
    feature4Desc: "Proactively identify potential risks and safety hazards through AI-driven trend analysis and anomaly detection.",
    techTitle: "Our Technology Platform",
    techSubtitle: "A four-stage process that turns complex aviation data into operational excellence.",
    techStep1Title: "Data Ingestion",
    techStep1Desc: "Securely aggregate data from ACARS, FDM, tech logs, and third-party systems in real-time.",
    techStep2Title: "AI-Powered Analysis",
    techStep2Desc: "Our proprietary models process terabytes of data to identify patterns, predict outcomes, and suggest optimizations.",
    techStep3Title: "Actionable Insights",
    techStep3Desc: "Receive clear, concise recommendations and alerts delivered through an intuitive dashboard.",
    techStep4Title: "Seamless Integration",
    techStep4Desc: "Integrate Pulsara with your existing EFB, M&E, and flight planning software via our robust API.",
    roiTitle: "Unlock Quantifiable ROI",
    roiSubtitle: "Our product suite is engineered to deliver a direct and measurable impact on your bottom line.",
    product1Name: "Pulsara MCC",
    product1Desc: "Reduce maintenance costs by predicting component failures, leading to fewer AOGs and optimized part inventories.",
    product1SavingsLabel: "Avg. Annual Savings per Aircraft",
    product2Name: "Pulsara OCC",
    product2Desc: "Cut fuel expenditure with AI-optimized flight paths that adapt to real-time conditions and airspace constraints.",
    product2SavingsLabel: "Avg. Annual Fuel Savings per Aircraft",
    product3Name: "Pulsara Analytics",
    product3Desc: "Identify hidden operational inefficiencies across your network to unlock significant, data-driven cost reductions.",
    product3SavingsLabel: "Potential Annual Network Savings",
    calculateROI: "Calculate Your ROI",
    ctaTitle: "Ready to Elevate Your Operations?",
    ctaSubtitle: "Schedule a personalized demo with our team to see how Pulsara's AI can transform your OCC and MCC.",
    requestLiveDemo: "Request a Live Demo",
    contactTitle: "Get In Touch",
    contactSubtitle: "Have questions? Fill out the form below and a Pulsara expert will contact you.",
    formFullName: "Full Name",
    formWorkEmail: "Work Email",
    formCompanyName: "Company Name",
    formJobTitle: "Job Title",
    formMessage: "Your Message",
    formSubmit: "Submit Request",
    formStatusSending: "Sending...",
    formStatusSuccess: "Message Sent! We will be in touch shortly.",
    footerProducts: "Products",
    footerCompany: "Company",
    footerAbout: "About Us",
    footerCareers: "Careers",
    footerPress: "Press",
    footerContact: "Contact",
    footerRights: "All Rights Reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
  },
  TR: {
    aboutTitle: "Hakkımızda",
aboutSubtitle: "Pulsara Aviation, havacılık operasyonlarını yapay zeka ile yeniden tanımlıyor.",
aboutMission: "Misyonumuz",
aboutMissionText: "Ekip, finans ve operasyon süreçlerini yapay zeka destekli çözümlerle optimize etmek.",
aboutVision: "Vizyonumuz",
aboutVisionText: "Daha güvenli, daha verimli ve veri odaklı bir havacılık geleceği.",
aboutValues: "Değerlerimiz",
aboutValuesText: "Yenilik, güvenilirlik, şeffaflık ve müşteri odaklılık.",
    navLinks: ["Özellikler", "Teknoloji", "Ürünler", "İletişim"],
    requestDemo: "Demo Talep Et",
    heroTitle: "Havacılık için İşletim Sistemi",
    heroSubtitle: "Pulsara, havacılık verilerini tahminsel öngörülere, operasyonel verimliliğe ve artırılmış güvenliğe dönüştüren kurumsal düzeyde bir yapay zeka platformudur.",
    exploreProducts: "Ürünlerimizi Keşfedin",
    contactSales: "Satışla İletişime Geç",
    featuresTitle: "Havacılık Kontrolünün Geleceği",
    featuresSubtitle: "Yapay zeka destekli modüllerimiz, mevcut iş akışınıza sorunsuz bir şekilde entegre olacak şekilde tasarlanmıştır ve benzersiz kontrol ve öngörü sağlar.",
    feature1Title: "Tahminsel Bakım (MCC)",
    feature1Desc: "AOG durumlarını en aza indirmek ve bakım programlarını optimize etmek için bileşen arızalarını gerçekleşmeden önce tahmin etmek için yapay zekadan yararlanın.",
    feature2Title: "Akıllı Uçuş Planlama (OCC)",
    feature2Desc: "Yapay zeka algoritmaları, en yakıt verimli ve zamanında rotaları oluşturmak için hava durumunu, NOTAM'ları ve hava sahası verilerini gerçek zamanlı olarak analiz eder.",
    feature3Title: "Operasyonel Verimlilik Analitiği",
    feature3Desc: "Gelişmiş analitik ile operasyonlarınız hakkında derinlemesine bilgi edinin, darboğazları ve iyileştirme alanlarını belirleyin.",
    feature4Title: "Gelişmiş Güvenlik Protokolleri",
    feature4Desc: "Yapay zeka odaklı trend analizi ve anomali tespiti yoluyla potansiyel riskleri ve güvenlik tehlikelerini proaktif olarak belirleyin.",
    techTitle: "Teknoloji Platformumuz",
    techSubtitle: "Karmaşık havacılık verilerini operasyonel mükemmelliğe dönüştüren dört aşamalı bir süreç.",
    techStep1Title: "Veri Alımı",
    techStep1Desc: "ACARS, FDM, teknik kayıtlar ve üçüncü taraf sistemlerden gelen verileri gerçek zamanlı olarak güvenli bir şekilde bir araya getirin.",
    techStep2Title: "Yapay Zeka Destekli Analiz",
    techStep2Desc: "Tescilli modellerimiz, kalıpları belirlemek, sonuçları tahmin etmek ve optimizasyonlar önermek için terabaytlarca veriyi işler.",
    techStep3Title: "Uygulanabilir Öngörüler",
    techStep3Desc: "Sezgisel bir gösterge panosu aracılığıyla sunulan net, özlü öneriler ve uyarılar alın.",
    techStep4Title: "Sorunsuz Entegrasyon",
    techStep4Desc: "Sağlam API'mız aracılığıyla Pulsara'yı mevcut EFB, M&E ve uçuş planlama yazılımınızla entegre edin.",
    roiTitle: "Ölçülebilir Yatırım Getirisinin Kilidini Açın",
    roiSubtitle: "Ürün paketimiz, bilançonuz üzerinde doğrudan ve ölçülebilir bir etki yaratmak üzere tasarlanmıştır.",
    product1Name: "Pulsara MCC",
    product1Desc: "Bileşen arızalarını tahmin ederek bakım maliyetlerini düşürün, bu da daha az AOG ve optimize edilmiş parça envanterleri sağlar.",
    product1SavingsLabel: "Uçak Başına Ortalama Yıllık Tasarruf",
    product2Name: "Pulsara OCC",
    product2Desc: "Gerçek zamanlı koşullara ve hava sahası kısıtlamalarına uyum sağlayan yapay zeka ile optimize edilmiş uçuş rotalarıyla yakıt harcamalarını azaltın.",
    product2SavingsLabel: "Uçak Başına Ortalama Yıllık Yakıt Tasarrufu",
    product3Name: "Pulsara Analytics",
    product3Desc: "Önemli, veriye dayalı maliyet düşüşleri sağlamak için ağınızdaki gizli operasyonel verimsizlikleri belirleyin.",
    product3SavingsLabel: "Potansiyel Yıllık Ağ Tasarrufu",
    calculateROI: "Yatırım Getirinizi Hesaplayın",
    ctaTitle: "Operasyonlarınızı Yükseltmeye Hazır mısınız?",
    ctaSubtitle: "Pulsara'nın yapay zekasının OCC ve MCC'nizi nasıl dönüştürebileceğini görmek için ekibimizle kişiselleştirilmiş bir demo planlayın.",
    requestLiveDemo: "Canlı Demo Talep Et",
    contactTitle: "İletişime Geçin",
    contactSubtitle: "Sorularınız mı var? Aşağıdaki formu doldurun, bir Pulsara uzmanı sizinle iletişime geçecektir.",
    formFullName: "Tam Ad",
    formWorkEmail: "İş E-postası",
    formCompanyName: "Şirket Adı",
    formJobTitle: "Unvan",
    formMessage: "Mesajınız",
    formSubmit: "Talebi Gönder",
    formStatusSending: "Gönderiliyor...",
    formStatusSuccess: "Mesaj Gönderildi! Kısa süre içinde sizinle iletişime geçeceğiz.",
    footerProducts: "Ürünler",
    footerCompany: "Şirket",
    footerAbout: "Hakkımızda",
    footerCareers: "Kariyer",
    footerPress: "Basın",
    footerContact: "İletişim",
    footerRights: "Tüm Hakları Saklıdır.",
    footerPrivacy: "Gizlilik Politikası",
    footerTerms: "Hizmet Şartları",
  }
};


// --- SVG Icons (using inline SVGs for single-file simplicity) ---
const icons = {
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),

  /* === Updated feature icons (keep same keys your cards already use) === */

  // 1) Predictive Maintenance (MCC) — wrench + cog
  brainCircuit: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.5 14.5a2.5 2.5 0 1 0 3 3l3 3"/>
      <path d="M12.5 12.5 5 20l-3-3 7.5-7.5"/>
      <circle cx="19" cy="19" r="2.5"/>
    </svg>
  ),

  // 2) Intelligent Flight Planning (OCC) — route with waypoints
  plane: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M7 7c4 0 7 3 7 7" />
      <path d="M8 13c2 0 3 1 4 2" />
      <path d="M3 20l6-2-2-2-4 4z" />
    </svg>
  ),

  // 3) Operational Efficiency Analytics — bars + trend line
  barChart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18"/>
      <path d="M6 16v3M10 12v7M14 14v5M18 9v10"/>
      <path d="M4 10l4 2 5-5 5 3 2-3"/>
    </svg>
  ),

  // 4) Enhanced Safety Protocols — shield + heartbeat
  shieldCheck: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10z"/>
      <path d="M7 13h2l1.5-2 2 3 1-1h3"/>
    </svg>
  ),

  /* === The rest (unchanged) === */

  arrowRight: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  logo: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" className="text-purple-500" />
    </svg>
  ),
  dataFlow: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m13 17 5-5-5-5M6 17l5-5-5-5"/>
    </svg>
  ),
  aiModel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 12a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0Z"/><path d="M5 12a7 7 0 1 0 14 0 7 7 0 1 0-14 0Z"/><path d="M12 19v2"/><path d="M12 3v2"/><path d="m19 12 2 0"/><path d="m3 12 2 0"/>
    </svg>
  ),
  insight: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"/><path d="M12 12v-1"/><path d="M12 8h.01"/>
    </svg>
  ),
  integration: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 21v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4"/><path d="M10 3v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3"/><path d="M17 14h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-4"/><path d="M7 14H3a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h4"/><rect x="12" y="7" width="4" height="10" rx="2"/><rect x="8" y="7" width="4" height="10" rx="2"/>
    </svg>
  ),
  twitter: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.02 6.02,17.25 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.43 12.86,11.14V10.13H10.13V18.5H12.86V13.5A1.49,1.49 0 0,1 14.35,12.04C15.26,12.04 15.77,12.8 15.77,13.78V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 7.78,5.2 6.88,5.2A1.69,1.69 0 0,0 5.2,6.88C5.2,7.78 6,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"></path>
    </svg>
  ),
};


// --- Pulsara Logo Component ---
 const PulsaraLogo = () => (
       <a href="#home" className="flex items-center">
         <img src={pulsaraAircraft} alt="Pulsara Aviation" className="h-28 md:h-36 lg:h-44 w-auto min-w-[200px] md:min-w-[280px] lg:min-w-[340px] object-contain" loading="lazy" />
       </a>
     );







// --- Navigation Component ---
const Header = ({ language, setLanguage, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${isScrolled || isOpen 
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-md' 
          : 'bg-transparent'
        }`}
    >
    
    <div className="container mx-auto px-6 py-1">




                <div className="flex items-center justify-between">
                    <PulsaraLogo />
                    <nav className="hidden md:flex items-center space-x-8">
                        {content.navLinks.map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-purple-400 transition-colors duration-300 tracking-wide">{link}</a>
                        ))}
                         <button 
                            onClick={() => setLanguage(language === 'EN' ? 'TR' : 'EN')} 
                            className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-semibold border px-3 py-1 rounded-md border-gray-600 hover:border-purple-400"
                        >
                            {language === 'EN' ? 'TR' : 'EN'}
                        </button>
                    </nav>
                    <a href="#contact" className="hidden md:inline-block bg-purple-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-purple-500/50">
                        {content.requestDemo}
                    </a>
                    <div className="md:hidden flex items-center gap-4">
                         <button 
                            onClick={() => setLanguage(language === 'EN' ? 'TR' : 'EN')} 
                            className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-semibold border px-3 py-1 rounded-md border-gray-600 hover:border-purple-400"
                        >
                            {language === 'EN' ? 'TR' : 'EN'}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                            {isOpen ? icons.close : icons.menu}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-all duration-500 ease-in-out md:hidden`}>
                    <nav className="flex flex-col pt-4 space-y-4">
                        {content.navLinks.map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-purple-400 py-2 text-center transition-colors duration-300">{link}</a>
                        ))}
                        <a href="#contact" onClick={() => setIsOpen(false)} className="bg-purple-500 text-white font-semibold w-full text-center mt-2 px-5 py-3 rounded-md hover:bg-purple-600 transition-all duration-300">
                            {content.requestDemo}
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

// --- Video Hero (infinite loop) ---
const VideoHero = ({ content }) => {
  return (
    <section id="home" className="relative w-full h-screen">
      {/* Static Background for Mobile */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 md:hidden" />
      
      {/* Background video - Desktop Only */}
      <video
        src={aviationVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disableRemotePlayback
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 px-6 text-center text-white">
        
 <h1
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 
             text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 
             leading-none tracking-tight overflow-hidden"
  style={{ lineHeight: "1.05", paddingBottom: "0.05em" }}
>
  {content.heroTitle}
</h1>


        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          {content.heroSubtitle}
        </p>
      </div>
    </section>
  );
};


// --- Features Section Component ---
const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 transition-all duration-300 hover:border-purple-500 hover:scale-105 hover:bg-slate-800/80">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-500/10 text-purple-400 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);
// --- Features Section Component ---
// --- Features Section Component ---
const FeaturesSection = ({ content }) => {
  const features = [
    {
      title: content.feature1Title,
      description: content.feature1Desc,
    },
    {
      title: content.feature2Title,
      description: content.feature2Desc,
    },
    {
      title: content.feature3Title,
      description: content.feature3Desc,
    },
    {
      title: content.feature4Title,
      description: content.feature4Desc,
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {content.featuresTitle}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
            {content.featuresSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 transition-all duration-300 hover:border-purple-500 hover:scale-105 hover:bg-slate-800/80"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Technology Section ---
const TechnologySection = ({ content }) => {
  const steps = [
    { icon: icons.dataFlow, title: content.techStep1Title, description: content.techStep1Desc },
    { icon: icons.aiModel, title: content.techStep2Title, description: content.techStep2Desc },
    { icon: icons.insight, title: content.techStep3Title, description: content.techStep3Desc },
    { icon: icons.integration, title: content.techStep4Title, description: content.techStep4Desc },
  ];

  return (
    <section id="technology" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{content.techTitle}</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            {content.techSubtitle}
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-8 h-full w-[2px] bg-slate-700/50 hidden lg:block"></div>
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-start gap-6 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="bg-slate-800 border border-slate-700 h-16 w-16 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400 relative z-10">
                  {step.icon}
                </div>
                <div className={`pt-2 ${index % 2 !== 0 ? 'lg:text-right' : ''}`}>
                  <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Intersection Observer Hook ---
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

// --- Animated Savings Counter ---
const AnimatedSavingsCounter = ({ targetValue, label }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const end = targetValue;
            if (start === end) return;

            const duration = 2000; // 2 seconds
            const range = end - start;
            let startTime = null;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const nextValue = Math.floor(progress * range + start);
                setCurrentValue(nextValue);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            
            window.requestAnimationFrame(step);
        }
    }, [isVisible, targetValue]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">
                ${currentValue.toLocaleString()}
            </div>
            <div className="text-sm font-semibold tracking-wider uppercase text-gray-400">
                {label}
            </div>
        </div>
    );
};


// --- Product Suite Section ---
const ProductSuiteSection = ({ content }) => {
    const products = [
        {
            name: content.product1Name,
            description: content.product1Desc,
            savingsData: {
                targetValue: 120000,
                label: content.product1SavingsLabel
            }
        },
        {
            name: content.product2Name,
            description: content.product2Desc,
            savingsData: {
                targetValue: 250000,
                label: content.product2SavingsLabel
            }
        },
        {
            name: content.product3Name,
            description: content.product3Desc,
            savingsData: {
                targetValue: 350000,
                label: content.product3SavingsLabel
            }
        }
    ];

    return (
        <section id="products" className="py-20 bg-slate-900/70">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{content.roiTitle}</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                        {content.roiSubtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="bg-slate-800/60 p-8 rounded-lg border border-slate-700 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/50 transform hover:-translate-y-2">
                            <h3 className="text-2xl font-semibold text-white mb-4">{product.name}</h3>
                            <p className="text-gray-400 mb-8 flex-grow min-h-[80px]">{product.description}</p>
                            <div className="w-full h-24 flex items-center justify-center my-4">
                               <AnimatedSavingsCounter {...product.savingsData} />
                            </div>
                             <a href="#contact" className="mt-6 bg-purple-500/20 text-purple-300 font-semibold px-6 py-2 rounded-md border border-purple-500/30 hover:bg-purple-500/40 transition-all duration-300">
                                {content.calculateROI}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- About Us Section ---
const AboutSection = ({ content }) => (
  <section id="about" className="py-20 bg-slate-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {content.aboutTitle || "About Us"}
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
          {content.aboutSubtitle || "Our mission is to transform aviation operations with enterprise-grade AI."}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-slate-900/70 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            {content.aboutMission || "Our Mission"}
          </h3>
          <p className="text-gray-400">
            {content.aboutMissionText ||
              "To empower airlines and aviation operators with intelligent automation that improves efficiency, compliance, and crew wellbeing."}
          </p>
        </div>
        <div className="p-6 bg-slate-900/70 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            {content.aboutVision || "Our Vision"}
          </h3>
          <p className="text-gray-400">
            {content.aboutVisionText ||
              "We envision a future where AI-driven aviation solutions eliminate complexity and enable safer, more efficient skies."}
          </p>
        </div>
        <div className="p-6 bg-slate-900/70 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            {content.aboutValues || "Our Values"}
          </h3>
          <p className="text-gray-400">
            {content.aboutValuesText ||
              "Innovation, safety, transparency, and human-first design are at the core of every product we build."}
          </p>
        </div>
      </div>
    </div>
  </section>
);


// --- CTA Section ---
const CTASection = ({ content }) => (
    <section id="solutions" className="py-20 bg-slate-900/70">
        <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-purple-500/80 to-indigo-600/80 rounded-lg p-10 md:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-16 -right-5 w-56 h-56 bg-white/10 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 z-10 relative">
                    {content.ctaTitle}
                </h2>
                <p className="text-lg max-w-2xl mx-auto mb-8 z-10 relative">
                    {content.ctaSubtitle}
                </p>
                <a href="#contact" className="bg-white text-slate-900 font-bold px-8 py-4 rounded-md hover:bg-slate-200 transition-all duration-300 shadow-2xl transform hover:scale-105 z-10 relative inline-block">
                    {content.requestLiveDemo}
                </a>
            </div>
        </div>
    </section>
);


// --- Contact Section ---
const ContactSection = ({ content }) => {
  const isThanks =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("thanks") === "1";

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{content.contactTitle}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
            {content.contactSubtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-800/60 p-8 rounded-lg border border-slate-700">
          {isThanks && (
            <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-center">
              {content.formStatusSuccess}
            </div>
          )}

          <form
            action="https://formspree.io/f/xpqylrkk"
            method="POST"
          >
            {/* Formspree controls */}
            <input
              type="hidden"
              name="_next"
              value={
                typeof window !== "undefined"
                  ? window.location.origin + "/aviation?thanks=1"
                  : "https://pulsara.com.tr/aviation?thanks=1"
              }
            />
            <input
              type="hidden"
              name="_subject"
              value="New Aviation Site Contact — Pulsara"
            />
            <input type="text" name="_gotcha" style={{ display: "none" }} />

            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div className="relative z-0 w-full group">
                <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{content.formFullName}</label>
              </div>
              <div className="relative z-0 w-full group">
                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{content.formWorkEmail}</label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div className="relative z-0 w-full group">
                <input type="text" name="company" id="company" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer" placeholder=" " required />
                <label htmlFor="company" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{content.formCompanyName}</label>
              </div>
              <div className="relative z-0 w-full group">
                <input type="text" name="job_title" id="job_title" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer" placeholder=" " required />
                <label htmlFor="job_title" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{content.formJobTitle}</label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <textarea name="message" id="message" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer min-h-[100px]" placeholder=" " required></textarea>
              <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{content.formMessage}</label>
            </div>

            <button type="submit" className="w-full bg-purple-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">{content.formSubmit}</button>
          </form>
        </div>
      </div>
    </section>
  );
};


// --- Footer Component ---
const Footer = ({ content }) => (
    <footer className="bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <PulsaraLogo />
                    <p className="mt-4 text-gray-400 max-w-xs">The enterprise-grade AI platform for modern aviation operations.</p>
                     <div className="flex space-x-4 mt-6">
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">{icons.twitter}</a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">{icons.linkedin}</a>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-white tracking-wider uppercase mb-4">{content.footerProducts}</h4>
                    <nav className="flex flex-col space-y-2">
                        <a href="#products" className="text-gray-400 hover:text-purple-400 transition-colors">{content.product1Name}</a>
                        <a href="#products" className="text-gray-400 hover:text-purple-400 transition-colors">{content.product2Name}</a>
                        <a href="#products" className="text-gray-400 hover:text-purple-400 transition-colors">{content.product3Name}</a>
                    </nav>
                </div>
                <div>
  <h4 className="font-semibold text-white tracking-wider uppercase mb-4">
    {content.footerCompany}
  </h4>
  <nav className="flex flex-col space-y-2">
    <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
      {content.footerAbout}
    </a>
    <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">
      {content.footerContact}
    </a>
  </nav>
</div>
            </div>
            <hr className="my-8 border-slate-700"/>
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                <p className="text-gray-500 mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} Pulsara Aviation, Inc. {content.footerRights}
                </p>
                 <div className="flex space-x-6 text-gray-400">
                    <a href="#" className="hover:text-purple-400">{content.footerPrivacy}</a>
                    <a href="#" className="hover:text-purple-400">{content.footerTerms}</a>
                </div>
            </div>
        </div>
   

    </footer>
);


// --- Main App Component ---
// --- Pulsara Aviation Page ---
export default function PulsaraSuite() {
    const [language, setLanguage] = useState('EN');
    const currentContent = content[language];
  
    return (
      <div className="bg-slate-900 font-sans text-gray-200">
        <Header language={language} setLanguage={setLanguage} content={currentContent} />
        <main>
          <VideoHero content={currentContent} />
          <FeaturesSection content={currentContent} />
          <TechnologySection content={currentContent} />
          <ProductSuiteSection content={currentContent} />
          <AboutSection content={currentContent} />
          <CTASection content={currentContent} />
          <ContactSection content={currentContent} />
        </main>
        <Footer content={currentContent} />
      </div>
    );
  }
  


