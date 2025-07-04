"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Mic, TrendingUp, Clock, MapPin } from "lucide-react"

export default function WorkerDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState("")
  const [serviceRange, setServiceRange] = useState([5])

  const recentJobs = [
    { id: 1, client: "Rahul S.", service: "Plumbing", amount: 500, time: "2 hours ago" },
    { id: 2, client: "Priya M.", service: "Electrical", amount: 800, time: "1 day ago" },
    { id: 3, client: "Amit K.", service: "Plumbing", amount: 300, time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 pt-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">LabourLink Worker</h1>
          <p className="text-slate-300">Manage your availability and earnings</p>
        </div>

        {/* Online Status Card */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Go Online
              <Switch checked={isOnline} onCheckedChange={setIsOnline} className="data-[state=checked]:bg-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-slate-300">
                {isOnline ? "You are online and visible to clients" : "You are offline"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Skill Selector */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Your Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select your primary skill" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="plumber">Plumber</SelectItem>
                <SelectItem value="electrician">Electrician</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="carpenter">Carpenter</SelectItem>
                <SelectItem value="painter">Painter</SelectItem>
                <SelectItem value="cleaner">House Cleaner</SelectItem>
                <SelectItem value="mechanic">Mechanic</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Service Area Range */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Service Area: {serviceRange[0]} km
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Slider value={serviceRange} onValueChange={setServiceRange} max={20} min={1} step={1} className="w-full" />
            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>1 km</span>
              <span>20 km</span>
            </div>
          </CardContent>
        </Card>

        {/* Voice Profile Update */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <Mic className="w-4 h-4 mr-2" />
              Update via Voice
            </Button>
            <p className="text-sm text-slate-400 mt-2 text-center">
              Say: "Main electrician hoon, 5 km tak kaam karta hoon"
            </p>
          </CardContent>
        </Card>

        {/* Earnings Summary */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Today's Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400 mb-2">₹1,300</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-400">Jobs Completed</div>
                <div className="text-white font-semibold">3</div>
              </div>
              <div>
                <div className="text-slate-400">Hours Worked</div>
                <div className="text-white font-semibold">6.5</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{job.client}</div>
                    <div className="text-slate-400 text-sm">{job.service}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">₹{job.amount}</div>
                    <div className="text-slate-400 text-sm">{job.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
