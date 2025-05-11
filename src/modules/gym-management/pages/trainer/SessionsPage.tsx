import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const schedule = [
  { day: 'Lunes', time: '10:00 AM', label: 'Sesión gimnasio' },
  { day: 'Lunes', time: '1:00 PM', label: 'Sesión gimnasio' },
  { day: 'Martes', time: '10:00 AM', label: 'Sesión gimnasio' },
  { day: 'Miércoles', time: '10:00 AM', label: 'Sesión gimnasio' },
  { day: 'Jueves', time: '10:00 AM', label: 'Sesión gimnasio' },
  { day: 'Viernes', time: '10:00 AM', label: 'Sesión gimnasio' },
  { day: 'Viernes', time: '10:00 AM', label: 'Sesión gimnasio' },
];

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const hours = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

// Hook para detectar pantalla móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export default function GymSchedule() {
  const isMobile = useIsMobile();

  return (
    <div className="max-w-6xl mx-auto mt-10 border rounded-lg shadow-md overflow-hidden">
      <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sesiones creadas</h2>
        <button className="bg-white text-black rounded-full p-1 hover:bg-gray-200">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {isMobile ? (
        <div className="p-4 space-y-4">
          {schedule.map((session, idx) => (
            <div key={idx} className="bg-black text-white p-4 rounded relative">
              <p className="font-semibold">{session.label}</p>
              <p className="text-sm">{session.day} - {session.time}</p>
              <button className="absolute top-2 right-2 hover:text-gray-300">
                <PencilSquareIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="w-24 border px-2 py-2 text-left">Hora</th>
                {days.map((day) => (
                  <th key={day} className="border px-2 py-2 text-left">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  <td className="border px-2 py-2 font-medium">{hour}</td>
                  {days.map((day) => {
                    const session = schedule.find(s => s.day === day && s.time === hour);
                    return (
                      <td key={`${day}-${hour}`} className="border px-2 py-2 align-top">
                        {session && (
                          <div className="bg-black text-white p-2 rounded relative">
                            <span>{session.label}</span>
                            <button className="absolute top-1 right-1 hover:text-gray-300">
                              <PencilSquareIcon className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}