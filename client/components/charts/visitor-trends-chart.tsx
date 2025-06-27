"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", visitors: 12400, revenue: 45600 },
  { month: "Feb", visitors: 13200, revenue: 48900 },
  { month: "Mar", visitors: 15800, revenue: 58200 },
  { month: "Apr", visitors: 18900, revenue: 69800 },
  { month: "May", visitors: 22100, revenue: 81500 },
  { month: "Jun", visitors: 25600, revenue: 94300 },
  { month: "Jul", visitors: 28900, revenue: 106700 },
  { month: "Aug", visitors: 26800, revenue: 98900 },
  { month: "Sep", visitors: 23400, revenue: 86200 },
  { month: "Oct", visitors: 19800, revenue: 73100 },
  { month: "Nov", visitors: 16500, revenue: 60800 },
  { month: "Dec", visitors: 18200, revenue: 67200 },
]

export function VisitorTrendsChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Visitor Trends Over Time</CardTitle>
        <CardDescription>Monthly visitor count and revenue trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="var(--color-visitors)"
                strokeWidth={3}
                dot={{ fill: "var(--color-visitors)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "var(--color-visitors)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
