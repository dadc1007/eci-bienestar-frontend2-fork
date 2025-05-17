import React from 'react';
import Layout from '../../common/layout/layout';

const MainRooms: React.FC = () => {
  return (
    <Layout
      moduleColor="#0066cc"
      userEmail="usuario@ejemplo.com"
      onLogout={() => console.log("Cerrando sesión")}
      onNotificationsClick={() => console.log("Notificaciones")}
      activeModule="Inicio"
    >
      {/* Contenido principal de la página */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <p>Este es el contenido de la página de inicio.</p>
      </div>
    </Layout>
  );
};

export default MainRooms;
