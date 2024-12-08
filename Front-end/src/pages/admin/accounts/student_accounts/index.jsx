import Table from "../../../../components/table";
import Pager from "../../../../components/footer/pager";
import { useState } from "react";
import StudentInfoDialog from "../../../../components/dialog/StudentInfoDialog";
import { useStudentInfo } from "../../../../hooks/useStudentInfo";
import ToastSuccess from "../../../../components/toast/ToastSuccess";

const StudentAccountView = () => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const [toast, setToast] = useState('');
  const { students } = useStudentInfo();

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
    <div className="relative mt-8 flex flex-col items-center justify-between h-[550px] w-full">
      <Table headings={headings} data={students} readOnly={false} onRowClicked={handleRowClicked}>
        <StudentInfoDialog 
          key={currentStudentDialog?.studentId}
          dialogFor={'info'}
          studentData={currentStudentDialog}
          isOpen={studentInfoDialogVisible}
          onClose={ () => setStudentInfoDialogVisible(false) }
          onUpdate={ () => setToast('Student updated successfully.') }
          onDelete={ () => setToast('Student deleted successfully.') }
          className={'left-[25%] right-[25%] top-12 bottom-12'}
        />
      </Table>
      <Pager 
        numberOfPages={14}
        onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        className="w-full flex justify-center"/>
      {toast && <ToastSuccess message={toast} onClick={ () => setToast('') } className={'m-auto -top-32'}/>}
    </div>
  );
};

export default StudentAccountView;