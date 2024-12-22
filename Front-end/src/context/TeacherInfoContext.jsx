// Front-end/src/context/TeacherInfoContext.jsx
import { useState, useEffect } from "react";
import axios from "../axios.config";
import { TeacherInfoContext } from "../hooks/useTeacherInfo";

export const TeacherInfoProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [teachers, setTeachers] = useState([]);
  const teachersPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`/api/admin/teachers?page=${currentPage}&limit=${teachersPerPage}`);
        if (response.data.teachers && response.data.teachers.length > 0) {
          setTeachers(response.data.teachers);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchTeachers();
  }, [currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const addTeacher = async (newTeacher) => {
    try {
      const response = await axios.post('/api/admin/teachers', newTeacher);
      setTeachers((prev) => [...prev, response.data.teacher]);
      const newTotalPages = Math.ceil((teachers.length + 1) / teachersPerPage);
      setTotalPages(newTotalPages);
      return true;
    } catch (error) {
      console.error("Error adding teacher:", error);
      return false;
    }
  };

  const updateTeacher = async (updatedTeacher) => {
    try {
      const response = await axios.put(
        `/api/admin/teachers/${updatedTeacher.teacherId}`,
        updatedTeacher
      );
      
      if (response.data) {
        setTeachers(prev =>
          prev.map(teacher =>
            teacher.teacherId === updatedTeacher.teacherId ? response.data : teacher
          )
        );
        return true;
      }
    } catch (error) {
      console.error("Error updating teacher:", error);
      return false;
    }
  };

  const deleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`/api/admin/teachers/${teacherId}`);
      setTeachers((prev) => prev.filter((teacher) => teacher.teacherId !== teacherId));
      return true;
    } catch (error) {
      console.error("Error deleting teacher:", error);
      return false;
    }
  };

  return (
    <TeacherInfoContext.Provider 
      value={{ 
        teachers: teachers.slice(0, 10), 
        totalPages, 
        changePage, 
        addTeacher, 
        updateTeacher, 
        deleteTeacher 
      }}
    >
      {children}
    </TeacherInfoContext.Provider>
  );
};

export default TeacherInfoProvider;