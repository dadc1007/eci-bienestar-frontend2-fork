import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

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

const muscleGroups = [
  { name: "Pectorales", img: pectorales },
  { name: "Dorsales", img: dorsales },
  { name: "Trapecios", img: trapecios },
  { name: "Deltoides", img: deltoides },
  { name: "Bíceps", img: biceps },
  { name: "Tríceps", img: triceps },
  { name: "Abdominales", img: abdominales },
  { name: "Oblicuos", img: oblicuos },
  { name: "Cuádriceps", img: cuadriceps },
  { name: "Isquiotibiales", img: isquiotibiales },
  { name: "Glúteos", img: gluteos },
];

// Mapeo de rutinas por músculo
const routinesByMuscle: Record<
  string,
  { images: string[]; description: string; equipment: string[] }[]
> = {
  Pectorales: [
    {
      images: [
        "/src/modules/gym-management/assets/images/barra.jpg",
        "/src/modules/gym-management/assets/images/paralelas.png",
        "/src/modules/gym-management/assets/images/mancuernas.png",
      ],
      description:
        "- Flexionarse en un ángulo de 45 grados.\n- Los brazos están a la altura de los hombros.\n- Las mancuernas tienen un peso que sea soportable.\n- Flexionar los brazos a 45 grados y luego extenderlos hacia abajo.",
      equipment: ["Dumbbells", "Flatbed", "Yoga"],
    },
    {
      images: [
        "/src/modules/gym-management/assets/images/mancuernas.png",
        "/src/modules/gym-management/assets/images/mancuernas2.png",
      ],
      description:
        "- Ejercicio alternativo para el mismo músculo.\n- Mantener postura recta.\n- Respiración controlada.",
      equipment: ["Barbell", "Smith Machine"],
    },
  ],
  Bíceps: [
    {
      images: ["/src/modules/gym-management/assets/images/barra.jpg"],
      description:
        "- Curl con barra.\n- Mantener los codos fijos al cuerpo.\n- Subir y bajar lentamente.",
      equipment: ["Barbell", "Banca"],
    },
  ],
  Tríceps: [
    {
      images: [
        "/src/modules/gym-management/assets/images/mancuernas.png",
        "/src/modules/gym-management/assets/images/paralelas.png",
      ],
      description:
        "- Fondos en paralelas.\n- Mantener los codos pegados al cuerpo.\n- Bajar hasta que los brazos formen 90° y subir.",
      equipment: ["Paralelas", "Mancuernas"],
    },
  ],
  Dorsales: [
    {
      images: ["/src/modules/gym-management/assets/images/barra.jpg"],
      description:
        "- Jalón al pecho.\n- Espalda recta.\n- Llevar la barra al pecho con control.",
      equipment: ["Polea alta", "Asiento"],
    },
  ],
  Deltoides: [
    {
      images: ["/src/modules/gym-management/assets/images/mancuernas.png"],
      description:
        "- Elevaciones laterales.\n- Codos ligeramente flexionados.\n- Levantar hasta la altura de los hombros.",
      equipment: ["Mancuernas"],
    },
  ],
  Abdominales: [
    {
      images: ["/src/modules/gym-management/assets/images/mat.png"],
      description:
        "- Crunch tradicional.\n- Elevar el torso sin despegar la zona lumbar.\n- Exhalar al subir.",
      equipment: ["Colchoneta"],
    },
  ],
  Cuádriceps: [
    {
      images: ["/src/modules/gym-management/assets/images/barra.jpg"],
      description:
        "- Sentadillas con barra.\n- Piernas al ancho de los hombros.\n- Bajar hasta formar ángulo de 90°.",
      equipment: ["Barra", "Discos", "Jaula de sentadillas"],
    },
  ],
  Isquiotibiales: [
    {
      images: ["/src/modules/gym-management/assets/images/mancuernas.png"],
      description:
        "- Peso muerto con piernas rígidas.\n- Flexión mínima de rodillas.\n- Bajada lenta y espalda recta.",
      equipment: ["Mancuernas", "Barra"],
    },
  ],
  Glúteos: [
    {
      images: ["/src/modules/gym-management/assets/images/mat.png"],
      description:
        "- Puente de glúteo.\n- Pies apoyados en el suelo, elevar cadera apretando glúteos.",
      equipment: ["Colchoneta", "Disco (opcional)"],
    },
  ],
};

export default function RoutinesPage() {
  const navigate = useNavigate();
  const [selectedMuscle, setSelectedMuscle] = React.useState<string | null>(null);

  return (
    <div className="p-4">
      {/* Encabezado negro con título blanco */}
      <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <h1 className="text-lg font-semibold">Rutinas</h1>
      </div>

      {/* Tarjetas negras con texto blanco */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-white p-4 rounded-b-lg">
        {muscleGroups.map((muscle) => (
          <div
            key={muscle.name}
            onClick={() => setSelectedMuscle(muscle.name)}
            className="bg-black text-white rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={muscle.img}
              alt={muscle.name}
              className="w-20 h-20 object-contain mb-2"
            />
            <span className="text-center font-semibold">{muscle.name}</span>
          </div>
        ))}
      </div>
      {selectedMuscle && (
        <RoutineDetailModal
          muscleGroup={selectedMuscle}
          onClose={() => setSelectedMuscle(null)}
        />
      )}
    </div>
  );
}

// Modal para ver detalles de la rutina
const RoutineDetailModal = ({
  muscleGroup,
  onClose,
}: {
  muscleGroup: string;
  onClose: () => void;
}) => {
  const routineExercises = routinesByMuscle[muscleGroup] || [];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (routineExercises.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-black mb-4">
            Músculo: {muscleGroup}
          </h2>
          <p className="text-gray-700">
            No hay rutinas disponibles para este grupo muscular.
          </p>
        </div>
      </div>
    );
  }
  const currentExercise = routineExercises[currentIndex];

  const prevExercise = () => {
    setCurrentIndex((i) => (i === 0 ? routineExercises.length - 1 : i - 1));
  };

  const nextExercise = () => {
    setCurrentIndex((i) => (i === routineExercises.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-black mb-4">
          Músculo: {muscleGroup} - Ejercicio {currentIndex + 1} de {routineExercises.length}
        </h2>

        {/* Imágenes */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {currentExercise.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`rutina-${index}`}
              className="w-40 h-40 object-contain border rounded"
            />
          ))}
        </div>

        {/* Detalles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 flex-grow">
          <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Descripción ejercicio</h3>
            <pre className="whitespace-pre-wrap">{currentExercise.description}</pre>
          </div>

          <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Maquinaria necesaria</h3>
            <ul className="space-y-1">
              {currentExercise.equipment.map((eq, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <input type="checkbox" checked readOnly />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Flechas de navegación - centradas abajo */}
        <div className="mt-6 flex justify-center space-x-8">
          <button
            onClick={prevExercise}
            className="text-black hover:text-gray-700 text-2xl font-semibold"
            aria-label="Ejercicio anterior"
          >
            &#8592;
          </button>
          <button
            onClick={nextExercise}
            className="text-black hover:text-gray-700 text-2xl font-semibold"
            aria-label="Ejercicio siguiente"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};