import { createContext, useContext } from "react";

const initialAdminContext = {
  admins: [],
  totalPages: 0,
  currentPage: 1,
  changePage: () => { },
  addAdmin: async () => false,
  updateAdmin: async () => false,
  deleteAdmin: async () => false
};

export const AdminInfoContext = createContext(initialAdminContext);

export const useAdminInfo = () => {
  const context = useContext(AdminInfoContext);
  if (!context) {
    throw new Error('useAdminInfo must be used within AdminInfoProvider.');
  }
  return context;
};