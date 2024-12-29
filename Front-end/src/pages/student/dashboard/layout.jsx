import DashboardInfoProvider from './provider';
import StudentDashboard from './StudentDashboard';

const StudentDashboardLayout = () => {
  return (
    <DashboardInfoProvider>
      <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
        <StudentDashboard />
      </div>
    </DashboardInfoProvider>
  );
};

export default StudentDashboardLayout;