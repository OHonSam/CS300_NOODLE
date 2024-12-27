import { SectionInfoProvider } from "../../../context/admin/SectionInfoContext";
import { StudentInfoProvider } from "../../../context/admin/StudentInfoContext";
import { TeacherInfoProvider } from "../../../context/admin/TeacherInfoContext";

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
