"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Search, TrendingUp, TrendingDown } from "lucide-react"
import { mockPerformanceRankings } from "@/data/mock-tourism-data"

type SortField = "rank" | "visitors" | "revenue" | "rating" | "capacityUtilization" | "growthRate"
type SortDirection = "asc" | "desc"

export function PerformanceRankingTable() {
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = mockPerformanceRankings
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const multiplier = sortDirection === "asc" ? 1 : -1

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * multiplier
      }
      return String(aValue).localeCompare(String(bValue)) * multiplier
    })

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button variant="ghost" size="sm" onClick={() => handleSort(field)} className="h-8 px-2 text-xs font-medium">
      {children}
      <ArrowUpDown className="ml-1 h-3 w-3" />
    </Button>
  )

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Attraction Performance Rankings</CardTitle>
        <CardDescription>Comprehensive performance metrics and rankings</CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attractions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">
                  <SortButton field="rank">Rank</SortButton>
                </th>
                <th className="text-left p-2">Attraction</th>
                <th className="text-left p-2">
                  <SortButton field="visitors">Visitors</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="revenue">Revenue</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="rating">Rating</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="capacityUtilization">Capacity</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="growthRate">Growth</SortButton>
                </th>
                <th className="text-left p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((attraction) => (
                <tr key={attraction.attractionId} className="border-b hover:bg-muted/50">
                  <td className="p-2">
                    <Badge variant={attraction.rank <= 3 ? "default" : "secondary"}>#{attraction.rank}</Badge>
                  </td>
                  <td className="p-2">
                    <div>
                      <div className="font-medium">{attraction.name}</div>
                      <div className="text-sm text-muted-foreground">{attraction.category}</div>
                    </div>
                  </td>
                  <td className="p-2 font-mono">{attraction.visitors.toLocaleString()}</td>
                  <td className="p-2 font-mono">${attraction.revenue.toLocaleString()}</td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <span className="font-medium">{attraction.rating}</span>
                      <span className="text-muted-foreground ml-1">/5</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${attraction.capacityUtilization}%` }}
                        />
                      </div>
                      <span className="text-sm">{attraction.capacityUtilization}%</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      {attraction.growthRate > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={attraction.growthRate > 0 ? "text-green-600" : "text-red-600"}>
                        {attraction.growthRate > 0 ? "+" : ""}
                        {attraction.growthRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <Badge
                      variant={
                        attraction.performanceScore >= 85
                          ? "default"
                          : attraction.performanceScore >= 70
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {attraction.performanceScore}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
