import { StatsCard } from '../../../components/dashboard/StatsCard.jsx';
import { FilterBar } from '../../../components/dashboard/FilterBar.jsx';
import { useSectionStatisticInfo } from '../../../hooks/teacher/useSectionStatisticInfo.jsx';
import { GradeDistributionChart } from '../../../components/dashboard/GradeDistributionChart';

const StudentDashboard = () => {
  const {
    stats,
    selectedYear,
    loading,
    schoolYears,
    gradeData,
    setSelectedYear,
    selectedSemester,
    setSelectedSemester,
  } = useSectionStatisticInfo();

  return (
    <div>
      <FilterBar
        selectedYear={selectedYear}
        selectedSemester={selectedSemester}
        schoolYears={schoolYears}
        onYearChange={setSelectedYear}
        onSemesterChange={setSelectedSemester}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Sections" value={0} />
        <StatsCard title="Total Credits" value={0} />
        <StatsCard title="Total GPA" value={0} />

      </div>
    </div>
  );
};

export default StudentDashboard;