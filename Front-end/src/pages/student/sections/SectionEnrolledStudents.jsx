import { useState, useEffect } from "react";
import Table from "../../../components/table";
import { addEnrolledStudentsFromFile, fetchEnrolledStudents, removeStudentFromSection, updateStudentFromSection } from "../../../services/SectionInfoService";

export const SectionEnrolledStudentsView = ({ schoolYear, semester, sectionId }) => {
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
    { id: 'gradeOthers', label: 'Others' },
    { id: 'gradeTotal', label: 'Total' }
  ];

  const handleRowClicked = (row) => { };

  return (
    <div className="relative pt-4 pb-8 flex flex-col h-full w-full">
      <Table headings={headings} data={enrolledStudents} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
    </div>
  );
}

export default SectionEnrolledStudentsView;