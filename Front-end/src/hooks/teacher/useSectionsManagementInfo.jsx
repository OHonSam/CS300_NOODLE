import { createContext, useContext } from "react";

const initialSectionsManagementContext = {
  sections: null,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  setCurrentPage: () => {},
};

export const SectionsManagementContext = createContext(initialSectionsManagementContext);

export const useSectionsManagementInfo = () => {
  const context = useContext(SectionsManagementContext);
  if (!context) {
    throw new Error('useSectionsManagementInfo must be used within SectionsManagementProvider');
  }
  return context;
};