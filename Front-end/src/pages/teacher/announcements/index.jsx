import { useState, useEffect } from "react";
import Tab from "../../../components/tab";
import Table from "../../../components/table";
import AnnouncementDialog from "../../../components/dialog/StudentAnnouncementDialog";
import { fetchAnnouncements } from "../../../services/AnnouncementService";
import { useToast } from "../../../hooks/useToast";

const TeacherAnnouncements = () => {
  const [announcementInfoDialogVisible, setAnnouncementInfoDialogVisible] = useState(false);
  const [currentAnnouncementDialog, setCurrentAnnouncementDialog] = useState(null);
  const { addToast } = useToast();
  const [announcements, setAnnouncments] = useState([]);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncments(data);
      } catch (error) {
        addToast('error', error.message || 'Failed to fetch announcements');
      }
    };

    fetchAnnouncementData();
  }, []);

  const headings = [
    { id: 'title', label: 'Title' },
    { id: 'sender', label: 'Sender' },
    // { id: 'status', label: 'Status' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'updatedAt', label: 'Updated At' },
  ];

  const handleRowClicked = (row) => {
    setCurrentAnnouncementDialog(row);
    setAnnouncementInfoDialogVisible(true);
  };

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-start">
        <Tab title="Announcements" />
      </div>
      <div className="relative flex flex-col items-center justify-between w-full pt-4">
        <Table
          headings={headings}
          data={announcements}
          readOnly={true}
          rowsPerPage={10}
          onRowClicked={handleRowClicked}
        />

        {
          announcementInfoDialogVisible && <AnnouncementDialog
            dialogFor="info"
            announcementData={currentAnnouncementDialog}
            isOpen={announcementInfoDialogVisible}
            onClose={() => {
              setAnnouncementInfoDialogVisible(false);
            }}
          />
        }
      </div>
    </div>
  );
};

export default TeacherAnnouncements;
