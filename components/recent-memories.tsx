"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useMemoryStore } from "../lib/store" // Adjust path as needed

export function RecentMemories() {
  const {
    memories,
    loading,
    error,
    fetchMemories,
    getRecentMemories
  } = useMemoryStore()

  useEffect(() => {
    // Only fetch if we don't have any memories yet
    if (memories.length === 0 && !loading) {
      fetchMemories(1, 3) // Fetch first page with limit of 3 for recent memories
    }
  }, [memories.length, loading, fetchMemories])

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

  // Get the most recent 3 memories
  const recentMemories = getRecentMemories(3)

  if (loading && memories.length === 0) {
    return (
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
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
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load recent memories</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
      </div>
    )
  }

  if (recentMemories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No memories have been shared yet</p>
        <p className="text-sm text-gray-400 mt-1">Be the first to share a memory of Nancy</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
      {recentMemories.map((memory) => (
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
  )
}