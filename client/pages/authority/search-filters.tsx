"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Download, RefreshCw, MapPin, DollarSign, Star, Clock, Calendar } from "lucide-react"

export function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([0, 5])
  const [priceRange, setPriceRange] = useState([0, 500000])

  const filterCategories = [
    {
      title: "Category",
      options: [
        "Museum",
        "Historical Site",
        "Natural Park",
        "Cultural Center",
        "Adventure Park",
        "Religious Site",
        "Beach",
        "Mountain",
      ],
    },
    {
      title: "Location",
      options: ["Jakarta", "Yogyakarta", "Bali", "Bandung", "Surabaya", "Medan", "Semarang", "Malang"],
    },
    {
      title: "Opening Status",
      options: ["Open Now", "Closed", "24 Hours", "Seasonal"],
    },
    {
      title: "Price Range",
      options: ["Free", "Under Rp 50K", "Rp 50K - 100K", "Rp 100K - 200K", "Above Rp 200K"],
    },
  ]

  const mockAttractions = [
    {
      attractionID: "ATR001",
      name: "Borobudur Temple",
      description: "Ancient Buddhist temple and UNESCO World Heritage Site",
      address: "Jl. Badrawati, Borobudur, Magelang Regency, Central Java",
      category: "Historical Site",
      userID: "USR001",
      createdDate: "2020-01-15",
      rating: 4.8,
      latitude: -7.6079,
      longitude: 110.2038,
      openingHours: "06:00 - 17:00",
      price: 50000,
    },
    {
      attractionID: "ATR002",
      name: "National Museum",
      description: "Indonesia's premier museum showcasing cultural heritage",
      address: "Jl. Medan Merdeka Barat No.12, Jakarta Pusat",
      category: "Museum",
      userID: "USR002",
      createdDate: "2019-03-20",
      rating: 4.6,
      latitude: -6.1751,
      longitude: 106.8249,
      openingHours: "08:00 - 16:00",
      price: 25000,
    },
    {
      attractionID: "ATR003",
      name: "Taman Safari Indonesia",
      description: "Wildlife conservation park with drive-through safari experience",
      address: "Jl. Raya Puncak No.601, Cisarua, Bogor Regency, West Java",
      category: "Adventure Park",
      userID: "USR003",
      createdDate: "2018-07-10",
      rating: 4.7,
      latitude: -6.7104,
      longitude: 106.9447,
      openingHours: "08:30 - 17:00",
      price: 180000,
    },
    {
      attractionID: "ATR004",
      name: "Tanah Lot Temple",
      description: "Iconic sea temple perched on a rock formation",
      address: "Beraban, Kediri, Tabanan Regency, Bali",
      category: "Religious Site",
      userID: "USR004",
      createdDate: "2019-11-05",
      rating: 4.5,
      latitude: -8.6211,
      longitude: 115.0868,
      openingHours: "06:00 - 19:00",
      price: 60000,
    },
  ]

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
    setSearchQuery("")
    setRatingRange([0, 5])
    setPriceRange([0, 500000])
  }

  const filteredAttractions = mockAttractions.filter((attraction) => {
    const matchesSearch =
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating = attraction.rating >= ratingRange[0] && attraction.rating <= ratingRange[1]
    const matchesPrice = attraction.price >= priceRange[0] && attraction.price <= priceRange[1]

    return matchesSearch && matchesRating && matchesPrice
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Search & Filter Attractions</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Advanced search and filtering for attraction data analysis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Download className="h-4 w-4" />
            Export Results
          </Button>
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
        {/* Search and Filters Sidebar */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search attractions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category Filters */}
          {filterCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                {category.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={selectedFilters.includes(option)}
                      onCheckedChange={() => handleFilterToggle(option)}
                    />
                    <Label htmlFor={option} className="text-xs sm:text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Rating Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Rating Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider value={ratingRange} onValueChange={setRatingRange} max={5} step={0.1} className="w-full" />
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                <span>{ratingRange[0].toFixed(1)} ⭐</span>
                <span>{ratingRange[1].toFixed(1)} ⭐</span>
              </div>
            </CardContent>
          </Card>

          {/* Price Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Price Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider value={priceRange} onValueChange={setPriceRange} max={500000} step={5000} className="w-full" />
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                <span>Rp {(priceRange[0] / 1000).toFixed(0)}K</span>
                <span>Rp {(priceRange[1] / 1000).toFixed(0)}K</span>
              </div>
            </CardContent>
          </Card>

          {/* Clear Filters */}
          <Button variant="outline" onClick={clearAllFilters} className="w-full text-sm">
            Clear All Filters
          </Button>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Active Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter) => (
                    <Badge key={filter} variant="secondary" className="gap-1 text-xs">
                      {filter}
                      <button
                        onClick={() => handleFilterToggle(filter)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search Results */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Search Results</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Found {filteredAttractions.length} attractions matching your criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {filteredAttractions.map((attraction) => (
                  <div
                    key={attraction.attractionID}
                    className="border rounded-lg p-3 sm:p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{attraction.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {attraction.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            ID: {attraction.attractionID}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {attraction.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{attraction.address}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>{attraction.openingHours}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>Rp {attraction.price.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>Created: {new Date(attraction.createdDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center sm:text-right flex-shrink-0">
                        <div className="text-lg sm:text-xl font-semibold flex items-center justify-center sm:justify-end gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {attraction.rating}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Summary */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{filteredAttractions.length}</div>
                <p className="text-xs text-muted-foreground">From search results</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Avg Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  Rp{" "}
                  {Math.round(
                    filteredAttractions.reduce((sum, a) => sum + a.price, 0) / filteredAttractions.length / 1000,
                  )}
                  K
                </div>
                <p className="text-xs text-muted-foreground">Average entry fee</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  {(filteredAttractions.reduce((sum, a) => sum + a.rating, 0) / filteredAttractions.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Average rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  {new Set(filteredAttractions.map((a) => a.category)).size}
                </div>
                <p className="text-xs text-muted-foreground">Unique categories</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
