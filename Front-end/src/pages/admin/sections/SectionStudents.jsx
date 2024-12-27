import { useState, useEffect } from "react";
import Toast from "../../../components/toast";
import Table from "../../../components/table";
import StudentInfoDialog from "../../../components/dialog/StudentInfoDialog";
import { useSectionInfo } from "../../../hooks/sections/useSectionInfo";
import axios from "../../../axios.config";

export const SectionStudentsView = () => {
  const [studentInfoDialogVisible, setStudentInfoDialogVisible] = useState(false);
  const [currentStudentDialog, setCurrentStudentDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { section } = useSectionInfo();

  const headings = [
    { id: 'studentId', label: 'Student ID' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'class', label: 'Class' },
    { id: 'dob', label: 'Date Of Birth' },
  ];

  const fetchEnrolledStudents = async () => {
    if (section?.students && section.students.length > 0) {
      try {
        const response = await axios.get(`/api/admin/sections/${section.schoolYear}/${section.semester}/${section.sectionId}/enrolledStudents`);
        const studentDetails = response.data;
        setEnrolledStudents(studentDetails);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
        setToast(["Failed to fetch enrolled students", false]);
      }
    }
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, [section]);

  const handleRowClicked = (row) => {
    setCurrentStudentDialog(row);
    setStudentInfoDialogVisible(true);
  };

  return (
    <div className="relative pt-4 pb-8 flex flex-col h-full w-full">
      <Table headings={headings} data={enrolledStudents} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={20} />
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
}

export default SectionStudentsView;