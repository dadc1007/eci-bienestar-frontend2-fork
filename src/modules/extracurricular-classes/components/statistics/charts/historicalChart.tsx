import React, { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const HistoricalChart: FC = () => {
  const data = [
    { month: 'Sep 2024', percentage: 78 },
    { month: 'Oct 2024', percentage: 82 },
    { month: 'Nov 2024', percentage: 85 },
    { month: 'Dic 2024', percentage: 79 },
    { month: 'Ene 2025', percentage: 88 },
    { month: 'Feb 2025', percentage: 92 },
    { month: 'Mar 2025', percentage: 87 },
    { month: 'Abr 2025', percentage: 90 },
    { month: 'May 2025', percentage: 95 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="text-slate-600 font-medium">{label}</p>
          <p className="text-purple-600 font-semibold">{`Asistencia: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 10, fill: '#64748b' }}
          axisLine={{ stroke: '#cbd5e1' }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#cbd5e1' }}
          tickFormatter={(value) => `${value}%`}
          domain={[70, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="percentage"
          stroke="#8b5cf6"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorArea)"
        />
        <Line
          type="monotone"
          dataKey="percentage"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default HistoricalChart;