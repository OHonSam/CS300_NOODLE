// Front-end/src/pages/teacher/sections/TeacherSectionView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherSectionView = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get('/api/teacher/sections')
      .then(response => setSections(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Your Assigned Sections</h1>
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

export default TeacherSectionView;