import React from "react";
import ErrorsAndBugs from "./DashboardSubComponents/ErrorsAndBugs";
import Analytics from "./DashboardSubComponents/Analytics";

const DeveloperDashBoard = ({ complexities }) => {
  return (
    <>
      <div className="dashboard-body h-lvh pt-6">
        <div className="md:mx-32 mx-5">
          <div className="grid md:grid-cols-3 mt-6  gap-7">
            <div className="grid grid-rows-2 gap-5">
              {complexities.fileExtension !== ".java" && (
                <Analytics
                  analytics={complexities.complexity}
                  ext={complexities.fileExtension}
                />
              )}
              {complexities.fileExtension === ".java" && (
                <ErrorsAndBugs bugs={complexities.complexity} />
              )}
            </div>
            <div className="md:col-span-2">
              <h1 className="text-[#696F79] font-bold text-base inter text-center">
                Suggested Code Improvements and comments
              </h1>
              <div className="bg-[#FFFFFF] mt-4 p-2">3</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperDashBoard;
