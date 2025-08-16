"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MemoryForm } from "@/components/memory-form"
import { Pagination } from "@/components/pagination"
import { useMemoryStore } from "../../lib/store" // Adjust path as needed

const relationships = ["All", "Family", "Friend", "Colleague", "Neighbor", "Community"]

export default function MemoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRelationship, setSelectedRelationship] = useState("All")
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    memories,
    pagination,
    loading,
    error,
    fetchMemories,
    fetchedPages
  } = useMemoryStore()

  // Initial fetch - ensures we have a full page of memories and prevents infinite loops.
  useEffect(() => {
    console.log('useEffect triggered:', {
      memoriesLength: memories.length,
      hasNext: pagination.hasNext,
      loading,
      fetchedPage1: fetchedPages.has(1)
    });

    // Fetch under two conditions:
    // 1. There are no memories at all AND we haven't fetched page 1 yet.
    // 2. There's a small number of memories (from homepage) AND the store indicates there are more pages available.
    if ((memories.length > 0 && memories.length <= 3 && pagination.hasNext) || (memories.length === 0 && !fetchedPages.has(1))) {
      if (!loading) {
        console.log('About to fetch memories');
        // Force fetch to overwrite the partial data from the homepage.
        fetchMemories(1, 10, true)
      }
    }
  }, [memories.length, pagination.hasNext, loading, fetchMemories, fetchedPages])

  // Fetch new pages when currentPage changes
  useEffect(() => {
    if (currentPage > 1 && !fetchedPages.has(currentPage) && !loading) {
      fetchMemories(currentPage, 10)
    }
  }, [currentPage, fetchedPages, loading, fetchMemories])

  // Filter memories based on search and relationship
  const filteredMemories = useMemo(() => {
    return memories.filter((memory) => {
      const matchesSearch =
        memory.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRelationship =
        selectedRelationship === "All" ||
        memory.relationship.toLowerCase().includes(selectedRelationship.toLowerCase())
      return matchesSearch && matchesRelationship
    })
  }, [memories, searchTerm, selectedRelationship])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedRelationship])

  // Calculate filtered pagination for client-side filtering
  const filteredPagination = useMemo(() => {
    const itemsPerPage = 10
    const totalFiltered = filteredMemories.length
    const totalPages = Math.ceil(totalFiltered / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageMemories = filteredMemories.slice(startIndex, endIndex)

    return {
      memories: currentPageMemories,
      totalPages,
      total: totalFiltered,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    }
  }, [filteredMemories, currentPage])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`
    return `${Math.floor(diffInHours / 168)} weeks ago`
  }

  // Calculate statistics
  const memoryStats = useMemo(() => {
    const familyCount = memories.filter(
      (m) =>
        m.relationship.toLowerCase().includes("family") ||
        m.relationship.toLowerCase().includes("daughter") ||
        m.relationship.toLowerCase().includes("brother") ||
        m.relationship.toLowerCase().includes("sister") ||
        m.relationship.toLowerCase().includes("son")
    ).length

    const friendsCount = memories.filter((m) =>
      m.relationship.toLowerCase().includes("friend")
    ).length

    const colleaguesCount = memories.filter((m) =>
      m.relationship.toLowerCase().includes("colleague")
    ).length

    return { familyCount, friendsCount, colleaguesCount }
  }, [memories])

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
            <Button onClick={() => setShowForm(!showForm)} className="bg-rose-600 hover:bg-rose-700">
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
            {loading && memories.length === 0 ? (
              "Loading memories..."
            ) : (
              <>
                {filteredPagination.total} loving memories shared by family and friends
                {filteredPagination.totalPages > 1 && (
                  <span className="text-sm text-gray-500 block mt-1">
                    Page {currentPage} of {filteredPagination.totalPages}
                    {searchTerm || selectedRelationship !== "All" ? " (filtered)" : ""}
                  </span>
                )}
              </>
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
            {/* Skeleton loading for initial load */}
            {loading && memories.length === 0 && (
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">Error: {error}</p>
                <Button onClick={() => fetchMemories(1, 10, true)} className="mt-4">
                  Try Again
                </Button>
              </div>
            )}

            {!loading && !error && memories.length > 0 && (
              <div className="space-y-6">
                {filteredPagination.memories.map((memory) => (
                  <Card key={memory.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{memory.name}</h4>
                              <p className="text-sm text-gray-500">{memory.relationship}</p>
                            </div>
                            <span className="text-xs text-gray-400">{formatDate(memory.createdAt)}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{memory.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && !error && memories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No memories have been shared yet.</p>
                <p className="text-gray-400 text-sm mt-2">Be the first to share a memory of Nancy.</p>
              </div>
            )}

            {!loading && !error && filteredPagination.memories.length === 0 && memories.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No memories found matching your criteria.</p>
              </div>
            )}

            {!loading && !error && filteredPagination.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={filteredPagination.totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {/* Loading indicator for additional pages */}
            {loading && memories.length > 0 && (
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <Card key={`loading-${i}`} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
            {memories.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Memory Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Memories</span>
                      <span className="font-semibold">{pagination.total || memories.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Family Members</span>
                      <span className="font-semibold">{memoryStats.familyCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Friends</span>
                      <span className="font-semibold">{memoryStats.friendsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Colleagues</span>
                      <span className="font-semibold">{memoryStats.colleaguesCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guidelines */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sharing Guidelines</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Share your favorite memories of Nancy</p>
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