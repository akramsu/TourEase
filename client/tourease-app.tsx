"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { EnhancedHeroSection } from "@/components/landing/enhanced-hero-section"
import { EnhancedFeaturesSection } from "@/components/landing/enhanced-features-section"
import { ModernFooter } from "@/components/landing/modern-footer"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { CompleteProfile } from "@/pages/user/complete-profile"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { CityOverview } from "@/pages/authority/city-overview"
import { PredictiveAnalytics } from "@/pages/authority/predictive-analytics"
import { AttractionComparison } from "@/pages/authority/attraction-comparison"
import { DemographicInsights } from "@/pages/authority/demographic-insights"
import { ReportsManagement } from "@/pages/authority/reports-management"
import { AlertConfiguration } from "@/pages/authority/alert-configuration"
import { SearchData } from "@/pages/authority/search-data"
import { ApplyFilters } from "@/pages/authority/apply-filters"
import { AuthorityProfile } from "@/pages/authority/profile"
import { PerformanceOverview } from "@/pages/owner/performance-overview"
import { VisitorAnalysis } from "@/pages/owner/visitor-analysis"
import { ForecastsPlanning } from "@/pages/owner/forecasts-planning"
import { OwnerProfile } from "@/pages/owner/profile"
import { OwnerReports } from "@/pages/owner/reports"
import { CreateAttraction } from "@/pages/owner/create-attraction"
import { ManageAttraction } from "@/pages/owner/manage-attraction"

// Tourist Components
import TouristNavigationHeader from "@/components/tourist/tourist-navigation-header"
import TouristDashboard from "@/pages/tourist/dashboard"
import AttractionDetails from "@/pages/tourist/attraction-details"
import SearchResults from "@/pages/tourist/search-results"
import UserProfile from "@/pages/tourist/user-profile"
import Recommendations from "@/pages/tourist/recommendations"
import EventsActivities from "@/pages/tourist/events-activities"
import Booking from "@/pages/tourist/booking"

type Page = "landing" | "signin" | "signup" | "dashboard"

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("landing")
  const [dashboardPage, setDashboardPage] = useState("Dashboard")
  const [selectedAttractionId, setSelectedAttractionId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, updateUserAttraction } = useAuth()

  // Auto-redirect to dashboard if user is logged in
  if (user && currentPage !== "dashboard") {
    setCurrentPage("dashboard")
    if (user.role === "authority") {
      setDashboardPage("City Overview")
    } else if (user.role === "owner") {
      // If owner doesn't have attraction, show create page
      setDashboardPage(user.hasAttraction ? "Performance Overview" : "Create Attraction")
    } else if (user.role === "tourist") {
      setDashboardPage("Dashboard")
    }
  }

  const handleTouristPageChange = (page: string) => {
    setDashboardPage(page)
    setSelectedAttractionId(null)
  }

  const handleAttractionSelect = (attractionId: number) => {
    setSelectedAttractionId(attractionId)
    setDashboardPage("Attraction Details")
  }

  const handleBackFromDetails = () => {
    setSelectedAttractionId(null)
    setDashboardPage("Search Results")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setDashboardPage("Search Results")
  }

  const handleProfileClick = () => {
    setDashboardPage("Profile")
  }

  const handleAttractionCreated = () => {
    updateUserAttraction(true)
    setDashboardPage("Performance Overview")
  }

  const handleProfileCompleted = () => {
    // After profile completion, proceed to normal flow
    if (user?.role === "owner" && !user.hasAttraction && user.isNewUser) {
      setDashboardPage("Create Attraction")
    } else if (user?.role === "authority") {
      setDashboardPage("City Overview")
    } else if (user?.role === "tourist") {
      setDashboardPage("Dashboard")
    } else if (user?.role === "owner" && user.hasAttraction) {
      setDashboardPage("Performance Overview")
    }
  }

  const handleBookNow = (attractionId: number) => {
    setSelectedAttractionId(attractionId)
    setDashboardPage("Booking")
  }

  const handleBackFromBooking = () => {
    setDashboardPage("Attraction Details")
  }

  const renderTouristContent = () => {
    switch (dashboardPage) {
      case "Dashboard":
        return <TouristDashboard onPageChange={handleTouristPageChange} onAttractionSelect={handleAttractionSelect} />
      case "Search Results":
        return <SearchResults onAttractionSelect={handleAttractionSelect} searchQuery={searchQuery} />
      case "Attraction Details":
        return selectedAttractionId ? (
          <AttractionDetails
            attractionId={selectedAttractionId}
            onBack={handleBackFromDetails}
            onAttractionSelect={handleAttractionSelect}
            onBookNow={handleBookNow}
          />
        ) : (
          <TouristDashboard onPageChange={handleTouristPageChange} onAttractionSelect={handleAttractionSelect} />
        )
      case "Booking":
        return selectedAttractionId ? (
          <Booking attractionId={selectedAttractionId} onBack={handleBackFromBooking} />
        ) : (
          <TouristDashboard onPageChange={handleTouristPageChange} onAttractionSelect={handleAttractionSelect} />
        )
      case "User Profile":
        return <UserProfile onAttractionSelect={handleAttractionSelect} />
      case "Recommendations":
        return <Recommendations onAttractionSelect={handleAttractionSelect} />
      case "Events & Activities":
        return <EventsActivities onEventSelect={(eventId) => console.log("Selected event:", eventId)} />
      default:
        return <TouristDashboard onPageChange={handleTouristPageChange} onAttractionSelect={handleAttractionSelect} />
    }
  }

  const renderDashboardContent = () => {
    if (user?.role === "authority") {
      switch (dashboardPage) {
        case "City Overview":
          return <CityOverview />
        case "Predictive Analytics":
          return <PredictiveAnalytics />
        case "Attraction Comparison":
          return <AttractionComparison />
        case "Demographic Insights":
          return <DemographicInsights />
        case "Reports Management":
          return <ReportsManagement />
        case "Alert Configuration":
          return <AlertConfiguration />
        case "Search Data":
          return <SearchData />
        case "Apply Filters":
          return <ApplyFilters />
        case "Profile":
          return <AuthorityProfile />
        default:
          return <CityOverview />
      }
    } else if (user?.role === "owner") {
      // If owner doesn't have attraction AND is a new user, show create page
      if (!user.hasAttraction && user.isNewUser) {
        return <CreateAttraction onAttractionCreated={handleAttractionCreated} />
      }

      // If owner has attraction, show normal dashboard
      switch (dashboardPage) {
        case "Performance Overview":
          return <PerformanceOverview />
        case "Manage Attraction":
          return <ManageAttraction />
        case "Visitor Analysis":
          return <VisitorAnalysis />
        case "Forecasts & Planning":
          return <ForecastsPlanning />
        case "Reports":
          return <OwnerReports />
        case "Profile":
          return <OwnerProfile />
        case "Settings":
          return <div className="p-4 sm:p-8 text-center text-muted-foreground">Attraction Settings - Coming Soon</div>
        default:
          return <PerformanceOverview />
      }
    }
  }

  const getPageTitle = () => {
    if (user?.role === "authority") {
      return dashboardPage === "City Overview" ? "City Analytics Dashboard" : dashboardPage
    } else if (user?.role === "owner") {
      if (!user.hasAttraction && user.isNewUser) {
        return "Create Your Attraction"
      }
      return dashboardPage === "Performance Overview" ? "Attraction Performance Dashboard" : dashboardPage
    }
    return "Tourist Dashboard"
  }

  const getPageSubtitle = () => {
    if (user?.role === "authority") {
      return "City-wide tourism insights powered by real-time database analytics"
    } else if (user?.role === "owner") {
      if (!user.hasAttraction && user.isNewUser) {
        return "Set up your attraction to start receiving visitors"
      }
      return "Real-time attraction performance metrics from integrated database"
    }
    return "Discover amazing destinations across Indonesia"
  }

  if (currentPage === "landing") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <EnhancedHeroSection onSignIn={() => setCurrentPage("signin")} onSignUp={() => setCurrentPage("signup")} />
          <EnhancedFeaturesSection />
        </div>
        <ModernFooter />
        <ThemeToggle />
      </div>
    )
  }

  if (currentPage === "signin") {
    return <SignInForm onBack={() => setCurrentPage("landing")} onSignUp={() => setCurrentPage("signup")} />
  }

  if (currentPage === "signup") {
    return <SignUpForm onBack={() => setCurrentPage("landing")} onSignIn={() => setCurrentPage("signin")} />
  }

  if (currentPage === "dashboard" && user) {
    // Show profile completion ONLY for new users (signup)
    if (!user.profileCompleted && user.isNewUser) {
      return <CompleteProfile onComplete={handleProfileCompleted} />
    }

    // Tourist Interface
    if (user.role === "tourist") {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <TouristNavigationHeader
            currentPage={dashboardPage}
            onPageChange={handleTouristPageChange}
            onSearch={handleSearch}
          />
          <div>{renderTouristContent()}</div>
          <ThemeToggle />
        </div>
      )
    }

    // Authority/Owner Interface
    return (
      <SidebarProvider>
        {/* Only show sidebar if owner has attraction OR is not a new user */}
        {user.role === "authority" || (user.role === "owner" && (user.hasAttraction || !user.isNewUser)) ? (
          <DashboardSidebar currentPage={dashboardPage} onPageChange={setDashboardPage} />
        ) : null}
        <SidebarInset>
          <DashboardHeader title={getPageTitle()} subtitle={getPageSubtitle()} onProfileClick={handleProfileClick} />
          <div className="flex flex-1 flex-col gap-3 sm:gap-4 p-2 sm:p-4 pt-0">
            <div className="min-h-[100vh] w-full">{renderDashboardContent()}</div>
          </div>
        </SidebarInset>
        <ThemeToggle />
      </SidebarProvider>
    )
  }

  return null
}

export default function TourEaseApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
