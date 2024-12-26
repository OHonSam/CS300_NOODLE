import React from 'react';
import DashboardInfoProvider from './provider';
import AdminDashboard from './AdminDashboard';

const AdminDashboardLayout = () => {
  return (
    <DashboardInfoProvider>
      <div className="min-h-screen h-screen bg-gray-100 w-full h-full">
        <AdminDashboard />
      </div>
    </DashboardInfoProvider>
  );
};

export default AdminDashboardLayout;