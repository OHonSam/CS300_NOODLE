import { useState, useEffect } from "react";
import axios from "../../axios.config";
import { SectionTeachersContext } from "../../hooks/sections/useSectionTeachers";

export const SectionTeachersProvider = ({ children, sectionId, schoolYear, semester }) => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const response = null; // TODO: Replace this with the correct API call
      const fakeTeachers = [
        {
          teacherId: "1",
          fullName: "Fake Dien",
          email: "fake.dien@super.fakemail",
          gender: "Male",
          department: "Fake Department",
          dob: "01/01/2000",
        },
        {
          teacherId: "2",
          fullName: "Fake Sam",
          email: "fake.tien@super.fakemail",
          gender: "Male",
          department: "Fake Department",
          dob: "01/01/2000",
        },
      ];

      setTeachers(fakeTeachers);
    } catch (error) {
      console.error("Error fetching section:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [sectionId, schoolYear, semester]);

  return (
    <SectionTeachersContext.Provider
      value={{
        teachers,
        fetchTeachers,
      }}
    >
      {children}
    </SectionTeachersContext.Provider>
  );
};

export default SectionTeachersProvider;
