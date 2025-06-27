"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { category: "Museums", revenue: 156800, visitors: 12400 },
  { category: "Parks", revenue: 138900, visitors: 15600 },
  { category: "Historical", revenue: 122100, visitors: 9800 },
  { category: "Adventure", revenue: 98700, visitors: 7200 },
  { category: "Cultural", revenue: 84300, visitors: 6100 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Category</CardTitle>
        <CardDescription>Monthly revenue breakdown by attraction type</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue ($)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="category" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
