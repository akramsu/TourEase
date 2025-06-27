"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "18-25", value: 28, fill: "hsl(var(--chart-1))" },
  { name: "26-35", value: 35, fill: "hsl(var(--chart-2))" },
  { name: "36-45", value: 22, fill: "hsl(var(--chart-3))" },
  { name: "46-55", value: 10, fill: "hsl(var(--chart-4))" },
  { name: "55+", value: 5, fill: "hsl(var(--chart-5))" },
]

export function DemographicsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Demographics</CardTitle>
        <CardDescription>Age group distribution of visitors</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
