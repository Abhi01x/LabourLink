import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail, HelpCircle } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 pt-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Support</h1>

        <div className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Get Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-green-500 hover:bg-green-600">
                <Phone className="w-4 h-4 mr-2" />
                Call Support: +91 9876543210
              </Button>
              <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
              <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600">
                <Mail className="w-4 h-4 mr-2" />
                Email: help@kaamwale.ai
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                FAQ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-slate-300">
                <h3 className="font-medium text-white mb-1">How do I book a worker?</h3>
                <p className="text-sm">Search for workers, select one, and click 'Book Now'.</p>
              </div>
              <div className="text-slate-300">
                <h3 className="font-medium text-white mb-1">Payment methods?</h3>
                <p className="text-sm">We accept cash, UPI, and card payments.</p>
              </div>
              <div className="text-slate-300">
                <h3 className="font-medium text-white mb-1">How to cancel booking?</h3>
                <p className="text-sm">Go to bookings and click cancel (charges may apply).</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
