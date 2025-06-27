"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { User, Mail, Phone, MapPin, Building, Calendar, Edit, Save, Camera } from "lucide-react"
import { useState } from "react"

export function AuthorityProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "Tourism Authority Admin",
    email: user?.email || "admin@tourism.gov",
    phone: "+62 21 1234 5678",
    department: "Tourism Development Department",
    position: "Senior Tourism Analyst",
    location: "Jakarta, Indonesia",
    joinDate: "January 2020",
    bio: "Experienced tourism professional dedicated to promoting sustainable tourism development and enhancing visitor experiences across Indonesia.",
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
          <p className="text-muted-foreground">Manage your account information and preferences</p>
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
                <p className="text-sm text-muted-foreground">{formData.position}</p>
                <Badge variant="secondary" className="mt-2">
                  Tourism Authority
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{formData.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{formData.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {formData.joinDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
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
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
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
              <Label htmlFor="bio">Bio</Label>
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

      {/* Account Settings */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Mail className="h-4 w-4" />
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Phone className="h-4 w-4" />
              SMS Notifications
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your dashboard experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dashboard Theme</span>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Export Format</span>
              <Badge variant="secondary">Excel</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Report Frequency</span>
              <Badge variant="secondary">Weekly</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
