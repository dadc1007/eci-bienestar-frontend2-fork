import React, { useState, useEffect } from 'react';
import { usePendingInscriptions, useDeleteInscription } from '../../hooks/useEnrollment';
import { getClassById, Class } from '../../services/classesService';
import ClassEnrollmentStatus from './classEnrollmentStatus';
import CancelEnrollmentButton from './cancelEnrollmentButton';
import Pagination from '../common/pagination';
import { formatSchedule } from '../../utils/timeFormatUtils';

interface ClassDetails {
  name: string;
  type: string;
  instructor: string;
  schedule: string;
}

const EnrolledClassesList: React.FC<{ userId: string }> = ({ userId }) => {
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');
  const [classDetailsMap, setClassDetailsMap] = useState<Record<string, ClassDetails>>({});
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});
  
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Usamos el hook para obtener las inscripciones pendientes
  const {
    data: assistances,
    isLoading,
    error,
    isEmpty,
    refetch
  } = usePendingInscriptions(userId);
  
  // Hook para eliminar inscripciones
  const {
    mutate: deleteInscription,
    isLoading: isDeleting
  } = useDeleteInscription();

  // Función para formatear la hora (24h -> 12h)
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Obtener detalles adicionales de las clases
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
              schedule: formatSchedule(classInfo, formatTime)
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
              schedule: 'N/A'
            }
          }));
        } finally {
          setLoadingDetails(prev => ({ ...prev, [assistance.classId]: false }));
        }
      }
    };
    
    fetchClassDetails();
    
    // Calcular el total de páginas
    const itemsPerPage = 6;
    setTotalPages(Math.ceil(assistances.length / itemsPerPage));
  }, [assistances]);

  const handleCancelEnrollment = async (classId: string) => {
    try {
      await deleteInscription(userId, classId);
      refetch(); // Actualizar la lista después de eliminar
      return true;
    } catch (err) {
      console.error('Error al cancelar inscripción:', err);
      return false;
    }
  };

  // Función para la paginación
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calcular los elementos actuales
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assistances ? assistances.slice(indexOfFirstItem, indexOfLastItem) : [];

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

  return (
    <div className="mt-6">
      {/* Selector de vista */}
      <div className="flex mb-6">
        <button
          className={`flex items-center px-4 py-2 rounded-l-lg ${viewType === 'list' ? 'bg-[#362550] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setViewType('list')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Vista de lista
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-r-lg ${viewType === 'calendar' ? 'bg-[#362550] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setViewType('calendar')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Vista de calendario
        </button>
      </div>
      
      {viewType === 'list' ? (
        <>
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#362550]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Clase</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Horario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((assistance) => {
                  const details = classDetailsMap[assistance.classId] || {
                    name: 'Cargando...',
                    type: 'Cargando...',
                    instructor: 'Cargando...',
                    schedule: 'Cargando...'
                  };
                  const isClassLoading = loadingDetails[assistance.classId];
                  return (
                    <tr key={assistance.id} className={`hover:bg-gray-50 transition-colors ${isClassLoading ? 'opacity-70' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {isClassLoading ? 'Cargando...' : details.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {isClassLoading ? 'Cargando...' : details.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {isClassLoading ? 'Cargando...' : details.instructor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {isClassLoading ? 'Cargando...' : details.schedule}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ClassEnrollmentStatus isConfirmed={assistance.confirm} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <CancelEnrollmentButton
                          classId={assistance.classId}
                          onCancel={handleCancelEnrollment}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Componente de paginación */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Vista de Calendario</h3>
          <p className="text-gray-500">La vista de calendario estará disponible pronto.</p>
        </div>
      )}
    </div>
  );
};

export default EnrolledClassesList;