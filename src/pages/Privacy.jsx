import React from 'react';
import SEO from '../components/SEO';
import Section from '../components/Section';
import PrivacyTable from '../components/PrivacyTable';

const Privacy = () => {
  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen pt-24 md:pt-32">
      <SEO 
        title="Privacy Principles — Pulsara"
        description="Privacy-first by design. Learn what we collect, what we never collect, and how we protect your team's data."
      />

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
            Privacy Principles
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Pulsara is built with privacy at its core. We believe that protecting people means respecting their data boundaries and giving them control over what's shared.
          </p>

          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Our Privacy Commitments</h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span><strong className="text-slate-900">No content monitoring:</strong> We never access message or email content. Only metadata patterns are analyzed.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span><strong className="text-slate-900">Team-level aggregation:</strong> Insights are shown at the team level by default. Individual data is anonymized.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span><strong className="text-slate-900">Personal control:</strong> Employees can see their own insights and opt out of data collection at any time.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span><strong className="text-slate-900">Minimum anonymization:</strong> Teams below a minimum size threshold are not shown to prevent identification.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span><strong className="text-slate-900">Transparent data use:</strong> Clear documentation of what data is used for and how it's processed.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Data Collection Overview</h2>
              <PrivacyTable />
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">How We Use Data</h2>
              <p className="text-slate-600 mb-4">
                All collected data is used exclusively to:
              </p>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li>Identify early burnout risk signals at the team level</li>
                <li>Generate anonymized sentiment and behavioral patterns</li>
                <li>Provide recommended interventions based on risk patterns</li>
                <li>Track the effectiveness of interventions over time</li>
              </ul>
              <p className="text-slate-600 mt-4">
                We do not use data for advertising, selling to third parties, or any purpose outside of burnout prevention.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Rights</h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-0.5">•</span>
                  <span>Request access to your personal data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-0.5">•</span>
                  <span>Opt out of data collection at any time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-0.5">•</span>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-0.5">•</span>
                  <span>Export your data in a portable format</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8">
              <p className="text-sm text-slate-600">
                For questions about privacy or to exercise your rights, contact us at{' '}
                <a href="mailto:privacy@pulsara.com" className="text-purple-600 hover:underline">
                  privacy@pulsara.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Privacy;

