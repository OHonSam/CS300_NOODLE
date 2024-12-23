import { useState, useEffect } from "react";
import axios from "../axios.config";
import { StudentInfoContext } from "../hooks/useStudentInfo";

export const StudentInfoProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const studentsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`/api/admin/students?page=${currentPage}&limit=${studentsPerPage}`);
        if (response.data.students.length === 0) {
          setStudents([
            {
              studentId: "No students found",
              fullName: "No students found",
              email: "No students found",
              class: "No students found",
              gender: 'Male',
              dob: '2004-01-01',
            }
          ]);
          setTotalPages(1);
        } else {
          setStudents(response.data.students);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchStudents();
  }, [currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const addStudent = async (newStudent) => {
    try {
      const response = await axios.post('/api/admin/students', newStudent);
      setStudents((prev) => [...prev, response.data.student]);
      const newTotalPages = Math.ceil((students.length + 1) / studentsPerPage);
      setTotalPages(newTotalPages);
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
        students: students.slice(0, 10),
        totalPages,
        changePage,
        addStudent,
        updateStudent,
        deleteStudent
      }}
    >
      {children}
    </StudentInfoContext.Provider>
  );
};
