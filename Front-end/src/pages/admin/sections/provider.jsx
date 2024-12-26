import { SectionInfoProvider } from "../../../context/SectionInfoContext";

const SectionProvider = ({ children, courseId, schoolYear, semester }) => {
  return (
    <SectionInfoProvider courseId={courseId} schoolYear={schoolYear} semester={semester}>
      {children}
    </SectionInfoProvider>
  );
};

export default SectionProvider;
