import { Dialog, DialogBackdrop } from "@headlessui/react"
import { useState } from "react";
import { FaXmark } from 'react-icons/fa6'
import { useAdminInfo } from "../../hooks/admin/accounts/useAdminInfo";

const FileUploadDialog = ({ heading, isOpen, onClose, onSubmit, fileFormat }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { addAdminFromFile } = useAdminInfo();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setIsLoading(true);
      try {
        const message = await addAdminFromFile(file);
        handleClose();
        onSubmit(message, true);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Error: No file found. Please try again.')
    }
  };

  const handleClose = () => {
    setFile(null);
    setErrorMessage(null);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}
      className={'absolute top-0 left-0 w-screen h-screen backdrop-blur-sm'}>
      <DialogBackdrop className={`absolute w-[700px] bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-2xl">{heading}</h3>
          <button className="hover:text-gray-300" onClick={handleClose} disabled={isLoading}>
            <FaXmark className="text-xl" />
          </button>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h4 className="text-xl font-semibold">Please wait while adding data...</h4>
            <div className="loader"></div> {/* Add your loader component or CSS here */}
          </div>
        ) :
        (<form onSubmit={handleSubmit} className="flex flex-col justify-center w-full space-y-6">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">{file ? `Uploaded File: ${file.name}` : `Allowed Format: ${fileFormat.join(', ')}`}</p>
              {errorMessage && <p className="mt-2 text-xs text-center text-error-500">{errorMessage}</p>}
            </div>
            <input id="dropzone-file" onChange={handleFileChange} type="file" accept={fileFormat.join()} className="hidden"/>
          </label>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add</button>
        </form>)} 
      </DialogBackdrop>
    </Dialog>
  );
};

export default FileUploadDialog