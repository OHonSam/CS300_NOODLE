import { useState, useEffect } from "react";
import axios from "../../../axios.config";
import { SectionStudentsContext } from "../../../hooks/admin/sections/useSectionStudents";

export const SectionStudentsProvider = ({ children, sectionId, schoolYear, semester }) => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const fetchEnrolledStudents = async () => {
    try {
      const response = await axios.get(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/enrolledStudents`);
      const studentDetails = response.data;
      setEnrolledStudents(studentDetails);

    } catch (error) {
      console.error("Error fetching students:", error);
      throw{ message: error.response.data.message};
    } 
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, [sectionId, schoolYear, semester]);

  return (
    <SectionStudentsContext.Provider
      value={{
        enrolledStudents,
        fetchEnrolledStudents,
      }}
    >
      {children}
    </SectionStudentsContext.Provider>
  );
};

export default SectionStudentsProvider;
