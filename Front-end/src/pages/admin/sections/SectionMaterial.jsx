import Expander from "../../../components/expander";

const SectionMaterialView = () => {
  // generate a list a materials contains the title, the content and url of the material
  const materials = [
    {
      title: "Material 1",
      content: "This is the content of material 1",
      url: "https://www.google.com"
    },
    {
      title: "Material 2",
      content: "This is the content of material 2",
      url: "https://www.google.com"
    },
    {
      title: "Material 3",
      content: "This is the content of material 3",
      url: "https://www.google.com"
    },
    {
      title: "Material 4",
      content: "This is the content of material 4",
      url: "https://www.google.com"
    },
    {
      title: "Material 5",
      content: "This is the content of material 5",
      url: "https://www.google.com"
    },
  ];

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
