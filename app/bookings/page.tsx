import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Phone } from "lucide-react"

export default function BookingsPage() {
  const bookings = [
    {
      id: 1,
      worker: "Rajesh Kumar",
      service: "Plumbing",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      price: 300,
      address: "123 Main St, Sector 15",
    },
    {
      id: 2,
      worker: "Amit Singh",
      service: "Electrical Work",
      date: "2024-01-16",
      time: "2:00 PM",
      status: "pending",
      price: 450,
      address: "456 Park Ave, Sector 22",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 pt-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">My Bookings</h1>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>{booking.worker}</span>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                    className={booking.status === "confirmed" ? "bg-green-500" : "bg-orange-500"}
                  >
                    {booking.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-slate-300">
                  <div className="font-medium text-blue-300">{booking.service}</div>
                  <div className="text-2xl font-bold text-green-400">₹{booking.price}</div>
                </div>

                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {booking.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {booking.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {booking.address}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
