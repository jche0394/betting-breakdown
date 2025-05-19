import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ProfitChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl mb-4 p-4">
      <h3 className="font-semibold text-lg mb-2">Profit by Lay Amount</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="lay" label={{ value: 'Lay $', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft' }} />
          <ChartTooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="winProfit"
            name="Win Profit"
            stroke="#38bdf8" // light blue
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="placeProfit"
            name="Place Profit"
            stroke="#4ade80" // green
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="loseProfit"
            name="Lose Profit"
            stroke="#f87171" // red
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
