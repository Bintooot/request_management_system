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
        console.error("Error fetching pending inquiries data:", error);
      }
    };
    fetchTotalPendingRequest();
    fetchTotalPendingInquiry();
  });
  return (
    <>
      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CardMenu
          title="Inquiry Awaiting Viewed"
          number={totalPendingInquiry}
          icon={<RiUserReceived2Fill />}
        />
        <CardMenu
          title="Requests Awaiting Approval"
          number={totalPendingRequest}
          icon={<MdOutlinePendingActions />}
        />
        <CardMenu
          title="Canceled Requests"
          number="10"
          icon={<MdCancelPresentation />}
        />
        <CardMenu
          title="Completed Actions"
          number="10"
          icon={<AiOutlineFileDone />}
        />
      </div>

      {/* Chart Section */}
      <div className="flex flex-col sm:flex-row gap-5 mt-6">
        {/* Request Summary */}
        <div className="flex-1 border-2 shadow-lg rounded-lg p-5 bg-white">
          <h1 className="text-lg font-bold mb-4">REQUEST SUMMARY</h1>
          <div className="w-full h-full max-h-[400px]">
            <RequestChart />
          </div>
        </div>

        {/* Delivered Summary */}
        <div className="flex-1 border-2 shadow-lg rounded-lg p-5 bg-white">
          <h1 className="text-lg font-bold mb-4">DELIVERED CHICKS SUMMARY</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <div className="text-center">
              <p className="text-2xl font-bold">10,000</p>
              <h3 className="text-sm">Daily Delivered</h3>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">10,000</p>
              <h3 className="text-sm">Monthly Delivered</h3>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">10,000</p>
              <h3 className="text-sm">Yearly Delivered</h3>
            </div>
          </div>
          <div className="w-full h-full max-h-[400px]">
            <MyChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
