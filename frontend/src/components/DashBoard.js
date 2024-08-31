import React from "react";
import NavBar from "./NavBar";
import Services from "../assets/Services.svg";

const DashBoard = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-body h-lvh ">
        <div className="md:mx-32 mx-5">
          <h1 className="md:pt-24 pt-28 inter font-bold text-lg">
            Hi Good morning! Developer
          </h1>
          <div className="md:mx-40 mx-1 bg-[#F3F5F7] mt-6">
            <div className="p-4 text-center">Paste your code Snippet Here</div>
          </div>
          <h1 className="uppercase inter font-bold text-center my-10">or</h1>
          <div className="md:mx-40 mx-1 bg-[#F3F5F7]">
            <div className="p-4 text-center">
              <input type="file" />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="button"
              class="text-black inter bg-[#D9D9D9] hover:bg-[#ccc9c9] border-[#000000]  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
            >
              <img src={Services} className="w-4 h-4 me-2" />
              Analyze Code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
