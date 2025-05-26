import React, { FC, useState, useEffect } from 'react';
import ModuleTabs from '../../components/common/moduleTabs';
import BackButton from '../../components/common/backButton';
import TeacherClassesList from '../../components/teacher/TeacherClassesList';
import { Class } from '../../services/classesService';

const AttendanceRegisterPage: FC = () => {
  const userRole = 'teacher';
  const instructorId = 'Martin Cantor';
  
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorClasses = async () => {
      try {
        setLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const mockClasses: Class[] = [
          {
            id: 'class-1',
            name: 'Pintura',
            instructorId: instructorId,
            maxStudents: 20,
            type:'Cultural',
            enrolledStudents: 15,
            startTime: '14:00',
            endTime: '15:30',
            sessions: [
              { day: 'Lunes', startTime: '08:30-', endTime: '10:00' },
              { day: 'Martes', startTime: '08:30-', endTime: '10:00' }
            ]
          },
          {
            id: 'class-2',
            name: 'Tenis para Principiantes',
            instructorId: instructorId,
            maxStudents: 16,
            type:'Deportiva',
            enrolledStudents: 12,
            startTime: '15:00',
            endTime: '16:30',
            sessions: [
              { day: 'Martes', startTime: '10:00-', endTime: '11:30' },
              { day: 'Jueves', startTime: '10:00-', endTime: '11:30' }
            ]
          },
          {
            id: 'class-3',
            name: 'Música Básica',
            instructorId: instructorId,
            maxStudents: 12,
            type:'Cultural',
            enrolledStudents: 10,
            startTime: '16:00',
            endTime: '17:30',
            sessions: [
              { day: 'Jueves', startTime: '8:30-', endTime: '10:00' }
            ]
          },
          {
            id: 'class-4',
            name: 'Comunicación Efectiva',
            instructorId: instructorId,
            maxStudents: 14,
            type:'Desarrollo Humano',
            enrolledStudents: 8,
            startTime: '17:00',
            endTime: '18:30',
            sessions: [
              { day: 'Miércoles', startTime: '10:00', endTime: '11:30' },
              { day: 'Viernes', startTime: '10:00', endTime: '11:30' }
            ]
          }
        ];
        
        setClasses(mockClasses);
      } catch (error) {
        console.error('Error fetching instructor classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorClasses();
  }, [instructorId]);

  const teacherTabs = [
    { label: 'Mis clases programadas', path: '/modules/extracurricular/profesor/clases-programadas', roles: ['teacher'] },
    { label: 'Registro de asistencia', path: '/modules/extracurricular/profesor/registro-de-asistencia', roles: ['teacher'] }
  ];

  // Group classes by sport type
 // Agrupa las clases según el campo type
const groupedClasses = classes.reduce((groups, clase) => {
  const key = clase.type || 'Sin tipo';
  if (!groups[key]) {
    groups[key] = [];
  }
  groups[key].push(clase);
  return groups;
}, {} as Record<string, Class[]>);


  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Registro de asistencia</h1>
      </div>

      {/* Tabs */}
      <ModuleTabs tabs={teacherTabs} userRole={userRole} />

      <div className="bg-white rounded-b-lg rounded-tr-lg shadow p-6 border-t-0 border-2 border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#362550]"></div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Mis Clases</h2>
            </div>

            {classes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clases asignadas</h3>
                <p className="text-gray-500">
                  No tienes clases asignadas para tomar asistencia.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedClasses).map(([category, categoryClasses]) => 
                  categoryClasses.length > 0 && (
                    <TeacherClassesList
                      key={category}
                      classes={categoryClasses}
                      categoryTitle={category}
                      instructorId={instructorId}
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default AttendanceRegisterPage;