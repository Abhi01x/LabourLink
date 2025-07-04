"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Mic, Volume2, VolumeX, Lightbulb, Wrench, Zap } from "lucide-react"

declare global {
  interface Window {
    chatSpeechRecognition: any
    speechSynthesis: any
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface ChatBotProps {
  isOpen: boolean
  onToggle: () => void
}

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  category?: "booking" | "solution" | "general"
  workers?: any[]
}

// Premium Workers Data - Exact same as in main app
const PREMIUM_WORKERS = [
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
  },
]

export function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isVoiceInput, setIsVoiceInput] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [hasWelcomed, setHasWelcomed] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && !hasWelcomed) {
      setHasWelcomed(true)

      // Add welcome message
      const welcomeMessage: Message = {
        id: 1,
        text: 'Welcome to LabourLink Chat Support! 🙏\n\nI can help you:\n🔧 Book workers (plumber, electrician, maid, driver, carpenter, painter)\n💡 Get DIY solutions for small problems\n❓ Answer your questions\n\nTry saying: "Plumber chahiye urgent" or "Electrician needed"',
        isBot: true,
        timestamp: new Date(),
        category: "general",
      }

      setMessages([welcomeMessage])

      // Voice welcome
      if (voiceEnabled && window.speechSynthesis) {
        setTimeout(() => {
          speakText("Welcome to LabourLink Chat Support! How can I help you today?")
        }, 1000)
      }
    }
  }, [isOpen, hasWelcomed, voiceEnabled])

  const speakText = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return

    // Stop any ongoing speech
    window.speechSynthesis.cancel()

    setIsSpeaking(true)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "hi-IN"
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const findWorkersBySkill = (skill: string) => {
    return PREMIUM_WORKERS.filter((worker) => worker.skill.toLowerCase().includes(skill.toLowerCase()))
  }

  const getBotResponse = (
    userMessage: string,
  ): { text: string; category: "booking" | "solution" | "general"; workers?: any[] } => {
    const message = userMessage.toLowerCase()

    // PLUMBER REQUESTS
    if (
      message.includes("plumber") ||
      message.includes("pipe") ||
      message.includes("leak") ||
      message.includes("नल") ||
      message.includes("पाइप")
    ) {
      const plumbers = findWorkersBySkill("Plumber")
      return {
        text: "🔧 Plumbers Available Now:\n\nFound verified plumbers near you! Click 'Book Now' to book instantly:",
        category: "booking",
        workers: plumbers,
      }
    }

    // ELECTRICIAN REQUESTS
    if (
      message.includes("electrician") ||
      message.includes("bijli") ||
      message.includes("light") ||
      message.includes("fan") ||
      message.includes("बिजली") ||
      message.includes("इलेक्ट्रिशियन")
    ) {
      const electricians = findWorkersBySkill("Electrician")
      return {
        text: "⚡ Electricians Available:\n\nExpert electricians ready to help! Choose and book instantly:",
        category: "booking",
        workers: electricians,
      }
    }

    // MAID/CLEANER REQUESTS
    if (
      message.includes("maid") ||
      message.includes("cleaner") ||
      message.includes("safai") ||
      message.includes("cleaning") ||
      message.includes("साफ") ||
      message.includes("मेड")
    ) {
      const cleaners = findWorkersBySkill("House Cleaner")
      return {
        text: "🏠 House Cleaners Available:\n\nProfessional cleaners ready to serve! Book with one tap:",
        category: "booking",
        workers: cleaners,
      }
    }

    // DRIVER REQUESTS
    if (
      message.includes("driver") ||
      message.includes("car") ||
      message.includes("ride") ||
      message.includes("ड्राइवर") ||
      message.includes("गाड़ी")
    ) {
      const drivers = findWorkersBySkill("Driver")
      return {
        text: "🚗 Drivers Available:\n\nReliable drivers ready for your trip! Book instantly:",
        category: "booking",
        workers: drivers,
      }
    }

    // CARPENTER REQUESTS
    if (
      message.includes("carpenter") ||
      message.includes("wood") ||
      message.includes("furniture") ||
      message.includes("बढ़ई") ||
      message.includes("लकड़ी")
    ) {
      const carpenters = findWorkersBySkill("Carpenter")
      return {
        text: "🪚 Carpenters Available:\n\nSkilled carpenters for your furniture needs! One-tap booking:",
        category: "booking",
        workers: carpenters,
      }
    }

    // PAINTER REQUESTS
    if (
      message.includes("painter") ||
      message.includes("paint") ||
      message.includes("wall") ||
      message.includes("रंग") ||
      message.includes("पेंटर")
    ) {
      const painters = findWorkersBySkill("Painter")
      return {
        text: "🎨 Painters Available:\n\nProfessional painters for beautiful walls! Book now:",
        category: "booking",
        workers: painters,
      }
    }

    // DIY SOLUTIONS
    if (message.includes("tap") && (message.includes("leak") || message.includes("drip") || message.includes("टपक"))) {
      return {
        text: "🔧 Tap Leak Fix (DIY Solution):\n\n1. Turn off main water supply\n2. Remove tap handle - unscrew the screw\n3. Check rubber washer - if worn out, replace it\n4. Tighten loose parts with wrench\n5. Apply plumber's tape on threads\n\n💡 Quick Fix: Tighten the packing nut clockwise\n\n⚠️ Still leaking? Book our plumber Pawan Pal!",
        category: "solution",
      }
    }

    if (
      message.includes("light") &&
      (message.includes("not working") || message.includes("nahi") || message.includes("बल्ब"))
    ) {
      return {
        text: "💡 Light Not Working (DIY Solution):\n\n1. Check the bulb - remove and test in another socket\n2. Check the switch - try toggling multiple times\n3. Check circuit breaker - reset if tripped\n4. Check connections - ensure wires are tight\n5. Test with new bulb\n\n⚡ Safety First: Turn off power before checking\n\n⚠️ Need help? Book electrician Arpit Singh or Nidhi Singh!",
        category: "solution",
      }
    }

    if (
      message.includes("wifi") &&
      (message.includes("slow") || message.includes("not working") || message.includes("problem"))
    ) {
      return {
        text: "📶 WiFi Issues (DIY Solution):\n\n1. Restart router - unplug for 30 seconds\n2. Check cables - ensure all connections are tight\n3. Move closer to router - check signal strength\n4. Reset network settings on your device\n5. Update router firmware\n\n💡 Speed Test: Use speedtest.net to check speed\n\n📞 Still slow? Call your ISP!",
        category: "solution",
      }
    }

    // PRICING QUERIES
    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("kitna") ||
      message.includes("rate") ||
      message.includes("कितना") ||
      message.includes("रेट")
    ) {
      return {
        text: "💰 Service Rates in Your Area:\n\n🔧 Plumber (Pawan Pal): ₹300/visit\n⚡ Electrician (Arpit Singh): ₹450/visit\n⚡ Electrician (Nidhi Singh): ₹420/visit\n🏠 House Cleaner (Ananya Singh): ₹250/visit\n🏠 House Cleaner (Jigyasha Soni): ₹280/visit\n🚗 Driver (Vinay Singh): ₹200/trip\n🪚 Carpenter (Aneesh Vishwakarma): ₹400/visit\n🎨 Painter (Aastha Singh): ₹350/visit\n\n💡 All prices are transparent with no hidden charges!",
        category: "general",
      }
    }

    // EMERGENCY/URGENT
    if (
      message.includes("emergency") ||
      message.includes("urgent") ||
      message.includes("तुरंत") ||
      message.includes("जल्दी")
    ) {
      const urgentWorkers = PREMIUM_WORKERS.filter(
        (worker) => worker.isOnline && Number.parseInt(worker.responseTime) <= 10,
      )
      return {
        text: "🚨 Emergency Services Available:\n\nFastest responding workers ready now! Book immediately:",
        category: "booking",
        workers: urgentWorkers,
      }
    }

    // GREETINGS
    if (
      message.includes("hi") ||
      message.includes("hello") ||
      message.includes("namaste") ||
      message.includes("हैलो") ||
      message.includes("नमस्ते")
    ) {
      return {
        text: "🙏 Namaste! Welcome to LabourLink!\n\nOur Premium Workers:\n• Pawan Pal - Plumber\n• Arpit Singh - Electrician\n• Vinay Singh - Driver\n• Aneesh Vishwakarma - Carpenter\n• Ananya Singh - House Cleaner\n• Aastha Singh - Painter\n• Jigyasha Soni - House Cleaner\n• Nidhi Singh - Electrician\n\nTry asking:\n• 'Plumber chahiye urgent'\n• 'Electrician needed'\n• 'Maid chahiye kal'",
        category: "general",
      }
    }

    // HELP/SUPPORT
    if (message.includes("help") || message.includes("support") || message.includes("मदद")) {
      return {
        text: "🆘 How can I help you?\n\nFor Worker Booking:\n• Say: 'Plumber chahiye' or 'Need electrician'\n• I'll show available workers with instant booking\n\nFor DIY Solutions:\n• Ask: 'Tap leak kaise fix karu?'\n• Get step-by-step solutions\n\nFor Pricing:\n• Ask: 'Plumber ka rate kya hai?'\n• Get transparent pricing\n\nEmergency: Say 'urgent' for fastest workers!",
        category: "general",
      }
    }

    // DEFAULT RESPONSE
    return {
      text: "🤖 I can help you with:\n\n🔧 Book Our Premium Workers:\n• Pawan Pal (Plumber) - ₹300\n• Arpit Singh (Electrician) - ₹450\n• Vinay Singh (Driver) - ₹200\n• Aneesh Vishwakarma (Carpenter) - ₹400\n• Ananya Singh (House Cleaner) - ₹250\n• Aastha Singh (Painter) - ₹350\n• Jigyasha Soni (House Cleaner) - ₹280\n• Nidhi Singh (Electrician) - ₹420\n\n💡 DIY Solutions: Ask about fixing common problems\n\nTry: 'Plumber chahiye urgent' or 'Electrician needed'",
      category: "general",
    }
  }

  // Direct booking function
  const handleDirectBooking = async (worker: any) => {
    setIsTyping(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const bookingConfirmation: Message = {
      id: Date.now(),
      text: `✅ Booking Confirmed!\n\n👨‍🔧 Worker: ${worker.name}\n🛠️ Service: ${worker.skill}\n💰 Price: ₹${worker.price}\n📍 Distance: ${worker.distance}km\n⏰ ETA: ${worker.responseTime}\n⭐ Rating: ${worker.rating}\n\n📞 ${worker.name} will call you within ${worker.responseTime}\n\n🆔 Booking ID: #LB${Math.floor(Math.random() * 10000)}\n\n✨ Thank you for choosing LabourLink!`,
      isBot: true,
      timestamp: new Date(),
      category: "booking",
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, bookingConfirmation])

    // Voice confirmation
    if (voiceEnabled) {
      const confirmText = `Booking confirmed! ${worker.name} will reach you in ${worker.responseTime}. Your booking ID is LB${Math.floor(Math.random() * 1000)}.`
      setTimeout(() => speakText(confirmText), 500)
    }
  }

  const handleVoiceInput = () => {
    if (isVoiceInput) {
      setIsVoiceInput(false)
      setVoiceTranscript("")
      if (window.chatSpeechRecognition) {
        window.chatSpeechRecognition.stop()
      }
    } else {
      setIsVoiceInput(true)

      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = "hi-IN"

        recognition.onstart = () => {
          setVoiceTranscript("🎤 Listening...")
        }

        recognition.onresult = (event) => {
          let finalTranscript = ""
          let interimTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          setVoiceTranscript(interimTranscript || finalTranscript)

          if (finalTranscript) {
            setInputText(finalTranscript)
            setIsVoiceInput(false)
            setVoiceTranscript("")
          }
        }

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsVoiceInput(false)
          setVoiceTranscript("")
        }

        recognition.onend = () => {
          setIsVoiceInput(false)
          setVoiceTranscript("")
        }

        window.chatSpeechRecognition = recognition
        recognition.start()
      }
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
      category: "general",
    }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputText
    setInputText("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = getBotResponse(currentInput)
    const botResponse: Message = {
      id: Date.now() + 1,
      text: response.text,
      isBot: true,
      timestamp: new Date(),
      category: response.category,
      workers: response.workers,
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botResponse])

    // Voice response
    if (voiceEnabled) {
      const cleanText = response.text
        .replace(/\*\*/g, "")
        .replace(/[🔧⚡🏠🚗💡🤖🙏💰🚨📞🔍✅📍❓❄️🚽🌀📶🚪🎨🪚]/gu, "")
        .replace(/\n/g, ". ")
        .substring(0, 100) // Limit length for voice

      setTimeout(() => speakText(cleanText), 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "booking":
        return <Wrench className="w-3 h-3" />
      case "solution":
        return <Lightbulb className="w-3 h-3" />
      default:
        return <Zap className="w-3 h-3" />
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "booking":
        return "text-blue-400"
      case "solution":
        return "text-yellow-400"
      default:
        return "text-green-400"
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={onToggle}
          className="fixed bottom-24 left-4 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-2xl z-50 hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 right-4 max-w-sm mx-auto z-50">
          <Card className="glass-card border-slate-700/50 shadow-2xl animate-slide-up">
            <CardHeader className="pb-3 border-b border-slate-700/50">
              <CardTitle className="text-white flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-base">LabourLink AI</div>
                    <div className="text-xs text-purple-300 flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-1 animate-pulse" />
                      Chat Support
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    variant="ghost"
                    size="sm"
                    className={`p-2 rounded-lg ${voiceEnabled ? "text-green-400" : "text-slate-400"}`}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={onToggle}
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white p-2 hover:bg-slate-700/50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages Container */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-slide-up`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[85%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot
                            ? "bg-gradient-to-r from-blue-500 to-purple-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        }`}
                      >
                        {message.isBot ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div
                          className={`p-3 rounded-2xl text-sm whitespace-pre-line shadow-lg ${
                            message.isBot
                              ? "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-100 rounded-bl-md"
                              : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-100 border border-green-500/30 rounded-br-md"
                          }`}
                        >
                          {message.text}
                        </div>

                        {/* Worker Cards for Booking Messages */}
                        {message.isBot && message.category === "booking" && message.workers && (
                          <div className="mt-3 space-y-2">
                            {message.workers.map((worker: any) => (
                              <div
                                key={worker.id}
                                className="bg-slate-800/90 rounded-xl p-3 border border-slate-600/50 shadow-lg"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                      {worker.avatar}
                                    </div>
                                    <div>
                                      <h4 className="text-white font-semibold text-sm">{worker.name}</h4>
                                      <div className="flex items-center space-x-2 text-xs">
                                        <span className="text-blue-300">{worker.skill}</span>
                                        <span className="text-slate-400">•</span>
                                        <span className="text-yellow-400">⭐{worker.rating}</span>
                                        {worker.verified && (
                                          <>
                                            <span className="text-slate-400">•</span>
                                            <span className="text-green-400">✓ Verified</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-green-400 font-bold text-sm">₹{worker.price}</div>
                                    <div className="text-slate-400 text-xs">{worker.distance}km away</div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                                  <span>Response: {worker.responseTime}</span>
                                  <span>{worker.completedJobs}+ jobs done</span>
                                  <span className={`${worker.isOnline ? "text-green-400" : "text-red-400"}`}>
                                    {worker.isOnline ? "● Online" : "● Offline"}
                                  </span>
                                </div>

                                <Button
                                  onClick={() => handleDirectBooking(worker)}
                                  disabled={!worker.isOnline || isTyping}
                                  className={`w-full ${
                                    worker.isOnline
                                      ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black shadow-lg"
                                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                                  } font-bold py-2 rounded-lg btn-animate transition-all duration-300 text-sm`}
                                >
                                  {isTyping ? (
                                    <>
                                      <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                                      Booking...
                                    </>
                                  ) : worker.isOnline ? (
                                    <>
                                      <Zap className="w-3 h-3 mr-2" />
                                      Book Now - Arrives in {worker.responseTime}
                                    </>
                                  ) : (
                                    "Currently Offline"
                                  )}
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div
                          className={`text-xs mt-1 opacity-60 flex items-center ${
                            message.isBot ? "text-slate-400 justify-start" : "text-green-300 justify-end"
                          }`}
                        >
                          {message.isBot && message.category && (
                            <div className={`flex items-center mr-2 ${getCategoryColor(message.category)}`}>
                              {getCategoryIcon(message.category)}
                              <span className="ml-1 capitalize">{message.category}</span>
                            </div>
                          )}
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {message.isBot && isSpeaking && (
                            <Button
                              onClick={stopSpeaking}
                              variant="ghost"
                              size="sm"
                              className="ml-2 p-1 h-auto text-red-400 hover:text-red-300"
                            >
                              <VolumeX className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-slide-up">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-md shadow-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Section */}
              <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask anything... (Hindi/English)"
                    className="bg-slate-700/50 border-slate-600/50 text-white text-sm flex-1 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    onKeyPress={handleKeyPress}
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleVoiceInput}
                    size="sm"
                    className={`px-3 rounded-xl transition-all duration-300 ${
                      isVoiceInput
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    }`}
                    disabled={isTyping}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 px-3 rounded-xl transition-all duration-300"
                    disabled={isTyping || !inputText.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Voice Input Indicator */}
                {isVoiceInput && (
                  <div className="text-center text-xs text-purple-300 animate-pulse mt-2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
                    {voiceTranscript || "🎤 Listening... Speak now"}
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button
                    onClick={() => setInputText("Plumber chahiye urgent")}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-blue-500/50 text-blue-300 hover:bg-blue-500/10 text-xs px-2 py-1 rounded-lg"
                  >
                    🔧 Plumber
                  </Button>
                  <Button
                    onClick={() => setInputText("Electrician needed")}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 text-xs px-2 py-1 rounded-lg"
                  >
                    ⚡ Electrician
                  </Button>
                  <Button
                    onClick={() => setInputText("Maid chahiye")}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-green-500/50 text-green-300 hover:bg-green-500/10 text-xs px-2 py-1 rounded-lg"
                  >
                    🏠 Maid
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
