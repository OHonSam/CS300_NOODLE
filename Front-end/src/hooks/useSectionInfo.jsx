import { useContext } from 'react';
import { SectionInfoContext } from '../context/SectionInfoContext';

export const useSectionInfo = () => {
  const context = useContext(SectionInfoContext);
  
  if (!context) {
    throw new Error('useSectionInfo must be used within SectionInfoProvider');
  }

  const {
    // Original section management values
    sections,
    totalPages,
    currentPage,
    changePage,
    addSection,
    getSection,
    updateSection,
    deleteSection,
    
    // New dashboard values
    stats,
    selectedYear,
    setSelectedYear,
    selectedSemester,
    setSelectedSemester,
    loading,
    schoolYears,
    getSchoolYearLabel
  } = context;

  return {
    // Original section management values
    sections,
    totalPages,
    currentPage,
    changePage,
    addSection,
    getSection,
    updateSection,
    deleteSection,
    
    // New dashboard values
    stats,
    selectedYear,
    setSelectedYear,
    selectedSemester,
    setSelectedSemester,
    loading,
    schoolYears,
    getSchoolYearLabel,
    gradeData: Object.entries(stats.gradeDistribution).map(([grade, count]) => ({
      grade,
      count
    }))
  };
};

export default useSectionInfo;