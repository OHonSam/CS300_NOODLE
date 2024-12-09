import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import { useState } from "react";
import ToastSuccess from "../../../components/toast";
import TeacherInfoDialog from "../../../components/dialog/TeacherInfoDialog";
import { useTeacherInfo } from "../../../hooks/useTeacherInfo";

const TeacherAccountView = () => {
  const [teacherDialogVisible, setTeacherDialogVisible] = useState(false);
  const [currentTeacherDialog, setCurrentTeacherDialog] = useState(null);
  const [toast, setToast] = useState('');
  const { teachers } = useTeacherInfo();

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
    <div className="relative mt-8 flex flex-col items-center justify-between h-[550px] w-full">
      <Table headings={headings} data={teachers} readOnly={false} onRowClicked={handleRowClicked}>
        <TeacherInfoDialog 
          key={currentTeacherDialog?.teacherId}
          dialogFor={'info'}
          teacherData={currentTeacherDialog}
          isOpen={teacherDialogVisible}
          onClose={ () => setTeacherDialogVisible(false) }
          onUpdate={ () => setToast('Teacher updated successfully.') }
          onDelete={ () => setToast('Teacher deleted successfully.') }
          className={'left-[25%] right-[25%] top-12 bottom-12'}
        />
      </Table>
      <Pager 
        numberOfPages={14}
        onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        className="w-full flex justify-center"/>
      {toast && <ToastSuccess message={toast} onClick={ () => setToast('') } className={'m-auto -top-32'} Icon={
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
      }/>}
    </div>
  );
};

export default TeacherAccountView;