import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const dataset = {
  label: "",
  data: [],

  backgroundColor: "#2794EB",
  categoryPercentage: 0.5,
  barPercentage: 0.8,

  datalabels: {
    color: "white",
    backgroundColor: "rgba(12, 12, 12, 0.5)",
    padding: 5,
    borderRadius: 50,

    formatter: (value) => {
      return value - 1;
    },
  },
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  layout: {
    padding: {
      top: 5,
      right: 20,
      left: 20,
    },
  },

  scales: {
    y: {
      type: "linear",
      display: false,
      position: "left",
      grid: {
        display: false,
      },
    },
    y1: {
      type: "linear",
      display: false,
      position: "right",
      grid: {
        drawOnChartArea: true,
      },
    },
    y2: {
      type: "linear",
      display: false,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
    y3: {
      type: "linear",
      display: false,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  
  },
  plugins: {
    legend: {
      display: true,
      fullSize: false,
      position: "bottom",
     
      align: "center",
      labels: {
        usePointStyle: true,
        boxWidth: 20,
        margin: 200,
      },
    },

    tooltip: {
      callbacks: {
        title: (context) => {
          return context[0].label.replaceAll(",", " ");
        },
      },
    },

    title: {
      display: true,
      fullSize: false,
      itemStyle: {
        width: 90, // or whatever, auto-wrap
      },
      text: "Productivity Agen",
      display: true,

      font: {
        size: 12,
        weight: 400,
      },

      margin: {
        bottom: 10,
      },

      align: "start",
      color: "#6A707E",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const data = {
  labels,
  datasets: [
    {
      ...dataset,
      label: "Dataset 1",
      data: [10, 20, 20, 30, 20, 10],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      ...dataset,
      label: "Dataset 2",
      data: [10, 20, 20, 30, 40, 40],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
    {
      ...dataset,
      label: "Dataset 2",
      data: [10, 20, 20, 30, 40, 40],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "#47D6B6",
      yAxisID: "y2",
    },
    {
      ...dataset,
      label: "Dataset 2",
      data: [44, 22, 25, 40, 10, 100, 10,20,43,24,32],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "#1A68A7",
      yAxisID: "y3",
    },
   
  ],
};

export default function ChartLine() {
  return <Line options={options} data={data} />;
}
