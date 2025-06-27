"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"

interface DashboardHeaderProps {
  title: string
  subtitle: string
  onProfileClick?: () => void
}

export function DashboardHeader({ title, subtitle, onProfileClick }: DashboardHeaderProps) {
  const { user, logout } = useAuth()

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick()
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarUrl = (name: string, role: string) => {
    // Generate a consistent avatar based on name and role
    const seed = name.toLowerCase().replace(/\s+/g, "")
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${role === "authority" ? "3b82f6" : "10b981"}`
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-2 sm:px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4 hidden sm:block" />

      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-sm sm:text-lg font-semibold truncate">{title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground truncate hidden sm:block">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500 hover:bg-red-500">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">New visitor data available</div>
                <div className="text-sm text-muted-foreground">Updated analytics for this week</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Report generated</div>
                <div className="text-sm text-muted-foreground">Monthly tourism report is ready</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">System maintenance</div>
                <div className="text-sm text-muted-foreground">Scheduled for tonight at 2 AM</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                <Avatar className="h-9 w-9 ring-2 ring-primary/10 hover:ring-primary/20 transition-all">
                  <AvatarImage
                    src={getAvatarUrl(user?.name || "User", user?.role || "user")}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-semibold">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">{user?.role} Account</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="text-red-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
