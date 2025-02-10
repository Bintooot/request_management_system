import { React, useCallback, useEffect, useState } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import Banner from "../Banner/Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

// Initialize socket outside the component to prevent multiple instances
const socket = io("http://localhost:5000");

const Header = ({ toggleHandler, username, role, handleLogout }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const token = localStorage.getItem("authToken");

  // Toggle Logout Button Visibility
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // Fetch Notification Count
  const fetchNotificationCount = useCallback(async () => {
    try {
      const response = await axios.get("/api/user/notifications-count", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotificationCount(response.data.unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [token]); // Depend on `token` to prevent unnecessary re-fetching

  useEffect(() => {
    if (!token || role !== "user") return;

    fetchNotificationCount();

    socket.on("updateRequest", fetchNotificationCount);
    socket.on("unRead", fetchNotificationCount);
    socket.on("updateApprovedRequest", fetchNotificationCount);
    socket.on("updateInquiry", fetchNotificationCount);

    return () => {
      socket.off("updateRequest", fetchNotificationCount);
      socket.off("unRead", fetchNotificationCount);
      socket.off("updateApprovedRequest", fetchNotificationCount);
      socket.off("updateInquiry", fetchNotificationCount);
    };
  }, [role, token, fetchNotificationCount]);

  return (
    <div className="flex justify-between px-5 items-center border-b shadow-lg bg-slate-300 h-20">
      {/* Left Side: Hamburger Menu & Banner */}
      <div className="flex items-center gap-3">
        <GiHamburgerMenu
          fontSize={30}
          cursor="pointer"
          onClick={toggleHandler}
          className="md:hidden"
        />
        <Banner />
      </div>

      {/* Right Side: Notifications & User Profile */}
      <div className="flex gap-2 items-center">
        {role === "user" && (
          <div className="relative">
            <NavLink to="/notification">
              <FaBell className="text-2xl" />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notificationCount}
                </span>
              )}
            </NavLink>
          </div>
        )}

        {/* User Profile Section */}
        <div
          className="p-2 cursor-pointer flex gap-3 items-center md:text-sm sm:text-sm"
          onClick={toggleLogout}
        >
          <FaUser fontSize={20} />
          <p className="md:block hidden">{username}</p>
        </div>

        {/* Logout Button */}
        {showLogout && (
          <div className="mt-2">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
