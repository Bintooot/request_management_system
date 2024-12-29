import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="border-2 shadow-lg rounded-lg p-5 ">
      <aside>
        <div className="p-2 font-semibold">
          <h1>ACCOUNTS MANAGEMENT</h1>
        </div>
        <ul className="cursor-pointer">
          <NavLink to="/user-account">
            {({ isActive }) => (
              <li
                className={`p-5 rounded-lg my-2 ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "hover:bg-green-500 hover:text-white"
                }`}
              >
                User Account
              </li>
            )}
          </NavLink>
          <NavLink to="/admin-account">
            {({ isActive }) => (
              <li
                className={`p-5 rounded-lg my-2 ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "hover:bg-green-500 hover:text-white"
                }`}
              >
                Admin Accounts
              </li>
            )}
          </NavLink>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
