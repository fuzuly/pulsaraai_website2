import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { getPostBySlug } from '../data/blogPosts';
import blogCover from '../assets/blog-cover.webp';

const BlogDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
        title={`${post.title} — Pulsara Blog`}
        description={post.description}
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors text-sm font-medium"
        >
          <span className="mr-2">←</span>
          {language === 'tr' ? 'Blog\'a Dön' : 'Back to Blog'}
        </Link>

        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-xl overflow-hidden">
          <img
            src={blogCover}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-4 font-medium">
            {formatDate(post.date)}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
        </header>

        {/* Article Content */}
        <article 
          className="prose prose-lg prose-neutral max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:text-gray-700
            prose-blockquote:border-l-purple-600 prose-blockquote:text-gray-600
            prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-img:rounded-xl prose-img:shadow-md
            mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to Blog Link */}
        <div className="pt-8 border-t border-gray-200">
          <Link
            to="/blog"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            <span className="mr-2">←</span>
            {language === 'tr' ? 'Tüm Makaleleri Gör' : 'View All Articles'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

