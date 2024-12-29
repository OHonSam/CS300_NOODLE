import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios.config";
import Tab from "../../../components/tab";
import Table from "../../../components/table";
import SectionInfoDialog from "../../../components/dialog/SectionInfoDialog";
import { useToast } from "../../../hooks/useToast";
import { FiPlusCircle } from "react-icons/fi";
import { fetchAllSections, addSection } from "../../../services/SectionInfoService";

const AdminManageSectionsLayout = () => {
  const navigate = useNavigate();
  const [sectionDialogVisible, setSectionDialogVisible] = useState(false);
  const [sections, setSections] = useState([]);
  const { addToast } = useToast();

  const headings = [
    { id: 'sectionId', label: 'Course ID' },
    { id: 'courseName', label: 'Course Name' },
    { id: 'courseCredit', label: 'Credits' },
    { id: 'schoolYear', label: 'Year' },
    { id: 'semester', label: 'Semester' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'currentEnrollment', label: 'No. of Students' },
  ];

  const fetchAdminSections = async () => {
    try {
      const response = await fetchAllSections();
      setSections(response.sections);
    } catch (error) {
      addToast("error", error.message || "Failed to load sections");
    }
  };

  const addAdminSections = async (sectionData) => {
    const response = await addSection(sectionData);
    setSections((prev) => [...prev, response]);
    if (response) {
      addToast("success", "Section added successfully");
    } else {
      addToast("error", "Failed to add section");
    }
  };

  useEffect(() => {
    fetchAdminSections();
  }, []);

  const handleCreateSection = async (sectionData) => {
    await addAdminSections(sectionData);
  };

  const handleRowClicked = (row) => {
    navigate(`/admin/sections/${row.schoolYear}/${row.semester}/${row.sectionId}`,
      {
        state:
        {
          sectionId: row.sectionId,
          courseName: row.courseName,
          schoolYear: row.schoolYear,
          semester: row.semester,
          capacity: row.capacity,
          courseCredit: row.courseCredit,
        }
      });
  };

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-center">
        <Tab title="Sections" />
        <button
          onClick={() => setSectionDialogVisible(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 font-medium">
          <FiPlusCircle className="text-lg" />
          <p>Create Section</p>
        </button>
      </div>
      <Table
        headings={headings}
        onRowClicked={handleRowClicked}
        data={sections}
        readOnly={false}
        rowsPerPage={10}
        className={"pt-4"}
      />
      <SectionInfoDialog
        isOpen={sectionDialogVisible}
        onClose={() => setSectionDialogVisible(false)}
        onCreate={handleCreateSection}
      />
    </div>
  );
};

export default AdminManageSectionsLayout;
