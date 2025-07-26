import React from "react";

const MusicNote = () => {
  return (
    <div>
      <svg
        height="200px"
        width="200px"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
      >
        <defs>
          {/* Enhanced gradient with slate tones */}
          <linearGradient id="musicNoteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#475569" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#334155" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Refined radial overlay with blue accents */}
          <radialGradient id="musicNoteRadial" cx="40%" cy="25%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#94a3b8" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#475569" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.5" />
          </radialGradient>
          
          {/* Enhanced drop shadow */}
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#1e293b" floodOpacity="0.4"/>
          </filter>
        </defs>
        
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <path 
                d="M503.319,5.939c-5.506-4.705-12.783-6.767-19.958-5.635L169.555,49.852c-12.04,1.901-20.909,12.28-20.909,24.47v99.097 v156.903H99.097C44.455,330.323,0,371.073,0,421.161C0,471.25,44.455,512,99.097,512c54.642,0,99.097-40.75,99.097-90.839v-66.065 V194.588l264.258-41.725v136.169h-49.548c-54.642,0-99.097,40.75-99.097,90.839s44.455,90.839,99.097,90.839 S512,429.959,512,379.871v-66.065V123.871V24.774C512,17.529,508.827,10.646,503.319,5.939z" 
                fill="url(#musicNoteGradient)"
                filter="url(#dropShadow)"
              />
              {/* Overlay for additional depth */}
              <path 
                d="M503.319,5.939c-5.506-4.705-12.783-6.767-19.958-5.635L169.555,49.852c-12.04,1.901-20.909,12.28-20.909,24.47v99.097 v156.903H99.097C44.455,330.323,0,371.073,0,421.161C0,471.25,44.455,512,99.097,512c54.642,0,99.097-40.75,99.097-90.839v-66.065 V194.588l264.258-41.725v136.169h-49.548c-54.642,0-99.097,40.75-99.097,90.839s44.455,90.839,99.097,90.839 S512,429.959,512,379.871v-66.065V123.871V24.774C512,17.529,508.827,10.646,503.319,5.939z" 
                fill="url(#musicNoteRadial)"
                opacity="0.6"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default MusicNote;