import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Tab from "../../../components/tab";
import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";

const AdminAnnouncements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [announcements, setAnnouncements] = useState([
    {
      title: 'Final Exam',
      content: 'The final exam will cover all topics from chapters 1 to 10.',
      sender: 'ADM-001',
      status: 'Published',
      publishDate: '2024-12-24',
      updatedAt: '2024-12-23',
    },
    {
      title: 'Holiday Announcement',
      content: 'The university will be closed from December 25 to January 1.',
      sender: 'ADM-001',
      status: 'Published',
      publishDate: '2024-12-23',
      updatedAt: '2024-12-23',
    },
    {
      title: 'Midterm Results',
      content: 'Midterm results are now available on the student portal.',
      sender: 'ADM-001',
      status: 'Deleted',
      publishDate: '2024-12-22',
      updatedAt: '2024-12-22',
    },
    {
      title: 'New Semester Registration',
      content: 'Registration for the new semester begins January 2.',
      sender: 'ADM-001',
      status: 'Scheduled',
      publishDate: '2024-12-26',
      updatedAt: '2024-12-23',
    },
    {
      title: 'Library Closure',
      content: 'The library will be closed for maintenance on December 30.',
      sender: 'ADM-001',
      status: 'Draft',
      publishDate: '2024-12-30',
      updatedAt: '2024-12-20',
    },
    {
      title: 'Scholarship Application',
      content: 'Applications for scholarships are open until January 15.',
      sender: 'ADM-001',
      status: 'Published',
      publishDate: '2024-12-20',
      updatedAt: '2024-12-19',
    },
    {
      title: 'System Maintenance',
      content: 'The online portal will undergo maintenance from 12 AM to 6 AM on December 27.',
      sender: 'ADM-001',
      status: 'scheduled',
      publishDate: '2024-12-27',
      updatedAt: '2024-12-23',
    },
    {
      title: 'Student Feedback Survey',
      content: 'We value your feedback! Please complete the survey by January 5.',
      sender: 'ADM-001',
      status: 'Draft',
      publishDate: '2024-12-25',
      updatedAt: '2024-12-22',
    },
    {
      title: 'COVID-19 Guidelines Update',
      content: 'Please follow the latest guidelines available on our website.',
      sender: 'ADM-001',
      status: 'Published',
      publishDate: '2024-12-23',
      updatedAt: '2024-12-23',
    },
    {
      title: 'Graduation Ceremony',
      content: 'The graduation ceremony will take place on February 15.',
      sender: 'ADM-001',
      status: 'Scheduled',
      publishDate: '2024-12-31',
      updatedAt: '2024-12-23',
    },
  ]);

  const headings = [
    { id: 'title', label: 'Title' },
    { id: 'sender', label: 'Sender' },
    { id: 'status', label: 'Status' },
    { id: 'publishDate', label: 'Publish Date' },
    { id: 'updatedAt', label: 'Updated At' },
  ];
  
  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-start">
        <Tab title="Announcements"/>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 font-medium">
          <FiPlusCircle className="text-lg"/>
          <p>Add Announcement</p>
        </button>
      </div>
      <div className="relative mt-8 flex flex-col items-center justify-between w-full">
        <Table headings={headings} data={announcements} readOnly={false} rowsPerPage={10}>

        </Table>
        {totalPages > 1 && (
        <Pager 
          numberOfPages={totalPages}
          onPageChange={setCurrentPage}
          className="w-full flex justify-center mt-2"
        />
      )}
      </div>
    </div>
  );
};

export default AdminAnnouncements;