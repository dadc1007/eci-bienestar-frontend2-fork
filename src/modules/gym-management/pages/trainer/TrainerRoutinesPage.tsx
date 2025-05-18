import React, { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface Routine {
  name: string;
  muscleGroup: string;
  exercises: string[];
  img?: string;
}

const defaultMuscleGroups = [
  { name: "Pectorales", img: "/images/pectorales.png" },
  { name: "Dorsales", img: "/images/dorsales.png" },
  { name: "Trapecios", img: "/images/trapecios.png" },
  { name: "Deltoides", img: "/images/deltoides.png" },
  { name: "Bíceps", img: "/images/biceps.png" },
  { name: "Tríceps", img: "/images/triceps.png" },
  { name: "Abdominales", img: "/images/abdominales.png" },
  { name: "Oblicuos", img: "/images/oblicuos.png" },
  { name: "Cuádriceps", img: "/images/cuadriceps.png" },
  { name: "Isquiotibiales", img: "/images/isquiotibiales.png" },
  { name: "Glúteos", img: "/images/gluteos.png" },
];

const TrainerMainPage: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [creating, setCreating] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

  const handleCreateRoutine = (newRoutine: Routine) => {
    setRoutines((prev) => [...prev, newRoutine]);
    setCreating(false);
  };

  const handleUpdateRoutine = (updated: Routine) => {
    setRoutines((prev) =>
      prev.map((r) => (r.name === updated.name ? updated : r))
    );
    setEditingRoutine(null);
  };

  const handleDeleteRoutine = (name: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar la rutina "${name}"?`)) {
      setRoutines((prev) => prev.filter((r) => r.name !== name));
    }
  };

  // Mostrar todos los grupos musculares por defecto junto con las rutinas creadas (sin filtrar)
  const allMuscles = [
    ...defaultMuscleGroups,
    ...routines
      .filter(
        (r) =>
          !defaultMuscleGroups.some((m) => m.name.toLowerCase() === r.name.toLowerCase())
      )
      .map((r) => ({
        name: r.name,
        img: r.img || "/images/default.png",
      })),
  ];

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4 bg-black text-white p-3 rounded-t-lg">
        <h2 className="text-xl font-bold">Rutinas creadas</h2>
        <button
          onClick={() => setCreating(true)}
          className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
          aria-label="Crear nueva rutina"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-white p-4 rounded-b-lg shadow">
        {allMuscles.map((muscle) => (
          <div
            key={muscle.name}
            className="bg-black text-white rounded-lg p-3 flex flex-col items-center relative cursor-pointer hover:bg-gray-900 transition"
            onClick={() => {
              const routine = routines.find((r) => r.name === muscle.name);
              if (routine) setSelectedRoutine(routine);
            }}
          >
            <img
              src={muscle.img}
              alt={muscle.name}
              className="w-20 h-20 object-contain mb-2"
            />
            <span className="font-semibold text-center">{muscle.name}</span>

            {/* Mostrar botones en todas las tarjetas */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  const routineToEdit = routines.find((r) => r.name === muscle.name);
                  if (routineToEdit) setEditingRoutine(routineToEdit);
                  else
                    setEditingRoutine({
                      name: muscle.name,
                      muscleGroup: muscle.name,
                      exercises: [],
                      img: muscle.img,
                    });
                }}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                aria-label={`Editar rutina ${muscle.name}`}
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteRoutine(muscle.name)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                aria-label={`Eliminar rutina ${muscle.name}`}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {creating && (
        <RoutineModal
          onClose={() => setCreating(false)}
          onSave={handleCreateRoutine}
        />
      )}

      {editingRoutine && (
        <RoutineModal
          routine={editingRoutine}
          onClose={() => setEditingRoutine(null)}
          onSave={handleUpdateRoutine}
        />
      )}

      {selectedRoutine && (
        <RoutineModal
          routine={selectedRoutine}
          onClose={() => setSelectedRoutine(null)}
          onSave={() => {}}
          readOnly
        />
      )}
    </div>
  );
};

interface RoutineModalProps {
  routine?: Routine;
  onClose: () => void;
  onSave: (routine: Routine) => void;
  readOnly?: boolean;
}

const RoutineModal: React.FC<RoutineModalProps> = ({ routine, onClose, onSave, readOnly = false }) => {
  const [name, setName] = useState(routine?.name || "");
  const [muscleGroup, setMuscleGroup] = useState(routine?.muscleGroup || "");
  const [exercises, setExercises] = useState<string[]>(routine?.exercises || [""]);

  const handleExerciseChange = (index: number, value: string) => {
    const newExercises = [...exercises];
    newExercises[index] = value;
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, ""]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !muscleGroup.trim()) {
      alert("Por favor, complete el nombre y grupo muscular");
      return;
    }
    onSave({
      name,
      muscleGroup,
      exercises: exercises.filter((ex) => ex.trim() !== ""),
      img: undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4">{routine ? "Editar Rutina" : "Crear Rutina"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de la rutina"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2"
            required
            readOnly={readOnly}
          />
          <input
            type="text"
            placeholder="Grupo muscular"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2"
            required
            readOnly={readOnly}
          />
          <div>
            <label className="block font-semibold mb-1">Ejercicios:</label>
            {exercises.map((ex, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={ex}
                  onChange={(e) => handleExerciseChange(i, e.target.value)}
                  className="border border-gray-400 rounded px-3 py-2 flex-grow"
                  readOnly={readOnly}
                />
                
                <button
                  type="button"
                  onClick={() => removeExercise(i)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white rounded py-2 mt-4"
          >
            {routine ? "Actualizar Rutina" : "Crear Rutina"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerMainPage;
