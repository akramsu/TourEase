"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { User, Mail, Phone, MapPin, Building, Calendar, Edit, Save, Camera, Star } from "lucide-react"
import { useState } from "react"

export function OwnerProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "Attraction Owner",
    email: user?.email || "owner@attraction.com",
    phone: "+62 21 9876 5432",
    businessName: "Heritage Cultural Center",
    businessType: "Museum & Cultural Site",
    location: "Yogyakarta, Indonesia",
    joinDate: "March 2021",
    bio: "Passionate about preserving cultural heritage and providing exceptional visitor experiences. Managing multiple cultural attractions across Central Java.",
  })

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your business profile and account information</p>
        </div>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} className="gap-2">
          {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture and Basic Info */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={formData.name} />
                  <AvatarFallback className="text-lg">
                    {formData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold">{formData.name}</h3>
                <p className="text-sm text-muted-foreground">{formData.businessName}</p>
                <Badge variant="secondary" className="mt-2">
                  Business Owner
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{formData.businessType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{formData.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {formData.joinDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.8 Rating</span>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your business details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Owner Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Business Description</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Stats and Settings */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Performance</CardTitle>
            <CardDescription>Your attraction's key metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Visitors (This Month)</span>
              <Badge variant="secondary">2,847</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Rating</span>
              <Badge variant="secondary">4.8/5</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue (This Month)</span>
              <Badge variant="secondary">Rp 45.2M</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Growth Rate</span>
              <Badge variant="secondary" className="text-green-600">
                +12%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Mail className="h-4 w-4" />
              Notification Settings
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Phone className="h-4 w-4" />
              Business Verification
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
