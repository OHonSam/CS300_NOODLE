import Table from "../../../components/table";
import { useState, useEffect } from "react";
import Toast from "../../../components/toast";
import TeacherInfoDialog from "../../../components/dialog/TeacherInfoDialog";
import { useSectionInfo } from "../../../hooks/admin/useSectionInfo";
import axios from "../../../axios.config";

const SectionTeachersView = () => {
  const [teacherDialogVisible, setTeacherDialogVisible] = useState(false);
  const [currentTeacherDialog, setCurrentTeacherDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { section } = useSectionInfo();
  const [assignedTeachers, setAssignedTeachers] = useState([]);

  const headings = [
    { id: 'teacherId', label: 'Teacher ID' },
    { id: 'fullName', label: 'Full name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'department', label: 'Department' },
    { id: 'dob', label: 'Date Of Birth' },
  ];

  const fetchAssignedTeachers = async () => {
    if (section?.teachers && section.teachers.length > 0) {
      try {
        const response = await axios.get(`/api/admin/sections/${section.schoolYear}/${section.semester}/${section.sectionId}/assignedTeachers`);
        const teacherDetails = response.data;
        setAssignedTeachers(teacherDetails);
        console.log(teacherDetails);
      } catch (error) {
        console.error("Error fetching assigned teachers:", error);
        setToast(["Failed to fetch assigned teachers", false]);
      }
    }
  };

  useEffect(() => {
    fetchAssignedTeachers();
  }, [section]);

  const handleRowClicked = (row) => {
    setCurrentTeacherDialog(row);
    setTeacherDialogVisible(true);
  };

  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={assignedTeachers} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={20} />
      <TeacherInfoDialog
        key={currentTeacherDialog?.teacherId}
        dialogFor={'info'}
        teacherData={currentTeacherDialog}
        isOpen={teacherDialogVisible}
        onClose={() => setTeacherDialogVisible(false)}
        onUpdate={() => { }}
        onDelete={() => { }}
      />
      {toast.length > 0 && <Toast message={toast[0]} onClick={() => setToast([])} className={'m-auto -top-32'} isAccepted={toast[1]} />}
    </div>
  );
};

export default SectionTeachersView;
