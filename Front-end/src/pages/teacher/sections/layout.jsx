import SectionsProvider from "./provider";
import SectionsManagement from "./SectionsManagement";

const SectionsLayout = () => {
    return (
        <SectionsProvider>
            <SectionsManagement />
        </SectionsProvider>
    );
}

export default SectionsLayout;
