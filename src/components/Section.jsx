import React from 'react';

const Section = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {children}
      </div>
    </section>
  );
};

export default Section;

