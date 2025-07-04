import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function MapView() {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Nearby Workers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-slate-700 rounded-lg relative overflow-hidden">
          {/* Map placeholder with worker markers */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-green-900/50" />

          {/* Mock worker markers */}
          <div className="absolute top-4 left-6 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute top-8 right-8 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute bottom-6 left-12 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute bottom-8 right-6 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-sm">Interactive map view</p>
              <p className="text-xs text-slate-400">Green dots = Available workers</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
