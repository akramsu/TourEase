"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Download, RefreshCw, MapPin, DollarSign, Star, Clock, Calendar, X } from "lucide-react"

export function ApplyFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([0, 5])
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [sortBy, setSortBy] = useState("")
  const [filteredResults, setFilteredResults] = useState<any[]>([])

  const mockAttractions = [
    {
      attractionID: "ATR001",
      name: "Borobudur Temple",
      description: "Ancient Buddhist temple and UNESCO World Heritage Site",
      address: "Jl. Badrawati, Borobudur, Magelang Regency, Central Java",
      category: "Historical Site",
      userID: "USR001",
      createdDate: "2020-01-15T08:30:00Z",
      rating: 4.8,
      latitude: -7.6079,
      longitude: 110.2038,
      openingHours: "06:00 - 17:00",
      price: 50000,
      location: "Central Java",
    },
    {
      attractionID: "ATR002",
      name: "National Museum",
      description: "Indonesia's premier museum showcasing cultural heritage",
      address: "Jl. Medan Merdeka Barat No.12, Jakarta Pusat",
      category: "Museum",
      userID: "USR002",
      createdDate: "2019-03-20T10:15:00Z",
      rating: 4.6,
      latitude: -6.1751,
      longitude: 106.8249,
      openingHours: "08:00 - 16:00",
      price: 25000,
      location: "Jakarta",
    },
    {
      attractionID: "ATR003",
      name: "Taman Safari Indonesia",
      description: "Wildlife conservation park with drive-through safari experience",
      address: "Jl. Raya Puncak No.601, Cisarua, Bogor Regency, West Java",
      category: "Adventure Park",
      userID: "USR003",
      createdDate: "2018-07-10T14:20:00Z",
      rating: 4.7,
      latitude: -6.7104,
      longitude: 106.9447,
      openingHours: "08:30 - 17:00",
      price: 180000,
      location: "West Java",
    },
    {
      attractionID: "ATR004",
      name: "Tanah Lot Temple",
      description: "Iconic sea temple perched on a rock formation",
      address: "Beraban, Kediri, Tabanan Regency, Bali",
      category: "Religious Site",
      userID: "USR004",
      createdDate: "2019-11-05T16:45:00Z",
      rating: 4.5,
      latitude: -8.6211,
      longitude: 115.0868,
      openingHours: "06:00 - 19:00",
      price: 60000,
      location: "Bali",
    },
    {
      attractionID: "ATR005",
      name: "Malioboro Street",
      description: "Famous shopping street with traditional crafts",
      address: "Jl. Malioboro, Sosromenduran, Gedong Tengen, Yogyakarta",
      category: "Cultural Center",
      userID: "USR005",
      createdDate: "2020-05-12T09:00:00Z",
      rating: 4.4,
      latitude: -7.7956,
      longitude: 110.3695,
      openingHours: "24 Hours",
      price: 0,
      location: "Yogyakarta",
    },
    {
      attractionID: "ATR006",
      name: "Mount Bromo",
      description: "Active volcano and sunrise viewing destination",
      address: "Bromo Tengger Semeru National Park, East Java",
      category: "Natural Park",
      userID: "USR006",
      createdDate: "2018-12-03T07:30:00Z",
      rating: 4.9,
      latitude: -7.9425,
      longitude: 112.953,
      openingHours: "00:00 - 24:00",
      price: 320000,
      location: "East Java",
    },
  ]

  const categories = [
    "Historical Site",
    "Museum",
    "Adventure Park",
    "Religious Site",
    "Cultural Center",
    "Natural Park",
  ]
  const locations = ["Central Java", "Jakarta", "West Java", "Bali", "Yogyakarta", "East Java"]

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  const applyFilters = () => {
    const filtered = mockAttractions.filter((attraction) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(attraction.category)
      const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(attraction.location)
      const ratingMatch = attraction.rating >= ratingRange[0] && attraction.rating <= ratingRange[1]
      const priceMatch = attraction.price >= priceRange[0] && attraction.price <= priceRange[1]

      return categoryMatch && locationMatch && ratingMatch && priceMatch
    })

    // Apply sorting
    if (sortBy === "rating-high") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "rating-low") {
      filtered.sort((a, b) => a.rating - b.rating)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    }

    setFilteredResults(filtered)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedLocations([])
    setRatingRange([0, 5])
    setPriceRange([0, 500000])
    setSortBy("")
    setFilteredResults([])
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedLocations.length +
    (ratingRange[0] > 0 || ratingRange[1] < 5 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Apply Filters</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Filter attraction data using multiple criteria and sorting options
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Download className="h-4 w-4" />
            Export Filtered
          </Button>
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          {/* Filter Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Active Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={applyFilters} className="w-full gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
              </Button>
              <Button variant="outline" onClick={clearAllFilters} className="w-full gap-2">
                <X className="h-4 w-4" />
                Clear All
              </Button>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={category} className="text-xs sm:text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Location Filter */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => handleLocationToggle(location)}
                  />
                  <Label htmlFor={location} className="text-xs sm:text-sm">
                    {location}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

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
                <span>{priceRange[0] === 0 ? "Free" : `Rp ${(priceRange[0] / 1000).toFixed(0)}K`}</span>
                <span>Rp {(priceRange[1] / 1000).toFixed(0)}K</span>
              </div>
            </CardContent>
          </Card>

          {/* Sort Options */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Sort By</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-high">Rating (High to Low)</SelectItem>
                  <SelectItem value="rating-low">Rating (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="name">Name (A to Z)</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Active Filter Tags */}
          {(selectedCategories.length > 0 || selectedLocations.length > 0) && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Active Filter Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="gap-1 text-xs">
                      {category}
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {selectedLocations.map((location) => (
                    <Badge key={location} variant="outline" className="gap-1 text-xs">
                      {location}
                      <button
                        onClick={() => handleLocationToggle(location)}
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

          {/* Filtered Results */}
          {filteredResults.length > 0 ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Filtered Results</CardTitle>
                <CardDescription>
                  Showing {filteredResults.length} of {mockAttractions.length} attractions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredResults.map((attraction) => (
                    <div
                      key={attraction.attractionID}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-sm sm:text-base">{attraction.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {attraction.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {attraction.location}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{attraction.description}</p>
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
                              <span>{attraction.price === 0 ? "Free" : `Rp ${attraction.price.toLocaleString()}`}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span>{new Date(attraction.createdDate).toLocaleDateString()}</span>
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
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Results</h3>
                <p className="text-muted-foreground mb-4">
                  {activeFiltersCount > 0
                    ? "No attractions match your current filters. Try adjusting your criteria."
                    : "Click 'Apply Filters' to see results based on your filter criteria."}
                </p>
                {activeFiltersCount > 0 && (
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Filter Statistics */}
          {filteredResults.length > 0 && (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredResults.length}</div>
                  <p className="text-xs text-muted-foreground">Attractions found</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(filteredResults.reduce((sum, a) => sum + a.rating, 0) / filteredResults.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">Average rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rp{" "}
                    {Math.round(filteredResults.reduce((sum, a) => sum + a.price, 0) / filteredResults.length / 1000)}K
                  </div>
                  <p className="text-xs text-muted-foreground">Average price</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{new Set(filteredResults.map((a) => a.category)).size}</div>
                  <p className="text-xs text-muted-foreground">Unique types</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
