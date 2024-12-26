import { SectionStatisticProvider } from "../../../context/SectionStatisticContext"

const DashboardInfoProvider = ({ children }) => {
  return (
    <SectionStatisticProvider>
      {children}
    </SectionStatisticProvider>
  )
}

export default DashboardInfoProvider