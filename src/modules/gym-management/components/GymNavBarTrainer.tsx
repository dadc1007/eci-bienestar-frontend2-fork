import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { label: "Rutinas", path: "routines" },
  { label: "Ejercicios", path: "exercises" },
  { label: "Sesiones", path: "sessions" },
  { label: "Reservas", path: "reservations" },
  { label: "Progresos", path: "progress" },
  
];

const GymNavbarTrainer = () => {
  return (
    <div className="flex flex-col items-center">
      <nav className="flex flex-wrap justify-center mt-4 gap-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium ${
                isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <div className="w-full max-w-6xl mt-6 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default GymNavbarTrainer;