import React, { useState } from "react";
import Header from "../Header/Header";
import { NavLink, Outlet } from "react-router-dom";
import { LuClipboardCheck, LuClock, LuUserCog } from "react-icons/lu";
import { MdDashboard, MdOutlinePendingActions } from "react-icons/md";

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);

  const togglehandler = () => {
    setOpen(!Open);
  };

  const name = "Ben Aniasco";

  return (
    <>
      <div>
        <header>
          <Header togglehandler={togglehandler} />
          <nav>
            <div className="p-2 h-32 bg-green-500">
              <div className="p-2">
                <div className="mx-6 text-white">
                  <h1 className="text-3xl font-semibold my-2">
                    Welcome! <span>{name}.</span>
                  </h1>
                </div>
              </div>
              {/* Hamburger Icon (visible on medium screens and smaller) */}
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
                    className={({ isActive }) =>
                      `flex flex-col items-center cursor-pointer ${
                        isActive ? "text-green-500" : "hover:text-green-500"
                      }`
                    }
                  >
                    <li className="flex flex-col  items-center hover:text-green-500 cursor-pointer">
                      <MdDashboard className="w-auto h-8" />
                      Dashboard
                    </li>
                  </NavLink>
                  <NavLink
                    to="/request-pending"
                    className={({ isActive }) =>
                      `flex flex-col items-center cursor-pointer ${
                        isActive ? "text-green-500" : "hover:text-green-500"
                      }`
                    }
                  >
                    <li className="flex-col flex cursor-pointer">
                      <MdOutlinePendingActions className="w-auto h-8" />
                      Request Pending
                    </li>
                  </NavLink>
                  <NavLink
                    to="/approved-request"
                    className={({ isActive }) =>
                      `flex flex-col items-center cursor-pointer ${
                        isActive ? "text-green-500" : "hover:text-green-500"
                      }`
                    }
                  >
                    <li className="flex flex-col items-center hover:text-green-500 cursor-pointer">
                      <LuClipboardCheck className="w-auto h-8" />
                      Approved Request
                    </li>
                  </NavLink>
                  <NavLink
                    to="/history"
                    className={({ isActive }) =>
                      `flex flex-col items-center cursor-pointer ${
                        isActive ? "text-green-500" : "hover:text-green-500"
                      }`
                    }
                  >
                    <li className="flex flex-col items-center hover:text-green-500 cursor-pointer">
                      <LuClock className="w-auto h-8" />
                      History Records
                    </li>
                  </NavLink>
                  <NavLink
                    to="/accounts"
                    className={({ isActive }) =>
                      `flex flex-col items-center cursor-pointer ${
                        isActive ? "text-green-500" : "hover:text-green-500"
                      }`
                    }
                  >
                    <li className="flex flex-col items-center hover:text-green-500 cursor-pointer">
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
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
