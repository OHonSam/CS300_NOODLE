// SectionsManagement.jsx
import React from 'react';
import Header from "../../../components/tab";
import SectionList from "../../../components/section/sectionlist";
import { useSectionsManagementInfo } from "../../../hooks/teacher/useSectionsManagementInfo";

const SectionsManagement = () => {
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
        data={sections || []}
        onSectionClicked={handleRowClicked}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        rowsPerPage={2}
        className="mt-4"
        userType="teacher"
      />
    </div>
  );
};

export default SectionsManagement;