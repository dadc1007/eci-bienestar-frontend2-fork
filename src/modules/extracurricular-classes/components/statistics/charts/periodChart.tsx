import React, { FC, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PeriodChart: FC = () => {
  const data = [
    { period: 'Enero', percentage: 85 },
    { period: 'Febrero', percentage: 92 },
    { period: 'Marzo', percentage: 78 },
    { period: 'Abril', percentage: 88 },
    { period: 'Mayo', percentage: 95 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="text-slate-600">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="period" 
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#cbd5e1' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#cbd5e1' }}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="percentage" 
          fill="url(#colorGradient)" 
          radius={[8, 8, 0, 0]}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PeriodChart;