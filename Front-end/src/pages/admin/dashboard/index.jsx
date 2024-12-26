import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const AdminDashboard = () => {
  // Get current year for the year range calculation
  const currentYear = new Date().getFullYear();
  const schoolYears = Array.from({ length: 5 }, (_, i) => {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    return {
      value: startYear.toString(),
      label: `${startYear}-${endYear}`
    };
  });

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [stats, setStats] = useState({
    totalSections: 0,
    totalTeachers: 0,
    totalStudents: 0,
    gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 }
  });
  const [loading, setLoading] = useState(true);

  const getSchoolYearLabel = (year) => {
    const startYear = parseInt(year);
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/sections', {
        params: {
          semester: selectedSemester,
          schoolYear: getSchoolYearLabel(selectedYear)
        }
      });
      
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [selectedYear, selectedSemester]);

  const gradeData = Object.entries(stats.gradeDistribution).map(([grade, count]) => ({
    grade,
    count
  }));

  return (
    <div className="p-8 bg-gray-100 w-full min-h-screen">
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