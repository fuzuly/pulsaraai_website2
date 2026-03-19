import React from 'react';
import { motion } from 'framer-motion';

const references = [
  {
    name: 'Coca-Cola',
    logo: '/Coca-Cola_logo.svg.png',
  },
  {
    name: 'Sütiş',
    logo: '/sutis.png',
  },
  {
    name: 'Sütaş',
    logo: '/sutas-logo-png_seeklogo-288123.png',
  },
  {
    name: 'Mertek Engineering',
    logo: null,
    color: '#374151',
    letter: 'ME',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const ReferencesSection = () => {
  return (
    <section className="bg-[#F5F3FF] border-t border-purple-100 py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Güven &amp; Ortaklık
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Referanslarımız
          </h2>
          <div className="mt-4 mx-auto w-12 h-0.5 bg-purple-500 rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {references.map((ref) => (
            <motion.div
              key={ref.name}
              variants={cardVariants}
              className="
                bg-white rounded-2xl
                shadow-sm hover:shadow-md
                border border-slate-100 hover:border-purple-200
                transition-all duration-300
                flex flex-col items-center justify-center
                py-8 px-6 gap-3
                group cursor-default
                min-h-[140px]
              "
            >
              {ref.logo ? (
                <img
                  src={ref.logo}
                  alt={ref.name}
                  className="max-h-14 max-w-[140px] w-auto object-contain"
                />
              ) : (
                <>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: ref.color }}
                  >
                    {ref.letter}
                  </div>
                  <span
                    className="text-center leading-tight text-base font-semibold text-slate-700"
                  >
                    {ref.name}
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReferencesSection;
