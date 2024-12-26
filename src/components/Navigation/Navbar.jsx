import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuUserCog } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import logo from "../../assets/Logo.png";
import Avatar from "../Avatar";
import { NavLink } from "react-router-dom";

const name = "Ben Aniasco";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="h-24 w-full px-10 flex p-2 bg-slate-100">
        <div className="flex gap-4  items-center ">
          <img alt="Your Company" src={logo} className=" w-auto md:h-20 h-16" />
          <h1 className="font-semibold  md:text-lg text-sm">
            Chicks Request Management System
          </h1>
        </div>

        <div className="ml-auto gap-2 p-2  flex justify-center items-center">
          <div className="md:hidden flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none p-2"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <FaRegBell className="w-auto h-6 cursor-pointer" />
          <Avatar />
        </div>
      </div>
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
            isOpen ? "block" : "hidden"
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
    </>
  );
};

export default Navbar;
