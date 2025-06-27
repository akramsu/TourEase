"use client"

import { Users, DollarSign, Clock, Star, TrendingUp, Target } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { AdvancedVisitorChart } from "@/components/charts/advanced-visitor-chart"
import { InteractiveDonutChart } from "@/components/charts/interactive-donut-chart"
import { YearComparisonChart } from "@/components/charts/year-comparison-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define attractionMetrics with proper component references and gradients
const attractionMetrics = [
  {
    title: "Total Visitors",
    value: "12,489",
    change: "+12% from last month",
    trend: "up" as const,
    icon: Users,
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    title: "Revenue",
    value: "$54,987",
    change: "+8% from last month",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    title: "Avg. Visit Duration",
    value: "2.5 hrs",
    change: "-3% from last month",
    trend: "down" as const,
    icon: Clock,
    gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
  {
    title: "Customer Rating",
    value: "4.7/5",
    change: "+1% from last month",
    trend: "up" as const,
    icon: Star,
    gradient: "bg-gradient-to-br from-yellow-500 to-yellow-600",
  },
  {
    title: "Growth Rate",
    value: "+18.7%",
    change: "+3% from last month",
    trend: "up" as const,
    icon: TrendingUp,
    gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    title: "Capacity",
    value: "78%",
    change: "-2% from last month",
    trend: "down" as const,
    icon: Target,
    gradient: "bg-gradient-to-br from-red-500 to-red-600",
  },
]

// Mobile summary cards to replace complex charts
const MobileSummaryCards = () => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:hidden">
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-600" />
          Visitor Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Daily Visitors</span>
            <span className="font-semibold text-blue-600">1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Growth</span>
            <span className="font-semibold text-green-600">+8.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Peak Hours</span>
            <span className="font-semibold">10 AM - 2 PM</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Advanced visitor trend analysis</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-purple-600" />
          Revenue Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Today's Revenue</span>
            <span className="font-semibold text-purple-600">$4,567</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Growth</span>
            <span className="font-semibold text-green-600">+12.3%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Avg Spend</span>
            <span className="font-semibold">$37.50</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Revenue performance tracking</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Target className="h-4 w-4 text-green-600" />
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Capacity</span>
            <span className="font-semibold text-green-600">78%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Satisfaction</span>
            <span className="font-semibold">4.8/5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Visit Duration</span>
            <span className="font-semibold">2.4 hrs</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Operational efficiency metrics</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-orange-600" />
          Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Growth Rate</span>
            <span className="font-semibold text-orange-600">+18.7%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">New Record</span>
            <span className="font-semibold text-green-600">Tuesday</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Repeat Visitors</span>
            <span className="font-semibold">32%</span>
          </div>
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Today's performance highlights</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

export function PerformanceOverview() {
  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Metrics Cards */}
      <div className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {attractionMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Mobile Summary Cards - Only visible on mobile */}
      <MobileSummaryCards />

      {/* Desktop Charts - Hidden on mobile */}
      <div className="hidden md:block space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Charts Section */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-2 min-h-0">
            <AdvancedVisitorChart />
          </div>
          <div className="md:col-span-2 lg:col-span-1 min-h-0">
            <InteractiveDonutChart />
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="lg:col-span-1 min-h-0">
            <YearComparisonChart />
          </div>
          <div className="lg:col-span-1 grid gap-3 sm:gap-4">
            <div className="grid gap-3 sm:gap-4 grid-cols-1">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-3 sm:p-4 lg:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Today's Highlights</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-xs sm:text-sm leading-tight">Peak hours: 10 AM - 2 PM achieved</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-xs sm:text-sm leading-tight">Gift shop revenue up 25%</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-xs sm:text-sm leading-tight">New visitor record for Tuesday</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-3 sm:p-4 lg:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Performance Metrics</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Repeat Visitors</span>
                    <span className="text-xs sm:text-sm font-medium">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Average Spend</span>
                    <span className="text-xs sm:text-sm font-medium">$37.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Peak Hour</span>
                    <span className="text-xs sm:text-sm font-medium">11:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="text-xs sm:text-sm font-medium text-green-600">89.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
