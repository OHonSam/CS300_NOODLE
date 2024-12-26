import { createContext, useContext } from "react";

export const TeacherInfoContext = createContext();

export const useTeacherInfo = () => {
  const context = useContext(TeacherInfoContext);
  if (!context) {
    throw new Error('useTeacherInfo must be used within TeacherInfoProvider.');
  }
  return context;
};
