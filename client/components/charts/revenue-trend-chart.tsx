"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockRevenueData } from "@/data/mock-database-data"

export function RevenueTrendChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 80 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Prepare data - get trend data for top 3 attractions
    const topAttractions = mockRevenueData.revenueByAttraction.sort((a, b) => b.revenue - a.revenue).slice(0, 3)

    const allTrendData = topAttractions.flatMap((attraction) =>
      attraction.trend.map((point) => ({
        ...point,
        attractionId: attraction.attractionId,
        attractionName: attraction.name,
        date: new Date(point.visitDate),
      })),
    )

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(allTrendData, (d) => d.date) as [Date, Date])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allTrendData, (d) => d.amount) || 0])
      .range([height, 0])

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    // Line generator
    const line = d3
      .line<(typeof allTrendData)[0]>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.amount))
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

    // Draw lines for each attraction
    topAttractions.forEach((attraction, index) => {
      const attractionData = allTrendData.filter((d) => d.attractionId === attraction.attractionId)

      g.append("path")
        .datum(attractionData)
        .attr("fill", "none")
        .attr("stroke", colorScale(index.toString()))
        .attr("stroke-width", 3)
        .attr("d", line)

      // Add dots
      g.selectAll(`.dot-${attraction.attractionId}`)
        .data(attractionData)
        .enter()
        .append("circle")
        .attr("class", `dot-${attraction.attractionId}`)
        .attr("cx", (d) => xScale(d.date))
        .attr("cy", (d) => yScale(d.amount))
        .attr("r", 4)
        .attr("fill", colorScale(index.toString()))
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
            .style("z-index", "1000")

          tooltip.transition().duration(200).style("opacity", 1)
          tooltip
            .html(`
              <strong>${d.attractionName}</strong><br/>
              Date: ${d.visitDate}<br/>
              Revenue: Rp ${d.amount.toLocaleString()}<br/>
              <small>From Visit.Amount aggregation</small>
            `)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px")
        })
        .on("mouseout", () => {
          d3.selectAll(".tooltip").remove()
        })
    })

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%d")))

    g.append("g").call(d3.axisLeft(yScale).tickFormat((d) => `Rp ${(d / 1000).toFixed(0)}K`))

    // Add legend
    const legend = g.append("g").attr("transform", `translate(${width - 150}, 20)`)

    topAttractions.forEach((attraction, index) => {
      const legendItem = legend.append("g").attr("transform", `translate(0, ${index * 20})`)

      legendItem
        .append("line")
        .attr("x1", 0)
        .attr("x2", 15)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", colorScale(index.toString()))
        .attr("stroke-width", 3)

      legendItem
        .append("text")
        .attr("x", 20)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .attr("fill", "currentColor")
        .text(attraction.name.length > 15 ? attraction.name.substring(0, 15) + "..." : attraction.name)
    })
  }, [])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue Trends by Attraction</CardTitle>
        <CardDescription>
          Daily revenue trends for top performing attractions (based on Visit.Amount aggregation)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-xs text-muted-foreground font-mono">
          Query: SELECT VisitDate, AttractionID, SUM(Amount) as revenue FROM Visit GROUP BY VisitDate, AttractionID
        </div>
        <svg ref={svgRef} width="100%" height="400" className="overflow-visible" />
      </CardContent>
    </Card>
  )
}
