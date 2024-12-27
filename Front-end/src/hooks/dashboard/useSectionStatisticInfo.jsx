import { useContext } from 'react';
import { SectionStatisticContext } from '../../context/dashboard/SectionStatisticContext';

export const useSectionStatisticInfo = () => {
  const context = useContext(SectionStatisticContext);

  if (!context) {
    throw new Error('useSectionInfo must be used within SectionInfoProvider');
  }

  const {
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

export default useSectionStatisticInfo;