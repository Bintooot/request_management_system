import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import UserList from "../../components/TableList/UserList";
import ProfileCard from "../../components/Card/ProfileCard";
import axios from "axios";

const UserAccount = () => {
  const [userList, setUserList] = useState([]);
  const [viewUser, setViewUser] = useState("");

  const viewUserHandler = (user) => {
    setViewUser(user);
    console.log(user);
  };

  useEffect(() => {
    const fetchListOfUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("/api/admin/list-of-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserList(response.data.users);
      } catch (error) {
        console.error("Error fetching list of users:", error);
      }
    };

    fetchListOfUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex p-5 gap-5 flex-col md:flex-row">
        {/* Sidebar Section */}
        <div className="md:w-1/4 mb-5">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          {/* User List Section */}
          <div className="bg-white border-2 rounded-lg shadow-lg md:w-1/2 p-6 overflow-auto">
            <h1 className="text-xl font-semibold text-gray-700">Users List</h1>
            <div className="mt-4 h-[60vh] overflow-y-scroll">
              <UserList request={userList} onClick={viewUserHandler} />
            </div>
          </div>

          {/* Profile Card Section */}
          <div className="bg-white border-2 rounded-lg shadow-lg md:w-1/2 p-6 mt-5 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              User Profile
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
                Select an user to view profile
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
