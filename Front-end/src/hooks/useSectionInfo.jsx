import { createContext, useContext } from "react";

const initialSectionContext = {
    sections: [],
    totalPages: 0,
    currentPage: 1,
    changePage: () => { },
    addSection: async () => false,
    updateSection: async () => false,
    deleteSection: async () => false
};

export const SectionInfoContext = createContext(initialSectionContext);

export const useSectionInfo = () => {
    const context = useContext(SectionInfoContext);
    if (!context) {
        throw new Error('useSectionInfo must be used within SectionProvider');
    }
    return context;
};