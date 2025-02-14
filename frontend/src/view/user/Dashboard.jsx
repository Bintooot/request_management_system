import React, { useEffect, useState } from "react";
import CardMenu from "../../components/Card/CardMenu";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import StatusTracking from "../../components/StatusTracking/StatusTracking";
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
import { format } from "date-fns";

const Dashboard = () => {
  const { user } = useOutletContext() || { user: null };
  const [totalRequest, setTotalRequest] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [visibleRows, setVisibleRows] = useState(5);
  const [chartData, setChartData] = useState([
    { name: "Loading", requests: 0 }, // Default value to show loading state
  ]);
  const [latestRequest, setLatestRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading user data...
        </h2>
      </div>
    );
  }

  const token = localStorage.getItem("authToken");

  const fetchTotalInquiry = async () => {
    try {
      const response = await axios.get("/api/user/total-inquiry", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInquiryCount(response.data.response);
    } catch (error) {
      console.error("Error fetching user inquiry:", error);
    }
  };

  const fetchTotalRequest = async () => {
    try {
      const response = await axios.get("/api/user/total-request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalRequest(response.data.response);
    } catch (error) {
      console.error("Error fetching total request:", error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get("/api/user/recent-activity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecentActivity(response.data.activities);
    } catch (error) {
      console.error("Error fetching user activity:", error);
    }
  };

  const fetchLatestData = async () => {
    try {
      const response = await axios.get(`/api/user/current-tracking-request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLatestRequest(response.data.data);
    } catch (error) {
      console.error("Error fetching user requests:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestData = async () => {
    try {
      const response = await axios.get("/api/user/request-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = response.data.map((item) => ({
        name: new Date(item.date).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        requests: item.count,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  useEffect(() => {
    fetchLatestData();
    fetchTotalRequest();
    fetchRequestData();
    fetchRecentActivity();
    fetchTotalInquiry();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="p-6 bg-white shadow-sm rounded-lg m-6">
        <h1 className="font-bold text-3xl text-gray-800">
          Welcome Back, {user.username || "User"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 m-6">
        <div className="col-span-2">
          <StatusTracking data={latestRequest} />
        </div>
        <CardMenu
          title="Total Inquiry"
          number={inquiryCount}
          icon={<RiCheckboxCircleLine className="text-white" />}
          className="bg-green-50"
        />
        <CardMenu
          title="Total Requests"
          number={totalRequest}
          icon={<RiMailSendLine className="text-white" />}
          className="bg-blue-50"
        />
      </div>

      {/* Chart and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Request Timeline</h2>
          {loading ? (
            <LoadingSpinner />
          ) : chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500">
              <h1>No data available for the request timeline.</h1>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div
            className={`overflow-y-auto ${
              visibleRows ? "max-h-[400px]" : "max-h-[200px]"
            } transition-all duration-300`}
          >
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Source
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
                {recentActivity.slice(0, visibleRows).map((activity, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.type || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          activity.status === "Approved" ||
                          activity.status === "Viewed"
                            ? "bg-blue-100 text-blue-800"
                            : activity.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : activity.status === "Out for Delivery"
                            ? "bg-orange-100 text-orange-800"
                            : activity.status === "Completed" ||
                              activity.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.createdAt
                        ? format(new Date(activity.createdAt), "MMMM dd, yyyy")
                        : "Unknown date"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {recentActivity.length > visibleRows && (
            <div className="mt-4">
              <button
                onClick={() => setVisibleRows((prev) => (prev === 5 ? 10 : 5))}
                className="text-blue-500 underline"
              >
                {visibleRows === 5 ? "Show More" : "Show Less"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
