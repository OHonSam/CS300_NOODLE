import Table from "../../../components/table";
import { useState, useEffect } from "react";
import { fetchAssignedTeachers, removeTeacherFromSection} from "../../../services/admin/SectionInfoService";
import TeacherInfoProvider from "../../../context/admin/accounts/TeacherInfoContext";
import SectionTeacherInfoDialog from "../../../components/dialog/SectionTeacherInfoDialog";
import { useToast } from "../../../hooks/useToast";

const SectionTeachersView = ({schoolYear, semester, sectionId}) => {
  const [teacherDialogVisible, setTeacherDialogVisible] = useState(false);
  const [currentTeacherDialog, setCurrentTeacherDialog] = useState(null);
  const [assignedTeachers, setAssignedTeachers] = useState([]);
  const { addToast } = useToast();
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const data = await fetchAssignedTeachers(schoolYear, semester, sectionId);
        setAssignedTeachers(data);
      } catch (error) {
        addToast("error", error.message);
      }
    };

    fetchTeacherData();
  }, []);


  const headings = [
    { id: 'teacherId', label: 'Teacher ID' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'department', label: 'Department' },
    { id: 'dob', label: 'Date of Birth' },
  ];

  const handleRowClicked = (row) => {
    setCurrentTeacherDialog(row);
    setTeacherDialogVisible(true);
  };

  const handleRemoveAssignedTeacher = async () => {
    try {
      const newAssignedTeachers = await removeTeacherFromSection(assignedTeachers, currentTeacherDialog.teacherId, schoolYear, semester, sectionId);
      setAssignedTeachers(newAssignedTeachers);
      addToast("success", "Teacher removed successfully");
    } catch (error) {
      addToast("error", error.message);
    }
  }


  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={assignedTeachers} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
      <TeacherInfoProvider>
        <SectionTeacherInfoDialog
          teacherData={currentTeacherDialog}
          isOpen={teacherDialogVisible}
          onRemove={handleRemoveAssignedTeacher}
          onClose={() => setTeacherDialogVisible(false)}
        />
      </TeacherInfoProvider>
    </div>
  );
};

export default SectionTeachersView;
