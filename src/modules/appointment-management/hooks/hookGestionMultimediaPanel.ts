import { useState } from "react";

// Definir los datos iniciales fuera del componente para mantener la lógica más limpia
const initialItems = [
  {
    id: 1,
    type: "imagen",
    name: "Servicio de bienestar universitario",
    url: "https://example.com/1.jpg",
    duration: 8,
  },
  {
    id: 1,
    type: "imagen",
    name: "Programa de salud mental",
    url: "https://example.com/1.jpg",
    duration: 8,
  },
  {
    id: 2,
    type: "video",
    name: "Actvidades deportivas",
    url: "https://example.com/2.mp4",
    duration: 15,
  },
];

const hookGestionMultimediaPanel = () => {
  const [selectedDuration, setSelectedDuration] = useState("8");
  const [list, setList] = useState(initialItems);
  const [pendingDelete, setPendingDelete] = useState<Set<number>>(new Set());

  const handleDelete = (id: number): void => {
    setPendingDelete((prev) => new Set(prev.add(id)));
  };

  const handleSaveChanges = () => {
    setList((prev) => prev.filter((item) => !pendingDelete.has(item.id)));
    setPendingDelete(new Set());
  };

  const resetPendingDelete = () => {
    setPendingDelete(new Set());
  };

  return {
    selectedDuration,
    setSelectedDuration,
    list,
    pendingDelete,
    handleDelete,
    handleSaveChanges,
    resetPendingDelete, 
  };
};

export default hookGestionMultimediaPanel;
