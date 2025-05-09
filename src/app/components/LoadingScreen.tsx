import React from 'react';

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="animate-spin"
        cx="40"
        cy="40"
        r="32"
        stroke="#ff4154"
        strokeWidth="8"
        strokeDasharray="50 100"
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        fill="#2e2e2e"
        fontSize="16"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        dy=".3em"
      >
        Loading…
      </text>
    </svg>
  </div>
);

export default LoadingScreen; 