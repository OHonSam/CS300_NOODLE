import { SectionInfoProvider } from "../../../context/SectionInfoContext";
import { StudentInfoProvider } from "../../../context/StudentInfoContext";
import { TeacherInfoProvider } from "../../../context/TeacherInfoContext";

const SectionProvider = ({ children, sectionId, schoolYear, semester }) => {
  return (
    <StudentInfoProvider>
      <TeacherInfoProvider>
        <SectionInfoProvider
          sectionId={sectionId}
          schoolYear={schoolYear}
          semester={semester}
        >
          {children}
        </SectionInfoProvider>
      </TeacherInfoProvider>
    </StudentInfoProvider >
  );
};

export default SectionProvider;
