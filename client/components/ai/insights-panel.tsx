"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, Lightbulb, ExternalLink } from "lucide-react"
import { mockAIInsights } from "@/data/mock-tourism-data"

const iconMap = {
  trend: TrendingUp,
  anomaly: AlertTriangle,
  recommendation: Lightbulb,
}

const colorMap = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

export function AIInsightsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          AI Insights
        </CardTitle>
        <CardDescription>Machine learning powered insights and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAIInsights.map((insight, index) => {
          const Icon = iconMap[insight.type as keyof typeof iconMap]

          return (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium">{insight.title}</h4>
                </div>
                <Badge variant={colorMap[insight.impact as keyof typeof colorMap]}>{insight.impact}</Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Confidence:</span>
                  <div className="w-16 bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${insight.confidence * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium">{Math.round(insight.confidence * 100)}%</span>
                </div>

                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          )
        })}

        <Button className="w-full" variant="outline">
          View All Insights
        </Button>
      </CardContent>
    </Card>
  )
}
