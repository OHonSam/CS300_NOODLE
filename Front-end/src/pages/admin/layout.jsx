import { Outlet } from 'react-router-dom';
import { FaChartBar, FaUser, FaBook, FaComments } from 'react-icons/fa'
import SideNavigationBar from '../../components/sidebar';


const AdminLayout = () => {
  const navlinks = [
    {
      name: 'Dashboard',
      link: '/admin/dashboard',
      icon: FaChartBar
    } ,
    {
      name: 'Accounts',
      link: '/admin/accounts',
      icon: FaUser
    },
    {
      name: 'Sections',
      link: '/admin/sections',
      icon: FaBook
    },
    {
      name: 'Announcements',
      link: '/admin/announcements',
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

export default AdminLayout;