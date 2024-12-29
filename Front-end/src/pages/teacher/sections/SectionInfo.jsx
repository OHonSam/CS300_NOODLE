import { useState, useEffect } from "react";
import { fetchSection } from "../../../services/SectionInfoService";

const SectionInfoView = ({schoolYear, semester, sectionId}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchSectionData = async () => {
      const data = await fetchSection(schoolYear, semester, sectionId);
      setFormData(data)
    }

    fetchSectionData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="relative pt-4 flex flex-col overflow-y-auto h-full w-full">
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Course ID</span>
          <input
            type="text"
            id="sectionId"
            className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter Course ID"
            disabled
            value={formData.sectionId}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Course Name</span>
          <input
            type="text"
            id="courseName"
            className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter Course Name"
            disabled
            value={formData.courseName}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Credits</span>
          <input
            type="number"
            id="courseCredit"
            className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter Credits"
            disabled
            value={formData.courseCredit}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">School Year</span>
          <input
            type="text"
            id="schoolYear"
            className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter School Year"
            disabled
            value={formData.schoolYear}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Semester</span>
          <input
            type="number"
            id="semester"
            className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter Semester"
            disabled
            value={formData.semester}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Capacity</span>
          <input
            type="number"
            id="capacity"
            className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter Capacity"
            disabled
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionInfoView;
