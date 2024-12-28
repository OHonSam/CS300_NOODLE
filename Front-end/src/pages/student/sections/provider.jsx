import { SectionsManagementProvider } from "../../../context/sections/SectionsManagementContext";

const SectionsProvider = ({ children }) => {
  return (
    <SectionsManagementProvider>
      {children}
    </SectionsManagementProvider>
  );
};

export default SectionsProvider