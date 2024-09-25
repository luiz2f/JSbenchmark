import * as d3 from "d3";

export const getSummaryStats = (data) => {
  const min = d3.min(data);
  const max = d3.max(data);
  const q1 = d3.quantile(data.sort(d3.ascending), 0.25);
  const median = d3.quantile(data.sort(d3.ascending), 0.5);
  const q3 = d3.quantile(data.sort(d3.ascending), 0.75);

  return { min, q1, median, q3, max };
};
