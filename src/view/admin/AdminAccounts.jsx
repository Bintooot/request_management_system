import React, { useState } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import UserList from "../../components/TableList/UserList";
import ProfileCard from "../../components/Card/ProfileCard";

const AdminAccounts = () => {
  const user_list = [
    {
      id: 1,
      username: "User-2142",
      email: "user1@example.com",
      date_created: "17/10/16",
    },
    {
      id: 2,
      username: "User-3073",
      email: "user2@example.com",
      date_created: "18/12/14",
    },
    {
      id: 3,
      username: "User-3262",
      email: "user3@example.com",
      date_created: "09/07/20",
    },
    {
      id: 4,
      username: "User-3530",
      email: "user4@example.com",
      date_created: "15/11/12",
    },
    {
      id: 5,
      username: "User-3256",
      email: "user5@example.com",
      date_created: "31/12/19",
    },
    {
      id: 6,
      username: "User-9054",
      email: "user6@example.com",
      date_created: "04/05/23",
    },
    {
      id: 7,
      username: "User-4584",
      email: "user7@example.com",
      date_created: "21/02/18",
    },
    {
      id: 8,
      username: "User-8159",
      email: "user8@example.com",
      date_created: "26/01/12",
    },
    {
      id: 9,
      username: "User-5718",
      email: "user9@example.com",
      date_created: "17/06/17",
    },
    {
      id: 10,
      username: "User-2995",
      email: "user10@example.com",
      date_created: "28/06/22",
    },
  ];

  const [viewUser, setViewUser] = useState("");

  const viewUserHandler = (user) => {
    setViewUser(user);
    console.log(user);
  };
  return (
    <>
      <div className="gap-3 p-5 md:flex    ">
        <div className="md:w-1/3  mb-5">
          <Sidebar />
        </div>
        <div className="md:flex grow gap-2 w-full">
          <div className="h-[350px] border-2 rounded-lg shadow-lg md:w-1/2 p-5 mb-5">
            <h1 className="font-semibold uppercase p-2">Admin List</h1>
            <br />
            <div className="h-60 overflow-y-scroll">
              <UserList request={user_list} onClick={viewUserHandler} />
            </div>
          </div>
          <div className="h-[350px] border-2 rounded-lg shadow-lg md:w-1/2 p-5">
            <ProfileCard
              username={viewUser.username}
              id={viewUser.id}
              email={viewUser.email}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAccounts;
