import React from 'react';
import DashboardInfoProvider from './provider';
import AdminDashboard from './AdminDashboard';

const AdminDashboardLayout = () => {
  return (
    <DashboardInfoProvider>
      <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
        <AdminDashboard />
      </div>
    </DashboardInfoProvider>
  );
};

export default AdminDashboardLayout;