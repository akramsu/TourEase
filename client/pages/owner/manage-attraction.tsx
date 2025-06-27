"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Tag, Navigation, Edit3, ImageIcon, Building2 } from "lucide-react"

// Mock attraction data - in real app this would come from database
const mockAttraction = {
  id: 1,
  name: "Borobudur Temple",
  description:
    "Borobudur is a 9th-century Mahayana Buddhist temple in Magelang Regency, not far from the town of Muntilan, in Central Java, Indonesia. It is the world's largest Buddhist temple.",
  address: "Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah 56553",
  category: "Historical Site",
  latitude: -7.6079,
  longitude: 110.2038,
  openingHours: "06:00 - 17:00",
  price: 50000,
  images: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
}

const categories = [
  "Museum",
  "Park",
  "Historical Site",
  "Beach",
  "Mountain",
  "Temple",
  "Cultural Site",
  "Adventure Park",
  "Zoo",
  "Aquarium",
]

export function ManageAttraction() {
  const [attraction, setAttraction] = useState(mockAttraction)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(mockAttraction)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = () => {
    setEditForm(attraction)
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAttraction(editForm)
    setIsEditing(false)
    setIsLoading(false)
  }

  const handleCancel = () => {
    setEditForm(attraction)
    setIsEditing(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Attraction</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your attraction information</p>
        </div>
        <Button onClick={handleEdit} className="flex items-center gap-2">
          <Edit3 className="h-4 w-4" />
          Edit Attraction
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</Label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{attraction.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</Label>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{attraction.description}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</Label>
                <div className="mt-1">
                  <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <Tag className="h-3 w-3" />
                    {attraction.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</Label>
                <p className="text-gray-700 dark:text-gray-300">{attraction.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Latitude</Label>
                  <p className="text-gray-700 dark:text-gray-300 font-mono">{attraction.latitude}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Longitude</Label>
                  <p className="text-gray-700 dark:text-gray-300 font-mono">{attraction.longitude}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Gallery ({attraction.images.length} images)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {attraction.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${attraction.name} - Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    {index === 0 && <Badge className="absolute top-2 left-2 text-xs">Primary</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Operating Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Operating Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Opening Hours</Label>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{attraction.openingHours}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket Price</Label>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {formatPrice(attraction.price)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Coordinates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Coordinates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Latitude:</span>
                  <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{attraction.latitude}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Longitude:</span>
                  <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{attraction.longitude}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Attraction Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Attraction Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Enter attraction name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editForm.category}
                  onValueChange={(value) => setEditForm({ ...editForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Describe your attraction"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                placeholder="Enter full address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={editForm.latitude}
                  onChange={(e) => setEditForm({ ...editForm, latitude: Number.parseFloat(e.target.value) })}
                  placeholder="-7.6079"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={editForm.longitude}
                  onChange={(e) => setEditForm({ ...editForm, longitude: Number.parseFloat(e.target.value) })}
                  placeholder="110.2038"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hours">Opening Hours</Label>
                <Input
                  id="hours"
                  value={editForm.openingHours}
                  onChange={(e) => setEditForm({ ...editForm, openingHours: e.target.value })}
                  placeholder="09:00 - 17:00"
                />
              </div>
              <div>
                <Label htmlFor="price">Ticket Price (IDR)</Label>
                <Input
                  id="price"
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: Number.parseInt(e.target.value) })}
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
