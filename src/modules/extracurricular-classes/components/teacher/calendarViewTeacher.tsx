import React, { useState, useEffect } from 'react';
import { getAllClasses, Class } from '../../services/classesService';
import CalendarView, { CalendarClass, getRandomColor } from '../common/calendarView';

interface CalendarViewTeacherProps {
  instructorId: string;
}

const CalendarViewTeacher: React.FC<CalendarViewTeacherProps> = ({ instructorId }) => {
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [processedClasses, setProcessedClasses] = useState<CalendarClass[]>([]);

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  useEffect(() => {
    const fetchTeacherClasses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const classes = await getAllClasses();
        
        const teacherClasses = classes.filter(
          classItem => classItem.instructorId === instructorId
        );

        setAllClasses(teacherClasses);
      } catch (err) {
        console.error('Error fetching teacher classes:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (instructorId) {
      fetchTeacherClasses();
    }
  }, [instructorId]);

  useEffect(() => {
    if (!allClasses || allClasses.length === 0) {
      setProcessedClasses([]);
      return;
    }

    const calendarClasses = allClasses.flatMap(classItem => {
      if (!classItem.sessions || classItem.sessions.length === 0) {
        return [];
      }

      return classItem.sessions.map(session => ({
        id: `${classItem.id}-${session.day}`,
        classId: classItem.id,
        name: classItem.name,
        type: classItem.type || 'No especificado',
        instructor: 'Tú', 
        day: session.day,
        startTime: session.startTime ? formatTime(session.startTime) : '',
        endTime: session.endTime ? formatTime(session.endTime) : '',
        location: 'Por definir', 
        color: getRandomColor(),
      }));
    });

    setProcessedClasses(calendarClasses);
  }, [allClasses]);

  if (!isLoading && (!allClasses || allClasses.length === 0)) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-lg text-gray-500">No tienes clases asignadas actualmente.</p>
        <p className="mt-2 text-gray-500">Contacta al administrador para obtener clases asignadas.</p>
      </div>
    );
  }

  return (
    <CalendarView
      classes={processedClasses}
      isLoading={isLoading}
      error={error}
      title="Mi Horario - Instructor"
    />
  );
};

export default CalendarViewTeacher;