// Front-end/src/context/TeacherInfoContext.jsx
import { useState, useEffect } from "react";
import axios from "../../../axios.config";
import { TeacherInfoContext } from "../../../hooks/admin/accounts/useTeacherInfo";

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

  const addTeacherFromFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post('/api/admin/fileTeachers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important!
        }
      });

      if (response.data.success) {
        setTeachers((prev) => [...prev, ...response.data.users]);
      }
      return response.data.message;
    } catch (error) {
      console.error("Error adding teachers from file:", error);
      if (error.code == "ERR_BAD_RESPONSE") {
        throw {
          message: "Data is invalid. Duplicate Teacher ID/email or missing fields. Try again.",  
        };
      } else {
        throw {
          message: error.response.data.message,
        };
      }
    }
  }

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
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addTeacherFromFile
      }}
    >
      {children}
    </TeacherInfoContext.Provider>
  );
};

export default TeacherInfoProvider;
