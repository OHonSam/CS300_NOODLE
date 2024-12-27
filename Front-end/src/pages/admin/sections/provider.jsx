import { SectionInfoProvider } from "../../../context/SectionInfoContext";

const SectionProvider = ({ children, sectionId, schoolYear, semester }) => {
  return (
    <SectionInfoProvider 
      sectionId={sectionId} 
      schoolYear={schoolYear} 
      semester={semester}
    >
      {children}
    </SectionInfoProvider>
  );
};

export default SectionProvider;
