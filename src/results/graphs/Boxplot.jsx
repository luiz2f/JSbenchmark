import { useMemo } from "react";
import * as d3 from "d3";
import { getSummaryStats } from "./boxplot/getSummaryStats";
import { AxisLeft } from "./boxplot/AxisLeft";
import { AxisBottom } from "./boxplot/AxisBottomCategoric";
import { VerticalBox } from "./boxplot/VerticalBox";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 50 };

export const Boxplot = ({ width, height, data }) => {
  // The bounds (= area inside the axis) is calculated by substracting the margins from total width / height
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Compute everything derived from the dataset:
  const { chartMin, chartMax, groups } = useMemo(() => {
    const chartMin = d3.min(data, (d) => d.value) * 0.5;
    const chartMax = d3.max(data, (d) => d.value) * 1.05;
    const groups = [...new Set(data?.map((d) => d.name))];
    return { chartMin, chartMax, groups };
  }, [data]);

  // Compute scales
  const yScale = d3
    .scaleLinear()
    .domain([chartMin, chartMax])
    .range([boundsHeight, 0]);
  const xScale = d3
    .scaleBand()
    .range([0, boundsWidth])
    .domain(groups)
    .padding(0.25);

  const summaryStats = groups.map((group) => {
    const groupData = data?.filter((d) => d.name === group).map((d) => d.value);
    return getSummaryStats(groupData);
  });

  const hasValidStats = summaryStats.some((stats) => {
    if (!stats) return false;
    const { min, q1, q3, max } = stats;
    const range = max - min;
    const iqr = q3 - q1;
    const rangeThreshold = range * 0.05;
    const iqrThreshold = iqr * 0.05;

    return !(
      (range < rangeThreshold && iqr < iqrThreshold) ||
      (range === 0 && iqr === 0)
    );
  });

  if (!hasValidStats) {
    return null; // Retornar antes se não houver estatísticas válidas
  }

  // Build the box shapes
  const allShapes = groups.map((group, i) => {
    const groupData = data?.filter((d) => d.name === group).map((d) => d.value);
    const sumStats = getSummaryStats(groupData);
    const { min, q1, median, q3, max } = sumStats;

    if (!sumStats) {
      return null;
    }

    return (
      <g key={i} transform={`translate(${xScale(group)},0)`}>
        <VerticalBox
          width={xScale.bandwidth()}
          q1={yScale(q1)}
          median={yScale(median)}
          q3={yScale(q3)}
          min={yScale(min)}
          max={yScale(max)}
          stroke="black"
          fill={`var(--colorlg${i + 1})`}
        />
      </g>
    );
  });

  return (
    <svg width={width} height={height} className="boxplot">
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allShapes}
        <AxisLeft yScale={yScale} pixelsPerTick={30} />
        {/* X axis uses an additional translation to appear at the bottom */}
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom xScale={xScale} />
        </g>
      </g>
    </svg>
  );
};
