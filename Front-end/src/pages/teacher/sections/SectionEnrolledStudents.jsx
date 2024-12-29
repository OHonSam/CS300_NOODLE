import { useState, useEffect } from "react";
import Table from "../../../components/table";
import { SectionStudentInfoDialog } from "../../../components/dialog/SectionStudentInfoDialog";
import EnrolledStudentsUploadDialog from "../../../components/dialog/EnrolledStudentsUploadDialog";
import { addEnrolledStudentsFromFile, fetchEnrolledStudents, removeStudentFromSection, updateStudentFromSection } from "../../../services/SectionInfoService";

export const SectionEnrolledStudentsView = ({schoolYear, semester, sectionId, studentFileUploadDialogVisible, setStudentFileUploadDialogVisible}) => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  useEffect(() => {
    const fetchEnrolledStudentsData = async () => {
      const data = await fetchEnrolledStudents(schoolYear, semester, sectionId);
      setEnrolledStudents(data);
    };

    fetchEnrolledStudentsData();
  }, [])

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

  const handleRemoveStudent = async () => {
    const newEnrolledStudents = await removeStudentFromSection(enrolledStudents, currentStudentDialog.studentId, schoolYear, semester, sectionId);
    setEnrolledStudents(newEnrolledStudents);
  };

  const handleUpdateStudent = async (updatedStudent) => {
    const newEnrolledStudents = await updateStudentFromSection(enrolledStudents, updatedStudent, schoolYear, semester, sectionId);
    setEnrolledStudents(newEnrolledStudents);
  };

  const handleAddStudent = async (file) => {
    const newEnrolledStudents = await addEnrolledStudentsFromFile(enrolledStudents, file, schoolYear, semester, sectionId);
    setEnrolledStudents(newEnrolledStudents);
  }

  return (
    <div className="relative pt-4 pb-8 flex flex-col h-full w-full">
      <Table headings={headings} data={enrolledStudents} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
      <SectionStudentInfoDialog
        key={currentStudentDialog?.studentId}
        dialogFor={'info'}
        studentData={currentStudentDialog}
        isOpen={studentInfoDialogVisible}
        onClose={() => setStudentInfoDialogVisible(false)}
        onUpdate={handleUpdateStudent}
        onRemove={handleRemoveStudent}
      />
      <EnrolledStudentsUploadDialog
        heading={'Import enrolled student file'}
        isOpen={studentFileUploadDialogVisible}
        onSubmit={handleAddStudent}
        onClose={() => setStudentFileUploadDialogVisible(false)}
        fileFormat={['.csv', '.xlsx', '.txt']}
        userType="student"
      />
    </div>
  );
}

export default SectionEnrolledStudentsView;