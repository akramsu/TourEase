import type {
  VisitorMetrics,
  RevenueData,
  AttractionData,
  ForecastData,
  DemographicData,
  VisitorOrigin,
} from "@/types/tourism-data"

// Mock visitor metrics data
export const mockVisitorMetrics: VisitorMetrics[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)

  return {
    date: date.toISOString().split("T")[0],
    visitorCount: Math.floor(Math.random() * 5000) + 8000,
    location: {
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.006 + (Math.random() - 0.5) * 0.1,
      intensity: Math.random(),
      name: `Zone ${i + 1}`,
    },
    hourlyData: Array.from({ length: 24 }, (_, hour) => ({
      hour,
      visitors: Math.floor(Math.random() * 500) + 100,
    })),
  }
})

// Mock revenue data
export const mockRevenueData: RevenueData = {
  period: "2024-01",
  totalRevenue: 2450000,
  revenueStreams: [
    { source: "Admission Tickets", amount: 1470000, percentage: 60 },
    { source: "Gift Shops", amount: 490000, percentage: 20 },
    { source: "Food & Beverage", amount: 367500, percentage: 15 },
    { source: "Parking", amount: 122500, percentage: 5 },
  ],
  avgPerVisitor: 87.5,
  attractionRevenue: [
    { attractionId: "1", name: "City Museum", revenue: 580000 },
    { attractionId: "2", name: "Central Park", revenue: 420000 },
    { attractionId: "3", name: "Historic District", revenue: 380000 },
    { attractionId: "4", name: "Art Gallery", revenue: 320000 },
    { attractionId: "5", name: "Science Center", revenue: 280000 },
  ],
}

// Mock attractions data
export const mockAttractions: AttractionData[] = [
  {
    attractionId: "1",
    name: "Metropolitan Museum",
    category: "Museums",
    visitors: 28450,
    revenue: 580000,
    capacity: 5000,
    rating: 4.8,
    coordinates: { lat: 40.7794, lng: -73.9632 },
    description: "World-renowned art museum with extensive collections",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    attractionId: "2",
    name: "Central Park",
    category: "Parks",
    visitors: 45200,
    revenue: 420000,
    capacity: 10000,
    rating: 4.6,
    coordinates: { lat: 40.7829, lng: -73.9654 },
    description: "Iconic urban park in the heart of the city",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    attractionId: "3",
    name: "Historic Downtown",
    category: "Historical",
    visitors: 32100,
    revenue: 380000,
    capacity: 8000,
    rating: 4.5,
    coordinates: { lat: 40.7505, lng: -73.9934 },
    description: "Preserved historic district with colonial architecture",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    attractionId: "4",
    name: "Modern Art Gallery",
    category: "Museums",
    visitors: 18900,
    revenue: 320000,
    capacity: 3000,
    rating: 4.7,
    coordinates: { lat: 40.7614, lng: -73.9776 },
    description: "Contemporary art exhibitions and installations",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    attractionId: "5",
    name: "Adventure Park",
    category: "Adventure",
    visitors: 22800,
    revenue: 280000,
    capacity: 4000,
    rating: 4.4,
    coordinates: { lat: 40.7282, lng: -73.7949 },
    description: "Thrilling outdoor activities and adventure sports",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Mock forecast data
export const mockForecastData: ForecastData[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() + i)

  const baseVisitors = 12000
  const seasonalFactor = 1 + 0.3 * Math.sin((i / 365) * 2 * Math.PI)
  const randomFactor = 0.8 + Math.random() * 0.4

  return {
    forecastDate: date.toISOString().split("T")[0],
    predictedVisitors: Math.floor(baseVisitors * seasonalFactor * randomFactor),
    confidenceInterval: {
      lower: Math.floor(baseVisitors * seasonalFactor * randomFactor * 0.85),
      upper: Math.floor(baseVisitors * seasonalFactor * randomFactor * 1.15),
    },
    seasonalIndex: seasonalFactor,
    eventImpact: Math.random() > 0.9 ? 1.5 : 1.0,
  }
})

// Mock demographic data
export const mockDemographicData: DemographicData = {
  ageGroups: [
    { range: "18-25", count: 45200, percentage: 28 },
    { range: "26-35", count: 56500, percentage: 35 },
    { range: "36-45", count: 35500, percentage: 22 },
    { range: "46-55", count: 16100, percentage: 10 },
    { range: "55+", count: 8100, percentage: 5 },
  ],
  genderData: [
    { gender: "Female", count: 85400, percentage: 53 },
    { gender: "Male", count: 75600, percentage: 47 },
  ],
  originData: [
    { region: "Local (0-50km)", count: 64400, coordinates: { lat: 40.7128, lng: -74.006 }, percentage: 40 },
    { region: "Regional (50-200km)", count: 48300, coordinates: { lat: 41.2033, lng: -77.1945 }, percentage: 30 },
    { region: "National", count: 32200, coordinates: { lat: 39.8283, lng: -98.5795 }, percentage: 20 },
    { region: "International", count: 16100, coordinates: { lat: 51.1657, lng: 10.4515 }, percentage: 10 },
  ],
}

// Mock visitor origins for map
export const mockVisitorOrigins: VisitorOrigin[] = [
  { coordinates: { lat: 40.7128, lng: -74.006 }, count: 15420, city: "New York", country: "USA" },
  { coordinates: { lat: 34.0522, lng: -118.2437 }, count: 8930, city: "Los Angeles", country: "USA" },
  { coordinates: { lat: 41.8781, lng: -87.6298 }, count: 7650, city: "Chicago", country: "USA" },
  { coordinates: { lat: 51.5074, lng: -0.1278 }, count: 5420, city: "London", country: "UK" },
  { coordinates: { lat: 48.8566, lng: 2.3522 }, count: 4890, city: "Paris", country: "France" },
  { coordinates: { lat: 35.6762, lng: 139.6503 }, count: 4320, city: "Tokyo", country: "Japan" },
  { coordinates: { lat: 52.52, lng: 13.405 }, count: 3780, city: "Berlin", country: "Germany" },
  { coordinates: { lat: -33.8688, lng: 151.2093 }, count: 3210, city: "Sydney", country: "Australia" },
]

// Hourly visitor patterns
export const mockHourlyPatterns = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day,
    hour,
    visitors: Math.floor(Math.random() * 500) + 100 + (hour >= 10 && hour <= 16 ? 200 : 0),
  })),
).flat()

// Visit duration data
export const mockVisitDuration = Array.from({ length: 1000 }, () => ({
  duration: Math.random() * 6 + 0.5, // 0.5 to 6.5 hours
  category: Math.random() > 0.7 ? "Long Visit" : Math.random() > 0.4 ? "Medium Visit" : "Short Visit",
}))

// Revenue projections
export const mockRevenueProjections = Array.from({ length: 12 }, (_, i) => {
  const month = new Date()
  month.setMonth(month.getMonth() + i)

  return {
    month: month.toISOString().slice(0, 7),
    optimistic: Math.floor(Math.random() * 500000) + 2000000,
    realistic: Math.floor(Math.random() * 300000) + 1800000,
    pessimistic: Math.floor(Math.random() * 200000) + 1500000,
  }
})

// AI insights
export const mockAIInsights = [
  {
    type: "trend",
    title: "Visitor Growth Acceleration",
    description:
      "AI detected a 23% increase in visitor growth rate over the past 3 weeks, primarily driven by improved weather conditions and successful marketing campaigns.",
    confidence: 0.89,
    impact: "high",
  },
  {
    type: "anomaly",
    title: "Unusual Weekend Pattern",
    description:
      "Saturday visitor numbers are 15% lower than expected based on historical patterns. This may indicate a shift in visitor preferences or external factors.",
    confidence: 0.76,
    impact: "medium",
  },
  {
    type: "recommendation",
    title: "Optimize Peak Hour Staffing",
    description:
      "Consider increasing staff by 20% during 11 AM - 2 PM window to improve visitor experience and reduce wait times.",
    confidence: 0.92,
    impact: "high",
  },
]

// Performance rankings
export const mockPerformanceRankings = mockAttractions.map((attraction, index) => ({
  ...attraction,
  rank: index + 1,
  performanceScore: Math.floor(Math.random() * 30) + 70,
  revenuePerVisitor: Math.floor((attraction.revenue / attraction.visitors) * 100) / 100,
  capacityUtilization: Math.floor((attraction.visitors / attraction.capacity) * 100),
  growthRate: (Math.random() - 0.5) * 40,
}))
