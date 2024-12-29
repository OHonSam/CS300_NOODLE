import AnnouncementProvider from "./provider";
import Announcement from "./Announcement";

const AnnouncementLayout = () => {
  return (
    <AnnouncementProvider>
      <Announcement />
    </AnnouncementProvider>
  );
};

export default AnnouncementLayout;
