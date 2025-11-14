"use client";

import { SectionTitle } from "@/components/util/Text";
import { IconWidget } from "../util.tsx/DataWidget";
import { FiUserMinus, FiUserPlus, FiUsers } from "react-icons/fi";
import { BiIdCard } from "react-icons/bi";
import DailyLineChart from "./DailyLineChart";

interface MembershipChartProps {
  className?: string;
}

const MembershipChart: React.FC<MembershipChartProps> = ({
  className = "",
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      <SectionTitle text="Membership Dashboard" />
      {/* 요약 통계 카드들 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <IconWidget
          title={"총 가입자"}
          numberData={"12,248"}
          color={"blue"}
          textData={"전월 대비 +8.2% 증가"}
          icon={<FiUsers size={20} color="blue" />}
        />
        <IconWidget
          title={"공식 멤버십"}
          numberData={"75.2%"}
          color={"purple"}
          textData={"3,456명이 가입"}
          icon={<BiIdCard size={20} color="purple" />}
        />
        <IconWidget
          title={"이번 주 신규"}
          numberData={"427"}
          color={"green"}
          textData={"일평균 61명 가입"}
          icon={<FiUserPlus size={20} color="green" />}
        />
        <IconWidget
          title={"이번 주 탈퇴"}
          numberData={"36"}
          color={"orange"}
          textData={"일평균 5명 탈퇴"}
          icon={<FiUserMinus size={20} color="orange" />}
        />
      </div>
      <DailyLineChart />
    </div>
  );
};

export default MembershipChart;
