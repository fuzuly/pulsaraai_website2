import React from 'react';

const FeatureCard = ({ title, description, icon, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-6 md:p-8 hover:shadow-md transition-shadow ${className}`}>
      {icon && (
        <div className="mb-4 text-purple-600">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;

