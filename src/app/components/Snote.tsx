import React from "react";

const Snote = () => {
  return (
    <div>
      <svg
        width="80px"
        height="80px"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 48 48"
      >
        <defs>
          {/* Main gradient matching your background colors */}
          <linearGradient
            id="snoteMusicGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#98ccd3" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#364e68" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#132238" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#98ccd3" stopOpacity="0.7" />
          </linearGradient>

          {/* Subtle radial overlay for depth */}
          <radialGradient id="snoteRadial" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#ebf0f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#98ccd3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#132238" stopOpacity="0.4" />
          </radialGradient>

          {/* Drop shadow filter */}
          <filter id="snoteDropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation="3"
              floodColor="#132238"
              floodOpacity="0.3"
            />
          </filter>
          
          {/* Alternative gradient for variety */}
          <linearGradient
            id="snoteAltGradient"
            x1="20%"
            y1="0%"
            x2="80%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ebf0f6" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#98ccd3" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#364e68" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#132238" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        <g>
          <circle 
            cx={19} 
            cy={33} 
            r={9} 
            fill="url(#snoteMusicGradient)"
            filter="url(#snoteDropShadow)"
          />
          {/* Overlay for additional depth on circle */}
          <circle 
            cx={19} 
            cy={33} 
            r={9} 
            fill="url(#snoteRadial)"
            opacity="0.6"
          />
          
          <polygon 
            points="24,6 24,33 28,33 28,14 39,17 39,10" 
            fill="url(#snoteAltGradient)"
            filter="url(#snoteDropShadow)"
          />
          {/* Overlay for additional depth on stem */}
          <polygon 
            points="24,6 24,33 28,33 28,14 39,17 39,10" 
            fill="url(#snoteRadial)"
            opacity="0.4"
          />
        </g>
      </svg>
    </div>
  );
};

export default Snote;