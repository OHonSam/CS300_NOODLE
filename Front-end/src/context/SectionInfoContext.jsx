import { useState, useEffect } from "react";
import axios from "../axios.config";
import { SectionInfoContext } from "../hooks/useSectionInfo";

// TODO: remove courseId, schoolYear, semester if not using them
export const SectionInfoProvider = ({ children, sectionId, schoolYear, semester }) => {
  // const [courseName, setCourseName] = useState(null);
  // const [credits, setCredits] = useState(null);
  // const [capacity, setCapacity] = useState(null);
  const [section, setSection] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await axios.get(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}`);
        if (response.data) {
          setSection(response.data);
        }
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    };

    if (sectionId && schoolYear && semester) {
      fetchSection();
    }
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
      console.error("Error updating section:", error);
      return false;
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
        deleteSection
      }}
    >
      {children}
    </SectionInfoContext.Provider>
  );
};

export default SectionInfoProvider;