import { SectionStudentsProvider } from "../../../context/admin/sections/SectionStudentsContext";
import { SectionTeachersProvider } from "../../../context/admin/sections/SectionTeachersContext";

const SectionProvider = ({ children, sectionId, schoolYear, semester }) => {
  return (
    <SectionStudentsProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
      <SectionTeachersProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
          {children}
      </SectionTeachersProvider>
    </SectionStudentsProvider>
  );
};

export default SectionProvider;
