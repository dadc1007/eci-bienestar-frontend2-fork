import { NavLink, Outlet, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Mis reservas", path: "reservations" },
  { label: "Reservar", path: "booking" },
  { label: "Rutinas", path: "routines" },
  { label: "Registro progreso", path: "progress" },
  { label: "Evolución", path: "evolution" },
];

const GymNavbarStudent = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/modules/gym-management/student");
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <nav
        className="flex flex-col sm:flex-row flex-wrap justify-center mt-6 gap-2 sm:gap-4 w-full max-w-4xl"
        aria-label="Navegación del estudiante"
      >
        {/* Botón de inicio */}
        <button
          onClick={handleHomeClick}
          className="w-full sm:w-auto px-4 py-2 rounded-full font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition text-center"
        >
          Inicio
        </button>

        {/* Tabs de navegación */}
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `w-full sm:w-auto text-center px-4 py-2 rounded-full font-medium transition ${
                isActive
                  ? "bg-black text-white shadow"
                  : "text-black hover:bg-gray-200"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <main className="w-full max-w-6xl mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default GymNavbarStudent;