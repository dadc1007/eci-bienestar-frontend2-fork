import React, { useState } from 'react';
import { Class } from '../../services/classesService';
import TeacherClassCard from './teacherClassCard';
import { useNavigate } from 'react-router-dom';

interface TeacherClassesListProps {
  classes: Class[];
  categoryTitle: string;
  instructorId: string;
}

const TeacherClassesList: React.FC<TeacherClassesListProps> = ({ 
  classes, 
  categoryTitle,
  instructorId 
}) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const handleTakeAttendance = (classId: string) => {
    navigate(`/modules/extracurricular/profesor/asistencia/${classId}`, {
      state: { classId, instructorId }
    });
  };

  return (
    <div className="mb-6">
      <div 
        className="bg-[#362550] text-white p-4 rounded-t-[30px] flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-xl font-bold">{categoryTitle}</h2>
        <button className="focus:outline-none">
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {expanded && (
        <div className="bg-gray-50 p-4 rounded-b-[30px] grid grid-cols-1 md:grid-cols-3 gap-4 border border-[#362550]">
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <TeacherClassCard 
                key={classItem.id} 
                classData={classItem} 
                onTakeAttendance={handleTakeAttendance} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No hay clases programadas en esta categoría
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherClassesList;