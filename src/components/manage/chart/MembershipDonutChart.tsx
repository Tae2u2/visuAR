"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const MembershipDonutChart = () => {
  const data = {
    labels: [
      "멤버십 회원 (75.2%)",
      "잠재적 멤버십 회원 (11%)",
      "일반 회원 (13.8%)",
    ],
    datasets: [
      {
        data: [75.2, 11, 13.8],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // 멤버십
          "rgba(255, 206, 86, 0.7)", // 잠재적
          "rgba(75, 192, 192, 0.7)", // 일반
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        cutout: "65%", // 도넛 두께
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.raw;
            const total = 12248;
            const count = Math.round((value / 100) * total);
            return `${label}: ${value}% (${count.toLocaleString()}명)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-[350px] h-fit bg-white rounded p-5">
      <p className="text-slate-700 font-semibold">Membarship 현황</p>
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default MembershipDonutChart;
