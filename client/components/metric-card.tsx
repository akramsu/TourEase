"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
  gradient: string
}

export function MetricCard({ title, value, change, trend, icon: Icon, gradient }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`absolute inset-0 ${gradient} opacity-90`} />
      <CardContent className="relative p-3 sm:p-4 lg:p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-white/80 text-xs sm:text-sm font-medium truncate">{title}</p>
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2 truncate">{value}</p>
            <div className="flex items-center mt-1 sm:mt-2">
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-medium truncate">{change}</span>
            </div>
          </div>
          <div className="bg-white/20 p-2 sm:p-3 rounded-full backdrop-blur-sm ml-2 flex-shrink-0">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
