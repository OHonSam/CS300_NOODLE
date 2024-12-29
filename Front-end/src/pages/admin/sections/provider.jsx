import { SectionStudentsProvider } from "../../../context/admin/sections/SectionStudentsContext";

const SectionProvider = ({ children, sectionId, schoolYear, semester }) => {
  return (
    <SectionStudentsProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
          {children}
    </SectionStudentsProvider>
  );
};

export default SectionProvider;
