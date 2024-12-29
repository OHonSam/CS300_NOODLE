import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6';
import { useAnnouncementInfo } from "../../hooks/student/announcements/useAnnouncementInfo";
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
        <div className="mt-4 mb-1 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">
            {formData.title}
          </h3>
          <button className="hover:text-gray-300" onClick={() => handleClose(false)}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        <div className="border-gray-300 mb-6">
          <h2 className="text-1xl text-gray-500">
            {"By " + formData.sender + " at " + formData.createdAt}
          </h2>
          <h2 className="text-1xl text-gray-500">
            {"Last update at " + formData.updatedAt}
          </h2>
        </div>

        <div className="w-full mb-6">
          <textarea
            disabled={true}
            id="content"
            className="bg-gray-50 h-80 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your description"
            required
            value={formData.content}
            onChange={handleChange}
          />
        </div>

      </DialogPanel>
    </Dialog>
  );
};

export default AnnouncementDialog;
