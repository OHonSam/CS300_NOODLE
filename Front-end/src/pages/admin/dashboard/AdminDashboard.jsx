import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSectionStatisticInfo } from '../../../hooks/admin/dashboard/useSectionStatisticInfo';

const AdminDashboard = () => {
  const {
    stats,
    selectedYear,
    setSelectedYear,
    selectedSemester,
    setSelectedSemester,
    loading,
    schoolYears,
    gradeData
  } = useSectionStatisticInfo();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <select
            className="p-2 rounded-lg border border-gray-300"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {schoolYears.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            className="p-2 rounded-lg border border-gray-300"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-center mb-2">Total Sections</h3>
              <p className="text-3xl text-center">{stats.totalSections}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-center mb-2">Total Teachers</h3>
              <p className="text-3xl text-center">{stats.totalTeachers}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-center mb-2">Total Students</h3>
              <p className="text-3xl text-center">{stats.totalStudents}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Grade Distribution Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeData}>
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;