import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faClock, faUsers, faDumbbell, faRunning, faHeartbeat } from "@fortawesome/free-solid-svg-icons";

const TrainerMainPage = () => {
  const todaySessions = [
    {
      id: 1,
      date: "2023-10-01",
      day: "Domingo",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      capacity: 20,
      currentReservations: 15,
    },
    {
      id: 2,
      date: "2023-10-01",
      day: "Domingo",
      startTime: "1:00 PM",
      endTime: "2:00 PM",
      capacity: 25,
      currentReservations: 20,
    },
    {
      id: 3,
      date: "2023-10-01",
      day: "Domingo",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      capacity: 30,
      currentReservations: 25,
    },
  ];

  const routines = [
    { id: 1, name: "Rutina de fuerza", icon: faDumbbell },
    { id: 2, name: "Rutina de cardio", icon: faRunning },
    { id: 3, name: "Rutina de flexibilidad", icon: faHeartbeat },
  ];

  const sessions = [
    { id: 1, name: "Sesión de lunes" },
    { id: 2, name: "Sesión de miércoles" },
    { id: 3, name: "Sesión de viernes" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 space-y-6">
        {/* Sesiones de Hoy */}
        <div className="p-6 bg-black text-white rounded-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Sesiones de Hoy</h2>
          <div className="space-y-4">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-lg bg-gray-800 text-white shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold">
                    <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
                    {session.day}, {session.date}
                  </p>
                  <p className="text-sm font-semibold">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {session.startTime} - {session.endTime}
                  </p>
                  <p className="text-sm font-semibold text-green-400">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    Reservas: {session.currentReservations}/{session.capacity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección dividida en dos columnas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Columna izquierda: Rutinas */}
          <div className="p-4 bg-black text-white rounded-lg">
            <h2 className="text-xl font-bold text-yellow-400">Rutinas</h2>
            <div className="space-y-4 mt-4">
              {routines.map((routine) => (
                <div
                  key={routine.id}
                  className="p-4 rounded-lg bg-gray-800 text-white shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-700"
                >
                  <p className="text-sm font-semibold">{routine.name}</p>
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={routine.icon} className="text-lg text-yellow-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: Sesiones */}
          <div className="p-4 bg-black text-white rounded-lg">
            <h2 className="text-xl font-bold text-yellow-400">Sesiones</h2>
            <div className="space-y-4 mt-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-lg bg-gray-800 text-white shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-700"
                >
                  <p className="text-sm font-semibold">{session.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerMainPage;