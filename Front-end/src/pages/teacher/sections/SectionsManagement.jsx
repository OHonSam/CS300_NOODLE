import Header from "../../../components/tab";
import SectionList from "../../../components/section/sectionlist";
import { useSectionsManagementInfo } from "../../../hooks/teacher/useSectionsManagementInfo";
import { useNavigate } from "react-router-dom";

const SectionsManagement = () => {
  const navigate = useNavigate();
  const {
    sections,
    currentPage,
    loading,
    error,
    setCurrentPage,
  } = useSectionsManagementInfo();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClicked = (section) => {
    console.log("Hello");
    navigate(`/teacher/sections/${section.schoolYear}/${section.semester}/${section.sectionId}`,
    {
      state:
      {
        sectionId: section.sectionId,
        courseName: section.courseName,
        schoolYear: section.schoolYear,
        semester: section.semester,
        capacity: section.capacity,
        courseCredit: section.courseCredit,
      }
    });
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
      <div className="flex justify-between items-center mb-4">
        <Header title="Your Sections" />
      </div>

      <SectionList
        data={sections || []}
        onClick={handleRowClicked}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        rowsPerPage={10}
        userType="teacher"
      />
    </div>
  );
};

export default SectionsManagement;
