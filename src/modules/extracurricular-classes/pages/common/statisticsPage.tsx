import React, { FC } from 'react';
import ModuleTabs from '../../components/common/moduleTabs';
import BackButton from '../../components/common/backButton';
import StatsGrid from '../../components/statistics/statsGrid';
import ChartsGrid from '../../components/statistics/chartsGrid';

const StatisticsPage: FC = () => {
  const userRole = 'admin';
  
  const allTabs = [
    { label: 'Estadísticas', path: '/modules/extracurricular/estadisticas', roles: ['wellnessStaff', 'admin'] },
    { label: 'Gestión de clases', path: '/modules/extracurricular/gestion-de-clases', roles: ['wellnessStaff', 'admin'] },
    { label: 'Gestión de notificaciones', path: '/modules/extracurricular/gestion-de-notificaciones', roles: ['admin'] },
  ];
  
  const tabs = allTabs.filter(tab => tab.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-5 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="mr-4">
            <BackButton />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Módulo Extracurricular</h1>
        </div>
        
        <div className="mb-[-1px]">
          <ModuleTabs tabs={tabs} userRole={userRole} />
        </div>
        
        <div className="bg-white rounded-b-lg rounded-tr-lg shadow border-t-0 border-2 border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Sistema de gestión y análisis de asistencias académicas</h2>
            
            <StatsGrid />
            
            <ChartsGrid />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;