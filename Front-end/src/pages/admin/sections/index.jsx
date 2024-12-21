import Header from "../../../components/tab";
import Table from "../../../components/table";

const AdminManageSections = () => {
  const headings = [
    { id: 'sectionId', label: 'Section ID' },
    { id: 'sectionName', label: 'Course name' },
    { id: 'credits', label: 'Credits' },
    { id: 'year', label: 'Year' },
    { id: 'semester', label: 'Semester' },
    { id: 'maxStudents', label: 'Max Students' },
    { id: 'noOfStudents', label: 'No. of Students' },
  ];

  const data = Array.from({ length: 100 }, (_, index) => {
    const maxStudents = Math.floor(Math.random() * 50 + 10);
    return {
      sectionId: index + 1,
      sectionName: `Section ${index + 1}`,
      credits: Math.floor(Math.random() * 4 + 1),
      year: 2020 + Math.floor(Math.random() * 4 + 1),
      semester: Math.floor(Math.random() * 2 + 1),
      maxStudents: maxStudents,
      noOfStudents: Math.floor(Math.random() * maxStudents),
    }
  });

  const handleRowClicked = (row) => {
    console.log(row);
  };

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-center">
        <Header title="Sections" />
        <button className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 font-bold">Create section</button>
      </div>
      <Table headings={headings} onRowClicked={handleRowClicked} data={data} readOnly={false} rowsPerPage={20} className={"pt-4"} />
    </div>
  );
};

export default AdminManageSections;