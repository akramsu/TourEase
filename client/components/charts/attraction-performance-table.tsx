"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Search, MapPin, Star, Users, DollarSign } from "lucide-react"
import { mockVisitorMetrics, mockAttractions } from "@/data/mock-database-data"

type SortField = "name" | "category" | "totalVisits" | "revenue" | "avgDuration" | "rating"
type SortDirection = "asc" | "desc"

export function AttractionPerformanceTable() {
  const [sortField, setSortField] = useState<SortField>("totalVisits")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Combine attraction data with performance metrics
  const performanceData = mockVisitorMetrics.visitsByAttraction.map((perf) => {
    const attraction = mockAttractions.find((a) => a.attractionId === perf.attractionId)
    return {
      ...perf,
      address: attraction?.address || "",
      coordinates: attraction ? { lat: attraction.latitude, lng: attraction.longitude } : null,
      revenuePerVisit: perf.totalVisits > 0 ? perf.revenue / perf.totalVisits : 0,
      capacityUtilization: attraction?.capacity ? (perf.totalVisits / attraction.capacity) * 100 : 0,
    }
  })

  const filteredAndSortedData = performanceData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase()),
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
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-8 px-1 sm:px-2 text-xs font-medium"
    >
      <span className="hidden sm:inline">{children}</span>
      <span className="sm:hidden">{typeof children === "string" ? children.split(" ")[0] : children}</span>
      <ArrowUpDown className="ml-1 h-3 w-3" />
    </Button>
  )

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-sm sm:text-base">Attraction Performance Analysis</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Comprehensive performance metrics based on Visit and Attraction table data
        </CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attractions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm text-xs sm:text-sm"
          />
        </div>
        <div className="text-xs text-muted-foreground font-mono hidden sm:block">
          Query: SELECT a.*, COUNT(v.VisitID) as visits, SUM(v.Amount) as revenue, AVG(v.Duration) as avg_duration FROM
          Attraction a LEFT JOIN Visit v ON a.AttractionID = v.AttractionID GROUP BY a.AttractionID
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-1 sm:p-2">
                    <SortButton field="name">Attraction</SortButton>
                  </th>
                  <th className="text-left p-1 sm:p-2">
                    <SortButton field="category">Category</SortButton>
                  </th>
                  <th className="text-left p-1 sm:p-2">
                    <SortButton field="totalVisits">Visits</SortButton>
                  </th>
                  <th className="text-left p-1 sm:p-2">
                    <SortButton field="revenue">Revenue</SortButton>
                  </th>
                  <th className="text-left p-1 sm:p-2 hidden md:table-cell">
                    <SortButton field="avgDuration">Duration</SortButton>
                  </th>
                  <th className="text-left p-1 sm:p-2">
                    <SortButton field="rating">Rating</SortButton>
                  </th>
                  <th className="text-left p-1 sm:p-2 hidden lg:table-cell">Performance</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((attraction) => (
                  <tr key={attraction.attractionId} className="border-b hover:bg-muted/50">
                    <td className="p-1 sm:p-2">
                      <div>
                        <div className="font-medium flex items-center text-xs sm:text-sm">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{attraction.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate hidden sm:block">
                          {attraction.address}
                        </div>
                      </div>
                    </td>
                    <td className="p-1 sm:p-2">
                      <Badge variant="outline" className="text-xs">
                        {attraction.category}
                      </Badge>
                    </td>
                    <td className="p-1 sm:p-2">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="font-mono text-xs sm:text-sm">{attraction.totalVisits.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-1 sm:p-2">
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                        <div>
                          <span className="font-mono text-xs sm:text-sm">
                            Rp {(attraction.revenue / 1000).toFixed(0)}K
                          </span>
                          <div className="text-xs text-muted-foreground hidden sm:block">
                            Rp {attraction.revenuePerVisit.toFixed(0)}/visit
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 hidden md:table-cell">
                      <span className="font-mono text-xs sm:text-sm">{Math.round(attraction.avgDuration)} min</span>
                    </td>
                    <td className="p-1 sm:p-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span className="font-medium text-xs sm:text-sm">{attraction.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 hidden lg:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Capacity</span>
                          <span>{attraction.capacityUtilization.toFixed(0)}%</span>
                        </div>
                        <div className="w-16 bg-muted rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              attraction.capacityUtilization > 80
                                ? "bg-red-500"
                                : attraction.capacityUtilization > 60
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(attraction.capacityUtilization, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No attractions found matching your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
