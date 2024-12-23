import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import { useState } from "react";
import Toast from "../../../components/toast";
import { useAdminInfo } from "../../../hooks/useAdminInfo";
import AdminInfoDialog from "../../../components/dialog/AdminInfoDialog";

const AdminAccountView = () => {
  const [adminInfoDialogVisible, setAdminInfoDialogVisible] = useState(false);
  const [currentAdminDialog, setCurrentAdminDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { admins, totalPages, changePage } = useAdminInfo();

  const headings = [
    { id: 'adminId', label: 'Admin ID' },
    { id: 'fullName', label: 'Full name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'dob', label: 'Date Of Birth' },
  ];

  const handleRowClicked = (row) => {
    setCurrentAdminDialog(row);
    setAdminInfoDialogVisible(true);
  };

  return (
    <div className="relative mt-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={admins} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={adminsPerPage}>
        <AdminInfoDialog
          key={currentAdminDialog?.adminId}
          dialogFor={'info'}
          adminData={currentAdminDialog}
          isOpen={adminInfoDialogVisible}
          onClose={() => setAdminInfoDialogVisible(false)}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </Table>
      {totalPages > 1 && (
        <Pager
          numberOfPages={totalPages}
          onPageChange={changePage}
          className="w-full flex justify-center mt-2"
        />
      )}
      {toast.length > 0 && (
        <Toast
          message={toast[0]}
          onClick={() => setToast([])}
          className={'m-auto -top-32'}
          isAccepted={toast[1]}
        />
      )}
    </div>
  );
};

export default AdminAccountView;
