import SectionsProvider from "./provider";
import React from 'react';
import Header from "../../../components/tab";
import SectionList from "../../../components/section/sectionlist";
import { useSectionsManagementInfo } from "../../../hooks/student/useSectionsManagementInfo";

const StudentSections = () => {
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

  const handleRowClicked = (row) => {
    // navigate(`/student/sections/${row.schoolYear}/${row.semester}/${row.sectionId}`,
    //   {
    //     state:
    //     {
    //       sectionId: row.sectionId,
    //       courseName: row.courseName,
    //       schoolYear: row.schoolYear,
    //       semester: row.semester,
    //       capacity: row.capacity,
    //       courseCredit: row.courseCredit,
    //     }
    //   });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full bg-gray-100">
        <p>Loading sections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-full text-red-500 bg-gray-100">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <SectionsProvider>
      <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
        <div className="flex justify-between items-center">
          <Header title="Your Sections" />
        </div>

        <SectionList
          data={sections || []}
          onSectionClicked={handleRowClicked}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          rowsPerPage={10}
          className="mt-4"
          userType="student"
        />
      </div>
    </SectionsProvider>
  );
}

export default StudentSections;
