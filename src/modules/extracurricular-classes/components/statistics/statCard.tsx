import React, { FC } from 'react';

interface StatCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: FC<StatCardProps> = ({ number, label, icon, color }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          {number}
        </div>
        <div className="text-slate-600 font-medium text-sm">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatCard;