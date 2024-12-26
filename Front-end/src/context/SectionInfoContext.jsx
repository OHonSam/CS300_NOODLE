import { useState, useEffect } from "react";
import axios from "../axios.config";
import { SectionInfoContext } from "../hooks/useSectionInfo";

export const SectionInfoProvider = ({ children, courseId, schoolYear, semester }) => {
  const [courseName, setCourseName] = useState(null);
  const [credits, setCredits] = useState(null);
  const [capacity, setCapacity] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = null; // Replace this with the actual API call
        setCourseName("Introduction to Kill Yourself");
        setCredits(4);
        setCapacity(69);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  });

  return (
    <SectionInfoContext.Provider
      value={{
        courseId,
        courseName,
        credits,
        schoolYear,
        semester,
        capacity
      }}
    >
      {children}
    </SectionInfoContext.Provider>
  );
};

export default SectionInfoProvider;