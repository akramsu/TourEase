"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ForecastChart } from "@/components/charts/forecast-chart"
import { AIInsightsPanel } from "@/components/ai/insights-panel"
import { mockForecastData, mockRevenueProjections } from "@/data/mock-tourism-data"
import { Calendar, Users, DollarSign, AlertTriangle } from "lucide-react"

export function ForecastsPlanning() {
  const nextWeekForecast = mockForecastData.slice(0, 7).reduce((sum, day) => sum + day.predictedVisitors, 0)
  const nextMonthRevenue = mockRevenueProjections[0].realistic

  return (
    <div className="space-y-6">
      {/* Planning Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Week Forecast</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextWeekForecast.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">expected visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Projection</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(nextMonthRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">next month estimate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">high-capacity days ahead</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimal Pricing</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28</div>
            <p className="text-xs text-muted-foreground">recommended peak price</p>
          </CardContent>
        </Card>
      </div>

      {/* Forecasting Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        <ForecastChart />
        <AIInsightsPanel />
      </div>

      {/* Planning Tools */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Capacity Planning</CardTitle>
            <CardDescription>Upcoming high-demand periods and staffing recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2024-02-15", day: "Thursday", forecast: 1850, capacity: 2000, status: "optimal" },
                { date: "2024-02-16", day: "Friday", forecast: 2200, capacity: 2000, status: "high" },
                { date: "2024-02-17", day: "Saturday", forecast: 2450, capacity: 2000, status: "critical" },
                { date: "2024-02-18", day: "Sunday", forecast: 2100, capacity: 2000, status: "high" },
                { date: "2024-02-19", day: "Monday", forecast: 1200, capacity: 2000, status: "low" },
              ].map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{day.day}</div>
                    <div className="text-sm text-muted-foreground">{day.date}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{day.forecast} visitors</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((day.forecast / day.capacity) * 100)}% capacity
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      day.status === "critical"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                        : day.status === "high"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                          : day.status === "optimal"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                    }`}
                  >
                    {day.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staffing Recommendations</CardTitle>
            <CardDescription>AI-powered staffing optimization based on forecasts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Weekend Surge Preparation</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Increase staff by 40% for Saturday and Sunday to handle expected 2,400+ visitors.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Front Desk:</span>
                    <span className="font-medium ml-1">+2 staff</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Security:</span>
                    <span className="font-medium ml-1">+1 staff</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Guides:</span>
                    <span className="font-medium ml-1">+3 staff</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Maintenance:</span>
                    <span className="font-medium ml-1">+1 staff</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Weekday Optimization</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  Reduce Monday staffing by 25% due to low visitor forecast.
                </p>
                <div className="text-xs">
                  <span className="text-muted-foreground">Estimated savings:</span>
                  <span className="font-medium ml-1 text-green-600">$480/day</span>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Peak Hour Focus</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Schedule additional staff for 11 AM - 2 PM peak period across all days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Pricing */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Pricing Recommendations</CardTitle>
            <CardDescription>Optimize pricing based on demand forecasts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { period: "Weekday Standard", price: 22, demand: "Low", recommendation: "Maintain" },
                { period: "Friday Premium", price: 26, demand: "High", recommendation: "Increase to $28" },
                { period: "Weekend Peak", price: 30, demand: "Critical", recommendation: "Increase to $35" },
                { period: "Monday Special", price: 18, demand: "Very Low", recommendation: "Promotional rate" },
              ].map((pricing, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{pricing.period}</div>
                    <div className="text-sm text-muted-foreground">Current: ${pricing.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{pricing.recommendation}</div>
                    <div
                      className={`text-xs ${
                        pricing.demand === "Critical"
                          ? "text-red-600"
                          : pricing.demand === "High"
                            ? "text-yellow-600"
                            : pricing.demand === "Low"
                              ? "text-blue-600"
                              : "text-green-600"
                      }`}
                    >
                      {pricing.demand} demand
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Optimization</CardTitle>
            <CardDescription>Strategies to maximize revenue per visitor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <h4 className="font-medium text-green-800 dark:text-green-200 text-sm">Bundle Packages</h4>
                <p className="text-xs text-green-600 dark:text-green-300">
                  Create combo tickets with nearby attractions (+15% revenue potential)
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm">Premium Experiences</h4>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  Offer VIP tours during peak hours (+25% per visitor)
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 text-sm">Merchandise Strategy</h4>
                <p className="text-xs text-purple-600 dark:text-purple-300">
                  Expand gift shop offerings based on visitor demographics
                </p>
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 text-sm">Food & Beverage</h4>
                <p className="text-xs text-orange-600 dark:text-orange-300">
                  Add café services during high-traffic periods
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
