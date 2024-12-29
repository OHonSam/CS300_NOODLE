// import { useMemo } from "react";
import { createContext, useContext } from "react";


const initialAnnouncementContext = {
	announcements: []
};

export const AnnouncementInfoContext = createContext(initialAnnouncementContext);

export const useAnnouncementInfo = () => {
	const context = useContext(AnnouncementInfoContext);
	if (!context) {
		throw new Error('useAnnouncementInfo must be used within AnnouncementProvider');
	}
	return context;
}
