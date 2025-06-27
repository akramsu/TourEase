// Database-aligned type definitions matching the provided schema

export interface User {
  userId: number
  username: string
  email: string
  roleId: number
  roleName: string
  profilePicture?: string
  phoneNumber?: string
  createdDate: string
}

export interface Role {
  roleId: number
  roleName: string
  permissions: string[]
}

export interface Attraction {
  attractionId: number
  name: string
  description: string
  address: string
  category: string
  userId: number // Owner ID
  rating: number
  latitude: number
  longitude: number
  openingHours: string
  capacity?: number
  ticketPrice?: number
  images: AttractionImage[]
}

export interface AttractionImage {
  imageId: number
  attractionId: number
  imageUrl: string
  isPrimary: boolean
}

export interface Visit {
  visitId: number
  attractionId: number
  visitorId: number
  visitDate: string
  amount: number
  duration: number // in minutes
  groupId?: number
  rating?: number
}

export interface Visitor {
  visitorId: number
  postcode: string
  birthDate: string
  gender: string
  city?: string
  country?: string
}

export interface Report {
  reportId: number
  reportType: string
  generatedDate: string
  authorityId: number
  reportData: any // JSON data
  title: string
  description?: string
}

export interface PredictiveModel {
  modelId: number
  predictionType: string
  predictedValue: number
  confidenceScore: number
  generatedDate: string
  createdById: number
  forecastPeriod: string
  attractionId?: number
}

export interface Alert {
  alertId: number
  alertType: string
  alertMessage: string
  alertData: any
  triggeredAt: string
  triggeredById: number
  alertResolved: boolean
  resolvedAt?: string
}

// Aggregated data types for dashboard views
export interface VisitorMetrics {
  totalVisitors: {
    current: number
    previous: number
    growth: number
    source: string
  }
  visitsByAttraction: {
    attractionId: number
    name: string
    category: string
    totalVisits: number
    revenue: number
    avgDuration: number
    rating: number
  }[]
  visitorFlow: {
    visitDate: string
    totalVisitors: number
    attractions: {
      attractionId: number
      visitors: number
      latitude: number
      longitude: number
    }[]
  }[]
}

export interface RevenueData {
  totalRevenue: {
    monthly: number
    quarterly: number
    yearly: number
    growthRate: number
  }
  revenueByAttraction: {
    attractionId: number
    name: string
    category: string
    revenue: number
    visits: number
    revenuePerVisit: number
    trend: { visitDate: string; amount: number }[]
  }[]
  revenueStreams: {
    ticketSales: number
    merchandise: number
    food: number
  }
}

export interface DemographicData {
  ageGroups: { range: string; count: number; percentage: number }[]
  gender: { gender: string; count: number; percentage: number }[]
  origins: { postcode: string; count: number; city: string }[]
}
