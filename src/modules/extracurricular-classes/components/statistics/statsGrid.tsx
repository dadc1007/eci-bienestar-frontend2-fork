import React, { FC } from 'react';
import StatCard from './statCard';
import { TrendingUp, CheckCircle, XCircle, Users } from 'lucide-react';

interface StatData {
  number: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const StatsGrid: FC = () => {
  const statsData: StatData[] = [
    {
      number: '87%',
      label: 'Asistencia Promedio',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-emerald-500 to-green-600'
    },
    {
      number: '142',
      label: 'Clases Confirmadas',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '23',
      label: 'Inasistencias',
      icon: <XCircle className="w-8 h-8" />,
      color: 'from-red-500 to-red-600'
    },
    {
      number: '8',
      label: 'Clases Activas',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          number={stat.number}
          label={stat.label}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;