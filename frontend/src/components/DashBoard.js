import React, { useState } from "react";
import Services from "../assets/Services.svg";
import { Greeting } from "./helpers/helper";
import CodeEditor from "./DashboardSubComponents/CodeEditor";
import FileUpload from "./DashboardSubComponents/FileUpload";
import axiosInstance from "../apis/axiosInstance";
import { Button, notification, Spin } from "antd";
import DeveloperDashBoard from "./DeveloperDashBoard";
import { RedoOutlined, SaveOutlined } from "@ant-design/icons";
const { REACT_APP_BASE_URL } = process.env;

const DashBoard = ({ user }) => {
  const [file, setFile] = useState(null);
  const [isEnabledEditor, setIsEnabledEditor] = useState(true);
  const [isEnabledUpload, setIsEnabledUpload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [complexities, setComplexities] = useState([]);

  console.log("Uploaded File", file);

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const result = await axiosInstance.post(
        `${REACT_APP_BASE_URL}/api/dashboard/files/upload`,
        formData
      );
      setComplexities(result.data);
      console.log("Result", result.data);
    } catch (error) {
      notification.error({
        message: "Request Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dashboard-body pb-20">
        <Greeting role={user?.role} />
        {!Object.keys(complexities).length ? (
          <Spin spinning={loading}>
            <div className="md:mx-32 mx-5">
              <div className="md:mx-40 mx-1 bg-[#dce9f5] mt-6 p-6">
                <CodeEditor
                  setFile={setFile}
                  setIsEnabledUpload={setIsEnabledUpload}
                  isEnabledEditor={isEnabledEditor}
                />
              </div>
              <h1 className="uppercase inter font-bold text-center my-10">
                or
              </h1>
              <FileUpload
                setFile={setFile}
                setIsEnabledEditor={setIsEnabledEditor}
                isEnabledUpload={isEnabledUpload}
              />

              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  class={`text-black inter bg-[#D9D9D9] hover:bg-[#ccc9c9] border-[#000000]  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2 ${
                    !file && "cursor-not-allowed"
                  } `}
                  disabled={!file}
                  onClick={handleUpload}
                >
                  <img src={Services} className="w-4 h-4 me-2" />
                  Analyze Code
                </button>
              </div>
            </div>{" "}
          </Spin>
        ) : (
          <>
            <div className="flex justify-end space-x-4 mt-4 md:mx-32 mx-5">
              <Button
                icon={<SaveOutlined />}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </Button>
              <Button
                icon={<RedoOutlined />}
                className="bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => {
                  setComplexities({});
                  setFile(null);
                  setIsEnabledUpload(true);
                  setIsEnabledEditor(true);
                }}
              >
                Try another
              </Button>
            </div>
            <DeveloperDashBoard complexities={complexities} />
          </>
        )}
      </div>
    </>
  );
};

export default DashBoard;
