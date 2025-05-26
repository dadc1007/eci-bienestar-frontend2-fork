import React, { FC } from 'react';
import ModuleTabs from '../../components/common/moduleTabs';
import BackButton from '../../components/common/backButton';
import CalendarViewMain from '../../components/common/calendarViewMain';

const ScheduledClassesPage: FC = () => {
  const instructorId = "Martin Cantor";
  const userRole = 'teacher';

  const teacherTabs = [
    { label: 'Mis clases programadas', path: '/modules/extracurricular/profesor/clases-programadas', roles: ['teacher'] },
    { label: 'Registro de asistencia', path: '/modules/extracurricular/profesor/registro-de-asistencia', roles: ['teacher'] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Encabezado */}
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Mis clases programadas </h1>
      </div>

      {/* Tabs principales */}
      <ModuleTabs tabs={teacherTabs} userRole={userRole} />
      
      <div className="bg-white rounded-b-lg rounded-tr-lg shadow p-6 border-t-0 border-2 border-gray-200">
        <CalendarViewMain userId={instructorId} userRole={userRole} instructorId={instructorId}/>
      </div>
    </div>
  );
};

export default ScheduledClassesPage;