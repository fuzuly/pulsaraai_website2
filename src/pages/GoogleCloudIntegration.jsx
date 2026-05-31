import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const GoogleCloudIntegration = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState({});

  const content = {
    en: {
      seo: {
        title: "Pulsara x Google Cloud , How Pulsara Uses Google Cloud Infrastructure",
        description: "Pulsara uses Google Cloud Run, Cloud Functions, and plans to expand with Vertex AI, BigQuery, and Google Workspace integrations. Learn how Google Cloud powers our enterprise AI platform."
      },
      hero: {
        title: "Pulsara x Google Cloud",
        badge: "Google Cloud Platform",
        subtitle: "How Pulsara Uses Google Cloud Infrastructure",
        description: "Pulsara is an AI-powered workforce and wellbeing intelligence platform, and Google Cloud plays an important role in our technology stack. We use Google Cloud services to deliver scalable, secure, and reliable wellbeing analytics for enterprises. This page explains how Pulsara uses Google Cloud today and how our future roadmap continues to expand our GCP-based capabilities."
      },
      currentUsage: {
        title: "How Pulsara Uses Google Cloud Today",
        items: [
          {
            title: "Serverless Microservices on Cloud Run",
            description: "Pulsara runs cloud-native microservices on Google Cloud Run. These services handle wellbeing and workforce-related workloads with automatic scaling, regional deployment in Europe, secure HTTPS endpoints, and low-latency communication with our backend. Cloud Run helps us operate production workloads without managing servers."
          },
          {
            title: "Cloud Functions for Lightweight Analysis",
            description: "We also use Cloud Functions (2nd gen) for lightweight, event-driven tasks such as processing wellbeing metrics and serving real-time JSON insights to internal dashboards and tools. Functions give us an event-driven architecture on top of Google Cloud in a very cost-efficient way."
          },
          {
            title: "Security, Reliability, and Compliance",
            description: "Because Pulsara works with HR and employee wellbeing data, we rely on Google Cloud's identity and access management (IAM), regional deployment options, and enterprise-grade security. GCP provides the reliability and governance that our enterprise customers expect."
          }
        ]
      },
      bigquery: {
        title: "BigQuery-Powered Sentiment Analytics",
        subtitle: "Advanced analytics for workforce wellbeing insights",
        description: "Pulsara imports anonymized sentiment data into BigQuery inside our pulsara-gcp project.",
        analysisTitle: "We analyze user's sentiment scores, demographics, and roles using SQL to identify:",
        insights: [
          "Average sentiment per role and team",
          "Trends over time across the organization",
          "Differences by age and gender",
          "Correlations between demographics and wellbeing"
        ],
        conclusion: "These BigQuery insights feed Pulsara's wellbeing dashboards and our future AI models on Vertex AI."
      },
      architecture: {
        title: "Architecture Overview",
        subtitle: "How Pulsara integrates with Google Cloud Platform",
        steps: [
          { label: "Pulsara Application", desc: "Enterprise AI Platform" },
          { label: "HTTPS Request", desc: "Secure API communication" },
          { label: "Google Cloud Run Function", desc: "Serverless compute endpoint" },
          { label: "JSON Response", desc: "Structured wellbeing analytics" },
          { label: "Pulsara Dashboard", desc: "Real-time analytics visualization" }
        ],
        flow: "Pulsara → HTTPS request → Google Cloud Run → JSON response → Pulsara dashboard"
      },
      roadmap: {
        title: "Where Pulsara Is Going with Google Cloud",
        subtitle: "Our roadmap for expanding GCP-based capabilities",
        items: [
          {
            title: "Vertex AI for Wellbeing Analytics",
            description: "We plan to integrate Vertex AI / Gemini for burnout risk predictions, workforce stress analysis, mood classification, and personalized wellbeing suggestions. This allows us to move frequent AI workloads onto Google Cloud and optimize cost while keeping high-quality insights."
          },
          {
            title: "BigQuery for Workforce Intelligence",
            description: "BigQuery will be used to store and analyze large-scale workforce and wellbeing datasets: activity metrics, survey responses, historical trends, and team-level performance indicators. This powers advanced analytics dashboards for HR and leadership."
          },
          {
            title: "Google Workspace Integrations",
            description: "Many of our customers use Google Workspace. Our roadmap includes integrating with Calendar, Gmail, Drive, and Chat (where allowed and aggregated) to understand meeting load, collaboration intensity, and communication patterns that impact wellbeing."
          },
          {
            title: "Cloud Run as Core AI Infrastructure",
            description: "Future Pulsara AI modules,such as risk scoring, mood inference, AI-assisted scheduling, and wellbeing recommendations,will run on Cloud Run for predictable pricing, strong security, and effortless global scale."
          }
        ]
      },
      whyGcp: {
        title: "Why Pulsara Chooses Google Cloud",
        items: [
          "Enterprise-grade reliability and security",
          "Serverless scalability with Cloud Run and Cloud Functions",
          "Native AI capabilities through Vertex AI and Gemini",
          "Strong alignment with customers using Google Workspace",
          "EU region deployment options for compliance",
          "Lower operational overhead vs. managing our own servers"
        ]
      },
      demo: {
        title: "Integration Demo",
        description: "We provide an internal demo that showcases how Pulsara services communicate with Google Cloud Run functions to retrieve wellbeing analytics in real time. A public version of this demo can be shared on request with partners and customers evaluating Pulsara's Google Cloud architecture.",
        watchTitle: "Watch Integration Demo",
        watchDesc: "See how Pulsara integrates with Google Cloud Run to deliver real-time wellbeing analytics.",
        requestButton: "Request Demo"
      },
      cta: {
        title: "Request a Google Cloud Architecture Demo",
        description: "See how Pulsara leverages Google Cloud Platform for enterprise AI solutions. Schedule a personalized demo with our team.",
        button: "Schedule Demo"
      }
    },
    tr: {
      seo: {
        title: "Pulsara x Google Cloud , Pulsara'nın Google Cloud Platform ile entegrasyonu",
        description: "Pulsara, Google Cloud Run, Cloud Functions kullanıyor ve Vertex AI, BigQuery ve Google Workspace entegrasyonları ile genişlemeyi planlıyor. Google Cloud'un kurumsal AI platformumuzu nasıl güçlendirdiğini öğrenin."
      },
      hero: {
        title: "Pulsara x Google Cloud",
        badge: "Google Cloud Platform",
        subtitle: "Pulsara'nın Google Cloud Platform ile entegrasyonu",
        description: "Pulsara, AI destekli bir işgücü ve wellbeing zekası platformudur ve Google Cloud teknoloji yığınımızda önemli bir rol oynar. Google Cloud hizmetlerini, işletmeler için ölçeklenebilir, güvenli ve güvenilir wellbeing analitiği sunmak için kullanıyoruz. Bu sayfa, Pulsara'nın bugün Google Cloud'u nasıl kullandığını ve gelecek yol haritamızın GCP tabanlı yeteneklerimizi nasıl genişletmeye devam ettiğini açıklamaktadır."
      },
      currentUsage: {
        title: "Pulsara Bugün Google Cloud'u Nasıl Kullanıyor",
        items: [
          {
            title: "Cloud Run'da Sunucusuz Mikroservisler",
            description: "Pulsara, Google Cloud Run'da bulut tabanlı mikroservisler çalıştırır. Bu servisler, otomatik ölçeklendirme, Avrupa'da bölgesel dağıtım, güvenli HTTPS uç noktaları ve arka ucumuzla düşük gecikmeli iletişim ile wellbeing ve işgücü ile ilgili iş yüklerini yönetir. Cloud Run, sunucuları yönetmeden üretim iş yüklerini çalıştırmamıza yardımcı olur."
          },
          {
            title: "Hafif Analiz için Cloud Functions",
            description: "Ayrıca wellbeing metriklerini işleme ve dahili panolara ve araçlara gerçek zamanlı JSON içgörüleri sunma gibi hafif, olay odaklı görevler için Cloud Functions (2. nesil) kullanıyoruz. Functions, Google Cloud'un üzerinde çok maliyet etkin bir şekilde olay odaklı bir mimari sağlar."
          },
          {
            title: "Güvenlik, Güvenilirlik ve Uyumluluk",
            description: "Pulsara HR ve çalışan wellbeing verileriyle çalıştığı için, Google Cloud'un kimlik ve erişim yönetimi (IAM), bölgesel dağıtım seçenekleri ve kurumsal düzeyde güvenliğine güveniyoruz. GCP, kurumsal müşterilerimizin beklediği güvenilirlik ve yönetişimi sağlar."
          }
        ]
      },
      bigquery: {
        title: "BigQuery Destekli Duygu Analitiği",
        subtitle: "İşgücü wellbeing içgörüleri için gelişmiş analitik",
        description: "Pulsara, anonimleştirilmiş duygu verilerini pulsara-gcp projemiz içindeki BigQuery'ye aktarır.",
        analysisTitle: "SQL kullanarak kullanıcı duygu skorları, demografik veriler ve roller analiz ederek şunları belirliyoruz:",
        insights: [
          "Rol ve takım başına ortalama duygu",
          "Organizasyon genelinde zaman içindeki trendler",
          "Yaş ve cinsiyete göre farklılıklar",
          "Demografik veriler ile wellbeing arasındaki korelasyonlar"
        ],
        conclusion: "Bu BigQuery içgörüleri, Pulsara'nın wellbeing panolarını ve Vertex AI'daki gelecekteki AI modellerimizi besler."
      },
      architecture: {
        title: "Mimariye Genel Bakış",
        subtitle: "Pulsara'nın Google Cloud Platform ile nasıl entegre olduğunu inceleyin",
        steps: [
          { label: "Pulsara Uygulaması", desc: "Kurumsal AI Platformu" },
          { label: "HTTPS İsteği", desc: "Güvenli API iletişimi" },
          { label: "Google Cloud Run Fonksiyonu", desc: "Sunucusuz bilgi işlem uç noktası" },
          { label: "JSON Yanıtı", desc: "Yapılandırılmış wellbeing analitiği" },
          { label: "Pulsara Panosu", desc: "Gerçek zamanlı analitik görselleştirme" }
        ],
        flow: "Pulsara → HTTPS isteği → Google Cloud Run → JSON yanıtı → Pulsara panosu"
      },
      roadmap: {
        title: "Pulsara Google Cloud ile Nereye Gidiyor",
        subtitle: "GCP tabanlı yeteneklerimizi genişletme yol haritamız",
        items: [
          {
            title: "Wellbeing Analitiği için Vertex AI",
            description: "Tükenmişlik riski tahminleri, işgücü stres analizi, ruh hali sınıflandırması ve kişiselleştirilmiş wellbeing önerileri için Vertex AI / Gemini entegre etmeyi planlıyoruz. Bu, sık kullanılan AI iş yüklerini Google Cloud'a taşımamıza ve yüksek kaliteli içgörüleri korurken maliyeti optimize etmemize olanak tanır."
          },
          {
            title: "İşgücü Zekası için BigQuery",
            description: "BigQuery, büyük ölçekli işgücü ve wellbeing veri setlerini depolamak ve analiz etmek için kullanılacaktır: aktivite metrikleri, anket yanıtları, tarihsel trendler ve takım düzeyinde performans göstergeleri. Bu, HR ve liderlik için gelişmiş analitik panoları güçlendirir."
          },
          {
            title: "Google Workspace Entegrasyonları",
            description: "Müşterilerimizin birçoğu Google Workspace kullanıyor. Yol haritamız, toplantı yükünü, işbirliği yoğunluğunu ve wellbeing etkileyen iletişim kalıplarını anlamak için Takvim, Gmail, Drive ve Chat (izin verildiğinde ve toplandığında) ile entegrasyonu içerir."
          },
          {
            title: "Temel AI Altyapısı Olarak Cloud Run",
            description: "Risk puanlama, ruh hali çıkarımı, AI destekli zamanlama ve wellbeing önerileri gibi gelecekteki Pulsara AI modülleri, öngörülebilir fiyatlandırma, güçlü güvenlik ve zahmetsiz küresel ölçek için Cloud Run'da çalışacaktır."
          }
        ]
      },
      whyGcp: {
        title: "Pulsara Neden Google Cloud'u Seçiyor",
        items: [
          "Kurumsal düzeyde güvenilirlik ve güvenlik",
          "Cloud Run ve Cloud Functions ile sunucusuz ölçeklenebilirlik",
          "Vertex AI ve Gemini aracılığıyla yerel AI yetenekleri",
          "Google Workspace kullanan müşterilerle güçlü uyum",
          "Uyumluluk için AB bölgesi dağıtım seçenekleri",
          "Kendi sunucularımızı yönetmeye kıyasla daha düşük operasyonel yük"
        ]
      },
      demo: {
        title: "Entegrasyon Demo",
        description: "Pulsara servislerinin gerçek zamanlı olarak wellbeing analitiği almak için Google Cloud Run fonksiyonlarıyla nasıl iletişim kurduğunu gösteren dahili bir demo sağlıyoruz. Bu demoyu, Pulsara'nın Google Cloud mimarisini değerlendiren ortaklar ve müşterilerle talep üzerine paylaşabiliriz.",
        watchTitle: "Entegrasyon Demosunu İzleyin",
        watchDesc: "Pulsara'nın gerçek zamanlı wellbeing analitiği sunmak için Google Cloud Run ile nasıl entegre olduğunu görün.",
        requestButton: "Demo Talep Et"
      },
      cta: {
        title: "Google Cloud Mimari Demosu Talep Edin",
        description: "Pulsara'nın kurumsal AI çözümleri için Google Cloud Platform'u nasıl kullandığını görün. Ekibimizle kişiselleştirilmiş bir demo planlayın.",
        button: "Demo Planla"
      }
    }
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <SEO 
        title={t.seo.title}
        description={t.seo.description}
      />
      
      {/* Premium Decorative Blob Shapes - Top Left (Main) */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] pointer-events-none z-0 blob-top-left"
        style={{ 
          background: 'radial-gradient(ellipse at 30% 30%, rgba(236, 72, 153, 0.8) 0%, rgba(219, 39, 119, 0.7) 20%, rgba(168, 85, 247, 0.6) 40%, rgba(139, 92, 246, 0.5) 60%, rgba(99, 102, 241, 0.4) 80%, rgba(79, 70, 229, 0.2) 100%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(60px)',
          mixBlendMode: 'normal',
          opacity: 0.9,
          transform: 'translate(-10%, -10%)'
        }}
      ></div>
      
      {/* Premium Decorative Blob Shapes - Top Left (Glow Layer) */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] pointer-events-none z-0 blob-top-left blob-glow"
        style={{ 
          background: 'radial-gradient(ellipse at 30% 30%, rgba(236, 72, 153, 0.5) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(99, 102, 241, 0.3) 100%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          opacity: 0.6,
          transform: 'translate(-10%, -10%)'
        }}
      ></div>
      
      {/* Premium Decorative Blob Shapes - Bottom Right (Main) */}
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] pointer-events-none z-0 blob-bottom-right"
        style={{ 
          background: 'radial-gradient(ellipse at 70% 70%, rgba(99, 102, 241, 0.8) 0%, rgba(129, 140, 248, 0.7) 20%, rgba(168, 85, 247, 0.6) 40%, rgba(192, 132, 252, 0.5) 60%, rgba(236, 72, 153, 0.4) 80%, rgba(251, 113, 133, 0.2) 100%)',
          borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          filter: 'blur(60px)',
          mixBlendMode: 'normal',
          opacity: 0.9,
          transform: 'translate(10%, 10%)'
        }}
      ></div>
      
      {/* Premium Decorative Blob Shapes - Bottom Right (Glow Layer) */}
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] pointer-events-none z-0 blob-bottom-right blob-glow"
        style={{ 
          background: 'radial-gradient(ellipse at 70% 70%, rgba(99, 102, 241, 0.5) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.3) 100%)',
          borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          opacity: 0.6,
          transform: 'translate(10%, 10%)'
        }}
      ></div>
      
      <style>{`
        @keyframes blob-float {
          0%, 100% { 
            transform: translate(-10%, -10%) scale(1) rotate(0deg);
          }
          50% { 
            transform: translate(-5%, -15%) scale(1.05) rotate(5deg);
          }
        }
        @keyframes blob-float-reverse {
          0%, 100% { 
            transform: translate(10%, 10%) scale(1) rotate(0deg);
          }
          50% { 
            transform: translate(15%, 5%) scale(1.05) rotate(-5deg);
          }
        }
        @keyframes blob-glow {
          0%, 100% { 
            opacity: 0.5;
            filter: blur(150px);
          }
          50% { 
            opacity: 0.6;
            filter: blur(160px);
          }
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .blob-top-left {
          animation: blob-float 20s ease-in-out infinite;
        }
        .blob-bottom-right {
          animation: blob-float-reverse 25s ease-in-out infinite;
        }
        .blob-glow {
          animation: blob-glow 15s ease-in-out infinite;
        }
      `}</style>

      {/* Content Wrapper */}
      <div className="relative z-10">

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-28 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
          <div className="text-center" data-animate id="hero">
            <div className={`fade-in-up ${isVisible['hero'] ? 'visible' : ''}`}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mb-8 shadow-lg shadow-purple-500/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
                {t.hero.title}
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm mb-8">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-semibold text-gray-700">{t.hero.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
                {t.hero.subtitle}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed" style={{ lineHeight: '1.75' }}>
                {t.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Pulsara Uses Google Cloud Today Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-white/85 backdrop-blur-sm" data-animate id="current-usage">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className={`text-center mb-16 sm:mb-20 fade-in-up ${isVisible['current-usage'] ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t.currentUsage.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {t.currentUsage.items.map((item, index) => (
              <div key={index} className={`bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 fade-in-up ${isVisible['current-usage'] ? 'visible' : ''}`} style={{ transitionDelay: `${(index + 1) * 0.1}s` }}>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 text-white shadow-lg shadow-purple-500/30">
                  {index === 0 && (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* BigQuery-Powered Sentiment Analytics Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-slate-50 to-gray-50" data-animate id="bigquery">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className={`text-center mb-16 sm:mb-20 fade-in-up ${isVisible['bigquery'] ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t.bigquery.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.bigquery.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>
          <div className={`bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-gray-100 fade-in-up ${isVisible['bigquery'] ? 'visible' : ''}`}>
            <div className="space-y-8">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto" style={{ lineHeight: '1.7' }}>
                {t.bigquery.description}
              </p>
              
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  {t.bigquery.analysisTitle}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t.bigquery.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 leading-relaxed" style={{ lineHeight: '1.7' }}>{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <p className="text-center text-gray-700 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  {t.bigquery.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Architecture Overview Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-slate-50 to-gray-50" data-animate id="architecture">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className={`text-center mb-16 sm:mb-20 fade-in-up ${isVisible['architecture'] ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t.architecture.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.architecture.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>
          <div className={`bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-gray-100 fade-in-up ${isVisible['architecture'] ? 'visible' : ''}`}>
            <div className="flex flex-col items-center space-y-8">
              {t.architecture.steps.map((step, index) => {
                const letters = ['P', 'H', 'G', 'J', 'D'];
                const isEven = index % 2 === 0;
                return (
                  <React.Fragment key={index}>
                    <div className="flex items-center space-x-6 w-full max-w-2xl">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${isEven ? 'from-purple-500 to-blue-500' : 'from-blue-500 to-purple-500'} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {letters[index]}
                      </div>
                      <div className={`flex-1 bg-gradient-to-br ${isEven ? 'from-purple-50 to-blue-50 border-purple-100' : 'from-blue-50 to-purple-50 border-blue-100'} rounded-2xl p-6 border`}>
                        <p className="font-bold text-gray-900 text-lg">{step.label}</p>
                        <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                      </div>
                    </div>
                    {index < t.architecture.steps.length - 1 && (
                      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="mt-12 p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
              <p className="text-center text-gray-700 font-semibold text-lg">
                {t.architecture.flow.split(' → ').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    <span className={i % 2 === 0 ? "text-purple-600 font-bold" : "text-blue-600 font-bold"}>{part}</span>
                    {i < arr.length - 1 && <span> → </span>}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Pulsara Is Going with Google Cloud (Roadmap) Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-white/85 backdrop-blur-sm" data-animate id="roadmap">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className={`text-center mb-16 sm:mb-20 fade-in-up ${isVisible['roadmap'] ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t.roadmap.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t.roadmap.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {t.roadmap.items.map((item, index) => {
              const icons = [
                <svg key={0} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>,
                <svg key={1} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>,
                <svg key={2} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>,
                <svg key={3} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ];
              return (
                <div key={index} className={`bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 fade-in-up ${isVisible['roadmap'] ? 'visible' : ''}`} style={{ transitionDelay: `${(index + 1) * 0.1}s` }}>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 text-white shadow-lg shadow-purple-500/30">
                    {icons[index]}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ lineHeight: '1.7' }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Pulsara Chooses Google Cloud Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-slate-50 to-gray-50" data-animate id="why-gcp">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className={`text-center mb-16 sm:mb-20 fade-in-up ${isVisible['why-gcp'] ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t.whyGcp.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className={`bg-white rounded-3xl p-10 sm:p-12 md:p-16 shadow-xl border border-gray-100 fade-in-up ${isVisible['why-gcp'] ? 'visible' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.whyGcp.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mt-1 shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg sm:text-xl text-gray-700 flex-1 leading-relaxed" style={{ lineHeight: '1.7' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Demo Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-white/85 backdrop-blur-sm" data-animate id="demo">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className={`text-center mb-16 sm:mb-20 fade-in-up ${isVisible['demo'] ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t.demo.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto" style={{ lineHeight: '1.7' }}>
              {t.demo.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>
            <div className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 sm:p-16 shadow-xl border border-purple-100 fade-in-up ${isVisible['demo'] ? 'visible' : ''}`}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 mb-8 shadow-lg shadow-purple-500/30">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.demo.watchTitle}</h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto" style={{ lineHeight: '1.7' }}>
                  {t.demo.watchDesc}
                </p>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  {t.demo.requestButton}
                </Link>
              </div>
            </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-xl sm:text-2xl text-purple-100 mb-10 leading-relaxed max-w-3xl mx-auto" style={{ lineHeight: '1.7' }}>
            {t.cta.description}
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-white text-purple-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
      </div>
    </section>
  );
};

export default GoogleCloudIntegration;
