"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CumulativeBarChart = () => {
  const labels = ["일", "월", "화", "수", "목", "금", "토"];

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "기존 회원 증가",
        data: [30, 28, 32, 29, 35, 31, 40],
        backgroundColor: "rgba(54, 162, 235, 0.7)", // 파랑
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        stack: "total",
      },
      {
        label: "신규 가입자 수",
        data: [61, 33, 45, 30, 36, 30, 37],
        backgroundColor: "rgba(255, 99, 132, 0.7)", // 빨강
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "total",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[700px] h-auto bg-white rounded p-5">
      <Bar options={options} data={data} />
    </div>
  );
};

export default CumulativeBarChart;
