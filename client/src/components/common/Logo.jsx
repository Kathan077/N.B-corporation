import React from 'react';

const Logo = ({ className = "", height = 58, light = false }) => {
  // Tagline color: White on dark backgrounds (footer), Dark slate on light backgrounds (navbar)
  const taglineColor = light ? '#FFFFFF' : '#0F172A';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 360 160"
        style={{ height: `${height}px`, width: 'auto' }}
        className="w-auto object-contain transition-transform duration-300 hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Red Box (width: 320, from x=20 to x=340) */}
        <rect
          x="20"
          y="10"
          width="320"
          height="106"
          fill="#DC2626"
          rx="3"
        />

        {/* Inner White Double-Border */}
        <rect
          x="30"
          y="20"
          width="300"
          height="86"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          rx="1"
        />

        {/* NB Text */}
        <text
          x="180"
          y="78"
          fill="#FFFFFF"
          fontSize="70"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          textAnchor="middle"
          letterSpacing="-1"
        >
          NB
        </text>

        {/* CORPORATION Text */}
        <text
          x="180"
          y="98"
          fill="#FFFFFF"
          fontSize="13.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          textAnchor="middle"
          letterSpacing="4"
        >
          CORPORATION
        </text>

        {/* EXCELLENCE WITH EXPERIENCE - Guaranteed full visibility without clipping */}
        <text
          x="180"
          y="142"
          fill={taglineColor}
          fontSize="17.5"
          fontWeight="900"
          fontFamily="'Arial Black', Impact, 'Oswald', system-ui, sans-serif"
          textAnchor="middle"
          textLength="316"
          lengthAdjust="spacing"
        >
          EXCELLENCE WITH EXPERIENCE
        </text>
      </svg>
    </div>
  );
};

export default Logo;
