import React, { useState } from 'react';
import { Assistance } from '../../services/classesService';
import ClassEnrollmentStatus from './classEnrollmentStatus';
import CancelEnrollmentButton from './cancelEnrollmentButton';

interface EnrolledClassesListProps {
  classes: Assistance[];
  onCancelEnrollment: (classId: string) => Promise<boolean>;
  isLoading: boolean;
}

const EnrolledClassesList: React.FC<EnrolledClassesListProps> = ({ 
  classes, 
  onCancelEnrollment,
  isLoading
}) => {
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');

  if (isLoading) {
    return <div className="flex justify-center p-8">Cargando clases...</div>;
  }

  if (classes.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-lg text-gray-500">No estás inscrito a ninguna clase actualmente.</p>
        <p className="mt-2 text-gray-500">Revisa las clases disponibles para inscribirte.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${viewType === 'list' ? 'bg-purple-900 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewType('list')}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Lista
          </span>
        </button>
        <button
          className={`px-4 py-2 ${viewType === 'calendar' ? 'bg-purple-900 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewType('calendar')}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Calendario
          </span>
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow">
        <table className="min-w-full">
          <thead className="bg-purple-900 text-white">
            <tr>
              <th className="py-4 px-6 text-left">Nombre</th>
              <th className="py-4 px-6 text-left">Tipo</th>
              <th className="py-4 px-6 text-left">Instructor</th>
              <th className="py-4 px-6 text-left">Horario</th>
              <th className="py-4 px-6 text-left">Estado</th>
              <th className="py-4 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {classes.map((classItem) => (
              <tr key={classItem.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">{classItem.className}</td>
                <td className="py-4 px-6">{classItem.classType}</td>
                <td className="py-4 px-6">{classItem.instructor}</td>
                <td className="py-4 px-6">{classItem.schedule}</td>
                <td className="py-4 px-6">
                  <ClassEnrollmentStatus isConfirmed={classItem.confirmed} />
                </td>
                <td className="py-4 px-6 text-center">
                  <CancelEnrollmentButton 
                    classId={classItem.classId} 
                    onCancel={onCancelEnrollment} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Anterior
        </button>
        <div className="flex items-center">
          <span className="px-3 py-1 bg-purple-900 text-white rounded-md">1</span>
          <span className="px-3 py-1 mx-1">2</span>
          <span className="px-3 py-1 mx-1">3</span>
          <span className="px-3 py-1 mx-1">...</span>
          <span className="px-3 py-1 mx-1">67</span>
          <span className="px-3 py-1 mx-1">68</span>
        </div>
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-md">
          Siguiente
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EnrolledClassesList;