import { SectionStatisticProvider } from "../../../context/admin/dashboard/SectionStatisticContext"

const DashboardInfoProvider = ({ children }) => {
  return (
    <SectionStatisticProvider>
      {children}
    </SectionStatisticProvider>
  )
}

export default DashboardInfoProvider