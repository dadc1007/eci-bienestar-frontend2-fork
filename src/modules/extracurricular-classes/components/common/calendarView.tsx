import React, { useState, useEffect } from 'react';
import { usePendingInscriptions } from '../../hooks/useEnrollment';
import { getClassById, Class } from '../../services/classesService';
import { formatSchedule } from '../../utils/timeFormatUtils';

const CalendarView = ({ userId }: { userId: string }) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [classDetailsMap, setClassDetailsMap] = useState<Record<string, any>>({});
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});

  // Use the hook to get pending inscriptions
  const {
    data: assistances,
    isLoading,
    error,
    isEmpty,
  } = usePendingInscriptions(userId);

  // Function to format time (24h -> 12h)
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Get additional class details
  useEffect(() => {
    if (!assistances || assistances.length === 0) return;

    const fetchClassDetails = async () => {
      for (const assistance of assistances) {
        try {
          setLoadingDetails(prev => ({ ...prev, [assistance.classId]: true }));

          const classInfo = await getClassById(assistance.classId);

          setClassDetailsMap(prev => ({
            ...prev,
            [assistance.classId]: {
              name: classInfo.name,
              type: classInfo.type || 'No disponible',
              instructor: classInfo.instructorId || 'N/A',
              schedule: formatSchedule(classInfo, formatTime),
              days: classInfo.sessions?.map(session => session.day) || [],
              sessions: classInfo.sessions || []
            }
          }));
        } catch (error) {
          console.error(`Error loading class ${assistance.classId}:`, error);
          setClassDetailsMap(prev => ({
            ...prev,
            [assistance.classId]: {
              name: `Clase ${assistance.classId}`,
              type: 'No disponible',
              instructor: 'N/A',
              schedule: 'N/A',
              location: 'N/A',
              days: [],
              sessions: []
            }
          }));
        } finally {
          setLoadingDetails(prev => ({ ...prev, [assistance.classId]: false }));
        }
      }
    };

    fetchClassDetails();
  }, [assistances]);

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

  if (isEmpty || !assistances || assistances.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-lg text-gray-500">No estás inscrito a ninguna clase actualmente.</p>
        <p className="mt-2 text-gray-500">Revisa las clases disponibles para inscribirte.</p>
      </div>
    );
  }

  // Convert the data to the format expected by the calendar
  const classes = assistances.flatMap(assistance => {
    const details = classDetailsMap[assistance.classId] || {
      name: 'Cargando...',
      type: 'Cargando...',
      instructor: 'Cargando...',
      schedule: 'Cargando...',
      location: 'Cargando...',
      days: [],
      sessions: []
    };

    // Create an entry for each session
    return details.sessions.map((session: { day: any; startTime: string; endTime: string; }) => ({
      id: `${assistance.classId}-${session.day}`,
      classId: assistance.classId,
      name: details.name,
      type: details.type,
      instructor: details.instructor,
      day: session.day,
      startTime: session.startTime ? formatTime(session.startTime) : '',
      endTime: session.endTime ? formatTime(session.endTime) : '',
      location: details.location,
      color: getRandomColor(),
      status: assistance.confirm
    }));
  });

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
      const blockHeight = ((duration / 60) * 6); // Aumentado de 4 a 6 para más espacio
      const offset = ((start - dayStart) / 60) * 6; // Aumentado de 4 a 6 para coincidir

      return (
        <div
          key={c.id}
          className={`${c.color} absolute left-1 right-1 rounded-md p-2 text-sm shadow-sm overflow-hidden`}
          style={{
            top: `${offset}rem`,
            height: `${blockHeight}rem`,
            margin: '0 2px' // Pequeño margen para no cubrir las líneas
          }}
        >
          <div className="font-semibold truncate">{c.name}</div>
          <div className="text-xs truncate">{c.type}</div>
          <div className="text-xs truncate">{c.instructor}</div>
          <div className="text-xs truncate">{c.startTime} - {c.endTime}</div>
          <div className="text-xs truncate">
            {c.status ? 'Confirmado' : 'Por confirmar'}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Semana actual y navegación (igual que antes) */}

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
      <td className="arelative align-top border-l border-gray-300 p-0">
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
function getRandomColor() {
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