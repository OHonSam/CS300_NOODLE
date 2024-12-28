import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import { useState } from "react";
import Toast from "../../../components/toast";
import { useAdminInfo } from "../../../hooks/admin/accounts/useAdminInfo";
import AdminInfoDialog from "../../../components/dialog/AdminInfoDialog";

const AdminAccountView = () => {
  const [adminInfoDialogVisible, setAdminInfoDialogVisible] = useState(false);
  const [currentAdminDialog, setCurrentAdminDialog] = useState(null);
  const [toast, setToast] = useState([]);
  const { admins } = useAdminInfo();

  const headings = [
    { id: 'adminId', label: 'Admin ID' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Gender' },
    { id: 'dob', label: 'Date of Birth' },
  ];

  const handleRowClicked = (row) => {
    setCurrentAdminDialog(row);
    setAdminInfoDialogVisible(true);
  };

  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-between w-full">
      <Table headings={headings} data={admins} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
      <AdminInfoDialog
        key={currentAdminDialog?.adminId}
        dialogFor={'info'}
        adminData={currentAdminDialog}
        isOpen={adminInfoDialogVisible}
        onClose={() => setAdminInfoDialogVisible(false)}
        onUpdate={() => { }}
        onDelete={() => { }}
      />
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