import { useState, useEffect } from "react";
import Table from "../../../components/table";
import { useSectionStudents } from "../../../hooks/admin/sections/useSectionStudents";
import { StudentInfoProvider } from "../../../context/admin/accounts/StudentInfoContext";
import { SectionStudentInfoDialog } from "../../../components/dialog/SectionStudentInfoDialog";

export const SectionEnrolledStudentsView = () => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const { enrolledStudents } = useSectionStudents();

  const headings = [
    { id: 'studentId', label: 'Student ID' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'class', label: 'Class' },
    { id: 'gradeMidterm', label: 'Midterm' },
    { id: 'gradeFinal', label: 'Final' },
    { id: 'gradeOthers', label: 'Other' },
    { id: 'gradeTotal', label: 'Total' }
  ];

  const handleRowClicked = (row) => {
    setCurrentStudentDialog(row);
    setStudentInfoDialogVisible(true);
  };

  return (
    <div className="relative pt-4 pb-8 flex flex-col h-full w-full">
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
    </div>
  );
}

export default SectionEnrolledStudentsView;