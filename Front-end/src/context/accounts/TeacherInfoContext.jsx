// Front-end/src/context/TeacherInfoContext.jsx
import { useState, useEffect } from "react";
import axios from "../../axios.config";
import { TeacherInfoContext } from "../../hooks/accounts/useTeacherInfo";

export const TeacherInfoProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`/api/admin/teachers?`);
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const addTeacher = async (newTeacher) => {
    try {
      const response = await axios.post('/api/admin/teachers', newTeacher);
      setTeachers((prev) => [...prev, response.data.teacher]);
      return true;
    } catch (error) {
      console.error("Error adding teacher:", error.response);
      throw {
        message: error.response.data.message,
      };
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
        teachers,
        fetchTeachers,
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
