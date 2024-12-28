import { SectionsManagementProvider } from "../../../context/teacher/SectionsManagementContext";

const SectionsProvider = ({ children }) => {
  return (
    <SectionsManagementProvider>
      {children}
    </SectionsManagementProvider>
  );
};

export default SectionsProvider