import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Tab from "../../../components/tab";
import Table from "../../../components/table";
import { useAnnouncementInfo } from "../../../hooks/student/announcements/useAnnouncementInfo";
import AnnouncementDialog from "../../../components/dialog/StudentAnnouncementDialog";
import Toast from "../../../components/toast";

const Announcement = () => {
  const [announcementInfoDialogVisible, setAnnouncementInfoDialogVisible] = useState(false);
  const [currentAnnouncementDialog, setCurrentAnnouncementDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { announcements } = useAnnouncementInfo();

  const headings = [
    { id: 'title', label: 'Title' },
    { id: 'sender', label: 'Sender' },
    { id: 'status', label: 'Status' },
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
      <div className="relative mt-8 flex flex-col items-center justify-between w-full">
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
            onUpdate={(message, isAccepted) => setToast([message, isAccepted])}
            onDelete={(message, isAccepted) => setToast([message, isAccepted])}
            onClose={() => {
              setAnnouncementInfoDialogVisible(false);
            }}
          />
        }

        {toast.length > 0 && (
          <Toast
            message={toast[0]}
            onClick={() => setToast([])}
            className="m-auto top-6"
            isAccepted={toast[1]}
            Icon={
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Announcement;
