import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import { useState } from "react";
import Toast from "../../../components/toast";
import TeacherInfoDialog from "../../../components/dialog/TeacherInfoDialog";
import { useTeacherInfo } from "../../../hooks/useTeacherInfo";

const TeacherAccountView = () => {
  const [teacherDialogVisible, setTeacherDialogVisible] = useState(false);
  const [currentTeacherDialog, setCurrentTeacherDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { teachers, totalPages, changePage } = useTeacherInfo();

  const headings = [
    { id: 'teacherId', label: 'Teacher ID' },
    { id: 'fullName', label: 'Full name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'department', label: 'Department' },
    { id: 'dob', label: 'Date Of Birth' },
  ];

  const handleRowClicked = (row) => {
    setCurrentTeacherDialog(row);
    setTeacherDialogVisible(true);
  };

  return (
    <div className="relative mt-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={teachers} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={teachersPerPage}>
        <TeacherInfoDialog
          key={currentTeacherDialog?.teacherId}
          dialogFor={'info'}
          teacherData={currentTeacherDialog}
          isOpen={teacherDialogVisible}
          onClose={() => setTeacherDialogVisible(false)}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </Table>
      {totalPages > 1 && <Pager
        numberOfPages={totalPages}
        onPageChange={changePage}
        className="w-full flex justify-center mt-2" />
      }
      {toast.length > 0 && <Toast message={toast[0]} onClick={() => setToast([])} className={'m-auto -top-32'} isAccepted={toast[1]} />}
    </div>
  );
};

export default TeacherAccountView;
