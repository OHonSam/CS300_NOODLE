import React from 'react';

export const StatsCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
    <p className="text-3xl text-center">{value}</p>
  </div>
);