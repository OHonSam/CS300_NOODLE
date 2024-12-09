import { useState } from "react";
import { TeacherInfoContext } from "../hooks/useTeacherInfo";

export const TeacherInfoProvider = ({ children }) => {
  // Sample data, replace this with data fetched from backend
  const [teachers, setTeachers] = useState([
    {
      teacherId: '22125009',
      fullName: 'Ngo Thien Bao',
      email: 'ntbao22@apcs.fitus.edu.vn',
      gender: 'Male',
      department: 'Information Technology',
      dob: '2004-12-04',
      address: '100 randon',
      phone: '123-45-678',
    },
    {
      teacherId: '22125010',
      fullName: 'Phan Phuc Bao',
      email: 'pbbao22@apcs.fitus.edu.vn',
      gender: 'Male',
      department: 'Information Technology',
      dob: '2004-01-01',
      address: '100 randon',
      phone: '123-45-678',
    },
    {
      teacherId: '22125085',
      fullName: 'O Hon Sam',
      email: 'ohsam22@apcs.fitus.edu.vn',
      gender: 'Male',
      department: 'Information Technology',
      dob: '2004-01-01',
      address: '100 randon',
      phone: '123-45-678',
    }
  ]);

  const addTeacher = async (newTeacher) => {
    // call backend API
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const updateTeacher = async (updatedTeacher) => {
    // call backend API
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.teacherId === updatedTeacher.teacherId ? updatedTeacher : teacher
      )
    );
  };

  const deleteTeacher = async (teacherId) => {
    // call backend API
    setTeachers((prev) => prev.filter((teacher) => teacher.teacherId !== teacherId));
  };

  return (
    <TeacherInfoContext.Provider
      value={{ teachers, addTeacher, updateTeacher, deleteTeacher }}
    >
      {children}
    </TeacherInfoContext.Provider>
  );
};