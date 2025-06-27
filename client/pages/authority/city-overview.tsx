"use client"

import {
  Users,
  DollarSign,
  Building2,
  Star,
  TrendingUp,
  MapPin,
  BarChart3,
  PieChart,
  Calendar,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/metric-card"
import { DatabaseVisitorHeatmap } from "@/components/charts/database-visitor-heatmap"
import { ModernRevenueChart } from "@/components/charts/modern-revenue-chart"
import { AttractionPerformanceTable } from "@/components/charts/attraction-performance-table"
import { mockVisitorMetrics, mockRevenueData, mockAttractions } from "@/data/mock-database-data"
import { RevenueTrendChart } from "@/components/charts/revenue-trend-chart"

export function CityOverview() {
  const cityMetrics = [
    {
      title: "Total Visitors",
      value: mockVisitorMetrics.totalVisitors.current.toLocaleString(),
      change: `+${mockVisitorMetrics.totalVisitors.growth}% from last month`,
      trend: "up" as const,
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
    },
    {
      title: "Total Revenue",
      value: `Rp ${(mockRevenueData.totalRevenue.monthly / 1000000).toFixed(1)}M`,
      change: `+${mockRevenueData.totalRevenue.growthRate}% from last month`,
      trend: "up" as const,
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
    {
      title: "Active Attractions",
      value: `${mockAttractions.length}/52`,
      change: "All operational",
      trend: "up" as const,
      icon: Building2,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    },
    {
      title: "Avg Satisfaction",
      value: `${(mockAttractions.reduce((sum, a) => sum + a.rating, 0) / mockAttractions.length).toFixed(1)}/5`,
      change: "+0.2 from last month",
      trend: "up" as const,
      icon: Star,
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    },
    {
      title: "Growth Rate",
      value: `+${mockRevenueData.totalRevenue.growthRate}%`,
      change: "Year over year",
      trend: "up" as const,
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
    },
    {
      title: "Top Attraction",
      value: mockRevenueData.revenueByAttraction[0]?.name || "N/A",
      change: "Highest revenue generator",
      trend: "up" as const,
      icon: MapPin,
      gradient: "bg-gradient-to-br from-teal-500 to-blue-600",
    },
  ]

  const categoryPerformance = [
    { category: "Museums", revenue: 2400000, growth: 12.5, visits: 15420, color: "bg-blue-500" },
    { category: "Historical Sites", revenue: 1800000, growth: 8.3, visits: 12350, color: "bg-purple-500" },
    { category: "Parks & Recreation", revenue: 1200000, growth: 15.7, visits: 18900, color: "bg-green-500" },
    { category: "Cultural Centers", revenue: 950000, growth: 6.2, visits: 8750, color: "bg-orange-500" },
    { category: "Religious Sites", revenue: 750000, growth: 4.1, visits: 11200, color: "bg-red-500" },
  ]

  // Mobile summary cards to replace complex charts
  const MobileSummaryCards = () => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:hidden">
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            Revenue Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Peak Month</span>
              <span className="font-semibold text-blue-600">March 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Top Attraction</span>
              <span className="font-semibold">National Museum</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Growth Rate</span>
              <span className="font-semibold text-green-600">+16.8%</span>
            </div>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">Daily avg revenue from top 3 attractions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-purple-600" />
            Visitor Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Busiest Day</span>
              <span className="font-semibold text-purple-600">Saturday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Peak Hours</span>
              <span className="font-semibold">10AM - 2PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Daily</span>
              <span className="font-semibold text-green-600">2,847 visitors</span>
            </div>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">Weekly visitor distribution patterns</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <PieChart className="h-4 w-4 text-green-600" />
            Category Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Top Category</span>
              <span className="font-semibold text-green-600">Museums</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Revenue</span>
              <span className="font-semibold">Rp 2.4M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Growth</span>
              <span className="font-semibold text-green-600">+12.5%</span>
            </div>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">5 categories tracked across city</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-orange-600" />
            Performance Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Top Performer</span>
              <span className="font-semibold text-orange-600">Borobudur Temple</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Rating</span>
              <span className="font-semibold">4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monthly Visits</span>
              <span className="font-semibold text-green-600">12,450</span>
            </div>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">Ranking of all attractions by performance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6 p-4 lg:p-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          City Tourism Overview
        </h1>
        <p className="text-muted-foreground mt-2">Comprehensive analytics and insights for tourism management</p>
      </div>

      {/* Metrics Cards - Always visible */}
      <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {cityMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Mobile Summary Cards - Only visible on mobile */}
      <MobileSummaryCards />

      {/* Desktop Charts - Hidden on mobile */}
      <div className="hidden md:block space-y-6">
        {/* Revenue Trend Chart with side content */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueTrendChart />
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Insights</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Peak Revenue Day</span>
                    <span className="text-sm font-medium text-green-600">Saturday</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Best Performing Month</span>
                    <span className="text-sm font-medium">March 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Revenue Growth</span>
                    <span className="text-sm font-medium text-green-600">+16.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Visitor Increase</span>
                    <span className="text-sm font-medium text-blue-600">+12.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
          {/* Visitor Heatmap - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <DatabaseVisitorHeatmap />
          </div>

          {/* Category Performance - Takes 1 column */}
          <div className="xl:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Revenue by Category</CardTitle>
                <CardDescription>Category-wise revenue analysis with growth indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((category, index) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="font-medium text-sm">{category.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">Rp {(category.revenue / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-green-600">+{category.growth}%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{category.visits.toLocaleString()} visits</span>
                        <span>Avg: Rp {Math.round(category.revenue / category.visits).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${(category.revenue / 2400000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Secondary Charts Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Modern Revenue Chart */}
          <div className="lg:col-span-1">
            <ModernRevenueChart />
          </div>

          {/* Real-time Alerts */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Real-time Alerts</CardTitle>
                <CardDescription>Database-triggered notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">High Capacity Alert</div>
                      <div className="text-xs text-muted-foreground">National Museum at 90% capacity</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Revenue Target Met</div>
                      <div className="text-xs text-muted-foreground">Historical Sites exceeded monthly goal</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Trend Detection</div>
                      <div className="text-xs text-muted-foreground">New visitor pattern in Yogyakarta</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Database Statistics */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Database Statistics</CardTitle>
                <CardDescription>Live system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-sm text-muted-foreground">Total Records</span>
                    <span className="text-sm font-medium">5,000+ visits</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-sm text-muted-foreground">Active Connections</span>
                    <span className="text-sm font-medium">12/50</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-sm text-muted-foreground">Query Performance</span>
                    <span className="text-sm font-medium text-green-600">Optimal</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-sm text-muted-foreground">Last Sync</span>
                    <span className="text-sm font-medium text-green-600">2 min ago</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground text-center">System running optimally</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Table - Full width */}
        <div className="w-full">
          <AttractionPerformanceTable />
        </div>
      </div>
    </div>
  )
}
