"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VisitorHeatmap } from "@/components/charts/visitor-heatmap"
import { VisitorOriginMap } from "@/components/charts/visitor-origin-map"
import { mockVisitDuration, mockDemographicData } from "@/data/mock-tourism-data"
import { Clock, Users, MapPin, TrendingUp } from "lucide-react"

export function VisitorAnalysis() {
  const avgVisitDuration = mockVisitDuration.reduce((sum, visit) => sum + visit.duration, 0) / mockVisitDuration.length
  const peakHour = "11:30 AM"
  const repeatVisitorRate = 32

  return (
    <div className="space-y-6">
      {/* Key Visitor Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Visit Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgVisitDuration.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">+15 min from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{peakHour}</div>
            <p className="text-xs text-muted-foreground">highest visitor count</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repeatVisitorRate}%</div>
            <p className="text-xs text-muted-foreground">returning customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Origin</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Local</div>
            <p className="text-xs text-muted-foreground">45% of visitors</p>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Patterns */}
      <div className="grid gap-6 md:grid-cols-2">
        <VisitorHeatmap />
        <VisitorOriginMap />
      </div>

      {/* Demographics and Behavior */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Visit Duration Distribution</CardTitle>
            <CardDescription>How long visitors stay at your attraction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { range: "< 1 hour", count: 156, percentage: 15.6 },
                { range: "1-2 hours", count: 324, percentage: 32.4 },
                { range: "2-3 hours", count: 287, percentage: 28.7 },
                { range: "3-4 hours", count: 145, percentage: 14.5 },
                { range: "4+ hours", count: 88, percentage: 8.8 },
              ].map((duration, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{duration.range}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${duration.percentage}%` }} />
                    </div>
                    <span className="text-xs">{duration.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Demographics</CardTitle>
            <CardDescription>Age and gender breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Age Groups</h4>
                {mockDemographicData.ageGroups.slice(0, 3).map((group, index) => (
                  <div key={index} className="flex items-center justify-between mb-2">
                    <span className="text-sm">{group.range}</span>
                    <span className="text-sm font-medium">{group.percentage}%</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-medium mb-2">Gender</h4>
                {mockDemographicData.genderData.map((gender, index) => (
                  <div key={index} className="flex items-center justify-between mb-2">
                    <span className="text-sm">{gender.gender}</span>
                    <span className="text-sm font-medium">{gender.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Behavior</CardTitle>
            <CardDescription>Key behavioral insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <h4 className="font-medium text-green-800 dark:text-green-200 text-sm">High Engagement</h4>
                <p className="text-xs text-green-600 dark:text-green-300">
                  Visitors spend 23% more time than city average
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm">Peak Efficiency</h4>
                <p className="text-xs text-blue-600 dark:text-blue-300">Optimal visitor flow during 10 AM - 2 PM</p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 text-sm">Loyalty Program</h4>
                <p className="text-xs text-purple-600 dark:text-purple-300">
                  32% repeat visitor rate above industry standard
                </p>
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 text-sm">Seasonal Pattern</h4>
                <p className="text-xs text-orange-600 dark:text-orange-300">
                  Strong weekend preference (65% of weekly visits)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
