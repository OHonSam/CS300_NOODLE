import { Dialog, DialogPanel } from "@headlessui/react"
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6'

const SectionInfoDialog = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        sectionId: '',
        courseName: '',
        courseCredit: '',
        schoolYear: '',
        semester: '1',
        capacity: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [id]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        onCreate(formData);
        handleClose();
      };
    
    const clearForm = () => {
    setFormData({
        sectionId: '',
        courseName: '',
        courseCredit: '',
        schoolYear: '',
        semester: '1',
        capacity: '',
    });
    };
    
    const handleClose = () => {
        clearForm();
        onClose();
      };
    
    return (
    <Dialog open={isOpen} onClose={handleClose} 
        className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
        <DialogPanel className={`absolute w-[600px] bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
        <div className="mt-4 mb-8 flex items-center justify-between">
            <h3 className="font-semibold text-2xl">Create New Section</h3>
            <button className="hover:text-gray-300" onClick={handleClose}>
            <FaXmark className="text-xl" />
            </button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label htmlFor="sectionId" className="block mb-2 text-sm font-medium text-gray-900">Section ID</label>
                <input type="text" id="sectionId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="CSC10001" required
                value={formData.sectionId}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="courseCredit" className="block mb-2 text-sm font-medium text-gray-900">Credits</label>
                <input type="number" id="courseCredit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min="1" max="4" required
                value={formData.courseCredit}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900">Semester</label>
                <select id="semester" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required
                value={formData.semester}
                onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                </select>
            </div>
            <div>
                <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900">Max Students</label>
                <input type="number" id="capacity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min="1" required
                value={formData.capacity}
                onChange={handleChange}/>
            </div>
            </div>
            <div className="mb-6">
            <label htmlFor="courseName" className="block mb-2 text-sm font-medium text-gray-900">Course Name</label>
            <input type="text" id="courseName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Programming Fundamentals" required
                value={formData.courseName}
                onChange={handleChange}/>
            </div>
            <div className="mb-6">
            <label htmlFor="schoolYear" className="block mb-2 text-sm font-medium text-gray-900">School Year</label>
            <input type="text" id="schoolYear" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="2023-2024" required
                value={formData.schoolYear}
                onChange={handleChange}/>
            </div>
            <div className="flex gap-2">
            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Create
            </button>
            <button type="button" onClick={clearForm}
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Clear
            </button>
            </div>
        </form>
        </DialogPanel>
    </Dialog>
    );
};
    
export default SectionInfoDialog;