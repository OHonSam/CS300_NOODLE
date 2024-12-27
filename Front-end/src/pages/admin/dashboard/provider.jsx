import { SectionStatisticProvider } from "../../../context/admin/SectionStatisticContext"

const DashboardInfoProvider = ({ children }) => {
  return (
    <SectionStatisticProvider>
      {children}
    </SectionStatisticProvider>
  )
}

export default DashboardInfoProvider