import React from "react";
import ErrorsAndBugs from "./DashboardSubComponents/ErrorsAndBugs";
import Analytics from "./DashboardSubComponents/Analytics";
import CodeImprovements from "./DashboardSubComponents/CodeImprovements";

const DeveloperDashBoard = ({ complexities }) => {
  return (
    <>
      <div className="dashboard-body pt-6">
        <div className="md:mx-32 mx-5">
          <div className="md:grid md:grid-cols-3 mt-6  gap-7">
            <div className="">
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
            <CodeImprovements
              aiSuggestedData={complexities?.aiSuggestedData}
              fileName={complexities.filename}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperDashBoard;
