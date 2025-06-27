"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockVisitorOrigins } from "@/data/mock-tourism-data"

export function VisitorOriginMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This would normally use React-Leaflet, but for now we'll create a simple visualization
    if (!mapRef.current) return

    // Create a simple world map visualization using SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "400")
    svg.setAttribute("viewBox", "0 0 800 400")

    // Simple world map background
    const worldRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    worldRect.setAttribute("width", "800")
    worldRect.setAttribute("height", "400")
    worldRect.setAttribute("fill", "#f0f9ff")
    worldRect.setAttribute("stroke", "#e0e7ff")
    svg.appendChild(worldRect)

    // Add visitor origin points
    mockVisitorOrigins.forEach((origin, index) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

      // Convert lat/lng to SVG coordinates (simplified projection)
      const x = ((origin.coordinates.lng + 180) / 360) * 800
      const y = ((90 - origin.coordinates.lat) / 180) * 400

      circle.setAttribute("cx", x.toString())
      circle.setAttribute("cy", y.toString())
      circle.setAttribute("r", Math.sqrt(origin.count / 1000) + 3)
      circle.setAttribute("fill", "#3b82f6")
      circle.setAttribute("fill-opacity", "0.7")
      circle.setAttribute("stroke", "#1d4ed8")
      circle.setAttribute("stroke-width", "2")

      // Add hover effect
      circle.addEventListener("mouseenter", () => {
        circle.setAttribute("fill-opacity", "1")
        circle.setAttribute("r", (Math.sqrt(origin.count / 1000) + 5).toString())
      })

      circle.addEventListener("mouseleave", () => {
        circle.setAttribute("fill-opacity", "0.7")
        circle.setAttribute("r", (Math.sqrt(origin.count / 1000) + 3).toString())
      })

      svg.appendChild(circle)
    })

    mapRef.current.appendChild(svg)

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Origins</CardTitle>
        <CardDescription>Geographic distribution of visitor sources</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg"
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          {mockVisitorOrigins.slice(0, 4).map((origin, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span className="text-sm font-medium">{origin.city}</span>
              <span className="text-sm text-muted-foreground">{origin.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
