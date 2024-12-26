import { createContext, useState, useEffect } from "react";
import axios from "../axios.config";

const initialSectionContext = {
  // Original section management
  sections: [],
  totalPages: 0,
  currentPage: 1,
  changePage: () => { },
  addSection: async () => false,
  getSection: async () => false,
  updateSection: async () => false,
  deleteSection: async () => false,
  
  // New dashboard stats
  stats: {
    totalSections: 0,
    totalTeachers: 0,
    totalStudents: 0,
    gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 }
  },
  selectedYear: new Date().getFullYear().toString(),
  selectedSemester: '1',
  loading: false,
  setSelectedYear: () => {},
  setSelectedSemester: () => {},
  schoolYears: [],
  getSchoolYearLabel: () => {}
};

export const SectionInfoContext = createContext(initialSectionContext);

export const SectionInfoProvider = ({ children }) => {
  // Original section management state
  const [sections, setSections] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionsPerPage = 20;

  // New dashboard state
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
  const [stats, setStats] = useState(initialSectionContext.stats);
  const [loading, setLoading] = useState(true);

  // Original section management functions
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`/api/admin/sections?page=${currentPage}&limit=${sectionsPerPage}`);
        setSections(response.data.sections);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, [currentPage]);

  const addSection = async (newSection) => {
    try {
      const response = await axios.post('/api/admin/sections', newSection);
      setSections(prev => [...prev, response.data]);
      return true;
    } catch (error) {
      console.error("Error adding section:", error);
      return false;
    }
  };

  const getSection = async (id) => {
    try {
      const response = await axios.get(`/api/admin/sections/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting section:", error);
      return false;
    }
  };

  const updateSection = async (id, updatedSection) => {
    try {
      const response = await axios.put(`/api/admin/sections/${id}`, updatedSection);
      setSections(prev => prev.map(section => 
        section.id === id ? response.data : section
      ));
      return true;
    } catch (error) {
      console.error("Error updating section:", error);
      return false;
    }
  };

  const deleteSection = async (id) => {
    try {
      await axios.delete(`/api/admin/sections/${id}`);
      setSections(prev => prev.filter(section => section.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting section:", error);
      return false;
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  // New dashboard functions
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

  return (
    <SectionInfoContext.Provider
      value={{
        // Original section management values
        sections: sections.slice(0, 10),
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
      }}
    >
      {children}
    </SectionInfoContext.Provider>
  );
};

export default SectionInfoProvider;