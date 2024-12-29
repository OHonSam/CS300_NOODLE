import axios from "axios";

export const fetchAnnouncements = async () => {
    try {
        const response = await axios.get(
            `/api/admin/announcements?`
        );
        // sort by createdAt
        return response.data.announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
        console.error("Error fetching announcements:", error);
    }
};

export const addAnnouncement = async (newAnnouncement, announcements) => {
    try {
        const response = await axios.post("/api/admin/announcements", newAnnouncement);
        console.log("response", response);
        return [response.data, ...announcements];
    } catch (error) {
        console.error("Error adding announcement:", error);
        throw { message: error.response.data.message };
    }
};

export const updateAnnouncement = async (updatedAnnouncement, announcements) => {
    try {
        console.log("updatedAnnouncement1", updatedAnnouncement);
        const response = await axios.put(
            `/api/admin/announcements/${updatedAnnouncement.announcementId}`,
            updatedAnnouncement
        );
        return announcements.map((a) =>
            a.announcementId === updatedAnnouncement.announcementId ? response.data : a
        );
    } catch (error) {
        console.error("Error updating announcement:", error);
        return false;
    }
};

export const deleteAnnouncement = async (announcementId, announcements) => {
    try {
        await axios.delete(`/api/admin/announcements/${announcementId}`);
        return announcements.filter((a) => a.announcementId !== announcementId);
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return false;
    }
};
