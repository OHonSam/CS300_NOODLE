import { createContext, useContext } from "react";

export const TeacherInfoContext = createContext();

export const useTeacherInfo = () => {
  const context = useContext(TeacherInfoContext);
  if (!context) {
    throw new Error('useStudentInfo must be used within StudentInfoProvider.');
  }
  return context;
};