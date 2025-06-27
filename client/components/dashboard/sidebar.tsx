"use client"
import {
  BarChart3,
  Building2,
  Calendar,
  FileText,
  Home,
  Settings,
  TrendingUp,
  Users,
  Bell,
  Search,
  Filter,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Logo } from "@/components/ui/logo"

const tourismAuthorityItems = [
  { title: "City Overview", page: "City Overview", icon: Home },
  { title: "City Analytics", page: "Attraction Comparison", icon: BarChart3 },
  { title: "Predictive Analytics", page: "Predictive Analytics", icon: TrendingUp },
  { title: "Demographic Insights", page: "Demographic Insights", icon: Users },
  { title: "Reports Management", page: "Reports Management", icon: FileText },
  { title: "Alert Configuration", page: "Alert Configuration", icon: Bell },
]

const attractionOwnerItems = [
  { title: "Performance Overview", page: "Performance Overview", icon: Home },
  { title: "Manage Attraction", page: "Manage Attraction", icon: Building2, badge: "New" },
  { title: "Visitor Analysis", page: "Visitor Analysis", icon: Users },
  { title: "Forecasts & Planning", page: "Forecasts & Planning", icon: Calendar },
  { title: "Reports", page: "Reports", icon: FileText },
  { title: "Settings", page: "Settings", icon: Settings },
]

const authorityQuickActions = [
  { title: "Search Data", page: "Search Data", icon: Search },
  { title: "Apply Filters", page: "Apply Filters", icon: Filter },
]

interface DashboardSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function DashboardSidebar({ currentPage, onPageChange }: DashboardSidebarProps) {
  const { user, logout } = useAuth()
  const menuItems = user?.role === "authority" ? tourismAuthorityItems : attractionOwnerItems

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
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="logo flex items-center justify-center px-2 py-4">
          <Logo size="md" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === "authority" ? "Tourism Authority" : "Attraction Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPage === item.page}
                    onClick={() => onPageChange(item.page)}
                  >
                    <button className="flex items-center gap-2 w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user?.role === "authority" && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {authorityQuickActions.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={currentPage === item.page}
                      onClick={() => onPageChange(item.page)}
                    >
                      <button className="flex items-center gap-2 w-full">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarImage
                    src={getAvatarUrl(user?.name || "User", user?.role || "user")}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium truncate">{user?.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onPageChange("Profile")}>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="text-red-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
