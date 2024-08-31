import React from "react";
import NavBar from "./NavBar";

const ManagerDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-body h-lvh ">
        <div className="md:mx-32 mx-5">
          <h1 className="md:pt-24 pt-28 inter font-bold text-lg">
            Hi Good morning! Manager
          </h1>
          <div className="grid md:grid-cols-3 mt-6  gap-7">
            <div className="md:col-span-1 bg-[#FFFFFF]">
              <div className="p-2">1</div>
            </div>
            <div className="md:col-span-2">
              <h1 className="text-[#696F79] font-bold text-base inter text-center">
                Overall Code Quality
              </h1>
              <div className="bg-[#FFFFFF] mt-4 p-2">2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
