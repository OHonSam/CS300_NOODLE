import { Dialog, DialogPanel } from "@headlessui/react"
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6'
import { useAdminInfo } from "../../hooks/useAdminInfo";

const AdminInfoDialog = ({ adminData, isOpen, dialogFor, onCreate, onUpdate, onDelete, onClose }) => {
  const [selectPlaceHolder, setSelectPlaceHolder] = useState(dialogFor === 'create');
  const [datePickerPlaceHolder, setDatePickerPlaceholder] = useState(dialogFor === 'create');
  const { addAdmin, updateAdmin, deleteAdmin } = useAdminInfo();
  const [formData, setFormData] = useState(adminData ? adminData : {
    adminId: '',
    fullName: '',
    gender: 'default',
    dob: '',
    phone: '',
    address: '',
    email: '',
  });

  const resetForm = () => {
    setSelectPlaceHolder(true);
    setDatePickerPlaceholder(true);
    setFormData({
      adminId: '',
      fullName: '',
      gender: 'default',
      dob: '',
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
    if (dialogFor === 'create') {
      onCreate(formData);
      addAdmin(formData);
    } else {
      onUpdate(formData);
      updateAdmin(formData);
    }
    handleClose();
  };

  const handleDelete = () => {
    onDelete(formData);
    deleteAdmin(formData.adminId);
    handleClose();
  };

  const handleClose = () => {
    if (dialogFor === 'create') 
      resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} 
      className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
      <DialogPanel className={`absolute w-1/2 bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
        <div className="mt-4 mb-8 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Add an administrator</h3>
          <button className="hover:text-gray-300" onClick={handleClose}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="adminId" className="block mb-2 text-sm font-medium text-gray-900">Admin ID</label>
              <input type="text" id="adminId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="22125009" required 
                value={formData.adminId}
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
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
              <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required 
                value={formData.phone}
                onChange={handleChange}/>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Full name</label>
            <input type="text" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required 
              value={formData.fullName}
              onChange={handleChange}/>
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
              <button onClick={resetForm}
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

export default AdminInfoDialog;