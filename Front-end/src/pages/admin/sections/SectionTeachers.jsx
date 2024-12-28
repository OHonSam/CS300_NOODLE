import Table from "../../../components/table";
import { useState, useEffect } from "react";
import Toast from "../../../components/toast";
import TeacherInfoDialog from "../../../components/dialog/TeacherInfoDialog";
import { useSectionTeachers } from "../../../hooks/sections/useSectionTeachers";

const SectionTeachersView = () => {
  const [teacherDialogVisible, setTeacherDialogVisible] = useState(false);
  const [currentTeacherDialog, setCurrentTeacherDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { teachers } = useSectionTeachers();

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

  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={teachers} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
      {/* <TeacherInfoDialog
        key={currentTeacherDialog?.teacherId}
        dialogFor={'info'}
        teacherData={currentTeacherDialog}
        isOpen={teacherDialogVisible}
        onClose={() => setTeacherDialogVisible(false)}
        onUpdate={() => { }}
        onDelete={() => { }}
      /> */}
      {toast.length > 0 && <Toast message={toast[0]} onClick={() => setToast([])} className={'m-auto -top-32'} isAccepted={toast[1]} />}
    </div>
  );
};

export default SectionTeachersView;
