import { useState } from "react";
import Toast from "../../../components/toast";
import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import StudentInfoDialog from "../../../components/dialog/StudentInfoDialog";
import { useStudentInfo } from "../../../hooks/useStudentInfo";

const SectionStudentsView = () => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { students, totalPages, changePage } = useStudentInfo();

  const headings = [
    { id: 'studentId', label: 'Student ID' },
    { id: 'fullName', label: 'Full name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'class', label: 'Class' },
    { id: 'dob', label: 'Date Of Birth' },
  ];

  const handleRowClicked = (row) => {
    setCurrentStudentDialog(row);
    setStudentInfoDialogVisible(true);
  };

  return (
    <div className="relative pt-4 pb-8 flex flex-col overflow-y-auto h-full w-full">
      <Table headings={headings} data={students} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={20} />
      <StudentInfoDialog
        key={currentStudentDialog?.studentId}
        dialogFor={'info'}
        studentData={currentStudentDialog}
        isOpen={studentInfoDialogVisible}
        onClose={() => setStudentInfoDialogVisible(false)}
        onUpdate={() => { }}
        onDelete={() => { }}
      />
      {totalPages > 1 && <Pager
        numberOfPages={totalPages}
        onPageChange={changePage}
        className="w-full flex justify-center mt-2" />
      }
      {toast.length > 0 && <Toast message={toast[0]} onClick={() => setToast([])} className={'m-auto -top-32'} isAccepted={toast[1]} />}
    </div>
  );
}

export default SectionStudentsView;