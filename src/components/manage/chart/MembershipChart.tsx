"use client";

import React from "react";
import CumulativeBarChart from "./CumulativeBarChart";
import DailyLineChart from "./DailyLineChart";
import MembershipDonutChart from "./MembershipDonutChart";
import { SectionTitle } from "@/components/util/Text";

/**
 * 멤버십 관련 차트들을 통합하여 표시하는 메인 컴포넌트
 *
 * 포함된 차트:
 * 1. CumulativeBarChart - 주별 누적 가입자 수 바차트
 * 2. DailyLineChart - 일별 신규 가입자 라인차트
 * 3. MembershipDonutChart - 공식/일반 멤버십 비율 도넛차트
 *
 * 특징:
 * - 반응형 레이아웃으로 다양한 화면 크기에 대응
 * - 각 차트는 독립적으로 작동하며 데이터 로딩 상태 관리
 * - 차트별로 적절한 크기와 배치 제공
 */

interface MembershipChartProps {
  className?: string;
}

const MembershipChart: React.FC<MembershipChartProps> = ({
  className = "",
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* 페이지 헤더 */}
      <SectionTitle text="Membership Dashboard" />
      {/* 요약 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* 총 가입자 수 카드 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 가입자</p>
              <p className="text-2xl font-bold text-gray-900">12,248</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">전월 대비 +8.2% 증가</p>
        </div>

        {/* 이번 주 신규 가입자 카드 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">이번 주 신규</p>
              <p className="text-2xl font-bold text-green-600">427</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">일평균 61명 가입</p>
        </div>

        {/* 공식 멤버십 비율 카드 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">공식 멤버십</p>
              <p className="text-2xl font-bold text-purple-600">28.2%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">3,456명이 가입</p>
        </div>
      </div>

      {/* 추가 정보 및 액션 버튼 */}
      <div className="bg-gray-200 p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              데이터 업데이트 정보
            </h3>
            <p className="text-sm text-gray-600">
              마지막 업데이트: {new Date().toLocaleString("ko-KR")}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              데이터는 매시간 자동으로 갱신됩니다.
            </p>
          </div>

          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              데이터 새로고침
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              리포트 내보내기
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-5 w-full">
        <div className="flex flex-col gap-5 w-full">
          <CumulativeBarChart width={900} height={400} />
          <DailyLineChart width={700} height={350} />
        </div>
        <MembershipDonutChart width={300} height={350} />
      </div>
    </div>
  );
};

export default MembershipChart;
