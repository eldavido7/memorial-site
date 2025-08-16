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
                  Mama Nancy Nenne Nadah, fondly remembered as "Mama Nenne" by
                  colleagues,
                  "Nana" by her grandchildren, and "Madam" by her extended
                  family, was a pioneering Nigerian educationist and librarian whose life's work
                  shaped generations of learners and leaders. She peacefully passed away in
                  her sleep on Saturday, July 26, 2025, at her home in Yola, Adamawa State.
                </p>
                <h1 className="text-gray-700 font-semibold mb-2">Early Life and Education</h1>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Born in 1943 into the Leha family of Tagombali, Demsa Local Government
                  Area, Adamawa State, Mama Nenne's early years were marked by an
                  unwavering passion for education. She attended primary school in Bile before
                  earning a Grade II Certificate in Education at Teachers College, Maiduguri,
                  Borno State in 1969. Her journey into the teaching profession began at Kano
                  Teachers' College, where she obtained her National Certificate in Education in
                  1972. She later advanced her academic pursuits with a Bachelor of Science
                  degree in Library Science from Ahmadu Bello University, Zaria, in 1976.
                </p>
                <h1 className="text-gray-700 font-semibold mb-2">Professional Career</h1>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Mama Nenne began her career as Head Teacher at Teachers College,
                  Numan in 1972, where she rose to the position of Vice-Principal and inspired
                  many who went on to become prominent professionals and leaders. In 1979,
                  she made history as the first Librarian of the then Gongola State House of
                  Assembly (1979-1983) and later advanced to the position of Director of Library
                  Services at the State Ministry of Education between 1984-1989.
                  Mama Nadah served as the founding Director of Professional Services at the
                  newly created State Library Board—her brainchild. In this capacity, she
                  developed a network of libraries across Adamawa State, leaving an enduring
                  legacy of knowledge accessibility to local communities and the state capital.
                  She was an active professional member of the Nigerian Library Association
                  and served as its Treasurer.
                  Mama Nadah attended several management development programs at home
                  and abroad with the Bureau of Public Service Reforms, UNESCO, Centre for
                  Management Development, and ASCON.
                  Her career later took her to the National Library of Nigeria, where she rose to
                  the position of Acting Director of the Bibliographic Control Department, a role
                  in which she contributed significantly to the nation's archival and bibliographic
                  infrastructure before retiring in 2006.

                </p>
                <h1 className="text-gray-700 font-semibold mb-2">Personal Life and Cultural Heritage
                </h1>

                <p className="text-gray-700 leading-relaxed">
                  A woman of remarkable intellect and cultural fluency, Mama Nenne
                  spoke English, Bali, Bachama, Babur, Bile, Hausa, and Fulfulde fluently.
                  Her professional and personal travels took her to the United Kingdom,
                  Hong Kong, Israel, Italy, the United States, Côte d'Ivoire, and many other
                  countries, broadening her worldview and enriching her cultural insights.
                  She was the beloved wife of the late Samson Nadah, a prince of the Bachama
                  Kingdom, respected businessman, and politician. She was blessed with five
                  children: Dr. Dennis Shatima, Mrs. Catherine Jatau, Mr. Mataboyo Nadah,
                  Mrs. Mildred Nadah-Pita, and Mr. Fauno B. Nadah, along with numerous other
                  children whose lives she touched through mentorship, education, and personal
                  guidance.
                </p>
                <h1 className="text-gray-700 font-semibold mb-2">Legacy</h1>
                <p className="text-gray-700 leading-relaxed">
                  Mama Nenne's legacy lives on in the countless students, colleagues, and
                  community members whose lives she impacted through her dedication,
                  wisdom, and compassion. Her life was a testament to service, education, and
                  the empowerment of others. Through her pioneering work in establishing
                  library systems across Adamawa State and her contributions to Nigeria's
                  national bibliographic infrastructure, she helped democratize access to
                  knowledge and information for generations of Nigerians.
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
