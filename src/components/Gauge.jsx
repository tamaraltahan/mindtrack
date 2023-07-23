import React from "react";
import GaugeChart from "react-gauge-chart";

const Gauge = (average) => {
  const { value } = average;

  const getPercent = () => {
    const percent = (Number(value) + 3) / 6;
    return percent;
  };

  return (
    <GaugeChart
      nrOfLevels={30}
      colors={["#FF5F6D", "#008000"]}
      arcWidth={0.45}
      percent={getPercent(value)}
      textColor="#FFF"
      needleColor="#FF5F6D"
      hideText
    />
  );
};

export default Gauge;
