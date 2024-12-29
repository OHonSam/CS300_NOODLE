import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { Outlet } from "react-router-dom";
import AccountProvider from "./provider";
import Tab from "../../../components/tab";
import StudentInfoDialog from "../../../components/dialog/StudentInfoDialog";
import FileUploadDialog from "../../../components/dialog/FileUploadDialog";
import StudentAccountView from "./StudentAccount";
import { useToast } from "../../../hooks/useToast";
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
  const { addToast } = useToast();

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
        name: 'Import Student File',
        onClick: () => setStudentFileUploadDialogVisible(true)
      },
    ],
    [
      {
        name: 'Add a Teacher',
        onClick: () => setTeacherCreationDialogVisible(true)
      },
      {
        name: 'Import Teacher File',
        onClick: () => setTeacherFileUploadVisible(true)
      },
    ],
    [
      {
        name: 'Add an Admin',
        onClick: () => setAdminCreationDialogVisible(true)
      },
      {
        name: 'Import Admin File',
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
          onCreate={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
          onClose={() => setStudentCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import student file'}
          isOpen={studentFileUploadDialogVisible}
          onSubmit={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
          onClose={() => setStudentFileUploadDialogVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
          userType="student"
        />
        {/* Create / Import teachers */}
        <TeacherInfoDialog
          dialogFor={'create'}
          isOpen={teacherCreationDialogVisible}
          onCreate={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
          onClose={() => setTeacherCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import teacher file'}
          isOpen={teacherFileUploadDialogVisible}
          onSubmit={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
          onClose={() => setTeacherFileUploadVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
          userType="teacher"
        />
        {/* Create / Import administrators */}
        <AdminInfoDialog
          dialogFor={'create'}
          isOpen={adminCreationDialogVisible}
          onCreate={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
          onClose={() => setAdminCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import administrator file'}
          isOpen={adminFileUploadDialogVisible}
          onSubmit={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
          onClose={() => setAdminFileUploadDialogVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
          userType="admin"
        />
      </div>
    </AccountProvider>
  );
};

export default AdminManageAccountsLayout;