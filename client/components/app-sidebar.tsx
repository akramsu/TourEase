"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart3,
  Building2,
  Calendar,
  FileText,
  Home,
  MapPin,
  Settings,
  TrendingUp,
  Users,
  Bell,
  Search,
  Filter,
  User,
  ChevronUp,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const tourismAuthorityItems = [
  {
    title: "Dashboard Overview",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "City Analytics",
    url: "#",
    icon: MapPin,
    badge: "New",
  },
  {
    title: "Attraction Comparison",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Predictive Analytics",
    url: "#",
    icon: TrendingUp,
    badge: "3",
  },
  {
    title: "Demographic Insights",
    url: "#",
    icon: Users,
  },
  {
    title: "Reports Management",
    url: "#",
    icon: FileText,
  },
  {
    title: "Alert Configuration",
    url: "#",
    icon: Bell,
  },
]

const attractionOwnerItems = [
  {
    title: "Performance Overview",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Manage Attractions",
    url: "#",
    icon: Building2,
    badge: "New",
  },
  {
    title: "Visitor Analysis",
    url: "#",
    icon: Users,
  },
  {
    title: "Forecasts & Planning",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Reports",
    url: "#",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const authorityQuickActions = [
  {
    title: "Search Data",
    url: "#",
    icon: Search,
  },
  {
    title: "Apply Filters",
    url: "#",
    icon: Filter,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = useState<"authority" | "owner">("authority")
  const menuItems = userRole === "authority" ? tourismAuthorityItems : attractionOwnerItems

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">TourEase</span>
            <span className="truncate text-xs text-muted-foreground">Tourism MIS</span>
          </div>
        </div>
        <div className="px-4 pb-2">
          <div className="flex gap-2">
            <Button
              variant={userRole === "authority" ? "default" : "outline"}
              size="sm"
              onClick={() => setUserRole("authority")}
              className="flex-1 text-xs"
            >
              Authority
            </Button>
            <Button
              variant={userRole === "owner" ? "default" : "outline"}
              size="sm"
              onClick={() => setUserRole("owner")}
              className="flex-1 text-xs"
            >
              Owner
            </Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {userRole === "authority" ? "Tourism Authority" : "Attraction Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {userRole === "authority" && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {authorityQuickActions.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                    <AvatarFallback className="rounded-lg">{userRole === "authority" ? "TA" : "AO"}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userRole === "authority" ? "Tourism Authority" : "Attraction Owner"}
                    </span>
                    <span className="truncate text-xs">
                      {userRole === "authority" ? "admin@tourease.gov" : "owner@attraction.com"}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="p-4 text-center text-xs text-muted-foreground">© 2024 TourEase Analytics</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
