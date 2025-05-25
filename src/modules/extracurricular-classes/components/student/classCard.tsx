import React from 'react';
import { Class } from '../../services/classesService';

interface ClassCardProps {
  classData: Class;
  onEnroll: (classId: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, onEnroll }) => {
  // Format the schedule from sessions if available
  const formattedSchedule = classData.sessions
    ? classData.sessions.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ')
    : `${classData.startTime} - ${classData.endTime}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4 flex flex-col h-full"> {/* Añadido flex flex-col h-full */}
        <div className="flex-grow"> {/* Contenedor para el contenido que crece */}
          <h3 className="text-xl font-bold mb-2">{classData.name}</h3>
          <div className="text-sm text-gray-600 mb-2">
            <p><span className="font-medium">Instructor:</span> {classData.instructorId}</p>
            <p><span className="font-medium">Horario:</span> {formattedSchedule}</p>
            <p><span className="font-medium">Ubicación:</span> Coliseo</p>
            <p><span className="font-medium">Capacidad:</span> {classData.maxStudents} estudiantes</p>
          </div>
        </div>
        
        <div className="text-center mt-4"> {/* Contenedor centrado para el botón */}
          <button
            onClick={() => onEnroll(classData.id)}
            className="bg-[#362550] hover:bg-purple-900 text-white py-2 px-6 rounded-md inline-block"
          >
            Inscribirse
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;