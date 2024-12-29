import { useState, useEffect } from "react";
import axios from "../../../axios.config";

import { AnnouncementInfoContext } from "../../../hooks/student/announcements/useAnnouncementInfo";

export const AnnouncementInfoProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `/api/admin/announcements?`
        );
        setAnnouncements(response.data.announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <AnnouncementInfoContext.Provider
      value={{
        announcements,
      }}>
      {children}
    </AnnouncementInfoContext.Provider>
  );
};

export default AnnouncementInfoProvider;
