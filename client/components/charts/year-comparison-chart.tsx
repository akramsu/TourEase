"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar } from "lucide-react"

const yearComparisonData = [
  { month: "Jan", "2023": 2400, "2024": 2800 },
  { month: "Feb", "2023": 1398, "2024": 1680 },
  { month: "Mar", "2023": 9800, "2024": 11200 },
  { month: "Apr", "2023": 3908, "2024": 4200 },
  { month: "May", "2023": 4800, "2024": 5400 },
  { month: "Jun", "2023": 3800, "2024": 4100 },
  { month: "Jul", "2023": 4300, "2024": 4800 },
  { month: "Aug", "2023": 4200, "2024": 4600 },
  { month: "Sep", "2023": 3900, "2024": 4300 },
  { month: "Oct", "2023": 3700, "2024": 4000 },
  { month: "Nov", "2023": 3200, "2024": 3600 },
  { month: "Dec", "2023": 3500, "2024": 3900 },
]

export function YearComparisonChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const totalGrowth = 16.8
  const total2024 = 48500
  const total2023 = 41500

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = dimensions.width - margin.left - margin.right
    const height = dimensions.height - margin.top - margin.bottom

    if (width <= 0 || height <= 0) return

    // Create main group
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Create gradients
    const defs = svg.append("defs")

    const gradient2023 = defs
      .append("linearGradient")
      .attr("id", "gradient2023")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")

    gradient2023.append("stop").attr("offset", "0%").attr("stop-color", "#8b5cf6").attr("stop-opacity", 0.8)

    gradient2023.append("stop").attr("offset", "100%").attr("stop-color", "#8b5cf6").attr("stop-opacity", 0.3)

    const gradient2024 = defs
      .append("linearGradient")
      .attr("id", "gradient2024")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")

    gradient2024.append("stop").attr("offset", "0%").attr("stop-color", "#06b6d4").attr("stop-opacity", 0.8)

    gradient2024.append("stop").attr("offset", "100%").attr("stop-color", "#06b6d4").attr("stop-opacity", 0.3)

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(yearComparisonData.map((d) => d.month))
      .range([0, width])
      .padding(0.3)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yearComparisonData, (d) => Math.max(d["2023"], d["2024"])) || 0])
      .range([height, 0])

    // Create grid lines
    const yAxis = d3.axisLeft(yScale).tickSize(-width).tickFormat("")

    g.append("g")
      .attr("class", "grid")
      .call(yAxis)
      .selectAll("line")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.5)

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("fill", "#64748b")
      .style("font-size", "12px")

    // Y axis
    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d3.format(".0s")))
      .selectAll("text")
      .attr("fill", "#64748b")
      .style("font-size", "12px")

    // Remove axis lines
    g.selectAll(".domain").remove()
    g.selectAll(".tick line").remove()

    // Create tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px 12px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "1000")

    // Bars for 2023
    g.selectAll(".bar-2023")
      .data(yearComparisonData)
      .enter()
      .append("rect")
      .attr("class", "bar-2023")
      .attr("x", (d) => (xScale(d.month) || 0) + xScale.bandwidth() * 0.1)
      .attr("width", xScale.bandwidth() * 0.35)
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "url(#gradient2023)")
      .attr("rx", 4)
      .attr("ry", 4)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.8)
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.month} 2023</strong><br/>Visitors: ${d["2023"].toLocaleString()}`)
      })
      .on("mousemove", (event) => {
        tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px")
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1)
        tooltip.style("visibility", "hidden")
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", (d) => yScale(d["2023"]))
      .attr("height", (d) => height - yScale(d["2023"]))

    // Bars for 2024
    g.selectAll(".bar-2024")
      .data(yearComparisonData)
      .enter()
      .append("rect")
      .attr("class", "bar-2024")
      .attr("x", (d) => (xScale(d.month) || 0) + xScale.bandwidth() * 0.55)
      .attr("width", xScale.bandwidth() * 0.35)
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "url(#gradient2024)")
      .attr("rx", 4)
      .attr("ry", 4)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.8)
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.month} 2024</strong><br/>Visitors: ${d["2024"].toLocaleString()}`)
      })
      .on("mousemove", (event) => {
        tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px")
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1)
        tooltip.style("visibility", "hidden")
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 50)
      .attr("y", (d) => yScale(d["2024"]))
      .attr("height", (d) => height - yScale(d["2024"]))

    // Legend
    const legend = g.append("g").attr("transform", `translate(${width - 120}, 10)`)

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#8b5cf6")
      .attr("rx", 2)

    legend
      .append("text")
      .attr("x", 18)
      .attr("y", 9)
      .text("2023")
      .attr("fill", "#64748b")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle")

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#06b6d4")
      .attr("rx", 2)

    legend
      .append("text")
      .attr("x", 18)
      .attr("y", 29)
      .text("2024")
      .attr("fill", "#64748b")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle")

    return () => {
      tooltip.remove()
    }
  }, [dimensions])

  return (
    <Card className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 border-0 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Year-to-Year Performance
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Visitor comparison between 2023 and 2024</CardDescription>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-800">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-xs font-semibold text-green-600">+{totalGrowth}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="h-[200px] sm:h-[250px] lg:h-[280px] w-full">
          <svg ref={svgRef} width="100%" height="100%" style={{ overflow: "visible" }} />
        </div>
        <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="text-center p-3 bg-gradient-to-br from-white/80 to-green-50/80 dark:from-black/20 dark:to-green-950/20 rounded-xl border border-green-100 dark:border-green-900/30 backdrop-blur-sm">
            <div className="font-semibold text-green-600 flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />+{totalGrowth}%
            </div>
            <div className="text-muted-foreground">Growth Rate</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-black/20 dark:to-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
            <div className="font-semibold text-blue-600">{total2024.toLocaleString()}</div>
            <div className="text-muted-foreground">Total 2024</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-black/20 dark:to-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/30 backdrop-blur-sm">
            <div className="font-semibold text-purple-600">{total2023.toLocaleString()}</div>
            <div className="text-muted-foreground">Total 2023</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
