import { createContext, useContext } from "react";

export const SectionMaterialContext = createContext();

export const useSectionMaterial = () => {
  const context = useContext(SectionMaterialContext);
  if (!context) {
    throw new Error('useSectionMaterial must be used within SectionMaterialProvider');
  }
  return context;
};