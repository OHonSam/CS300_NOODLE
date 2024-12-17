// Front-end/src/pages/student/sections/StudentSectionView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentSectionView = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get('/api/student/sections')
      .then(response => setSections(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Your Enrolled Sections</h1>
      <ul>
        {sections.map(section => (
          <li key={section._id}>
            {section.sectionId} - {section.course.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentSectionView;