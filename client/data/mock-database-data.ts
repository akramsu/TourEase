import type {
  User,
  Attraction,
  Visit,
  Visitor,
  Report,
  PredictiveModel,
  Alert,
  VisitorMetrics,
  RevenueData,
  DemographicData,
} from "@/types/database-types"

// Mock Users (matching User table)
export const mockUsers: User[] = [
  {
    userId: 1,
    username: "tourism_admin",
    email: "admin@tourism.gov",
    roleId: 1,
    roleName: "Tourism Authority",
    profilePicture: "/placeholder.svg?height=40&width=40",
    phoneNumber: "+62812345678",
    createdDate: "2025-01-15",
  },
  {
    userId: 15,
    username: "museum_admin",
    email: "admin@museum.com",
    roleId: 2,
    roleName: "Attraction Owner",
    profilePicture: "/placeholder.svg?height=40&width=40",
    phoneNumber: "+62812345679",
    createdDate: "2025-02-01",
  },
]

// Mock Attractions (matching Attraction table)
export const mockAttractions: Attraction[] = [
  {
    attractionId: 1,
    name: "National Museum",
    description: "Historical artifacts and cultural exhibits showcasing Indonesian heritage",
    address: "Jl. Kepatihan, Yogyakarta",
    category: "Museum",
    userId: 15,
    rating: 4.5,
    latitude: -7.7956,
    longitude: 110.3695,
    openingHours: "09:00-17:00",
    capacity: 500,
    ticketPrice: 20000,
    images: [
      { imageId: 1, attractionId: 1, imageUrl: "/placeholder.svg?height=200&width=300", isPrimary: true },
      { imageId: 2, attractionId: 1, imageUrl: "/placeholder.svg?height=200&width=300", isPrimary: false },
    ],
  },
  {
    attractionId: 2,
    name: "Taman Sari Water Castle",
    description: "Former royal garden and bathing complex of Yogyakarta Sultanate",
    address: "Jl. Taman, Kraton, Yogyakarta",
    category: "Historical Site",
    userId: 16,
    rating: 4.3,
    latitude: -7.8014,
    longitude: 110.3645,
    openingHours: "08:00-16:00",
    capacity: 300,
    ticketPrice: 15000,
    images: [{ imageId: 3, attractionId: 2, imageUrl: "/placeholder.svg?height=200&width=300", isPrimary: true }],
  },
  {
    attractionId: 3,
    name: "Malioboro Street",
    description: "Famous shopping street and cultural center of Yogyakarta",
    address: "Jl. Malioboro, Yogyakarta",
    category: "Cultural Site",
    userId: 17,
    rating: 4.2,
    latitude: -7.7925,
    longitude: 110.3656,
    openingHours: "24 hours",
    capacity: 1000,
    ticketPrice: 0,
    images: [{ imageId: 4, attractionId: 3, imageUrl: "/placeholder.svg?height=200&width=300", isPrimary: true }],
  },
  {
    attractionId: 4,
    name: "Prambanan Temple",
    description: "9th-century Hindu temple compound dedicated to Trimurti",
    address: "Jl. Raya Solo-Yogyakarta, Klaten",
    category: "Historical Site",
    userId: 18,
    rating: 4.7,
    latitude: -7.752,
    longitude: 110.4915,
    openingHours: "06:00-18:00",
    capacity: 800,
    ticketPrice: 50000,
    images: [{ imageId: 5, attractionId: 4, imageUrl: "/placeholder.svg?height=200&width=300", isPrimary: true }],
  },
  {
    attractionId: 5,
    name: "Yogya Kembali Monument",
    description: "Monument commemorating the return of Yogyakarta to Indonesia",
    address: "Jl. Ring Road Utara, Yogyakarta",
    category: "Museum",
    userId: 19,
    rating: 4.1,
    latitude: -7.7499,
    longitude: 110.3675,
    openingHours: "08:00-16:00",
    capacity: 400,
    ticketPrice: 10000,
    images: [{ imageId: 6, attractionId: 5, imageUrl: "/placeholder.svg?height=200&width=300", isPrimary: true }],
  },
]

// Mock Visitors (matching Visitor table)
export const mockVisitors: Visitor[] = Array.from({ length: 1000 }, (_, i) => ({
  visitorId: i + 1,
  postcode: ["55281", "10110", "40115", "60119", "50241"][Math.floor(Math.random() * 5)],
  birthDate: new Date(
    1970 + Math.floor(Math.random() * 40),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1,
  )
    .toISOString()
    .split("T")[0],
  gender: Math.random() > 0.5 ? "Female" : "Male",
  city: ["Yogyakarta", "Jakarta", "Bandung", "Surabaya", "Semarang"][Math.floor(Math.random() * 5)],
  country: "Indonesia",
}))

// Mock Visits (matching Visit table)
export const mockVisits: Visit[] = Array.from({ length: 5000 }, (_, i) => {
  const visitDate = new Date()
  visitDate.setDate(visitDate.getDate() - Math.floor(Math.random() * 90))

  return {
    visitId: i + 1,
    attractionId: Math.floor(Math.random() * 5) + 1,
    visitorId: Math.floor(Math.random() * 1000) + 1,
    visitDate: visitDate.toISOString().split("T")[0],
    amount: Math.floor(Math.random() * 50000) + 10000,
    duration: Math.floor(Math.random() * 180) + 30,
    groupId: Math.random() > 0.7 ? Math.floor(Math.random() * 100) + 1 : undefined,
    rating: Math.random() > 0.3 ? Math.floor(Math.random() * 2) + 4 : Math.floor(Math.random() * 5) + 1,
  }
})

// Mock Reports (matching Reports table)
export const mockReports: Report[] = [
  {
    reportId: 1,
    reportType: "Tourism Trend",
    generatedDate: "2025-06-01",
    authorityId: 1,
    title: "Monthly Tourism Analysis - May 2025",
    description: "Comprehensive analysis of tourism trends and visitor patterns",
    reportData: {
      summary: "Monthly tourism analysis showing 15% growth in visitor numbers",
      charts: ["visitor_trend", "revenue_breakdown", "demographic_analysis"],
      period: { start: "2025-05-01", end: "2025-05-31" },
      keyFindings: [
        "Museum visits increased by 23%",
        "Weekend traffic peaked at 150% of weekday average",
        "International visitors comprised 18% of total",
      ],
      recommendations: [
        "Increase weekend staffing at popular attractions",
        "Develop targeted marketing for international visitors",
        "Consider dynamic pricing for peak periods",
      ],
    },
  },
  {
    reportId: 2,
    reportType: "Revenue",
    generatedDate: "2025-06-05",
    authorityId: 1,
    title: "Revenue Performance Report - Q2 2025",
    description: "Quarterly revenue analysis across all attractions",
    reportData: {
      totalRevenue: 2456000,
      topAttractions: [
        { attractionId: 4, name: "Prambanan Temple", revenue: 890000 },
        { attractionId: 1, name: "National Museum", revenue: 567000 },
        { attractionId: 2, name: "Taman Sari Water Castle", revenue: 445000 },
      ],
      growthMetrics: { monthly: 8.3, yearly: 15.7 },
      revenueByCategory: {
        "Historical Site": 1335000,
        Museum: 577000,
        "Cultural Site": 544000,
      },
    },
  },
]

// Mock Predictive Models (matching PredictiveModels table)
export const mockPredictiveModels: PredictiveModel[] = [
  {
    modelId: 1,
    predictionType: "Visitor Flow",
    predictedValue: 18500,
    confidenceScore: 0.87,
    generatedDate: "2025-06-08",
    createdById: 1,
    forecastPeriod: "2025-07-01",
    attractionId: null,
  },
  {
    modelId: 2,
    predictionType: "Revenue",
    predictedValue: 285000,
    confidenceScore: 0.82,
    generatedDate: "2025-06-08",
    createdById: 1,
    forecastPeriod: "2025-07-01",
    attractionId: 1,
  },
  {
    modelId: 3,
    predictionType: "Visitor Flow",
    predictedValue: 2800,
    confidenceScore: 0.91,
    generatedDate: "2025-06-08",
    createdById: 15,
    forecastPeriod: "2025-07-01",
    attractionId: 1,
  },
]

// Mock Alerts (matching Alerts table)
export const mockAlerts: Alert[] = [
  {
    alertId: 1,
    alertType: "Visitor Threshold Exceeded",
    alertMessage: "National Museum exceeded 90% capacity",
    alertData: {
      attractionId: 1,
      currentVisitors: 450,
      capacity: 500,
      threshold: 0.9,
      timestamp: "2025-06-08T10:30:00Z",
    },
    triggeredAt: "2025-06-08T10:30:00Z",
    triggeredById: 1,
    alertResolved: false,
  },
  {
    alertId: 2,
    alertType: "Revenue Drop",
    alertMessage: "15% revenue decrease detected at Taman Sari",
    alertData: {
      attractionId: 2,
      currentRevenue: 12400,
      expectedRevenue: 14600,
      dropPercentage: 15.1,
      period: "last_7_days",
    },
    triggeredAt: "2025-06-07T14:15:00Z",
    triggeredById: 1,
    alertResolved: true,
    resolvedAt: "2025-06-08T09:00:00Z",
  },
  {
    alertId: 3,
    alertType: "Rating Drop",
    alertMessage: "Average rating dropped below 4.0 at Malioboro Street",
    alertData: {
      attractionId: 3,
      currentRating: 3.8,
      previousRating: 4.2,
      reviewCount: 45,
      period: "last_month",
    },
    triggeredAt: "2025-06-06T16:20:00Z",
    triggeredById: 1,
    alertResolved: false,
  },
]

// Aggregated Visitor Metrics (based on database queries)
export const mockVisitorMetrics: VisitorMetrics = {
  totalVisitors: {
    current: 15420,
    previous: 13890,
    growth: 11.2,
    source: "SELECT COUNT(DISTINCT VisitorID) FROM Visit WHERE VisitDate >= '2025-06-01'",
  },
  visitsByAttraction: mockAttractions.map((attraction) => {
    const attractionVisits = mockVisits.filter((visit) => visit.attractionId === attraction.attractionId)
    return {
      attractionId: attraction.attractionId,
      name: attraction.name,
      category: attraction.category,
      totalVisits: attractionVisits.length,
      revenue: attractionVisits.reduce((sum, visit) => sum + visit.amount, 0),
      avgDuration: attractionVisits.reduce((sum, visit) => sum + visit.duration, 0) / attractionVisits.length || 0,
      rating: attraction.rating,
    }
  }),
  visitorFlow: Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]

    const dayVisits = mockVisits.filter((visit) => visit.visitDate === dateStr)

    return {
      visitDate: dateStr,
      totalVisitors: dayVisits.length,
      attractions: mockAttractions.map((attraction) => ({
        attractionId: attraction.attractionId,
        visitors: dayVisits.filter((visit) => visit.attractionId === attraction.attractionId).length,
        latitude: attraction.latitude,
        longitude: attraction.longitude,
      })),
    }
  }),
}

// Aggregated Revenue Data (based on database queries)
export const mockRevenueData: RevenueData = {
  totalRevenue: {
    monthly: 2456000,
    quarterly: 7204000,
    yearly: 28345000,
    growthRate: 8.3,
  },
  revenueByAttraction: mockAttractions.map((attraction) => {
    const attractionVisits = mockVisits.filter((visit) => visit.attractionId === attraction.attractionId)
    const revenue = attractionVisits.reduce((sum, visit) => sum + visit.amount, 0)

    return {
      attractionId: attraction.attractionId,
      name: attraction.name,
      category: attraction.category,
      revenue,
      visits: attractionVisits.length,
      revenuePerVisit: revenue / attractionVisits.length || 0,
      trend: Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split("T")[0]
        const dayRevenue = attractionVisits
          .filter((visit) => visit.visitDate === dateStr)
          .reduce((sum, visit) => sum + visit.amount, 0)
        return { visitDate: dateStr, amount: dayRevenue }
      }),
    }
  }),
  revenueStreams: {
    ticketSales: 1804000,
    merchandise: 452000,
    food: 200000,
  },
}

// Demographic Data (based on Visitor table analysis)
export const mockDemographicData: DemographicData = {
  ageGroups: [
    { range: "18-25", count: 2456, percentage: 19.5 },
    { range: "26-35", count: 3623, percentage: 28.8 },
    { range: "36-45", count: 2834, percentage: 22.5 },
    { range: "46-55", count: 2145, percentage: 17.0 },
    { range: "55+", count: 1542, percentage: 12.2 },
  ],
  gender: [
    { gender: "Male", count: 6124, percentage: 48.6 },
    { gender: "Female", count: 6476, percentage: 51.4 },
  ],
  origins: [
    { postcode: "55281", count: 4145, city: "Yogyakarta" },
    { postcode: "10110", count: 2889, city: "Jakarta" },
    { postcode: "40115", count: 2234, city: "Bandung" },
    { postcode: "60119", count: 1876, city: "Surabaya" },
    { postcode: "50241", count: 1456, city: "Semarang" },
  ],
}

// Hourly visitor patterns for heatmap
export const mockHourlyPatterns = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const baseVisitors = Math.floor(Math.random() * 100) + 50
    const peakMultiplier = hour >= 9 && hour <= 16 ? 1.5 : 0.5
    const weekendMultiplier = day === 5 || day === 6 ? 1.3 : 1.0

    return {
      day,
      hour,
      visitors: Math.floor(baseVisitors * peakMultiplier * weekendMultiplier),
      dayName: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][day],
    }
  }),
).flat()

// Search and filter configurations
export const searchConfig = {
  globalSearch: {
    attractions: "SELECT * FROM Attraction WHERE Name LIKE '%search%' OR Description LIKE '%search%'",
    visitors: "SELECT * FROM Visitor JOIN Visit ON Visitor.VisitorID = Visit.VisitorID",
    reports: "SELECT * FROM Reports WHERE ReportType LIKE '%search%'",
  },
  filters: {
    attractions: {
      categories: ["Museum", "Historical Site", "Cultural Site", "Park", "Religious Site"],
      ratings: [1, 2, 3, 4, 5],
      priceRanges: [
        { label: "Free", min: 0, max: 0 },
        { label: "Under 20K", min: 1, max: 20000 },
        { label: "20K - 50K", min: 20000, max: 50000 },
        { label: "Above 50K", min: 50000, max: 999999 },
      ],
    },
    visitors: {
      ageRanges: ["18-25", "26-35", "36-45", "46-55", "55+"],
      genders: ["Male", "Female"],
      cities: ["Yogyakarta", "Jakarta", "Bandung", "Surabaya", "Semarang"],
    },
    dateRanges: {
      presets: ["today", "last_7_days", "last_month", "last_quarter", "last_year"],
      custom: { start: "2025-01-01", end: "2025-06-08" },
    },
  },
}

// API endpoint configurations
export const apiEndpoints = {
  // Tourism Authority endpoints
  getVisitorMetrics: "GET /api/visits/metrics?startDate={date}&endDate={date}",
  getAttractionPerformance: "GET /api/attractions/performance",
  generateReport: "POST /api/reports/generate",
  getAlerts: "GET /api/alerts?resolved={boolean}",
  getPredictiveModels: "GET /api/predictions?type={string}",

  // Attraction Owner endpoints
  getAttractionData: "GET /api/attractions/{attractionId}",
  getVisitorAnalysis: "GET /api/attractions/{attractionId}/visitors",
  updateAttraction: "PUT /api/attractions/{attractionId}",
  getAttractionReports: "GET /api/attractions/{attractionId}/reports",

  // Common endpoints
  searchData: "GET /api/search?query={string}&type={string}",
  getUserProfile: "GET /api/users/{userId}",
  updateUserProfile: "PUT /api/users/{userId}",
  uploadImage: "POST /api/images/upload",
}
