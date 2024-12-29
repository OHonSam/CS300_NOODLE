import { useEffect, useState } from "react";
import Material from "../../../components/material";
import { fetchMaterials, updateMaterial, deleteMaterial } from "../../../services/SectionInfoService";
import { useToast } from "../../../hooks/useToast";

const SectionMaterialView = ({ schoolYear, semester, sectionId, shouldRefresh, onRefreshComplete }) => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchMaterialsData();
  }, [schoolYear, semester, sectionId]);

  useEffect(() => {
    if (shouldRefresh) {
      fetchMaterialsData();
      onRefreshComplete();
    }
  }, [shouldRefresh]);

  const fetchMaterialsData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMaterials(schoolYear, semester, sectionId);
      setMaterials(data);
    } catch (error) {
      addToast('error', error.message || "Failed to load materials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMaterial = async (materialId, updatedData) => {
    try {
      setIsLoading(true);
      const updatedMaterial = await updateMaterial(materialId, {
        ...updatedData,
        sectionReference: {
          sectionId,
          schoolYear,
          semester
        }
      });
      
      setMaterials(prevMaterials => 
        prevMaterials.map(material => 
          material.materialId === materialId ? updatedMaterial : material
        )
      );
      addToast('success', 'Material updated successfully');
      return true;
    } catch (error) {
      addToast('error', error.message || "Failed to update material");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      setIsLoading(true);
      await deleteMaterial(materialId);
      setMaterials(prevMaterials => 
        prevMaterials.filter(material => material.materialId !== materialId)
      );
      addToast('success', 'Material deleted successfully');
      return true;
    } catch (error) {
      addToast('error', error.message || "Failed to delete material");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 w-full">
      {materials.map((material) => (
        <Material
          key={material.materialId}
          materialId={material.materialId}
          title={material.title}
          content={material.content}
          url={material.url}
          isOpened={false}
          onUpdate={(updatedData) => handleUpdateMaterial(material.materialId, updatedData)}
          onDelete={() => handleDeleteMaterial(material.materialId)}
        />
      ))}
    </div>
  );
};

export default SectionMaterialView;