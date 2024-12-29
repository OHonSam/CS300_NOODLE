import { useSectionStatisticInfo } from '../../../hooks/admin/dashboard/useSectionStatisticInfo';
import { StatsCard } from '../../../components/dashboard/StatsCard';
import { GradeDistributionChart } from '../../../components/dashboard/GradeDistributionChart';
import { FilterBar } from '../../../components/dashboard/FilterBar';

const AdminDashboard = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

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
        <StatsCard title="Total Students" value={stats.totalStudents} />
        <StatsCard title="Total Sections" value={stats.totalSections} />
        <StatsCard title="Total Teachers" value={stats.totalTeachers} />

      </div>

      {/* Charts Section */}
      <div className="flex justify-center">
        <GradeDistributionChart data={gradeData} className={"w-1/2"} />
      </div>
    </div>
  );
};

export default AdminDashboard;