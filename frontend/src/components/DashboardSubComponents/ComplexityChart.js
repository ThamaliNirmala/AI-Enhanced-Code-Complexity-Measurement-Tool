import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ComplexityChart = ({ cyclomatic, density }) => {
  const complexityData = [
    { name: "Cyclomatic Complexity", value: cyclomatic },
    { name: "Cyclomatic Density", value: density },
  ];
  return (
    <BarChart width={500} height={300} data={complexityData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};
export default ComplexityChart;
