import React from 'react';

export const StatsCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition">
    <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
    <p className="text-3xl text-center">{value}</p>
  </div>
);