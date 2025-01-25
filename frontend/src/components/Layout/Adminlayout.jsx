import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LuClipboardCheck, LuClock, LuUserCog } from "react-icons/lu";
import { MdDashboard, MdOutlinePendingActions } from "react-icons/md";
import axios from "axios";

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState(null);

  const navigate = useNavigate();

  const togglehandler = () => {
    setOpen(!Open);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");
    const expirationTime = localStorage.getItem("tokenExpirationTime");

    if (token && expirationTime) {
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpirationTime");
        navigate("/login");
      }
    }
  };

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(
        "http://localhost:5000/api/admin/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  useEffect(() => {
    fetchAdminData();
    checkTokenExpiration();
  }, []);

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
                    <>
                      Welcome! <span>{adminData?.username || "Admin"}</span>
                    </>
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
                  onClick={handleLinkClick} // Close menu on click
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
                  onClick={handleLinkClick} // Close menu on click
                  className={({ isActive }) =>
                    `flex flex-col items-center cursor-pointer ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  <li className="flex flex-col items-center">
                    <MdOutlinePendingActions className="w-auto h-8" />
                    Request Pending
                  </li>
                </NavLink>
                <NavLink
                  to="/approved-request"
                  onClick={handleLinkClick} // Close menu on click
                  className={({ isActive }) =>
                    `flex flex-col items-center cursor-pointer ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  <li className="flex flex-col items-center">
                    <LuClipboardCheck className="w-auto h-8" />
                    Approved Request
                  </li>
                </NavLink>
                <NavLink
                  to="/history"
                  onClick={handleLinkClick} // Close menu on click
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
                  onClick={handleLinkClick} // Close menu on click
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
