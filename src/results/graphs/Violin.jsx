import { useMemo } from "react";
import * as d3 from "d3";
import { VerticalViolinShape } from "./violin/VerticalViolinShape";
import { AxisLeft } from "./boxplot/AxisLeft";
import { AxisBottom } from "./boxplot/AxisBottomCategoric";

const MARGIN = { top: 20, right: 30, bottom: 50, left: 50 };
const COLORS = ["#e85252", "#6689c6", "#9a6fb0", "#a53253"];

// type ViolinProps = {
//   width: number;
//   height: number;
//   data: { name: string; value: number }[];
//   smoothing: boolean;
//   bucketNumber: number;
// };

export const Violin = ({ width, height, data, smoothing, bucketNumber }) => {
  const boundsWidth = useMemo(() => {
    return width - MARGIN.right - MARGIN.left;
  }, [width]);
  const boundsHeight = useMemo(() => {
    return height - MARGIN.top - MARGIN.bottom;
  }, [height]);

  // Compute everything derived from the dataset:
  const { chartMin, chartMax, groups } = useMemo(() => {
    const chartMin = d3.min(data, (d) => d.value);
    const chartMax = d3.max(data, (d) => d.value);
    const groups = [...new Set(data.map((d) => d.name))];
    return { chartMin, chartMax, groups };
  }, [data]);

  //
  // Scales
  //
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([chartMin, chartMax])
      .range([boundsHeight, 0])
      .nice();
  }, [data, height]);

  const xScale = useMemo(() => {
    return d3.scaleBand().range([0, boundsWidth]).domain(groups).padding(0.15);
  }, [data, width]);

  const colorScale = useMemo(() => {
    return d3.scaleOrdinal().domain(groups).range(COLORS);
  }, [data]);

  const allViolins = groups.map((group, i) => {
    const groupData = data.filter((d) => d.name === group).map((d) => d.value);
    return (
      <g key={i} transform={`translate(${xScale(group)},0)`}>
        <VerticalViolinShape
          data={groupData}
          binNumber={10}
          yScale={yScale}
          width={xScale.bandwidth()}
          fill={`var(--colorlg${i + 1})`}
          smoothing={smoothing}
          bucketNumber={bucketNumber}
        />
      </g>
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allViolins}
        <AxisLeft yScale={yScale} pixelsPerTick={30} />
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom xScale={xScale} />
        </g>
      </g>
    </svg>
  );
};
