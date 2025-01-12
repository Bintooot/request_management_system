import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const FixedSidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage (or sessionStorage if you're using that)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to login page after logout
    navigate("/login"); // Update with the actual login route
  };

  return (
    <div className="p-2 text-white">
      <h1 className="my-2 py-2 font-semibold border-b-2">HOME</h1>
      <nav className="cursor-pointer">
        <ul>
          <NavLink to="/user-dashboard" onClick={handleLinkClick}>
            <li className="p-3 hover:bg-green-500">Dashboard</li>
          </NavLink>
        </ul>
      </nav>

      <h1 className="my-2 py-2 font-semibold border-b-2">REQUEST</h1>
      <nav className="cursor-pointer">
        <ul>
          <NavLink to="/create-request" onClick={handleLinkClick}>
            <li className="p-3 hover:bg-green-500">Create Request</li>
          </NavLink>
          <NavLink to="/request-record" onClick={handleLinkClick}>
            <li className="p-3 hover:bg-green-500">Request Records</li>
          </NavLink>
          <NavLink to="/inqure" onClick={handleLinkClick}>
            <li className="p-3 hover:bg-green-500">Inquiry & Reports</li>
          </NavLink>
        </ul>
      </nav>

      <h1 className="my-2 py-2 font-semibold border-b-2">PERSONAL</h1>
      <nav className="cursor-pointer">
        <ul>
          <NavLink to="/profile" onClick={handleLinkClick}>
            <li className="p-3 hover:bg-green-500">PROFILE</li>
          </NavLink>
          <NavLink onClick={handleLogout} to="/">
            <li className="p-3 hover:bg-red-500">LOGOUT</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default FixedSidebar;
