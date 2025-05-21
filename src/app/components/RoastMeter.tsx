'use client';

import { motion } from 'framer-motion';

interface RoastMeterProps {
  score: number;
}

export default function RoastMeter({ score }: RoastMeterProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-500';
    if (score >= 80) return 'text-orange-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Absolutely Roasted';
    if (score >= 80) return 'Well Done';
    if (score >= 70) return 'Medium Rare';
    return 'Lightly Seasoned';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 90) return 'Your pitch deck got absolutely destroyed. Time to rebuild from the ashes.';
    if (score >= 80) return 'Your pitch deck got roasted pretty hard. Major improvements needed.';
    if (score >= 70) return 'Your pitch deck got a decent roast. Some work to do.';
    return 'Your pitch deck got off easy. Consider yourself lucky.';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        {/* Score Display */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className={`text-8xl font-bold ${getScoreColor(score)} mb-2`}
          >
            {score}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-2xl font-bold ${getScoreColor(score)} mb-2`}
          >
            {getScoreLabel(score)}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400"
          >
            {getScoreDescription(score)}
          </motion.p>
        </div>

        {/* Meter Visualization */}
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute top-0 left-0 h-full ${
              score >= 90 ? 'bg-red-500' :
              score >= 80 ? 'bg-orange-500' :
              score >= 70 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
          />
        </div>

        {/* Score Labels */}
        <div className="flex justify-between text-sm text-gray-400">
          <span>Light</span>
          <span>Medium</span>
          <span>Well Done</span>
          <span>Roasted</span>
        </div>

        {/* Animated Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
} 