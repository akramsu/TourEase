"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDonutChart } from "@/components/charts/interactive-donut-chart"
import { VisitorOriginMap } from "@/components/charts/visitor-origin-map"
import { mockDemographicData } from "@/data/mock-tourism-data"
import { Users, Globe, TrendingUp, MapPin } from "lucide-react"

export function DemographicInsights() {
  const totalVisitors = mockDemographicData.ageGroups.reduce((sum, group) => sum + group.count, 0)
  const internationalPercentage =
    mockDemographicData.originData.find((origin) => origin.region === "International")?.percentage || 0

  return (
    <div className="space-y-6">
      {/* Key Demographics Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">this period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">International Visitors</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{internationalPercentage}%</div>
            <p className="text-xs text-muted-foreground">of total visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dominant Age Group</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26-35</div>
            <p className="text-xs text-muted-foreground">35% of visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Origin</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Local</div>
            <p className="text-xs text-muted-foreground">40% from 0-50km</p>
          </CardContent>
        </Card>
      </div>

      {/* Demographics Charts */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <InteractiveDonutChart />
        <VisitorOriginMap />
      </div>

      {/* Detailed Demographics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution Analysis</CardTitle>
            <CardDescription>Detailed breakdown of visitor age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDemographicData.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{group.range} years</div>
                    <div className="text-sm text-muted-foreground">{group.count.toLocaleString()} visitors</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${group.percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium">{group.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Visitor origins and travel patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDemographicData.originData.map((origin, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{origin.region}</div>
                    <div className="text-sm text-muted-foreground">{origin.count.toLocaleString()} visitors</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${origin.percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium">{origin.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Segmentation */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Visitor breakdown by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDemographicData.genderData.map((gender, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{gender.gender}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${index === 0 ? "bg-pink-500" : "bg-blue-500"}`}
                        style={{ width: `${gender.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm">{gender.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Loyalty</CardTitle>
            <CardDescription>First-time vs repeat visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">First-time</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }} />
                  </div>
                  <span className="text-sm">68%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Repeat</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "32%" }} />
                  </div>
                  <span className="text-sm">32%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visit Purpose</CardTitle>
            <CardDescription>Primary reasons for visiting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { purpose: "Leisure", percentage: 45 },
                { purpose: "Business", percentage: 25 },
                { purpose: "Education", percentage: 20 },
                { purpose: "Other", percentage: 10 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{item.purpose}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-sm">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
