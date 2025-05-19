import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { set } from "react-hook-form";
import mancuernas from "/src/modules/gym-management/assets/images/mancuernas.png";
import barra from "/src/modules/gym-management/assets/images/barra.jpg";
import paralelas from "/src/modules/gym-management/assets/images/paralelas.png";
import mancuernas2 from "/src/modules/gym-management/assets/images/mancuernas2.png";

export const ExercisesPage = () => {
  const [exercises, setExercises] = useState([
    {
      name: "Aperturas con mancuernas",
      images: [mancuernas, mancuernas2],
      description: `-Flexionarse en un ángulo de 45 grados.\n-Los brazos están a la altura de los hombros.\n-Las mancuernas tienen peso que sea soportable.\n-Flexionar los brazos a 45 grados y luego extenderlos hacia abajo.`,
      equipment: [
        "Mancuernas",
        "Máquina press normal",
        "Contractor de pecho",
      ],
    },
    {
      name: "Press inclinado con barra",
      images: [barra],
      description: `-Acuéstese en una banca inclinada.\n-Sujete la barra con un agarre ligeramente más ancho que los hombros.\n-Baje la barra controladamente y empuje hacia arriba.`,
      equipment: ["Barra olímpica", "Banco inclinado", "Discos"],
    },
    {
      name: "Fondos en paralelas",
      images: [paralelas],
      description: `-Sujétese de las paralelas con los brazos estirados.\n-Descienda controladamente inclinando el torso.\n-Empuje hacia arriba activando el pecho.`,
      equipment: ["Paralelas", "Chaleco con peso (opcional)"],
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<{
    name: string;
    image: File | string;
    description: string;
    equipment: string;
  }>({
    name: "",
    image: "",
    description: "",
    equipment: "",
  });

  const currentExercise = exercises[currentIndex];

  const goNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAddExercise = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  const newEx = {
    name: newExercise.name,
    images: [
      typeof newExercise.image === "string"
        ? newExercise.image
        : URL.createObjectURL(newExercise.image as File),
    ],
    description: newExercise.description,
    equipment: newExercise.equipment.split(",").map((eq) => eq.trim()),
  };

  if (isEditing && editIndex !== null) {
    const updated = [...exercises];
    updated[editIndex] = newEx;
    setExercises(updated);
    setCurrentIndex(editIndex);
  } else {
    setExercises([...exercises, newEx]);
    setCurrentIndex(exercises.length);
  }

  setNewExercise({ name: "", image: "", description: "", equipment: "" });
  setImagePreview(null);
  setIsModalOpen(false);
  setIsEditing(false);
  setEditIndex(null);
};

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  return (
    <div className="p-4">
      {/* Header con botón más */}
      <header className="flex justify-between items-center mb-4 bg-black text-white p-3 rounded-t-lg">
        <h2 className="text-xl font-semibold">{currentExercise.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setNewExercise({
                name: currentExercise.name,
                image: currentExercise.images[0] || "",
                description: currentExercise.description,
                equipment: currentExercise.equipment.join(", "),
              });
              setEditIndex(currentIndex);
              setIsEditing(true);
              setIsModalOpen(true);
            }}
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
            aria-label="Editar ejercicio"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="bg-white text-black p-2 rounded-full hover:bg-red-200"
            aria-label="Eliminar ejercicio"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setNewExercise({ name: "", image: "", description: "", equipment: "" });
              setIsEditing(false);
              setIsModalOpen(true);
            }}
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
            aria-label="Agregar ejercicio"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </header>


      {/* Imágenes */}
      <div className="flex justify-center items-center gap-2 mb-6">
        {currentExercise.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Ejercicio ${idx}`}
            className="w-[150px] h-[200px] object-contain rounded-lg shadow bg-white"
          />
        ))}
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        <div className="bg-white border rounded-lg shadow-md">
          <h3 className="bg-black text-white p-2 rounded-t-md font-semibold">
            Descripción ejercicio
          </h3>
          <div className="p-4 whitespace-pre-wrap text-sm">
            {currentExercise.description}
          </div>
        </div>

        <div className="bg-white border rounded-lg shadow-md">
          <h3 className="bg-black text-white p-2 rounded-t-md font-semibold">
            Maquinaria necesaria
          </h3>
          <ul className="p-4 list-disc list-inside text-sm">
            {currentExercise.equipment.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex justify-center gap-8 mt-6">
        <button
          onClick={goPrevious}
          disabled={currentIndex === 0}
          className="bg-black text-white p-3 rounded disabled:opacity-50"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === exercises.length - 1}
          className="bg-black text-white p-3 rounded disabled:opacity-50"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-4">Agregar nuevo ejercicio</h3>
            <form onSubmit={handleAddExercise} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre"
                value={newExercise.name}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const localUrl = URL.createObjectURL(file);
                      setImagePreview(localUrl);
                      setNewExercise({ ...newExercise, image: file });
                  }
                }}
              className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Descripción"
                value={newExercise.description}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Maquinaria (separada por comas)"
                value={newExercise.equipment}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, equipment: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
              >
                {isEditing ? "Guardar cambios" : "Agregar ejercicio"}
              </button>
            </form>
          </div>
        </div>
      )}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">¿Eliminar ejercicio?</h3>
            <p className="text-sm mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  const updated = [...exercises];
                  updated.splice(currentIndex, 1);
                  setExercises(updated);
                  setCurrentIndex((prev) => Math.max(0, prev - 1));
                  setIsConfirmOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExercisesPage;

