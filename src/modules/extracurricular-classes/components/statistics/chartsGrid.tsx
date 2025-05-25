import React, { FC } from 'react';
import ChartContainer from './chartContainer';
import PeriodChart from './charts/periodChart';
import ClassChart from './charts/classChart';
import HistoricalChart from './charts/historicalChart';
import AttendanceDistributionChart from './charts/attendanceDistributionChart';

const ChartsGrid: FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <ChartContainer title="Asistencias por Período">
        <PeriodChart />
      </ChartContainer>

      <ChartContainer title="Asistencias por Clase">
        <ClassChart />
      </ChartContainer>

      <ChartContainer title="Histórico Mensual">
        <HistoricalChart />
      </ChartContainer>

      <ChartContainer title="Distribución Asistencias vs Inasistencias">
        <AttendanceDistributionChart />
      </ChartContainer>
    </div>
  );
};

export default ChartsGrid;