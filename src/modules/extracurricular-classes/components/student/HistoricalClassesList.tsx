import React, { useState, useEffect } from 'react';
import { useHistoricalAssistances } from '../../hooks/useAttendance';
import { getClassById, Class } from '../../services/classesService';
import Pagination from '../common/pagination';
import { formatSchedule } from '../../utils/timeFormatUtils';

interface ClassDetails {
  name: string;
  type: string;
  instructor: string;
  schedule: string;
}

const HistoricalClassesList: React.FC<{ userId: string }> = ({ userId }) => {
  const [classDetailsMap, setClassDetailsMap] = useState<Record<string, ClassDetails>>({});
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});
  
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Usamos el hook para obtener el historial de asistencias
  const {
    data: assistances,
    isLoading,
    error,
    isEmpty,
    refetch
  } = useHistoricalAssistances(userId);

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
    return <div className="flex justify-center p-8">Cargando historial...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-md">
        <p className="text-lg text-red-600">Error al cargar el historial: {error.message}</p>
      </div>
    );
  }

  if (isEmpty || !assistances || assistances.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-lg text-gray-500">No hay registros en tu historial.</p>
        <p className="mt-2 text-gray-500">Tus futuras asistencias aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Historial de Asistencias</h2>
      </div>
      
      <div className="bg-white rounded-lg overflow-hidden shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#362550]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Clase</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Horario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Asistió
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {new Date(assistance.startTime).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </>
  );
};

export default HistoricalClassesList;