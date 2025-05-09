import { FC } from 'react';

interface RoastMeterProps {
  score: number; // 0-100
}

const RoastMeter: FC<RoastMeterProps> = ({ score }) => {
  const rotation = (score / 100) * 180; // Convert score to degrees (0-180)
  
  return (
    <div className="relative w-64 h-32">
      {/* Background arc */}
      <svg className="w-full h-full" viewBox="0 0 200 100">
        <path
          d="M 20 80 A 80 80 0 0 1 180 80"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
        />
        
        {/* Score arc */}
        <path
          d="M 20 80 A 80 80 0 0 1 180 80"
          fill="none"
          stroke="#ff4154"
          strokeWidth="12"
          strokeDasharray={`${(score / 100) * 251.2} 251.2`}
          transform="rotate(180 100 100)"
        />
        
        {/* Needle */}
        <line
          x1="100"
          y1="80"
          x2="100"
          y2="20"
          stroke="#2e2e2e"
          strokeWidth="4"
          transform={`rotate(${rotation} 100 80)`}
          transform-origin="100 80"
        />
        
        {/* Center circle */}
        <circle cx="100" cy="80" r="8" fill="#2e2e2e" />
      </svg>
      
      {/* Score text */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <div className="text-4xl font-bold text-[#ff4154]">{score}</div>
        <div className="text-sm text-gray-600">Roast Level</div>
      </div>
    </div>
  );
};

export default RoastMeter; 