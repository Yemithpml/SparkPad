"use client"

import { BrainCog } from "lucide-react"

type LogoProps = {
  size?: number
  text?: string
  className?: string
}

export default function Logo({
  size = 32,
  text = "SparkPad",
  className = ""
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* BrainCog Icon */}
      <BrainCog size={size} color="#000000" />

      {/* Text */}
      {text && (
        <span className="font-bold text-xl text-black">
          {text}
        </span>
      )}
    </div>
  )
}
