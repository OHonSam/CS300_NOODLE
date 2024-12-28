import Expander from "../../../components/expander";
import { useSectionMaterial } from "../../../hooks/admin/sections/useSectionMaterial";

const SectionMaterialView = () => {
  // generate a list a materials contains the title, the content and url of the material
  const { materials } = useSectionMaterial();

  return (
    <div className="relative pt-4 pb-8 flex flex-col overflow-y-auto h-full w-full">
      <div className="border rounded-lg shadow-md pl-4 pr-4 bg-gray-200 w-full">
        <Expander
          isOpened={true}
          title="Resources"
          content={(
            <div className="grid grid-cols-1 gap-4 w-full">
              {materials.map((material, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-md pl-4 pr-4 bg-white w-full"
                >
                  <Expander
                    title={material.title}
                    content={material.content}
                    url={material.url}
                  />
                </div>
              ))}
            </div>
          )}
        />
      </div>
      <div className="mt-4 border rounded-lg shadow-md pl-4 pr-4 bg-gray-200 w-full">
        <Expander
          isOpened={true}
          title="Assignments"
          content={(
            <div className="grid grid-cols-1 gap-4 w-full">
              {materials.map((material, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-md pl-4 pr-4 bg-white w-full"
                >
                  <Expander
                    title={material.title}
                    content={material.content}
                    url={material.url}
                  />
                </div>
              ))}
            </div>
          )}
        />
      </div>
      <div className="mt-4 border rounded-lg shadow-md pl-4 pr-4 bg-gray-200 w-full">
        <Expander
          isOpened={true}
          title="Quizzes"
          content={(
            <div className="grid grid-cols-1 gap-4 w-full">
              {materials.map((material, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-md pl-4 pr-4 bg-white w-full"
                >
                  <Expander
                    title={material.title}
                    content={material.content}
                    url={material.url}
                  />
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div >
  );
}

export default SectionMaterialView;
