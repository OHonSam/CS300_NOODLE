import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Tab from "../../../components/tab";
import Table from "../../../components/table";
import { useAnnouncementInfo } from "../../../hooks/admin/announcement/useAnnouncementInfo";
import AnnouncementDialog from "../../../components/dialog/AnnouncementDialog";
import { useToast } from "../../../hooks/useToast";

const Announcement = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [announcementInfoDialogVisible, setAnnouncementInfoDialogVisible] = useState(false);
  const [announcementCreateDialogVisible, setAnnouncementCreateDialogVisible] = useState(false);
  const [currentAnnouncementDialog, setCurrentAnnouncementDialog] = useState(null);
  const { addToast } = useToast();
  const { announcements } = useAnnouncementInfo();

  const headings = [
    { id: 'announcementId', label: 'ID' },
    { id: 'title', label: 'Title' },
    { id: 'sender', label: 'Sender' },
    { id: 'status', label: 'Status' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'updatedAt', label: 'Updated At' },
  ];

  const handleRowClicked = (row) => {
    setCurrentAnnouncementDialog(row);
    setAnnouncementInfoDialogVisible(true);
    setAnnouncementCreateDialogVisible(false);
  };

  return (
    <div className="relative flex flex-col overflow-y-auto p-8 bg-gray-100 w-full h-full">
      <div className="flex justify-between items-start">
        <Tab title="Announcements" />
        <button
          onClick={() => {
            setAnnouncementCreateDialogVisible(true);
            setAnnouncementInfoDialogVisible(false);
          }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 font-medium"
        >
          <FiPlusCircle className="text-lg" />
          <p>Add Announcement</p>
        </button>
      </div>
      <div className="relative mt-8 flex flex-col items-center justify-between w-full">
        <Table
          headings={headings}
          data={announcements}
          readOnly={false}
          rowsPerPage={10}
          onRowClicked={handleRowClicked}
        />

        {
          announcementInfoDialogVisible && <AnnouncementDialog
            dialogFor="info"
            announcementData={currentAnnouncementDialog}
            isOpen={announcementInfoDialogVisible}
            onUpdate={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
            onDelete={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
            onClose={() => {
              setAnnouncementInfoDialogVisible(false);
              setAnnouncementCreateDialogVisible(false);
            }}
          />
        }

        {
          announcementCreateDialogVisible && <AnnouncementDialog
            dialogFor="create"
            isOpen={announcementCreateDialogVisible}
            onCreate={(message, isAccepted) => addToast(isAccepted ? 'success' : 'error', message)}
            onClose={() => {
              setAnnouncementCreateDialogVisible(false)
              setAnnouncementInfoDialogVisible(false);
            }}
          />
        }

        {totalPages > 1 && (
          <Table
            headings={headings}
            data={announcements}
            readOnly={false}
            rowsPerPage={10}
            onRowClicked={handleRowClicked}
            className={"pt-4"}
          />
        )}
      </div>
    </div>
  );
};

export default Announcement;
