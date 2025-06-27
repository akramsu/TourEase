export interface VisitorMetrics {
  date: string
  visitorCount: number
  location: {
    lat: number
    lng: number
    intensity: number
    name: string
  }
  hourlyData: {
    hour: number
    visitors: number
  }[]
}

export interface RevenueData {
  period: string
  totalRevenue: number
  revenueStreams: {
    source: string
    amount: number
    percentage: number
  }[]
  avgPerVisitor: number
  attractionRevenue: {
    attractionId: string
    name: string
    revenue: number
  }[]
}

export interface AttractionData {
  attractionId: string
  name: string
  category: string
  visitors: number
  revenue: number
  capacity: number
  rating: number
  coordinates: {
    lat: number
    lng: number
  }
  description: string
  image: string
}

export interface ForecastData {
  forecastDate: string
  predictedVisitors: number
  confidenceInterval: {
    lower: number
    upper: number
  }
  seasonalIndex: number
  eventImpact: number
}

export interface DemographicData {
  ageGroups: {
    range: string
    count: number
    percentage: number
  }[]
  genderData: {
    gender: string
    count: number
    percentage: number
  }[]
  originData: {
    region: string
    count: number
    coordinates: {
      lat: number
      lng: number
    }
    percentage: number
  }[]
}

export interface VisitorOrigin {
  coordinates: {
    lat: number
    lng: number
  }
  count: number
  city: string
  country: string
}
