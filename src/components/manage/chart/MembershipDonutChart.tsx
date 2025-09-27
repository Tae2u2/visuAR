"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SectionTitle } from "@/components/util/Text";

/**
 * 멤버십 유형별 가입자 비율 도넛차트 컴포넌트
 *
 * 기능:
 * - 공식 멤버십과 비공식(일반) 사용자의 비율을 도넛차트로 표시
 * - 호버 시 해당 섹션 강조 및 상세 정보 표시
 * - 중앙에 총 가입자 수 표시
 * - 애니메이션 효과로 부드러운 전환
 */

// 멤버십 데이터 타입 정의
interface MembershipData {
  type: "official" | "general"; // 멤버십 유형
  label: string; // 표시 라벨
  count: number; // 가입자 수
  color: string; // 차트 색상
}

interface MembershipDonutChartProps {
  width?: number;
  height?: number;
}

const MembershipDonutChart: React.FC<MembershipDonutChartProps> = ({
  width = 400,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // 샘플 데이터 생성 - 실제 환경에서는 props나 API에서 받아와야 함
  const generateSampleData = (): MembershipData[] => {
    return [
      {
        type: "official",
        label: "공식 멤버십",
        count: 8792,
        color: "#10B981", // 초록색
      },
      {
        type: "general",
        label: "일반 사용자",
        count: 3456,
        color: "#6B7280", // 회색
      },
    ];
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const data = generateSampleData();
    const totalUsers = data.reduce((sum, d) => sum + d.count, 0);

    // SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 차트 설정
    const radius = Math.min(width, height) / 2 - 40;
    const innerRadius = radius * 0.6; // 도넛 형태를 위한 내부 반지름

    // 중앙으로 이동하는 그룹 생성
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${width / 1.5}, ${height / 2})`);

    // 파이 레이아웃 생성
    const pie = d3
      .pie<MembershipData>()
      .value((d) => d.count)
      .sort(null)
      .padAngle(0.02); // 섹션 간 간격

    // 아크 생성기
    const arc = d3
      .arc<d3.PieArcDatum<MembershipData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    // 호버 시 확장된 아크
    const arcHover = d3
      .arc<d3.PieArcDatum<MembershipData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius + 10);

    // 툴팁 생성
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "12px")
      .style("border-radius", "6px")
      .style("font-size", "14px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000)
      .style("box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1)");

    // 파이 슬라이스 그리기
    const slices = chartGroup
      .selectAll(".slice")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "slice");

    // 아크 패스 추가
    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("opacity", 0.9)
      .on("mouseover", function (event, d) {
        // 호버 효과 - 아크 확장
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcHover)
          .style("opacity", 1);

        // 다른 슬라이스 투명도 감소
        slices
          .selectAll("path")
          .filter(function () {
            return this !== event.currentTarget;
          })
          .transition()
          .duration(200)
          .style("opacity", 0.6);

        // 툴팁 표시
        const percentage = ((d.data.count / totalUsers) * 100).toFixed(1);
        tooltip
          .style("opacity", 1)
          .html(
            `
            <div style="font-weight: bold; margin-bottom: 8px;">${
              d.data.label
            }</div>
            <div>가입자 수: ${d.data.count.toLocaleString()}명</div>
            <div>비율: ${percentage}%</div>
            <div style="margin-top: 8px; font-size: 12px; color: #ccc;">
              전체 ${totalUsers.toLocaleString()}명 중
            </div>
          `
          )
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 15 + "px");
      })
      .on("mouseout", function () {
        // 호버 효과 제거
        slices
          .selectAll("path")
          .transition()
          .duration(200)
          .attr("d", arc)
          .style("opacity", 0.9);

        tooltip.style("opacity", 0);
      });

    // 애니메이션 효과 추가
    slices
      .selectAll("path")
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t)) || "";
        };
      });

    // 중앙 텍스트 - 총 가입자 수
    const centerGroup = chartGroup.append("g");

    centerGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text(totalUsers.toLocaleString());

    centerGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .style("font-size", "14px")
      .style("fill", "#666")
      .text("총 가입자");

    // 범례 생성
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width + 20}, 30)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 30})`);

    // 범례 색상 박스
    legendItems
      .append("rect")
      .attr("width", 16)
      .attr("height", 16)
      .attr("fill", (d) => d.color)
      .attr("rx", 2);

    // 범례 텍스트
    legendItems
      .append("text")
      .attr("x", 24)
      .attr("y", 8)
      .attr("dy", "0.35em")
      .style("font-size", "14px")
      .style("fill", "#333")
      .text((d) => d.label);

    // 범례 수치
    legendItems
      .append("text")
      .attr("x", 24)
      .attr("y", 8)
      .attr("dy", "1.5em")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text((d) => {
        const percentage = ((d.count / totalUsers) * 100).toFixed(1);
        return `${d.count.toLocaleString()}명 (${percentage}%)`;
      });

    // 라벨 라인과 텍스트 (파이 차트 외부)
    const labelArc = d3
      .arc<d3.PieArcDatum<MembershipData>>()
      .innerRadius(radius + 20)
      .outerRadius(radius + 20);

    // 라벨 연결선
    chartGroup
      .selectAll(".label-line")
      .data(pie(data))
      .enter()
      .append("polyline")
      .attr("class", "label-line")
      .attr("points", (d) => {
        const pos = labelArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = (radius + 30) * (midAngle < Math.PI ? 1 : -1);
        return [arc.centroid(d), labelArc.centroid(d), pos]
          .map((p) => p.join(","))
          .join(" ");
      })
      .style("fill", "none")
      .style("stroke", "#999")
      .style("stroke-width", 1)
      .style("opacity", 0.7);

    // 외부 라벨 텍스트
    chartGroup
      .selectAll(".label-text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("class", "label-text")
      .attr("transform", (d) => {
        const pos = labelArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = (radius + 35) * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? "start" : "end";
      })
      .style("font-size", "12px")
      .style("fill", "#333")
      .text((d) => {
        const percentage = ((d.data.count / totalUsers) * 100).toFixed(1);
        return `${percentage}%`;
      });

    // cleanup 함수에서 툴팁 제거
    return () => {
      tooltip.remove();
    };
  }, [width, height]);

  return (
    <div className="w-full border border-slate-300 shadow bg-white max-w-[550px]">
      <SectionTitle text="멤버십 유형별 가입자 비율" />
      <div className="bg-white p-5">
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

export default MembershipDonutChart;
