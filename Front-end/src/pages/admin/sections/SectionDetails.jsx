import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { useLocation, useNavigate } from 'react-router-dom';
import Tab from '../../../components/tab';
import SectionInfoView from './SectionInfo';
import SectionMaterialView from './SectionMaterial';
import SectionTeachersView from './SectionTeachers';
import SectionEnrolledStudentsView from './SectionEnrolledStudents';
import SectionProvider from './provider';
import Breadcrumbs from "../../../components/breadcrumbs";
import SelectTeacherDialog from "../../../components/dialog/SelectTeacherDialog";
import TeacherInfoProvider from "../../../context/admin/accounts/TeacherInfoContext";

const AdminSectionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, courseName, schoolYear, semester } = location.state || {};
  const [assignTeacherDialogVisible, setAssignTeacherDialogVisible] = useState(false);
  const [addStudentDialogVisible, setAddStudentDialogVisible] = useState(false);
  const [importStudentDialogVisible, setImportStudentDialogVisible] = useState(false);

  useEffect(() => {
    if (!sectionId) {
      navigate('/notfound');
      return;
    }

    initFlowbite();
  }, []);

  const tabs = [
    {
      name: 'Information',
      id: 'info-tab',
      tabId: 'info'
    },
    {
      name: 'Material',
      id: 'material-tab',
      tabId: 'material'
    },
    {
      name: 'Teachers',
      id: 'teachers-tab',
      tabId: 'teachers'
    },
    {
      name: 'Students',
      id: 'students-tab',
      tabId: 'students'
    },
  ];

  const configs = [
    [],
    [],
    [
      {
        name: 'Add Teacher',
        onClick: () => setAssignTeacherDialogVisible(true)
      }
    ],
    [
      {
        name: 'Add Student',
        onClick: () => setAddStudentDialogVisible(true)
      },
      {
        name: 'Import Student File',
        onClick: () => setImportStudentDialogVisible(true)
      }
    ]
  ]

  return (
    <TeacherInfoProvider>
    <SectionProvider
      sectionId={sectionId}
      schoolYear={schoolYear}
      semester={semester}
    >
      <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
        <Breadcrumbs className='mb-4'
          paths={[{name: 'Section', url: '/admin/sections'}, {name: `${sectionId} - ${courseName}`}]}/>
        <Tab title={sectionId + ' - ' + courseName} configs={configs} tabs={tabs} className={'w-full h-full'}>
          <div className="hidden h-full rounded-lg" id="info" role="tabpanel" aria-labelledby="info-tab">
            <SectionInfoView />
          </div>
          <div className="hidden rounded-lg" id="material" role="tabpanel" aria-labelledby="material-tab">
            <SectionMaterialView />
          </div>
          <div className="hidden rounded-lg" id="teachers" role="tabpanel" aria-labelledby="teachers-tab">
            <SectionTeachersView />
          </div>
          <div className="hidden rounded-lg" id="students" role="tabpanel" aria-labelledby="students-tab">
            <SectionEnrolledStudentsView />
          </div>
        </Tab>
      </div>
      <SelectTeacherDialog 
        isOpen={assignTeacherDialogVisible}
        onClose={() => setAssignTeacherDialogVisible(false)}
      />
    </SectionProvider >
    </TeacherInfoProvider>
  );
}

export default AdminSectionDetails;