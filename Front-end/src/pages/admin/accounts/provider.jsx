import { AdminInfoProvider } from "../../../context/admin/AdminInfoContext"
import { StudentInfoProvider } from "../../../context/admin/StudentInfoContext"
import { TeacherInfoProvider } from "../../../context/admin/TeacherInfoContext"

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