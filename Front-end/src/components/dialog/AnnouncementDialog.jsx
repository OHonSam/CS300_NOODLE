import { Dialog, DialogPanel } from "@headlessui/react"
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6'

const AnnouncementDialog = ({ announcementData, isOpen, dialogFor, onCreate, onUpdate, onDelete, onClose }) => {
  const [datePickerPlaceHolder, setDatePickerPlaceholder] = useState(dialogFor === 'create');
  const [formData, setFormData] = useState(announcementData ? announcementData : {
    id: '',
    title: '',
    content: '',
    attachment: null,
    sender: '',
    status: '',
    publishDate: '',
    updatedAt: '',
  });

  const clearForm = () => {
    setDatePickerPlaceholder(true);
    setFormData({
      id: '',
      title: '',
      content: '',
      attachment: null,
      sender: '',
      status: '',
      publishDate: '',
      updatedAt: '',
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
      clearForm();
    } else {
      onUpdate(formData);
    }
    handleClose(true);
  };

  const handleDelete = () => {
    onDelete(formData);
    handleClose();
  };

  const handleClose = (updated) => {
    if (dialogFor === 'create') 
      clearForm();
    else if (dialogFor === 'info' && !updated) {
      setFormData(announcementData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={() => handleClose(false)} 
      className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
      <DialogPanel className={`absolute w-1/2 bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
        <div className="mt-4 mb-8 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">{dialogFor === 'create' ? 'Create new announcement' : 'Announcement Detail'}</h3>
          <button className="hover:text-gray-300" onClick={() => handleClose(false)}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Final Exam" required 
              value={formData.title}
              onChange={handleChange}/>
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
            <textarea id="content" className="bg-gray-50 h-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City" required 
              value={formData.content}
              onChange={handleChange}/>
          </div> 
          <div className="mb-6">
            <label htmlFor="publishDate" className="block mb-2 text-sm font-medium text-gray-900">Publish Date</label>
            <input type="date" id="publishDate" className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${datePickerPlaceHolder ? 'text-gray-400' : 'text-gray-900'}`} required 
              value={formData.publishDate}
              max='2028-01-01'
              min={new Date().toJSON().slice(0, 10)}
              onChange={(e) => {
                setDatePickerPlaceholder(false) 
                handleChange(e)
              }}/>
            </div>  
          {/* <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="attachment">Attachment</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="attachment" type="file" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF, DOC, XLSX (MAX. 20MB).</p>
          </div>   */}
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

export default AnnouncementDialog;