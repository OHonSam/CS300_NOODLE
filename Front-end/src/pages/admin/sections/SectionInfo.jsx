import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSectionInfo } from "../../../hooks/sections/useSectionInfo";
import Toast from "../../../components/toast";

const SectionInfoView = () => {
  const navigate = useNavigate();
  const { section, updateSection, deleteSection } = useSectionInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState([]);

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
        // TODO: toast didn't work here as the toast was destroyed when the page navigated away
        setToast(['Section deleted successfully!', true]);
      } else {
        setError('Failed to delete section');
        setToast(['Failed to delete section', false]);
      }
    } catch (error) {
      setError(error.message || 'Failed to delete section');
      setToast(['Failed to delete section', false]);
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      if (!window.confirm('Are you sure you want to update this section information?')) {
        return
      }

      let message = null
      try {
        const _ = await updateSection(formData);
      } catch (error) {
        message = error.message || 'Error editing section';
      }

      if (message) {
        setToast([message, false]);
      } else {
        setIsEditing(false);
        setToast(['Section edited successfully!', true]);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="relative pt-4 flex flex-col overflow-y-auto h-full w-full">
      {toast.length > 0 && <Toast message={toast[0]} isAccepted={toast[1]} onClick={() => setToast([])} className={'m-auto top-6'} Icon={
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      } />}
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
