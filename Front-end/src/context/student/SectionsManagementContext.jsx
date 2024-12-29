import { useState, useEffect } from "react";
import axios from "../../axios.config";
import { SectionsManagementContext } from "../../hooks/student/useSectionsManagementInfo";
import { getStoredToken, decryptToken } from "../../services/auth/tokenService";

export const SectionsManagementProvider = ({ children }) => {
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const token = decryptToken(getStoredToken());
      const studentId = token.username;

      const response = await axios.get(`/api/student/sections?studentId=${studentId}`);

      if (response.data.sections.length === 0) {
        setSections([]);
      } else {
        setSections(response.data.sections);
      }
      console.log(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <SectionsManagementContext.Provider
      value={{
        sections,
        loading,
        error,
      }}
    >
      {children}
    </SectionsManagementContext.Provider>
  );
};