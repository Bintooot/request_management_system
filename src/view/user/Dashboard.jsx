import React from "react";
import CardMenu from "../../components/Card/CardMenu";
import {
  RiMailSendLine,
  RiTimeLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Sample data for chart
  const chartData = [
    { name: "Jan", requests: 4 },
    { name: "Feb", requests: 3 },
    { name: "Mar", requests: 7 },
    { name: "Apr", requests: 5 },
  ];

  // Sample activity data
  const recentActivity = [
    { id: 1, type: "Document Request", status: "Pending", date: "2024-03-20" },
    { id: 2, type: "Certificate", status: "Completed", date: "2024-03-19" },
    { id: 3, type: "Transcript", status: "In Progress", date: "2024-03-18" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="p-6 bg-white shadow-sm rounded-lg m-6">
        <h1 className="font-bold text-3xl text-gray-800">Welcome Back, Ben!</h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-6">
        <CardMenu
          title="Pending Requests"
          number="5"
          icon={<RiTimeLine className="text-orange-500" />}
          className="bg-orange-50"
        />
        <CardMenu
          title="Completed Requests"
          number="8"
          icon={<RiCheckboxCircleLine className="text-green-500" />}
          className="bg-green-50"
        />
        <CardMenu
          title="Total Requests"
          number="13"
          icon={<RiMailSendLine className="text-blue-500" />}
          className="bg-blue-50"
        />
      </div>

      {/* Chart and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Request Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={500} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          activity.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
