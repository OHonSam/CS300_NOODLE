import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { fetchSection, deleteSection, updateSection } from "../../../services/SectionInfoService";

const SectionInfoView = ({ schoolYear, semester, sectionId }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { addToast } = useToast();

  const fetchSectionData = async () => {
    try {
      const data = await fetchSection(schoolYear, semester, sectionId);
      setFormData(data)
    } catch (error) {
      addToast('error', error.message || 'Failed to fetch section data');
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, []);

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
      const success = await deleteSection(formData);
      if (success) {
        navigate('/admin/sections');
        addToast('success', 'Section deleted successfully!');
      } else {
        setError('Failed to delete section');
        addToast('error', 'Failed to delete section');
      }
    } catch (error) {
      setError(error.message || 'Failed to delete section');
      addToast('error', 'Failed to delete section');
    }
  };

  const handleEditClick = async () => {
    console.log("In edit click");
    if (isEditing) {
      if (!window.confirm('Are you sure you want to update this section information?')) {
        return;
      }

      let message = null
      try {
        const _ = await updateSection(formData, schoolYear, semester, sectionId);
        navigate(`/admin/sections/${formData.schoolYear}/${formData.semester}/${formData.sectionId}`, {
          state: {
            sectionId: formData.sectionId,
            courseName: formData.courseName,
            semester: formData.semester,
            schoolYear: formData.schoolYear
          }
        });
      } catch (error) {
        message = error.message || 'Error editing section';
      }

      if (message) {
        addToast('error', message);
      } else {
        setIsEditing(false);
        addToast('success', 'Section edited successfully!');
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="relative pt-4 flex flex-col overflow-y-auto h-full w-full">
      <form onSubmit={(e) => {
        console.log("In submit");
        e.preventDefault();
        handleEditClick();
      }}>
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
              required
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Credits</span>
            <input
              type="number"
              id="courseCredit"
              min="1"
              className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
              placeholder="Enter Credits"
              disabled={!isEditing}
              value={formData.courseCredit}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Semester</span>
            <select
              id="semester"
              className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
              disabled={!isEditing}
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Capacity</span>
            <input
              type="number"
              min="1"
              id="capacity"
              className="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
              placeholder="Enter Capacity"
              disabled={!isEditing}
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <div className="flex space-x-4">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 font-bold text-white px-6 py-2 rounded-md w-64"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
            <div>
              <button
                hidden={isEditing}
                type={"button"}
                className="bg-blue-600 hover:bg-blue-700 font-bold text-white px-6 py-2 rounded-md w-64"
                onClick={() => {
                  setIsEditing(true);
                  console.log("change to editing");
                }}
              >
                Edit
              </button>
              <button
                hidden={!isEditing}
                type={"submit"}
                className="bg-blue-600 hover:bg-blue-700 font-bold text-white px-6 py-2 rounded-md w-64"
                onClick={() => { }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SectionInfoView;
