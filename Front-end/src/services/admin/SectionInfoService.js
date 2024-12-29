import axios from "axios";

export const fetchSection = async (schoolYear, semester, sectionId) => {
    try {
      const response = await axios.get(`/api/admin/section/${schoolYear}/${semester}/${sectionId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching section:", error);
    }
};

export const updateSection = async (updatedSection, schoolYear, semester, sectionId) => {
    try {
        const response = await axios.put(
            `/api/admin/sections/${schoolYear}/${semester}/${sectionId}`,
            updatedSection
        );
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error updating section:", error.response);
        throw {
            message: error.response.data.message,
        };
    }
};

export const deleteSection = async (deletedSection) => {
    try {
        await axios.delete(`/api/admin/sections/${deletedSection.schoolYear}/${deletedSection.semester}/${deletedSection.sectionId}`);
        return true;
    } catch (error) {
        console.error("Error deleting section:", error);
        return false;
    }
};

export const fetchMaterials = async (schoolYear, semester, sectionId) => {
    try {
        const response = await axios.get(`/api/material/${schoolYear}/${semester}/${sectionId}`);
        return response.data.materials;
    } catch (error) {
        console.error("Error fetching material:", error);
        throw{ message: error.response.data.message};
    } 
};

export const fetchAssignedTeachers = async (schoolYear, semester, sectionId) => {
    try {
        const response = await axios.get(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/assignedTeachers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw{ message: error.response.data.message};
    }
};

export const removeTeacherFromSection = async (currentAssignedTeachers, teacherId, schoolYear, semester, sectionId) => {
    try {
        await axios.delete(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/removeAssigned/${teacherId}`);
        return currentAssignedTeachers.filter((teacher) => teacher.teacherId !== teacherId);
    } catch (error) {
        console.error("Error removing teacher from section:", error);
        throw { message: error.response.data.message };
    }
}