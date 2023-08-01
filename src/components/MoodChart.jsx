/* eslint-disable no-unused-vars */

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const MoodChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.datetime.toDate().toLocaleDateString()),
    datasets: [
      {
        label: "Mood over time",
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgba(147,112,219,0.4)",
        borderColor: "rgba(75,0,130,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data.map((entry) => entry.value),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: -3,
        max: 2,
        ticks: {
          stepSize: 1,
          font: {
            size: 20, // Set the size of the emoji labels
          },
          callback: function (value) {
            switch (value) {
              case 2:
                return "😁";
              case 1:
                return "🙂";
              case 0:
                return "😐";
              case -1:
                return "☹️";
              case -2:
                return "😭";
              case -3:
                return "💀"; // Add your sixth emoji here
              default:
                return "";
            }
          },
          padding: 10,
        },
      },
      x: {
        ticks: {
          maxRotation: 45, // Set the maximum rotation of the x-axis labels
          minRotation: 45, // Set the minimum rotation of the x-axis labels
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const note = data[index].note;
            return `Value: ${context.formattedValue}, Note: ${note}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} height={85} />
    </div>
  );
};

export default MoodChart;
