import { SectionStudentsProvider } from "../../../context/admin/sections/SectionStudentsContext";
import { SectionTeachersProvider } from "../../../context/admin/sections/SectionTeachersContext";
import { SectionMaterialProvider } from "../../../context/admin/sections/SectionMaterialContext";

const SectionProvider = ({ children, sectionId, schoolYear, semester }) => {
  return (
    <SectionMaterialProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
    <SectionStudentsProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
      <SectionTeachersProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
          {children}
      </SectionTeachersProvider>
    </SectionStudentsProvider>
    </SectionMaterialProvider>
  );
};

export default SectionProvider;
