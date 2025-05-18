import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

const muscleGroups = [
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
  const routineExercises = [
    {
      images: [
        "/images/rutina1.png",
        "/images/rutina2.png",
        "/images/rutina3.png",
      ],
      description: `- Flexionarse en un ángulo de 45 grados.\n- Los brazos están a la altura de los hombros.\n- Las mancuernas tienen un peso que sea soportable.\n- Flexionar los brazos a 45 grados y luego extenderlos hacia abajo.`,
      equipment: ["Dumbbells", "Flatbed", "Yoga"],
    },
    {
      images: [
        "/images/rutina4.png",
        "/images/rutina5.png",
      ],
      description: `- Ejercicio alternativo para el mismo músculo.\n- Mantener postura recta.\n- Respiración controlada.`,
      equipment: ["Barbell", "Smith Machine"],
    },
    {
      images: [
        "/images/rutina6.png",
      ],
      description: `- Otro ejercicio para variar.\n- Realizar movimientos lentos y controlados.`,
      equipment: ["TRX", "Mat"],
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

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