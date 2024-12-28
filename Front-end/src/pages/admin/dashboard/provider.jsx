import { SectionStatisticProvider } from "../../../context/dashboard/SectionStatisticContext"

const DashboardInfoProvider = ({ children }) => {
  return (
    <SectionStatisticProvider>
      {children}
    </SectionStatisticProvider>
  )
}

export default DashboardInfoProvider