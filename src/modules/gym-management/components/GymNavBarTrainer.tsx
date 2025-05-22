import GymNavBar from "./GymNavBar";

const trainerTabs = [
  { label: "Inicio", path: "trainerHome" },
  { label: "Rutinas", path: "trainer-routines" },
  { label: "Ejercicios", path: "exercises" },
  { label: "Sesiones", path: "sessions" },
  { label: "Reporte", path: "trainer-generate-report" },
  { label: "Progresos", path: "progress" }
];

const GymNavBarTrainer = () => (
  <GymNavBar
    tabs={trainerTabs}
    ariaLabel="Navegación del entrenador"
  />
);

export default GymNavBarTrainer;