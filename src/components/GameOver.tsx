import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Confetti from 'react-confetti';

interface GameOverProps {
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  const { marketShare, round, score, activeJokers, money } = useGameStore();
  
  // Determine if the player won (marketShare > 50%) or lost (marketShare <= 0)
  const isVictory = marketShare >= 50;
  
  // Calculate final score (score + bonus for jokers and remaining money)
  const jokerBonus = activeJokers.length * 100;
  const moneyBonus = money / 10;
  const finalScore = score + jokerBonus + moneyBonus;
  
  // Effect to show a message in the console
  useEffect(() => {
    console.log(`[LOG] Game over. Victory: ${isVictory}, Final score: ${finalScore}`);
  }, [isVictory, finalScore]);
  
  // Function to determine player rank based on score
  const getPlayerRank = (): string => {
    if (finalScore >= 2000) return "AI CEO";
    if (finalScore >= 1500) return "Tech Visionary";
    if (finalScore >= 1000) return "Innovation Director";
    if (finalScore >= 500) return "Promising Entrepreneur";
    return "Startup Novice";
  };
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isVictory && <Confetti numberOfPieces={500} recycle={false} />}
      
      <motion.div 
        className={`relative bg-gray-900 rounded-lg p-6 max-w-2xl w-full shadow-2xl border-2 ${
          isVictory ? 'border-amber-500/50' : 'border-red-800/30'
        }`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
              isVictory 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600'
                : 'text-red-500'
            }`}>
              {isVictory ? 'Victory!' : 'Game Over'}
            </h2>
            <p className="text-gray-400 text-lg">
              {isVictory 
                ? 'You have dominated the AI market!'
                : 'Your AI startup did not survive the competition.'}
            </p>
          </motion.div>
        </div>
        
        {/* Main stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div 
            className="bg-gray-800 p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="text-sm text-gray-400 mb-1">Market Share</div>
            <div className={`text-3xl font-bold ${isVictory ? 'text-green-400' : 'text-red-400'}`}>
              {marketShare}%
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800 p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <div className="text-sm text-gray-400 mb-1">Rounds Played</div>
            <div className="text-3xl font-bold text-blue-400">
              {round - 1}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800 p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <div className="text-sm text-gray-400 mb-1">Final Score</div>
            <div className="text-3xl font-bold text-purple-400">
              {Math.floor(finalScore)}
            </div>
          </motion.div>
        </div>
        
        {/* Score breakdown */}
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <h3 className="font-semibold text-center text-gray-300 mb-3">Score Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Base score:</span>
              <span className="font-semibold">{score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Joker bonus ({activeJokers.length}):</span>
              <span className="font-semibold text-green-400">+{jokerBonus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Remaining money bonus (${money}):</span>
              <span className="font-semibold text-green-400">+{Math.floor(moneyBonus)}</span>
            </div>
            <div className="border-t border-gray-700 pt-2 flex justify-between">
              <span className="font-semibold text-amber-400">TOTAL:</span>
              <span className="font-bold text-amber-400">{Math.floor(finalScore)}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Player rank */}
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.0 }}
        >
          <h3 className="font-semibold text-gray-300 mb-2">Your final rank</h3>
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {getPlayerRank()}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {isVictory 
              ? 'Impressive! You have built a world-class AI company.'
              : 'There is room for improvement. Try again!'}
          </div>
        </motion.div>
        
        {/* Restart button */}
        <div className="text-center">
          <motion.button 
            className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-amber-700 hover:to-amber-900 transition-colors shadow-xl"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            Play Again
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver; 