"use client" // Add this at the very top

import { useState } from 'react'

import Image from "next/image"
import Link from "next/link"
import { Calendar, Download, Heart, MessageCircle, Users, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RecentMemories } from "@/components/recent-memories"
import { MemoryForm } from "@/components/memory-form"

export default function HomePage() {
    const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-semibold text-gray-900">In Loving Memory</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
       <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/gallery" className="text-gray-700 hover:text-gray-900 transition-colors">Gallery</Link>
              <Link href="/memories" className="text-gray-700 hover:text-gray-900 transition-colors">Memories</Link>
              <Link href="/events" className="text-gray-700 hover:text-gray-900 transition-colors">Events</Link>            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-gray-900">Home</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-gray-900">About</Link>
                <Link href="/gallery" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-gray-900">Gallery</Link>
                <Link href="/memories" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-gray-900">Memories</Link>
                <Link href="/events" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-gray-900">Events</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/IMG-20250807-WA0038.jpg"
              alt="Memorial Portrait"
              width={500}
              height={500}
              className="rounded-full mx-auto mb-6 shadow-lg border-4 border-white object-cover"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mrs Nancy Nenne Nadah
            </h1>
            <p className="text-xl text-gray-600 mb-2">1943 - 2025</p>
            <p className="text-lg text-gray-500 italic">
              "A life well lived leaves beautiful memories behind"
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Beloved Mother
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Devoted Wife
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Cherished Grandmother
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
              <Link href="/memories">
                <MessageCircle className="mr-2 h-4 w-4" />
                Share a Memory
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/gallery">
                <Download className="mr-2 h-4 w-4" />
                View Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Service of Songs</p>
                <p className="text-sm text-gray-500 mb-4">August 15, 2025 at 3:00 PM</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/events">View All Events</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Survived By</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Wife, 3 Children, 7 Grandchildren</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Memories Shared</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">127 loving memories</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/memories">Read All</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Memories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Memories</h2>
            <p className="text-gray-600">Loving words from family and friends</p>
          </div>
          <RecentMemories />
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/memories">View All Memories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Share Memory Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Memory</h2>
            <p className="text-gray-600">Help us celebrate Nancy's life by sharing your favorite memory</p>
          </div>
          <MemoryForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-5 w-5 text-rose-500 mr-2" />
            <span className="text-lg font-semibold">Forever in Our Hearts</span>
          </div>
          <p className="text-gray-400 text-sm">
            This memorial website was created with love to honor and remember Mrs Nancy Nenne Nadah
          </p>
        </div>
      </footer>
    </div>
  )
}
