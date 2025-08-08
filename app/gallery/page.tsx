"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Heart, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const photos = [
  {
    id: 1,
    src: "/IMG-20250807-WA0016.jpg",
    alt: "Family Portrait 2023",
    category: "Family",
    year: "2023",
    description: "Annual family portrait at the park"
  },
  {
    id: 2,
    src: "/IMG-20250807-WA0017.jpg",
    alt: "Wedding Day 1989",
    category: "Wedding",
    year: "1989",
    description: "Nancy's wedding day"
  },
  {
    id: 3,
    src: "/IMG-20250807-WA0018.jpg", 
    alt: "College Graduation",
    category: "Milestones",
    year: "1987",
    description: "Graduation from State University"
  },
  {
    id: 4,
    src: "/IMG-20250807-WA0019.jpg",
    alt: "In the Garden",
    category: "Hobbies",
    year: "2022",
    description: "Nancy in her beloved garden"
  },
  {
    id: 5,
    src: "/IMG-20250807-WA0020.jpg",
    alt: "Coaching Baseball",
    category: "Community",
    year: "2015",
    description: "Coaching the youth baseball team"
  },
  {
    id: 6,
    src: "/IMG-20250807-WA0021.jpg",
    alt: "With Grandchildren",
    category: "Family",
    year: "2023",
    description: "Playing with the grandkids"
  },
  {
    id: 7,
    src: "/IMG-20250807-WA0022.jpg",
    alt: "Retirement Party",
    category: "Work",
    year: "2022",
    description: "Retirement celebration at Johnson Manufacturing"
  },
  {
    id: 8,
    src: "/IMG-20250807-WA0023.jpg",
    alt: "Family Vacation",
    category: "Travel",
    year: "2021",
    description: "Family vacation at the beach"
  },
  {
    id: 9,
    src: "/IMG-20250807-WA0024.jpg",
    alt: "60th Birthday",
    category: "Celebrations",
    year: "2024",
    description: "Celebrating Nancy's 60th birthday"
  }
]

const categories = ["All", "Family", "Wedding", "Milestones", "Hobbies", "Community", "Work", "Travel", "Celebrations"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = selectedCategory === "All" || photo.category === selectedCategory
    const matchesSearch = photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.alt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDownload = (photo: typeof photos[0]) => {
    // In a real app, this would trigger an actual download
    const link = document.createElement('a')
    link.href = photo.src
    link.download = `${photo.alt.replace(/\s+/g, '_')}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAll = () => {
    // In a real app, this would create a zip file of all photos
    alert("All photos would be downloaded as a zip file in a real implementation")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-semibold text-gray-900">Nancy's Photo Gallery</span>
            </div>
            <Button onClick={downloadAll} className="bg-rose-600 hover:bg-rose-700">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nancy's Photo Gallery</h1>
          <p className="text-gray-600 mb-6">A collection of cherished memories and moments</p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
  <CardContent className="p-0">
    <div className="relative">
      <Image
        src={photo.src || "/placeholder.svg"}
        alt={photo.alt}
        width={400}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
        <Button
          onClick={() => handleDownload(photo)}
          className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{photo.alt}</h3>
                  <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {photo.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{photo.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No photos found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
