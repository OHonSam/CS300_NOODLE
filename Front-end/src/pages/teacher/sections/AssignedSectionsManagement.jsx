import { useState, useEffect } from "react";
import Header from "../../../components/tab";
import SectionList from "../../../components/section/sectionlist";
import { useSectionInfo } from "../../../hooks/useSectionInfo";
import { getStoredToken, decryptToken } from "../../../services/auth/tokenService";
import axios from "../../../axios.config";

const TeacherAssignedSections = () => {
  const {section, getSectionsByTeacher} = useSectionInfo();
  const [sections, setSections] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSections = async (page = 1) => {
    try {
      setLoading(true);
      const token = getStoredToken();
      const decodedToken = decryptToken(token);
      const teacherId = decodedToken.username;
      
      const response = await axios.get(`/api/teacher/sections`, {
        params: {
          teacherId,
          page,
          limit: 10
        }
      });

      setSections(response.data.sections);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (error) {
      console.error("Error getting sections by teacher:", error);
      setError("Failed to load sections. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchSections(page);
  };

  const handleRowClicked = (section) => {
    console.log('Section clicked:', section);
    // Add navigation or modal logic here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>Loading sections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-full text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <Header title="Your Sections" />
      </div>
      
      <SectionList 
        data={sections}
        onSectionClicked={handleRowClicked}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={10}
        className="mt-4"
      />
    </div>
  );
};

export default TeacherAssignedSections;