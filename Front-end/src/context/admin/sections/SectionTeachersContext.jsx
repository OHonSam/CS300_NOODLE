import { useState, useEffect } from "react";
import axios from "../../../axios.config";
import { SectionTeachersContext } from "../../../hooks/admin/sections/useSectionTeachers";

export const SectionTeachersProvider = ({ children, sectionId, schoolYear, semester }) => {
  const [assignedTeachers, setTeachers] = useState([]);

  const fetchAssignedTeachers = async () => {
    try {
      const response = await axios.get(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/assignedTeachers`);
      const teacherDetails = response.data;
      setTeachers(teacherDetails);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchAssignedTeachers();
  }, [sectionId, schoolYear, semester]);

  return (
    <SectionTeachersContext.Provider
      value={{
        assignedTeachers,
        fetchAssignedTeachers,
      }}
    >
      {children}
    </SectionTeachersContext.Provider>
  );
};

export default SectionTeachersProvider;
