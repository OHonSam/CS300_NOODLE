import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { Outlet } from "react-router-dom";

const AdminManageAccountLayout = () => {
  const navLinks = [
    {
      name: 'Student',
      link: '/admin/accounts/student',
    },
    {
      name: 'Teacher',
      link: '/admin/accounts/teacher',
    },
    {
      name: 'Admin',
      link: '/admin/accounts/admin',
    },
  ];

  const configs = [
    [
      {
        name: 'Add a Student',
        onClick: () => console.log('Add a Student')
      },
      {
        name: 'Import Student List',
        onClick: () => console.log('Import Student List')
      },
      {
        name: 'Remove Student(s)',
        onClick: () => console.log('Remove Student(s)')
      },
    ],
    [
      {
        name: 'Add a Teacher',
        onClick: () => console.log('Add a Teacher')
      },
      {
        name: 'Import Teacher List',
        onClick: () => console.log('Import Teacher List')
      },
      {
        name: 'Remove Teacher(s)',
        onClick: () => console.log('Remove Teacher(s)')
      },
    ],
    [
      {
        name: 'Add an Admin',
        onClick: () => console.log('Add an Admin')
      },
      {
        name: 'Import Admin List',
        onClick: () => console.log('Import Admin List')
      },
      {
        name: 'Remove Admin(s)',
        onClick: () => console.log('Remove Admin(s)')
      },
    ]
  ]

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <Header title={'Accounts'} navlinks={navLinks} configs={configs}/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminManageAccountLayout;