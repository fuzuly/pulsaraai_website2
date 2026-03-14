import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/Section';

// Icons
const IconDetect = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconExplain = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconAct = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconTrack = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Product = () => {
  const flowSteps = [
    {
      icon: <IconDetect />,
      title: 'Detect',
      description: 'Identify early risk signals from metadata patterns, sentiment shifts, and behavioral indicators. Our system analyzes calendar density, meeting frequency, communication patterns, and anonymized sentiment data to surface risk before it becomes burnout.',
    },
    {
      icon: <IconExplain />,
      title: 'Explain',
      description: 'Surface clear, actionable insights that explain why risk is emerging and what it means. Instead of generic scores, you get specific context: "Team A shows elevated risk due to 40% increase in back-to-back meetings over the past 3 weeks."',
    },
    {
      icon: <IconAct />,
      title: 'Act',
      description: 'Get recommended interventions tailored to the specific risk pattern and team context. Each recommendation is based on what has worked for similar patterns in the past, with clear steps and expected impact.',
    },
    {
      icon: <IconTrack />,
      title: 'Track impact',
      description: 'Monitor how interventions affect risk levels over time and adjust strategies accordingly. See which interventions are working, which need adjustment, and track progress toward healthier team patterns.',
    },
  ];

  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen pt-24 md:pt-32">
      <SEO 
        title="Product Overview — Pulsara"
        description="Privacy-first burnout prevention engine. Learn how Pulsara detects, explains, and helps you act on burnout risk."
      />

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
            Product Overview
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Pulsara transforms early burnout risk signals into clear, actionable insights for managers and teams. Built with privacy at its core, it helps you prevent burnout before it becomes a business problem.
          </p>
        </div>
      </Section>

      <Section className="bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="space-y-8">
            {flowSteps.map((step, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Privacy-first design</h3>
              <p className="text-sm text-slate-600">No content access. Team-level insights by default. Clear opt-out controls.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Early detection</h3>
              <p className="text-sm text-slate-600">Identify risk patterns weeks before burnout becomes visible in performance or retention.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Actionable insights</h3>
              <p className="text-sm text-slate-600">Get specific recommendations, not generic wellness scores.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Impact tracking</h3>
              <p className="text-sm text-slate-600">Monitor how interventions affect risk levels and adjust strategies over time.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#fafafa]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-slate-600 mb-8">
            See how Pulsara can help your team prevent burnout before it becomes a problem.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
          >
            Request Access
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Product;

