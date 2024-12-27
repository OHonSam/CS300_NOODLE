import { AdminInfoProvider } from "../../../context/accounts/AdminInfoContext"
import { StudentInfoProvider } from "../../../context/accounts/StudentInfoContext"
import { TeacherInfoProvider } from "../../../context/accounts/TeacherInfoContext"

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