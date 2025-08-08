"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart } from 'lucide-react'

export function MemoryForm() {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", relationship: "", message: "" })
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <Card className="text-center">
        <CardContent className="p-8">
          <Heart className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You</h3>
          <p className="text-gray-600">Your memory has been shared and will appear on the site shortly.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Share a Memory</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                placeholder="e.g., Friend, Family, Colleague"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Your Memory</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share a special memory, story, or message about John..."
              rows={4}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-rose-600 hover:bg-rose-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sharing Memory..." : "Share Memory"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
