"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Users, Star, Clock, Shield, Rocket, Heart } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { icon: Users, value: "2,500+", label: "Active Workers", color: "text-blue-400" },
    { icon: Star, value: "4.9★", label: "Average Rating", color: "text-yellow-400" },
    { icon: Clock, value: "< 5min", label: "Response Time", color: "text-green-400" },
    { icon: Shield, value: "100%", label: "Verified", color: "text-purple-400" },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative px-4 lg:px-0 py-12 lg:py-8 text-center lg:text-left overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-2 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute top-8 right-4 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-8 left-6 w-24 h-24 lg:w-40 lg:h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div
        className={`max-w-md lg:max-w-none mx-auto lg:mx-0 relative z-10 transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
      >
        {/* Premium Badge */}
        <div className="mb-4 lg:mb-6 animate-bounce-in">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm font-medium animate-glow-pulse">
            <Rocket className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
            India's #1 Worker Platform
          </Badge>
        </div>

        {/* Logo/Brand */}
        <div className="mb-6 lg:mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl lg:rounded-3xl mb-4 lg:mb-6 animate-pulse-glow hover:animate-wiggle cursor-pointer">
            <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent leading-tight mb-2 lg:mb-3 neon-text">
            LabourLink
          </h1>
          <p className="text-sm lg:text-lg text-purple-300 font-medium">Powered by AI • Trusted by Millions</p>
        </div>

        <h2
          className={`text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-4 lg:mb-6 leading-tight transition-all duration-1000 delay-300 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
        >
          Find nearby plumbers, electricians, drivers in{" "}
          <span className="text-transparent bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text animate-pulse">
            minutes
          </span>
          .
        </h2>

        {/* Dynamic Stats - Desktop Only */}
        <div
          className={`mb-6 lg:mb-8 transition-all duration-1000 delay-500 ${isVisible ? "animate-slide-in-right" : "opacity-0"} hidden lg:block`}
        >
          <div className="glass-intense p-4 lg:p-6 rounded-xl lg:rounded-2xl hover-lift">
            <div className="flex items-center space-x-3 mb-2">
              {React.createElement(stats[currentStat].icon, {
                className: `w-6 h-6 lg:w-8 lg:h-8 ${stats[currentStat].color}`,
              })}
              <span className="text-2xl lg:text-3xl font-bold text-white">{stats[currentStat].value}</span>
            </div>
            <p className="text-slate-300 text-sm lg:text-base">{stats[currentStat].label}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`space-y-3 lg:space-y-4 transition-all duration-1000 delay-700 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
        >
          <Button className="w-full lg:w-auto bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 hover:from-lime-600 hover:via-green-600 hover:to-emerald-600 text-black font-bold px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-base lg:text-lg shadow-2xl btn-animate hover-lift btn-ripple">
            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            Find Workers Now
            <Zap className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
          </Button>

          <div className="flex space-x-3 lg:space-x-4">
            <Button
              variant="outline"
              className="flex-1 lg:flex-none bg-transparent border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 font-semibold py-2 lg:py-3 px-4 lg:px-6 rounded-lg lg:rounded-xl btn-animate text-sm lg:text-base"
            >
              <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
              Join as Worker
            </Button>
            <Button
              variant="outline"
              className="flex-1 lg:flex-none bg-transparent border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 font-semibold py-2 lg:py-3 px-4 lg:px-6 rounded-lg lg:rounded-xl btn-animate text-sm lg:text-base"
            >
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Trust indicators - Mobile Only */}
        <div
          className={`mt-6 lg:mt-8 transition-all duration-1000 delay-900 ${isVisible ? "animate-slide-up" : "opacity-0"} lg:hidden`}
        >
          <p className="text-slate-400 text-xs mb-3">Trusted by leading companies</p>
          <div className="flex justify-center space-x-3 opacity-60">
            {["Zomato", "Swiggy", "Ola", "Uber"].map((company, index) => (
              <div
                key={company}
                className="px-2 py-1 bg-slate-800/50 rounded-lg text-xs text-slate-300 animate-slide-up"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
