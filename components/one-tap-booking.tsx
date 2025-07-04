"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, MapPin, Star, Shield, Phone, MessageCircle, X } from "lucide-react"

interface OneTapBookingProps {
  worker: any
  onBook: (worker: any) => void
  onCancel: () => void
}

export function OneTapBooking({ worker, onBook, onCancel }: OneTapBookingProps) {
  const [isBooking, setIsBooking] = useState(false)

  const handleQuickBook = async () => {
    setIsBooking(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onBook(worker)
    setIsBooking(false)
  }

  return (
    <Card className="premium-glass-intense border-slate-600/50 shadow-2xl animate-slide-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3 animate-pulse-glow">
              {worker.avatar}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{worker.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 text-sm">
                  {worker.skill}
                </Badge>
                {worker.verified && (
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-sm">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button onClick={onCancel} variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-slate-800/30 rounded-xl">
            <MapPin className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-white font-semibold text-sm">{worker.distance} km</div>
            <div className="text-slate-400 text-xs">Distance</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-xl">
            <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
            <div className="text-white font-semibold text-sm">{worker.rating} ★</div>
            <div className="text-slate-400 text-xs">Rating</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-xl">
            <Clock className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <div className="text-white font-semibold text-sm">{worker.responseTime}</div>
            <div className="text-slate-400 text-xs">Response</div>
          </div>
        </div>

        {/* Price */}
        <div className="text-center mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            ₹{worker.price}
          </div>
          <div className="text-slate-400 text-sm">per visit • No hidden charges</div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleQuickBook}
            disabled={isBooking || !worker.isOnline}
            className={`w-full ${
              worker.isOnline
                ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black shadow-lg"
                : "bg-slate-600 text-slate-400 cursor-not-allowed"
            } font-bold py-4 rounded-xl btn-animate transition-all duration-300`}
          >
            {isBooking ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Booking...
              </>
            ) : worker.isOnline ? (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Book Now - Arrives in {worker.responseTime}
              </>
            ) : (
              "Currently Offline"
            )}
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-blue-500/50 text-blue-300 hover:bg-blue-500/10 py-3 rounded-xl"
              disabled={!worker.isOnline}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-purple-500/50 text-purple-300 hover:bg-purple-500/10 py-3 rounded-xl"
              disabled={!worker.isOnline}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1 text-green-400" />
              Background Verified
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-400" />
              {worker.completedJobs}+ Jobs Done
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
