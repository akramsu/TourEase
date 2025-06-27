"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockHourlyPatterns } from "@/data/mock-database-data"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 24 }, (_, i) => i)

export function DatabaseVisitorHeatmap() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 60, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3.scaleBand().domain(hours.map(String)).range([0, width]).padding(0.05)
    const yScale = d3.scaleBand().domain(days).range([0, height]).padding(0.05)

    const maxVisitors = d3.max(mockHourlyPatterns, (d) => d.visitors) || 0
    const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, maxVisitors])

    // Create heatmap cells
    g.selectAll(".cell")
      .data(mockHourlyPatterns)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", (d) => xScale(String(d.hour)) || 0)
      .attr("y", (d) => yScale(days[d.day]) || 0)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.visitors))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("rx", 3)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke-width", 2).attr("stroke", "#333")

        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.9)")
          .style("color", "white")
          .style("padding", "12px")
          .style("border-radius", "8px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000")

        tooltip.transition().duration(200).style("opacity", 1)
        tooltip
          .html(`
            <strong>${d.dayName} ${d.hour}:00</strong><br/>
            Visitors: ${d.visitors}<br/>
            <small>Based on Visit table aggregation</small>
          `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-width", 1).attr("stroke", "#fff")
        d3.selectAll(".tooltip").remove()
      })

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Hour of Day")

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Day of Week")

    // Add legend
    const legendWidth = 200
    const legendHeight = 20
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - legendWidth + margin.left}, ${margin.top - 10})`)

    const legendScale = d3.scaleLinear().domain([0, maxVisitors]).range([0, legendWidth])
    const legendAxis = d3.axisBottom(legendScale).ticks(5).tickFormat(d3.format("d"))

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")

    gradient
      .selectAll("stop")
      .data(d3.range(0, 1.1, 0.1))
      .enter()
      .append("stop")
      .attr("offset", (d) => `${d * 100}%`)
      .attr("stop-color", (d) => colorScale(d * maxVisitors))

    legend.append("rect").attr("width", legendWidth).attr("height", legendHeight).style("fill", "url(#legend-gradient)")

    legend.append("g").attr("transform", `translate(0, ${legendHeight})`).call(legendAxis)

    legend
      .append("text")
      .attr("x", legendWidth / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .attr("fill", "currentColor")
      .text("Visitors per Hour")
  }, [])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Visitor Flow Heatmap</CardTitle>
        <CardDescription>
          Hourly visitor patterns throughout the week (based on Visit table aggregation)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-xs text-muted-foreground font-mono">
          Query: SELECT HOUR(VisitDate) as hour, DAYOFWEEK(VisitDate) as day, COUNT(*) as visitors FROM Visit GROUP BY
          hour, day
        </div>
        <svg ref={svgRef} width="100%" height="400" className="overflow-visible" />
      </CardContent>
    </Card>
  )
}
