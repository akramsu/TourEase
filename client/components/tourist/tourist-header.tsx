import type React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface TouristHeaderProps {
  title: string
}

export const TouristHeader: React.FC<TouristHeaderProps> = ({ title }) => {
  return (
    <header className="bg-white dark:bg-gray-800 py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
