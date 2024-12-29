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
    </>
  );
};

export default Navbar;
