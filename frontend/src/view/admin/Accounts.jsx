import React, { useEffect, useState } from "react";
import CardMenu from "../../components/Card/CardMenu";
import { FaUserPlus } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import Sidebar from "../../components/Navigation/Sidebar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import AdminProfileCard from "../../components/Card/AdminProfileCard";

const Accounts = () => {
  const { adminData } = useOutletContext() || { adminData: null };
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchTotalUser = async () => {
      try {
        const response = await axios.get("/api/admin/total-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        setUserCount(response.data.response);
      } catch (error) {
        console.error("Error fetching total of User:", error);
      }
    };
    const fetchTotalAdmin = async () => {
      try {
        const response = await axios.get("/api/admin/total-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        setAdminCount(response.data.response);
      } catch (error) {
        console.error("Error fetching total of Admin:", error);
      }
    };
    fetchTotalAdmin();
    fetchTotalUser();
  });
  return (
    <>
      <div className="gap-3  p-5 md:flex    ">
        <div className="md:w-1/3  mb-5">
          <Sidebar />
        </div>
        <div className="flex-col w-full">
          <div className="flex justify-around items-center gap-2 mb-5 grow">
            <div className="w-1/2">
              <CardMenu
                icon={<FaUserPlus />}
                title="Users Accounts"
                number={userCount}
              />
            </div>
            <div className="w-1/2">
              <CardMenu
                icon={<RiAdminFill />}
                title="Admin Accounts"
                number={adminCount}
              />
            </div>
          </div>

          <div className="border-2 shadow-lg rounded-lg p-5 w-full">
            <AdminProfileCard
              id={adminData?.accountid || "No ID available"}
              username={adminData?.username || "No username available"}
              email={adminData?.email || "No email available"}
              namelabel="Admin ID:"
              address={adminData?.address || "No address available"}
              contactnumber={
                adminData?.contactnumber || "No contact number available"
              }
              createdAt={adminData?.createdAt || "No creation date available"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
