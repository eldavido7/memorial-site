import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Heart, MapPin, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedTimeline } from "@/components/animated-timeline"

export default function AboutPage() {
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
              <span className="text-xl font-semibold text-gray-900">About Nancy</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
           <Image
                        src="/IMG-20250807-WA0035.jpg"
                        alt="Memorial Portrait"
                        width={300}
                        height={300}
                        className="rounded-full mx-auto mb-6 shadow-lg border-4 border-white object-cover"
                      />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mrs Nancy Nenne Nadah</h1>
          <p className="text-xl text-gray-600">1943 - 2025</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Obituary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-rose-500" />
                  Obituary
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mrs Nancy Nenne Nadah, 82, of Yola, Adamawa State, passed away peacefully on [Date], 2025, surrounded by her loving family. Born in 1943, Nancy was a devoted wife, mother, grandmother, and pillar of her community who touched the lives of everyone she met.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nancy was known for her unwavering faith, generous spirit, and dedication to her family. She was a woman of strong character who instilled values of love, respect, and hard work in all who knew her. Her home was always open to family and friends, and her warm hospitality was legendary.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Throughout her life, Nancy was actively involved in her community and church, always ready to lend a helping hand to those in need. Her wisdom, kindness, and gentle nature made her a beloved figure in her community.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nancy's legacy lives on through her children, grandchildren, and the countless lives she touched with her love and compassion. She will be deeply missed but never forgotten.
                </p>
              </CardContent>
            </Card>

            {/* Life Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Life Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedTimeline />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Survived By */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-green-500" />
                  Survived By
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Immediate Family</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>Husband</li>
                    <li>Children</li>
                    <li>Grandchildren</li>
                    <li>Great-grandchildren</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Grandchildren</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>Alex & Jamie Johnson</li>
                    <li>Tyler & Madison Smith</li>
                    <li>Olivia, Ethan & Sophia Davis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Siblings</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>Robert Smith (Brother)</li>
                    <li>Linda Wilson (Sister)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Personal Details */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Springfield, USA</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Engineer</Badge>
                  <Badge variant="secondary">Gardener</Badge>
                  <Badge variant="secondary">Volunteer</Badge>
                  <Badge variant="secondary">Coach</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-rose-600 hover:bg-rose-700">
                  <Link href="/memories">Share a Memory</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/gallery">View Photo Gallery</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/events">Upcoming Events</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
