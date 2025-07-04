"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, UserCheck, Calendar, CheckCircle, Zap, ArrowRight, Play } from "lucide-react"

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      icon: Search,
      title: "Search",
      description: "Find workers near you",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: UserCheck,
      title: "Choose",
      description: "Select verified professionals",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Calendar,
      title: "Book",
      description: "Schedule instantly",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: CheckCircle,
      title: "Done",
      description: "Get service completed",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
  ]

  return (
    <div className={`transition-all duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
      <Card className="premium-glass-intense border-slate-600/50 shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl mb-4 animate-pulse-glow">
              <Play className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent mb-2">
              How It Works
            </h2>
            <p className="text-slate-300">Get any service in 4 simple steps</p>
          </div>

          {/* Steps - Mobile First Design */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index

              return (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-2xl transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-r from-slate-800/80 to-slate-700/60 border border-slate-600/50 shadow-xl scale-105"
                      : "bg-slate-800/30 hover:bg-slate-800/50"
                  }`}
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-500 ${
                      isActive ? step.bgColor : "bg-slate-700/50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? step.color : "text-slate-400"}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className={`font-bold mb-1 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isActive ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {isActive && <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-xs text-slate-400">{(((activeStep + 1) / 4) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <Button className="w-full bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 hover:from-lime-600 hover:via-green-600 hover:to-emerald-600 text-black font-bold py-4 rounded-2xl text-lg shadow-2xl btn-animate hover-lift">
            <Zap className="w-5 h-5 mr-2" />
            Start Booking Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Stats */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              ⚡ Average booking time: <span className="text-green-400 font-semibold">2 minutes</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
