import { useState, useEffect } from "react";
import axios from "../../axios.config";
import { StudentInfoContext } from "../../hooks/accounts/useStudentInfo";

export const StudentInfoProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`/api/admin/students`);
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (newStudent) => {
    try {
      const response = await axios.post('/api/admin/students', newStudent);
      setStudents((prev) => [...prev, response.data.student]);
      return true;
    } catch (error) {
      console.error("Error adding student:", error.response);
      throw {
        message: error.response.data.message,
      };
    }
  };

  const updateStudent = async (updatedStudent) => {
    try {
      const response = await axios.put(
        `/api/admin/students/${updatedStudent.studentId}`,
        updatedStudent
      );

      if (response.data) {
        setStudents(prev =>
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

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`/api/admin/students/${studentId}`);
      setStudents((prev) => prev.filter((student) => student.studentId !== studentId));
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      return false;
    }
  };

  return (
    <StudentInfoContext.Provider
      value={{
        students,
        fetchStudents,
        addStudent,
        updateStudent,
        deleteStudent
      }}
    >
      {children}
    </StudentInfoContext.Provider>
  );
};
