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
      throw { message: error.response.data.message };
    }
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, [sectionId, schoolYear, semester]);

  const removeStudentFromSection = async (studentId) => {
    try {
      await axios.delete(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/removeEnrolled/${studentId}`);
      setEnrolledStudents((prev) => prev.filter((student) => student.studentId !== studentId));
    } catch (error) {
      console.error("Error removing student from section:", error);
      throw { message: error.response.data.message };
    }
  }

  const updateStudentFromSection = async (updatedStudent) => {
    try {
      const response = await axios.put(
        `/api/admin/students/${updatedStudent.studentId}`,
        updatedStudent
      );

      if (response.data) {
        setEnrolledStudents(prev =>
          prev.map(student =>
            student.studentId === updatedStudent.studentId ? response.data : student
          )
        );
        return true;
      }
    } catch (error) {
      console.error("Error updating student:", error);
      return false;
    }
  };

  const addEnrolledStudentsFromFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `/api/admin/sections/${schoolYear}/${semester}/${sectionId}/enrollStudents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setEnrolledStudents((prev) => [...prev, ...response.data.students]);
      }
      return response.data.message;
    } catch (error) {
      if (error.code == "ERR_BAD_RESPONSE") {
        throw {
          message: "Data import failed: Duplicate student ID or email. Try again.",
        };
      } else {
        throw {
          message: error.response?.data?.message || 'Failed to enroll students'
        };
      }
    }
  }

  return (
    <SectionStudentsContext.Provider
      value={{
        enrolledStudents,
        updateStudentFromSection,
        removeStudentFromSection,
        addEnrolledStudentsFromFile,
      }}
    >
      {children}
    </SectionStudentsContext.Provider>
  );
};

export default SectionStudentsProvider;
