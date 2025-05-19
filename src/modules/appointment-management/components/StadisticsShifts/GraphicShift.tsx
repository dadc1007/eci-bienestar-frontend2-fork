// src/components/GraficoTurnosPorFecha/GraficoTurnosPorFecha.tsx

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export type PieData = {
  name: string;
  value: number;
}[];

type Props = {
  data: PieData;
  title: string;
};

const GraphicShift = ({ data, title }: Props) => {
  return (
    <div className="drop-shadow-xl bg-white w-[43vw] border-2 rounded-[12px] p-3 h-[55vh] flex flex-col">
      <h1>{title}</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphicShift;
