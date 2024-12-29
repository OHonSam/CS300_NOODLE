import Table from "../../../components/table";
import { useState, useEffect } from "react";
import { fetchAssignedTeachers, assignTeacherToSection, assignTeacherArrayToSection, removeTeacherFromSection, removeTeacherArrayFromSection } from "../../../services/SectionInfoService";
import TeacherInfoProvider from "../../../context/admin/accounts/TeacherInfoContext";
import SectionTeacherInfoDialog from "../../../components/dialog/SectionTeacherInfoDialog";
import { useToast } from "../../../hooks/useToast";
import SelectTeacherDialog from "../../../components/dialog/SelectTeacherDialog";

const SectionTeachersView = ({ schoolYear, semester, sectionId, assignTeacherDialogVisible, setAssignTeacherDialogVisible }) => {
  const [teacherDialogVisible, setTeacherDialogVisible] = useState(false);
  const [currentTeacherDialog, setCurrentTeacherDialog] = useState(null);
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

  const handleRowClicked = (row) => {
    setCurrentTeacherDialog(row);
    setTeacherDialogVisible(true);
  };

  const handleAssignTeacherToSection = async (teacherId) => {
    try {
      return await assignTeacherToSection(teacherId, schoolYear, semester, sectionId);
      addToast("success", "Teacher added successfully");
    } catch (error) {
      addToast("error", error.message);
    }
  }

  const handleAssignTeacherArrayToSection = async (teacherIds) => {
    try {
      return await assignTeacherArrayToSection(teacherIds, schoolYear, semester, sectionId);
      addToast("success", "Teachers added successfully");
    } catch (error) {
      addToast("error", error.message);
    }
  }

  const handleRemoveAssignedTeacher = async (teacherId) => {
    try {
      const newAssignedTeachers = await removeTeacherFromSection(assignedTeachers, teacherId, schoolYear, semester, sectionId);
      addToast("success", "Teacher removed successfully");
    } catch (error) {
      addToast("error", error.message);
    }
  }

  const handleRemoveAssignedTeacherArray = async (teacherIds) => {
    try {
      return await removeTeacherArrayFromSection(assignedTeachers, teacherIds, schoolYear, semester, sectionId);
      addToast("success", "Teachers removed successfully");
    } catch (error) {
      addToast("error", error.message);
    }
  }

  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={assignedTeachers} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
      <TeacherInfoProvider>
        <SectionTeacherInfoDialog
          teacherData={currentTeacherDialog}
          isOpen={teacherDialogVisible}
          assignedTeachers={assignedTeachers}
          setAssignedTeachers={setAssignedTeachers}
          onRemove={handleRemoveAssignedTeacher}
          onClose={() => setTeacherDialogVisible(false)}
        />
        <SelectTeacherDialog
          isOpen={assignTeacherDialogVisible}
          onClose={() => setAssignTeacherDialogVisible(false)}
          assignedTeachers={assignedTeachers}
          setAssignedTeachers={setAssignedTeachers}
          onAssign={handleAssignTeacherArrayToSection}
          onRemove={handleRemoveAssignedTeacherArray}
        />
      </TeacherInfoProvider>

    </div>
  );
};

export default SectionTeachersView;