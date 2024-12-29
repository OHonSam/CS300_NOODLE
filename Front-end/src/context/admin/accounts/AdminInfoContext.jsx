// Front-end/src/context/AdminInfoContext.jsx
import { useState, useEffect } from "react";
import axios from "../../../axios.config";

import { AdminInfoContext } from "../../../hooks/admin/accounts/useAdminInfo";

export const AdminInfoProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`/api/admin/admins?`);
      setAdmins(response.data.admins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async (newAdmin) => {
    try {
      const response = await axios.post('/api/admin/admins', newAdmin);
      // Optionally, fetch the updated list or update the state
      setAdmins((prev) => [...prev, response.data.admin]);
      return true;
    } catch (error) {
      console.error("Error adding admin:", error.response);
      throw {
        message: error.response.data.message,
      };
    }
  };

  const addAdminFromFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post('/api/admin/fileAdmins', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important!
        }
      });

      if (response.data.success) {
        setAdmins((prev) => [...prev, ...response.data.users]);
      }
      return response.data.message;
    } catch (error) {
      console.error("Error adding admins from file:", error);
      if (error.code == "ERR_BAD_RESPONSE") {
        throw {
          message: "Data import failed: Duplicate admin ID or email. Try again.",
        };
      } else {
        throw {
          message: error.response.data.message,
        };
      }
    }
  }

  const updateAdmin = async (updatedAdmin) => {
    try {
      const response = await axios.put(
        `/api/admin/admins/${updatedAdmin.adminId}`,
        updatedAdmin
      );

      if (response.data) {
        setAdmins(prev =>
          prev.map(admin =>
            admin.adminId === updatedAdmin.adminId ? response.data : admin
          )
        );
        return true;
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      return false;
    }
  };

  const deleteAdmin = async (adminId) => {
    try {
      await axios.delete(`/api/admin/admins/${adminId}`);
      setAdmins((prev) => prev.filter((admin) => admin.adminId !== adminId));
      return true;
    } catch (error) {
      console.error("Error deleting admin:", error);
      return false;
    }
  };

  // Provide all the admin-related data and functions to any child component that needs them
  return (
    <AdminInfoContext.Provider
      value={{
        admins,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        addAdminFromFile,
      }}
    >
      {children}
    </AdminInfoContext.Provider>
  );
};
