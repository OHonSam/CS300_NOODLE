import DashboardInfoProvider from './provider';
import TeacherDashboard from './TeacherDashboard';

const AdminDashboardLayout = () => {
  return (
    <DashboardInfoProvider>
      <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
        <TeacherDashboard />
      </div>
    </DashboardInfoProvider>
  );
};

export default AdminDashboardLayout;