import { AnnouncementInfoProvider } from "../../../context/admin/announcements/AnnouncementInfoContext";

const AnnouncementProvider = ({ children }) => {
  return (
    <AnnouncementInfoProvider>
      {children}
    </AnnouncementInfoProvider>
  );
};

export default AnnouncementProvider;
