import { useState, useEffect } from "react";
import axios from "../../axios.config";
import { SectionInfoContext } from "../../hooks/admin/useSectionInfo";

export const SectionInfoProvider = ({ children, sectionId, schoolYear, semester }) => {
  const [section, setSection] = useState(null);

  const fetchSection = async () => {
    try {
      const response = await axios.get(`/api/admin/section/${schoolYear}/${semester}/${sectionId}`);
      setSection(response.data);
    } catch (errors) {
      console.error("Error fetching section:", error);
    }
  };

  useEffect(() => {
    fetchSection();
  }, [sectionId, schoolYear, semester]);

  const updateSection = async (updatedSection) => {
    try {
      const response = await axios.put(
        `/api/admin/sections/${schoolYear}/${semester}/${sectionId}`,
        updatedSection
      );
      if (response.data) {
        setSection(response.data);
        return true;
      }
    } catch (error) {
      console.error("Error updating section:", error.response);
      throw {
        message: error.response.data.message,
      };
    }
  };

  const deleteSection = async () => {
    try {
      await axios.delete(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}`);
      return true;
    } catch (error) {
      console.error("Error deleting section:", error);
      return false;
    }
  };


  return (
    <SectionInfoContext.Provider
      value={{
        section,
        updateSection,
        deleteSection,
      }}
    >
      {children}
    </SectionInfoContext.Provider>
  );
};

export default SectionInfoProvider;
