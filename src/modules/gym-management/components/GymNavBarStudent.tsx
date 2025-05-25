import GymNavBar from "./GymNavBar";

const studentTabs = [
  { label: "Inicio", path: "home" },
  { label: "Mis reservas", path: "reservations" },
  { label: "Reservar", path: "booking" },
  { label: "Rutinas", path: "routines" },
  { label: "Registro progreso", path: "progress" },
  { label: "Evolución", path: "evolution" }
];

const GymNavBarStudent = () => (
  <GymNavBar
    tabs={studentTabs}
    ariaLabel="Navegación del estudiante"
  />
);

export default GymNavBarStudent;