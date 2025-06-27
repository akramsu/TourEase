"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload } from "lucide-react"
import { Logo } from "@/components/ui/logo"

interface CompleteProfileProps {
  onComplete: () => void
}

export function CompleteProfile({ onComplete }: CompleteProfileProps) {
  const { user, updateUserProfile } = useAuth()
  const [formData, setFormData] = useState({
    phoneNumber: "",
    birthDate: "",
    postcode: "",
    gender: "",
    profilePicture: "/placeholder.svg?height=100&width=100",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData((prev) => ({ ...prev, profilePicture: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update user profile
    updateUserProfile({
      phoneNumber: formData.phoneNumber,
      birthDate: formData.birthDate,
      postcode: formData.postcode,
      gender: formData.gender,
      profilePicture: formData.profilePicture,
    })

    setIsSubmitting(false)
    onComplete()
  }

  const isFormValid = formData.phoneNumber && formData.birthDate && formData.postcode && formData.gender

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo size="lg" className="justify-center mb-4" />
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>Help us personalize your TourEase experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.profilePicture || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback>
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="profile-upload"
                  className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload your profile picture</p>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                required
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                required
              />
            </div>

            {/* Postcode */}
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                type="text"
                placeholder="12345"
                value={formData.postcode}
                onChange={(e) => handleInputChange("postcode", e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "Completing..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CompleteProfile