import React from "react";
import CardMenu from "../../components/Card/CardMenu";
import { FaUserPlus } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import Navbar from "../../components/Navigation/Navbar";
import Sidebar from "../../components/Navigation/Sidebar";
import ChangeUsername from "../../components/Form/ChangeUsername";
import ProfileCard from "../../components/Card/ProfileCard";

const Accounts = () => {
  return (
    <>
      <Navbar />
      <div className="gap-3 md:m-16 p-5 md:flex    ">
        <div className="md:w-1/3  mb-5">
          <Sidebar />
        </div>
        <div className="flex-col w-full">
          <div className="flex justify-around items-center gap-2 mb-5 grow">
            <div className="w-1/2">
              <CardMenu
                icon={<FaUserPlus />}
                title="Users Accounts"
                number="10"
              />
            </div>
            <div className="w-1/2">
              <CardMenu
                icon={<RiAdminFill />}
                title="Admin Accounts"
                number="10"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5  grow">
            <div className="border-2 shadow-lg rounded-lg p-5">
              <ProfileCard
                id="1"
                username="Ben Aniasco"
                email="benaniasco@gmail.com"
              />
            </div>
            <div className="border-2 shadow-lg rounded-lg p-5">
              <ChangeUsername />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
