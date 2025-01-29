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

const MyChart = ({ data }) => {
  return (
    <>
      <div>
        <ResponsiveContainer width="100%" className="text-sm" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_quantity" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MyChart;
