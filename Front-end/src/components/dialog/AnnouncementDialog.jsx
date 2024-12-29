import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6';
import { useAnnouncementInfo } from "../../hooks/admin/announcement/useAnnouncementInfo";
import { decryptToken, getStoredToken } from "../../services/auth/tokenService";

const AnnouncementDialog = ({ announcementData, isOpen, dialogFor, onCreate, onUpdate, onDelete, onClose }) => {
  const userData = getStoredToken();
  const decodedData = decryptToken(userData);
  const username = decodedData?.username
  const { addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncementInfo();
  const [formData, setFormData] = useState(announcementData ? announcementData : {
    announcementId: 1,
    title: '',
    content: '',
    attachment: null,
    sender: username ? username : '',
    status: '',
    createdAt: '',
    updatedAt: '',
  });

  const clearForm = () => {
    setFormData({
      announcementId: 1,
      title: '',
      content: '',
      attachment: null,
      sender: username ? username : '',
      status: '',
      createdAt: '',
      updatedAt: '',
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id !== 'announcementId' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit", formData);
    e.preventDefault();
    let errorMessage = null;
    if (dialogFor === 'create') {
      try {
        await addAnnouncement(formData);
      } catch (error) {
        errorMessage = error.message;
      }

      if (errorMessage) {
        onCreate(errorMessage, false);
      } else {
        onCreate('Announcement created successfully!', true);
        clearForm();
      }
    } else {
      try {
        await updateAnnouncement(formData);
      } catch (error) {
        errorMessage = error.message;
      }

      if (errorMessage) {
        onUpdate(errorMessage, false);
      } else {
        onUpdate('Announcement updated successfully!', true);
      }
    }

    if (!errorMessage) {
      handleClose(true);
    }
  };

  const handleDelete = () => {
    let message = null;
    try {
      console.log("delete announcement", formData.announcementId);
      deleteAnnouncement(formData.announcementId);
    } catch (error) {
      message = error.message;
    }

    if (message) {
      onDelete(message, false);
    } else {
      onDelete('Announcement deleted successfully!', true);
    }
    handleClose(true);
  };

  const handleClose = (updated) => {
    console.log("handleClose", updated);
    if (dialogFor === 'create') {
      clearForm();
      console.log("clear form");
    }
    else if (dialogFor === 'info' && !updated) {
      setFormData(announcementData);
      console.log("set form data", announcementData);
    }
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      className="absolute top-0 left-0 w-screen h-screen backdrop-blur-sm"
    >
      <DialogPanel className="absolute w-1/2 bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl">
        <div className="mt-4 mb-8 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">
            {dialogFor === 'create' ? 'Create new announcement' : 'Update announcement detail'}
          </h3>
          <button className="hover:text-gray-300" onClick={() => handleClose(false)}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gap-4 mb-6">
            <div className="w-full mb-6">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your title"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-6">
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">
                Content
              </label>
              <textarea
                id="content"
                className="bg-gray-50 h-24 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your description"
                required
                value={formData.content}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="sender" className="block mb-2 text-sm font-medium text-gray-900">
                Sender
              </label>
              <input
                type="text"
                id="sender"
                disabled={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Sender"
                value={formData.sender}
                onChange={handleChange}
              />
            </div>
          </div>
          {dialogFor === 'info' && (
            <div className="flex gap-10 mb-6">
              <div className="w-1/2">
                <label htmlFor="publishDateTime" className="block mb-2 text-sm font-medium text-gray-900">
                  Created At
                </label>
                <input
                  disabled
                  type="text"
                  readOnly
                  id="publishDateTime"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 text-gray-900"
                  value={formData.createdAt ? new Date(formData.createdAt).toLocaleString() : 'troll'}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastUpdateDateTime" className="block mb-2 text-sm font-medium text-gray-900">
                  Last Updated At 
                </label>
                <input
                  disabled
                  type="text"
                  readOnly
                  id="lastUpdateDateTime"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-900"
                  value={formData.updatedAt ? new Date(formData.updatedAt).toLocaleString() : 'troll'}
                />
              </div>
            </div>
          )}
          {dialogFor === 'info' ? (
            <div className="flex">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                className="text-white ms-2 bg-error-700 hover:bg-error-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Add
              </button>
              <button
                onClick={clearForm}
                className="text-white ms-2 bg-primary-700 hover:bg-primary-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                  w-full sm:w-auto px-5 py-2.5 text-center"
              >
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
