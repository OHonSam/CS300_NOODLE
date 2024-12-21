import Header from "../../../components/tab";
import SectionList from "../../../components/section/sectionlist";

const TeacherAssignedSections = () => {
  const data = Array.from({ length: 100 }, (_, index) => {
    return {
      sectionId: `CS${Math.random().toString().slice(2, 5)}`,
      sectionName: `Computer Science ${index + 1}`,
      teachersName: Array.from({ length: Math.floor(Math.random() * 4 + 1) }, (_, index) => `Teacher ${index + 1}`),
      credits: Math.random() > 0.5 ? undefined : Math.floor(Math.random() * 4 + 1),
      year: Math.random() > 0.5 ? undefined : 2020 + Math.floor(Math.random() * 4 + 1),
      semester: Math.random() > 0.5 ? undefined : Math.floor(Math.random() * 2 + 1),
      noOfStudents: Math.random() > 0.5 ? undefined : Math.floor(Math.random() * 50 + 10),
      gpa: Math.random() > 0.5 ? undefined : Math.random() * 10,
      noOfFails: Math.random() > 0.5 ? undefined : Math.floor(Math.random() * 10),
    }
  });

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClicked = (row) => {
    console.log(row);
  };


  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-center">
        <Header title="Assigned Sections" />
      </div>
      <SectionList data={data} onSectionClicked={handleRowClicked} onPageChange={handlePageChange} rowsPerPage={10} className="mt-4" />
    </div>
  );
};

export default TeacherAssignedSections;