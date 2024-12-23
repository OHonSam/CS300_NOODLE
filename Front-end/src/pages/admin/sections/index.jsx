import { useState, useEffect } from "react";
import axios from "../../../axios.config";
import Header from "../../../components/tab";
import Tab from "../../../components/tab";
import Table from "../../../components/table";
import SectionInfoDialog from "../../../components/dialog/SectionInfoDialog";
import Toast from "../../../components/toast";
import { FiPlusCircle } from "react-icons/fi";

const AdminManageSections = () => {
  const [sectionDialogVisible, setSectionDialogVisible] = useState(false);
  const [sections, setSections] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState([]);

  const headings = [
    { id: 'sectionId', label: 'Course ID' },
    { id: 'courseName', label: 'Course Name' },
    { id: 'courseCredit', label: 'Credits' },
    { id: 'schoolYear', label: 'Year' },
    { id: 'semester', label: 'Semester' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'currentEnrollment', label: 'No. of Students' },
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`/api/admin/sections?page=${currentPage}&limit=20`);
        setSections(response.data.sections);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, [currentPage]);

  // const data = Array.from({ length: 100 }, (_, index) => {
  //   const maxStudents = Math.floor(Math.random() * 50 + 10);
  //   return {
  //     sectionId: index + 1,
  //     sectionName: `Section ${index + 1}`,
  //     credits: Math.floor(Math.random() * 4 + 1),
  //     year: 2020 + Math.floor(Math.random() * 4 + 1),
  //     semester: Math.floor(Math.random() * 2 + 1),
  //     maxStudents: maxStudents,
  //     noOfStudents: Math.floor(Math.random() * maxStudents),
  //   }
  // });

  const handleCreateSection = async (sectionData) => {
    try {
      const response = await axios.post('/api/admin/sections', sectionData);
      setSections(prev => [...prev, response.data]);
      setToast(['Section created successfully', true]);
    } catch (error) {
      const message = error.response?.data?.message || 'Error creating section';
      setToast([message, false]);
    }
  };


  const handleRowClicked = (row) => {
    console.log(row);
    // TODO: Implement edit section functionality
  };

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-center">
        <Tab title="Sections" />
        <button 
            onClick={() => setSectionDialogVisible(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 font-medium">
          <FiPlusCircle className="text-lg"/>
          <p>Create Section</p>
        </button>
          
      </div>
      <Table
        headings={headings}
        onRowClicked={handleRowClicked}
        data={sections}
        readOnly={false}
        rowsPerPage={20}
        className={"pt-4"}
      />
      <SectionInfoDialog
        isOpen={sectionDialogVisible}
        onClose={() => setSectionDialogVisible(false)}
        onCreate={handleCreateSection}
      />
      {toast.length > 0 && <Toast message={toast[0]} isAccepted={toast[1]} onClick={() => setToast([])} className={'m-auto top-6'} Icon={
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      } />}
    </div>
  );
};

export default AdminManageSections;
