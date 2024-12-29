import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { useLocation, useNavigate } from 'react-router-dom';
import Tab from '../../../components/tab';
import SectionInfoView from './SectionInfo';
import SectionMaterialView from './SectionMaterial';
import SectionTeachersView from './SectionTeachers';
import SectionEnrolledStudentsView from './SectionEnrolledStudents';
import Breadcrumbs from "../../../components/breadcrumbs";
import SelectTeacherDialog from "../../../components/dialog/SelectTeacherDialog";
import TeacherInfoProvider from "../../../context/admin/accounts/TeacherInfoContext";
import MaterialDialog from '../../../components/dialog/MaterialDialog';
import { useToast } from "../../../hooks/useToast";

const AdminSectionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, courseName, schoolYear, semester } = location.state || {};
  const [assignTeacherDialogVisible, setAssignTeacherDialogVisible] = useState(false);
  const [studentFileUploadDialogVisible, setStudentFileUploadDialogVisible] = useState(false);
  const [resourceCreationDialogVisible, setresourceCreationDialogVisible] = useState(false);
  const { addToast } = useToast();

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
    [
      {
        name: 'Add a Resouce',
        onClick: () => setresourceCreationDialogVisible(true)
      },
    ],
    [
      {
        name: 'Add Teacher',
        onClick: () => setAssignTeacherDialogVisible(true)
      }
    ],
    [
      {
        name: 'Import Student File',
        onClick: () => setStudentFileUploadDialogVisible(true)
      }
    ]
  ];

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div>
        <Breadcrumbs className='mb-4'
          paths={[{ name: 'Section', url: '/admin/sections' }, { name: `${sectionId} - ${courseName}` }]} />
        <Tab title={sectionId + ' - ' + courseName} configs={configs} tabs={tabs} className={'w-full h-full'}>
          <div className="hidden h-full rounded-lg" id="info" role="tabpanel" aria-labelledby="info-tab">
            <SectionInfoView schoolYear={schoolYear} semester={semester} sectionId={sectionId}/>
          </div>
          <div className="hidden rounded-lg" id="material" role="tabpanel" aria-labelledby="material-tab">
            <SectionMaterialView schoolYear={schoolYear} semester={semester} sectionId={sectionId}/>
          </div>
          <div className="hidden rounded-lg" id="teachers" role="tabpanel" aria-labelledby="teachers-tab">
            <SectionTeachersView schoolYear={schoolYear} semester={semester} sectionId={sectionId}/>
          </div>
          <div className="hidden rounded-lg" id="students" role="tabpanel" aria-labelledby="students-tab">
            <SectionEnrolledStudentsView schoolYear={schoolYear} semester={semester} sectionId={sectionId} 
              studentFileUploadDialogVisible={studentFileUploadDialogVisible} 
              setStudentFileUploadDialogVisible={setStudentFileUploadDialogVisible}
            />
          </div>
        </Tab>

        <MaterialDialog
          dialogFor={'create'}
          isOpen={resourceCreationDialogVisible}
          onCreate={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
          onClose={() => setresourceCreationDialogVisible(false)}
        />
      </div>
      <TeacherInfoProvider>
        <SelectTeacherDialog
          isOpen={assignTeacherDialogVisible}
          onClose={() => setAssignTeacherDialogVisible(false)}
        />
      </TeacherInfoProvider>
      </div>
  );
}

export default AdminSectionDetails;
