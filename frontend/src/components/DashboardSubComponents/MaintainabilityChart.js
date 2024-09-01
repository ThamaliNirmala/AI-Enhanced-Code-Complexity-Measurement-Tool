import React from "react";
import GaugeChart from "react-gauge-chart";

const MaintainabilityGauge = ({ maintainabilityIndex }) => (
  <div style={{ textAlign: "center" }} className=" mt-6">
    <GaugeChart
      id="maintainability-gauge"
      nrOfLevels={10}
      colors={["#FFC371", "#FF5F6D"]}
      arcWidth={0.3}
      percent={maintainabilityIndex / 100}
      textColor="#000"
    />
    <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}>
      Maintainability Index
    </div>
  </div>
);

export default MaintainabilityGauge;
