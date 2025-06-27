"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { category: "Museums", revenue: 45600, visitors: 12400 },
  { category: "Parks", revenue: 38900, revenue_fill: "var(--color-parks)" },
  { category: "Historical", revenue: 32100, revenue_fill: "var(--color-historical)" },
  { category: "Adventure", revenue: 28700, revenue_fill: "var(--color-adventure)" },
  { category: "Cultural", revenue: 24300, revenue_fill: "var(--color-cultural)" },
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
            parks: {
              label: "Parks",
              color: "hsl(var(--chart-4))",
            },
            historical: {
              label: "Historical",
              color: "hsl(var(--chart-5))",
            },
            adventure: {
              label: "Adventure",
              color: "hsl(var(--chart-1))",
            },
            cultural: {
              label: "Cultural",
              color: "hsl(var(--chart-2))",
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
