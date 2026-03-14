import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SEO from '../components/SEO';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language]?.contact || translations.en.contact;
  const isThanks =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("thanks") === "1";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    company: false,
    message: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = language === 'tr' ? 'Ad Soyad gereklidir' : 'Full name is required';
        } else if (value.trim().length < 2) {
          error = language === 'tr' ? 'Ad Soyad en az 2 karakter olmalıdır' : 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = language === 'tr' ? 'E-posta gereklidir' : 'Email is required';
        } else if (!validateEmail(value)) {
          error = language === 'tr' ? 'Geçerli bir e-posta adresi giriniz' : 'Please enter a valid email address';
        }
        break;
      case 'company':
        if (!value.trim()) {
          error = language === 'tr' ? 'Şirket adı gereklidir' : 'Company name is required';
        } else if (value.trim().length < 2) {
          error = language === 'tr' ? 'Şirket adı en az 2 karakter olmalıdır' : 'Company name must be at least 2 characters';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = language === 'tr' ? 'Mesaj gereklidir' : 'Message is required';
        } else if (value.trim().length < 10) {
          error = language === 'tr' ? 'Mesaj en az 10 karakter olmalıdır' : 'Message must be at least 10 characters';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      name: true,
      email: true,
      company: true,
      message: true,
    };
    setTouched(allTouched);
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      company: validateField('company', formData.company),
      message: validateField('message', formData.message),
    };
    
    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = Object.values(newErrors).every(error => error === '');
    
    if (isValid) {
      e.target.submit();
    }
  };

  const content = {
    en: {
      title: 'Get in touch',
      subtitle: 'Let\'s discuss how we can help transform your business with AI',
      form: {
        name: 'Full Name',
        namePlaceholder: 'John Doe',
        email: 'Work Email',
        emailPlaceholder: 'john@company.com',
        company: 'Company Name',
        companyPlaceholder: 'Your Company',
        message: 'Message',
        messagePlaceholder: 'Tell us about your project or inquiry...',
        sendMessage: 'Send Message',
        thanks: 'Thank you! We\'ll get back to you soon.',
      },
      info: {
        title: 'Contact Information',
        email: 'Email',
        location: 'Location',
        locationValue: 'Istanbul, Turkey',
      },
      schedule: {
        title: 'Schedule a Consultation',
        description: 'Book a free consultation to discuss your AI needs and explore how we can help.',
        button: 'Book a Call',
      },
    },
    tr: {
      title: 'İletişime Geçin',
      subtitle: 'İşletmenizi AI ile nasıl dönüştürebileceğimizi tartışalım',
      form: {
        name: 'Ad Soyad',
        namePlaceholder: 'Ahmet Yılmaz',
        email: 'İş E-postası',
        emailPlaceholder: 'ahmet@sirket.com',
        company: 'Şirket Adı',
        companyPlaceholder: 'Şirketiniz',
        message: 'Mesaj',
        messagePlaceholder: 'Projeniz veya sorunuz hakkında bize bilgi verin...',
        sendMessage: 'Mesaj Gönder',
        thanks: 'Teşekkürler! En kısa sürede size dönüş yapacağız.',
      },
      info: {
        title: 'İletişim Bilgileri',
        email: 'E-posta',
        location: 'Konum',
        locationValue: 'İstanbul, Türkiye',
      },
      schedule: {
        title: 'Danışmanlık Planla',
        description: 'AI ihtiyaçlarınızı tartışmak ve nasıl yardımcı olabileceğimizi keşfetmek için ücretsiz bir danışmanlık rezervasyonu yapın.',
        button: 'Görüşme Planla',
      },
    },
  };

  const c = content[language] || content.en;

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-white">
      <SEO 
        title="Contact Pulsara — Talk to Our AI & Engineering Team"
        description="Get in touch for demos, partnerships, enterprise AI consulting, and product inquiries."
      />
      <div className="container mx-auto px-4 sm:px-6">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-snug">
            {c.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 border border-gray-200 shadow-sm">
            {isThanks && (
              <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
                {c.form.thanks}
              </div>
            )}

            <form
              action="https://formspree.io/f/xpqylrkk"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              {/* Formspree controls */}
              <input
                type="hidden"
                name="_next"
                value={typeof window !== "undefined" ? window.location.origin + "/contact?thanks=1" : "https://pulsara.com.tr/contact?thanks=1"}
              />
              <input type="hidden" name="_subject" value="New Contact Form Submission — Pulsara" />
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {c.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                    touched.name && errors.name
                      ? 'border-red-500 focus:border-red-500'
                      : touched.name && !errors.name
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  placeholder={c.form.namePlaceholder}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
                {touched.name && !errors.name && formData.name && (
                  <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {language === 'tr' ? 'Geçerli' : 'Valid'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {c.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                    touched.email && errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : touched.email && !errors.email
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  placeholder={c.form.emailPlaceholder}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
                {touched.email && !errors.email && formData.email && (
                  <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {language === 'tr' ? 'Geçerli' : 'Valid'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                  {c.form.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                    touched.company && errors.company
                      ? 'border-red-500 focus:border-red-500'
                      : touched.company && !errors.company
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  placeholder={c.form.companyPlaceholder}
                />
                {touched.company && errors.company && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.company}
                  </p>
                )}
                {touched.company && !errors.company && formData.company && (
                  <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {language === 'tr' ? 'Geçerli' : 'Valid'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {c.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors resize-none ${
                    touched.message && errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : touched.message && !errors.message
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  placeholder={c.form.messagePlaceholder}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.message}
                  </p>
                )}
                {touched.message && !errors.message && formData.message && (
                  <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {language === 'tr' ? 'Geçerli' : 'Valid'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                {c.form.sendMessage}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Info & Consultation */}
          <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                {c.info.title}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{c.info.email}</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">info@pulsara.com.tr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{c.info.location}</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{c.info.locationValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Consultation Card */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {c.schedule.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                {c.schedule.description}
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-300"
              >
                {c.schedule.button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
