import React from 'react';

const PrivacyTable = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">What we collect</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Metadata (meeting frequency, calendar patterns)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Anonymized sentiment scores</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Team-level aggregated metrics</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Role and department (for segmentation)</span>
          </li>
        </ul>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">What we never collect</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start">
            <span className="text-red-600 mr-2">✗</span>
            <span>Message or email content</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">✗</span>
            <span>Individual names or identifiers</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">✗</span>
            <span>Personal health information</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">✗</span>
            <span>Screen recordings or activity logs</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyTable;

