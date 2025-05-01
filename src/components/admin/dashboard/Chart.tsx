'use client'

import {useEffect, useState} from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";

interface SaleI {
  day: string;
  total: number;
}

interface ChartProps {
  data: {
    date: string;
    total: number;
  }[];
}

const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Chart = ({data}: ChartProps) => {
  const [sale, setSale] = useState<SaleI[]>([]);

  useEffect(() => {
    if (data?.length) {
      const formatted = data.map(i => {
        const dayIndex = new Date(i.date).getDay();
        return {
          day: dayMap[dayIndex],
          total: +i.total.toFixed(2),
        };
      });

      setSale(formatted);
    }
  }, [data]);

  if (sale.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sales Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={sale}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
          <XAxis dataKey="day" stroke="#6b7280" tick={{fontSize: 14}}/>
          <YAxis stroke="#6b7280" tick={{fontSize: 14}}/>
          <Tooltip
            contentStyle={{backgroundColor: "#ffffff", borderRadius: 10, borderColor: "#e5e7eb"}}
            labelStyle={{color: "#6b7280", fontWeight: 500}}
            formatter={(value: any) => `$${value.toLocaleString('en-US')}`}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            fill="url(#colorTotal)"
            strokeWidth={3}
            activeDot={{r: 6}}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
