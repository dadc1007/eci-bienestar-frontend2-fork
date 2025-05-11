import { NavLink, Outlet, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Rutinas", path: "trainer-routines" },
  { label: "Ejercicios", path: "exercises" },
  { label: "Sesiones", path: "sessions" },
  { label: "Reservas", path: "trainer-reservations" },
  { label: "Progresos", path: "progress" },
];

const GymNavbarTrainer = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/modules/gym-management/trainer");
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <nav
        className="w-full max-w-4xl border-b border-gray-300 mt-6 overflow-x-auto"
        aria-label="Navegación del entrenador"
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 min-w-max">
          {/* Botón de inicio */}
          <button
            onClick={handleHomeClick}
            className="px-4 py-2 text-sm font-semibold rounded-t-xl bg-yellow-500 text-white hover:bg-yellow-600 transition text-center"
            aria-label="Ir al inicio del módulo del entrenador"
          >
            Inicio
          </button>

          {/* Tabs de navegación */}
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${
                  isActive
                    ? "bg-black text-white rounded-t-xl"
                    : "text-black rounded-t-xl hover:bg-gray-200"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="w-full max-w-6xl mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default GymNavbarTrainer;