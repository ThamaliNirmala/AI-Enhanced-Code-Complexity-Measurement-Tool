import React from "react";
import GaugeChart from "react-gauge-chart";

const MaintainabilityGauge = ({ maintainabilityIndex }) => (
  <div>
    <h3>Maintainability Index</h3>
    <GaugeChart
      id="maintainability-gauge"
      nrOfLevels={10}
      colors={["#FF5F6D", "#FFC371"]}
      arcWidth={0.3}
      percent={maintainabilityIndex / 100}
      textColor="#000"
    />
  </div>
);

export default MaintainabilityGauge;
