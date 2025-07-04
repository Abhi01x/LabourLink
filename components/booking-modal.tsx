"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, MapPin, User, Phone } from "lucide-react"
import { format } from "date-fns"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  worker: {
    id: number
    name: string
    skill: string
    price: number
    rating: number
  }
  onBookingSuccess: () => void
}

export function BookingModal({ isOpen, onClose, worker, onBookingSuccess }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ]

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !customerName || !customerPhone || !address) {
      alert("Please fill all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    onBookingSuccess()
    onClose()

    // Reset form
    setSelectedDate(undefined)
    setSelectedTime("")
    setCustomerName("")
    setCustomerPhone("")
    setAddress("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Book {worker.name}</DialogTitle>
          <div className="text-center text-slate-300">
            <div className="text-blue-300 font-medium">{worker.skill}</div>
            <div className="text-green-400 font-semibold">₹{worker.price}/visit</div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Customer Details */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-slate-300 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Your Name *
              </Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-slate-300 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-slate-300 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Service Address *
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
                placeholder="Enter complete address"
                rows={2}
              />
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <Label className="text-slate-300 flex items-center mb-2">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Select Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div>
            <Label className="text-slate-300 flex items-center mb-2">
              <Clock className="w-4 h-4 mr-2" />
              Select Time *
            </Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Choose time slot" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time} className="text-white">
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-slate-300">
              Work Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white mt-1"
              placeholder="Describe the work needed..."
              rows={2}
            />
          </div>

          {/* Booking Summary */}
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <h4 className="font-medium text-white mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Service:</span>
                <span>{worker.skill}</span>
              </div>
              <div className="flex justify-between">
                <span>Worker:</span>
                <span>{worker.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{selectedTime || "Not selected"}</span>
              </div>
              <div className="flex justify-between font-semibold text-green-400 pt-2 border-t border-slate-600">
                <span>Total:</span>
                <span>₹{worker.price}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={isSubmitting}
              className="flex-1 bg-lime-500 hover:bg-lime-600 text-black font-semibold"
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
