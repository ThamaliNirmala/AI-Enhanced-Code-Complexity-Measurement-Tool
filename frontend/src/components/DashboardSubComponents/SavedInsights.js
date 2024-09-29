import { Collapse, Empty, Modal, notification, Spin, Button } from "antd";
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../apis/axiosInstance";
import DeveloperDashBoard from "../DeveloperDashBoard";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const { Panel } = Collapse;
const { REACT_APP_BASE_URL } = process.env;

const SavedInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insightId, setInsightId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const collapseRefs = useRef([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axiosInstance
        .get(
          `${REACT_APP_BASE_URL}/api/insights/${localStorage.getItem("userId")}`
        )
        .then(({ data }) => {
          setInsights(data);
          setLoading(false);
        });
    })();
    setIsDeleted(false);
  }, [isDeleted]);

  const downloadPDF = (index) => {
    const input = collapseRefs.current[index];

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save(`${insights[index].insights.filename}.pdf`);
    });
  };

  const handleDeleteInsight = async () => {
    try {
      await axiosInstance.delete(
        `${REACT_APP_BASE_URL}/api/insights/${insightId}`
      );
      notification.success({
        message: "Insight Deleted Successfully",
        placement: "topRight",
      });
      setIsDeleted(true);
      setInsightId(null);
      setIsModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Request Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  console.log("Insights", insights);
  return (
    <>
      <Spin spinning={loading}>
        <div className="mt-20 container">
          <Collapse
            accordion
            className="bg-gray-100 rounded-lg shadow-md max-w-1200 mx-auto mt-10"
            defaultActiveKey={["0"]}
          >
            {!insights.length ? (
              <Empty
                description={
                  !insights.length
                    ? "No insights available yet."
                    : "No matching results found."
                }
              />
            ) : (
              insights.map((insight, index) => (
                <Panel
                  key={index}
                  header={
                    <>
                      {insight.insights.filename}

                      <DownloadOutlined
                        onClick={() => downloadPDF(index)}
                        className="mb-4 float-end"
                      />

                      <DeleteOutlined
                        className=" float-end text-red-600 mr-5"
                        onClick={() => {
                          setInsightId(insight._id);
                          setIsModalOpen(true);
                        }}
                      />
                    </>
                  }
                  className="border-b border-gray-300"
                >
                  <div ref={(el) => (collapseRefs.current[index] = el)}>
                    <DeveloperDashBoard complexities={insight.insights} />
                  </div>
                </Panel>
              ))
            )}
          </Collapse>
        </div>
      </Spin>
      <Modal
        title={"Do you want to delete this insight?"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setInsightId(null);
        }}
        okText="Confirm"
        onOk={() => handleDeleteInsight(insightId)}
      />
    </>
  );
};

export default SavedInsights;
