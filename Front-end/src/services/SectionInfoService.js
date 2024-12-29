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
        console.log(response.data.materials);
        return response.data.materials;
    } catch (error) {
        console.error("Error fetching material:", error);
        throw { message: error.response?.data?.message || 'Failed to fetch materials' };
    } 
};

export const addMaterial = async (materialData) => {
    try {
        const response = await axios.post('/api/material/material', materialData);
        return response.data;
    } catch (error) {
        console.error("Error adding material:", error);
        throw { message: error.response?.data?.message || 'Failed to add material' };
    }
};

export const updateMaterial = async (materialId, updatedData) => {
    try {
        const response = await axios.put(`/api/material/${materialId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating material:", error);
        throw { message: error.response?.data?.message || 'Failed to update material' };
    }
};

export const deleteMaterial = async (materialId) => {
    try {
        const response = await axios.delete(`/api/material/${materialId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting material:", error);
        throw { message: error.response?.data?.message || 'Failed to delete material' };
    }
};

export const addFileToMaterial = async (materialId, fileData) => {
    try {
        const response = await axios.post(`/api/material/${materialId}/file`, fileData);
        return response.data;
    } catch (error) {
        console.error("Error adding file to material:", error);
        throw { message: error.response?.data?.message || 'Failed to add file' };
    }
};

export const fetchAssignedTeachers = async (schoolYear, semester, sectionId) => {
    try {
        const response = await axios.get(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/assignedTeachers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw { message: error.response.data.message };
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

export const assignTeacherToSection = async ( teacherId, schoolYear, semester, sectionId) => {
    try {
        const response = await axios.post(
            `/api/admin/sections/${schoolYear}/${semester}/${sectionId}/assignTeacher/${teacherId}`
        );
        console.log(response.data)
        if (response.data) {
           return response.data;
        }
        return false;
    } catch (error) {
        console.error("Error assigning teacher:", error);
        throw {
            message: error.response?.data?.message || 'Failed to assign teacher'
        };
    }
}

export const assignTeacherArrayToSection = async (teacherIds, schoolYear, semester, sectionId) => {
    try {
        const response = await axios.post(
            `/api/admin/sections/${schoolYear}/${semester}/${sectionId}/assignTeacherArray`,
            { teacherIds }
        );
        if (response.data) {
            return response.data;
        }
        throw new Error('Unexpected empty response from server');
    } catch (error) {
        console.error("Error assigning teachers:", error);
        throw {
            message: error.response?.data?.message || 'Failed to assign teachers'
        };
    }
}

export const fetchEnrolledStudents = async (schoolYear, semester, sectionId) => {
    try {
        const response = await axios.get(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/enrolledStudents`);
        return response.data;

    } catch (error) {
        console.error("Error fetching students:", error);
        throw { message: error.response.data.message };
    }
};

export const removeStudentFromSection = async (currentEnrolledStudents, studentId, schoolYear, semester, sectionId) => {
    try {
        await axios.delete(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/removeEnrolled/${studentId}`);
        const newEnrolledStudents = currentEnrolledStudents.filter((student) => student.studentId !== studentId);
        return newEnrolledStudents;
    } catch (error) {
        console.error("Error removing student from section:", error);
    }
};

export const updateStudentFromSection = async (currentEnrolledStudents, updatedStudent, schoolYear, semester, sectionId) => {
    try {
        const response = await axios.put(
            `/api/admin/sections/${schoolYear}/${semester}/${sectionId}/updateEnrolledStudent/${updatedStudent.studentId}`,
            updatedStudent
        );

        if (response.data) {
            const newEnrolledStudents = currentEnrolledStudents.map(student => student.studentId === updatedStudent.studentId ? response.data : student);
            console.log(newEnrolledStudents)
            return newEnrolledStudents;
        }
    } catch (error) {
        console.error("Error updating student:", error);
        return false;
    }
};

export const addEnrolledStudentsFromFile = async (currentEnrolledStudents, file, schoolYear, semester, sectionId) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(`/api/admin/sections/${schoolYear}/${semester}/${sectionId}/enrollStudents`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.data.success) {
            return [...currentEnrolledStudents, ...response.data.students];
        }
        return response.data.message;
    } catch (error) {
        if (error.code == "ERR_BAD_RESPONSE") {
            throw {
                message: "Data import failed: Duplicate student ID or email. Try again.",
            };
        } else {
            throw {
                message: error.response?.data?.message || 'Failed to enroll students'
            };
        }
    }
}

