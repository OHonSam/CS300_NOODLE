import { useState, useEffect } from "react";
import axios from "axios";
import { SectionsManagementContext } from "../../hooks/sections/useSectionsManagementInfo";
import { getStoredToken, decryptToken } from "../../services/auth/tokenService";

export const SectionsManagementProvider = ({ children }) => {
  const [sections, setSections] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSections = async (page = 1) => {
    try {
      setLoading(true);
      const token = decryptToken(getStoredToken());
      const teacherId = token.username;

      const response = await axios.get(`/api/teacher/sections?teacherId=${teacherId}&page=${page}&limit=10`);

      if (response.data.sections.length === 0) {
        setSections([]);
        setCurrentPage(1);
      } else {
        setSections(response.data.sections);
        setCurrentPage(page);
      }
      console.log(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections(currentPage);
  }, [currentPage]);

  return (
    <SectionsManagementContext.Provider
      value={{
        sections,
        currentPage,
        loading,
        error,
        setCurrentPage,
      }}
    >
      {children}
    </SectionsManagementContext.Provider>
  );
};