import { AnnouncementInfoProvider } from "../../../context/student/announcements/AnnouncementInfoContext";

const AnnouncementProvider = ({ children }) => {
  return (
    <AnnouncementInfoProvider>
      {children}
    </AnnouncementInfoProvider>
  );
};

export default AnnouncementProvider;
