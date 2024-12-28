import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import { useState } from "react";
import StudentInfoDialog from "../../../components/dialog/StudentInfoDialog";
import { useStudentInfo } from "../../../hooks/accounts/useStudentInfo";
import Toast from "../../../components/toast";

const StudentAccountView = () => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { students } = useStudentInfo();

  const headings = [
    { id: 'studentId', label: 'Student ID' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'class', label: 'Class' },
    { id: 'dob', label: 'Date of Birth' },
  ];

  const handleRowClicked = (row) => {
    setCurrentStudentDialog(row);
    setStudentInfoDialogVisible(true);
  };

  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={students} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
      <StudentInfoDialog
        key={currentStudentDialog?.studentId}
        dialogFor={'info'}
        studentData={currentStudentDialog}
        isOpen={studentInfoDialogVisible}
        onClose={() => setStudentInfoDialogVisible(false)}
        onUpdate={() => { }}
        onDelete={() => { }}
      />
      {toast.length > 0 && <Toast message={toast[0]} onClick={() => setToast([])} className={'m-auto -top-32'} isAccepted={toast[1]} />}
    </div>
  );
};

export default StudentAccountView;