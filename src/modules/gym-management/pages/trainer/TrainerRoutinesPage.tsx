import { XMarkIcon, TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import React from "react";

import pectorales from "/src/modules/gym-management/assets/images/pectorales.png";
import dorsales from "/src/modules/gym-management/assets/images/dorsales.png";
import trapecios from "/src/modules/gym-management/assets/images/trapecios.png";
import deltoides from "/src/modules/gym-management/assets/images/deltoides.png";
import biceps from "/src/modules/gym-management/assets/images/biceps.png";
import triceps from "/src/modules/gym-management/assets/images/triceps.png";
import abdominales from "/src/modules/gym-management/assets/images/abdominales.png";
import oblicuos from "/src/modules/gym-management/assets/images/oblicuos.png";
import cuadriceps from "/src/modules/gym-management/assets/images/cuadriceps.png";
import isquiotibiales from "/src/modules/gym-management/assets/images/isquiotibiales.png";
import gluteos from "/src/modules/gym-management/assets/images/gluteos.png";

export default function RoutinesPage() {
  const [muscleGroups, setMuscleGroups] = React.useState([
    { id: 1, name: "Pectorales", img: pectorales },
    { id: 2, name: "Dorsales", img: dorsales },
    { id: 3, name: "Trapecios", img: trapecios },
    { id: 4, name: "Deltoides", img: deltoides },
    { id: 5, name: "Bíceps", img: biceps },
    { id: 6, name: "Tríceps", img: triceps },
    { id: 7, name: "Abdominales", img: abdominales },
    { id: 8, name: "Oblicuos", img: oblicuos },
    { id: 9, name: "Cuádriceps", img: cuadriceps },
    { id: 10, name: "Isquiotibiales", img: isquiotibiales },
    { id: 11, name: "Glúteos", img: gluteos },
  ]);

  const [selectedMuscle, setSelectedMuscle] = React.useState<null | typeof muscleGroups[0]>(null);
  const [editingMuscle, setEditingMuscle] = React.useState<null | typeof muscleGroups[0]>(null);
  const [creating, setCreating] = React.useState(false);

  // Eliminar rutina
  const deleteMuscle = (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta rutina?")) {
      setMuscleGroups((prev) => prev.filter((m) => m.id !== id));
      setSelectedMuscle(null);
      setEditingMuscle(null);
    }
  };

  
  return (
    <div className="p-4">
      <header className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold">Rutinas</h2>  
        <button
          onClick={() => setCreating(true)}
          className="bg-white text-black rounded-full p-1 hover:bg-gray-200"
        >
          <PlusIcon className="w-6 h-6" />
        </button>  
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-white p-4 rounded-b-lg">
        {muscleGroups.map((muscle) => (
          <div
            key={muscle.id}
            onClick={() => setSelectedMuscle(muscle)}
            className="bg-black text-white rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform relative"
          >
            <img src={muscle.img} alt={muscle.name} className="w-20 h-20 object-contain mb-2" />
            <span className="text-center font-semibold">{muscle.name}</span>
          </div>
        ))}
      </div>

      {/* Modal detalle */}
      {selectedMuscle && !editingMuscle && (
        <RoutineDetailModal
          muscleGroup={selectedMuscle}
          onClose={() => setSelectedMuscle(null)}
          onEdit={() => setEditingMuscle(selectedMuscle)}
          onDelete={() => deleteMuscle(selectedMuscle.id)}
        />
      )}

      {creating && (
        <RoutineCreateModal
          onClose={() => setCreating(false)}
          onSave={(newRoutine) => {
            setMuscleGroups((prev) => [
              ...prev,
              {
                id: Date.now(), // o usa un contador si lo prefieres
                ...newRoutine,
              },
            ]);
            setCreating(false);
          }}
        />
      )}

      {/* Modal edición */}
      {editingMuscle && (
        <RoutineEditModal
          muscleGroup={editingMuscle}
          onClose={() => setEditingMuscle(null)}
          onSave={(updated) => {
            setMuscleGroups((prevGroups) =>
              prevGroups.map((group) =>
                group.id === editingMuscle.id ? { ...group, ...updated } : group
              )
            );
            setEditingMuscle(null);
            setSelectedMuscle((prev) =>
              prev?.id === editingMuscle.id ? { ...prev, ...updated } : prev
            );
          }}
        />
      )}
    </div>
  );
}

const RoutineDetailModal = ({
  muscleGroup,
  onClose,
  onEdit,
  onDelete,
}: {
  muscleGroup: { id: number; name: string; img: string };
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <img src={muscleGroup.img} alt={muscleGroup.name} className="w-40 h-40 object-contain mb-4" />
        <h2 className="text-3xl font-bold mb-4">{muscleGroup.name}</h2>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-200"
          >
            <PencilIcon className="w-5 h-5" />
          </button>

          <button
            onClick={onDelete}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-200"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const RoutineEditModal = ({
  muscleGroup,
  onClose,
  onSave,
}: {
  muscleGroup: { id: number; name: string; img: string };
  onClose: () => void;
  onSave: (updated: { name: string; img: string }) => void;
}) => {
  const [name, setName] = React.useState(muscleGroup.name);
  const [localImage, setLocalImage] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isValid = name.trim() !== "" && (localImage !== "");

  const handleSave = () => {
    onSave({ name, img: localImage || muscleGroup.img });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Editar rutina</h2>

        <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <label className="block mb-2 font-semibold text-gray-700">Imagen (local o URL)</label>
        <input
          type="file"
          accept="image/*"
          className="mb-2"
          onChange={handleFileChange}
        />
        <div className="flex justify-center mb-4">
          {(localImage) && (
            <img
              src={localImage}
              alt="Vista previa"
              className="w-32 h-32 object-contain rounded border"
            />
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded text-white ${
              isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

const RoutineCreateModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (newRoutine: { name: string; img: string }) => void;
}) => {
  const [name, setName] = React.useState("");
  const [localImage, setLocalImage] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isValid = name.trim() !== "" && localImage;

  const handleSave = () => {
    if (isValid) {
      onSave({ name, img: localImage! });
    }

  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Crear nueva rutina</h2>

        <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 font-semibold text-gray-700">Imagen</label>
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleFileChange}
        />

        {localImage && (
          <div className="flex justify-center mb-4">
            <img
              src={localImage}
              alt="Vista previa"
              className="w-32 h-32 object-contain rounded border"
            />
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded text-white ${
              isValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};


