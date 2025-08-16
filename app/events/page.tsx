import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ExternalLink, MapPin, Users, Video } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Service of Songs: Nana's Celebration of Life",
    date: "Friday, August 15, 2025",
    time: "3:00 PM Prompt",
    location: "K64 Karewa GRA, Jimeta, Yola",
    description: "A celebration of Nancy's life with songs, prayers, and shared memories. Join us as we honor her legacy and the joy she brought to our lives.",
    type: "Memorial",
    livestream: null,
    status: "ended"
  },
  // {
  //   id: 2,
  //   title: "Wake Keeping",
  //   date: "Friday, August 15, 2025",
  //   time: "7:00 PM - 8:00 PM",
  //   location: "K64 Karewa GRA, Jimeta, Yola",
  //   description: "Family and friends are invited to keep vigil and share memories of our beloved Nancy.",
  //   type: "Visitation",
  //   livestream: null,
  //   status: "ended"
  // },
  {
    id: 2,
    title: "Burial Service and Interment",
    date: "Saturday, August 16, 2025",
    time: "10:00 AM",
    location: "Cemetery, Yola",
    description: "Final burial service and interment. Family and close friends are invited to pay their final respects.",
    type: "Burial",
    livestream: "https://www.facebook.com/share/1B5fEcrTff/",
    status: "ended"
  }
]

const eventTypeColors = {
  Memorial: "bg-blue-100 text-blue-800",
  Visitation: "bg-green-100 text-green-800",
  Burial: "bg-purple-100 text-purple-800"
}

export default function EventsPage() {
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
              <Calendar className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-semibold text-gray-900">Events & Services</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Memorial Events & Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us in celebrating Nancy's life and honoring his memory. All are welcome to attend and share in remembering a wonderful man.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                    <Badge className={eventTypeColors[event.type as keyof typeof eventTypeColors]}>
                      {event.type}
                    </Badge>
                  </div>
                  <Badge
                    variant={
                      event.status === "upcoming"
                        ? "default"
                        : event.status === "ended"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {event.status === "upcoming"
                      ? "Upcoming"
                      : event.status === "ended"
                        ? "Ended"
                        : "Planned"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{event.time}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{event.description}</p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    RSVP
                  </Button>
                  {event.livestream && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={event.livestream} target="_blank">
                        <Video className="mr-2 h-4 w-4" />
                        Live Stream
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5 text-blue-500" />
                Live Streaming Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For those unable to attend in person, select services will be live-streamed. Links will be available 30 minutes before each event.
              </p>
              {/* <ul className="text-sm text-gray-600 space-y-1">
                <li>• Memorial Service - December 15th</li>
                <li>• Memorial Garden Dedication - March 15th</li>
              </ul> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-500" />
                Event Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• All events are open to family and friends</li>
                <li>• Please arrive 15 minutes early</li>
                <li>• Parking is available on-site</li>
                <li>• Light refreshments will be provided</li>
                <li>• For questions, contact the family</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        {/* <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Need More Information?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For questions about any of the memorial events or services, please contact the family or funeral home.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Johnson Funeral Home:</strong> (555) 123-4567</p>
                <p><strong>Family Contact:</strong> Sarah Johnson - (555) 987-6543</p>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
