import { useState, useEffect } from "react";
import { useSectionInfo } from "../../../hooks/useSectionInfo";

const SectionInfoView = () => {
  const { courseId, courseName, credits, schoolYear, semester, capacity } = useSectionInfo();
  const [localCourseId, setLocalCourseId] = useState(null);
  const [localCourseName, setLocalCourseName] = useState(null);
  const [localCredits, setLocalCredits] = useState(null);
  const [localSchoolYear, setLocalSchoolYear] = useState(null);
  const [localSemester, setLocalSemester] = useState(null);
  const [localCapacity, setLocalCapacity] = useState(null);

  const [isInitialised, setIsInitialised] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isInitialised && courseName) {
      setLocalCourseId(courseId);
      setLocalCourseName(courseName);
      setLocalCredits(credits);
      setLocalSchoolYear(schoolYear);
      setLocalSemester(semester);
      setLocalCapacity(capacity);
      setIsInitialised(true);
    }
  }, [courseId, courseName, credits, schoolYear, semester, capacity, isInitialised]);

  const handleDeleteClick = () => {

  }

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  }

  return (
    <div className="relative pt-4 flex flex-col overflow-y-auto h-full w-full">
      <div class="grid grid-cols-1 gap-4 w-full">
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">Course ID</span>
          <input
            type="text"
            class="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter value"
            disabled={!isEditing}
            value={localCourseId}
            onChange={(e) => setLocalCourseId(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">Course Name</span>
          <input
            type="text"
            class="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter value"
            disabled={!isEditing}
            value={localCourseName}
            onChange={(e) => setLocalCourseName(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">Credits</span>
          <input
            type="text"
            class="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter value"
            disabled={!isEditing}
            value={localCredits}
            onChange={(e) => setLocalCredits(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">School Year</span>
          <input
            type="text"
            class="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter value"
            disabled={!isEditing}
            value={localSchoolYear}
            onChange={(e) => setLocalSchoolYear(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">Semster</span>
          <input
            type="text"
            class="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter value"
            disabled={!isEditing}
            value={localSemester}
            onChange={(e) => setLocalSemester(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">Capacity</span>
          <input
            type="text"
            class="border border-gray-300 disabled:opacity-50 rounded-md p-2 w-4/5"
            placeholder="Enter value"
            disabled={!isEditing}
            value={localCapacity}
            onChange={(e) => setLocalCapacity(e.target.value)}
          />
        </div>
      </div>
      <div class="flex justify-center items-center mt-4">
        <div class="flex space-x-4">
          <button class="bg-red-500 hover:bg-red-600 font-bold text-white px-6 py-2 rounded-md w-64" onClick={handleDeleteClick}>
            Delete
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 font-bold text-white px-6 py-2 rounded-md w-64" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionInfoView;