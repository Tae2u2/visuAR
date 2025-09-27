"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SectionTitle } from "@/components/util/Text";

/**
 * 누적 가입자수 주단위 바차트 컴포넌트
 *
 * 기능:
 * - 주별 누적 가입자 수를 바차트로 표시
 * - 전주 대비 증가한 부분을 다른 색상으로 강조
 * - 호버 시 툴팁으로 상세 정보 표시
 */

// 주별 데이터 타입 정의
interface WeeklyData {
  week: string; // 주차 (예: "2024-W01")
  cumulative: number; // 누적 가입자 수
  growth: number; // 전주 대비 증가량
  weekStartDate: Date; // 주 시작 날짜
}

interface CumulativeBarChartProps {
  width?: number;
  height?: number;
}

const CumulativeBarChart: React.FC<CumulativeBarChartProps> = ({
  width = 900,
  height = 500,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // 샘플 데이터 생성 - 실제 환경에서는 props나 API에서 받아와야 함
  const generateSampleData = (): WeeklyData[] => {
    const data: WeeklyData[] = [];
    const startDate = new Date("2024-01-01");
    let cumulativeUsers = 1000; // 초기 가입자 수

    for (let i = 0; i < 12; i++) {
      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(startDate.getDate() + i * 7);

      // 주별 증가량 (랜덤하게 생성)
      const growth = Math.floor(Math.random() * 200) + 50;
      cumulativeUsers += growth;

      data.push({
        week: `2024-W${(i + 1).toString().padStart(2, "0")}`,
        cumulative: cumulativeUsers,
        growth: growth,
        weekStartDate: weekStartDate,
      });
    }
    return data;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const data = generateSampleData();

    // SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 마진 설정
    const margin = { top: 20, right: 30, bottom: 70, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // 메인 차트 그룹 생성
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 스케일 설정
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.week))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.cumulative) || 0])
      .range([chartHeight, 0]);

    // 색상 스케일 (기본 색상과 증가 부분 색상)
    const baseColor = "#BDBDBD"; // 파란색 (기존 가입자)
    const growthColor = "#10B981"; // 초록색 (신규 증가분)

    // 툴팁 생성
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000);

    // 바 차트 그리기
    data.forEach((d, i) => {
      const barGroup = chartGroup.append("g");
      const barX = xScale(d.week) || 0;
      const barWidth = xScale.bandwidth();

      // 기존 누적 부분 (전주까지의 누적값)
      const previousCumulative = i > 0 ? data[i - 1].cumulative : 0;
      const baseHeight = yScale(0) - yScale(previousCumulative);

      if (previousCumulative > 0) {
        barGroup
          .append("rect")
          .attr("x", barX)
          .attr("y", yScale(previousCumulative))
          .attr("width", barWidth)
          .attr("height", baseHeight)
          .attr("fill", baseColor)
          .attr("opacity", 0.8);
      }

      // 증가분 부분 (신규 가입자)
      const growthHeight = yScale(previousCumulative) - yScale(d.cumulative);

      barGroup
        .append("rect")
        .attr("x", barX)
        .attr("y", yScale(d.cumulative))
        .attr("width", barWidth)
        .attr("height", growthHeight)
        .attr("fill", growthColor)
        .attr("opacity", 0.9)
        .on("mouseover", function (event) {
          // 호버 효과
          d3.select(this).attr("opacity", 1);

          // 툴팁 표시
          tooltip
            .style("opacity", 1)
            .html(
              `
              <div><strong>${d.week}</strong></div>
              <div>누적 가입자: ${d.cumulative.toLocaleString()}명</div>
              <div>신규 증가: +${d.growth.toLocaleString()}명</div>
              <div>기준일: ${d.weekStartDate.toLocaleDateString()}</div>
            `
            )
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).attr("opacity", 0.9);
          tooltip.style("opacity", 0);
        });
    });

    // X축 생성
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y축 생성
    chartGroup
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => `${(d as number).toLocaleString()}`)
      );

    // 축 레이블 추가
    chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - chartHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("누적 가입자 수 (명)");

    chartGroup
      .append("text")
      .attr(
        "transform",
        `translate(${chartWidth / 2}, ${chartHeight + margin.bottom - 10})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("주차");

    // 범례 추가
    const legend = chartGroup
      .append("g")
      .attr("transform", `translate(${chartWidth + 20}, 20)`);

    // 기존 가입자 범례
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", baseColor)
      .attr("opacity", 0.8);

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("기존 가입자");

    // 신규 가입자 범례
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", growthColor)
      .attr("opacity", 0.9);

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 37)
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("신규 증가분");

    // cleanup 함수에서 툴팁 제거
    return () => {
      tooltip.remove();
    };
  }, [width, height]);

  return (
    <div className="w-full border border-slate-300 shadow">
      <SectionTitle text="누적 가입자 추이 (주단위)" />
      <small className="mt-2 text-sm text-gray-600 px-5">
        * 초록색 부분은 해당 주의 신규 가입자 증가분을 나타냅니다.
      </small>
      <div className="bg-white p-4">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default CumulativeBarChart;
