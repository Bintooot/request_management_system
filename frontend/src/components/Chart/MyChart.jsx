import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MyChart = () => {
  const data = [
    { Month: "January", Number_of_chicks: 4000 },
    { Month: "February", Number_of_chicks: 3000 },
    { Month: "March", Number_of_chicks: 2000 },
    { Month: "April", Number_of_chicks: 2780 },
    { Month: "May", Number_of_chicks: 1890 },
    { Month: "June", Number_of_chicks: 2390 },
    { Month: "July", Number_of_chicks: 3490 },
    { Month: "August", Number_of_chicks: 3490 },
    { Month: "September", Number_of_chicks: 3490 },
    { Month: "October", Number_of_chicks: 3490 },
    { Month: "November", Number_of_chicks: 3490 },
    { Month: "December", Number_of_chicks: 3490 },
  ];
  return (
    <>
      <div>
        <ResponsiveContainer width="100%" className="text-sm" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Number_of_chicks" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MyChart;
