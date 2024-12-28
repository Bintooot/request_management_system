import React, { useState } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import UserList from "../../components/TableList/UserList";
import ProfileCard from "../../components/Card/ProfileCard";

const UserAccount = () => {
  const user_list = [
    {
      id: 1,
      username: "Alexa Pis-ing",
      email: "example@gmail.com",
      date_created: "10/10/10",
    },
    {
      id: 2,
      username: "Michael Lowe",
      email: "thompsonjeffrey@gmail.com",
      date_created: "27/01/86",
    },
    {
      id: 3,
      username: "Tasha Day",
      email: "andrea93@hernandez.info",
      date_created: "10/03/73",
    },
    {
      id: 4,
      username: "Sharon Holland",
      email: "vward@williams.biz",
      date_created: "12/06/91",
    },
    {
      id: 5,
      username: "Amber Walker",
      email: "bobbymcintosh@kelley.info",
      date_created: "17/01/08",
    },
    {
      id: 6,
      username: "Patrick Sullivan",
      email: "tammy39@hotmail.com",
      date_created: "12/07/17",
    },
  ];
  const [viewUser, setViewUser] = useState("");

  const viewUserHandler = (user) => {
    setViewUser(user);
    console.log(user);
  };

  return (
    <>
      <div className="gap-3 p-5 md:flex ">
        <div className="md:w-1/3  mb-5">
          <Sidebar />
        </div>
        <div className="md:flex gap-2 w-full">
          <div className="h-[350px] border-2 rounded-lg shadow-lg md:w-1/2 p-5 mb-5">
            <h1 className="font-semibold uppercase p-2">Users List</h1>
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

export default UserAccount;
