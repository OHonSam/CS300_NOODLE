import { SectionInfoProvider } from "../../../context/sections/SectionInfoContext";
import { StudentInfoProvider } from "../../../context/accounts/StudentInfoContext";
import { TeacherInfoProvider } from "../../../context/accounts/TeacherInfoContext";

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
