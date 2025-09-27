"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SectionTitle } from "@/components/util/Text";

/**
 * 신규 가입자 일별 라인차트 컴포넌트
 *
 * 기능:
 * - 일별 신규 가입자 수를 라인차트로 표시
 * - 호버 시 해당 날짜의 상세 정보 표시
 * - 7일 이동평균선 추가로 트렌드 파악 용이
 * - 그리드 라인으로 가독성 향상
 */

// 일별 데이터 타입 정의
interface DailyData {
  date: Date; // 날짜
  newUsers: number; // 신규 가입자 수
  movingAverage?: number; // 7일 이동평균 (계산 후 추가)
}

interface DailyLineChartProps {
  width?: number;
  height?: number;
}

const DailyLineChart: React.FC<DailyLineChartProps> = ({
  width = 800,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // 샘플 데이터 생성 - 실제 환경에서는 props나 API에서 받아와야 함
  const generateSampleData = (): DailyData[] => {
    const data: DailyData[] = [];
    const startDate = new Date("2024-03-01");

    // 30일간의 데이터 생성
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // 주말에는 가입자가 적고, 평일에는 많다고 가정
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const baseUsers = isWeekend ? 20 : 60;

      // 랜덤 변동 추가
      const randomVariation = Math.floor(Math.random() * 40) - 20;
      const newUsers = Math.max(0, baseUsers + randomVariation);

      data.push({
        date: date,
        newUsers: newUsers,
      });
    }

    // 7일 이동평균 계산
    data.forEach((d, i) => {
      if (i >= 6) {
        const sum = data
          .slice(i - 6, i + 1)
          .reduce((acc, curr) => acc + curr.newUsers, 0);
        d.movingAverage = sum / 7;
      }
    });

    return data;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const data = generateSampleData();

    // SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 마진 설정
    const margin = { top: 20, right: 80, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // 메인 차트 그룹 생성
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 스케일 설정
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.newUsers) || 0])
      .range([chartHeight, 0]);

    // 그리드 라인 추가
    const xGrid = chartGroup
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-chartHeight)
          .tickFormat(() => "")
      );

    const yGrid = chartGroup
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => "")
      );

    // 그리드 스타일링
    svg
      .selectAll(".grid line")
      .style("stroke", "#e0e0e0")
      .style("stroke-width", "1px")
      .style("opacity", 0.7);

    svg.selectAll(".grid path").style("stroke-width", 0);

    // 라인 생성 함수
    const line = d3
      .line<DailyData>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.newUsers))
      .curve(d3.curveMonotoneX); // 부드러운 곡선

    // 이동평균 라인 생성 함수
    const movingAverageLine = d3
      .line<DailyData>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.movingAverage || 0))
      .curve(d3.curveMonotoneX)
      .defined((d) => d.movingAverage !== undefined); // 이동평균이 있는 데이터만

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

    // 메인 라인 그리기 (신규 가입자)
    chartGroup
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 2)
      .attr("d", line);

    // 이동평균 라인 그리기
    chartGroup
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#EF4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("d", movingAverageLine);

    // 데이터 포인트 원 그리기
    chartGroup
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.newUsers))
      .attr("r", 4)
      .attr("fill", "#3B82F6")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        // 호버 효과
        d3.select(this).attr("r", 6);

        // 툴팁 표시
        tooltip
          .style("opacity", 1)
          .html(
            `
            <div><strong>${d.date.toLocaleDateString("ko-KR")}</strong></div>
            <div>신규 가입자: ${d.newUsers}명</div>
            ${
              d.movingAverage
                ? `<div>7일 평균: ${d.movingAverage.toFixed(1)}명</div>`
                : ""
            }
            <div>요일: ${d.date.toLocaleDateString("ko-KR", {
              weekday: "long",
            })}</div>
          `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 4);
        tooltip.style("opacity", 0);
      });

    // X축 생성
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.timeFormat("%m/%d"))
          .ticks(d3.timeDay.every(3))
      )
      .selectAll("text")
      .style("font-size", "11px");

    // Y축 생성
    chartGroup
      .append("g")
      .call(d3.axisLeft(yScale).tickFormat((d) => `${d}명`))
      .selectAll("text")
      .style("font-size", "11px");

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
      .text("신규 가입자 수 (명)");

    chartGroup
      .append("text")
      .attr(
        "transform",
        `translate(${chartWidth / 2}, ${chartHeight + margin.bottom - 5})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("날짜");

    // 범례 추가
    const legend = chartGroup
      .append("g")
      .attr("transform", `translate(${chartWidth + 20}, 20)`);

    // 일일 신규가입자 범례
    legend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 20)
      .attr("y1", 5)
      .attr("y2", 5)
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 2);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 9)
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("일일 신규가입자");

    // 7일 이동평균 범례
    legend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 20)
      .attr("y1", 25)
      .attr("y2", 25)
      .attr("stroke", "#EF4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 29)
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("7일 이동평균");

    // 면적 차트 추가 (선택적 - 데이터의 볼륨감 강조)
    const area = d3
      .area<DailyData>()
      .x((d) => xScale(d.date))
      .y0(chartHeight)
      .y1((d) => yScale(d.newUsers))
      .curve(d3.curveMonotoneX);

    chartGroup
      .append("path")
      .datum(data)
      .attr("fill", "url(#gradient)")
      .attr("d", area);

    // 그라디언트 정의
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", chartHeight);

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#3B82F6")
      .attr("stop-opacity", 0.3);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#3B82F6")
      .attr("stop-opacity", 0.1);

    // cleanup 함수에서 툴팁 제거
    return () => {
      tooltip.remove();
    };
  }, [width, height]);

  return (
    <div className="w-full shadow border border-slate-300">
      <SectionTitle text="일별 신규 가입자 추이" />
      <small className="mt-2 text-sm text-gray-600 px-5">
        * 점선은 7일 이동평균을 나타내며, 전반적인 트렌드를 파악할 수 있습니다.
      </small>
      <div className="bg-white p-5 ">
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

export default DailyLineChart;
