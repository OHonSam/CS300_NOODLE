import { createContext, useContext } from "react";

export const StudentInfoContext = createContext(0);

export const useStudentInfo = () => {
  const context = useContext(StudentInfoContext);
  if (!context) {
    throw new Error('useStudentInfo must be used within StudentInfoProvider.');
  }
  return context;
};