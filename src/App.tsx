import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./common/dashboard";
import Layout from "./common/layout/layout";
import Login from "./modules/auth/components/LoginForm";
import ForgotPassword from "./modules/auth/components/ForgotPassword";

const MODULE_MAPPING = {
  health: "turnos",
  recreation: "salas",
  extracurricular: "clases",
  sports: "prestamos",
  gym: "seguimiento",
  users: "usuarios",
  statistics: "estadisticas",
};

// Module colors
const moduleColors = {
  health: "#0078B4", // Turnos de Salud
  recreation: "#0E7029", // Salas Recreativas
  extracurricular: "#362550", // Clases Extra
  sports: "#5B1F00", // Préstamos Deportivos
  gym: "#000000", // Gimnasio/Seguimiento
  users: "#990000", // Gestión Usuarios
  statistics: "#990000", // Estadísticas
  default: "#990000", // Color por defecto para dashboard
};

// Componentes de módulos
const ModuleTemplate: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">
        Contenido del módulo {title} - En desarrollo
      </p>
    </div>
  </div>
);

function App() {
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleNotificationsClick = () => {
    console.log("Mostrando notificaciones...");
    // Aquí iría la lógica para mostrar notificaciones
  };

  return (
    <Router>
      <Routes>
        {/* Ruta inicial - login */}
        <Route path="/" element={<Login />} />

        {/* Restaurar contrasena*/}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Ruta principal - Dashboard */}
        <Route
          path="/home"
          element={
            <Layout
              moduleColor={moduleColors.default}
              showSidebar={true}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <Dashboard />
            </Layout>
          }
        />

        {/* Módulo de Salud/Turnos */}
        <Route
          path="/modules/health/*"
          element={
            <Layout
              moduleColor={moduleColors.health}
              activeModule={MODULE_MAPPING.health}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <ModuleTemplate
                title="Gestión de Turnos de Salud"
                color={moduleColors.health}
              />
            </Layout>
          }
        />

        {/* Módulo de Recreación/Salas */}
        <Route
          path="/modules/recreation/*"
          element={
            <Layout
              moduleColor={moduleColors.recreation}
              activeModule={MODULE_MAPPING.recreation}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <ModuleTemplate
                title="Gestión de Salas Recreativas"
                color={moduleColors.recreation}
              />
            </Layout>
          }
        />

        {/* Módulo de Clases Extracurriculares */}
        <Route
          path="/modules/extracurricular/*"
          element={
            <Layout
              moduleColor={moduleColors.extracurricular}
              activeModule={MODULE_MAPPING.extracurricular}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <ModuleTemplate
                title="Clases Extracurriculares"
                color={moduleColors.extracurricular}
              />
            </Layout>
          }
        />

        {/* Módulo de Préstamos Deportivos */}
        <Route
          path="/modules/sports/*"
          element={
            <Layout
              moduleColor={moduleColors.sports}
              activeModule={MODULE_MAPPING.sports}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <ModuleTemplate
                title="Préstamos Deportivos"
                color={moduleColors.sports}
              />
            </Layout>
          }
        />

        {/* Módulo de Gimnasio/Seguimiento */}
        <Route
          path="/modules/gym/*"
          element={
            <Layout
              moduleColor={moduleColors.gym}
              activeModule={MODULE_MAPPING.gym}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <ModuleTemplate
                title="Gestión del Gimnasio"
                color={moduleColors.gym}
              />
            </Layout>
          }
        />

        {/* Módulo de Estadísticas */}
        <Route
          path="/modules/statistics/*"
          element={
            <Layout
              moduleColor={moduleColors.statistics}
              activeModule={MODULE_MAPPING.statistics}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <ModuleTemplate
                title="Estadísticas y Reportes"
                color={moduleColors.statistics}
              />
            </Layout>
          }
        />

        {/* Módulo de Usuarios */}
        <Route
          path="/modules/users/*"
          element={
            <Layout
              moduleColor={moduleColors.users}
              activeModule={MODULE_MAPPING.users}
              onLogout={handleLogout}
              onNotificationsClick={handleNotificationsClick}
              userEmail="administrador@ejemplo.com"
            >
              <ModuleTemplate
                title="Gestión de Usuarios"
                color={moduleColors.users}
              />
            </Layout>
          }
        />

        {/* Ruta de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
