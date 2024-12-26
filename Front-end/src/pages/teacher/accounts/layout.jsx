import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { Outlet } from "react-router-dom";
import AccountProvider from "./provider";
import Tab from "../../../components/tab";
import StudentInfoDialog from "../../../components/dialog/StudentInfoDialog";
import FileUploadDialog from "../../../components/dialog/FileUploadDialog";
import StudentAccountView from "./StudentAccount";
import ToastSuccess from "../../../components/toast";
import TeacherInfoDialog from "../../../components/dialog/TeacherInfoDialog";
import TeacherAccountView from "./TeacherAccount";

const TeacherManageAccountLayout = () => {
  const [studentCreationDialogVisible, setStudentCreationDialogVisible] = useState(false);
  const [studentFileUploadDialogVisible, setStudentFileUploadDialogVisible] = useState(false);
  const [teacherCreationDialogVisible, setTeacherCreationDialogVisible] = useState(false);
  const [teacherFileUploadDialogVisible, setTeacherFileUploadVisible] = useState(false);
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
  ];

  return (
    <AccountProvider>
      <div className="relative flex flex-col items-center justify-center p-8 bg-gray-100 w-full h-full">
        <Tab title="Accounts" tabs={tabs} configs={configs} className={'w-full h-full'}>
          <div className="hidden h-full rounded-lg" id="student" role="tabpanel" aria-labelledby="student-tab">
            <StudentAccountView />
          </div>
          <div className="hidden rounded-lg" id="teacher" role="tabpanel" aria-labelledby="teacher-tab">
            <TeacherAccountView />
          </div>
        </Tab>
        <Outlet />
        {/* Create / Import students */}
        <StudentInfoDialog
          dialogFor={'create'}
          isOpen={studentCreationDialogVisible}
          onCreate={() => setToast(['Student created successfully', true])}
          onClose={() => setStudentCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import student file'}
          isOpen={studentFileUploadDialogVisible}
          onSubmit={(file) => {
            console.log('Call backend API to submit file', file);
            setToast(['Student imported successfully', true]);
          }}
          onClose={() => setStudentFileUploadDialogVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
        />
        {/* Create / Import teachers */}
        <TeacherInfoDialog
          dialogFor={'create'}
          isOpen={teacherCreationDialogVisible}
          onCreate={() => setToast(['Teacher created successfully', true])}
          onClose={() => setTeacherCreationDialogVisible(false)}
        />
        <FileUploadDialog
          heading={'Import teacher file'}
          isOpen={teacherFileUploadDialogVisible}
          onSubmit={(file) => {
            console.log('Call backend API to sumbit file', file);
            setToast(['Teacher imported successfully', true]);
          }}
          onClose={() => setTeacherFileUploadVisible(false)}
          fileFormat={['.csv', '.xlsx', '.txt']}
        />

        {toast.length > 0 && <ToastSuccess message={toast[0]} onClick={() => setToast([])} className={'m-auto top-6'} Icon={
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        } />}
      </div>
    </AccountProvider>
  );
};

export default TeacherManageAccountLayout;