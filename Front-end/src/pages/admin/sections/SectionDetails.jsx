import { useState, useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { useLocation, useNavigate } from 'react-router-dom';
import Tab from '../../../components/tab';
import SectionInfoView from './SectionInfo';
import SectionMaterialView from './SectionMaterial';
import SectionTeachersView from './SectionTeachers';
import SectionStudentsView from './SectionStudents';
import SectionProvider from './provider';

const AdminSectionDetails = () => {
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
    <SectionProvider
      sectionId={sectionId}
      schoolYear={schoolYear}
      semester={semester}
    >
      <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
        <Tab title={sectionId + ' - ' + courseName} tabs={tabs} className={'w-full h-full'}>
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
            <SectionStudentsView />
          </div>
        </Tab>
      </div>
    </SectionProvider >
  );
}

export default AdminSectionDetails;