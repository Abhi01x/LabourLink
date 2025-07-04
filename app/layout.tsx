import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LabourLink - Find Local Workers",
  description: "Find nearby plumbers, electricians, drivers in minutes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Load speech synthesis voices
            if ('speechSynthesis' in window) {
              window.speechSynthesis.getVoices();
              window.speechSynthesis.onvoiceschanged = function() {
                window.speechSynthesis.getVoices();
              };
            }
          `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white min-h-screen gradient-bg`}>
        <main className="pb-20">{children}</main>
        <Navigation />
      </body>
    </html>
  )
}
