import React from 'react';
import { useNavigate } from 'react-router-dom';
import recreationalImage from '../../assets/images/recreational-rooms.jpg';

const MainRooms: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="p-4">
      {/* Imagen con texto encima */}
      <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
        <img
          src={recreationalImage}
          alt="Salas de Recreación"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold bg-black/40">
          Bienvenido al sistema de Reserva de Salas de Bienestar
        </h1>
      </div>

      {/* Contenido debajo: texto a la izquierda, botones a la derecha */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Texto a la izquierda */}
        <p className="text-gray-700 text-xl max-w-xl">
          Este espacio permite a los miembros de la comunidad reservar salas de descanso
          y acceder al préstamo de elementos que hacen parte de las salas. También pueden 
          consultar o cancelar las reservas realizadas.
        </p>

        {/* Botones a la derecha */}
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/main-rooms/reserve-room')}
          className="bg-recreation-primary text-white text-xl px-10 py-4 rounded-lg hover:bg-recreation-primary-light transition">
            Reservar Sala
          </button>
          <button
            onClick={() => navigate('./myReservations.tsx')} 
          className="bg-gray-300 text-black-800 text-xl px-8 py-4 rounded-lg hover:bg-gray-400 transition">
            Ver Mis Reservas
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainRooms;
