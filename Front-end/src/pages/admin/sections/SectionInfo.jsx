import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSectionInfo } from "../../../hooks/useSectionInfo";

const SectionInfoView = () => {
  const navigate = useNavigate();
  const { section, updateSection, deleteSection } = useSectionInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (section) {
      setFormData(section);
    }
  }, [section]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return
    }

    try {
      const success = await deleteSection();
      if (success) {
        navigate('/admin/sections');
      } else {
        setError('Failed to delete section');
      }
    } catch (error) {
      setError(error.message || 'Failed to delete section');
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      if (!window.confirm('Are you sure you want to update this section information?')) {
        return
      }
      const success = await updateSection(formData);
      if (success) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="flex space-x-4">
          <button 
            className="bg-red-500 hover:bg-red-600 font-bold text-white px-6 py-2 rounded-md w-64"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 font-bold text-white px-6 py-2 rounded-md w-64"
            onClick={handleEditClick}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionInfoView;