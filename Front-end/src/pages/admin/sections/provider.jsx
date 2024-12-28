import { SectionInfoProvider } from "../../../context/sections/SectionInfoContext";
import { SectionStudentsProvider } from "../../../context/sections/SectionStudentsContext";
import { SectionTeachersProvider } from "../../../context/sections/SectionTeachersContext";

const SectionProvider = ({ children, sectionId, schoolYear, semester }) => {
  return (
    <SectionStudentsProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
      <SectionTeachersProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
        <SectionInfoProvider sectionId={sectionId} schoolYear={schoolYear} semester={semester}>
          {children}
        </SectionInfoProvider>
      </SectionTeachersProvider>
    </SectionStudentsProvider>
  );
};

export default SectionProvider;
