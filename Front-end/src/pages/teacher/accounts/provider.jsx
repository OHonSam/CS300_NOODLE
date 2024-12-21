import { StudentInfoProvider } from "../../../context/StudentInfoContext"
import { TeacherInfoProvider } from "../../../context/TeacherInfoContext"

const AccountProvider = ({ children }) => {
  return (
    <StudentInfoProvider>
      <TeacherInfoProvider>
        {children}
      </TeacherInfoProvider>
    </StudentInfoProvider>
  )
}

export default AccountProvider