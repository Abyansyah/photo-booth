"use client"

import { useState, useEffect } from "react"
import { Camera, Heart, Star, ImageIcon } from "lucide-react"

interface LoadingAnimationProps {
  isLoading: boolean
  onFinished: () => void
}

export function LoadingAnimation({ isLoading, onFinished }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading) return

    const timer = setTimeout(() => {
      onFinished()
    }, 3000) // Total animation time: 3 seconds

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [isLoading, onFinished])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 flex flex-col items-center">
        <div className="relative mb-8">
          {/* Camera with flashing light */}
          <div className="relative">
            <Camera className="h-20 w-20 text-primary animate-bounce" strokeWidth={1.5} />
            <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-ping" />
          </div>

          {/* Floating icons */}
          <div className="absolute -top-4 -left-4 animate-spin-slow">
            <Heart className="h-6 w-6 text-pink-400" />
          </div>
          <div className="absolute -bottom-2 -right-4 animate-spin-slow-reverse">
            <Star className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="absolute top-0 -right-8 animate-bounce-slow">
            <ImageIcon className="h-6 w-6 text-blue-400" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-primary mb-4 animate-pulse">Getting your booth ready...</h3>

        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-primary rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">
          {progress < 30 && "Preparing camera access..."}
          {progress >= 30 && progress < 60 && "Preparing filters..."}
          {progress >= 60 && progress < 90 && "Loading templates..."}
          {progress >= 90 && "Almost ready!"}
        </p>

        {/* Photo strip animation */}
        <div className="mt-8 relative">
          <div className="w-32 h-48 bg-white border-4 border-gray-200 rounded-md relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex flex-col">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 border-b border-gray-200 p-1"
                  style={{
                    opacity: progress > i * 25 ? 1 : 0.2,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <div
                    className="w-full h-full bg-primary/20 rounded animate-pulse"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      backgroundColor:
                        progress > i * 25 ? `rgba(236, 72, 153, ${0.2 + i * 0.2})` : "rgba(236, 72, 153, 0.1)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-5 h-5 bg-yellow-300 rounded-full animate-pulse" />
          <div
            className="absolute -bottom-2 -right-2 w-5 h-5 bg-blue-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>
    </div>
  )
}
