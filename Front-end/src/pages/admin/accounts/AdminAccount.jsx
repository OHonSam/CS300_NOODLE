import Table from "../../../components/table";
import Pager from "../../../components/footer/pager";
import { useState } from "react";
import ToastSuccess from "../../../components/toast";
import { useAdminInfo } from "../../../hooks/useAdminInfo";
import AdminInfoDialog from "../../../components/dialog/AdminInfoDialog";

const AdminAccountView = () => {
  const [adminInfoDialogVisible, setAdminInfoDialogVisible] = useState(false);
  const [currentAdminDialog, setCurrentAdminDialog] = useState(null);
  const [toast, setToast] = useState('');
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
      <Table headings={headings} data={admins} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={20}>
        <AdminInfoDialog
          key={currentAdminDialog?.adminId}
          dialogFor={'info'}
          adminData={currentAdminDialog}
          isOpen={adminInfoDialogVisible}
          onClose={() => setAdminInfoDialogVisible(false)}
          onUpdate={() => setToast('Admin updated successfully.')}
          onDelete={() => setToast('Admin deleted successfully.')}
        />
      </Table>
      {totalPages > 1 && <Pager
        numberOfPages={totalPages}
        onPageChange={changePage}
        className="w-full flex justify-center mt-2" />
      }
      {toast && <ToastSuccess message={toast} onClick={() => setToast('')} className={'m-auto -top-32'} Icon={
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      } />}
    </div>
  );
};

export default AdminAccountView;