import { useState } from "react";
import Header from "../../../components/Header";
import { Outlet } from "react-router-dom";
import StudentCreationDialog from "../../../components/dialog/StudentCreationDialog";
import FileUploadDialog from "../../../components/dialog/FileUploadDialog";

const AdminManageAccountLayout = () => {
  const [studentCreationDialogVisible, setStudentCreationDialogVisible] = useState(false);
  const [studentFileUploadDialogVisible, setStudentFileUploadDialogVisible] = useState(false);

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
        onClick: () => setStudentCreationDialogVisible(true)
      },
      {
        name: 'Import Student List',
        onClick: () => setStudentFileUploadDialogVisible(true)
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
  ];

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <Header title={'Accounts'} navlinks={navLinks} configs={configs}/>
      <Outlet />
      <StudentCreationDialog 
        isOpen={studentCreationDialogVisible} 
        onSubmit={ (formData) => console.log('Call backend API to handle form data', formData) }
        onClose={ () => setStudentCreationDialogVisible(false) }
        className={'left-[25%] right-[25%] top-12 bottom-12'}
      />
      <FileUploadDialog 
        heading={'Import student file'}
        isOpen={studentFileUploadDialogVisible}
        onSubmit={ (file) => console.log('Call backend API to submit file', file) }
        onClose={ () => setStudentFileUploadDialogVisible(false) }
        fileFormat={['.csv', '.xlsx', '.txt']}
        className={'left-[25%] right-[25%] top-44 bottom-44'}
      />
    </div>
  );
};

export default AdminManageAccountLayout;