import React from 'react';
import CalendarViewStudent from '../student/calendarViewStudent';
import CalendarViewTeacher from '../teacher/calendarViewTeacher';

interface CalendarViewMainProps {
  userId: string;
  userRole: 'student' | 'teacher' | 'instructor';
  instructorId?: string; 
}

const CalendarViewMain: React.FC<CalendarViewMainProps> = ({ 
  userId, 
  userRole, 
  instructorId 
}) => {

  switch (userRole) {
    case 'student':
      return <CalendarViewStudent userId={userId} />;
    
    case 'teacher':
    case 'instructor':
      if (!instructorId) {
        return (
          <div className="text-center p-8 bg-red-50 rounded-md">
            <p className="text-lg text-red-600">
              Error: ID de instructor requerido para mostrar el calendario del profesor.
            </p>
          </div>
        );
      }
      return <CalendarViewTeacher instructorId={instructorId} />;
    
    default:
      return (
        <div className="text-center p-8 bg-red-50 rounded-md">
          <p className="text-lg text-red-600">
            Error: Rol de usuario no válido.
          </p>
        </div>
      );
  }
};

export default CalendarViewMain;