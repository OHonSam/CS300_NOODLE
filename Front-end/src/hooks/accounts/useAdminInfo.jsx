import { createContext, useContext } from "react";

export const AdminInfoContext = createContext();

export const useAdminInfo = () => {
  const context = useContext(AdminInfoContext);
  if (!context) {
    throw new Error('useAdminInfo must be used within AdminInfoProvider.');
  }
  return context;
};