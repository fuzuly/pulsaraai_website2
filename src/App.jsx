import React, { useState, useEffect } from 'react';
import jiraLogo from './assets/jira.png';
import googleLogo from './assets/google.png';
import outlookLogo from './assets/microsoft.png';
import emailjs from 'emailjs-com';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import PulsaraSuite from './pages/PulsaraSuite.jsx';
import Chooser from './pages/Chooser.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Products from './pages/Products.jsx';
import Solutions from './pages/Solutions.jsx';
import Services from './pages/Services.jsx';
import Company from './pages/Company.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import mertekLogo from "./assets/mertek.png";






function LandingPage() {
    return (
      <>
        {/* copy your homepage code here */}
      </>
    );
  }
  

// --- ICONS (using inline SVG for simplicity in a single file) ---
const IconMenu = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const IconX = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const IconTrendingUp = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconDollarSign = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconCalendar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const IconCheckCircle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

// --- Translations ---
const translations = {
    en: {
      careersTitle: "Join Our Team",
      careersSubtitle: "We're building the future of aviation with AI. Apply below.",
      openPositions: "Open Positions",
      jobFullstackTitle: "Fullstack Engineer",
      jobFullstackLocation: "Remote / Hybrid Istanbul",
      jobFullstackType: "Full-time",
      performanceTitle: "Performance Manager",
performanceDesc: "Set goals, track KPIs, run reviews, and coach teams with AI insights.",
performanceSectionTitle: "AI-Driven Performance Manager",
performanceSectionDesc: "Align goals, automate reviews, and surface coaching opportunities. Performance Manager empowers leaders with objective signals and real-time insights.",
performanceFeature1: "OKRs & team goals with live progress.",
performanceFeature2: "AI summaries for 1:1s and reviews.",
performanceFeature3: "Skill gaps, kudos feed & coaching tips.",
explorePerformance: "Explore Performance",
        navHome: "Home",
        navProducts: "Products",
        navPricing: "Pricing",
        navCareers: "Careers",
        requestDemo: "Request a Demo",
        heroTitle: "Finance, Rostering, & Wellbeing Together",
        heroSubtitle: "Pulsara integrates wellbeing, finance, and scheduling into one intelligent platform, empowering you to make smarter decisions and foster a thriving workplace.",
        platformTitle: "One Platform, Total Control",
        platformSubtitle: "Our suite of AI-powered tools is designed to streamline your operations from end to end.",
        wellbeingTitle: "Wellbeing Tracker",
        wellbeingDesc: "Proactively monitor employee motivation and prevent burnout with our predictive AI. Cultivate a positive and productive work environment.",
        financeTitle: "Finance Manager",
        financeDesc: "Automate financial tracking, bulk-update contracts, and generate insightful reports like quarterly summaries with a single click.",
        rosterTitle: "Roster Manager",
        rosterDesc: "Create compliant 24/7 shift schedules for teams of 3 to 10,000, optimized for fairness and employee wellbeing, all automatically.",
        howItWorksTitle: "Effortless Integration, Powerful Results",
        howItWorksSubtitle: "Get up and running with Pulsara in three simple steps.",
        step1Title: "Connect Your Data",
        step1Desc: "Securely link your existing systems. Our platform integrates seamlessly with your tools.",
        step2Title: "Configure AI Rules",
        step2Desc: "Set your compliance, wellbeing, and financial parameters. Let our AI do the heavy lifting.",
        step3Title: "Automate & Grow",
        step3Desc: "Watch as manual tasks disappear and your business operates with newfound efficiency and insight.",
        ctaTitle: "Ready to Transform Your Business?",
        ctaSubtitle: "Join hundreds of innovative companies that trust Pulsara to drive growth, efficiency, and employee satisfaction.",
        ctaButton: "Request Your Free Demo",
        productsPageTitle: "Explore Our Product Suite",
        productsPageSubtitle: "Dive deep into our AI-powered modules, each designed to tackle a core challenge of modern business management.",
        wellbeingSectionTitle: "AI-Powered Wellbeing Tracker",
        wellbeingSectionDesc: "Go beyond surveys. Pulsara's AI proactively identifies patterns of burnout and disengagement before they impact your bottom line. Our platform provides anonymous, actionable insights to help you build a more supportive and productive work culture.",
        wellbeingFeature1: "Predictive burnout risk analysis.",
        wellbeingFeature2: "Real-time motivation and engagement tracking.",
        wellbeingFeature3: "Actionable recommendations for managers.",
        exploreWellbeing: "Explore Wellbeing",
        financeSectionTitle: "Intelligent Finance Manager",
        financeSectionDesc: "Streamline your financial operations with powerful automation. From bulk contract updates to automated quarterly reports, our Finance Manager eliminates manual data entry, reduces errors, and gives you a crystal-clear view of your company's financial health.",
        financeFeature1: "Automated expense tracking and categorization.",
        financeFeature2: "One-click generation of financial reports.",
        financeFeature3: "Bulk update contracts with one click.",
        exploreFinance: "Explore Finance",
        rosterSectionTitle: "Optimized Roster Manager",
        rosterSectionDesc: "Effortlessly create fair, compliant, and efficient schedules for any size team. Our AI considers legal requirements, employee wellbeing data, and demand forecasts to generate optimal 24/7 rosters in a single click, balancing business needs with team health.",
        rosterFeature1: "Automated scheduling for teams of 3 to 10,000+.",
        rosterFeature2: "Built-in compliance and wellbeing rule engine.",
        rosterFeature3: "Demand forecasting for optimized staff levels.",
        exploreRostering: "Explore Rostering",
        pricingTitle: "Flexible Pricing for Teams of All Sizes",
        pricingSubtitle: "Choose the plan that's right for you. No hidden fees, ever.",
        starterPlan: "Starter",
        starterPrice: "$15",
        proPlan: "Professional",
        proPrice: "Custom",
        enterprisePlan: "Enterprise",
        enterprisePrice: "Custom",
        priceSuffix: "/ month",
        billedAnnually: "Billed annually. Per employee",
        getStarted: "Get Started",
        contactTitle: "See Pulsara in Action",
        contactSubtitle: "Fill out the form to schedule a personalized demo with one of our product specialists. We'll show you how Pulsara can be tailored to your company's specific needs.",
        contactFeature1: "Discover how AI can solve your biggest operational challenges.",
        contactFeature2: "Get a walkthrough of our Wellbeing, Finance, and Roster modules.",
        contactFeature3: "Receive a custom pricing quote for your team.",
        fullName: "Full Name",
        workEmail: "Work Email",
        companyName: "Company Name",
        numEmployees: "Number of Employees",
        scheduleDemo: "Schedule Demo",
        thankYou: "Thank You!",
        demoSuccess: "Your request for a demo has been received. Our team will get back to you within 24 hours to schedule a call.",
        footerProducts: "Products",
        footerCompany: "Company",
        footerContact: "Contact",
        aboutUs: "About Us",
        pricingStarterFeatures: [
          "Up to 50 employees",
          "Wellbeing Tracking",
          "Finance Manager",
          "Roster Manager",
          "Standard Reporting",
          "Email Support",
        ],
        pricingProFeatures: [
          "Up to 250 employees",
          "Wellbeing Tracking (Advanced AI)",
          "Finance Manager (Automation)",
          "Roster Manager (Compliance AI)",
          "Customizable Reports",
          "Priority Email & Chat Support",
          "API Access",
        ],
        pricingEnterpriseFeatures: [
          "Unlimited employees",
          "All Professional features",
          "Dedicated Account Manager",
          "On-premise deployment option",
          "Custom Integrations",
          "24/7 Phone Support",
          "Security & Compliance Audits",
        ],
        
    },
    tr: {
      performanceTitle: "Performans Yöneticisi",
performanceDesc: "Hedef belirleyin, KPI’ları takip edin, değerlendirmeleri yönetin ve yapay zeka içgörüleriyle ekipleri geliştirin.",
performanceSectionTitle: "Yapay Zeka Destekli Performans Yöneticisi",
performanceSectionDesc: "Hedefleri hizalayın, değerlendirmeleri otomatikleştirin ve koçluk fırsatlarını ortaya çıkarın. Performans Yöneticisi, yöneticilere objektif sinyaller ve gerçek zamanlı içgörüler sunar.",
performanceFeature1: "OKR ve takım hedefleri, canlı ilerleme.",
performanceFeature2: "1:1 ve değerlendirmeler için AI özetleri.",
performanceFeature3: "Yetenek açıkları, takdir akışı ve koçluk ipuçları.",
explorePerformance: "Performans’ı Keşfet",

        navHome: "Anasayfa",
        navProducts: "Ürünler",
        navPricing: "Fiyatlandırma",
        navCareers: "Kariyer",
        requestDemo: "Demo Talep Et",
        heroTitle: "Finans, Vardiya ve Wellbeing Tek Çatıda",
        heroSubtitle: "Pulsara, wellbeing, finans ve vardiyayı tek bir akıllı platformda birleştirerek daha akıllı kararlar almanızı ve gelişen bir iş yeri oluşturmanızı sağlar.",
        platformTitle: "Tek Platform, Tam Kontrol",
        platformSubtitle: "Yapay zeka destekli araç setimiz, operasyonlarınızı uçtan uca kolaylaştırmak için tasarlanmıştır.",
        wellbeingTitle: "Wellbeing Takibi",
        wellbeingDesc: "Tahmine dayalı yapay zekamızla çalışan motivasyonunu proaktif olarak izleyin ve tükenmişliği önleyin. Pozitif ve üretken bir çalışma ortamı geliştirin.",
        financeTitle: "Finans Yöneticisi",
        financeDesc: "Finansal takibi otomatikleştirin, sözleşmeleri toplu olarak güncelleyin ve tek bir tıklamayla üç aylık özetler gibi anlaşılır raporlar oluşturun.",
        rosterTitle: "Vardiya Yöneticisi",
        rosterDesc: "Adalet ve çalışan refahı için optimize edilmiş, 3 ila 10.000 kişilik ekipler için yasalara uygun 7/24 vardiya programları otomatik olarak oluşturun.",
        howItWorksTitle: "Zahmetsiz Entegrasyon, Güçlü Sonuçlar",
        howItWorksSubtitle: "Pulsara'yı üç basit adımda kullanmaya başlayın.",
        step1Title: "Verilerinizi Bağlayın",
        step1Desc: "Mevcut sistemlerinizi güvenli bir şekilde bağlayın. Platformumuz araçlarınızla sorunsuz bir şekilde bütünleşir.",
        step2Title: "AI Kurallarını Yapılandırın",
        step2Desc: "Uyumluluk, refah ve finansal parametrelerinizi ayarlayın. Bırakın yapay zekamız ağır işleri yapsın.",
        step3Title: "Otomatikleştirin ve Büyüyün",
        step3Desc: "Manuel görevlerin ortadan kalkmasını ve işletmenizin yeni keşfedilen verimlilik ve içgörüyle çalışmasını izleyin.",
        ctaTitle: "İşinizi Dönüştürmeye Hazır mısınız?",
        ctaSubtitle: "Büyümeyi, verimliliği ve çalışan memnuniyetini artırmak için Pulsara'ya güvenen yüzlerce yenilikçi şirkete katılın.",
        ctaButton: "Ücretsiz Demonuzu Talep Edin",
        productsPageTitle: "Ürün Paketimizi Keşfedin",
        productsPageSubtitle: "Her biri modern işletme yönetiminin temel bir zorluğunun üstesinden gelmek için tasarlanmış yapay zeka destekli modüllerimize derinlemesine dalın.",
        wellbeingSectionTitle: "Yapay Zeka Destekli Wellbeing Takibi",
        wellbeingSectionDesc: "Anketlerin ötesine geçin. Pulsara'nın yapay zekası, kârınızı etkilemeden önce tükenmişlik ve ilgisizlik kalıplarını proaktif olarak tanımlar. Platformumuz, daha destekleyici ve üretken bir çalışma kültürü oluşturmanıza yardımcı olmak için anonim, eyleme geçirilebilir bilgiler sağlar.",
        wellbeingFeature1: "Tahmine dayalı tükenmişlik riski analizi.",
        wellbeingFeature2: "Gerçek zamanlı motivasyon ve katılım takibi.",
        wellbeingFeature3: "Yöneticiler için eyleme geçirilebilir öneriler.",
        exploreWellbeing: "Wellbeing'i Keşfet",
        financeSectionTitle: "Akıllı Finans Yöneticisi",
        financeSectionDesc: "Güçlü otomasyonla finansal operasyonlarınızı kolaylaştırın. Toplu sözleşme güncellemelerinden otomatik üç aylık raporlara kadar, Finans Yöneticimiz manuel veri girişini ortadan kaldırır, hataları azaltır ve size şirketinizin finansal sağlığının kristal netliğinde bir görünümünü sunar.",
        financeFeature1: "Otomatik gider takibi ve sınıflandırması.",
        financeFeature2: "Tek tıkla finansal rapor oluşturma.",
        financeFeature3: "Tek tıkla tüm şirketin sözleşmelerini güncelle.",
        exploreFinance: "Finans'ı Keşfet",
        rosterSectionTitle: "Optimize Edilmiş Vardiya Yöneticisi",
        rosterSectionDesc: "Her büyüklükteki ekip için zahmetsizce adil, uyumlu ve verimli programlar oluşturun. Yapay zekamız, iş ihtiyaçlarını ekip sağlığıyla dengeleyerek, tek bir tıklamayla optimum 7/24 vardiya listeleri oluşturmak için yasal gereklilikleri, çalışan refahı verilerini ve talep tahminlerini dikkate alır.",
        rosterFeature1: "3 ila 10.000+ kişilik ekipler için otomatik zamanlama.",
        rosterFeature2: "Dahili uyumluluk ve refah kural motoru.",
        rosterFeature3: "Optimize edilmiş personel seviyeleri için talep tahmini.",
        exploreRostering: "Vardiya'yı Keşfet",
        pricingTitle: "Her Büyüklükteki Ekipler İçin Esnek Fiyatlandırma",
        pricingSubtitle: "Sizin için doğru olan planı seçin. Asla gizli ücret yok.",
        starterPlan: "Başlangıç",
        starterPrice: "$15",
        proPlan: "Profesyonel",
        proPrice: "Özel",
        enterprisePlan: "Kurumsal",
        enterprisePrice: "Özel",
        priceSuffix: "/ ay",
        billedAnnually: "Kullanıcı başına yıllık faturalandırılır.",
        getStarted: "Başlayın",
        careersTitle: "Misyonumuza Katılın",
        careersSubtitle: "İşletme yönetiminin geleceğini inşa ediyoruz. Onu yaratmamıza yardımcı olacak tutkulu, yenilikçi insanlar arıyoruz.",
        openPositions: "Açık Pozisyonlar",
        contactTitle: "Pulsara'yı İş Başında Görün",
        contactSubtitle: "Ürün uzmanlarımızdan biriyle kişiselleştirilmiş bir demo planlamak için formu doldurun. Pulsara'nın şirketinizin özel ihtiyaçlarına nasıl uyarlanabileceğini size göstereceğiz.",
        contactFeature1: "Yapay zekanın en büyük operasyonel zorluklarınızı nasıl çözebileceğini keşfedin.",
        contactFeature2: "Wellbeing, Finans ve Vardiya modüllerimizin bir tanıtımını alın.",
        contactFeature3: "Ekibiniz için özel bir fiyat teklifi alın.",
        fullName: "Ad Soyad",
        workEmail: "İş E-postası",
        companyName: "Şirket Adı",
        numEmployees: "Çalışan Sayısı",
        scheduleDemo: "Demo Planla",
        thankYou: "Teşekkür Ederiz!",
        demoSuccess: "Demo talebiniz alınmıştır. Ekibimiz bir görüşme planlamak için 24 saat içinde size geri dönecektir.",
        footerProducts: "Ürünler",
        footerCompany: "Şirket",
        footerContact: "İletişim",
        aboutUs: "Hakkımızda",
        pricingStarterFeatures: [
          "50 çalışana kadar",
          "Wellbeing Takibi (Temel)",
          "Finans Yöneticisi (Temel)",
          "Vardiya Yöneticisi (Temel)",
          "Standart Raporlama",
          "E-posta Desteği",
        ],
        pricingProFeatures: [
          "250 çalışana kadar",
          "Wellbeing Takibi (Gelişmiş AI)",
          "Finans Yöneticisi (Otomasyon)",
          "Vardiya Yöneticisi (Uyumluluk AI)",
          "Özelleştirilebilir Raporlar",
          "Öncelikli E-posta & Sohbet Desteği",
          "API Erişimi",
        ],
        pricingEnterpriseFeatures: [
          "Sınırsız çalışan",
          "Tüm Profesyonel özellikler",
          "Özel Hesap Yöneticisi",
          "Yerinde kurulum seçeneği",
          "Özel Entegrasyonlar",
          "7/24 Telefon Desteği",
          "Güvenlik & Uyumluluk Denetimleri",
        ],
        
    }
};


// --- Reusable Components ---
import pulsaraLogo from './assets/pulsara1.png';

const PulsaraLogo = () => (
  <div className="flex items-center space-x-2 sm:space-x-3">
    <img 
      src={pulsaraLogo} 
      alt="Pulsara Logo" 
      className="h-8 sm:h-12 lg:h-16 w-auto" 
    />
  </div>
);



const NavLink = ({ children, onClick, active }) => (
  <button onClick={onClick} className={`text-gray-600 hover:text-purple-600 transition-colors duration-300 relative font-medium ${active ? 'text-purple-600' : ''}`}>
    {children}
    {active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-purple-600 rounded-full"></span>}
  </button>
);

const CTAButton = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
);


const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-200/50">
        <div className="flex items-center justify-center w-16 h-16 mb-6 bg-purple-100 rounded-full">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

// --- Chart Components for Hero Dashboard ---
const HeroBarChart = () => {
    const data = [{ v: 60 }, { v: 40 }, { v: 80 }, { v: 30 }];
    const maxValue = 100;
    return (
        <div className="w-full h-24 flex items-end justify-around p-2 space-x-2">
            {data.map((item, index) => (
                <div key={index} className="flex-1 h-full flex items-end">
                    <div className="w-full bg-blue-400 rounded-sm" style={{ height: `${(item.v / maxValue) * 100}%`, animation: `bar-grow 1s ${index * 150}ms ease-out forwards`, transformOrigin: 'bottom', transform: 'scaleY(0)' }}></div>
                </div>
            ))}
        </div>
    );
};

const HeroLineChart = () => {
    const points1 = "0,50 20,40 40,60 60,50 80,70 100,60";
    const points2 = "0,65 20,55 40,75 60,65 80,85 100,75";
    return (
        <svg viewBox="0 0 100 100" className="w-full h-24">
            <polyline fill="none" stroke="#f472b6" strokeWidth="2" points={points1} style={{ strokeDasharray: 200, animation: 'line-draw 2s ease-out forwards' }} />
            <polyline fill="none" stroke="#60a5fa" strokeWidth="2" points={points2} style={{ strokeDasharray: 200, animation: 'line-draw 2.5s ease-out forwards' }} />
        </svg>
    );
};

const HeroDonutChart = () => {
    const radius = 50;
    const strokeWidth = 15;
    const size = (radius + strokeWidth/2) * 2;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = React.useState(0);
    const percentage = 85;

    React.useEffect(() => {
        const animation = setTimeout(() => setProgress(percentage), 100);
        return () => clearTimeout(animation);
    }, [percentage]);

    const offset = circumference - (progress / 100) * circumference;
    const gapOffset = circumference - ((100-15) / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                <circle stroke="#e5e7eb" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size/2} cy={size/2} />
                <circle
                    stroke="#0ea5e9"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius} cx={size/2} cy={size/2}
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.65, 0, 0.35, 1)' }}
                />
                 <circle
                    stroke="#f472b6"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={gapOffset}
                    r={radius} cx={size/2} cy={size/2}
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.65, 0, 0.35, 1)' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                 <span className="text-gray-500 text-sm">Compliant</span>
                 <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
            </div>
        </div>
    );
};

const HeroDashboard = () => (
    <div className="bg-white/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-200/50 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Business Dashboard</h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">Live</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50/70 p-3 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">Monthly Cash Flow</p>
                <HeroLineChart />
            </div>
            <div className="bg-gray-50/70 p-3 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">Spending Distribution</p>
                <HeroBarChart />
            </div>
        </div>
        <div className="mt-4 bg-gray-50/70 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-4">
            <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Shift Compliance</p>
                <HeroDonutChart />
            </div>
            <div className="space-y-3">
                <div className="bg-white p-2 rounded-md shadow-sm">
                    <p className="text-xs text-gray-500">Weekly Hours</p>
                    <p className="font-bold text-gray-800">40-42</p>
                </div>
                <div className="bg-white p-2 rounded-md shadow-sm">
                    <p className="text-xs text-gray-500">Min. Rest</p>
                    <p className="font-bold text-gray-800">&ge; 11 hours</p>
                </div>
                 <div className="bg-white p-2 rounded-md shadow-sm">
                    <p className="text-xs text-gray-500">AI Suggestion</p>
                    <p className="font-semibold text-purple-600 text-xs">Early pay discount</p>
                </div>
            </div>
        </div>
    </div>
);


// --- Page Components ---

const Header = ({ activePage, setActivePage, language, setLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleNavClick = (page) => {
        setActivePage(page);
        setIsOpen(false);
    };
    
    const t = translations[language];

    return (
        <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

                <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
                    <PulsaraLogo />
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink onClick={() => handleNavClick('home')} active={activePage === 'home'}>{t.navHome}</NavLink>
                    <NavLink onClick={() => handleNavClick('products')} active={activePage === 'products'}>{t.navProducts}</NavLink>
                    <NavLink onClick={() => handleNavClick('pricing')} active={activePage === 'pricing'}>{t.navPricing}</NavLink>
                    <NavLink onClick={() => handleNavClick('careers')} active={activePage === 'careers'}>{t.navCareers}</NavLink>
                    <NavLink onClick={() => handleNavClick('portfolio')} active={activePage === 'portfolio'}>
  Portfolio
</NavLink>

                </nav>
                <div className="hidden md:flex items-center gap-4">
  {/* Language selector */}
  <div className="flex items-center border border-gray-300 rounded-full">
    <button
      onClick={() => setLanguage('en')}
      className={`px-3 py-1 text-sm rounded-full ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
    >
      EN
    </button>
    <button
      onClick={() => setLanguage('tr')}
      className={`px-3 py-1 text-sm rounded-full ${language === 'tr' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
    >
      TR
    </button>
  </div>

  {/* 🟣 New Login Button */}
  <a
    href="https://wellbeing.pulsara.com.tr/auth"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
  >
    Login
  </a>

  {/* Existing Demo Button */}
  <CTAButton onClick={() => handleNavClick('contact')}>
    {t.requestDemo}
  </CTAButton>
</div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
                        {isOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
   



            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-xl">
                  <div className="px-4 sm:px-6 pt-2 pb-4 space-y-3">
  {/* language toggle */}
  <div className="flex items-center border border-gray-300 rounded-full w-fit mb-3">
    <button
      onClick={() => { setLanguage('en'); setIsOpen(false); }}
      className={`px-3 py-1 text-sm rounded-full ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
    >
      EN
    </button>
    <button
      onClick={() => { setLanguage('tr'); setIsOpen(false); }}
      className={`px-3 py-1 text-sm rounded-full ${language === 'tr' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
    >
      TR
    </button>
  </div>

  <a onClick={() => handleNavClick('home')} className="block text-gray-800 hover:text-purple-600 font-semibold py-2">{t.navHome}</a>
  <a onClick={() => handleNavClick('products')} className="block text-gray-800 hover:text-purple-600 font-semibold py-2">{t.navProducts}</a>
  <a onClick={() => handleNavClick('pricing')} className="block text-gray-800 hover:text-purple-600 font-semibold py-2">{t.navPricing}</a>
  <a onClick={() => handleNavClick('careers')} className="block text-gray-800 hover:text-purple-600 font-semibold py-2">{t.navCareers}</a>
  <a onClick={() => handleNavClick('portfolio')} className="block text-gray-800 hover:text-purple-600 font-semibold py-2">
  Portfolio
</a>


  <CTAButton onClick={() => handleNavClick('contact')} className="w-full mt-2">
    {t.requestDemo}
  </CTAButton>
</div>

                </div>
            )}
        </header>
    );
};

const HomePage = ({ setActivePage, language }) => {
    const t = translations[language];
    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-grid-pattern overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                        <div className="text-center md:text-left">
                             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                                {t.heroTitle.split('&').map((part, i) => i === 1 ? <span key={i} className="text-purple-600">& {part}</span> : part)}
                            </h1>
                            <p className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-gray-600 mb-10">
                               {t.heroSubtitle}
                            </p>
                            <CTAButton onClick={() => setActivePage('contact')} className="w-full sm:w-auto">{t.requestDemo}</CTAButton>

                        </div>
                        <div>
                            <HeroDashboard />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Products Section */}
            <section id="products" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t.platformTitle}</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{t.platformSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 justify-center">
  <FeatureCard
    icon={<IconTrendingUp className="w-8 h-8 text-purple-600" />}
    title={t.wellbeingTitle}
    description={t.wellbeingDesc}
  />
  <FeatureCard
    icon={<IconDollarSign className="w-8 h-8 text-purple-600" />}
    title={t.financeTitle}
    description={t.financeDesc}
  />
  <FeatureCard
    icon={<IconCalendar className="w-8 h-8 text-purple-600" />}
    title={t.rosterTitle}
    description={t.rosterDesc}
  />
</div>

                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50/50 bg-dot-pattern">
            <div className="container mx-auto px-4 sm:px-6">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t.howItWorksTitle}</h2>
                         <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{t.howItWorksSubtitle}</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
                        <div className="text-center max-w-xs">
                             <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 text-3xl font-bold">1</div>
                             <h3 className="text-xl font-semibold mb-2">{t.step1Title}</h3>
                             <p className="text-gray-600">{t.step1Desc}</p>
                        </div>
                         <div className="text-center max-w-xs">
                             <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 text-3xl font-bold">2</div>
                             <h3 className="text-xl font-semibold mb-2">{t.step2Title}</h3>
                             <p className="text-gray-600">{t.step2Desc}</p>
                        </div>
                         <div className="text-center max-w-xs">
                             <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 text-3xl font-bold">3</div>
                             <h3 className="text-xl font-semibold mb-2">{t.step3Title}</h3>
                             <p className="text-gray-600">{t.step3Desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
      Works With Your Tools
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
      Connect Pulsara seamlessly with your favorite platforms.
    </p>
    <div className="flex flex-wrap justify-center gap-12 items-center">
    <img src={jiraLogo} alt="Jira" className="h-10 sm:h-12 max-w-full object-contain grayscale hover:grayscale-0 transition" />

      <img src={googleLogo} alt="Google Workspace" className="h-12 grayscale hover:grayscale-0 transition" />
      <img src={outlookLogo} alt="Outlook" className="h-12 grayscale hover:grayscale-0 transition" />
    </div>
  </div>
</section>


            {/* Call to Action */}
            <section className="py-20 bg-purple-600">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ctaTitle}</h2>
                    <p className="text-purple-200 text-lg max-w-2xl mx-auto mb-8">{t.ctaSubtitle}</p>
                    <CTAButton onClick={() => setActivePage('contact')} className="bg-white text-purple-600 hover:bg-gray-100">{t.ctaButton}</CTAButton>
                </div>
            </section>
        </>
    );
};


// --- NEW PRODUCT PAGE & CHARTS ---
const RadialChartCircle = ({ value, color, radius, strokeWidth, size, index }) => {
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(value), 100);
        return () => clearTimeout(timer);
    }, [value]);
    
    const offset = circumference - (progress / 100) * circumference;

    return (
        <g transform={`rotate(-90 ${size/2} ${size/2})`}>
            <circle stroke="#e5e7eb" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size/2} cy={size/2} />
            <circle
                stroke={color} fill="transparent" strokeWidth={strokeWidth} strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={offset}
                r={radius} cx={size/2} cy={size/2}
                style={{ transition: `stroke-dashoffset 1.5s ${index * 0.2}s cubic-bezier(0.65, 0, 0.35, 1)` }}
            />
        </g>
    );
};

const WellbeingRadialChart = () => {
    const data = [
        { label: "Motivation", value: 85, color: "#8b5cf6" },
        { label: "Engagement", value: 92, color: "#60a5fa" },
        { label: "Stress Level", value: 25, color: "#f472b6" },
    ];
    const size = 280; // keeps geometry, SVG will scale via CSS
    const strokeWidth = 20;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full h-full min-h-[300px]">
            <div className="relative flex-shrink-0">
                <svg className="w-56 sm:w-72 h-auto" viewBox={`0 0 ${size} ${size}`}>
                    {data.map((item, index) => {
                        const radius = size / 2 - strokeWidth / 2 - index * (strokeWidth + 5);
                        return (
                           <RadialChartCircle
                                key={index}
                                value={item.value}
                                color={item.color}
                                radius={radius}
                                strokeWidth={strokeWidth}
                                size={size}
                                index={index}
                           />
                        );
                    })}
                </svg>
            </div>
            <div className="flex flex-col space-y-4">
                 {data.map((item, index) => (
                    <div key={index} className="flex items-center" style={{ animation: `fade-in 1s ${1 + index*0.2}s ease forwards`, opacity: 0}}>
                        <div className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: item.color}}></div>
                        <div>
                            <span className="font-bold text-gray-700 text-lg">{item.value}%</span>
                            <span className="text-gray-500 text-sm ml-2">{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FinanceWaterfallChart = () => {
    const data = [
        { label: "Q1 Revenue", value: 80, isPositive: true },
        { label: "New Sales", value: 35, isPositive: true },
        { label: "Expenses", value: -20, isPositive: false },
        { label: "Q2 Revenue", value: 95, isPositive: true, isTotal: true },
    ];
    
    let runningTotal = 0;
    const maxAccumulated = data.reduce((max, item) => {
        if (!item.isTotal) {
            runningTotal += item.value;
            return Math.max(max, runningTotal);
        }
        return max;
    }, 0);
    const maxValue = Math.max(maxAccumulated, ...data.filter(d => d.isTotal).map(d => d.value), 1);


    let accumulated = 0;

    return (
        <div className="w-full h-80 bg-gray-50/70 p-6 rounded-xl flex items-end justify-around space-x-4">
            {data.map((item, index) => {
                const bottom = item.isTotal ? 0 : (item.isPositive ? accumulated : accumulated + item.value);
                const top = bottom + Math.abs(item.value);
                if (!item.isTotal) accumulated = top;

                return (
                    <div key={index} className="relative flex-1 h-full flex flex-col items-center justify-end group">
                        <div className="absolute -top-6 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                            {item.isPositive && !item.isTotal ? '+' : ''}{item.value}k
                        </div>
                        <div className="w-full relative" style={{ height: `${(Math.abs(item.value) / maxValue) * 100}%`, bottom: `${(bottom / maxValue) * 100}%`, animation: `bar-grow 1s ${index * 150}ms ease-out forwards`, transformOrigin: 'bottom', transform: 'scaleY(0)'}}>
                            <div className={`absolute bottom-0 w-full h-full rounded-t-md ${item.isTotal ? 'bg-green-500' : item.isPositive ? 'bg-purple-500' : 'bg-pink-400'}`}></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 font-semibold">{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

const RosterCoverageChart = () => {
    const required = "0,100 10,80 20,70 30,60 40,60 50,70 60,80 70,90 80,90 90,95 100,100";
    const scheduled = "0,100 10,85 20,70 30,65 40,60 50,75 60,80 70,85 80,90 90,95 100,100";
    return (
        <div className="w-full bg-gray-50/70 p-6 rounded-xl">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-64">
                <path d={`M0,100 ${required} L100,100 Z`} fill="#ede9fe"/>
                <polyline fill="none" stroke="#8b5cf6" strokeWidth="2" points={scheduled} style={{ strokeDasharray: 400, animation: 'line-draw 2s ease-out forwards' }}/>
             </svg>
             <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
             </div>
             <div className="flex justify-center space-x-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple-200 mr-2"></span>Required Staff</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>Scheduled Staff</div>
            </div>
        </div>
    )
}

const ProductsPage = ({ setActivePage, language }) => {
    const t = translations[language];
    return (
        <div className="pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t.productsPageTitle}</h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">{t.productsPageSubtitle}</p>
                </div>

                {/* Wellbeing Tracker */}
                <section className="mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.wellbeingSectionTitle}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">{t.wellbeingSectionDesc}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.wellbeingFeature1}</span></li>
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.wellbeingFeature2}</span></li>
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.wellbeingFeature3}</span></li>
                            </ul>
                            <CTAButton onClick={() => setActivePage('contact')}>{t.exploreWellbeing}</CTAButton>
                        </div>
                        <div className="order-first lg:order-last max-w-[700px] mx-auto w-full">
                            <WellbeingRadialChart />
                        </div>
                    </div>
                </section>
{/* Performance Manager */}
<section className="mt-32 lg:mt-40 mb-24">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
    {/* Text */}
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.performanceSectionTitle}</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">{t.performanceSectionDesc}</p>
      <ul className="space-y-3 mb-8">
        <li className="flex items-start">
          <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
          <span>{t.performanceFeature1}</span>
        </li>
        <li className="flex items-start">
          <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
          <span>{t.performanceFeature2}</span>
        </li>
        <li className="flex items-start">
          <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
          <span>{t.performanceFeature3}</span>
        </li>
      </ul>
      <CTAButton onClick={() => setActivePage('contact')}>{t.explorePerformance}</CTAButton>
    </div>

    {/* Simple, mobile-friendly KPI widget */}
    <div className="order-first lg:order-last w-full max-w-xl mx-auto">
  <div className="w-full bg-gray-50/70 p-8 rounded-xl border border-gray-200">
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
     <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <p className="text-xs text-gray-500">Quarterly Goal Attainment</p>
            <p className="text-3xl font-extrabold text-gray-800 mt-1">92%</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <p className="text-xs text-gray-500">On-Track Objectives</p>
            <p className="text-3xl font-extrabold text-gray-800 mt-1">38</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <p className="text-xs text-gray-500">Overdue Reviews</p>
            <p className="text-3xl font-extrabold text-gray-800 mt-1">4</p>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-2">Engagement Trend</p>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-20">
            <polyline
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              points="0,30 10,28 20,25 30,26 40,22 50,18 60,16 70,14 80,15 90,12 100,10"
              style={{ strokeDasharray: 300, animation: 'line-draw 1.8s ease-out forwards' }}
            />
          </svg>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




                {/* Finance Manager */}
                <section className="mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                         <div>
                            <FinanceWaterfallChart />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.financeSectionTitle}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">{t.financeSectionDesc}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.financeFeature1}</span></li>
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.financeFeature2}</span></li>
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.financeFeature3}</span></li>
                                
                            </ul>
                            <CTAButton onClick={() => setActivePage('contact')}>{t.exploreFinance}</CTAButton>
                        </div>
                    </div>
                </section>

                 {/* Roster Manager */}
                <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.rosterSectionTitle}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">{t.rosterSectionDesc}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.rosterFeature1}</span></li>
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.rosterFeature2}</span></li>
                                <li className="flex items-start"><IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" /><span>{t.rosterFeature3}</span></li>
                            </ul>
                            <CTAButton onClick={() => setActivePage('contact')}>{t.exploreRostering}</CTAButton>
                        </div>
                        <div className="order-first lg:order-last max-w-[700px] mx-auto w-full">
                           <RosterCoverageChart />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

const PricingPage = ({ setActivePage, language }) => {
    const t = translations[language];
    const PricingCard = ({ plan, price, features, isFeatured = false }) => (
        <div className={`border rounded-2xl p-8 flex flex-col ${isFeatured ? 'bg-purple-600 text-white border-purple-600 shadow-2xl' : 'bg-white'}`}>
            <h3 className={`text-2xl font-bold ${isFeatured ? 'text-white' : 'text-gray-800'}`}>{plan}</h3>
            <p className={`mt-4 text-4xl font-extrabold ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{price}
              <span className={`text-base font-medium ml-1 ${isFeatured ? 'text-purple-200' : 'text-gray-500'}`}>{price.startsWith('$') || price.startsWith('₺') ? t.priceSuffix : ''}</span>
            </p>
            <p className={`mt-2 text-sm ${isFeatured ? 'text-purple-200' : 'text-gray-500'}`}>{t.billedAnnually}</p>
            <ul className="mt-8 space-y-4 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <IconCheckCircle className={`w-6 h-6 mr-3 flex-shrink-0 ${isFeatured ? 'text-white' : 'text-purple-500'}`} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button onClick={() => setActivePage('contact')} className={`w-full mt-10 py-3 font-semibold rounded-lg transition-colors ${isFeatured ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                {t.getStarted}
            </button>
        </div>
    );

    return (
        <div className="pt-32 pb-20 bg-gray-50/50 bg-grid-pattern">
           <div className="container mx-auto px-4 sm:px-6">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t.pricingTitle}</h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">{t.pricingSubtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 justify-center">

                <PricingCard
    plan={t.starterPlan}
    price={t.starterPrice}
    features={t.pricingStarterFeatures}
/>

<PricingCard
    plan={t.proPlan}
    price={t.proPrice}
    isFeatured={true}
    features={t.pricingProFeatures}
/>

<PricingCard
    plan={t.enterprisePlan}
    price={t.enterprisePrice}
    features={t.pricingEnterpriseFeatures}
/>

                    
                </div>
            </div>
        </div>
    );
};

const CareersPage = ({ setActivePage, language }) => {
    const t = translations[language];
    const JobOpening = ({ title, location, type }) => (
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex justify-between items-center border border-gray-200/50">
            <div>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600 mt-1">{location} &middot; {type}</p>
            </div>
            <a
  href="mailto:careers@pulsara.com.tr?subject=Job Application – Fullstack Engineer"
  className="bg-purple-100 text-purple-700 font-semibold px-5 py-2 rounded-lg hover:bg-purple-200 transition-colors inline-block"
>
  Apply
</a>

        </div>
    );

    return (
        <div className="pt-32 pb-20 bg-gray-50/50 bg-dot-pattern">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t.careersTitle}</h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">{t.careersSubtitle}</p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.openPositions}</h2>
                     <div className="space-y-6">
   <JobOpening
     title={t.jobFullstackTitle}
     location={t.jobFullstackLocation}
     type={t.jobFullstackType}
   />
 </div>
                </div>
            </div>
        </div>
    );
};

const AboutPage = ({ language }) => {
    return (
      <div className="pt-32 pb-20 bg-gray-50/50 bg-grid-pattern">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              About Us
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">
              Our journey, our mission, and the values that guide us at Pulsara.
            </p>
          </div>
  
          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Pulsara was founded with a simple vision: to bring automation in the most important aspects of a business. 
                We believe that technology should empower people, not overwhelm them.
                Our team is passionate about building tools that make workplaces 
                healthier, fairer, and more efficient while cutting costs significantly.
              </p>
            </div>
            <div className="bg-white/70 p-6 rounded-2xl shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Team working" 
                className="rounded-xl object-cover"
              />
            </div>
          </div>
  
          {/* Mission / Values */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/70 p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-purple-600 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To help companies unlock the full potential of their teams through
                data-driven wellbeing, finance, and workforce management.
              </p>
            </div>
            <div className="bg-white/70 p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-purple-600 mb-3">Our Values</h3>
              <p className="text-gray-600">
                Transparency, fairness, and human-first innovation guide everything
                we build at Pulsara.
              </p>
            </div>
            <div className="bg-white/70 p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-purple-600 mb-3">Our Team</h3>
              <p className="text-gray-600">
                A diverse team of engineers, designers, and dreamers committed to
                reshaping the workplace experience for companies worldwide.
              </p>
            </div>
          </div>
  
        </div>
      </div>
    );
  };
  


  const PortfolioPage = ({ language }) => {
    return (
      <div className="pt-32 pb-20 bg-gray-50/50 bg-dot-pattern">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Portfolio
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">
              Some of the innovative companies we collaborate with.
            </p>
          </div>
  
          {/* Grid of Companies */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            
            {/* Example Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50 p-6 flex flex-col items-center text-center">
            <img 
  src={mertekLogo} 
  alt="Mertek Engineering" 
  className="h-16 mb-4 object-contain" 
/>

              <h3 className="text-xl font-bold text-gray-800">Mertek Engineering</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Trusted partner in engineering solutions. Over 30 years of experience
                in automotive & aviation, working with Mercedes-Benz, Sisecam, Boeing.
              </p>
            </div>
  
            {/* Placeholder for more companies */}
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-dashed border-gray-300 p-6 flex items-center justify-center text-gray-500 italic">
              More partners coming soon...
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  const ContactPage = ({ language }) => {
    const t = translations[language];
    const isThanks =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("thanks") === "1";
  
    return (
      <div className="pt-32 pb-20 bg-gray-50/50 bg-grid-pattern">
        <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t.contactTitle}</h1>
              <p className="text-lg text-gray-600 mt-4">{t.contactSubtitle}</p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>{t.contactFeature1}</span>
                </li>
                <li className="flex items-start">
                  <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>{t.contactFeature2}</span>
                </li>
                <li className="flex items-start">
                  <IconCheckCircle className="w-6 h-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>{t.contactFeature3}</span>
                </li>
              </ul>
            </div>
  
            <div className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200/50">
              {isThanks && (
                <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
                  {t.thankYou} — {t.demoSuccess}
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
                  value={typeof window !== "undefined" ? window.location.origin + "/business?thanks=1" : "https://pulsara.com.tr/business?thanks=1"}
                />
                <input type="hidden" name="_subject" value="New Demo Request — Pulsara" />
                <input type="text" name="_gotcha" style={{ display: "none" }} />
  
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t.fullName}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t.workEmail}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">{t.companyName}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
  
                  <div>
                    <label htmlFor="employees" className="block text-sm font-medium text-gray-700">{t.numEmployees}</label>
                    <select
                      id="employees"
                      name="employees"
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option>1-50</option>
                      <option>51-250</option>
                      <option>251-1000</option>
                      <option>1000+</option>
                    </select>
                  </div>
  
                  <div>
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300"
                    >
                      {t.scheduleDemo}
                    </button>
                  </div>
                </div>
              </form>
  
            </div>
          </div>
        </div>
      </div>
    );
  };
  


const BusinessFooter = ({ setActivePage, language }) => {
    const t = translations[language];
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <PulsaraLogo />
                        <p className="mt-4 text-gray-400">AI-Enhanced Business Management</p>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">{t.footerProducts}</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products');}} className="text-gray-400 hover:text-white">{t.wellbeingTitle}</a></li>
                            <li><a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products');}} className="text-gray-400 hover:text-white">{t.financeTitle}</a></li>
                            <li><a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products');}} className="text-gray-400 hover:text-white">{t.rosterTitle}</a></li>
                            <li><a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products');}} className="text-gray-400 hover:text-white">{t.performanceTitle}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">{t.footerCompany}</h4>
                        <ul className="mt-4 space-y-2">
                        <li>
  <button onClick={() => setActivePage('about')} className="text-gray-400 hover:text-white">
    {t.aboutUs}
  </button>
</li>

                            <li><button onClick={() => setActivePage('pricing')} className="text-gray-400 hover:text-white">{t.navPricing}</button></li>
                            <li><button onClick={() => setActivePage('careers')} className="text-gray-400 hover:text-white">{t.navCareers}</button></li>
                            
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-semibold tracking-wider uppercase">{t.footerContact}</h4>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => setActivePage('contact')} className="text-gray-400 hover:text-white">{t.requestDemo}</button></li>
                            <li><a href="mailto:info@pulsara.com.tr" className="text-gray-400 hover:text-white">info@pulsara.com.tr</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Pulsara AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
// This wraps your current site (Header + pages + Footer)
function BusinessApp() {
    const [activePage, setActivePage] = useState("home");
    const [language, setLanguage] = useState("en");
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [activePage]);
  
    const renderPage = () => {
      switch (activePage) {
        case "home":
          return <HomePage setActivePage={setActivePage} language={language} />;
        case "products":
          return <ProductsPage setActivePage={setActivePage} language={language} />;
        case "pricing":
          return <PricingPage setActivePage={setActivePage} language={language} />;
        case "careers":
          return <CareersPage setActivePage={setActivePage} language={language} />;
        case "contact":
          return <ContactPage language={language} />;
        case "about":
          return <AboutPage language={language} />;
        case "portfolio":
          return <PortfolioPage language={language} />;
        default:
          return <HomePage setActivePage={setActivePage} language={language} />;
      }
    };
    
  
    return (
      <>
        {/* 🔥 Restored keyframe animations for charts */}
        <style>{`
          @keyframes bar-grow {
            from { transform: scaleY(0); }
            to { transform: scaleY(1); }
          }
          @keyframes line-draw {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
  
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          language={language}
          setLanguage={setLanguage}
        />
        <main>{renderPage()}</main>
        <BusinessFooter setActivePage={setActivePage} language={language} />
      </>
    );
  }
  
  
  export default function App() {
    console.log('App component rendering...');
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <LanguageProvider>
            <ScrollToTop />
            <Routes>
            {/* Kartaca style homepage - DEFAULT */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
      
            {/* Also available at /home */}
            <Route path="/home" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
      
            {/* Contact page */}
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            } />
      
            {/* Full page routes */}
            <Route path="/solutions" element={
              <>
                <Navbar />
                <Solutions />
                <Footer />
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <Products />
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            } />
            <Route path="/company" element={
              <>
                <Navbar />
                <Company />
                <Footer />
              </>
            } />
      
            {/* Business site (old version) */}
            <Route path="/business" element={<BusinessApp />} />
      
            {/* Fallback: unknown paths redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </LanguageProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }
  
  