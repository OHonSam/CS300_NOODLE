// Front-end/src/context/AdminInfoContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { AdminInfoContext } from "../hooks/useAdminInfo";

// Set base URL for all axios requests
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
          setAdmins([    
            {
              adminId: '22125009',
              fullName: 'Ngo Thien Bao',
              email: 'ntbao22@apcs.fitus.edu.vn',
              gender: 'Male',
              dob: '2004-12-04',
            }
          ]);
          setTotalPages(1);
        } else {
          setAdmins(response.data.admins);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          // Handle unauthorized access - redirect to login
          window.location.href = '/login';
        }
      }
    };

    if (localStorage.getItem("token")) {
      fetchAdmins();
    } else {
      window.location.href = '/login';
    }
  }, [currentPage]);

  const paginatedAdmins = admins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

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
      // // Optionally switch to the last page to see the new admin
      // setCurrentPage(newTotalPages);
      return true;
    } catch (error) {
      console.error("Error adding admin:", error);
      return false;
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
    // call backend API
    setAdmins((prev) => prev.filter((admin) => admin.adminId !== adminId));
  };

  return (
    <AdminInfoContext.Provider value={{ admins, totalPages, changePage, addAdmin, updateAdmin, deleteAdmin }}>
      {children}
    </AdminInfoContext.Provider>
  );
};

// Hook to use the AdminInfoContext
export const useAdminInfo = () => {
  return useContext(AdminInfoContext);
};

export default AdminInfoProvider;