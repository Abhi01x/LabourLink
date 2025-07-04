"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Calendar, Headphones, User, Briefcase } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/bookings", icon: Calendar, label: "Bookings" },
    { href: "/worker", icon: Briefcase, label: "Worker" },
    { href: "/support", icon: Headphones, label: "Support" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass backdrop-blur-2xl border-t border-slate-700/50 z-40">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 rounded-2xl transition-all duration-300 hover-lift ${
                isActive
                  ? "text-lime-400 bg-gradient-to-t from-lime-500/20 to-green-500/20 border border-lime-500/30 shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/30"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon className={`w-5 h-5 mb-1 transition-all duration-300 ${isActive ? "animate-bounce" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-lime-400 rounded-full animate-pulse" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
