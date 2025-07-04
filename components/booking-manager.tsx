"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Phone, X, CheckCircle, AlertCircle } from "lucide-react"

interface Booking {
  id: string
  worker: any
  date: string
  time: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  address: string
  price: number
}

interface BookingManagerProps {
  bookings: Booking[]
  onCancelBooking: (bookingId: string) => void
}

export function BookingManager({ bookings, onCancelBooking }: BookingManagerProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const handleCancel = async (bookingId: string) => {
    setCancellingId(bookingId)

    // Simulate cancellation process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onCancelBooking(bookingId)
    setCancellingId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-3 h-3" />
      case "pending":
        return <Clock className="w-3 h-3" />
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      case "cancelled":
        return <X className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  return (
    <Card className="premium-glass-intense border-slate-600/50 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          My Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No bookings yet</p>
            <p className="text-slate-500 text-sm">Your bookings will appear here</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="premium-glass border-slate-700/50 hover-lift">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                      {booking.worker.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{booking.worker.name}</h4>
                      <p className="text-slate-300 text-sm">{booking.worker.skill}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-slate-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {booking.date} at {booking.time}
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {booking.address}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-semibold">₹{booking.price}</span>
                    <span className="text-slate-400 text-sm">Booking ID: #{booking.id}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>

                  {booking.status === "confirmed" && (
                    <Button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent border-red-500/50 text-red-300 hover:bg-red-500/10"
                    >
                      {cancellingId === booking.id ? (
                        <>
                          <div className="w-3 h-3 border border-red-300 border-t-transparent rounded-full animate-spin mr-2" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  )
}
