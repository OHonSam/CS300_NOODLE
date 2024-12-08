import { useState } from "react";
import { StudentInfoContext } from "../hooks/useStudentInfo";

export const StudentInfoProvider = ({ children }) => {
  // Sample data, replace this with data fetched from backend
  const [students, setStudents] = useState([
    {
      studentId: '22125009',
      fullName: 'Ngo Thien Bao',
      email: 'ntbao22@apcs.fitus.edu.vn',
      gender: 'Male',
      class: '22TT2',
      dob: '2004-12-04',
      address: '100 randon',
      phone: '123-45-678',
    },
    {
      studentId: '22125010',
      fullName: 'Phan Phuc Bao',
      email: 'pbbao22@apcs.fitus.edu.vn',
      gender: 'Male',
      class: '22TT2',
      dob: '2004-01-01',
      address: '100 randon',
      phone: '123-45-678',
    },
    {
      studentId: '22125085',
      fullName: 'O Hon Sam',
      email: 'ohsam22@apcs.fitus.edu.vn',
      gender: 'Male',
      class: '22TT2',
      dob: '2004-01-01',
      address: '100 randon',
      phone: '123-45-678',
    }
  ]);

  const addStudent = async (newStudent) => {
    // call backend API
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = async (updatedStudent) => {
    // call backend API
    setStudents((prev) =>
      prev.map((student) =>
        student.studentId === updatedStudent.studentId ? updatedStudent : student
      )
    );
  };

  const deleteStudent = async (studentId) => {
    // call backend API
    setStudents((prev) => prev.filter((student) => student.studentId !== studentId));
  };

  return (
    <StudentInfoContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentInfoContext.Provider>
  );
};