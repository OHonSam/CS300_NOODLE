import { useEffect, useState } from "react";
import Expander from "../../../components/material";
import { fetchMaterials } from "../../../services/SectionInfoService";
import { useToast } from "../../../hooks/useToast";

const SectionMaterialView = ({ schoolYear, semester, sectionId }) => {
  // generate a list a materials contains the title, the content and url of the material
  const [materials, setMaterials] = useState([])
  const { addToast } = useToast();

  useEffect(() => {
    const fetchMaterialsData = async () => {
      try {
        const data = await fetchMaterials(schoolYear, semester, sectionId);
        setMaterials(data);
      } catch (error) {
        addToast('error', error.message || 'Failed to fetch materials');
      }
    };

    fetchMaterialsData();
  }, []);

  return (
    <div className="relative pt-4 pb-8 flex flex-col overflow-y-auto h-full w-full">
      <div className="grid grid-cols-1 gap-4 w-full">
        {materials.map((material, index) => (
          <Expander
            key={index}
            title={material.title}
            content={material.content}
            url={material.url}
            canEdit={false}
          />
        ))}
      </div>
    </div>
  );
}

export default SectionMaterialView;
