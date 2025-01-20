import React, { useEffect, useState } from "react";
import MyChart from "../../components/Chart/MyChart";
import CardMenu from "../../components/Card/CardMenu";
import RequestChart from "../../components/Chart/RequestChart";
import { RiUserReceived2Fill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions, MdCancelPresentation } from "react-icons/md";
import axios from "axios";

const Dashboard = () => {
  const [totalPendingInquiry, setTotalPendingInquiry] = useState(0);
  const [totalPendingRequest, setTotalPendingRequest] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchTotalPendingInquiry = async () => {
      try {
        const response = await axios.get("/api/admin/total-pending-inquiry", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotalPendingInquiry(response.data.response);
      } catch (error) {
        console.error("Error fetching pending inquiries data:", error);
      }
    };

    const fetchTotalPendingRequest = async () => {
      try {
        const response = await axios.get("/api/admin/total-pending-request", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotalPendingRequest(response.data.response);
      } catch (error) {
        console.error("Error fetching pending request data:", error);
      }
    };

    fetchTotalPendingRequest();
    fetchTotalPendingInquiry();
  }, []);

  return (
    <div className="p-4 space-y-8">
      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardMenu
          title="Inquiry Awaiting Viewed"
          number={totalPendingInquiry}
          icon={<RiUserReceived2Fill />}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800"
        />
        <CardMenu
          title="Requests Awaiting Approval"
          number={totalPendingRequest}
          icon={<MdOutlinePendingActions />}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
        />
        <CardMenu
          title="Canceled Requests"
          number="10"
          icon={<MdCancelPresentation />}
          className="bg-red-100 hover:bg-red-200 text-red-800"
        />
        <CardMenu
          title="Completed Actions"
          number="10"
          icon={<AiOutlineFileDone />}
          className="bg-green-100 hover:bg-green-200 text-green-800"
        />
      </div>

      {/* Chart Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Request Summary */}
        <div className="flex-1 bg-white border shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Request Summary
          </h2>
          <div className="w-full h-[300px]">
            <RequestChart />
          </div>
        </div>

        {/* Delivered Summary */}
        <div className="flex-1 bg-white border shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Delivered Chicks Summary
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">10,000</p>
              <p className="text-sm text-gray-600">Daily Delivered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">10,000</p>
              <p className="text-sm text-gray-600">Monthly Delivered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">10,000</p>
              <p className="text-sm text-gray-600">Yearly Delivered</p>
            </div>
          </div>
          <div className="w-full">
            <MyChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
