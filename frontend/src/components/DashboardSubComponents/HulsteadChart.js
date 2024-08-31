import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HalsteadChart = ({ bugs, difficulty, effort, volume }) => {
  const halsteadData = [
    { name: "Bugs", value: bugs },
    { name: "Difficulty", value: difficulty },
    { name: "Effort", value: effort },
    { name: "Volume", value: volume },
  ];

  console.log("halsteadData", halsteadData)
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={halsteadData}
        dataKey="value"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {halsteadData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
export default HalsteadChart;
