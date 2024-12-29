import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../../components/Navigation/FixedSidebar";
import { Outlet } from "react-router-dom";
const FixedLayout = () => {
  const [Open, setOpen] = useState(false);

  const togglehandler = () => {
    setOpen(!Open);
  };

  return (
    <>
      <div>
        <Header togglehandler={togglehandler} />
        {Open && (
          <div className="fixed inset-0 top-20 bg-green-900  bg-opacity-100 z-50">
            <Sidebar />
          </div>
        )}
        <div className="flex min-h-screen">
          <aside className="bg-green-900 max-w-60 w-full md:block hidden">
            <Sidebar />
          </aside>
          <main className="max-w-full w-full p-2">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default FixedLayout;
