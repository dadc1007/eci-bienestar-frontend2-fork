import React, { FC,useState } from 'react';
import ModuleTabs from '../../components/common/moduleTabs';
import CalendarView from '../../components/common/calendarView';
import BackButton from '../../components/common/backButton';
import EnrolledClassesList from '../../components/student/enrolledClassesList';
import { useEnrolledClasses } from '../../hooks/useClasses';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCalendarAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EnrolledClassesPage: FC = () => {
  const userRole = 'student';
  const userId = "currentUser123";
  const { enrolledClasses, loading, error, cancelClassEnrollment } = useEnrolledClasses(userId);
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const studentTabs  = [
    { label: 'Mis clases inscritas', path: '/modules/extracurricular/estudiante/clases-inscritas',roles: ['student'] },
    { label: 'Clases disponibles', path: '/modules/extracurricular/estudiante/clases-disponibles',roles: ['student'] },
    { label: 'Historial de asistencia', path: '/modules/extracurricular/historial-asistencia',roles: ['student'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Encabezado */}
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Mis Clases Inscritas</h1>
      </div>

      {/* Tabs principales */}
      <ModuleTabs tabs={studentTabs} userRole={userRole}/>

      {/* Errores */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Sub-tabs: Lista | Calendario */}
      <div className="flex gap-6 my-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 border-b-2 ${view === 'list' ? 'border-purple-800 font-semibold' : 'border-transparent text-gray-500'}`}
          onClick={() => setView('list')}
        >
          <FontAwesomeIcon icon={faList} className="w-4 h-4" />
          Lista
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 border-b-2 ${view === 'calendar' ? 'border-purple-800 font-semibold' : 'border-transparent text-gray-500'}`}
          onClick={() => setView('calendar')}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
          Calendario
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="mt-4">
        {view === 'list' ? (
          <EnrolledClassesList
            classes={enrolledClasses}
            onCancelEnrollment={cancelClassEnrollment}
            isLoading={loading}
          />
        ) : (
          <CalendarView classes={enrolledClasses} />
        )}
      </div>
    </div>
  );
};

export default EnrolledClassesPage;
