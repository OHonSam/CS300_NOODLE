// Front-end/src/context/AdminInfoContext.jsx
import { useState, useEffect } from "react";
import axios from "../../axios.config";

import { AdminInfoContext } from "../../hooks/admin/useAdminInfo";

export const AdminInfoProvider = ({ children }) => {
  // Sample data, replace this with data fetched from backend
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState([]);
  const adminsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`/api/admin/admins?page=${currentPage}&limit=${adminsPerPage}`);
        if (response.data.admins.length === 0) {
          setTotalPages(1);
        } else {
          setAdmins(response.data.admins);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, [currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const addAdmin = async (newAdmin) => {
    try {
      const response = await axios.post('/api/admin/admins', newAdmin);
      // Optionally, fetch the updated list or update the state
      setAdmins((prev) => [...prev, response.data.admin]);
      // Recalculate total pages
      const newTotalPages = Math.ceil((admins.length + 1) / adminsPerPage);
      setTotalPages(newTotalPages);

      // setCurrentPage(newTotalPages);
      return true;
    } catch (error) {
      console.error("Error adding admin:", error.response);
      throw {
        message: error.response.data.message,
      };
    }
  };

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
        admins: admins.slice(0, 10),
        totalPages,
        changePage,
        addAdmin,
        updateAdmin,
        deleteAdmin
      }}
    >
      {children}
    </AdminInfoContext.Provider>
  );
};
