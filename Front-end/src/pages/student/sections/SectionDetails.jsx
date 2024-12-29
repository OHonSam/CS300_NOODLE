import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { useLocation, useNavigate } from 'react-router-dom';
import Tab from '../../../components/tab';
import SectionInfoView from './SectionInfo';
import SectionMaterialView from './SectionMaterial';
import SectionTeachersView from './SectionTeachers';
import SectionEnrolledStudentsView from './SectionEnrolledStudents';
import Breadcrumbs from "../../../components/breadcrumbs";
import { useToast } from "../../../hooks/useToast";

const StudentSectionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, courseName, schoolYear, semester } = location.state || {};

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

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div>
        <Breadcrumbs className='mb-4'
          paths={[{ name: 'Section', url: '/student/sections' }, { name: `${sectionId} - ${courseName}` }]} />
        <Tab title={sectionId + ' - ' + courseName} tabs={tabs} className={'w-full h-full'}>
          <div className="hidden h-full rounded-lg" id="info" role="tabpanel" aria-labelledby="info-tab">
            <SectionInfoView schoolYear={schoolYear} semester={semester} sectionId={sectionId} />
          </div>
          <div className="hidden rounded-lg" id="material" role="tabpanel" aria-labelledby="material-tab">
            <SectionMaterialView schoolYear={schoolYear} semester={semester} sectionId={sectionId} />
          </div>
          <div className="hidden rounded-lg" id="teachers" role="tabpanel" aria-labelledby="teachers-tab">
            <SectionTeachersView schoolYear={schoolYear} semester={semester} sectionId={sectionId} />
          </div>
          <div className="hidden rounded-lg" id="students" role="tabpanel" aria-labelledby="students-tab">
            <SectionEnrolledStudentsView schoolYear={schoolYear} semester={semester} sectionId={sectionId} />
          </div>
        </Tab>
      </div>
    </div>
  );
}

export default StudentSectionDetails;
