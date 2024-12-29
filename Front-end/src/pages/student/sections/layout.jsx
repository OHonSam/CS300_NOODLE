import SectionsProvider from "./provider";
import StudentSections from "./StudentSections";

const StudentSectionsLayout = () => {
  return (
    <SectionsProvider>
      <StudentSections />
    </SectionsProvider>
  );
}

export default StudentSectionsLayout;
