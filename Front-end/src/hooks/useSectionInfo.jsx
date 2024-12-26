import { createContext, useContext } from "react";

const initialSectionInfoContext = {
    courseId: null,
    courseName: null,
    credits: null,
    schoolYear: null,
    semester: null,
    capacity: null,
    // updateSection: async () => false,
    // deleteSection: async () => false
};

export const SectionInfoContext = createContext(initialSectionInfoContext);

export const useSectionInfo = () => {
    const context = useContext(SectionInfoContext);
    if (!context) {
        throw new Error('useSectionInfo must be used within SectionProvider');
    }
    return context;
};