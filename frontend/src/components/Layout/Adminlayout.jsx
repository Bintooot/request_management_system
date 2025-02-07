import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { NavLink, Outlet } from "react-router-dom";
import { LuClipboardCheck, LuClock, LuUserCog } from "react-icons/lu";
import { MdDashboard, MdOutlinePendingActions } from "react-icons/md";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  const togglehandler = () => setOpen(!Open);
  const handleLinkClick = () => setOpen(false);

  const token = localStorage.getItem("authToken");

  const fetchAdminData = async () => {
    try {
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.get("/api/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setAdminData(response.data);
      } else {
        throw new Error("No user data found.");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError(error.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const countNotification = async () => {
    try {
      const response = await axios.get("/api/admin/count-request-inquiries", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendingCount(response.data.response);
      setApprovedCount(response.data.countApprovedRequest);
    } catch (error) {
      console.log("Failed to fetch notification count:", error);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchAdminData();
    countNotification();

    socket.on("newRequest", countNotification);
    socket.on("updateRequest", countNotification);
    socket.on("updateInquiry", countNotification);
    socket.on("updateApprovedRequest", countNotification);

    return () => {
      socket.off("newRequest", countNotification);
      socket.off("updateRequest", countNotification);
      socket.off("updateInquiry", countNotification);
      socket.off("updateApprovedRequest", countNotification);
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  return (
    <div>
      <header>
        <Header
          toggleHandler={togglehandler}
          username={adminData?.username}
          handleLogout={handleLogout}
        />
        <nav>
          <div className="p-2 h-32 bg-green-500">
            <div className="p-2">
              <div className="mx-6 text-white">
                <h1 className="text-3xl font-semibold my-2">
                  {loading ? (
                    "Loading..."
                  ) : error ? (
                    <span className="text-red-500">Error: {error}</span>
                  ) : (
                    <div className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Welcome! <span>{adminData?.username || "Admin"}</span>
                    </div>
                  )}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full md:px-28 absolute top-44">
            {/* Navigation Links */}
            <div
              className={`${
                Open ? "block" : "hidden"
              } md:block text-center shadow-lg rounded-xl bg-white p-5`}
            >
              <ul className="flex flex-col md:flex-row justify-around items-center h-full gap-10">
                <NavLink
                  to="/admin-dashboard"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex flex-col items-center cursor-pointer ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  <li className="flex flex-col items-center">
                    <MdDashboard className="w-auto h-8" />
                    Dashboard
                  </li>
                </NavLink>

                <NavLink
                  to="/request-pending"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex flex-col items-center cursor-pointer ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  <li className="flex flex-col items-center relative">
                    <MdOutlinePendingActions className="w-auto h-8" />
                    {pendingCount > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {pendingCount}
                      </span>
                    )}
                    Request & Inquiry
                  </li>
                </NavLink>

                <NavLink
                  to="/approved-request"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex flex-col items-center cursor-pointer ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  <li className="flex flex-col items-center relative">
                    <LuClipboardCheck className="w-auto h-8" />
                    {approvedCount > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {approvedCount}
                      </span>
                    )}
                    Approved Request
                  </li>
                </NavLink>

                <NavLink
                  to="/history"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex flex-col items-center cursor-pointer ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  <li className="flex flex-col items-center">
                    <LuClock className="w-auto h-8" />
                    History Records
                  </li>
                </NavLink>

                <NavLink
                  to="/accounts"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex flex-col items-center cursor-pointer ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  <li className="flex flex-col items-center">
                    <LuUserCog className="w-auto h-8" />
                    Accounts
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="gap-5 md:mt-16 md:mx-16 p-3">
        <Outlet context={{ adminData }} />
      </main>
    </div>
  );
};

export default AdminLayout;
