import React, {useEffect} from "react";
import {Bar} from "react-chartjs-2";
// import "chartjs-adapter-date-fns";

const BarChart = ({workedHours, normHours}) => {
  const chartData = {
    labels: ["Worked Hours", "Norm Hours"],
    datasets: [
      {
        label: "Hours",
        data: [workedHours, normHours],
        backgroundColor: workedHours > normHours ? "red" : "lightblue",
        type: "bar",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Worked Hours vs Norm Hours",
        font: {
          size: 14,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    type: "bar",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div style = {{width: 400}}>
      <Bar data= {chartData}
          options = {options}/>
    </div>
  );
};

export default BarChart;
