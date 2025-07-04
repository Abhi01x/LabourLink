"use client"

import { Button } from "@/components/ui/button"
import { Wrench, Zap, Car, Paintbrush, BrushIcon as Broom, Hammer, Settings, Grid3X3 } from "lucide-react"

interface CategoryGridProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function CategoryGrid({ selectedCategory, setSelectedCategory }: CategoryGridProps) {
  const categories = [
    { id: "all", name: "All Services", icon: Grid3X3, color: "bg-gray-100" },
    { id: "plumber", name: "Plumber", icon: Wrench, color: "bg-blue-100" },
    { id: "electrician", name: "Electrician", icon: Zap, color: "bg-yellow-100" },
    { id: "driver", name: "Driver", icon: Car, color: "bg-green-100" },
    { id: "painter", name: "Painter", icon: Paintbrush, color: "bg-purple-100" },
    { id: "cleaner", name: "Cleaner", icon: Broom, color: "bg-pink-100" },
    { id: "carpenter", name: "Carpenter", icon: Hammer, color: "bg-orange-100" },
    { id: "mechanic", name: "Mechanic", icon: Settings, color: "bg-red-100" },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant="ghost"
              className={`flex flex-col items-center p-4 h-auto rounded-2xl border-2 transition-all duration-200 ${
                isSelected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${category.color}`}>
                <Icon className={`w-6 h-6 ${isSelected ? "text-green-600" : "text-gray-600"}`} />
              </div>
              <span className={`text-xs font-medium ${isSelected ? "text-green-600" : "text-gray-700"}`}>
                {category.name}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
