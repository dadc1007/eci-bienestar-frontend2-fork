import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './common/layout/navbar';
import Dashboard from './common/dashboard';
import GymRoutes from "@/modules/gym-management/GymRoutes";

// Componentes de módulos
const NavbarWrapper: React.FC<{ children: React.ReactNode, moduleColor: string }> = ({ children, moduleColor }) => {
  return (
    <>
      <Navbar moduleColor={moduleColor} />
      {children}
    </>
  );
};

const ModuleTemplate: React.FC<{ title: string, color: string }> = ({ title, color }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Contenido del módulo {title} - En desarrollo</p>
      </div>
    </div>
  </div>
);

function App() {
  
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Aquí iría la lógica de logout
  };

  const handleNotificationsClick = () => {
    console.log('Mostrando notificaciones...');
    // Aquí iría la lógica para mostrar notificaciones
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={
            <>
              <Navbar moduleColor="#990000" /> {/* Color por defecto para el dashboard */}
              <Dashboard />
            </>
          } />
          
          {/* Módulos */}
          <Route 
            path="/modules/health/*" 
            element={
              <NavbarWrapper moduleColor="#0078B4">
                <ModuleTemplate title="Gestión de Turnos de Salud" color="#0078B4" />
              </NavbarWrapper>
            } 
          />
          <Route 
            path="/modules/recreation/*" 
            element={
              <NavbarWrapper moduleColor="#0E7029">
                <ModuleTemplate title="Gestión de Salas Recreativas" color="#0E7029" />
              </NavbarWrapper>
            } 
          />
          <Route 
            path="/modules/extracurricular/*" 
            element={
              <NavbarWrapper moduleColor="#362550">
                <ModuleTemplate title="Clases Extracurriculares" color="#362550" />
              </NavbarWrapper>
            } 
          />
          <Route 
            path="/modules/sports/*" 
            element={
              <NavbarWrapper moduleColor="#5B1F00">
                <ModuleTemplate title="Préstamos Deportivos" color="#5B1F00" />
              </NavbarWrapper>
            } 
          />
          <Route 
            path="/modules/gym-management/*" 
            element={
              <NavbarWrapper moduleColor="#1a1a1a">
                <GymRoutes />
              </NavbarWrapper>
            }
          />
          <Route 
            path="/modules/statistics/*" 
            element={
              <NavbarWrapper moduleColor="#990000">
                <ModuleTemplate title="Estadísticas y Reportes" color="#990000" />
              </NavbarWrapper>
            } 
          />
          <Route 
            path="/modules/users/*" 
            element={
              <NavbarWrapper moduleColor="#990000">
                <ModuleTemplate title="Gestión de Usuarios" color="#990000" />
              </NavbarWrapper>
            } 
          />
          
          {/* Ruta de fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;