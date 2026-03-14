import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/Section';
import FeatureCard from '../components/FeatureCard';

const UseCases = () => {
  const useCases = [
    {
      title: 'Engineering & On-call teams',
      riskPattern: 'High on-call frequency, irregular sleep patterns, context-switching overload, and sustained high-alert states create cumulative stress that leads to burnout.',
      intervention: 'Recommended: Rotate on-call schedules to distribute load, enforce minimum rest periods between shifts, reduce context switches by batching similar work, and implement post-incident recovery time.',
      example: 'A team of 12 engineers rotating weekly on-call saw 30% reduction in burnout risk after implementing mandatory 24-hour rest periods and reducing on-call frequency from weekly to bi-weekly rotations.',
    },
    {
      title: 'High-meeting organizations',
      riskPattern: 'Excessive meeting density, back-to-back scheduling, low focus time, and constant context switching prevent deep work and create chronic stress.',
      intervention: 'Recommended: Enforce meeting-free blocks (e.g., 2-4 PM daily), reduce meeting frequency by 30%, optimize calendar density to allow buffer time, and implement "no-meeting Fridays" for focus work.',
      example: 'A 200-person organization reduced average meeting hours per week from 18 to 12, resulting in 25% improvement in focus time and measurable reduction in stress indicators.',
    },
    {
      title: 'Fast-growing teams (50–1000)',
      riskPattern: 'Rapid scaling stress, unclear boundaries, communication overload, role ambiguity, and insufficient onboarding support create burnout risk during growth phases.',
      intervention: 'Recommended: Define clear team boundaries and ownership, establish communication norms (e.g., response time SLAs), scale onboarding support proportionally, and create "growth buffers" in planning.',
      example: 'A company scaling from 100 to 500 employees over 18 months maintained stable burnout risk levels by implementing structured onboarding, clear role definitions, and communication guidelines.',
    },
    {
      title: 'Customer ops & service teams',
      riskPattern: 'High ticket volume, emotional labor, repetitive stress patterns, difficult customer interactions, and lack of recovery time between high-stress periods.',
      intervention: 'Recommended: Rotate high-stress assignments across team members, increase support resources during peak periods, implement recovery periods after difficult interactions, and provide mental health support resources.',
      example: 'A customer support team of 40 reduced burnout risk by 40% after implementing rotation schedules, adding peer support sessions, and creating "quiet hours" for low-priority ticket handling.',
    },
  ];

  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen pt-24 md:pt-32">
      <SEO 
        title="Use Cases — Pulsara"
        description="See how Pulsara helps different types of teams prevent burnout: engineering teams, high-meeting organizations, fast-growing companies, and customer ops teams."
      />

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
            Use Cases
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Pulsara is designed for teams where burnout risk is a real operational concern. Here's how different organizations use it to prevent burnout before it becomes a business problem.
          </p>
        </div>
      </Section>

      <Section className="bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">{useCase.title}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Risk pattern</h3>
                    <p className="text-slate-600">{useCase.riskPattern}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Recommended intervention</h3>
                    <p className="text-slate-600">{useCase.intervention}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm">Example</h3>
                    <p className="text-sm text-slate-600">{useCase.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
            See if Pulsara fits your team
          </h2>
          <p className="text-slate-600 mb-8">
            If burnout risk matters to your business, Pulsara is built for you.
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

export default UseCases;

