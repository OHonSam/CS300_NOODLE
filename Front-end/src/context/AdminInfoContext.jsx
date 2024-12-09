import { useState } from "react";
import { AdminInfoContext } from "../hooks/useAdminInfo";

export const AdminInfoProvider = ({ children }) => {
  // Sample data, replace this with data fetched from backend
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState([
    {
      adminId: '22125009',
      fullName: 'Ngo Thien Bao',
      email: 'ntbao22@apcs.fitus.edu.vn',
      gender: 'Male',
      dob: '2004-12-04',
      address: '100 randon',
      phone: '123-45-678',
    },
    {
      adminId: '22125010',
      fullName: 'Phan Phuc Bao',
      email: 'pbbao22@apcs.fitus.edu.vn',
      gender: 'Male',
      dob: '2004-01-01',
      address: '100 randon',
      phone: '123-45-678',
    },
    {
      adminId: '22125085',
      fullName: 'O Hon Sam',
      email: 'ohsam22@apcs.fitus.edu.vn',
      gender: 'Male',
      dob: '2004-01-01',
      address: '100 randon',
      phone: '123-45-678',
    }
  ]);

  const adminsPerPage = 10;
  const paginatedAdmins = admins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  const totalPages = Math.ceil(admins.length / adminsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const addAdmin = async (newAdmin) => {
    // call backend API
    setAdmins((prev) => [...prev, newAdmin]);
  };

  const updateAdmin = async (updatedAdmin) => {
    // call backend API
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.adminId === updatedAdmin.adminId ? updatedAdmin : admin
      )
    );
  };

  const deleteAdmin = async (adminId) => {
    // call backend API
    setAdmins((prev) => prev.filter((admin) => admin.adminId !== adminId));
  };

  return (
    <AdminInfoContext.Provider
      value={{ admins: paginatedAdmins, totalPages, changePage, addAdmin, updateAdmin, deleteAdmin }}
    >
      {children}
    </AdminInfoContext.Provider>
  );
};