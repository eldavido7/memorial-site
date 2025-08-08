import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentMemories = [
  {
    id: 1,
    name: "Sarah Johnson",
    relationship: "Daughter",
    message: "Mum always had the biggest smile and the warmest hugs. She taught me that kindness is the greatest gift you can give to others. I'll carry her love with me always.",
    date: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    relationship: "Longtime Friend",
    message: "Nancy was the kind of friend who would drop everything to help you. I remember when she drove 3 hours just to help me move. That's the kind of person she was - always putting others first.",
    date: "5 hours ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    relationship: "Neighbor",
    message: "Every morning, Nancy would wave from her garden and ask how my family was doing. Her genuine care for everyone around her made our neighborhood feel like home.",
    date: "1 day ago",
  }
]

export function RecentMemories() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
      {recentMemories.map((memory) => (
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
  )
}
