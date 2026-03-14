import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { getAllPosts } from '../data/blogPosts';
import blogCover from '../assets/blog-cover.webp';

const BlogList = () => {
  const { language } = useLanguage();
  const posts = getAllPosts();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-white min-h-screen">
      <SEO 
        title="Pulsara Blog — Insights & Articles on AI, Workforce & Operations"
        description="Read insights and articles about AI-powered workforce management, retail operations, and enterprise automation from Pulsara."
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Page Title */}
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
            {language === 'tr' ? 'İçgörüler & Makaleler' : 'Insights & Articles'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'tr' 
              ? 'AI, işgücü yönetimi ve operasyonel verimlilik hakkında en son içgörüleri keşfedin.'
              : 'Discover the latest insights on AI, workforce management, and operational efficiency.'}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <img
                    src={blogCover}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="text-sm text-gray-500 mb-3 font-medium">
                    {formatDate(post.date)}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    {language === 'tr' ? 'Devamını Oku' : 'Read more'}
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {language === 'tr' ? 'Henüz blog yazısı yok.' : 'No blog posts yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;

