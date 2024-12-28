import { createContext, useContext } from "react";

export const SectionStudentsContext = createContext();

export const useSectionStudents = () => {
  const context = useContext(SectionStudentsContext);
  if (!context) {
    throw new Error('useSectionStudents must be used within SectionProvider');
  }
  return context;
};