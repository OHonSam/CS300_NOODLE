import { Dialog, DialogPanel } from "@headlessui/react"
import { useState, useEffect } from "react";
import { FaXmark } from 'react-icons/fa6'
import { useTeacherInfo } from "../../hooks/admin/accounts/useTeacherInfo";

const SelectTeacherDialog = ({ isOpen, onSave, onClose }) => {
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { teachers } = useTeacherInfo();
  const { assignedTeachers, assignTeacherToSection, removeTeacherFromSection } = useSectionTeachers();

  // Initialize selected items with currently assigned teachers
  useEffect(() => {
    const assignedIds = new Set(assignedTeachers.map(teacher => teacher.teacherId));
    setSelectedItems(assignedIds);
  }, [assignedTeachers]);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.fullName.toLowerCase().includes(searchTeacher)
  );

  const handleSelection = (teacherId) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      if (newSelectedItems.has(teacherId)) {
        newSelectedItems.delete(teacherId); // Deselect if already selected
      } else {
        newSelectedItems.add(teacherId); // Select if not already selected
      }
      return newSelectedItems;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentAssignedIds = new Set(assignedTeachers.map(teacher => teacher.teacherId));
      const selectedIds = new Set(selectedItems); // Keep as Set instead of converting to Array

      // Teachers to remove (in current but not in selected)
      const toRemove = [...currentAssignedIds].filter(id => !selectedIds.has(id));
      
      // Teachers to add (in selected but not in current)
      const toAdd = [...selectedIds].filter(id => !currentAssignedIds.has(id));

      console.log(toRemove)
      console.log(toAdd)

      // Process removals
      for (const teacherId of toRemove) {
        await removeTeacherFromSection(teacherId);
      }

      // Process additions
      for (const teacherId of toAdd) {
        await assignTeacherToSection(teacherId);
      }

    } catch(error) {
      console.error('Error assigning teachers:', error);
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={() => handleClose(false)}
      className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
      <DialogPanel className={`absolute w-1/2 bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
        <div className="mt-4 mb-8 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Teacher Assignment</h3>
          <button className="hover:text-gray-300" onClick={() => handleClose(false)}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div id="dropdownSearch" className="z-10 bg-white rounded-lg shadow w-full mb-8 dark:bg-gray-700">
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                </div>
                <input onChange={(e) => setSearchTeacher(e.target.value.toLowerCase())} type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search teacher"/>
              </div>
            </div>
            <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
              {filteredTeachers.map((teacher, index) => {
                return (
                  <li key={index}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input id={`checkbox-item-${index}`} type="checkbox" value={teacher.teacherId} checked={selectedItems.has(teacher.teacherId)} onChange={() => handleSelection(teacher.teacherId)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                      <label htmlFor={`checkbox-item-${index}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{teacher.fullName}</label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Save
            </button>
            <button
              className="text-white ms-2 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Cancel
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default SelectTeacherDialog;
