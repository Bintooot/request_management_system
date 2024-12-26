import React from "react";
import MyChart from "../../components/Chart/MyChart";
import Navbar from "../../components/Navigation/Navbar";
import CardMenu from "../../components/Card/CardMenu";
import RequestChart from "../../components/Chart/RequestChart";
import { RiUserReceived2Fill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="gap-5 md:mt-16 md:mx-16 p-3">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
          <div>
            <CardMenu
              title="Recieved Request"
              number="10"
              icon={<RiUserReceived2Fill />}
            />
          </div>
          <div>
            <CardMenu
              title="Pending Request"
              number="10"
              icon={<MdOutlinePendingActions />}
            />
          </div>
          <div>
            <CardMenu
              title="Canceled Requests"
              number="10"
              icon={<MdCancelPresentation />}
            />
          </div>
          <div>
            <CardMenu
              title="Completed Deliveries"
              number="10"
              icon={<AiOutlineFileDone />}
            />
          </div>
        </div>
        <div className="md:flex flex-row gap-5">
          <div className="md:w-2/4 w-full  border-2 shadow-lg my-2 rounded-lg p-5">
            <h1>
              <strong>REQUEST SUMMARY</strong>
            </h1>
            <div className="my-24">
              <RequestChart />
            </div>
          </div>
          <div className="w-full border-2 shadow-lg my-2 rounded-lg p-5">
            <h1>
              <strong>DELIVERED CHICKS SUMMARY</strong>
            </h1>
            <div className="flex md:text-md text-sm font-semibold justify-around items-center p-5">
              <div className="text-center">
                <p className="text-2xl">10000</p>
                <h3>Daily Delivered</h3>
              </div>
              <div className="text-center">
                <p className="text-2xl">10000</p>
                <h3>Monthly Delivered</h3>
              </div>
              <div className="text-center">
                <p className="text-2xl">10000</p>
                <h3>Yearly Delivered</h3>
              </div>
            </div>
            <MyChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
