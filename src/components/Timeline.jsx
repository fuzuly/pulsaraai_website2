import React from 'react';

const Timeline = ({ items }) => {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={index} className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
              {index + 1}
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.day}</h3>
            <p className="text-slate-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;

