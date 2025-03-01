import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getAllBenchmarks } from '@/data/benchmarks';

const Resources: React.FC = () => {
  const { 
    chips, 
    multiplier, 
    score, 
    money,
    marketShare,
    currentBenchmark,
    round,
  } = useGameStore();
  
  // Get all benchmarks to show progress
  const allBenchmarks = getAllBenchmarks();
  
  // Calculate current progress towards the next benchmark
  const calculateBenchmarkProgress = () => {
    if (!currentBenchmark) return 100; // If no benchmark, show 100%
    
    // Calculate what percentage of the goal we've completed
    const progress = Math.min(Math.floor((score / currentBenchmark.targetScore) * 100), 100);
    return progress;
  };
  
  // Check if the current benchmark has been completed
  const isBenchmarkCompleted = () => {
    if (!currentBenchmark) return true;
    return score >= currentBenchmark.targetScore;
  };
  
  // State for score animation
  const [displayScore, setDisplayScore] = useState(score);
  useEffect(() => {
    // Update score with a small animation
    const difference = score - displayScore;
    if (difference !== 0) {
      const step = difference > 0 ? 
        Math.max(1, Math.ceil(difference / 10)) : 
        Math.min(-1, Math.floor(difference / 10));
      
      const timer = setTimeout(() => {
        setDisplayScore(prev => prev + step);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [score, displayScore]);
  
  // Conditional CSS classes for market share
  const getMarketShareClass = () => {
    if (marketShare >= 75) return 'text-green-400';
    if (marketShare >= 50) return 'text-blue-400';
    if (marketShare >= 25) return 'text-amber-400';
    return 'text-red-400';
  };
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Resources and Stats</h2>
      
      {/* Score and current round */}
      <div className="mb-4 grid grid-cols-1 gap-3">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Sprint</div>
          <div className="text-2xl font-bold text-white">{round}</div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Score</div>
          <div className="text-2xl font-bold text-white">{displayScore}</div>
        </div>
      </div>
      
      {/* Chips and multiplier */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="bg-blue-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-blue-300 mb-1">Pre-training</div>
          <div className="text-xl font-bold text-white">{chips} chips</div>
        </div>
        
        <div className="bg-red-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-red-300 mb-1">Test-time</div>
          <div className="text-xl font-bold text-white">×{multiplier.toFixed(1)}</div>
        </div>
      </div>
      
      {/* Money and market share */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="bg-green-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-green-300 mb-1">Funds</div>
          <div className="text-xl font-bold text-white">${money}</div>
        </div>
        
        <div className="bg-purple-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-purple-300 mb-1">Market Share</div>
          <div className={`text-xl font-bold ${getMarketShareClass()}`}>{marketShare}%</div>
        </div>
      </div>
      
      {/* Current benchmark and progress */}
      <div className="bg-gray-800 p-3 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-purple-300">Current Benchmark:</div>
          <div className="text-sm font-bold text-white">
            {currentBenchmark ? currentBenchmark.name : 'All Completed'}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
            initial={{ width: 0 }}
            animate={{ width: `${calculateBenchmarkProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div className="text-xs text-gray-400">
            {score} / {currentBenchmark ? currentBenchmark.targetScore : '-'}
          </div>
          <div className="text-xs text-gray-400">
            {isBenchmarkCompleted() ? 'Completed!' : `${calculateBenchmarkProgress()}%`}
          </div>
        </div>
        
        {isBenchmarkCompleted() && currentBenchmark && (
          <div className="mt-2 text-xs text-green-400 flex items-center">
            <span className="mr-1">✓</span> 
            Benchmark completed! +{currentBenchmark.marketShareReward}% market share
          </div>
        )}
      </div>
      
      {/* Current difficulty - We'll show a simplified version since we don't have direct access to difficulty */}
      <div className="bg-gray-800 p-3 rounded-lg">
        <div className="text-sm text-gray-400 mb-1">Difficulty</div>
        <div className="text-md font-bold text-yellow-400">
          Normal
        </div>
      </div>
    </div>
  );
};

export default Resources; 