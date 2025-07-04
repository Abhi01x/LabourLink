"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Mic, MapPin, Clock, Zap, Filter, X } from "lucide-react"

interface SmartSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onVoiceSearch: () => void
}

export function SmartSearch({ searchQuery, setSearchQuery, onVoiceSearch }: SmartSearchProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches] = useState([
    "Plumber near me",
    "Electrician urgent",
    "House cleaning service",
    "Driver for airport",
  ])

  const quickFilters = [
    { label: "Urgent", icon: Zap, color: "bg-red-500/20 text-red-300 border-red-500/30" },
    { label: "Nearby", icon: MapPin, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { label: "Available Now", icon: Clock, color: "bg-green-500/20 text-green-300 border-green-500/30" },
    { label: "Top Rated", icon: "⭐", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  ]

  const smartSuggestions = [
    "Plumber for bathroom repair",
    "Electrician for fan installation",
    "Driver for wedding function",
    "Carpenter for furniture repair",
    "Painter for room painting",
    "Cleaner for deep cleaning",
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = smartSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 4))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  return (
    <Card
      className={`glass-intense border-slate-700/50 shadow-2xl hover-lift transition-all duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
    >
      <CardContent className="p-6 space-y-6">
        {/* Main Search */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-300" />
            <Input
              placeholder="What service do you need? (e.g., urgent plumber, electrician)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-16 py-4 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 rounded-2xl text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              onFocus={() => setShowSuggestions(searchQuery.length > 2)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <Button
              onClick={onVoiceSearch}
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl p-2 btn-animate"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          {/* Smart Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl border border-slate-600/50 shadow-2xl z-50 animate-slide-up">
              <div className="p-4">
                <p className="text-xs text-slate-400 mb-3 flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Smart Suggestions
                </p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion)
                      setShowSuggestions(false)
                    }}
                    className="w-full text-left p-3 hover:bg-slate-700/50 rounded-xl transition-colors duration-200 text-slate-300 hover:text-white"
                  >
                    <Search className="w-4 h-4 inline mr-2 text-slate-500" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-300 flex items-center">
              <Filter className="w-4 h-4 mr-2 text-blue-400" />
              Quick Filters
            </p>
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery("")}
                size="sm"
                variant="ghost"
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter, index) => (
              <Badge
                key={filter.label}
                className={`${filter.color} px-3 py-2 cursor-pointer hover:scale-105 transition-transform duration-200 animate-slide-in-right`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSearchQuery(filter.label.toLowerCase())}
              >
                {typeof filter.icon === "string" ? (
                  <span className="mr-1">{filter.icon}</span>
                ) : (
                  <filter.icon className="w-3 h-3 mr-1" />
                )}
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {!searchQuery && (
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-sm font-medium text-slate-300 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-green-400" />
              Recent Searches
            </p>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full text-left p-3 bg-slate-800/30 hover:bg-slate-700/50 rounded-xl transition-all duration-200 text-slate-400 hover:text-white group"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-2 text-slate-500 group-hover:text-blue-400" />
                      {search}
                    </span>
                    <Search className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
