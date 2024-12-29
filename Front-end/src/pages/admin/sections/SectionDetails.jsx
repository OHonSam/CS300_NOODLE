import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { useLocation, useNavigate } from 'react-router-dom';
import Tab from '../../../components/tab';
import SectionInfoView from './SectionInfo';
import SectionMaterialView from './SectionMaterial';
import SectionTeachersView from './SectionTeachers';
import SectionEnrolledStudentsView from './SectionEnrolledStudents';
import Breadcrumbs from "../../../components/breadcrumbs";
import TeacherInfoProvider from "../../../context/admin/accounts/TeacherInfoContext";
import MaterialDialog from '../../../components/dialog/MaterialDialog';
import { useToast } from "../../../hooks/useToast";
import { addMaterial } from "../../../services/SectionInfoService";

const AdminSectionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, courseName, schoolYear, semester } = location.state || {};
  const [assignTeacherDialogVisible, setAssignTeacherDialogVisible] = useState(false);
  const [studentFileUploadDialogVisible, setStudentFileUploadDialogVisible] = useState(false);
  const [resourceCreationDialogVisible, setResourceCreationDialogVisible] = useState(false);
  const { addToast } = useToast();
  const [shouldRefreshMaterials, setShouldRefreshMaterials] = useState(false);

  useEffect(() => {
    if (!sectionId) {
      navigate('/notfound');
      return;
    }

    initFlowbite();
  }, []);

  const handleAddMaterial = async (materialData) => {
    try {
      const newMaterial = {
        ...materialData,
        type: "RESOURCE",
        sectionReference: {
          sectionId,
          schoolYear,
          semester
        }
      };

      const addedMaterial = await addMaterial(newMaterial);
      addToast('success', 'Material added successfully');
      setShouldRefreshMaterials(true);
      setResourceCreationDialogVisible(false);
      return true;
    } catch (error) {
      addToast('error', error.message || "Failed to add material");
      return false;
    }
  };

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
        name: 'Add a Resource',
        onClick: () => setResourceCreationDialogVisible(true)
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
            <SectionMaterialView 
              schoolYear={schoolYear} 
              semester={semester} 
              sectionId={sectionId}
              shouldRefresh={shouldRefreshMaterials}
              onRefreshComplete={() => setShouldRefreshMaterials(false)}
            />
          </div>
          <div className="hidden rounded-lg" id="teachers" role="tabpanel" aria-labelledby="teachers-tab">
            <SectionTeachersView schoolYear={schoolYear} semester={semester} sectionId={sectionId}
              assignTeacherDialogVisible={assignTeacherDialogVisible} 
              setAssignTeacherDialogVisible={setAssignTeacherDialogVisible}
            />
          </div>
          <div className="hidden rounded-lg" id="students" role="tabpanel" aria-labelledby="students-tab">
            <SectionEnrolledStudentsView 
              schoolYear={schoolYear} 
              semester={semester} 
              sectionId={sectionId} 
              studentFileUploadDialogVisible={studentFileUploadDialogVisible} 
              setStudentFileUploadDialogVisible={setStudentFileUploadDialogVisible}
            />
          </div>
        </Tab>

        <MaterialDialog
          dialogFor="create"
          isOpen={resourceCreationDialogVisible}
          onCreate={handleAddMaterial}
          onClose={() => setResourceCreationDialogVisible(false)}
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