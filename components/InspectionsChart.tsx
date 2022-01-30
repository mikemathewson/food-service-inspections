import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Inspection } from "../types";

type Props = {
  inspections: Inspection[];
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

type YScaleFunction = (d: any) => number;

export default function InspectionsChart({
  inspections,
  width,
  height,
  margin,
}: Props) {
  // Build chart data
  let data: any[] = inspections
    .filter(
      // Remove duplicate dates
      (value, index, self) =>
        index === self.findIndex((t) => t.date == value.date)
    )
    .map((inspection) => {
      return {
        violations: inspection.violations,
        warnings: inspection.warnings,
        date: new Date(inspection.date),
      };
    });

  // Draw chart
  useEffect(() => {
    const yMinValue = 0;
    const yMaxValue = Math.max(
      d3.max(data, (d) => d.violations) as number,
      d3.max(data, (d) => d.warnings) as number,
      1
    );
    const xMinValue = data[0].date;
    const xMaxValue = new Date();

    // Get SVG element and set dimentions
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Remove old elements
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain([xMinValue, xMaxValue])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([yMinValue, yMaxValue])
      .range([height - margin.bottom, margin.top]);

    // Create X axis
    var xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Create Y axis
    var yAxis = d3
      .axisLeft(yScale)
      .tickValues(
        yScale.ticks().filter((tick: Number) => Number.isInteger(tick))
      )
      .tickFormat(d3.format("d"));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    const drawData = (y: YScaleFunction, color: string) => {
      const area = d3
        .area()
        .x((d: any) => xScale(d.date))
        .y0(yScale(0))
        .y1(y);

      // Draw area
      svg
        .append("path")
        .datum(data)
        .attr("fill", color)
        .attr("stroke", color)
        .attr("fill-opacity", 0.15)
        .attr("stroke-width", 1)
        .attr("class", "line")
        .attr("d", area);

      // Draw dots
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("fill", color)
        .attr("cx", (d) => xScale(d.date))
        .attr("cy", y)
        .attr("r", 3);
    };

    // Draw both data sets
    drawData((d) => yScale(d.warnings), "#d97706");
    drawData((d) => yScale(d.violations), "#be123c");
  }, [inspections]);

  const svgRef = useRef(null);

  return <svg ref={svgRef} style={{ width: "100%" }} />;
}

InspectionsChart.defaultProps = {
  width: 500,
  height: 300,
  margin: { top: 10, right: 20, bottom: 60, left: 30 },
};
