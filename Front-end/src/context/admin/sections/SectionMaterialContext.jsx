import { useState, useEffect } from "react";
import axios from "../../../axios.config";
import { SectionMaterialContext } from "../../../hooks/admin/sections/useSectionMaterial";

export const SectionMaterialProvider = ({ children, sectionId, schoolYear, semester }) => {
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`/api/material/${schoolYear}/${semester}/${sectionId}`);
      setMaterials(response.data.materials);
    } catch (error) {
      console.error("Error fetching material:", error);
      throw{ message: error.response.data.message};
    } 
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <SectionMaterialContext.Provider
      value={{
        materials,
      }}
    >
      {children}
    </SectionMaterialContext.Provider>
  );
};

