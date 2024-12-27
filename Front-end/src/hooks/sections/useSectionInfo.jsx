import { createContext, useContext } from "react";

export const SectionInfoContext = createContext();

export const useSectionInfo = () => {
    const context = useContext(SectionInfoContext);
    if (!context) {
        throw new Error('useSectionInfo must be used within SectionProvider');
    }
    return context;
};