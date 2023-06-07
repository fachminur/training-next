import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  maintainAspectRation: false,
  indexAxis: window.innerWidth <= 450 ? "y" : "x",
  scales: {
    x: {
      ticks: {
        display: true,
        beginAtZero: true,
        autoSkip: false,

        color: "#A8A8A8",
        font: {
          size: 12,
        },
      },
      display: "auto",
      grid: {
        display: false,
      },
    },

    y: {
      display: false,
      beginAtZero: true,
      ticks: {
        display: true,
        maxRotation: 90,
        minRotation: 0,
        font: {
          size: "12px",
        },

        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        margin: 10,
      },
      padding: {
        bottom: 100,
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

let dataset = {
  label: "",
  data: [],
  borderRadius: "50",
  backgroundColor: "#ADB5F4",
  categoryPercentage: 0.5,
  barPercentage: 0.4,
  margin: {
    top: 100,
  },

  datalabels: {
    anchor: "end",
    rotation: 0,
    borderRadius: "10px",
    align: "end",
    font: {
      size: "10px",
    },

    formatter: (value) => {
      if (value === 0) {
        return "";
      }
      return value;
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      ...dataset,
      label: "Dataset 1",
      data: [10, 22, 33, 22, 22, 44],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      ...dataset,
      label: "Dataset 2",
      data: [10, 22, 33, 22, 22, 44],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function App() {
  return <Bar options={options} data={data} />;
}
