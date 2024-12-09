import { createContext, useContext } from "react";

export const AdminInfoContext = createContext();

export const useAdminInfo = () => {
  const context = useContext(AdminInfoContext);
  if (!context) {
    throw new Error('useStudentInfo must be used within StudentInfoProvider.');
  }
  return context;
};