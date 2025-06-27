"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockForecastData } from "@/data/mock-tourism-data"

export function ForecastChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Parse dates
    const data = mockForecastData.slice(0, 30).map((d) => ({
      ...d,
      date: new Date(d.forecastDate),
    }))

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.confidenceInterval.lower) || 0,
        d3.max(data, (d) => d.confidenceInterval.upper) || 0,
      ])
      .range([height, 0])

    // Create gradient for confidence interval
    const defs = svg.append("defs")
    const gradient = defs
      .append("linearGradient")
      .attr("id", "confidenceGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", 0)
      .attr("y2", 0)

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.1)

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.3)

    // Area generator for confidence interval
    const area = d3
      .area<(typeof data)[0]>()
      .x((d) => xScale(d.date))
      .y0((d) => yScale(d.confidenceInterval.lower))
      .y1((d) => yScale(d.confidenceInterval.upper))
      .curve(d3.curveCardinal)

    // Line generator for prediction
    const line = d3
      .line<(typeof data)[0]>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.predictedVisitors))
      .curve(d3.curveCardinal)

    // Add confidence interval area
    g.append("path").datum(data).attr("fill", "url(#confidenceGradient)").attr("d", area)

    // Add prediction line
    g.append("path").datum(data).attr("fill", "none").attr("stroke", "#3b82f6").attr("stroke-width", 3).attr("d", line)

    // Add dots for predictions
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.predictedVisitors))
      .attr("r", 4)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
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

        tooltip.transition().duration(200).style("opacity", 1)
        tooltip
          .html(`
          <strong>${d.forecastDate}</strong><br/>
          Predicted: ${d.predictedVisitors.toLocaleString()}<br/>
          Range: ${d.confidenceInterval.lower.toLocaleString()} - ${d.confidenceInterval.upper.toLocaleString()}
        `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", () => {
        d3.selectAll(".tooltip").remove()
      })

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%d")))

    g.append("g").call(d3.axisLeft(yScale).tickFormat(d3.format(".0s")))

    // Add grid lines
    g.selectAll(".grid-line")
      .data(yScale.ticks(6))
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "rgba(148, 163, 184, 0.1)")
      .attr("stroke-width", 1)
  }, [])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>30-Day Visitor Forecast</CardTitle>
        <CardDescription>AI-powered predictions with confidence intervals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Predicted Visitors</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Confidence Interval</span>
          </div>
        </div>
        <svg ref={svgRef} width="100%" height="400" className="overflow-visible" />
      </CardContent>
    </Card>
  )
}
