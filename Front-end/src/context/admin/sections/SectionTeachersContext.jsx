import { useState, useEffect } from "react";
import axios from "../../../axios.config";
import { SectionTeachersContext } from "../../../hooks/admin/sections/useSectionTeachers";

export const SectionTeachersProvider = ({ children, sectionId, schoolYear, semester }) => {
  const [assignedTeachers, setAssignedTeachers] = useState([]);

  const fetchAssignedTeachers = async () => {
    try {
      const response = await axios.get(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/assignedTeachers`);
      const teacherDetails = response.data;
      setAssignedTeachers(teacherDetails);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw{ message: error.response.data.message};
    }
  };

  useEffect(() => {
    fetchAssignedTeachers();
  }, [sectionId, schoolYear, semester]);

  const removeTeacherFromSection = async (teacherId) => {
    try {
      // console.log(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/${teacherId}`);
      await axios.delete(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/removeAssigned/${teacherId}`);
      setAssignedTeachers((prev) => prev.filter((teacher) => teacher.teacherId !== teacherId));
    } catch (error) {
      console.error("Error removing teacher from section:", error);
      throw { message: error.response.data.message };
    }
  }

  return (
    <SectionTeachersContext.Provider
      value={{
        assignedTeachers,
        removeTeacherFromSection,
      }}
    >
      {children}
    </SectionTeachersContext.Provider>
  );
};

export default SectionTeachersProvider;
