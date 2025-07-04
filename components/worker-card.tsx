"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Shield, Zap, Phone, MessageCircle, Heart } from "lucide-react"

interface WorkerCardProps {
  worker: {
    id: number
    name: string
    skill: string
    distance: number
    price: number
    rating: number
    isOnline: boolean
    completedJobs: number
    avatar: string
    responseTime: string
    verified: boolean
    specialties?: string[]
    languages?: string[]
    experience?: number
  }
  onBook: (worker: any) => void
  index: number
}

export function WorkerCard({ worker, onBook, index }: WorkerCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card
      className={`glass-card border-slate-700/50 shadow-2xl hover-lift transition-all duration-500 animate-slide-in-right`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-5">
        {/* Top Section - Avatar, Name, Heart */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            {/* Avatar with Status */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {worker.avatar}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center ${worker.isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              {worker.verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Name and Skill */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-xl mb-2">{worker.name}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 text-sm">
                  {worker.skill}
                </Badge>
                {worker.verified && (
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-sm">✓ Verified</Badge>
                )}
                {worker.experience && worker.experience > 5 && (
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-sm">Expert</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Heart Button */}
          <Button
            onClick={() => setIsFavorite(!isFavorite)}
            variant="ghost"
            size="sm"
            className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${isFavorite ? "text-red-400" : "text-slate-400 hover:text-red-400"}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center bg-slate-800/30 rounded-lg p-3">
            <MapPin className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-white font-medium text-sm">{worker.distance} km</div>
              <div className="text-slate-400 text-xs">Distance</div>
            </div>
          </div>
          <div className="flex items-center bg-slate-800/30 rounded-lg p-3">
            <Star className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0" />
            <div>
              <div className="text-white font-medium text-sm">{worker.rating} ★</div>
              <div className="text-slate-400 text-xs">{worker.completedJobs} jobs</div>
            </div>
          </div>
          <div className="flex items-center bg-slate-800/30 rounded-lg p-3">
            <Clock className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
            <div>
              <div className="text-white font-medium text-sm">{worker.responseTime}</div>
              <div className="text-slate-400 text-xs">Response</div>
            </div>
          </div>
          <div className="flex items-center bg-slate-800/30 rounded-lg p-3">
            <Zap className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
            <div>
              <div className={`font-medium text-sm ${worker.isOnline ? "text-green-400" : "text-red-400"}`}>
                {worker.isOnline ? "Available" : "Busy"}
              </div>
              <div className="text-slate-400 text-xs">Status</div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        {worker.specialties && (
          <div className="mb-4">
            <p className="text-slate-400 text-sm mb-2">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {worker.specialties.slice(0, 3).map((specialty, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-slate-800/50 text-slate-300 border-slate-600 text-xs px-2 py-1"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              ₹{worker.price}
            </div>
            <div className="text-slate-400 text-sm">per visit</div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-blue-500/50 text-blue-300 hover:bg-blue-500/10 p-2 rounded-lg"
              disabled={!worker.isOnline}
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-purple-500/50 text-purple-300 hover:bg-purple-500/10 p-2 rounded-lg"
              disabled={!worker.isOnline}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onBook(worker)}
              className={`${
                worker.isOnline
                  ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black shadow-lg"
                  : "bg-slate-600 text-slate-400 cursor-not-allowed"
              } font-bold px-6 py-2 rounded-lg btn-animate transition-all duration-300`}
              disabled={!worker.isOnline}
            >
              {worker.isOnline ? (
                <>
                  Book Now
                  <Zap className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Offline"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
