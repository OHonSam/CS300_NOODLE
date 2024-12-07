import { Dialog, DialogPanel } from "@headlessui/react"
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6'

const StudentCreationDialog = ({ isOpen, onSubmit, onClose, className }) => {
  const [selectPlaceHolder, setSelectPlaceHolder] = useState(true);
  const [datePickerPlaceHolder, setDatePickerPlaceholder] = useState(true);
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    gender: 'default',
    dob: '',
    class: '',
    phone: '',
    address: '',
    email: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setSelectPlaceHolder(true);
    setDatePickerPlaceholder(true);
    setFormData({
      studentId: '',
      fullName: '',
      gender: 'default',
      dob: '',
      class: '',
      phone: '',
      address: '',
      email: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} 
      className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
      <DialogPanel className={`absolute m-auto bg-white px-10 py-8 z-50 focus:outline-none shadow-lg ${className} rounded-xl`}>
        <div className="mt-4 mb-8 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Add a student</h3>
          <button className="hover:text-gray-300" onClick={handleClose}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900">Student ID</label>
              <input type="text" id="studentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="22125009" required 
                value={formData.studentId}
                onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Full name</label>
              <input type="text" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required 
                value={formData.fullName}
                onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
              <select id="gender" value={formData.gender} className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${selectPlaceHolder ? 'text-gray-400' : 'text-gray-900'}`} required
                onChange={(e) => {
                  setSelectPlaceHolder(false);
                  handleChange(e);
                }}
              >
                <option disabled value="default">Choose a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
              <input type="date" id="dob" className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${datePickerPlaceHolder ? 'text-gray-400' : 'text-gray-900'}`} required 
                value={formData.dob}
                onChange={(e) => {
                  setDatePickerPlaceholder(false) 
                  handleChange(e)
                }}/>
            </div>
            <div>
              <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900">Class</label>
              <input type="text" id="class" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="22TT2" required 
                value={formData.class}
                onChange={handleChange}/>
            </div>  
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
              <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required 
                value={formData.phone}
                onChange={handleChange}/>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Home address</label>
            <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City" required 
              value={formData.address}
              onChange={handleChange}/>
          </div> 
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required 
              value={formData.email}
              onChange={handleChange}/>
          </div>  
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default StudentCreationDialog;