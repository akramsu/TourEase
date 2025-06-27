"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Jan", visitors: 12400, revenue: 45600, predicted: 13200 },
  { month: "Feb", visitors: 13200, revenue: 48900, predicted: 14100 },
  { month: "Mar", visitors: 15800, revenue: 58200, predicted: 16200 },
  { month: "Apr", visitors: 18900, revenue: 69800, predicted: 19800 },
  { month: "May", visitors: 22100, revenue: 81500, predicted: 23500 },
  { month: "Jun", visitors: 25600, revenue: 94300, predicted: 26800 },
  { month: "Jul", visitors: 28900, revenue: 106700, predicted: 30100 },
  { month: "Aug", visitors: 26800, revenue: 98900, predicted: 28200 },
  { month: "Sep", visitors: 23400, revenue: 86200, predicted: 24800 },
  { month: "Oct", visitors: 19800, revenue: 73100, predicted: 21200 },
  { month: "Nov", visitors: 16500, revenue: 60800, predicted: 17800 },
  { month: "Dec", visitors: 18200, revenue: 67200, predicted: 19500 },
]

export function AdvancedVisitorChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.visitors, d.predicted)) || 0])
      .range([height, 0])

    // Gradient definitions
    const defs = svg.append("defs")

    const gradient = defs
      .append("linearGradient")
      .attr("id", "areaGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", 0)
      .attr("y2", 0)

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "rgba(99, 102, 241, 0)")

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(99, 102, 241, 0.3)")

    // Area generator
    const area = d3
      .area<(typeof data)[0]>()
      .x((d) => xScale(d.month) || 0)
      .y0(height)
      .y1((d) => yScale(d.visitors))
      .curve(d3.curveCardinal)

    // Line generators
    const line = d3
      .line<(typeof data)[0]>()
      .x((d) => xScale(d.month) || 0)
      .y((d) => yScale(d.visitors))
      .curve(d3.curveCardinal)

    const predictedLine = d3
      .line<(typeof data)[0]>()
      .x((d) => xScale(d.month) || 0)
      .y((d) => yScale(d.predicted))
      .curve(d3.curveCardinal)

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

    // Add area
    g.append("path").datum(data).attr("fill", "url(#areaGradient)").attr("d", area)

    // Add actual line
    g.append("path").datum(data).attr("fill", "none").attr("stroke", "#6366f1").attr("stroke-width", 3).attr("d", line)

    // Add predicted line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#ec4899")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("d", predictedLine)

    // Add dots for actual data
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.month) || 0)
      .attr("cy", (d) => yScale(d.visitors))
      .attr("r", 4)
      .attr("fill", "#6366f1")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)

    // Add dots for predicted data
    g.selectAll(".predicted-dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "predicted-dot")
      .attr("cx", (d) => xScale(d.month) || 0)
      .attr("cy", (d) => yScale(d.predicted))
      .attr("r", 3)
      .attr("fill", "#ec4899")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "currentColor")

    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d3.format(".0s")))
      .selectAll("text")
      .style("fill", "currentColor")

    // Add hover effects
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")

    g.selectAll(".dot")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 6)
        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip
          .html(`Month: ${d.month}<br/>Visitors: ${d.visitors.toLocaleString()}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 4)
        tooltip.transition().duration(500).style("opacity", 0)
      })

    return () => {
      d3.select("body").selectAll(".tooltip").remove()
    }
  }, [])

  return (
    <Card className="col-span-2 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Advanced Visitor Analytics
        </CardTitle>
        <CardDescription>Real-time and predicted visitor trends with AI insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Predicted</span>
          </div>
        </div>
        <svg ref={svgRef} width="100%" height="400" className="overflow-visible" />
      </CardContent>
    </Card>
  )
}
