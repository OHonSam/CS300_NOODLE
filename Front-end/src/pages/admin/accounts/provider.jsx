import { AdminInfoProvider } from "../../../context/AdminInfoContext"
import { StudentInfoProvider } from "../../../context/StudentInfoContext"
import { TeacherInfoProvider } from "../../../context/TeacherInfoContext"

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