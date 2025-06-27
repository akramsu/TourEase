"use client"

import { PerformanceRankingTable } from "@/components/charts/performance-ranking-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAttractions } from "@/data/mock-tourism-data"
import { TrendingUp, Users, DollarSign, Star } from "lucide-react"

// Mobile summary cards to replace complex charts
const MobileSummaryCards = () => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:hidden">
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          Performance Rankings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Top Performer</span>
            <span className="font-semibold text-blue-600">Borobudur Temple</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Rating</span>
            <span className="font-semibold">4.8/5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Monthly Revenue</span>
            <span className="font-semibold text-green-600">$28.9K</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Comprehensive attraction performance analysis</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="h-4 w-4 text-purple-600" />
          Category Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Top Category</span>
            <span className="font-semibold text-purple-600">Museums</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Attractions</span>
            <span className="font-semibold">4 categories</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Avg Rating</span>
            <span className="font-semibold text-green-600">4.6/5</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Category-wise performance breakdown</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Star className="h-4 w-4 text-green-600" />
          Benchmarks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Industry Avg</span>
            <span className="font-semibold text-green-600">$18.50</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">City Average</span>
            <span className="font-semibold">$22.30</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Top Performer</span>
            <span className="font-semibold text-green-600">$28.90</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Performance benchmarking insights</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-orange-600" />
          Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Low Capacity</span>
            <span className="font-semibold text-orange-600">Adventure Park</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Utilization</span>
            <span className="font-semibold">57%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Potential</span>
            <span className="font-semibold text-green-600">+25% revenue</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">AI-generated improvement recommendations</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

export function AttractionComparison() {
  const categoryStats = mockAttractions.reduce(
    (acc, attraction) => {
      if (!acc[attraction.category]) {
        acc[attraction.category] = {
          count: 0,
          totalVisitors: 0,
          totalRevenue: 0,
          avgRating: 0,
        }
      }
      acc[attraction.category].count++
      acc[attraction.category].totalVisitors += attraction.visitors
      acc[attraction.category].totalRevenue += attraction.revenue
      acc[attraction.category].avgRating += attraction.rating
      return acc
    },
    {} as Record<string, any>,
  )

  Object.keys(categoryStats).forEach((category) => {
    categoryStats[category].avgRating = categoryStats[category].avgRating / categoryStats[category].count
  })

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Category Overview */}
      <div className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(categoryStats).map(([category, stats]) => (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base font-medium truncate">{category}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {stats.count} attractions
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 flex-shrink-0" />
                  <span className="text-xs truncate">Visitors</span>
                </div>
                <span className="text-xs sm:text-sm font-medium flex-shrink-0">
                  {stats.totalVisitors.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 flex-shrink-0" />
                  <span className="text-xs truncate">Revenue</span>
                </div>
                <span className="text-xs sm:text-sm font-medium flex-shrink-0">
                  ${(stats.totalRevenue / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 flex-shrink-0" />
                  <span className="text-xs truncate">Avg Rating</span>
                </div>
                <span className="text-xs sm:text-sm font-medium flex-shrink-0">{stats.avgRating.toFixed(1)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Summary Cards - Only visible on mobile */}
      <MobileSummaryCards />

      {/* Desktop Content - Hidden on mobile */}
      <div className="hidden md:block">
        {/* Performance Rankings Table */}
        <div className="overflow-x-auto">
          <PerformanceRankingTable />
        </div>

        {/* Benchmarking Insights */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base lg:text-lg">Performance Benchmarks</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Industry standards and best performers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm sm:text-base">Revenue per Visitor</h4>
                    <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <div className="text-muted-foreground">Industry Avg</div>
                      <div className="font-medium">$18.50</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">City Avg</div>
                      <div className="font-medium">$22.30</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Top Performer</div>
                      <div className="font-medium text-green-600">$28.90</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm sm:text-base">Visitor Satisfaction</h4>
                    <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <div className="text-muted-foreground">Industry Avg</div>
                      <div className="font-medium">4.2/5</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">City Avg</div>
                      <div className="font-medium">4.6/5</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Top Performer</div>
                      <div className="font-medium text-green-600">4.8/5</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm sm:text-base">Capacity Utilization</h4>
                    <Users className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <div className="text-muted-foreground">Industry Avg</div>
                      <div className="font-medium">65%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">City Avg</div>
                      <div className="font-medium">72%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Optimal Range</div>
                      <div className="font-medium text-green-600">75-85%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base lg:text-lg">Improvement Opportunities</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                AI-generated recommendations for underperforming attractions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">
                    Adventure Park - Low Capacity Utilization
                  </h4>
                  <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mb-3 leading-relaxed">
                    Currently at 57% capacity. Consider dynamic pricing and targeted marketing.
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      Marketing Campaign
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Dynamic Pricing
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Group Packages
                    </Badge>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">
                    Historic Downtown - Revenue Optimization
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 mb-3 leading-relaxed">
                    High visitor count but low revenue per visitor. Enhance retail offerings.
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      Gift Shop Expansion
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Food Vendors
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Guided Tours
                    </Badge>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">
                    Metropolitan Museum - Best Practices
                  </h4>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-3 leading-relaxed">
                    Excellent performance across all metrics. Model for other attractions.
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      Premium Experiences
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Member Programs
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Digital Integration
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
