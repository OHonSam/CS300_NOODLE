import { Dialog, DialogPanel } from "@headlessui/react"
import { FaXmark } from 'react-icons/fa6'
import { useEffect, useState } from 'react'

const SectionTeacherInfoDialog = ({ teacherData, isOpen, onRemove, onClose }) => {
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

    useEffect(() => {
        if (teacherData) {
            setFormData(teacherData);
        }
    }, [teacherData]);

    const handleRemove = () => {
        onRemove(teacherData);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}
            className={`absolute top-0 left-0 w-screen h-screen backdrop-blur-sm`}>
            <DialogPanel className={`absolute w-1/2 bg-white px-10 py-8 z-50 focus:outline-none shadow-lg -inset-12 m-auto max-h-max rounded-xl`}>
                <div className="mt-4 mb-8 flex items-center justify-between">
                    <h3 className="font-semibold text-2xl">Teacher Info</h3>
                    <button className="hover:text-gray-300" onClick={handleClose}>
                        <FaXmark className="text-xl" />
                    </button>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Teacher ID</label>
                        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                            {formData.teacherId}
                        </p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Full name</label>
                        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                            {formData.fullName}
                        </p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 capitalize">
                            {formData.gender === 'default' ? '' : formData.gender}
                        </p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
                        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                            {formData.dob}
                        </p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Department</label>
                        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                            {formData.department}
                        </p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
                        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                            {formData.phone}
                        </p>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Home address</label>
                    <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                        {formData.address}
                    </p>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                    <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                        {formData.email}
                    </p>
                </div>
                <div className="flex">
                    <button onClick={handleRemove}
                        className="text-white bg-error-700 hover:bg-error-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Remove
                    </button>
                </div>
            </DialogPanel>
        </Dialog>
    );
};

export default SectionTeacherInfoDialog;