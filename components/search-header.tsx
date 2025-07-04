"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, MessageCircle, User, Clock } from "lucide-react"

interface SearchHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onChatOpen: () => void
}

export function SearchHeader({ searchQuery, setSearchQuery, onChatOpen }: SearchHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LabourLink</h1>
              <p className="text-sm text-gray-500">Find workers in minutes</p>
            </div>
          </div>

          {/* Location & Profile */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Sector 15, Gurgaon</span>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for plumber, electrician, driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-green-500 focus:ring-0"
            />
          </div>
          <Button onClick={onChatOpen} className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-green-500" />
            <span>Delivery in 5-10 minutes</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>2,500+ workers available</span>
            <span>•</span>
            <span>4.9★ average rating</span>
          </div>
        </div>
      </div>
    </div>
  )
}
