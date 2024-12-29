import { useState, useEffect } from "react";
import axios from "../../../axios.config";

import { AnnouncementInfoContext } from "../../../hooks/useAnnouncementInfo";

export const AnnouncementInfoProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `/api/admin/announcements?`
        );
        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const addAnnouncement = async (newAnnouncement) => {
    try {
      const response = await axios.post("/api/admin/announcements", newAnnouncement);
      console.log("response", response);
      setAnnouncements((prev) => [...prev, response.data]);
      return true;
    } catch (error) {
      console.error("Error adding announcement:", error);
      throw { message: error.response.data.message };
    }
  };

  const updateAnnouncement = async (updatedAnnouncement) => {
    try {
      console.log("updatedAnnouncement1", updatedAnnouncement);
      const response = await axios.put(
        `/api/admin/announcements/${updatedAnnouncement.announcementId}`,
        updatedAnnouncement
      );
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.announcementId === updatedAnnouncement.announcementId ? response.data : a
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating announcement:", error);
      return false;
    }
  };

  const deleteAnnouncement = async (announcementId) => {
    try {
      await axios.delete(`/api/admin/announcements/${announcementId}`);
      setAnnouncements((prev) => prev.filter((a) => a.announcementId !== announcementId));
      return true;
    } catch (error) {
      console.error("Error deleting announcement:", error);
      return false;
    }
  };

  return (
    <AnnouncementInfoContext.Provider
      value={{
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
      }}
    >
      {children}
    </AnnouncementInfoContext.Provider>
  );
};

export default AnnouncementInfoProvider;
