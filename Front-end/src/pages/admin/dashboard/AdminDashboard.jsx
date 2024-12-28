import React from 'react';
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
    <div className="p-8">
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
      <div className="grid grid-cols-2 gap-6">
        <GradeDistributionChart data={gradeData} />
      </div>

    </div>
  );
};

export default AdminDashboard;