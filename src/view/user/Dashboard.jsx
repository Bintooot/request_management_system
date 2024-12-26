import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Navigation/FixedSidebar";
import CardMenu from "../../components/Card/CardMenu";
import { RiMailSendLine } from "react-icons/ri";

const Dashboard = () => {
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
          <main>
            <div>
              <div className="p-10 text-center md:text-2lg">
                <h1 className="font-semibold text-3xl">
                  WELCOME! BEN RAYMOND ANIASCO
                </h1>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
                  aspernatur at libero cupiditate expedita? Molestias laboriosam
                  tenetur commodi ullam, illo cupiditate consectetur asperiores
                  dolorum. Quisquam perspiciatis libero ea aliquid quod!
                </p>
              </div>
              <div className="p-10">
                <div className="flex flex-wrap gap-2">
                  <div className="flex-1">
                    <CardMenu
                      title="Sent Request"
                      number="10"
                      icon={<RiMailSendLine />}
                    />
                  </div>
                  <div className="flex-1">
                    <CardMenu
                      title="Sent Request"
                      number="10"
                      icon={<RiMailSendLine />}
                    />
                  </div>
                  <div className="flex-1">
                    <CardMenu
                      title="Sent Request"
                      number="10"
                      icon={<RiMailSendLine />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
