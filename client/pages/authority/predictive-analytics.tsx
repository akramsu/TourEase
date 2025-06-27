"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ForecastChart } from "@/components/charts/forecast-chart"
import { AIInsightsPanel } from "@/components/ai/insights-panel"
import { mockRevenueProjections } from "@/data/mock-tourism-data"
import { TrendingUp, DollarSign, Calendar, Target } from "lucide-react"

export function PredictiveAnalytics() {
  const nextMonthRevenue = mockRevenueProjections[0]
  const nextQuarterRevenue = mockRevenueProjections.slice(0, 3).reduce((sum, month) => sum + month.realistic, 0)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Month Forecast</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextMonthRevenue.realistic.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">visitors predicted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Forecast</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(nextQuarterRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">next quarter projection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seasonal Index</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.23</div>
            <p className="text-xs text-muted-foreground">current season multiplier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">model accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <ForecastChart />
        <AIInsightsPanel />
      </div>

      {/* Revenue Projections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Scenarios</CardTitle>
            <CardDescription>12-month revenue projections with different scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRevenueProjections.slice(0, 6).map((projection, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <span className="font-medium">{projection.month}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-green-600">${(projection.optimistic / 1000).toFixed(0)}K</span>
                    <span className="text-blue-600">${(projection.realistic / 1000).toFixed(0)}K</span>
                    <span className="text-orange-600">${(projection.pessimistic / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center space-x-6 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                Optimistic
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                Realistic
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                Pessimistic
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>Key factors affecting tourism patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <h4 className="font-medium text-green-800 dark:text-green-200">Weather Impact</h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Favorable weather conditions expected to increase visitors by 15%
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-medium text-blue-800 dark:text-blue-200">Event Calendar</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  3 major events scheduled, potential 25% visitor spike
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <h4 className="font-medium text-purple-800 dark:text-purple-200">Economic Indicators</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  Strong economic outlook supporting tourism growth
                </p>
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                <h4 className="font-medium text-orange-800 dark:text-orange-200">Seasonal Patterns</h4>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  Peak season approaching, 40% increase expected
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
