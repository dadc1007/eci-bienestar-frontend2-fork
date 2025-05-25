import React from 'react';

export interface CalendarClass {
  id: string;
  classId: string;
  name: string;
  type: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  location?: string;
  color: string;
  status?: boolean;
}

interface CalendarViewProps {
  classes: CalendarClass[];
  isLoading: boolean;
  error?: Error | null;
  title: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  classes, 
  isLoading, 
  error, 
  title 
}) => {
  // Function to format time (24h -> 12h)
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Cargando clases...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-md">
        <p className="text-lg text-red-600">Error al cargar las clases: {error.message}</p>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-lg text-gray-500">No hay clases disponibles actualmente.</p>
      </div>
    );
  }

  const daysOfWeek = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 8 + i;
    return `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "am" : "pm"}`;
  });

  // Function to convert time to minutes since midnight
  const toMinutes = (timeStr: string): number => {
    if (!timeStr) return 0;
    const [hourMin, meridian] = timeStr.toLowerCase().split(' ');
    const [hour, min] = hourMin.split(':').map(Number);
    const totalHour = meridian === 'pm' && hour !== 12 ? hour + 12 : hour === 12 && meridian === 'am' ? 0 : hour;
    return totalHour * 60 + (min || 0);
  };

  const renderClassBlocks = (day: string) => {
    const filtered = classes.filter(c => c.day === day);
    return filtered.map(c => {
      const start = toMinutes(c.startTime);
      const end = toMinutes(c.endTime);
      const duration = end - start;

      const dayStart = 8 * 60;
      const blockHeight = ((duration / 60) * 6);
      const offset = ((start - dayStart) / 60) * 6;

      return (
        <div
          key={c.id}
          className={`${c.color} absolute left-1 right-1 rounded-md p-2 text-sm shadow-sm overflow-hidden`}
          style={{
            top: `${offset}rem`,
            height: `${blockHeight}rem`,
            margin: '0 2px'
          }}
        >
          <div className="font-semibold truncate">{c.name}</div>
          <div className="text-xs truncate">{c.type}</div>
          <div className="text-xs truncate">{c.instructor}</div>
          <div className="text-xs truncate">{c.startTime} - {c.endTime}</div>
          {c.status !== undefined && (
            <div className="text-xs truncate">
              {c.status ? 'Confirmado' : 'Por confirmar'}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {/* Tabla del horario */}
      <div className="flex-1 overflow-auto px-2 pb-4 relative">
        <div className="overflow-hidden" style={{ borderRadius: '30px', boxShadow: '0 0 0 1px #362550' }}>
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="text-white" style={{ backgroundColor: '#362550' }}>
                <th className="p-3 text-left" style={{ borderTopLeftRadius: '30px' }}>Hora</th>
                {daysOfWeek.slice(1).map((day, index) => (
                  <th key={index} className="p-3 text-left" style={{ borderTopRightRadius: index === daysOfWeek.length - 2 ? '30px' : '0' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Columna de horas */}
                <td className="relative align-top border-l border-gray-300 p-0">
                  <div className="relative h-[48rem]">
                    {timeSlots.map((time, idx) => (
                      <div 
                        key={idx}
                        className="absolute w-full h-24 flex items-center px-2 border-b border-gray-300 bg-white"
                        style={{ top: `${idx * 6}rem` }}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </td>

                {/* Columnas de días */}
                {daysOfWeek.slice(1).map((day, i) => (
                  <td key={i} className="relative align-top border-l border-gray-300 p-0">
                    <div className="relative h-[48rem]">
                      {/* Líneas horizontales que cruzan todas las columnas */}
                      {timeSlots.map((_, idx) => (
                        <div
                          key={`line-${idx}`}
                          className="absolute w-full border-t border-gray-300"
                          style={{ 
                            top: `${idx * 6}rem`,
                            left: 0,
                            right: 0
                          }}
                        />
                      ))}
                      {/* Bloques de clase */}
                      {renderClassBlocks(day)}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate random colors for classes
export function getRandomColor() {
  const colors = [
    'bg-teal-400',
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-pink-400',
    'bg-indigo-400'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default CalendarView;