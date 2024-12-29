import DashboardInfoProvider from './provider';
import TeacherDashboard from './TeacherDashboard';

const AdminDashboardLayout = () => {
  return (
    <DashboardInfoProvider>
      <div className="min-h-screen h-screen bg-gray-100 w-full h-full">
        <TeacherDashboard />
      </div>
    </DashboardInfoProvider>
  );
};

export default AdminDashboardLayout;