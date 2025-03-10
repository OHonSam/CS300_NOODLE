import { Dialog, DialogPanel } from "@headlessui/react"
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6'
import { useTeacherInfo } from "../../hooks/admin/accounts/useTeacherInfo";

const TeacherInfoDialog = ({ teacherData, isOpen, dialogFor, onCreate, onUpdate, onDelete, onClose }) => {
  const [selectPlaceHolder, setSelectPlaceHolder] = useState(dialogFor === 'create');
  const [datePickerPlaceHolder, setDatePickerPlaceholder] = useState(dialogFor === 'create');
  const { addTeacher, updateTeacher, deleteTeacher } = useTeacherInfo();
  const [formData, setFormData] = useState(teacherData ? teacherData : {
    teacherId: '',
    fullName: '',
    gender: 'default',
    dob: '',
    department: '',
    phone: '',
    address: '',
    email: '',
  });

  const clearForm = () => {
    setSelectPlaceHolder(true);
    setDatePickerPlaceholder(true);
    setFormData({
      teacherId: '',
      fullName: '',
      gender: 'default',
      dob: '',
      department: '',
      phone: '',
      address: '',
      email: '',
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = null;
    if (dialogFor === 'create') {
      try {
        await addTeacher(formData);
      } catch (error) {
        message = error.message;
      }

      if (message) {
        onCreate(message, false);
      } else {
        onCreate('Teacher created successfully!', true);
        clearForm();
      }
    } else {
      onUpdate(formData);
      updateTeacher(formData);
    }
    handleClose(true);
  };

  const handleDelete = () => {
    onDelete(formData);
    deleteTeacher(formData.teacherId);
    handleClose();
  };

  const handleClose = (updated) => {
    if (dialogFor === 'create')
      clearForm();
    else if (dialogFor === 'info' && !updated) {
      setFormData(teacherData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={() => handleClose(false)}
      className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
      <DialogPanel className={`absolute w-1/2 bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
        <div className="mt-4 mb-8 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">{dialogFor === 'create' ? 'Add a Teacher' : 'Teacher Info'}</h3>
          <button className="hover:text-gray-300" onClick={() => handleClose(false)}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="teacherId" className="block mb-2 text-sm font-medium text-gray-900">Teacher ID</label>
              <input type="text" id="teacherId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:text-gray-300" placeholder="22125009" required
                value={formData.teacherId}
                disabled={dialogFor === 'info'}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Full name</label>
              <input type="text" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required
                value={formData.fullName}
                onChange={handleChange} />
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
                max='2024-01-01'
                min='1940-01-01'
                onChange={(e) => {
                  setDatePickerPlaceholder(false)
                  handleChange(e)
                }} />
            </div>
            <div>
              <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Department</label>
              <input type="text" id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Information Technology" required
                value={formData.department}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
              <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0909909909" pattern="[0-9]{10}" required
                value={formData.phone}
                onChange={handleChange} />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Home address</label>
            <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City" required
              value={formData.address}
              onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required
              value={formData.email}
              onChange={handleChange} />
          </div>
          {dialogFor === 'info' ? (
            <div className="flex">
              <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Save
              </button>
              <button onClick={handleDelete}
                className="text-white ms-2 bg-error-700 hover:bg-error-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Add
              </button>
              <button onClick={clearForm}
                className="text-white ms-2 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Clear
              </button>
            </div>
          )}
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default TeacherInfoDialog;
