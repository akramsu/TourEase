"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "18-25", value: 28, color: "#6366f1" },
  { name: "26-35", value: 35, color: "#8b5cf6" },
  { name: "36-45", value: 22, color: "#ec4899" },
  { name: "46-55", value: 10, color: "#f59e0b" },
  { name: "55+", value: 5, color: "#10b981" },
]

export function InteractiveDonutChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 300
    const height = 300
    const radius = Math.min(width, height) / 2 - 10

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`)

    // Create pie layout
    const pie = d3
      .pie<(typeof data)[0]>()
      .value((d) => d.value)
      .sort(null)

    // Create arc generators
    const arc = d3
      .arc<d3.PieArcDatum<(typeof data)[0]>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)

    const arcHover = d3
      .arc<d3.PieArcDatum<(typeof data)[0]>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius + 10)

    // Create gradient definitions
    const defs = svg.append("defs")

    data.forEach((d, i) => {
      const gradient = defs
        .append("radialGradient")
        .attr("id", `donutGradient${i}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")

      gradient.append("stop").attr("offset", "0%").attr("stop-color", d.color).attr("stop-opacity", 0.8)

      gradient.append("stop").attr("offset", "100%").attr("stop-color", d.color).attr("stop-opacity", 1)
    })

    // Create arcs
    const arcs = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc")

    // Add paths
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => `url(#donutGradient${i})`)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arcHover)

        setSelectedSegment(d.data.name)
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arc)

        setSelectedSegment(null)
      })

    // Add labels
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text((d) => `${d.data.value}%`)

    // Add center text
    const centerText = g.append("g").attr("class", "center-text")

    centerText
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .attr("fill", "currentColor")
      .attr("y", -5)
      .text("Demographics")

    centerText
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "currentColor")
      .attr("y", 15)
      .text("Age Groups")
  }, [])

  return (
    <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Visitor Demographics
        </CardTitle>
        <CardDescription>Interactive age group distribution analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <svg ref={svgRef} width="300" height="300" />
          <div className="space-y-3 ml-6">
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                  selectedSegment === item.name
                    ? "bg-white dark:bg-gray-800 shadow-md scale-105"
                    : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
