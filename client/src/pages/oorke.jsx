import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Auto-registers all required components

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

const ChartComponent = () => {
  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: "Count Over Years",
        data: data.map((item) => item.count),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        pointBackgroundColor: "blue",
        pointBorderColor: "#fff",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Yearly Data Chart" },
    },
    scales: {
      x: { title: { display: true, text: "Year" } },
      y: { title: { display: true, text: "Count" } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;
