import { useState, useEffect } from "react";
import axios from "../../axios.config";
import { SectionStudentsContext } from "../../hooks/sections/useSectionStudents";

export const SectionStudentsProvider = ({ children, sectionId, schoolYear, semester }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = null; // TODO: Replace this with the correct API call
      const fakeStudents = [
        {
          studentId: "1",
          fullName: "Fake Quan",
          email: "fake.quan@super.fakemail",
          gender: "Male",
          class: "Fake Class",
          dob: "01/01/2000",
        },
        {
          studentId: "2",
          fullName: "Fake Sam",
          email: "fake.sam@super.fakemail",
          gender: "Male",
          class: "Fake Class",
          dob: "01/01/2000",
        },
      ];

      setStudents(fakeStudents);
    } catch (error) {
      console.error("Error fetching section:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [sectionId, schoolYear, semester]);

  return (
    <SectionStudentsContext.Provider
      value={{
        students,
        fetchStudents,
      }}
    >
      {children}
    </SectionStudentsContext.Provider>
  );
};

export default SectionStudentsProvider;
