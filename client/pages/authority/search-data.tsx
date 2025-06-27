"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, RefreshCw, MapPin, DollarSign, Star, Clock, Calendar, Eye } from "lucide-react"

export function SearchData() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const mockAttractions = [
    {
      attractionID: "ATR001",
      name: "Borobudur Temple",
      description: "Ancient Buddhist temple and UNESCO World Heritage Site with intricate stone carvings",
      address: "Jl. Badrawati, Borobudur, Magelang Regency, Central Java 56553",
      category: "Historical Site",
      userID: "USR001",
      createdDate: "2020-01-15T08:30:00Z",
      rating: 4.8,
      latitude: -7.6079,
      longitude: 110.2038,
      openingHours: "06:00 - 17:00",
      price: 50000,
    },
    {
      attractionID: "ATR002",
      name: "National Museum of Indonesia",
      description: "Indonesia's premier museum showcasing cultural heritage and historical artifacts",
      address: "Jl. Medan Merdeka Barat No.12, Gambir, Jakarta Pusat 10110",
      category: "Museum",
      userID: "USR002",
      createdDate: "2019-03-20T10:15:00Z",
      rating: 4.6,
      latitude: -6.1751,
      longitude: 106.8249,
      openingHours: "08:00 - 16:00",
      price: 25000,
    },
    {
      attractionID: "ATR003",
      name: "Taman Safari Indonesia",
      description: "Wildlife conservation park with drive-through safari experience and animal shows",
      address: "Jl. Raya Puncak No.601, Cisarua, Bogor Regency, West Java 16750",
      category: "Adventure Park",
      userID: "USR003",
      createdDate: "2018-07-10T14:20:00Z",
      rating: 4.7,
      latitude: -6.7104,
      longitude: 106.9447,
      openingHours: "08:30 - 17:00",
      price: 180000,
    },
    {
      attractionID: "ATR004",
      name: "Tanah Lot Temple",
      description: "Iconic sea temple perched on a rock formation, famous for sunset views",
      address: "Beraban, Kediri, Tabanan Regency, Bali 82121",
      category: "Religious Site",
      userID: "USR004",
      createdDate: "2019-11-05T16:45:00Z",
      rating: 4.5,
      latitude: -8.6211,
      longitude: 115.0868,
      openingHours: "06:00 - 19:00",
      price: 60000,
    },
    {
      attractionID: "ATR005",
      name: "Malioboro Street",
      description: "Famous shopping street in Yogyakarta with traditional crafts and street food",
      address: "Jl. Malioboro, Sosromenduran, Gedong Tengen, Yogyakarta 55271",
      category: "Cultural Center",
      userID: "USR005",
      createdDate: "2020-05-12T09:00:00Z",
      rating: 4.4,
      latitude: -7.7956,
      longitude: 110.3695,
      openingHours: "24 Hours",
      price: 0,
    },
    {
      attractionID: "ATR006",
      name: "Mount Bromo",
      description: "Active volcano and popular sunrise viewing destination in East Java",
      address: "Bromo Tengger Semeru National Park, East Java",
      category: "Natural Park",
      userID: "USR006",
      createdDate: "2018-12-03T07:30:00Z",
      rating: 4.9,
      latitude: -7.9425,
      longitude: 112.953,
      openingHours: "00:00 - 24:00",
      price: 320000,
    },
  ]

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      const filtered = mockAttractions.filter(
        (attraction) =>
          attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attraction.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attraction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attraction.attractionID.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered)
      setIsSearching(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Search Attraction Data</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Search through attraction database using various criteria
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Download className="h-4 w-4" />
            Export Results
          </Button>
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <RefreshCw className="h-4 w-4" />
            Refresh Database
          </Button>
        </div>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Database Search</CardTitle>
          <CardDescription>
            Search by Attraction ID, Name, Description, Address, Category, or any other field
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter search terms (ID, name, category, location, etc.)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching} className="gap-2">
              <Search className="h-4 w-4" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Search Results</CardTitle>
            <CardDescription>Found {searchResults.length} attractions matching your search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((attraction) => (
                <div
                  key={attraction.attractionID}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-base sm:text-lg">{attraction.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {attraction.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          ID: {attraction.attractionID}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">{attraction.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                          <span className="text-muted-foreground">{attraction.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <span className="text-muted-foreground">{attraction.openingHours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {attraction.price === 0 ? "Free" : `Rp ${attraction.price.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Created: {new Date(attraction.createdDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>Owner ID: {attraction.userID}</span>
                        <span>
                          Coordinates: {attraction.latitude.toFixed(4)}, {attraction.longitude.toFixed(4)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 lg:items-end">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-lg font-semibold">{attraction.rating}</span>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Database Statistics */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAttractions.length}</div>
            <p className="text-xs text-muted-foreground">In database</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(mockAttractions.map((a) => a.category)).size}</div>
            <p className="text-xs text-muted-foreground">Unique types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockAttractions.reduce((sum, a) => sum + a.rating, 0) / mockAttractions.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Overall average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{searchResults.length}</div>
            <p className="text-xs text-muted-foreground">Current results</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
