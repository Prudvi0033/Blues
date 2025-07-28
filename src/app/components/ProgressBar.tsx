'use client'
import React, { useState } from 'react'

interface ProgressBarProps {
  sliderValue: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ sliderValue }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full my-2">
      <div
        className="relative w-full h-1 bg-gray-700/50 rounded-full cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gray-700/50 rounded-full"></div>

        {/* Fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
          style={{
            width: `${sliderValue}%`,
            background: 'linear-gradient(90deg, #6db9ff, #517dff)',
          }}
        ></div>

        {/* Handle */}
        <div
        onClick={(e) => e.stopPropagation()}
          className={`absolute top-1/2 w-3 h-3 bg-white shadow-md rounded-full transform -translate-y-1/2 transition-all duration-200 ${isHovered ? 'scale:110' : 'scale-75' }`}
          style={{ left: `calc(${sliderValue}% - 6px)` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
