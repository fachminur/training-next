import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function ChartDonat() {
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
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        ...dataset,
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],

        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,

    layout: {
      padding: {
        top: 5,
        right: 20,
        left: 20,
      },
    },

    plugins: {
      legend: {
        display: true,

        fullSize: false,
        position: "right",
        margin: {
          bottom: 10,
        },

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
  return <Doughnut data={data} options={options} />;
}

export default ChartDonat;
