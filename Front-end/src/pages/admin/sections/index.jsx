import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../components/tab";

const AdminManageSections = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/admin/sections`)
      .then(response => setSections(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="relative flex items-center justify-center p-8 bg-gray-100 w-full h-full">
      <Header title={'Manage Sections'}/>
      <table>
        <thead>
          <tr>
            <th>Section ID</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Teacher</th>
            {/* Other headers */}
          </tr>
        </thead>
        <tbody>
          {sections.map(section => (
            <tr key={section._id}>
              <td>{section.sectionId}</td>
              <td>{section.course.name}</td>
              <td>{section.semester}</td>
              <td>{section.teacher ? section.teacher.fullName : 'Unassigned'}</td>
              {/* Other data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageSections;