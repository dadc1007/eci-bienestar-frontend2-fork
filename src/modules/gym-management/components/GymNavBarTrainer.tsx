import GymNavbar from "./GymNavbar";

const trainerTabs = [
  { label: "Rutinas", path: "trainer-routines" },
  { label: "Ejercicios", path: "exercises" },
  { label: "Sesiones", path: "sessions" },
  { label: "Reporte", path: "trainer-generate-report" },
  { label: "Progresos", path: "progress" },
];

const GymNavBarTrainer = () => (
  <GymNavbar
    tabs={trainerTabs}
    homePath="/modules/gym-management/trainer"
    ariaLabel="Navegación del entrenador"
  />
);

export default GymNavBarTrainer;