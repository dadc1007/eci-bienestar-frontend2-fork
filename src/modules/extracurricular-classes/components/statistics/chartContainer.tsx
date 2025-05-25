import React, { FC, ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
}

const ChartContainer: FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
        {title}
      </h3>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;