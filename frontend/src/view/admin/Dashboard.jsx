import React from "react";
import MyChart from "../../components/Chart/MyChart";
import CardMenu from "../../components/Card/CardMenu";
import RequestChart from "../../components/Chart/RequestChart";
import { RiUserReceived2Fill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions, MdCancelPresentation } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CardMenu
          title="Recieved Request"
          number="10"
          icon={<RiUserReceived2Fill />}
        />
        <CardMenu
          title="Pending Request"
          number="10"
          icon={<MdOutlinePendingActions />}
        />
        <CardMenu
          title="Canceled Requests"
          number="10"
          icon={<MdCancelPresentation />}
        />
        <CardMenu
          title="Completed Deliveries"
          number="10"
          icon={<AiOutlineFileDone />}
        />
      </div>

      {/* Chart Section */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        {/* Request Summary */}
        <div className="flex-1 border-2 shadow-lg rounded-lg p-5 bg-white">
          <h1 className="text-lg font-bold mb-4">REQUEST SUMMARY</h1>
          <div>
            <RequestChart />
          </div>
        </div>

        {/* Delivered Summary */}
        <div className="flex-1 border-2 shadow-lg rounded-lg p-5 bg-white">
          <h1 className="text-lg font-bold mb-4">DELIVERED CHICKS SUMMARY</h1>
          <div className="flex justify-around items-center mb-5">
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
          <div>
            <MyChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
