import { Outlet } from 'react-router-dom';
import { FaChartBar, FaUser, FaBook, FaComments } from 'react-icons/fa'
import SideNavigationBar from '../../components/sidebar';


const TeacherLayout = () => {
  const navlinks = [
    {
      name: 'Dashboard',
      link: '/teacher/dashboard',
      icon: FaChartBar
    },
    {
      name: 'Accounts',
      link: '/teacher/accounts',
      icon: FaUser
    },
    {
      name: 'Sections',
      link: '/teacher/sections',
      icon: FaBook
    },
    {
      name: 'Announcements',
      link: '/teacher/announcements',
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

export default TeacherLayout;