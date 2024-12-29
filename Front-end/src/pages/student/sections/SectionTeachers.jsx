import Table from "../../../components/table";
import { useState, useEffect } from "react";
import { fetchAssignedTeachers } from "../../../services/SectionInfoService";
import { useToast } from "../../../hooks/useToast";

const SectionTeachersView = ({ schoolYear, semester, sectionId }) => {
  const [assignedTeachers, setAssignedTeachers] = useState([]);
  const { addToast } = useToast();
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const data = await fetchAssignedTeachers(schoolYear, semester, sectionId);
        setAssignedTeachers(data);
      } catch (error) {
        addToast("error", error.message);
      }
    };

    fetchTeacherData();
  }, []);


  const headings = [
    { id: 'teacherId', label: 'Teacher ID' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'department', label: 'Department' },
    { id: 'dob', label: 'Date of Birth' },
  ];

  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={assignedTeachers} readOnly={false} rowsPerPage={10} />
    </div>
  );
};

export default SectionTeachersView;
