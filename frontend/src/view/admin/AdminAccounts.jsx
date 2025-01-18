import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import UserList from "../../components/TableList/UserList";
import ProfileCard from "../../components/Card/ProfileCard";
import axios from "axios";

const AdminAccounts = () => {
  const [viewUser, setViewUser] = useState("");
  const [userAdmin, setAdminList] = useState([]);

  const viewUserHandler = (user) => {
    setViewUser(user);
    console.log(user);
  };

  useEffect(() => {
    const fetchListOfAdmin = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("/api/admin/list-of-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdminList(response.data.users);
      } catch (error) {
        console.error("Error fetching list of users:", error);
      }
    };

    fetchListOfAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex p-5 gap-5 flex-col md:flex-row">
        {/* Sidebar Section */}
        <div className="md:w-1/4 mb-5">
          <Sidebar />
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          {/* Admin List Section */}
          <div className="bg-white border-2 rounded-lg shadow-lg md:w-1/2 p-6 overflow-auto">
            <h1 className="text-xl font-semibold text-gray-700 mb-4">
              Admin List
            </h1>
            <div className="h-[60vh] overflow-y-scroll">
              <UserList request={userAdmin} onClick={viewUserHandler} />
            </div>
          </div>

          {/* Profile Card Section */}
          <div className="bg-white border-2 rounded-lg shadow-lg md:w-1/2 p-6 mt-5 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Admin Profile
            </h2>
            {viewUser && (
              <ProfileCard
                namelabel="Admin ID:"
                address={viewUser.address}
                contactnumber={viewUser.contactnumber}
                position={viewUser.position}
                createdAt={viewUser.createdAt}
                username={viewUser.username}
                id={viewUser.accountid}
                email={viewUser.email}
              />
            )}
            {!viewUser && (
              <p className="text-gray-500 text-center">
                Select an admin to view profile
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccounts;
