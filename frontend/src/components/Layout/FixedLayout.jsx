import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import FixedSidebar from "../../components/Navigation/FixedSidebar";

const FixedLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleHandler = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  // Function to fetch user profile data
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await axios.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      setError(error.message);
      localStorage.removeItem("authToken");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  return (
    <div>
      <Header
        toggleHandler={toggleHandler}
        role={user?.role}
        username={user?.username || "User"}
        handleLogout={handleLogout}
      />

      {isOpen && (
        <div className="fixed inset-0 top-20 bg-green-900 bg-opacity-100 z-50">
          <FixedSidebar closeSidebar={() => setIsOpen(false)} />
        </div>
      )}

      <div className="flex min-h-screen">
        <aside className="bg-green-900 max-w-60 w-full md:block hidden">
          <FixedSidebar closeSidebar={() => setIsOpen(false)} />
        </aside>
        <main className="max-w-full w-full p-2">
          <Outlet context={{ user, setUser, fetchUser }} />
        </main>
      </div>
    </div>
  );
};

export default FixedLayout;
