import Expander from "../../../components/expander";
import { useSectionMaterial } from "../../../hooks/admin/sections/useSectionMaterial";

const SectionMaterialView = () => {
  // generate a list a materials contains the title, the content and url of the material
  const { materials } = useSectionMaterial();

  return (
    <div className="relative pt-4 pb-8 flex flex-col overflow-y-auto h-full w-full">
      <div className="grid grid-cols-1 gap-4 w-full">
        {materials.map((material, index) => (
          <Expander
            title={material.title}
            content={material.content}
            url={material.url}
          />
        ))}
      </div>
    </div>
  );
}

export default SectionMaterialView;
