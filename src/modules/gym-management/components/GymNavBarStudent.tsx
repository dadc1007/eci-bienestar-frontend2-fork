import GymNavbar from "./GymNavbar";

const studentTabs = [
  { label: "Inicio", path: "studentHome" },
  { label: "Mis reservas", path: "reservations" },
  { label: "Reservar", path: "booking" },
  { label: "Rutinas", path: "routines" },
  { label: "Registro progreso", path: "progress" },
  { label: "Evolución", path: "evolution" }
];

const GymNavBarStudent = () => (
  <GymNavbar
    tabs={studentTabs}
    ariaLabel="Navegación del estudiante"
  />
);

export default GymNavBarStudent;