"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { category: "Museums", revenue: 156800, visitors: 12400, growth: 15.2 },
  { category: "Parks", revenue: 138900, visitors: 15600, growth: 22.8 },
  { category: "Historical", revenue: 122100, visitors: 9800, growth: 8.4 },
  { category: "Adventure", revenue: 98700, visitors: 7200, growth: 31.5 },
  { category: "Cultural", revenue: 84300, visitors: 6100, growth: 12.7 },
]

export function ModernRevenueChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 60, left: 80 }
    const width = 500 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.3)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.revenue) || 0])
      .range([height, 0])

    // Color scale
    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, data.length - 1])
      .range(["#6366f1", "#ec4899"])

    // Gradient definitions
    const defs = svg.append("defs")

    data.forEach((d, i) => {
      const gradient = defs
        .append("linearGradient")
        .attr("id", `barGradient${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", height)
        .attr("x2", 0)
        .attr("y2", 0)

      gradient.append("stop").attr("offset", "0%").attr("stop-color", colorScale(i)).attr("stop-opacity", 0.3)

      gradient.append("stop").attr("offset", "100%").attr("stop-color", colorScale(i)).attr("stop-opacity", 1)
    })

    // Add grid lines
    g.selectAll(".grid-line")
      .data(yScale.ticks(5))
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "rgba(148, 163, 184, 0.1)")
      .attr("stroke-width", 1)

    // Add bars
    const bars = g
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.category) || 0)
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => `url(#barGradient${i})`)
      .attr("rx", 8)
      .attr("ry", 8)

    // Animate bars
    bars
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", (d) => yScale(d.revenue))
      .attr("height", (d) => height - yScale(d.revenue))

    // Add value labels on bars
    const labels = g
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text((d) => `$${(d.revenue / 1000).toFixed(0)}K`)

    // Animate labels
    labels
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", (d) => yScale(d.revenue) + 20)

    // Add growth indicators
    const growthIndicators = g
      .selectAll(".growth")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "growth")
      .attr("x", (d) => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.revenue) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "#10b981")
      .text((d) => `+${d.growth}%`)
      .style("opacity", 0)

    // Animate growth indicators
    growthIndicators.transition().duration(1000).delay(1200).style("opacity", 1)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "currentColor")
      .style("font-size", "12px")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")

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
      .style("background", "rgba(0, 0, 0, 0.9)")
      .style("color", "white")
      .style("padding", "12px")
      .style("border-radius", "8px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("backdrop-filter", "blur(10px)")

    bars
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("transform", "scale(1.05)")

        tooltip.transition().duration(200).style("opacity", 1)
        tooltip
          .html(`
            <strong>${d.category}</strong><br/>
            Revenue: $${d.revenue.toLocaleString()}<br/>
            Visitors: ${d.visitors.toLocaleString()}<br/>
            Growth: +${d.growth}%
          `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("transform", "scale(1)")

        tooltip.transition().duration(500).style("opacity", 0)
      })

    return () => {
      d3.select("body").selectAll(".tooltip").remove()
    }
  }, [])

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Revenue Performance
        </CardTitle>
        <CardDescription>Category-wise revenue analysis with growth indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <svg ref={svgRef} width="100%" height="400" className="overflow-visible" />
      </CardContent>
    </Card>
  )
}
