import React from 'react';

const SpaceAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <circle
            key={`star-${i}`}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r="1"
            fill="url(#star-glow)"
            className="animate-twinkle"
            style={{ animationDelay: `${Math.random() * 5}s` }}
          />
        ))}
        
        {/* Planet */}
        <circle
          cx="80%"
          cy="30%"
          r="20"
          fill="#ff6b6b"
          className="animate-pulse"
        />
        
        {/* Comet */}
        <g className="animate-comet">
          <ellipse cx="0" cy="0" rx="3" ry="1" fill="white" />
          <path d="M-3 0 L-50 0" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </g>
        
        {/* Shooting star */}
        <line
          x1="0%"
          y1="0%"
          x2="20%"
          y2="20%"
          stroke="white"
          strokeWidth="1"
          className="animate-shooting-star"
        />
      </svg>
    </div>
  );
};

export default SpaceAnimation;