import { SectionInfoProvider } from "../../../context/SectionInfoContext"

const DashboardInfoProvider = ({ children }) => {
  return (
    <SectionInfoProvider>
      {children}
    </SectionInfoProvider>
  )
}

export default DashboardInfoProvider