import { SectionStatisticProvider } from "../../../context/teacher/dashboard/SectionStatisticContext"

const DashboardInfoProvider = ({ children }) => {
  return (
    <SectionStatisticProvider>
      {children}
    </SectionStatisticProvider>
  )
}

export default DashboardInfoProvider