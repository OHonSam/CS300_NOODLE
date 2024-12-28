import { createContext, useContext } from "react";

export const SectionTeachersContext = createContext();

export const useSectionTeachers = () => {
  const context = useContext(SectionTeachersContext);
  if (!context) {
    throw new Error('useSectionTeachers must be used within SectionProvider');
  }
  return context;
};