import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Navigation/FixedSidebar";

const RequestRecords = () => {
  const [Open, setOpen] = useState(false);

  const togglehandler = () => {
    setOpen(!Open);
  };
  return (
    <div>
      <Header togglehandler={togglehandler} />
      {Open && (
        <div className="fixed inset-0 top-20 bg-green-900 bg-opacity-100 z-50">
          <Sidebar />
        </div>
      )}
      <div className="flex">
        <div className="bg-green-900 max-w-60 w-full h-screen md:block hidden">
          <Sidebar />
        </div>
        <div>
          <main></main>
        </div>
      </div>
    </div>
  );
};

export default RequestRecords;
