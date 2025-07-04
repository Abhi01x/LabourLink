"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { SmartSearch } from "@/components/smart-search"
import { MapView } from "@/components/map-view"
import { WorkerCard } from "@/components/worker-card"
import { ChatBot } from "@/components/chat-bot"
import { BookingModal } from "@/components/booking-modal"
import { SuccessModal } from "@/components/success-modal"
import { HowItWorks } from "@/components/how-it-works"
import { OneTapBooking } from "@/components/one-tap-booking"
import { BookingManager } from "@/components/booking-manager"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Calendar } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showChatBot, setShowChatBot] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showOneTapBooking, setShowOneTapBooking] = useState(false)
  const [showBookingManager, setShowBookingManager] = useState(false)
  const [bookings, setBookings] = useState<any[]>([])

  const workers = [
    {
      id: 1,
      name: "Pawan Pal",
      skill: "Plumber",
      distance: 1.2,
      price: 300,
      rating: 4.8,
      isOnline: true,
      completedJobs: 150,
      avatar: "PP",
      responseTime: "5 min",
      verified: true,
      specialties: ["Pipe Repair", "Bathroom Fitting", "Emergency Service"],
      languages: ["Hindi", "English"],
      experience: 8,
    },
    {
      id: 2,
      name: "Arpit Singh",
      skill: "Electrician",
      distance: 2.1,
      price: 450,
      rating: 4.9,
      isOnline: true,
      completedJobs: 200,
      avatar: "AS",
      responseTime: "3 min",
      verified: true,
      specialties: ["Wiring", "Fan Installation", "AC Repair"],
      languages: ["Hindi", "English", "Punjabi"],
      experience: 12,
    },
    {
      id: 3,
      name: "Vinay Singh",
      skill: "Driver",
      distance: 0.8,
      price: 200,
      rating: 4.7,
      isOnline: true,
      completedJobs: 89,
      avatar: "VS",
      responseTime: "8 min",
      verified: true,
      specialties: ["City Tours", "Airport Pickup", "Long Distance"],
      languages: ["Hindi", "English"],
      experience: 5,
    },
    {
      id: 4,
      name: "Aneesh Vishwakarma",
      skill: "Carpenter",
      distance: 1.5,
      price: 400,
      rating: 4.9,
      isOnline: true,
      completedJobs: 120,
      avatar: "AV",
      responseTime: "10 min",
      verified: true,
      specialties: ["Furniture Repair", "Wood Work", "Cabinet Making"],
      languages: ["Hindi", "English"],
      experience: 10,
    },
    {
      id: 5,
      name: "Ananya Singh",
      skill: "House Cleaner",
      distance: 2.3,
      price: 250,
      rating: 4.8,
      isOnline: true,
      completedJobs: 95,
      avatar: "AN",
      responseTime: "12 min",
      verified: true,
      specialties: ["Deep Cleaning", "Kitchen Cleaning", "Bathroom Cleaning"],
      languages: ["Hindi", "English"],
      experience: 6,
    },
    {
      id: 6,
      name: "Aastha Singh",
      skill: "Painter",
      distance: 1.8,
      price: 350,
      rating: 4.7,
      isOnline: true,
      completedJobs: 110,
      avatar: "AA",
      responseTime: "15 min",
      verified: true,
      specialties: ["Wall Painting", "Interior Design", "Texture Work"],
      languages: ["Hindi", "English"],
      experience: 7,
    },
    {
      id: 7,
      name: "Jigyasha Soni",
      skill: "House Cleaner",
      distance: 2.1,
      price: 280,
      rating: 4.9,
      isOnline: false,
      completedJobs: 85,
      avatar: "JS",
      responseTime: "20 min",
      verified: true,
      specialties: ["Deep Cleaning", "Utensil Washing", "Floor Cleaning"],
      languages: ["Hindi"],
      experience: 4,
    },
    {
      id: 8,
      name: "Nidhi Singh",
      skill: "Electrician",
      distance: 2.7,
      price: 420,
      rating: 4.8,
      isOnline: true,
      completedJobs: 165,
      avatar: "NS",
      responseTime: "7 min",
      verified: true,
      specialties: ["Home Wiring", "Switch Installation", "LED Setup"],
      languages: ["Hindi", "English"],
      experience: 9,
    },
  ]

  const handleVoiceSearch = () => {
    setShowChatBot(true)
  }

  const handleBookWorker = (worker: any) => {
    setSelectedWorker(worker)
    setShowBookingModal(true)
  }

  const handleOneTapBook = (worker: any) => {
    const newBooking = {
      id: `BK${Date.now()}`,
      worker,
      date: new Date().toLocaleDateString(),
      time: "Next Available Slot",
      status: "confirmed",
      address: "Your Current Location",
      price: worker.price,
    }
    setBookings((prev) => [...prev, newBooking])
    setShowOneTapBooking(false)
    setShowSuccessModal(true)
  }

  const handleQuickBook = (worker: any) => {
    setSelectedWorker(worker)
    setShowOneTapBooking(true)
  }

  const handleBookingSuccess = () => {
    setShowSuccessModal(true)
  }

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" } : booking)),
    )
  }

  return (
    <div className="min-h-screen premium-gradient relative">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-12 gap-6 min-h-screen">
            {/* Left Sidebar - Hero & Search */}
            <div className="col-span-4 space-y-6">
              <HeroSection />
              <SmartSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onVoiceSearch={handleVoiceSearch}
              />

              {/* Quick Actions */}
              <div className="premium-glass-intense p-4 rounded-2xl border-slate-600/50">
                <h3 className="text-white font-bold mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => setShowBookingManager(!showBookingManager)}
                    variant="outline"
                    className="w-full bg-transparent border-blue-500/50 text-blue-300 hover:bg-blue-500/10 justify-start"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    My Bookings ({bookings.length})
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content - Workers */}
            <div className="col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 animate-pulse-glow">
                    ⚡
                  </div>
                  Premium Workers
                </h2>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 px-3 py-2">
                  {workers.filter((w) => w.isOnline).length} Online
                </Badge>
              </div>

              {showBookingManager ? (
                <BookingManager bookings={bookings} onCancelBooking={handleCancelBooking} />
              ) : (
                <div className="space-y-4">
                  {workers.map((worker, index) => (
                    <div key={worker.id} className="relative">
                      <WorkerCard worker={worker} onBook={handleBookWorker} index={index} />
                      {worker.isOnline && (
                        <Button
                          onClick={() => handleQuickBook(worker)}
                          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-4 py-2 rounded-xl text-sm btn-animate"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Quick Book
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar - Map & How It Works */}
            <div className="col-span-3 space-y-6">
              <MapView />
              <HowItWorks />

              {/* Premium Stats */}
              <div className="premium-glass-intense p-6 rounded-2xl border-slate-600/50">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                    ⭐
                  </div>
                  Live Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Active Workers</span>
                    <span className="text-green-400 font-bold animate-pulse">2,500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Avg Response</span>
                    <span className="text-blue-400 font-bold">&lt; 5 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Success Rate</span>
                    <span className="text-purple-400 font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Today's Bookings</span>
                    <span className="text-yellow-400 font-bold animate-pulse">1,247</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <HeroSection />
        <div className="px-4 py-6 space-y-6">
          <SmartSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} onVoiceSearch={handleVoiceSearch} />
          <HowItWorks />
          <MapView />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 animate-pulse-glow">
                  ⚡
                </div>
                Premium Workers
              </h2>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 px-3 py-1">
                {workers.filter((w) => w.isOnline).length} Online
              </Badge>
            </div>

            <div className="space-y-4">
              {workers.map((worker, index) => (
                <div key={worker.id} className="relative">
                  <WorkerCard worker={worker} onBook={handleBookWorker} index={index} />
                  {worker.isOnline && (
                    <Button
                      onClick={() => handleQuickBook(worker)}
                      className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-3 py-2 rounded-lg text-xs btn-animate"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Quick
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChatBot isOpen={showChatBot} onToggle={() => setShowChatBot(!showChatBot)} />

      {selectedWorker && showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          worker={selectedWorker}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {selectedWorker && showOneTapBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <OneTapBooking
              worker={selectedWorker}
              onBook={handleOneTapBook}
              onCancel={() => setShowOneTapBooking(false)}
            />
          </div>
        </div>
      )}

      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  )
}
