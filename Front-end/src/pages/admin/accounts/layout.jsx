import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { Outlet } from "react-router-dom";
import { StudentInfoProvider } from "../../../context/StudentInfoContext";
import Tab from "../../../components/tab";
import StudentInfoDialog from "../../../components/dialog/StudentInfoDialog";
import FileUploadDialog from "../../../components/dialog/FileUploadDialog";
import StudentAccountView from "./student_accounts";
import ToastSuccess from "../../../components/toast/ToastSuccess";

const AdminManageAccountLayout = () => {
  const [studentCreationDialogVisible, setStudentCreationDialogVisible] = useState(false);
  const [studentFileUploadDialogVisible, setStudentFileUploadDialogVisible] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    initFlowbite();
  }, []);

  const tabs = [
    {
      name: 'Student',
      id: 'student-tab',
      tabId: 'student'
    },
    {
      name: 'Teacher',
      id: 'teacher-tab',
      tabId: 'teacher'
    },
    {
      name: 'Admin',
      id: 'admin-tab',
      tabId: 'admin'
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
    ]
  ];

  return (
    <StudentInfoProvider>
      <div className="relative flex items-center justify-center p-8 bg-gray-100 w-full">
        <Tab title={'Accounts'} tabs={tabs} configs={configs} className={'w-full'}>
          <div className="hidden p-4 h-full rounded-lg" id="student" role="tabpanel" aria-labelledby="student-tab">
            <StudentAccountView />
          </div>
          <div className="hidden p-4 rounded-lg" id="teacher" role="tabpanel" aria-labelledby="teacher-tab">
            <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
          </div>
          <div className="hidden p-4 rounded-lg" id="admin" role="tabpanel" aria-labelledby="admin-tab">
            <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tab associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
          </div>
        </Tab>
        <Outlet />
        <StudentInfoDialog 
          dialogFor={'create'}
          isOpen={studentCreationDialogVisible} 
          onCreate={ () => setToast('Student created successfully.') }
          onClose={ () => setStudentCreationDialogVisible(false) }
          className={'left-[25%] right-[25%] top-12 bottom-12'}
        />
        <FileUploadDialog 
          heading={'Import student file'}
          isOpen={studentFileUploadDialogVisible}
          onSubmit={(file) => {
            console.log('Call backend API to submit file', file);
            setToast('Student imported successfully');
          }}
          onClose={ () => setStudentFileUploadDialogVisible(false) }
          fileFormat={['.csv', '.xlsx', '.txt']}
          className={'left-[25%] right-[25%] top-44 bottom-44'}
        />
      </div>
      {toast && <ToastSuccess message={toast} onClick={ () => setToast('') } className={'m-auto top-6'}/>}
    </StudentInfoProvider>
  );
};

export default AdminManageAccountLayout;