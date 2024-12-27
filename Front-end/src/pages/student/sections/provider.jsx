import { SectionsManagementProvider } from "../../../context/student/SectionsManagementContext";

const SectionsProvider = ({children}) => {
  return (
    <SectionsManagementProvider>
      {children}
    </SectionsManagementProvider>
  );
};

export default SectionsProvider