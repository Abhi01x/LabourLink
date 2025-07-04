"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, Phone } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md mx-auto">
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
          <p className="text-slate-300 mb-6">Your worker has been notified and will contact you soon.</p>

          <div className="bg-slate-700/50 p-4 rounded-lg mb-6 space-y-3">
            <div className="flex items-center justify-center text-sm text-slate-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Booking ID: #LB{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex items-center justify-center text-sm text-slate-300">
              <Clock className="w-4 h-4 mr-2" />
              <span>Expected contact within 15 minutes</span>
            </div>
            <div className="flex items-center justify-center text-sm text-slate-300">
              <Phone className="w-4 h-4 mr-2" />
              <span>Worker will call you directly</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={onClose} className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold">
              View My Bookings
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Book Another Worker
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
