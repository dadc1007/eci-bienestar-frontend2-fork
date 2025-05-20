import React, { FC, useState } from 'react';
import ModuleTabs from '../../components/common/moduleTabs';
import CalendarView from '../../components/common/calendarView';
import BackButton from '../../components/common/backButton';
import EnrolledClassesList from '../../components/student/enrolledClassesList';
import { useAllClasses } from '../../hooks/useClasses';



const EnrolledClassesPage: FC = () => {
  const token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJyb2xlcyI6WyJTVFVERU5UIl0sImlhdCI6MTc0Nzc0NDE3NSwiZXhwIjoxNzQ3NzQ1OTc1fQ.hzK9XrlztUqW3VOfG-ShaSfI2B6qdY2RBsAfgHiybaaqMPxvVjr4KfTRKjSZJwU0eti2K7QxwgK6s6vJ97Cktw";
  const userRole = 'student';

  const studentTabs = [
    { label: 'Mis clases inscritas', path: '/modules/extracurricular/estudiante/clases-inscritas', roles: ['student'] },
    { label: 'Clases disponibles', path: '/modules/extracurricular/estudiante/clases-disponibles', roles: ['student'] },
    { label: 'Historial de asistencia', path: '/modules/extracurricular/historial-asistencia', roles: ['student'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Encabezado */}
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Clases Inscritas</h1>
      </div>

      {/* Tabs principales */}
      <ModuleTabs tabs={studentTabs} userRole={userRole} />
    </div>
  );
};

export default EnrolledClassesPage;