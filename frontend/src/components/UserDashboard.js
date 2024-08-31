import React from "react";
import NavBar from "./NavBar";

const UserDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-body h-lvh ">
        <div className="md:mx-32 mx-5">
          <h1 className="md:pt-24 pt-28 inter font-bold text-lg">
            Hi Good morning! User
          </h1>
          <div className="md:mx-10 ">
            <div className="mt-6">
              <h1 className="text-[#696F79] font-bold text-base inter text-center">
                Code Health
              </h1>
              <div className="bg-[#FFFFFF] mt-4 p-2">1</div>
            </div>
            <div className="mt-10">
              <h1 className="text-[#696F79] font-bold text-base inter text-center ">
                Code Rank
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
