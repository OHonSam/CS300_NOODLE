import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import { useState } from "react";
import TeacherInfoDialog from "../../../components/dialog/TeacherInfoDialog";
import { useTeacherInfo } from "../../../hooks/admin/accounts/useTeacherInfo";

const TeacherAccountView = () => {
  const [teacherDialogVisible, setTeacherDialogVisible] = useState(false);
  const [currentTeacherDialog, setCurrentTeacherDialog] = useState(null);
  const { teachers } = useTeacherInfo();

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
      <TeacherInfoDialog
        key={currentTeacherDialog?.teacherId}
        dialogFor={'info'}
        teacherData={currentTeacherDialog}
        isOpen={teacherDialogVisible}
        onClose={() => setTeacherDialogVisible(false)}
        onUpdate={() => { }}
        onDelete={() => { }}
      />
    </div>
  );
};

export default TeacherAccountView;
