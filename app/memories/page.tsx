"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MemoryForm } from "@/components/memory-form"
import { Pagination } from "@/components/pagination"

const memories = [
  {
    id: 1,
    name: "Sarah Johnson",
    relationship: "Daughter",
    message: "Dad always had the biggest smile and the warmest hugs. He taught me that kindness is the greatest gift you can give to others. I'll carry his love with me always.",
    date: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    relationship: "Longtime Friend",
    message: "John was the kind of friend who would drop everything to help you. I remember when he drove 3 hours just to help me move. That's the kind of person he was - always putting others first.",
    date: "5 hours ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    relationship: "Neighbor",
    message: "Every morning, John would wave from his garden and ask how my family was doing. His genuine care for everyone around him made our neighborhood feel like home.",
    date: "1 day ago",
  },
  {
    id: 4,
    name: "David Thompson",
    relationship: "Colleague",
    message: "Working with John for 20 years was a privilege. He mentored so many of us and always made time to help solve problems. His wisdom and patience made him a natural leader.",
    date: "2 days ago",
  },
  {
    id: 5,
    name: "Lisa Martinez",
    relationship: "Family Friend",
    message: "John and Mary welcomed our family with open arms when we moved to the neighborhood. Their kindness and generosity knew no bounds. John will be deeply missed.",
    date: "3 days ago",
  },
  {
    id: 6,
    name: "Robert Smith",
    relationship: "Brother",
    message: "My big brother was my hero growing up. He taught me how to ride a bike, throw a baseball, and most importantly, how to be a good man. I'll miss our Sunday phone calls.",
    date: "4 days ago",
  },
  {
    id: 7,
    name: "Jennifer Adams",
    relationship: "Former Student",
    message: "Mr. Smith coached my softball team in high school. He believed in us when we didn't believe in ourselves. His encouragement helped shape who I am today.",
    date: "5 days ago",
  },
  {
    id: 8,
    name: "Mark Wilson",
    relationship: "Volunteer Partner",
    message: "John and I worked together at the food bank for over 15 years. His dedication to helping others was inspiring. He made every volunteer shift feel meaningful.",
    date: "1 week ago",
  }
]

const relationships = ["All", "Family", "Friend", "Colleague", "Neighbor", "Community"]

export default function MemoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRelationship, setSelectedRelationship] = useState("All")
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const memoriesPerPage = 10

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRelationship = selectedRelationship === "All" || 
                               memory.relationship.toLowerCase().includes(selectedRelationship.toLowerCase())
    return matchesSearch && matchesRelationship
  })

  // Add pagination logic
  const totalPages = Math.ceil(filteredMemories.length / memoriesPerPage)
  const startIndex = (currentPage - 1) * memoriesPerPage
  const paginatedMemories = filteredMemories.slice(startIndex, startIndex + memoriesPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedRelationship])

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
              <MessageCircle className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-semibold text-gray-900">Memories</span>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-rose-600 hover:bg-rose-700"
            >
              <Heart className="mr-2 h-4 w-4" />
              Share Memory
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Memories & Condolences</h1>
          <p className="text-gray-600 mb-6">
            {filteredMemories.length} loving memories shared by family and friends
            {totalPages > 1 && (
              <span className="text-sm text-gray-500 block mt-1">
                Showing {startIndex + 1}-{Math.min(startIndex + memoriesPerPage, filteredMemories.length)} of {filteredMemories.length}
              </span>
            )}
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search memories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Relationship Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {relationships.map((relationship) => (
              <Badge
                key={relationship}
                variant={selectedRelationship === relationship ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedRelationship(relationship)}
              >
                {relationship}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Memories List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {paginatedMemories.map((memory) => (
                <Card key={memory.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* <Avatar className="h-12 w-12">
                        <AvatarImage src={memory.avatar || "/placeholder.svg"} alt={memory.name} />
                        <AvatarFallback>{memory.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar> */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{memory.name}</h4>
                            <p className="text-sm text-gray-500">{memory.relationship}</p>
                          </div>
                          <span className="text-xs text-gray-400">{memory.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{memory.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {paginatedMemories.length === 0 && filteredMemories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No memories found matching your criteria.</p>
              </div>
            )}

            {filteredMemories.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Memory Form */}
            {showForm && (
              <div>
                <MemoryForm />
              </div>
            )}

            {/* Memory Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Memory Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Memories</span>
                    <span className="font-semibold">{memories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Family Members</span>
                    <span className="font-semibold">
                      {memories.filter(m => m.relationship.toLowerCase().includes('family') || 
                                          m.relationship.toLowerCase().includes('daughter') ||
                                          m.relationship.toLowerCase().includes('brother')).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friends</span>
                    <span className="font-semibold">
                      {memories.filter(m => m.relationship.toLowerCase().includes('friend')).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Colleagues</span>
                    <span className="font-semibold">
                      {memories.filter(m => m.relationship.toLowerCase().includes('colleague')).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sharing Guidelines</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Share your favorite memories of John</p>
                  <p>• Keep messages respectful and appropriate</p>
                  <p>• All submissions are reviewed before posting</p>
                  <p>• Photos can be shared via email</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
