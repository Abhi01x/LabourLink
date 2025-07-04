"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Shield, Plus } from "lucide-react"

interface WorkerListProps {
  workers: any[]
  onBook: (worker: any) => void
  selectedCategory: string
}

export function WorkerList({ workers, onBook, selectedCategory }: WorkerListProps) {
  const filteredWorkers =
    selectedCategory === "all"
      ? workers
      : workers.filter((worker) => worker.skill.toLowerCase().includes(selectedCategory))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {selectedCategory === "all"
            ? "All Workers"
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s`}
        </h2>
        <span className="text-sm text-gray-500">{filteredWorkers.length} workers available</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-200 hover:border-green-200"
          >
            {/* Worker Image */}
            <div className="relative mb-4">
              <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {worker.avatar}
                </div>
              </div>

              {/* Online Status */}
              {worker.isOnline && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Available
                </div>
              )}

              {/* Verified Badge */}
              {worker.verified && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full">
                  <Shield className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Worker Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{worker.name}</h3>
                <p className="text-green-600 font-medium text-sm">{worker.skill}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{worker.rating}</span>
                  <span>({worker.completedJobs})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{worker.distance} km</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Responds in {worker.responseTime}</span>
              </div>

              {/* Specialties */}
              {worker.specialties && (
                <div className="flex flex-wrap gap-1">
                  {worker.specialties.slice(0, 2).map((specialty: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-2 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Price and Book Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xl font-bold text-gray-900">₹{worker.price}</div>
                  <div className="text-xs text-gray-500">per visit</div>
                </div>
                <Button
                  onClick={() => onBook(worker)}
                  disabled={!worker.isOnline}
                  className={`${
                    worker.isOnline
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } px-4 py-2 rounded-xl font-medium transition-colors duration-200`}
                >
                  {worker.isOnline ? (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Book
                    </>
                  ) : (
                    "Offline"
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
