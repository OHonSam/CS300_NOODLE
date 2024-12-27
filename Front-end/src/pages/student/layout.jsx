import { Outlet } from 'react-router-dom';
import { FaChartBar, FaUser, FaBook, FaComments } from 'react-icons/fa'
import SideNavigationBar from '../../components/sidebar';


const StudentLayout = () => {
  const navlinks = [
    {
      name: 'Dashboard',
      link: '/student/dashboard',
      icon: FaChartBar
    },
    {
      name: 'Sections',
      link: '/student/sections',
      icon: FaBook
    },
    {
      name: 'Announcements',
      link: '/student/announcements',
      icon: FaComments
    }
  ];
  return (
    <div className="flex h-screen">
      <SideNavigationBar navlinks={navlinks} />
      <Outlet />
    </div>


  );
};

export default StudentLayout;