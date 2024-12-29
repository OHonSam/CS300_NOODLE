import { useState, useEffect } from "react";
import Table from "../../../components/table";
import { SectionStudentInfoDialog } from "../../../components/dialog/SectionStudentInfoDialog";
import EnrolledStudentsUploadDialog from "../../../components/dialog/EnrolledStudentsUploadDialog";
import { addEnrolledStudentsFromFile, fetchEnrolledStudents, removeStudentFromSection, updateStudentFromSection } from "../../../services/SectionInfoService";
import { useToast } from "../../../hooks/useToast";

export const SectionEnrolledStudentsView = ({ schoolYear, semester, sectionId, studentFileUploadDialogVisible, setStudentFileUploadDialogVisible }) => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchEnrolledStudentsData = async () => {
      try {
        const data = await fetchEnrolledStudents(schoolYear, semester, sectionId);
        setEnrolledStudents(data);
      } catch (error) {
        addToast('error', error.message || 'Failed to fetch enrolled students');
      }
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
    if (!window.confirm('Are you sure you want to remove the enrolled student?')) {
      return;
    }

    try {
      const newEnrolledStudents = await removeStudentFromSection(enrolledStudents, currentStudentDialog.studentId, schoolYear, semester, sectionId);
      setEnrolledStudents(newEnrolledStudents);
      addToast('success', 'Student removed successfully');
    } catch (error) {
      addToast('error', error.message || 'Failed to remove student');
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    if (!window.confirm('Are you sure you want to update the enrolled student information?')) {
      return;
    }

    try {
      const newEnrolledStudents = await updateStudentFromSection(enrolledStudents, updatedStudent, schoolYear, semester, sectionId);
      setEnrolledStudents(newEnrolledStudents);
      addToast('success', 'Student updated successfully');
    } catch (error) {
      addToast('error', error.message || 'Failed to update student');
    }
  };

  const handleAddStudent = async (file) => {
    if (!window.confirm('Are you sure you want to import the enrolled students from this file?')) {
      return;
    }

    try {
      const newEnrolledStudents = await addEnrolledStudentsFromFile(enrolledStudents, file, schoolYear, semester, sectionId);
      setEnrolledStudents(newEnrolledStudents);
      addToast('success', 'Student added successfully');
    } catch (error) {
      addToast('error', error.message || 'Failed to add student');
    }
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