import { Dialog, DialogPanel } from "@headlessui/react"
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6'

const MaterialDialog = ({ announcementData, isOpen, onCreate, onClose }) => {
  const [formData, setFormData] = useState(announcementData ? announcementData : {
    id: '',
    title: '',
    content: '',
    url: '',
  });

  const clearForm = () => {
    setFormData({
      id: '',
      title: '',
      content: '',
      url: '',
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
    onCreate(formData);
    clearForm();
    handleClose(true);
  };

  const handleDelete = () => {
    onDelete(formData);
    handleClose();
  };

  const handleClose = (updated) => {
    clearForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={() => handleClose(false)}
      className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
      <DialogPanel className={`absolute w-1/2 bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
        <div className="mt-4 mb-8 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Create new material</h3>
          <button className="hover:text-gray-300" onClick={() => handleClose(false)}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required
              value={formData.title}
              onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
            <textarea id="content" className="bg-gray-50 h-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Content" required
              value={formData.content}
              onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900">URL</label>
            <input type="text" id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="URL" required
              value={formData.url}
              onChange={handleChange} />
          </div>
          <div>
            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Add
            </button>
            <button onClick={clearForm}
              className="text-white ms-2 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Clear
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default MaterialDialog;
