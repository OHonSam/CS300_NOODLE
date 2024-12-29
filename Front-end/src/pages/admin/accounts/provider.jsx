import { AdminInfoProvider } from "../../../context/admin/accounts/AdminInfoContext"
import { StudentInfoProvider } from "../../../context/admin/accounts/StudentInfoContext"
import { TeacherInfoProvider } from "../../../context/admin/accounts/TeacherInfoContext"

const AccountProvider = ({ children }) => {
  return (
    <StudentInfoProvider>
      <TeacherInfoProvider>
        <AdminInfoProvider>
          {children}
        </AdminInfoProvider>
      </TeacherInfoProvider>
    </StudentInfoProvider>
  )
}

export default AccountProvider
