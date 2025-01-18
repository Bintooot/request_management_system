import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Number_of_Request: 130 },
  { name: "February", Number_of_Request: 130 },
  { name: "March", Number_of_Request: 130 },
  { name: "April", Number_of_Request: 130 },
  { name: "May", Number_of_Request: 130 },
  { name: "June", Number_of_Request: 120 },
  { name: "July", Number_of_Request: 90 },
  { name: "August", Number_of_Request: 40 },
  { name: "September", Number_of_Request: 110 },
  { name: "October", Number_of_Request: 140 },
  { name: "November", Number_of_Request: 130 },
  { name: "December", Number_of_Request: 190 },
];

const RequestChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Number_of_Request" barSize={15} fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RequestChart;
