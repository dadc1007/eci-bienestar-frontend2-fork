import React, { useState, useEffect } from 'react';
import { usePendingInscriptions } from '../../hooks/useEnrollment';
import { getClassById } from '../../services/classesService';
import { formatSchedule } from '../../utils/timeFormatUtils';
import CalendarView, { CalendarClass, getRandomColor } from '../common/calendarView';

interface CalendarViewStudentProps {
  userId: string;
}

const CalendarViewStudent: React.FC<CalendarViewStudentProps> = ({ userId }) => {
  const [classDetailsMap, setClassDetailsMap] = useState<Record<string, any>>({});
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});
  const [processedClasses, setProcessedClasses] = useState<CalendarClass[]>([]);

  const {
    data: assistances,
    isLoading,
    error,
    isEmpty,
  } = usePendingInscriptions(userId);

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

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

  useEffect(() => {
    if (!assistances || assistances.length === 0) {
      setProcessedClasses([]);
      return;
    }

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

    setProcessedClasses(classes);
  }, [assistances, classDetailsMap]);

  if (isEmpty || (!isLoading && (!assistances || assistances.length === 0))) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-lg text-gray-500">No estás inscrito a ninguna clase actualmente.</p>
        <p className="mt-2 text-gray-500">Revisa las clases disponibles para inscribirte.</p>
      </div>
    );
  }

  return (
    <CalendarView
      classes={processedClasses}
      isLoading={isLoading}
      error={error}
      title="Mi Horario - Estudiante"
    />
  );
};

export default CalendarViewStudent;