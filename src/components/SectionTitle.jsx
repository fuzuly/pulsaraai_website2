import React from 'react';

const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <div className={center ? "text-center mb-16" : "mb-16"}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl text-slate-600 text-gray-400 max-w-3xl mx-auto font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

