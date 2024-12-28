import { useState, useEffect } from "react";
import Toast from "../../../components/toast";
import Table from "../../../components/table";
import { useSectionStudents } from "../../../hooks/admin/sections/useSectionStudents";
import { StudentInfoProvider } from "../../../context/admin/accounts/StudentInfoContext";
import { SectionStudentInfoDialog } from "../../../components/dialog/SectionStudentInfoDialog";
import EnrolledStudentsUploadDialog from "../../../components/dialog/EnrolledStudentsUploadDialog";
import { FiPlusCircle } from "react-icons/fi";

export const SectionEnrolledStudentsView = () => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const [studentFileUploadDialogVisible, setStudentFileUploadDialogVisible] = useState(false);
  const [toast, setToast] = useState([]);
  const { enrolledStudents } = useSectionStudents();

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
    <div className="relative pt-4 pb-8 flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Enrolled Students</h2>
        <button
          onClick={() => setStudentFileUploadDialogVisible(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 font-medium"
        >
          <FiPlusCircle className="text-lg" />
          <p>Enroll Students</p>
        </button>
      </div>
      <EnrolledStudentsUploadDialog
        heading={'Import student file'}
        isOpen={studentFileUploadDialogVisible}
        onSubmit={(message, isAccepted) => setToast([message, isAccepted])}
        onClose={() => setStudentFileUploadDialogVisible(false)}
        fileFormat={['.csv', '.xlsx', '.txt']}
        userType="student"
      />
      <Table headings={headings} data={enrolledStudents} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
      <StudentInfoProvider>
        <SectionStudentInfoDialog
          key={currentStudentDialog?.studentId}
          dialogFor={'info'}
          studentData={currentStudentDialog}
          isOpen={studentInfoDialogVisible}
          onClose={() => setStudentInfoDialogVisible(false)}
          onUpdate={() => { }}
          onRemove={() => { }}
        />
      </StudentInfoProvider>
      {toast.length > 0 && <Toast message={toast[0]} onClick={() => setToast([])} className={'m-auto -top-32'} isAccepted={toast[1]} />}
    </div>
  );
}

export default SectionEnrolledStudentsView;