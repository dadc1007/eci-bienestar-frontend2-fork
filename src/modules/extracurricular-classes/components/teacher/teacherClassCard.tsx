import React from 'react';
import { Class } from '../../services/classesService';

interface TeacherClassCardProps {
  classData: Class;
  onTakeAttendance: (classId: string) => void;
}

const TeacherClassCard: React.FC<TeacherClassCardProps> = ({ classData, onTakeAttendance }) => {
  const formattedSchedule = classData.sessions
    ? classData.sessions.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ')
    : `${classData.startTime} - ${classData.endTime}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4 flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2">{classData.name}</h3>
          <div className="text-sm text-gray-600 mb-2">
            <p><span className="font-medium">Horario:</span> {formattedSchedule}</p>
            <p><span className="font-medium">Ubicación:</span> Coliseo</p>
            <p><span className="font-medium">Capacidad:</span> {classData.maxStudents} estudiantes</p>
            <p><span className="font-medium">Estudiantes inscritos:</span> {classData.enrolledStudents || 0}</p>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <button
            onClick={() => onTakeAttendance(classData.id)}
            className="bg-[#362550] hover:bg-purple-900 text-white py-2 px-6 rounded-md inline-block"
          >
            Tomar Asistencia
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassCard;