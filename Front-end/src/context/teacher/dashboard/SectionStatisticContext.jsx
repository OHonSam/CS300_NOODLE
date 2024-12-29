import { createContext, useState, useEffect } from "react";
import axios from "../../../axios.config";
import { decryptToken, getStoredToken } from "../../../services/auth/tokenService";

const initialSectionStatisticContext = {
  stats: {
    totalSections: 0,
    totalTeachers: 0,
    totalStudents: 0,
    gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 }
  },
  selectedYear: new Date().getFullYear().toString(),
  selectedSemester: '1',
  loading: false,
  setSelectedYear: () => { },
  setSelectedSemester: () => { },
  schoolYears: [],
  getSchoolYearLabel: () => { }
};

export const SectionStatisticContext = createContext(initialSectionStatisticContext);

export const SectionStatisticProvider = ({ children }) => {
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
  const [stats, setStats] = useState(initialSectionStatisticContext.stats);
  const [loading, setLoading] = useState(true);

  const getSchoolYearLabel = (year) => {
    const startYear = parseInt(year);
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  };

  const fetchStats = async () => {
    try {
      const userData = getStoredToken();
      const decodedData = decryptToken(userData);
      const username = decodedData?.username
      setLoading(true);
      const response = await axios.get('/api/teacher/teacherId/section/statistic', {
        params: {
          teacherId: username,
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

  return (
    <SectionStatisticContext.Provider
      value={{
        stats,
        selectedYear,
        loading,
        schoolYears,
        getSchoolYearLabel,
        setSelectedYear,
        selectedSemester,
        setSelectedSemester,
      }}
    >
      {children}
    </SectionStatisticContext.Provider>
  );
};

export default SectionStatisticProvider;