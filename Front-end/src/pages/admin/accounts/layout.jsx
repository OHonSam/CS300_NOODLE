import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { Outlet } from "react-router-dom";
import AccountProvider from "./provider";
import Tab from "../../../components/tab";
import StudentInfoDialog from "../../../components/dialog/StudentInfoDialog";
import FileUploadDialog from "../../../components/dialog/FileUploadDialog";
import StudentAccountView from "./StudentAccount";
import Toast from "../../../components/toast";
import TeacherInfoDialog from "../../../components/dialog/TeacherInfoDialog";
import TeacherAccountView from "./TeacherAccount";
import AdminInfoDialog from "../../../components/dialog/AdminInfoDialog";
import AdminAccountView from "./AdminAccount";

const AdminManageAccountsLayout = () => {
  const [studentCreationDialogVisible, setStudentCreationDialogVisible] = useState(false);
  const [studentFileUploadDialogVisible, setStudentFileUploadDialogVisible] = useState(false);
  const [teacherCreationDialogVisible, setTeacherCreationDialogVisible] = useState(false);
  const [teacherFileUploadDialogVisible, setTeacherFileUploadVisible] = useState(false);
  const [adminCreationDialogVisible, setAdminCreationDialogVisible] = useState(false);
  const [adminFileUploadDialogVisible, setAdminFileUploadDialogVisible] = useState(false);
  const [toast, setToast] = useState([]);

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
        onClick: () => setTeacherCreationDialogVisible(true)
      },
      {
        name: 'Import Teacher List',
        onClick: () => setTeacherFileUploadVisible(true)
      },
    ],
    [
      {
        name: 'Add an Admin',
        onClick: () => setAdminCreationDialogVisible(true)
      },
      {
        name: 'Import Admin List',
        onClick: () => setAdminFileUploadDialogVisible(true)
      },
    ]
  ];

  return (
    <AccountProvider>
      <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
        <Tab title="Accounts" tabs={tabs} configs={configs} className={'w-full h-full'}>
          <div className="hidden h-full rounded-lg" id="student" role="tabpanel" aria-labelledby="student-tab">
            <StudentAccountView />
          </div>
          <div className="hidden rounded-lg" id="teacher" role="tabpanel" aria-labelledby="teacher-tab">
            <TeacherAccountView />
          </div>
          <div className="hidden rounded-lg" id="admin" role="tabpanel" aria-labelledby="admin-tab">
            <AdminAccountView />
          </div>
        </Tab>
        <Outlet />
        {/* Create / Import students */}
        <StudentInfoDialog
          dialogFor={'create'}
          isOpen={studentCreationDialogVisible}
          onCreate={(message, isAccepted) => setToast([message, isAccepted])}
          onClose={() => setStudentCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import student file'}
          isOpen={studentFileUploadDialogVisible}
          onSubmit={(file) => {
            console.log('Call backend API to submit file', file);
            // setToast(['Student imported successfully!', true]);
          }}
          onClose={() => setStudentFileUploadDialogVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
        />
        {/* Create / Import teachers */}
        <TeacherInfoDialog
          dialogFor={'create'}
          isOpen={teacherCreationDialogVisible}
          onCreate={(message, isAccepted) => setToast([message, isAccepted])}
          onClose={() => setTeacherCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import teacher file'}
          isOpen={teacherFileUploadDialogVisible}
          onSubmit={(file) => {
            console.log('Call backend API to sumbit file', file);
            // setToast(['Teacher imported successfully!', true]);
          }}
          onClose={() => setTeacherFileUploadVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
        />
        {/* Create / Import administrators */}
        <AdminInfoDialog
          dialogFor={'create'}
          isOpen={adminCreationDialogVisible}
          onCreate={(message, isAccepted) => setToast([message, isAccepted])}
          onClose={() => setAdminCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import administrator file'}
          isOpen={adminFileUploadDialogVisible}
          onSubmit={(message, isAccepted) => {
            console.log("Hello")
            setToast([message, isAccepted]);
          }}
          onClose={() => setAdminFileUploadDialogVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
        />

        {toast.length > 0 && <Toast message={toast[0]} onClick={() => setToast([])} className={'m-auto top-6'} isAccepted={toast[1]} Icon={
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        } />}
      </div>
    </AccountProvider>
  );
};

export default AdminManageAccountsLayout;
