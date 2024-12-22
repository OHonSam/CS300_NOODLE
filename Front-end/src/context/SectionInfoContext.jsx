import { useState, useEffect } from "react";
import axios from "../axios.config";
import { SectionInfoContext } from "../hooks/useSectionInfo";

export const SectionInfoProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionsPerPage = 20;
  
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

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <SectionInfoContext.Provider
      value={{
        sections: sections.slice(0, 10),
        totalPages,
        currentPage,
        changePage,
        addSection
      }}
    >
      {children}
    </SectionInfoContext.Provider>
  );
};

export default SectionInfoProvider;