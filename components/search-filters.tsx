"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, MapPin, IndianRupee } from "lucide-react"

interface SearchFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    skill: string
    distance: number
    priceRange: number[]
    availability: string
  }
  setFilters: (filters: any) => void
}

export function SearchFilters({ searchQuery, setSearchQuery, filters, setFilters }: SearchFiltersProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Card
      className={`glass-card border-slate-700/50 shadow-2xl hover-lift transition-all duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
    >
      <CardContent className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-300" />
          <Input
            placeholder="Search for workers... (e.g., plumber, electrician)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 rounded-xl text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Filters Header */}
        <div className="flex items-center space-x-3 text-slate-300">
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
            <Filter className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-semibold text-lg">Smart Filters</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Skill Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
              Service Type
            </label>
            <Select value={filters.skill} onValueChange={(value) => setFilters({ ...filters, skill: value })}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white rounded-xl py-3 hover:bg-slate-700/50 transition-all duration-300">
                <SelectValue placeholder="Select service needed" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                <SelectItem value="plumber" className="text-white hover:bg-slate-700 rounded-lg">
                  🔧 Plumber
                </SelectItem>
                <SelectItem value="electrician" className="text-white hover:bg-slate-700 rounded-lg">
                  ⚡ Electrician
                </SelectItem>
                <SelectItem value="driver" className="text-white hover:bg-slate-700 rounded-lg">
                  🚗 Driver
                </SelectItem>
                <SelectItem value="carpenter" className="text-white hover:bg-slate-700 rounded-lg">
                  🪚 Carpenter
                </SelectItem>
                <SelectItem value="painter" className="text-white hover:bg-slate-700 rounded-lg">
                  🎨 Painter
                </SelectItem>
                <SelectItem value="cleaner" className="text-white hover:bg-slate-700 rounded-lg">
                  🧹 House Cleaner
                </SelectItem>
                <SelectItem value="mechanic" className="text-white hover:bg-slate-700 rounded-lg">
                  🔩 Mechanic
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Distance Filter */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Distance Range
              </div>
              <div className="flex items-center text-green-400 font-semibold">
                <MapPin className="w-4 h-4 mr-1" />
                {filters.distance} km
              </div>
            </label>
            <div className="px-3">
              <Slider
                value={[filters.distance]}
                onValueChange={(value) => setFilters({ ...filters, distance: value[0] })}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>1 km</span>
                <span>10 km</span>
                <span>20 km</span>
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                Budget Range
              </div>
              <div className="flex items-center text-yellow-400 font-semibold">
                <IndianRupee className="w-4 h-4 mr-1" />
                {filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </div>
            </label>
            <div className="px-3">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>₹0</span>
                <span>₹1000</span>
                <span>₹2000</span>
              </div>
            </div>
          </div>

          {/* Availability Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
              Availability
            </label>
            <Select
              value={filters.availability}
              onValueChange={(value) => setFilters({ ...filters, availability: value })}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white rounded-xl py-3 hover:bg-slate-700/50 transition-all duration-300">
                <SelectValue placeholder="When do you need service?" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                <SelectItem value="all" className="text-white hover:bg-slate-700 rounded-lg">
                  🕐 All Workers
                </SelectItem>
                <SelectItem value="online" className="text-white hover:bg-slate-700 rounded-lg">
                  🟢 Online Now
                </SelectItem>
                <SelectItem value="today" className="text-white hover:bg-slate-700 rounded-lg">
                  📅 Available Today
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
