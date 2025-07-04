"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Shield, Zap } from "lucide-react"
import { BookingModal } from "./booking-modal"
import { SuccessModal } from "./success-modal"

interface WorkerListProps {
  filters: any
  searchQuery: string
}

export function WorkerList({ filters, searchQuery }: WorkerListProps) {
  const [selectedWorker, setSelectedWorker] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const workers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      skill: "Plumber",
      distance: 1.2,
      price: 300,
      rating: 4.8,
      isOnline: true,
      completedJobs: 150,
      avatar: "RK",
      responseTime: "5 min",
      verified: true,
    },
    {
      id: 2,
      name: "Amit Singh",
      skill: "Electrician",
      distance: 2.1,
      price: 450,
      rating: 4.9,
      isOnline: true,
      completedJobs: 200,
      avatar: "AS",
      responseTime: "3 min",
      verified: true,
    },
    {
      id: 3,
      name: "Suresh Yadav",
      skill: "Driver",
      distance: 0.8,
      price: 200,
      rating: 4.7,
      isOnline: false,
      completedJobs: 89,
      avatar: "SY",
      responseTime: "15 min",
      verified: false,
    },
    {
      id: 4,
      name: "Priya Sharma",
      skill: "House Cleaner",
      distance: 1.5,
      price: 250,
      rating: 4.9,
      isOnline: true,
      completedJobs: 120,
      avatar: "PS",
      responseTime: "8 min",
      verified: true,
    },
  ]

  const handleBookNow = (worker: any) => {
    setSelectedWorker(worker)
    setShowBookingModal(true)
  }

  const handleBookingSuccess = () => {
    setShowSuccessModal(true)
  }

  return (
    <>
      <div className={`space-y-6 transition-all duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-4 h-4 text-white" />
            </div>
            Available Workers
          </h2>
          <Badge variant="secondary" className="bg-green-500/20 text-green-300 px-3 py-1">
            {workers.filter((w) => w.isOnline).length} Online
          </Badge>
        </div>

        {workers.map((worker, index) => (
          <Card
            key={worker.id}
            className={`glass-card border-slate-700/50 shadow-2xl hover-lift transition-all duration-500 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Avatar with status */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {worker.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center ${worker.isOnline ? "bg-green-500 animate-pulse-glow" : "bg-red-500"}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${worker.isOnline ? "bg-white" : "bg-white"}`} />
                  </div>
                  {worker.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Worker Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{worker.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30"
                        >
                          {worker.skill}
                        </Badge>
                        {worker.verified && (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-full ${worker.isOnline ? "text-green-300 bg-green-500/20" : "text-red-300 bg-red-500/20"}`}
                    >
                      {worker.isOnline ? "Online" : "Offline"}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1 text-blue-400" />
                      <span className="text-white font-medium">{worker.distance} km</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      <span className="text-white font-medium">{worker.rating}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="w-4 h-4 mr-1 text-green-400" />
                      <span className="text-white font-medium">{worker.responseTime}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        ₹{worker.price}
                        <span className="text-sm text-slate-400 font-normal">/visit</span>
                      </div>
                      <div className="text-slate-400 text-sm">{worker.completedJobs} jobs completed</div>
                    </div>

                    <Button
                      onClick={() => handleBookNow(worker)}
                      className={`${
                        worker.isOnline
                          ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black shadow-lg hover:shadow-xl"
                          : "bg-slate-600 text-slate-400 cursor-not-allowed"
                      } font-bold px-6 py-3 rounded-xl btn-animate transition-all duration-300`}
                      disabled={!worker.isOnline}
                    >
                      {worker.isOnline ? "Book Now" : "Offline"}
                      {worker.isOnline && <Zap className="w-4 h-4 ml-2" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedWorker && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          worker={selectedWorker}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </>
  )
}
